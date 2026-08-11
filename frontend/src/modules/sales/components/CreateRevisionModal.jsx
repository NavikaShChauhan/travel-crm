import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import {
  MdCheckCircle,
  MdCompareArrows,
  MdOutlineArrowForward,
  MdOutlineDescription,
  MdSend,
  MdEdit,
} from 'react-icons/md';
import { formatCurrency } from '@utils/formatters';
import { tokens } from '@styles/theme';
import SalesModal from './SalesModal';

export const REVISION_REASONS = [
  'Customer Requested Changes',
  'Price Negotiation',
  'Hotel Change',
  'Flight Change',
  'Date Change',
  'Package Modification',
  'Discount',
  'Supplier Availability',
  'Other',
];

const STEPS = ['Reason & Scope', 'Edit Package & Pricing', 'Review & Compare'];

export function CreateRevisionModal({ open, onClose, proposal, onSaveRevision, onSendRevision }) {
  if (!proposal) return null;

  const currentVersionNum = proposal.version || 1;
  const nextVersionNum = currentVersionNum + 1;
  const nextVersionLabel = `V${nextVersionNum}`;

  // Wizard state
  const [activeStep, setActiveStep] = useState(0);

  // Revision Scope State
  const [revisionReason, setRevisionReason] = useState('Customer Requested Changes');
  const [revisionNotes, setRevisionNotes] = useState('');

  // Package & Trip Edit State (pre-loaded from existing proposal)
  const [destination, setDestination] = useState(proposal.destination || 'Bali');
  const [travelDate, setTravelDate] = useState(proposal.travelDate || '2026-08-15');
  const [duration, setDuration] = useState(proposal.duration || '7N / 8D');
  const [pax, setPax] = useState(proposal.pax || '2 (2A)');
  const [packageType, setPackageType] = useState(proposal.packageType || 'Honeymoon');

  const [hotel, setHotel] = useState(proposal.hotel || 'XYZ Resort & Spa');
  const [roomType, setRoomType] = useState(proposal.roomType || 'Premium Beachfront Villa');
  const [mealPlan, setMealPlan] = useState(proposal.mealPlan || 'Breakfast & Dinner');
  const [flights, setFlights] = useState(proposal.flights || 'Indigo direct flights included');
  const [transfers, setTransfers] = useState(proposal.transfers || 'Private Airport & Intercity transfers');

  // Pricing Edit State
  const initialBase = proposal.amount ? Math.round(proposal.amount * 0.85) : 220000;
  const initialTax = proposal.amount ? Math.round(proposal.amount * 0.15) : 33000;
  const initialDiscount = proposal.discount || 0;

  const [basePrice, setBasePrice] = useState(initialBase);
  const [taxAmount, setTaxAmount] = useState(initialTax);
  const [discountAmount, setDiscountAmount] = useState(initialDiscount);

  // Delivery Dialog State
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [sendChannel, setSendChannel] = useState('Email');
  const [sendTemplate, setSendTemplate] = useState('Revised Proposal');
  const [sendMessage, setSendMessage] = useState(
    `Hi ${proposal.customer}, here is your revised proposal (${proposal.id} ${nextVersionLabel}) for ${destination} with updated hotel & room options!`
  );

  const revisedTotal = Math.max(0, Number(basePrice) + Number(taxAmount) - Number(discountAmount));
  const previousTotal = proposal.amount || 250000;
  const priceDifference = revisedTotal - previousTotal;

  // Compute live diffs
  const changes = [];
  if (hotel !== (proposal.hotel || 'ABC Resort')) changes.push('Hotel changed');
  if (roomType !== (proposal.roomType || 'Deluxe Room')) changes.push('Room type changed');
  if (destination !== proposal.destination) changes.push('Destination updated');
  if (travelDate !== proposal.travelDate) changes.push('Travel dates updated');
  if (priceDifference !== 0) changes.push('Total price changed');

  const handleNext = () => setActiveStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  const handleBack = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const buildRevisionPayload = (status = 'Revision Draft') => {
    const now = new Date().toISOString();
    return {
      proposalId: proposal.id,
      version: nextVersionNum,
      versionLabel: `${nextVersionLabel} · ${revisionReason}`,
      status,
      customer: proposal.customer,
      destination,
      travelDate,
      duration,
      pax,
      packageType,
      hotel,
      roomType,
      mealPlan,
      flights,
      transfers,
      amount: revisedTotal,
      previousAmount: previousTotal,
      difference: priceDifference,
      discount: Number(discountAmount),
      executive: proposal.executive || 'Priya Sharma',
      revisionReason,
      revisionNotes,
      changesSummary: changes.length > 0 ? changes : ['Minor adjustments'],
      createdDate: now,
    };
  };

  const handleSaveDraft = () => {
    const payload = buildRevisionPayload('Revision Draft');
    onSaveRevision(payload);
    onClose();
  };

  const handleConfirmSend = () => {
    const payload = buildRevisionPayload('Sent');
    onSendRevision(payload, { channel: sendChannel, message: sendMessage });
    setIsSendDialogOpen(false);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ pb: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Create Revised Proposal · {proposal.id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Revising <strong>{proposal.customer}</strong> ({proposal.destination}) — Creating{' '}
                <Chip size="small" label={nextVersionLabel} color="primary" sx={{ fontWeight: 700, ml: 0.5 }} /> from {`V${currentVersionNum}`}
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>

        <Box sx={{ px: 3, pt: 1, pb: 2 }}>
          <Stepper activeStep={activeStep}>
            {STEPS.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <DialogContent dividers sx={{ p: { xs: 2, md: 3 } }}>
          {/* STEP 0: Reason & Scope */}
          {activeStep === 0 && (
            <Stack spacing={2.5}>
              <Alert severity="info">
                Revising proposal <strong>{proposal.id}</strong> will preserve all original V1 details and history. The new revision will become <strong>{nextVersionLabel}</strong>.
              </Alert>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required size="small">
                    <InputLabel>Reason for Revision</InputLabel>
                    <Select
                      value={revisionReason}
                      label="Reason for Revision"
                      onChange={(e) => setRevisionReason(e.target.value)}
                    >
                      {REVISION_REASONS.map((reason) => (
                        <MenuItem key={reason} value={reason}>
                          {reason}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Assigned Executive"
                    size="small"
                    value={proposal.executive || 'Priya Sharma'}
                    disabled
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Additional Revision Notes / Customer Feedback"
                    size="small"
                    multiline
                    rows={3}
                    value={revisionNotes}
                    onChange={(e) => setRevisionNotes(e.target.value)}
                    placeholder="e.g. Customer requested 5-star hotel upgrade and Glacier Express scenic train inclusion."
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(27,42,74,0.04)', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: tokens.color.navy900 }}>
                  Carried Forward Customer & Trip Details
                </Typography>
                <Grid container spacing={1.5}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary">Customer</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{proposal.customer}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary">Proposal ID</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{proposal.id}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary">Destination</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{destination}</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="text.secondary">Current Version</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>V{currentVersionNum} ({formatCurrency(previousTotal)})</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          )}

          {/* STEP 1: Edit Package & Pricing */}
          {activeStep === 1 && (
            <Stack spacing={2.5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Edit Package Services & Inclusions ({nextVersionLabel})
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Destination"
                    size="small"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    label="Travel Date"
                    size="small"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <TextField
                    label="Duration"
                    size="small"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Hotel Name & Category"
                    size="small"
                    value={hotel}
                    onChange={(e) => setHotel(e.target.value)}
                    fullWidth
                    helperText="Modify hotel choice if requested by customer"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Room Type"
                    size="small"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    fullWidth
                    helperText="e.g. Deluxe Room vs Premium Suite"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Meal Plan"
                    size="small"
                    value={mealPlan}
                    onChange={(e) => setMealPlan(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Flights / Transport Note"
                    size="small"
                    value={flights}
                    onChange={(e) => setFlights(e.target.value)}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Pricing Recalculation
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Base Package Price (₹)"
                    type="number"
                    size="small"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Taxes & Fees (₹)"
                    type="number"
                    size="small"
                    value={taxAmount}
                    onChange={(e) => setTaxAmount(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Discount (₹)"
                    type="number"
                    size="small"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
            </Stack>
          )}

          {/* STEP 2: Review & Compare */}
          {activeStep === 2 && (
            <Stack spacing={2.5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Revision Summary & Version Comparison ({`V${currentVersionNum} → ${nextVersionLabel}`})
              </Typography>

              {/* Price Diff Comparison Card */}
              <Card sx={{ p: 2.5, bgcolor: 'rgba(27,42,74,0.04)', border: '1px solid', borderColor: 'divider' }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                  <MdCompareArrows size={22} color={tokens.color.navy700} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Price Difference Analysis
                  </Typography>
                </Stack>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ p: 1.5, bgcolor: 'background.paper', borderRadius: 2 }}>
                      <Typography variant="caption" color="text.secondary">Previous Total (V{currentVersionNum})</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {formatCurrency(previousTotal)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ p: 1.5, bgcolor: 'background.paper', borderRadius: 2 }}>
                      <Typography variant="caption" color="text.secondary">Revised Total ({nextVersionLabel})</Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.color.navy700 }}>
                        {formatCurrency(revisedTotal)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ p: 1.5, bgcolor: priceDifference > 0 ? 'rgba(225,29,72,0.08)' : 'rgba(16,185,129,0.08)', borderRadius: 2 }}>
                      <Typography variant="caption" color="text.secondary">Difference</Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: priceDifference > 0 ? 'error.main' : 'success.main',
                        }}
                      >
                        {priceDifference >= 0 ? `+${formatCurrency(priceDifference)}` : formatCurrency(priceDifference)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Card>

              {/* Revision Summary list */}
              <Box sx={{ p: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Detected Changes in {nextVersionLabel}
                </Typography>
                <Stack spacing={0.75}>
                  {changes.length > 0 ? (
                    changes.map((chg) => (
                      <Stack key={chg} direction="row" spacing={1} alignItems="center">
                        <MdCheckCircle size={16} color={tokens.color.teal500} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {chg}
                        </Typography>
                      </Stack>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No key fields altered; revision captures notes & fee adjustments.
                    </Typography>
                  )}
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    Reason: <strong>{revisionReason}</strong> {revisionNotes ? `— "${revisionNotes}"` : ''}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, justifyContent: 'space-between' }}>
          <Button onClick={onClose}>Cancel</Button>

          <Stack direction="row" spacing={1}>
            {activeStep > 0 && <Button onClick={handleBack}>Back</Button>}
            {activeStep < STEPS.length - 1 ? (
              <Button variant="contained" onClick={handleNext} endIcon={<MdOutlineArrowForward />}>
                Next Step
              </Button>
            ) : (
              <>
                <Button variant="outlined" onClick={handleSaveDraft}>
                  Save Revision Draft
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<MdSend />}
                  onClick={() => setIsSendDialogOpen(true)}
                >
                  Send Revised Proposal
                </Button>
              </>
            )}
          </Stack>
        </DialogActions>
      </Dialog>

      {/* Send Delivery Dialog consuming SalesModal */}
      <SalesModal
        open={isSendDialogOpen}
        onClose={() => setIsSendDialogOpen(false)}
        title={`Send Revised Proposal (${nextVersionLabel})`}
        icon={<MdSend size={22} />}
        maxWidth="sm"
        actions={
          <>
            <Button onClick={() => setIsSendDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" color="success" startIcon={<MdSend />} onClick={handleConfirmSend}>
              Send Revised Proposal Now
            </Button>
          </>
        }
      >
        <Stack spacing={2}>
          <Alert severity="info">
            Sending <strong>{proposal.id} {nextVersionLabel}</strong> to <strong>{proposal.customer}</strong> will update its status to Sent and register a follow-up item in the Follow Up Planner.
          </Alert>

          <FormControl component="fieldset">
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, mb: 0.5 }}>
              SEND VIA CHANNEL
            </Typography>
            <RadioGroup
              row
              value={sendChannel}
              onChange={(e) => setSendChannel(e.target.value)}
            >
              <FormControlLabel value="Email" control={<Radio size="small" />} label="Email" />
              <FormControlLabel value="WhatsApp" control={<Radio size="small" />} label="WhatsApp" />
            </RadioGroup>
          </FormControl>

          <TextField
            label="Message Template"
            size="small"
            value={sendTemplate}
            onChange={(e) => setSendTemplate(e.target.value)}
            fullWidth
          />

          <TextField
            label="Message Content"
            multiline
            rows={4}
            value={sendMessage}
            onChange={(e) => setSendMessage(e.target.value)}
            fullWidth
          />
        </Stack>
      </SalesModal>
    </>
  );
}

export default CreateRevisionModal;

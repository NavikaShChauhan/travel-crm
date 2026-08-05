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
  IconButton,
  LinearProgress,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import {
  MdAdd,
  MdContentCopy,
  MdOutlineArrowForward,
  MdOutlineCheckCircle,
  MdOutlineDescription,
  MdSend,
  MdDelete,
  MdOutlineDelete,
} from 'react-icons/md';
import { formatCurrency } from '@utils/formatters';
import { tokens } from '@styles/theme';
import SelectQualifiedLeadModal from './SelectQualifiedLeadModal';
import CreateProposalWizard from './CreateProposalWizard';

const INITIAL_PROPOSALS = [
  {
    id: 'PR-2601',
    customer: 'Rohan & Anjali Mehta',
    destination: 'Bali',
    amount: 269040,
    status: 'Needs follow-up',
    version: 2,
    progress: 68,
    next: 'Review customer price request',
    executive: 'Priya Sharma',
    versions: ['V1 · Initial proposal', 'V2 · Hotel upgrade'],
  },
  {
    id: 'PR-2602',
    customer: 'Siddharth Verma',
    destination: 'Kerala',
    amount: 135700,
    status: 'Viewed',
    version: 1,
    progress: 52,
    next: 'Call to understand preferences',
    executive: 'Arjun Nair',
    versions: ['V1 · Initial proposal'],
  },
  {
    id: 'PR-2603',
    customer: 'The Khanna Family',
    destination: 'Rajasthan',
    amount: 430700,
    status: 'In negotiation',
    version: 3,
    progress: 82,
    next: 'Share final room configuration',
    executive: 'Meera Pillai',
    versions: ['V1 · Initial proposal', 'V2 · Added Jaisalmer', 'V3 · Room revision'],
  },
];

const statusColor = {
  Draft: tokens.color.ink400,
  'Needs follow-up': tokens.color.gold600,
  Viewed: '#2563EB',
  'In negotiation': tokens.color.teal500,
  Sent: tokens.color.teal500,
};

function ProposalDashboard() {
  const [proposals, setProposals] = useState(INITIAL_PROPOSALS);
  const [selectedId, setSelectedId] = useState(INITIAL_PROPOSALS[0]?.id || '');

  // Delete Confirmation State
  const [proposalToDelete, setProposalToDelete] = useState(null);

  // Proposal Creation Stepper State (Entry Point 2)
  const [isSelectLeadOpen, setIsSelectLeadOpen] = useState(false);
  const [selectedLeadForProposal, setSelectedLeadForProposal] = useState(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [notification, setNotification] = useState('');

  const selected = proposals.find((p) => p.id === selectedId) || proposals[0];

  const handleSelectLeadContinue = (lead) => {
    setSelectedLeadForProposal(lead);
    setIsSelectLeadOpen(false);
    setIsWizardOpen(true);
  };

  const handleSaveProposalFromWizard = (newProposal) => {
    setProposals((prev) => [newProposal, ...prev]);
    setSelectedId(newProposal.id);
    setNotification(`Proposal ${newProposal.id} created for ${newProposal.customer}`);
  };

  const handleDeleteProposal = (id) => {
    const updated = proposals.filter((p) => p.id !== id);
    setProposals(updated);
    if (selectedId === id && updated.length > 0) {
      setSelectedId(updated[0].id);
    }
    setProposalToDelete(null);
    setNotification(`Proposal ${id} deleted successfully.`);
  };

  const handleDeleteVersion = (indexToDelete) => {
    if (!selected) return;
    setProposals((items) =>
      items.map((proposal) =>
        proposal.id === selected.id
          ? {
            ...proposal,
            versions: proposal.versions.filter((_, idx) => idx !== indexToDelete),
            version: Math.max(1, proposal.version - (indexToDelete === proposal.versions.length - 1 ? 1 : 0)),
          }
          : proposal
      )
    );
    setNotification(`Version removed from proposal ${selected.id}.`);
  };

  const revise = () =>
    setProposals((items) =>
      items.map((proposal) =>
        proposal.id === selected.id
          ? {
            ...proposal,
            version: proposal.version + 1,
            status: 'Needs follow-up',
            progress: Math.min(proposal.progress + 6, 100),
            versions: [...proposal.versions, `V${proposal.version + 1} · Customer revision`],
          }
          : proposal
      )
    );

  const sendProposal = () => {
    setProposals((items) =>
      items.map((proposal) =>
        proposal.id === selected.id
          ? {
            ...proposal,
            status: 'Needs follow-up',
            progress: Math.max(proposal.progress, 60),
            next: 'Wait for customer response',
          }
          : proposal
      )
    );
    setNotification(`Proposal ${selected.id} sent to ${selected.customer}`);
  };

  const metrics = [
    ['Working proposals', proposals.length],
    ['Waiting for customer', proposals.filter((p) => p.status === 'Needs follow-up').length],
    ['Ready to send', proposals.filter((p) => p.status === 'Draft').length],
    ['Accepted this month', 14],
    ['Proposal value', formatCurrency(proposals.reduce((sum, p) => sum + p.amount, 0))],
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        spacing={1.5}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Proposal Studio
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Build confidence in every proposal, then make the next customer decision effortless.
          </Typography>
        </Box>
        {/* Entry Point 2: Click "+ Create proposal" opens Select Qualified Lead Modal */}
        <Button variant="contained" startIcon={<MdAdd />} onClick={() => setIsSelectLeadOpen(true)}>
          Create proposal
        </Button>
      </Stack>

      {/* Metrics Row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 1.25 }}>
        {metrics.map(([label, value], index) => (
          <Card
            key={label}
            className="sales-interactive"
            sx={{ p: 1.5, borderTop: `3px solid ${index === 3 ? tokens.color.teal500 : tokens.color.navy700}` }}
          >
            <Typography variant="caption" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
              {value}
            </Typography>
          </Card>
        ))}
      </Box>

      {/* Main Grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '340px minmax(0, 1fr)' }, gap: 2.5 }}>
        {/* Proposal Queue Sidebar */}
        <Card sx={{ p: 1.25 }}>
          <Typography variant="subtitle1" sx={{ p: 0.75, fontWeight: 700 }}>
            Proposal queue
          </Typography>
          <Stack spacing={0.75}>
            {proposals.map((proposal) => (
              <Box
                key={proposal.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedId(proposal.id)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedId(proposal.id)}
                sx={{
                  p: 1.5,
                  cursor: 'pointer',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: selected?.id === proposal.id ? tokens.color.navy700 : 'transparent',
                  bgcolor: selected?.id === proposal.id ? 'rgba(49,68,110,.06)' : 'transparent',
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1}>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {proposal.customer}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {proposal.id} · {proposal.destination}
                    </Typography>
                  </Box>
                  <Chip
                    size="small"
                    label={proposal.status}
                    sx={{
                      color: statusColor[proposal.status] || tokens.color.navy700,
                      bgcolor: `${statusColor[proposal.status] || tokens.color.navy700}18`,
                      fontWeight: 700,
                    }}
                  />
                </Stack>
                <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                  {proposal.next}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Card>

        {/* Selected Proposal Workspace */}
        {selected ? (
          <Card sx={{ p: { xs: 2, md: 3 } }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between">
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {selected.customer}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selected.id} · {selected.destination} · {selected.executive}
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ color: tokens.color.navy700, fontWeight: 700 }}>
                {formatCurrency(selected.amount)}
              </Typography>
            </Stack>

            <Box sx={{ mt: 2.5, p: 2, borderRadius: 2, bgcolor: 'rgba(49,68,110,.06)' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Next best action
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {selected.next}
              </Typography>
              <Button size="small" endIcon={<MdOutlineArrowForward />} sx={{ mt: 1 }}>
                Open customer conversation
              </Button>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mt: 2.5 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Proposal readiness
                </Typography>
                <LinearProgress variant="determinate" value={selected.progress} sx={{ mt: 1.25, height: 8, borderRadius: 5 }} />
                <Typography variant="caption" color="text.secondary">
                  {selected.progress}% ready to convert
                </Typography>
                <Stack spacing={0.9} sx={{ mt: 1.5 }}>
                  {['Itinerary', 'Pricing', 'Supplier availability', 'Customer review'].map((item, index) => (
                    <Stack key={item} direction="row" spacing={0.75} alignItems="center">
                      <MdOutlineCheckCircle size={16} color={index < 3 ? tokens.color.teal500 : tokens.color.ink400} />
                      <Typography variant="body2" color={index < 3 ? 'text.primary' : 'text.secondary'}>
                        {item}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Version story
                </Typography>
                <Stack spacing={0.75} sx={{ mt: 1 }}>
                  {selected.versions.map((version, index) => (
                    <Box
                      key={`${version}-${index}`}
                      sx={{
                        p: 1,
                        borderRadius: 1.5,
                        bgcolor: index === selected.versions.length - 1 ? 'rgba(47,143,134,.08)' : 'background.default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: index === selected.versions.length - 1 ? 700 : 500 }}>
                        {version}
                        {index === selected.versions.length - 1 ? ' · Current' : ''}
                      </Typography>
                      {selected.versions.length > 1 && (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteVersion(index)}
                          sx={{ p: 0.2 }}
                          title="Delete version"
                        >
                          <MdOutlineDelete size={16} />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Stack direction="row" gap={1} flexWrap="wrap" justifyContent="space-between">
              <Stack direction="row" gap={1} flexWrap="wrap">
                <Button size="small" variant="contained" startIcon={<MdSend />} onClick={sendProposal}>
                  Send proposal
                </Button>
                <Button size="small" variant="outlined" startIcon={<MdContentCopy />} onClick={revise}>
                  Create revised proposal
                </Button>
                <Button size="small" variant="outlined" startIcon={<MdOutlineDescription />} onClick={() => setIsPreviewOpen(true)}>
                  Preview
                </Button>
                <Button size="small" onClick={() => setIsActivityOpen(true)}>
                  View activity
                </Button>
              </Stack>

              {/* Delete Option for Workspace */}
              <Button
                size="small"
                variant="outlined"
                color="error"
                startIcon={<MdDelete />}
                onClick={() => setProposalToDelete(selected)}
              >
                Delete proposal
              </Button>
            </Stack>
          </Card>
        ) : (
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No proposals found. Click "+ Create proposal" to build your first proposal.
            </Typography>
          </Card>
        )}
      </Box>

      {/* Delete Confirmation Modal */}
      <Dialog open={Boolean(proposalToDelete)} onClose={() => setProposalToDelete(null)}>
        <DialogTitle>Confirm Delete Proposal</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to delete proposal <strong>{proposalToDelete?.id}</strong> for{' '}
            <strong>{proposalToDelete?.customer}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProposalToDelete(null)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => handleDeleteProposal(proposalToDelete?.id)}
          >
            Delete Proposal
          </Button>
        </DialogActions>
      </Dialog>

      {/* Entry Point 2 - Step 1: Select Qualified Lead Dialog */}
      <SelectQualifiedLeadModal
        open={isSelectLeadOpen}
        onClose={() => setIsSelectLeadOpen(false)}
        onSelectLead={handleSelectLeadContinue}
      />

      {/* Entry Point 2 - Step 2: Proposal Wizard for selected lead */}
      {selectedLeadForProposal && (
        <CreateProposalWizard
          open={isWizardOpen}
          onClose={() => {
            setIsWizardOpen(false);
            setSelectedLeadForProposal(null);
          }}
          lead={selectedLeadForProposal}
          onSaveProposal={handleSaveProposalFromWizard}
        />
      )}

      {/* Preview Dialog */}
      {selected && (
        <Dialog open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} fullWidth maxWidth="md">
          <DialogTitle>Proposal preview · {selected.id}</DialogTitle>
          <DialogContent dividers>
            <Box sx={{ p: { xs: 1, sm: 3 }, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: tokens.color.navy900 }}>
                    Voyage
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tailored travel proposal
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {selected.id} · V{selected.version}
                </Typography>
              </Stack>
              <Divider sx={{ my: 2.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {selected.destination} experience
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Prepared for {selected.customer} by {selected.executive}
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 1.5, mt: 2.5 }}>
                {[
                  ['Package', selected.packageType || 'Custom'],
                  ['Proposal value', formatCurrency(selected.amount)],
                  ['Status', selected.status],
                ].map(([label, value]) => (
                  <Box key={label} sx={{ p: 1.5, bgcolor: 'background.default', borderRadius: 1.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {label}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 3 }}>
                Included in this proposal
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Curated stay, transfers, sightseeing, and itinerary support. Final inclusions are confirmed with the customer before booking.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
            <Button
              variant="contained"
              startIcon={<MdSend />}
              onClick={() => {
                setIsPreviewOpen(false);
                sendProposal();
              }}
            >
              Send proposal
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Activity Dialog */}
      {selected && (
        <Dialog open={isActivityOpen} onClose={() => setIsActivityOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>Proposal activity</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={1.5}>
              {[
                ['Today', `Version ${selected.version} is current`],
                ['Yesterday', 'Pricing and itinerary reviewed'],
                ['30 Jul', 'Proposal draft created'],
              ].map(([date, event]) => (
                <Stack key={`${date}-${event}`} direction="row" spacing={2}>
                  <Typography variant="caption" sx={{ width: 56, color: tokens.color.ink400 }}>
                    {date}
                  </Typography>
                  <Typography variant="body2">{event}</Typography>
                </Stack>
              ))}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsActivityOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Notification Toast */}
      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={3500}
        onClose={() => setNotification('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setNotification('')}>
          {notification}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProposalDashboard;

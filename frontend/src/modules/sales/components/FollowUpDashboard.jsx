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
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {
  MdCall,
  MdEmail,
  MdOutlineCheckCircle,
  MdOutlineSchedule,
  MdWhatsapp,
  MdSms,
  MdSend,
  MdHistory,
  MdMoreVert,
  MdDelete,
  MdInfo,
} from 'react-icons/md';
import { tokens } from '@styles/theme';
import { MODE_TEMPLATES, generateTemplateContent } from '../data/followUpTemplates';

const MOCK_TASKS = [
  {
    id: 'FU-301',
    customerId: 'CUST-1003',
    leadId: 'LD-1003',
    proposalId: 'PR-2603',
    time: '10:30',
    customer: 'The Khanna Family',
    destination: 'Rajasthan',
    amount: '₹3,85,000',
    mode: 'Call',
    status: 'Priority',
    reason: 'Discuss hotel upgrade and final price',
    response: 'Requested changes on room category',
    executive: 'Meera Pillai',
  },
  {
    id: 'FU-302',
    customerId: 'CUST-1001',
    leadId: 'LD-1001',
    proposalId: 'PR-2601',
    time: '11:00',
    customer: 'Rohan & Anjali Mehta',
    destination: 'Bali',
    amount: '₹2,69,040',
    mode: 'WhatsApp',
    status: 'Today',
    reason: 'Follow up on revised price proposal',
    response: 'Thinking about beachfront villa option',
    executive: 'Priya Sharma',
  },
  {
    id: 'FU-303',
    customerId: 'CUST-1002',
    leadId: 'LD-1002',
    proposalId: 'PR-2602',
    time: '14:30',
    customer: 'Siddharth Verma',
    destination: 'Kerala',
    amount: '₹1,20,000',
    mode: 'Call',
    status: 'Today',
    reason: 'Understand package preferences & houseboats',
    response: 'Viewed proposal twice today',
    executive: 'Arjun Nair',
  },
  {
    id: 'FU-304',
    customerId: 'CUST-1004',
    leadId: 'LD-1004',
    proposalId: 'PR-2604',
    time: '16:00',
    customer: 'Deepika Reddy',
    destination: 'Andaman',
    amount: '₹85,000',
    mode: 'Email',
    status: 'Upcoming',
    reason: 'Share flight options and resort stay choices',
    response: 'Waiting for leave approval from office',
    executive: 'Karan Malhotra',
  },
  {
    id: 'FU-305',
    customerId: 'CUST-1005',
    leadId: 'LD-1005',
    proposalId: 'PR-2605',
    time: '17:00',
    customer: 'Vikram & Nisha Patel',
    destination: 'Switzerland',
    amount: '₹4,85,000',
    mode: 'Call',
    status: 'Priority',
    reason: 'Glacier Express fare hold deadline reminder',
    response: 'Customer agreed conditionally on call',
    executive: 'Priya Sharma',
  },
  {
    id: 'FU-306',
    customerId: 'CUST-1006',
    leadId: 'LD-1006',
    proposalId: 'PR-2606',
    time: '17:30',
    customer: 'Adventure Club Mumbai',
    destination: 'Ladakh',
    amount: '₹7,20,000',
    mode: 'SMS',
    status: 'Today',
    reason: 'Confirm headcount for bike & flight booking',
    response: 'Awaiting internal committee sign-off',
    executive: 'Arjun Nair',
  },
  {
    id: 'FU-307',
    customerId: 'CUST-1008',
    leadId: 'LD-1008',
    proposalId: 'PR-2608',
    time: '18:15',
    customer: 'Sunita & Arvind Kapoor',
    destination: 'Europe',
    amount: '₹6,50,000',
    mode: 'Email',
    status: 'Upcoming',
    reason: 'Grand Capitals 15D itinerary final walkthrough',
    response: 'Requested day-wise hotel list',
    executive: 'Meera Pillai',
  },
];

function FollowUpDashboard() {
  const [tasks] = useState(MOCK_TASKS);
  const [selectedTask, setSelectedTask] = useState(MOCK_TASKS[0]);
  const [completed, setCompleted] = useState([]);

  // Selected communication mode (Call, WhatsApp, Email, SMS)
  const [commMode, setCommMode] = useState(MOCK_TASKS[0].mode || 'Call');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [subjectText, setSubjectText] = useState('');
  const [messageText, setMessageText] = useState('');

  // Activity log history
  const [activities, setActivities] = useState([
    {
      id: 'ACT-901',
      customerId: 'CUST-1003',
      proposalId: 'PR-2603',
      timestamp: '03 Aug · 10:15 am',
      type: 'Call',
      title: 'Call logged with The Khanna Family',
      details: 'Discussed connecting rooms requirement.',
    },
  ]);

  // Log Item Context Menu & Dialogs state
  const [logMenuAnchorEl, setLogMenuAnchorEl] = useState(null);
  const [activeLogItem, setActiveLogItem] = useState(null);
  const [detailsLogItem, setDetailsLogItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [toastMessage, setToastMessage] = useState('');

  const handleOpenLogMenu = (event, item) => {
    setLogMenuAnchorEl(event.currentTarget);
    setActiveLogItem(item);
  };

  const handleCloseLogMenu = () => {
    setLogMenuAnchorEl(null);
    setActiveLogItem(null);
  };

  const handleViewLogDetails = (item) => {
    setDetailsLogItem(item);
    handleCloseLogMenu();
  };

  const handlePromptDelete = (item) => {
    setItemToDelete(item);
    handleCloseLogMenu();
  };

  const handleDeleteLogRecord = () => {
    if (itemToDelete) {
      setActivities((prev) => prev.filter((a) => a.id !== itemToDelete.id));
      setToastMessage('Communication record deleted.');
      setItemToDelete(null);
    }
  };

  // When user clicks a customer from the left list
  const handleSelectTask = (task) => {
    setSelectedTask(task);
    setCommMode(task.mode || 'Call');
    setSelectedTemplate('');
    setSubjectText('');
    setMessageText('');
  };

  // When user changes communication mode tab/toggle
  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setCommMode(newMode);
      setSelectedTemplate('');
      setSubjectText('');
      setMessageText('');
    }
  };

  // When user selects a template from the dropdown
  const handleTemplateChange = (event) => {
    const tmpl = event.target.value;
    setSelectedTemplate(tmpl);

    if (tmpl) {
      const generated = generateTemplateContent(commMode, tmpl, {
        customer: selectedTask.customer,
        destination: selectedTask.destination,
        proposalId: selectedTask.proposalId,
        amount: selectedTask.amount,
        executive: selectedTask.executive,
      });
      setSubjectText(generated.subject || '');
      setMessageText(generated.message || '');
    } else {
      setSubjectText('');
      setMessageText('');
    }
  };

  // Execute Action (Send Now / Log Call)
  const handleExecuteAction = (actionType) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newActivity = {
      id: `ACT-${Math.floor(900 + Math.random() * 100)}`,
      customerId: selectedTask.customerId,
      proposalId: selectedTask.proposalId,
      timestamp: `Today · ${now}`,
      type: commMode,
      title: `${actionType === 'Log Call' ? 'Call Logged' : 'Message Sent'} (${commMode}) to ${selectedTask.customer}`,
      details: commMode === 'Email' ? `Subject: ${subjectText}\n${messageText}` : messageText,
    };

    setActivities((prev) => [newActivity, ...prev]);

    if (actionType === 'Log Call') {
      setToastMessage(`Call logged for ${selectedTask.customer}. Relational Activity ${newActivity.id} created.`);
    } else if (actionType === 'Schedule') {
      setToastMessage(`Follow-up scheduled via ${commMode} for ${selectedTask.customer}.`);
    } else {
      setToastMessage(`${commMode} message sent to ${selectedTask.customer} successfully!`);
    }
  };

  const handleMarkComplete = (taskCustomer) => {
    setCompleted((prev) => [...prev, taskCustomer]);
    setToastMessage(`Follow-up for ${taskCustomer} marked as Complete.`);
  };

  const metrics = [
    ['Calls today', tasks.filter((t) => t.mode === 'Call').length],
    ['Waiting for response', tasks.length - completed.length],
    ['Overdue', 1],
    ['Completed today', completed.length],
    ['Best time to call', '10–12 pm'],
    ['Conversion this week', '22%'],
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Header */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Follow Up Planner
        </Typography>
        <Typography variant="body2" color="text.secondary">
          A calm, day-first view of the conversations that move proposals forward.
        </Typography>
      </Box>

      {/* Metric Cards Row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 1.25 }}>
        {metrics.map(([label, value], index) => (
          <Card
            key={label}
            sx={{
              p: 1.5,
              borderTop: `3px solid ${index === 2 ? tokens.color.coral500 : index === 5 ? tokens.color.teal500 : tokens.color.navy700
                }`,
            }}
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

      {/* Main Grid: Left Conversation Plan List + Right Preparation Panel */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.25fr 1fr' }, gap: 2.5, alignItems: 'start' }}>
        {/* Left Column: Today's Conversation Plan */}
        <Card sx={{ p: { xs: 2, md: 2.5 } }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                Today’s conversation plan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tap a customer to prepare for the next touchpoint.
              </Typography>
            </Box>
            <Chip label="Today" color="primary" sx={{ fontWeight: 700 }} />
          </Stack>

          {/* Scrollable Conversation List Box (only list scrolls) */}
          <Box
            sx={{
              maxHeight: { xs: 340, md: 450 },
              overflowY: 'auto',
              pr: 1,
              '&::-webkit-scrollbar': { width: 6 },
              '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(27,42,74,0.2)', borderRadius: 3 },
            }}
          >
            <Stack spacing={0} divider={<Divider flexItem />}>
              {tasks.map((task) => {
                const isSelected = selectedTask.id === task.id;
                const isDone = completed.includes(task.customer);

                return (
                  <Stack
                    key={task.id}
                    direction="row"
                    spacing={1.5}
                    onClick={() => handleSelectTask(task)}
                    sx={{
                      py: 1.75,
                      px: 1.25,
                      borderRadius: 2,
                      cursor: 'pointer',
                      bgcolor: isSelected ? 'rgba(49,68,110,.08)' : 'transparent',
                      borderLeft: isSelected ? `4px solid ${tokens.color.navy700}` : '4px solid transparent',
                      opacity: isDone ? 0.5 : 1,
                      transition: 'all 0.15s ease',
                      '&:hover': {
                        bgcolor: isSelected ? 'rgba(49,68,110,.12)' : 'rgba(11,21,38,.03)',
                      },
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ width: 44, color: tokens.color.navy700, fontWeight: 700 }}>
                      {task.time}
                    </Typography>
                    <Box
                      sx={{
                        width: 4,
                        borderRadius: 3,
                        bgcolor: task.status === 'Priority' ? tokens.color.coral500 : tokens.color.navy700,
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {task.customer}
                        </Typography>
                        <Chip
                          size="small"
                          label={task.mode}
                          variant="outlined"
                          sx={{
                            fontWeight: 600,
                            borderColor: isSelected ? tokens.color.navy700 : 'divider',
                          }}
                        />
                      </Stack>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.25 }}>
                        {task.destination} · {task.proposalId} · {task.reason}
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        </Card>

        {/* Right Column: Prepare for this conversation Panel */}
        <Card sx={{ p: { xs: 2, md: 2.5 }, bgcolor: 'rgba(49,68,110,.04)', border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Prepare for this conversation
          </Typography>

          <Box sx={{ mt: 1.5, p: 2, borderRadius: 2, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.color.navy900 }}>
                  {selectedTask.customer}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedTask.destination} · Proposal {selectedTask.proposalId} · {selectedTask.amount}
                </Typography>
              </Box>
              <Chip
                size="small"
                label={selectedTask.status}
                color={selectedTask.status === 'Priority' ? 'error' : 'default'}
              />
            </Stack>
            <Stack spacing={1} sx={{ mt: 1.5 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Customer signal:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedTask.response}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Conversation goal:</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedTask.reason}</Typography>
              </Box>
            </Stack>
          </Box>

          {/* Mode Selector Toggle Buttons */}
          <Box sx={{ mt: 2.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, mb: 0.75, display: 'block' }}>
              SELECT COMMUNICATION MODE
            </Typography>
            <ToggleButtonGroup
              value={commMode}
              exclusive
              onChange={handleModeChange}
              fullWidth
              size="small"
              sx={{ bgcolor: 'background.paper' }}
            >
              <ToggleButton value="Call" sx={{ fontWeight: 600 }}>
                <MdCall size={16} style={{ marginRight: 6 }} /> Call
              </ToggleButton>
              <ToggleButton value="WhatsApp" sx={{ fontWeight: 600 }}>
                <MdWhatsapp size={16} style={{ marginRight: 6 }} /> WhatsApp
              </ToggleButton>
              <ToggleButton value="Email" sx={{ fontWeight: 600 }}>
                <MdEmail size={16} style={{ marginRight: 6 }} /> Email
              </ToggleButton>
              <ToggleButton value="SMS" sx={{ fontWeight: 600 }}>
                <MdSms size={16} style={{ marginRight: 6 }} /> SMS
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Mode-Specific Template Dropdown */}
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Select {commMode} Template</InputLabel>
              <Select
                value={selectedTemplate}
                label={`Select ${commMode} Template`}
                onChange={handleTemplateChange}
                sx={{ bgcolor: 'background.paper' }}
              >
                <MenuItem value="">
                  <em>Select Template ▼</em>
                </MenuItem>
                {MODE_TEMPLATES[commMode]?.map((tmpl) => (
                  <MenuItem key={tmpl} value={tmpl}>
                    {tmpl}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Editable Content Fields */}
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {commMode === 'Email' && (
              <TextField
                label="Subject"
                size="small"
                value={subjectText}
                onChange={(e) => setSubjectText(e.target.value)}
                placeholder="Enter email subject line..."
                fullWidth
                sx={{ bgcolor: 'background.paper' }}
              />
            )}

            <TextField
              label={commMode === 'Call' ? 'Talking Points / Call Notes' : 'Message'}
              size="small"
              multiline
              rows={commMode === 'Call' ? 4 : 5}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={
                commMode === 'Call'
                  ? 'Enter key call talking points or call notes...'
                  : `Type your ${commMode} message...`
              }
              fullWidth
              sx={{ bgcolor: 'background.paper' }}
            />
          </Stack>

          {/* Action Buttons */}
          <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mt: 2.5 }}>
            {commMode === 'Call' ? (
              <Button
                size="small"
                variant="contained"
                startIcon={<MdCall />}
                onClick={() => handleExecuteAction('Log Call')}
              >
                Log Call Notes
              </Button>
            ) : (
              <Button
                size="small"
                variant="contained"
                startIcon={<MdSend />}
                onClick={() => handleExecuteAction('Send Now')}
              >
                Send {commMode} Now
              </Button>
            )}

            <Button
              size="small"
              variant="outlined"
              startIcon={<MdOutlineSchedule />}
              onClick={() => handleExecuteAction('Schedule')}
            >
              Schedule
            </Button>

            <Button
              size="small"
              variant="outlined"
              color="success"
              startIcon={<MdOutlineCheckCircle />}
              onClick={() => handleMarkComplete(selectedTask.customer)}
            >
              Complete
            </Button>
          </Stack>

          {/* Communication / Activity Log Section */}
          {activities.filter((a) => a.customerId === selectedTask.customerId).length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 700, mb: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}
              >
                <MdHistory size={14} /> RECENT COMMUNICATION LOG
              </Typography>
              <Stack spacing={1}>
                {activities
                  .filter((a) => a.customerId === selectedTask.customerId)
                  .map((act) => (
                    <Box
                      key={act.id}
                      sx={{
                        p: 1.25,
                        borderRadius: 1.5,
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box sx={{ pr: 1, flex: 1 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.color.navy700, display: 'block' }}>
                            {act.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {act.timestamp}
                          </Typography>
                        </Box>
                        {/* Unobtrusive Three-dot Action Menu */}
                        <IconButton
                          size="small"
                          onClick={(e) => handleOpenLogMenu(e, act)}
                          sx={{ p: 0.2, color: 'text.secondary' }}
                        >
                          <MdMoreVert size={16} />
                        </IconButton>
                      </Stack>
                      <Typography
                        variant="caption"
                        display="block"
                        color="text.secondary"
                        sx={{ mt: 0.5, whiteSpace: 'pre-line' }}
                      >
                        {act.details}
                      </Typography>
                    </Box>
                  ))}
              </Stack>
            </Box>
          )}
        </Card>
      </Box>

      {/* Popover Action Menu for Communication Log Item */}
      <Menu
        anchorEl={logMenuAnchorEl}
        open={Boolean(logMenuAnchorEl)}
        onClose={handleCloseLogMenu}
      >
        {activeLogItem && (
          <Box>
            <MenuItem onClick={() => handleViewLogDetails(activeLogItem)}>
              <MdInfo style={{ marginRight: 8 }} /> View Details
            </MenuItem>
            <MenuItem onClick={() => handlePromptDelete(activeLogItem)} sx={{ color: 'error.main' }}>
              <MdDelete style={{ marginRight: 8 }} /> Delete
            </MenuItem>
          </Box>
        )}
      </Menu>

      {/* View Communication Details Dialog */}
      <Dialog
        open={Boolean(detailsLogItem)}
        onClose={() => setDetailsLogItem(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Communication Details</DialogTitle>
        <DialogContent dividers>
          {detailsLogItem && (
            <Stack spacing={1.5}>
              <Box sx={{ p: 1.5, borderRadius: 1.5, bgcolor: 'background.default' }}>
                <Typography variant="caption" color="text.secondary" display="block">
                  Relational Linkages
                </Typography>
                <Typography variant="caption" display="block">
                  <strong>Activity ID:</strong> {detailsLogItem.id}
                </Typography>
                <Typography variant="caption" display="block">
                  <strong>Customer ID:</strong> {detailsLogItem.customerId}
                </Typography>
                <Typography variant="caption" display="block">
                  <strong>Proposal ID:</strong> {detailsLogItem.proposalId}
                </Typography>
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {detailsLogItem.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {detailsLogItem.timestamp}
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                {detailsLogItem.details}
              </Typography>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsLogItem(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Safety Dialog */}
      <Dialog
        open={Boolean(itemToDelete)}
        onClose={() => setItemToDelete(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Communication?</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Are you sure you want to delete this communication record? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setItemToDelete(null)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDeleteLogRecord}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification Toast */}
      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={4000}
        onClose={() => setToastMessage('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setToastMessage('')}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default FollowUpDashboard;

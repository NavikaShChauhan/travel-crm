import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import {
  MdSearch,
  MdSend,
  MdAttachFile,
  MdOutlineCall,
  MdCheckCircle,
  MdAdd,
  MdOutlineFolderZip,
} from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

import { useInquiry } from '../contexts/InquiryContext';
import LeadDetailDrawer from '../components/LeadDetailDrawer';

export default function InquiryWhatsappPage() {
  const { leads, openDrawer, openAddModal, updateLead } = useInquiry();
  const whatsappLeads = leads.filter((l) => l.source === 'whatsapp' || l.leadSource === 'whatsapp' || l.followupMode === 'WhatsApp');

  const [activeLeadId, setActiveLeadId] = useState(whatsappLeads[0]?.id || leads[0]?.id);
  const [chatMessage, setChatMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const activeLead = leads.find((l) => l.id === activeLeadId) || whatsappLeads[0] || leads[0];

  const chatHistory = activeLead?.whatsappChatHistory || [
    { sender: 'client', text: `Hi! I need travel details for ${activeLead?.destination || 'Bali'} for ${activeLead?.pax || 2} adults.`, time: '10:15 AM' },
    { sender: 'bot', text: `Hello ${activeLead?.clientName || 'Valued Client'}! Welcome to Voyage CRM. Here are our top packages.`, time: '10:16 AM' },
    { sender: 'agent', text: 'Our travel executive has shared the customized itinerary. Would you like to schedule a quick call?', time: '11:00 AM' },
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg = { sender: 'agent', text: chatMessage, time: timeStr };

    const updatedHistory = [...chatHistory, newMsg];
    updateLead(activeLead.id, { whatsappChatHistory: updatedHistory });
    setChatMessage('');
  };

  const handleSendTemplate = (templateName) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const templateMsg = `[TEMPLATE SENT: ${templateName}] Dear ${activeLead?.clientName || 'Customer'}, please view your updated trip package: https://voyagetravel.com/q/${activeLead?.id?.replace('/', '-')}`;

    const updatedHistory = [...chatHistory, { sender: 'agent', text: templateMsg, time: timeStr }];
    updateLead(activeLead.id, { whatsappChatHistory: updatedHistory });
  };

  return (
    <Box>
      <LeadDetailDrawer />

      {/* Header Bar */}
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" justifyContent="space-between" spacing={2} sx={{ mb: 2.5 }}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ p: 1, borderRadius: '12px', bgcolor: '#DCFCE7', color: '#16A34A', display: 'flex' }}>
              <FaWhatsapp size={24} />
            </Box>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', fontSize: 22 }}>
                WhatsApp Inquiry Engine & Live Chat Inbox
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', fontSize: 13 }}>
                Live chat history, quick template quotes, and automated WhatsApp lead capture.
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Button
          variant="contained"
          startIcon={<MdAdd size={20} />}
          onClick={openAddModal}
          sx={{
            background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
            borderRadius: '10px',
            px: 2.5,
            py: 1,
            fontWeight: 700,
            textTransform: 'none',
            fontSize: 14,
            boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)',
          }}
        >
          + New WhatsApp Inquiry
        </Button>
      </Stack>

      {/* Split Chat Box */}
      <Grid container spacing={2.5}>
        {/* Left Chat List Column */}
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ p: 2, borderRadius: '18px', border: '1px solid #F1F5F9', height: 600, display: 'flex', flexDirection: 'column' }}>
            <TextField
              placeholder="Search WhatsApp chats..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdSearch size={18} color="#64748B" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2, bgcolor: '#F8FAFC', borderRadius: '10px' }}
            />

            <Box sx={{ flex: 1, overflowY: 'auto' }}>
              <Stack spacing={1}>
                {whatsappLeads.map((lead) => {
                  const isSelected = lead.id === activeLeadId;
                  return (
                    <Box
                      key={lead.id}
                      onClick={() => setActiveLeadId(lead.id)}
                      sx={{
                        p: 1.5,
                        borderRadius: '14px',
                        cursor: 'pointer',
                        bgcolor: isSelected ? '#EEF2FF' : '#FFFFFF',
                        border: '1px solid',
                        borderColor: isSelected ? '#C7D2FE' : '#F1F5F9',
                        transition: 'all 150ms ease',
                        '&:hover': { bgcolor: isSelected ? '#EEF2FF' : '#F8FAFC' },
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ bgcolor: isSelected ? '#6366F1' : '#10B981', fontWeight: 700, width: 40, height: 40, fontSize: 14 }}>
                          {(lead.clientName || lead.name || 'C')[0]}
                        </Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', noWrap: true }}>
                              {lead.clientName || lead.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: 11 }}>
                              10:45 AM
                            </Typography>
                          </Stack>
                          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', noWrap: true, mt: 0.25 }}>
                            {lead.destination} • {lead.pax || 1} pax
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Card>
        </Grid>

        {/* Right Active Chat Workspace */}
        <Grid item xs={12} md={8}>
          <Card elevation={0} sx={{ p: 2.5, borderRadius: '18px', border: '1px solid #F1F5F9', height: 600, display: 'flex', flexDirection: 'column' }}>
            {/* Chat Top Bar */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pb: 2, borderBottom: '1px solid #F1F5F9' }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar sx={{ bgcolor: '#6366F1', fontWeight: 700, width: 44, height: 44 }}>
                  {(activeLead?.clientName || 'C')[0]}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', lineHeight: 1.2 }}>
                    {activeLead?.clientName || activeLead?.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748B' }}>
                    {activeLead?.phone || activeLead?.contactPhone} • WhatsApp Active
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1}>
                <Chip
                  label={`Lead Status: ${activeLead?.status || 'New'}`}
                  size="small"
                  sx={{ fontWeight: 700, bgcolor: '#EEF2FF', color: '#6366F1' }}
                />
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => openDrawer(activeLead.id)}
                  sx={{ borderRadius: '8px', fontWeight: 700, textTransform: 'none', fontSize: 12 }}
                >
                  View 7-Section Lead
                </Button>
              </Stack>
            </Stack>

            {/* Quick Template Action Strip */}
            <Stack direction="row" spacing={1} sx={{ py: 1.5, borderBottom: '1px solid #F1F5F9', overflowX: 'auto' }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748B', alignSelf: 'center', mr: 1, whiteSpace: 'nowrap' }}>
                Quick Templates:
              </Typography>
              <Chip
                label="+ Send 4★ Villa Quote PDF"
                onClick={() => handleSendTemplate('4★ Villa Quote PDF')}
                clickable
                size="small"
                sx={{ bgcolor: '#DCFCE7', color: '#15803D', fontWeight: 700 }}
              />
              <Chip
                label="+ Send Payment Link"
                onClick={() => handleSendTemplate('Payment Link')}
                clickable
                size="small"
                sx={{ bgcolor: '#F3E8FF', color: '#8B5CF6', fontWeight: 700 }}
              />
              <Chip
                label="+ Follow-up Call Reminder"
                onClick={() => handleSendTemplate('Follow-up Reminder')}
                clickable
                size="small"
                sx={{ bgcolor: '#FEF3C7', color: '#D97706', fontWeight: 700 }}
              />
            </Stack>

            {/* Chat Messages Body */}
            <Box sx={{ flex: 1, overflowY: 'auto', py: 2, px: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {chatHistory.map((msg, index) => {
                const isMe = msg.sender === 'agent' || msg.sender === 'bot';
                return (
                  <Box
                    key={index}
                    sx={{
                      alignSelf: isMe ? 'flex-end' : 'flex-start',
                      maxWidth: '75%',
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1.75,
                        borderRadius: isMe ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                        bgcolor: isMe ? '#6366F1' : '#F1F5F9',
                        color: isMe ? '#FFFFFF' : '#0F172A',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.4 }}>
                        {msg.text}
                      </Typography>
                    </Paper>
                    <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: 10, mt: 0.5, display: 'block', textAlign: isMe ? 'right' : 'left' }}>
                      {msg.time} • {isMe ? 'Sent' : 'Received'}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Chat Input Bar */}
            <Stack direction="row" spacing={1} alignItems="center" sx={{ pt: 1.5, borderTop: '1px solid #F1F5F9' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type WhatsApp message or reply..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                sx={{ bgcolor: '#F8FAFC', borderRadius: '10px' }}
              />
              <IconButton color="primary" onClick={handleSendMessage} sx={{ bgcolor: '#6366F1', color: '#FFFFFF', '&:hover': { bgcolor: '#4F46E5' } }}>
                <MdSend size={18} />
              </IconButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

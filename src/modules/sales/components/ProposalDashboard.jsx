import { useMemo, useState } from 'react';
import { Box, Button, Card, Chip, Divider, Drawer, IconButton, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { MdAdd, MdClose, MdContentCopy, MdDeleteOutline, MdDownload, MdMoreVert, MdOutlineDescription, MdPrint, MdSend, MdWhatsapp } from 'react-icons/md';

import DataTable from '@components/tables/DataTable';
import { formatCurrency, formatDate } from '@utils/formatters';
import { tokens } from '@styles/theme';
import { MOCK_PROPOSALS } from '../data/proposal.mock';

const STATUS_COLORS = { draft: '#64748B', review: '#BF8B2C', sent: '#31446E', viewed: '#2563EB', negotiation: '#D49A15', revised: '#7C3AED', accepted: '#2F8F86', soft_confirm: '#2F8F86', confirmed: '#2F8F86', expired: '#D6604F', rejected: '#D6604F' };
const STATUS_OPTIONS = ['All', 'Draft', 'Review', 'Sent', 'Viewed', 'Negotiation', 'Revised', 'Accepted', 'Soft Confirm', 'Confirmed', 'Expired', 'Rejected'];

function ProposalStatus({ status }) {
  const label = status.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
  return <Chip size="small" label={label} sx={{ bgcolor: `${STATUS_COLORS[status] || tokens.color.ink400}18`, color: STATUS_COLORS[status] || tokens.color.ink400, fontWeight: 700, fontSize: 11 }} />;
}

function MetricCard({ label, value, accent = tokens.color.navy700 }) {
  return <Card sx={{ p: 1.75, minWidth: 0, borderTop: `3px solid ${accent}` }}>
    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</Typography>
    <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>{value}</Typography>
  </Card>;
}

function DetailSection({ title, values }) {
  return <Box component="section"><Typography variant="subtitle2" sx={{ color: tokens.color.navy900, fontWeight: 700, mb: 1 }}>{title}</Typography><Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 1.25 }}>{values.map(([label, value]) => <Box key={label}><Typography variant="caption" color="text.secondary">{label}</Typography><Typography variant="body2" sx={{ fontWeight: 600, overflowWrap: 'anywhere' }}>{value || '—'}</Typography></Box>)}</Box></Box>;
}

function ProposalDrawer({ proposal, onClose, onRevise }) {
  if (!proposal) return null;
  const total = proposal.amount - proposal.discount + proposal.tax;
  return <Drawer anchor="right" open={Boolean(proposal)} onClose={onClose} PaperProps={{ sx: { width: { xs: '100%', sm: 'min(45vw, 700px)' }, minWidth: { sm: 440 }, maxWidth: '100%', display: 'flex' } }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}><Box><Typography variant="h6" sx={{ fontWeight: 700 }}>{proposal.id} · V{proposal.version}</Typography><Typography variant="body2" color="text.secondary">{proposal.customer} · {proposal.destination}</Typography></Box><IconButton aria-label="Close proposal details" onClick={onClose}><MdClose /></IconButton></Stack>
    <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 2, sm: 3 } }}><Stack spacing={2.25} divider={<Divider flexItem />}>
      <DetailSection title="Customer" values={[['Name', proposal.customer], ['Contact', proposal.contact], ['Email', proposal.email], ['Lead ID', proposal.leadId]]} />
      <DetailSection title="Trip" values={[['Destination', proposal.destination], ['Departure', proposal.departure], ['Travel Date', formatDate(proposal.travelDate)], ['Duration', proposal.duration], ['PAX', proposal.pax], ['Package Type', proposal.packageType]]} />
      <DetailSection title="Cost" values={[['Package Price', formatCurrency(proposal.amount)], ['Discount', formatCurrency(proposal.discount)], ['Tax', formatCurrency(proposal.tax)], ['Total', formatCurrency(total)]]} />
      <Box><Typography variant="subtitle2" sx={{ color: tokens.color.navy900, fontWeight: 700, mb: 1 }}>Services Included</Typography><Stack direction="row" gap={0.75} flexWrap="wrap">{proposal.services.map((service) => <Chip key={service} size="small" label={service} variant="outlined" />)}</Stack></Box>
      <DetailSection title="Proposal" values={[['Version', `V${proposal.version} · Current`], ['Status', <ProposalStatus key="proposal-status" status={proposal.status} />], ['Created By', proposal.executive], ['Created Date', formatDate(proposal.createdDate)], ['Last Updated', formatDate(proposal.lastUpdated)]]} />
      <Box><Typography variant="subtitle2" sx={{ color: tokens.color.navy900, fontWeight: 700, mb: 1 }}>Timeline</Typography><Stack spacing={0.75}>{proposal.timeline.map((event) => <Typography key={event} variant="body2">• {event}</Typography>)}</Stack></Box>
      <DetailSection title="Notes" values={[['Customer Notes', proposal.customerNotes], ['Internal Notes', proposal.internalNotes]]} />
      <Box><Typography variant="subtitle2" sx={{ color: tokens.color.navy900, fontWeight: 700, mb: 1 }}>Version History</Typography><Stack spacing={1}>{proposal.revisions.map((revision) => <Box key={revision.version} sx={{ p: 1.25, bgcolor: revision.version === proposal.version ? 'rgba(47,143,134,0.08)' : 'background.default', borderRadius: 1 }}><Typography variant="body2" sx={{ fontWeight: 700 }}>Version {revision.version}{revision.version === proposal.version ? ' · Current' : ''}</Typography><Typography variant="caption" color="text.secondary">{revision.reason} · {revision.createdBy} · {formatDate(revision.createdAt)}</Typography></Box>)}</Stack><Stack direction="row" gap={1} sx={{ mt: 1.25 }}><Button size="small" variant="outlined">Compare Versions</Button><Button size="small" variant="outlined">Restore Previous</Button></Stack></Box>
    </Stack></Box>
    <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}><Stack direction="row" flexWrap="wrap" gap={1} justifyContent="flex-end"><Button size="small" variant="outlined">Edit</Button><Button size="small" variant="outlined" onClick={() => onRevise(proposal)}>Create Revised Proposal</Button><Button size="small" variant="outlined">Preview</Button><Button size="small" variant="outlined">Send Email</Button><Button size="small" variant="contained">Send WhatsApp</Button><Button size="small" onClick={onClose}>Close</Button></Stack></Box>
  </Drawer>;
}

function ProposalDashboard() {
  const [proposals, setProposals] = useState(MOCK_PROPOSALS);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState(''); const [status, setStatus] = useState('All'); const [date, setDate] = useState(''); const [executive, setExecutive] = useState('All'); const [destination, setDestination] = useState('All'); const [menu, setMenu] = useState(null);
  const executives = ['All', ...new Set(proposals.map((proposal) => proposal.executive))]; const destinations = ['All', ...new Set(proposals.map((proposal) => proposal.destination))];
  const filtered = useMemo(() => proposals.filter((proposal) => (!search || `${proposal.id} ${proposal.customer} ${proposal.destination}`.toLowerCase().includes(search.toLowerCase())) && (status === 'All' || proposal.status === status.toLowerCase().replace(/ /g, '_')) && (!date || proposal.travelDate === date) && (executive === 'All' || proposal.executive === executive) && (destination === 'All' || proposal.destination === destination)), [proposals, search, status, date, executive, destination]);
  const metrics = useMemo(() => { const count = (value) => proposals.filter((proposal) => proposal.status === value).length; const total = proposals.reduce((sum, proposal) => sum + proposal.amount, 0); return [['Total Proposals', proposals.length], ['Draft', count('draft')], ['Sent', count('sent')], ['Viewed', count('viewed')], ['Negotiation', count('negotiation')], ['Revised Proposals', proposals.filter((proposal) => proposal.version > 1).length], ['Accepted', count('accepted')], ['Rejected', count('rejected')], ['Expired', count('expired')], ['Total Proposal Value', formatCurrency(total)]]; }, [proposals]);
  const createProposal = () => { const number = 2600 + proposals.length + 1; const proposal = { ...MOCK_PROPOSALS[0], id: `PR-${number}`, version: 1, status: 'draft', sentDate: null, createdDate: new Date().toISOString(), lastUpdated: new Date().toISOString(), revisions: [{ version: 1, reason: 'New proposal', createdBy: 'Current user', createdAt: new Date().toISOString() }], timeline: ['Created'] }; setProposals((items) => [proposal, ...items]); setSelected(proposal); };
  const createRevision = (proposal) => { const nextVersion = proposal.version + 1; const revised = { ...proposal, id: `${proposal.id}-V${nextVersion}`, version: nextVersion, status: 'revised', lastUpdated: new Date().toISOString(), revisions: [...proposal.revisions, { version: nextVersion, reason: 'Customer requested itinerary revision', createdBy: 'Current user', createdAt: new Date().toISOString() }], timeline: [...proposal.timeline, 'Revised'] }; setProposals((items) => [revised, ...items]); setSelected(revised); };
  const columns = [{ key: 'id', label: 'Proposal ID' }, { key: 'customer', label: 'Customer' }, { key: 'destination', label: 'Destination' }, { key: 'travelDate', label: 'Travel Date', render: (row) => formatDate(row.travelDate) }, { key: 'pax', label: 'PAX', render: (row) => String(row.pax).split(' ')[0] }, { key: 'packageType', label: 'Package Type' }, { key: 'version', label: 'Version', render: (row) => `V${row.version}` }, { key: 'amount', label: 'Amount', render: (row) => formatCurrency(row.amount) }, { key: 'executive', label: 'Sales Executive' }, { key: 'status', label: 'Status', render: (row) => <ProposalStatus status={row.status} /> }, { key: 'sentDate', label: 'Sent Date', render: (row) => formatDate(row.sentDate) }, { key: 'lastUpdated', label: 'Last Updated', render: (row) => formatDate(row.lastUpdated) }, { key: 'actions', label: 'Actions', render: (row) => <IconButton size="small" aria-label={`Actions for ${row.id}`} onClick={(event) => setMenu({ anchor: event.currentTarget, proposal: row })}><MdMoreVert /></IconButton> }];
  return <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={1.5}><Box><Typography variant="h5" sx={{ fontWeight: 700 }}>Proposals</Typography><Typography variant="body2" color="text.secondary">Create, revise, and track customer proposals.</Typography></Box><Stack direction="row" gap={1}><Button variant="outlined" onClick={() => selected && createRevision(selected)}>Create Revised Proposal</Button><Button variant="contained" startIcon={<MdAdd />} onClick={createProposal}>Create Proposal</Button></Stack></Stack>
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 1.25 }}>{metrics.map(([label, value], index) => <MetricCard key={label} label={label} value={value} accent={index === 9 ? tokens.color.teal500 : undefined} />)}</Box>
    <Card sx={{ p: { xs: 2, md: 2.5 } }}><Stack direction={{ xs: 'column', lg: 'row' }} gap={1.25}><TextField size="small" label="Search" value={search} onChange={(event) => setSearch(event.target.value)} sx={{ minWidth: { lg: 220 } }} /><TextField select size="small" label="Status" value={status} onChange={(event) => setStatus(event.target.value)}>{STATUS_OPTIONS.map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}</TextField><TextField size="small" type="date" label="Travel date" value={date} onChange={(event) => setDate(event.target.value)} InputLabelProps={{ shrink: true }} /><TextField select size="small" label="Sales executive" value={executive} onChange={(event) => setExecutive(event.target.value)}>{executives.map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}</TextField><TextField select size="small" label="Destination" value={destination} onChange={(event) => setDestination(event.target.value)}>{destinations.map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}</TextField></Stack></Card>
    <Card sx={{ p: { xs: 1, md: 2 } }}><DataTable columns={columns} rows={filtered} showEmptyState={false} /></Card>
    <Menu anchorEl={menu?.anchor} open={Boolean(menu)} onClose={() => setMenu(null)}>{menu && <Box><MenuItem onClick={() => { setSelected(menu.proposal); setMenu(null); }}><MdOutlineDescription style={{ marginRight: 10 }} />View details</MenuItem><MenuItem onClick={() => { createRevision(menu.proposal); setMenu(null); }}><MdContentCopy style={{ marginRight: 10 }} />Create revised proposal</MenuItem><MenuItem onClick={() => setMenu(null)}><MdSend style={{ marginRight: 10 }} />Send email</MenuItem><MenuItem onClick={() => setMenu(null)}><MdWhatsapp style={{ marginRight: 10 }} />Send WhatsApp</MenuItem><MenuItem onClick={() => setMenu(null)}><MdDownload style={{ marginRight: 10 }} />Download PDF</MenuItem><MenuItem onClick={() => setMenu(null)}><MdPrint style={{ marginRight: 10 }} />Print</MenuItem><MenuItem onClick={() => { setProposals((items) => items.filter((item) => item.id !== menu.proposal.id)); setMenu(null); }} sx={{ color: 'error.main' }}><MdDeleteOutline style={{ marginRight: 10 }} />Delete</MenuItem></Box>}</Menu>
    <ProposalDrawer proposal={selected} onClose={() => setSelected(null)} onRevise={createRevision} />
  </Box>;
}

export default ProposalDashboard;

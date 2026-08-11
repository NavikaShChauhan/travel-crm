/**
 * followUpTemplates.js
 * -----------------------------------------------------------------------
 * Structured templates dictionary and content generator for the Follow Up Planner.
 * Supports mode-specific templates (Call, WhatsApp, Email, SMS).
 */

export const MODE_TEMPLATES = {
  Call: [
    'Proposal Follow-up',
    'Price Discussion',
    'Hotel/Package Discussion',
    'Payment Follow-up',
    'Document Follow-up',
    'General Follow-up',
    'Custom',
  ],
  WhatsApp: [
    'Proposal Sent',
    'Proposal Follow-up',
    'Revised Proposal',
    'Price Follow-up',
    'Payment Reminder',
    'Document Reminder',
    'Booking Confirmation',
    'Travel Reminder',
    'Custom',
  ],
  Email: [
    'Proposal Follow-up',
    'Revised Proposal',
    'Payment Reminder',
    'Document Request',
    'Booking Confirmation',
    'Travel Reminder',
    'General Follow-up',
    'Custom',
  ],
  SMS: [
    'Proposal Follow-up',
    'Payment Reminder',
    'Document Reminder',
    'Booking Confirmation',
    'Travel Reminder',
    'Custom',
  ],
};

/**
 * Returns populated default subject & message/talking points for a selected mode & template.
 */
export function generateTemplateContent(mode, templateName, context = {}) {
  const {
    customer = 'Valued Customer',
    destination = 'your trip',
    proposalId = 'PR-2601',
    amount = '₹2,40,000',
    executive = 'Priya Sharma',
  } = context;

  if (!templateName || templateName === 'Custom') {
    return { subject: '', message: '' };
  }

  switch (mode) {
    case 'Call': {
      switch (templateName) {
        case 'Proposal Follow-up':
          return {
            subject: '',
            message: `1. Check if ${customer} reviewed proposal ${proposalId} for ${destination}.\n2. Confirm preferred travel dates and pax count.\n3. Address initial queries regarding inclusions or flights.`,
          };
        case 'Price Discussion':
          return {
            subject: '',
            message: `1. Discuss budget constraints for ${destination} package (${amount}).\n2. Present available discount options or boutique stay alternatives.\n3. Agree on target pricing limit.`,
          };
        case 'Hotel/Package Discussion':
          return {
            subject: '',
            message: `1. Review accommodation preferences (e.g. villa / resort category).\n2. Explain meal plan and transfer options for ${destination}.\n3. Confirm room configuration preferences.`,
          };
        case 'Payment Follow-up':
          return {
            subject: '',
            message: `1. Remind customer regarding deposit deadline to hold rates for ${destination}.\n2. Share bank transfer / UPI payment details.\n3. Clarify cancellation and refund terms.`,
          };
        case 'Document Follow-up':
          return {
            subject: '',
            message: `1. Request passport copies and ID proofs for visa/flight booking.\n2. Verify passport validity (>6 months from travel date).\n3. Confirm emergency contact details.`,
          };
        case 'General Follow-up':
          return {
            subject: '',
            message: `1. Touch base with ${customer} regarding travel plans for ${destination}.\n2. Provide updates on seasonal availability and flight rates.\n3. Offer assistance with itinerary customization.`,
          };
        default:
          return { subject: '', message: '' };
      }
    }

    case 'WhatsApp': {
      switch (templateName) {
        case 'Proposal Sent':
          return {
            subject: '',
            message: `Hi ${customer}, your customized travel proposal (${proposalId}) for ${destination} is ready! 🌴 Please review the details here and let me know your thoughts. - ${executive}, Voyage Travels`,
          };
        case 'Proposal Follow-up':
          return {
            subject: '',
            message: `Hello ${customer}, hope you had a chance to look at the ${destination} proposal (${proposalId}). We have limited slot holds available — would love to connect for a quick 5-min call!`,
          };
        case 'Revised Proposal':
          return {
            subject: '',
            message: `Hi ${customer}, as requested, I've updated your proposal for ${destination} (${proposalId}) with revised options. Let me know if this looks good to proceed!`,
          };
        case 'Price Follow-up':
          return {
            subject: '',
            message: `Hi ${customer}, we have a special rate update for your ${destination} trip package (${proposalId}). Let me know when is a good time to discuss the best final pricing.`,
          };
        case 'Payment Reminder':
          return {
            subject: '',
            message: `Dear ${customer}, friendly reminder that the advance payment for your ${destination} booking is due to lock in current hotel & flight rates. Let us know once transferred!`,
          };
        case 'Document Reminder':
          return {
            subject: '',
            message: `Hi ${customer}, kindly share passport copies / ID proofs for your upcoming ${destination} trip so we can finalize bookings without delay. Thank you!`,
          };
        case 'Booking Confirmation':
          return {
            subject: '',
            message: `🎉 Great news ${customer}! Your booking for ${destination} (${proposalId}) is officially confirmed! Voucher and itinerary details will follow shortly.`,
          };
        case 'Travel Reminder':
          return {
            subject: '',
            message: `Hi ${customer}, your trip to ${destination} is around the corner! Please ensure all travel documents and web check-ins are ready. Wish you a safe and memorable journey!`,
          };
        default:
          return { subject: '', message: '' };
      }
    }

    case 'Email': {
      switch (templateName) {
        case 'Proposal Follow-up':
          return {
            subject: `Follow-up: Your Travel Proposal for ${destination} (${proposalId})`,
            message: `Dear ${customer},\n\nI hope this email finds you well.\n\nI am writing to check if you've had a chance to review the customized travel proposal (${proposalId}) we prepared for your trip to ${destination}.\n\nPlease let us know if you would like to make any adjustments to the itinerary, hotel selection, or flight options. I would be happy to schedule a call at your convenience.\n\nWarm regards,\n${executive}\nVoyage Travels`,
          };
        case 'Revised Proposal':
          return {
            subject: `Revised Proposal: ${destination} Trip (${proposalId})`,
            message: `Dear ${customer},\n\nThank you for your feedback. We have updated your proposal for ${destination} (${proposalId}) reflecting your preferred hotel categories and inclusions.\n\nPlease review the attached updated itinerary and pricing. We look forward to finalizing your bookings.\n\nBest regards,\n${executive}\nVoyage Travels`,
          };
        case 'Payment Reminder':
          return {
            subject: `Payment Reminder: Advance Deposit for ${destination} Booking`,
            message: `Dear ${customer},\n\nThis is a friendly reminder that the advance deposit for your upcoming trip to ${destination} (${proposalId}) is currently due.\n\nPrompt payment ensures that hotel rates and flight availability remain locked in. Please find our banking details below:\n\nTotal Package Value: ${amount}\n\nWarm regards,\n${executive}\nVoyage Travels`,
          };
        case 'Document Request':
          return {
            subject: `Action Required: Documents for ${destination} Trip`,
            message: `Dear ${customer},\n\nTo proceed with flight issuance and hotel vouchers for your ${destination} journey, please reply to this email with clear scanned copies of passports / government ID proofs for all travelers.\n\nThank you for your prompt assistance.\n\nSincerely,\n${executive}\nVoyage Travels`,
          };
        case 'Booking Confirmation':
          return {
            subject: `Booking Confirmed! ${destination} Travel Package (${proposalId})`,
            message: `Dear ${customer},\n\nWe are delighted to confirm your travel booking for ${destination}!\n\nYour Booking Reference and vouchers have been generated. Attached to this email is your final itinerary and day-by-day travel guide.\n\nThank you for choosing Voyage Travels.\n\nWarm regards,\n${executive}\nVoyage Travels`,
          };
        case 'Travel Reminder':
          return {
            subject: `Important Travel Updates: Your Trip to ${destination}`,
            message: `Dear ${customer},\n\nYour departure for ${destination} is approaching fast!\n\nPlease review your travel checklist, hotel vouchers, and emergency contact details attached. Feel free to contact us 24/7 during your trip.\n\nHave a fantastic vacation!\n\nWarm regards,\n${executive}\nVoyage Travels`,
          };
        case 'General Follow-up':
          return {
            subject: `Exploring ${destination}: Travel Updates from Voyage Travels`,
            message: `Dear ${customer},\n\nWe wanted to touch base regarding your travel inquiry for ${destination}.\n\nIf you have any questions or are considering revised travel dates, we'd love to help craft the perfect itinerary for you.\n\nBest regards,\n${executive}\nVoyage Travels`,
          };
        default:
          return { subject: '', message: '' };
      }
    }

    case 'SMS': {
      switch (templateName) {
        case 'Proposal Follow-up':
          return {
            subject: '',
            message: `Voyage Travels: Hi ${customer}, hope you reviewed the ${destination} proposal (${proposalId}). Call us at +91 98765 43210 for quick updates!`,
          };
        case 'Payment Reminder':
          return {
            subject: '',
            message: `Voyage Travels: Payment reminder for your ${destination} booking (${proposalId}). Kindly complete payment to hold current rates.`,
          };
        case 'Document Reminder':
          return {
            subject: '',
            message: `Voyage Travels: Please submit passport copies for ${destination} trip to proceed with flight bookings.`,
          };
        case 'Booking Confirmation':
          return {
            subject: '',
            message: `Voyage Travels: Booking Confirmed for ${destination} (${proposalId})! Vouchers sent to your email.`,
          };
        case 'Travel Reminder':
          return {
            subject: '',
            message: `Voyage Travels: Safe travels to ${destination}! Reach your executive ${executive} for any assistance.`,
          };
        default:
          return { subject: '', message: '' };
      }
    }

    default:
      return { subject: '', message: '' };
  }
}

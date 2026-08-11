/**
 * PDF Generator utility with 3 distinct HTML/CSS templates for Itinerary Export.
 */

const formatCurrency = (amount) => {
  return `₹ ${(amount || 0).toLocaleString('en-IN')}`;
};

const getServicesForDay = (dayNum, servicesList = []) => {
  const result = [];
  (servicesList || []).forEach((s) => {
    const start = s.dayNumber || 1;
    const duration = parseInt(s.nights || s.days || 1, 10);
    if (dayNum === start) {
      result.push({ ...s, isStartDay: true });
    } else if (duration > 1 && dayNum > start && dayNum <= start + duration - 1) {
      const currentNight = dayNum - start + 1;
      let ongoingLabel = '';
      if (s.type === 'Hotel') {
        ongoingLabel = ` (Night ${currentNight} of ${duration})`;
      } else if (s.type === 'Cruise') {
        ongoingLabel = ` (Day ${currentNight} of ${duration})`;
      } else {
        ongoingLabel = ` (Day ${currentNight} of ${duration})`;
      }
      result.push({
        ...s,
        isStartDay: false,
        currentNight,
        totalDuration: duration,
        title: `${s.title}${ongoingLabel}`,
        description: `Ongoing ${s.type || 'stay'} booked from Day ${start} to Day ${start + duration - 1}.`
      });
    }
  });
  return result;
};

/**
 * TEMPLATE 1: Modern Luxury (Emerald & Charcoal)
 */
export const generateTemplateModern = (data) => {
  const {
    name = '',
    customerName = '',
    destination = '',
    startDate = '',
    endDate = '',
    adults = 1,
    children = 0,
    infants = 0,
    amount = 0,
    originalAmount,
    discountAmount = 0,
    discountType = 'percentage',
    discountValue = 0,
    description = '',
    coverImage = '',
    days = [],
    services = [],
    termsAndPolicies = []
  } = data;

  const servicesByDay = (dayNum) => getServicesForDay(dayNum, services);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${name} - Travel Itinerary</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          * { box-sizing: border-box; }
          body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 30px;
            color: #0F172A;
            background-color: #ffffff;
            line-height: 1.5;
          }
          .itinerary-container {
            max-width: 850px;
            margin: 0 auto;
          }
          .header-card {
            position: relative;
            background-color: #0F172A;
            color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 28px;
            height: 260px;
          }
          .header-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.7;
          }
          .header-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 28px 32px;
            background: linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.2), transparent);
          }
          .badge-tag {
            display: inline-block;
            background-color: #059669;
            color: #ffffff;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 4px 12px;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
          }
          .header-overlay h1 {
            margin: 0 0 6px 0;
            font-size: 2.2rem;
            font-weight: 800;
            letter-spacing: -0.02em;
            color: #ffffff;
          }
          .header-overlay .dest {
            font-size: 1rem;
            color: #CBD5E1;
            font-weight: 500;
          }
          .meta-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            background-color: #F8FAFC;
            padding: 20px;
            border-radius: 14px;
            margin-bottom: 28px;
            border: 1px solid #E2E8F0;
          }
          .meta-item {
            display: flex;
            flex-direction: column;
          }
          .meta-label {
            font-size: 0.7rem;
            text-transform: uppercase;
            color: #64748B;
            font-weight: 700;
            margin-bottom: 4px;
            letter-spacing: 0.05em;
          }
          .meta-value {
            font-size: 0.9rem;
            font-weight: 700;
            color: #0F172A;
          }
          .desc-box {
            background: #F1F5F9;
            border-left: 4px solid #059669;
            padding: 16px 20px;
            border-radius: 0 12px 12px 0;
            margin-bottom: 28px;
            font-size: 0.95rem;
            color: #334155;
          }
          .section-title {
            font-size: 1.4rem;
            font-weight: 800;
            color: #0F172A;
            border-bottom: 2px solid #E2E8F0;
            padding-bottom: 8px;
            margin-top: 36px;
            margin-bottom: 20px;
          }
          .day-card {
            margin-bottom: 24px;
            padding: 18px 20px;
            border-radius: 12px;
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            page-break-inside: avoid;
          }
          .day-header {
            font-size: 1.15rem;
            font-weight: 800;
            color: #059669;
            margin-bottom: 6px;
          }
          .day-desc {
            font-size: 0.9rem;
            color: #475569;
            margin-bottom: 14px;
          }
          .service-card {
            background-color: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            padding: 14px;
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .service-badge {
            background: #E2E8F0;
            color: #334155;
            font-size: 0.7rem;
            font-weight: 700;
            padding: 3px 8px;
            border-radius: 6px;
            text-transform: uppercase;
            margin-right: 8px;
          }
          .service-title {
            font-weight: 700;
            font-size: 0.95rem;
            color: #0F172A;
            margin: 0;
          }
          .service-meta {
            font-size: 0.8rem;
            color: #64748B;
            margin-top: 4px;
          }
          .service-price {
            font-weight: 800;
            color: #059669;
            font-size: 0.95rem;
            white-space: nowrap;
          }
          .pricing-summary {
            margin-top: 36px;
            padding: 20px 24px;
            border-radius: 14px;
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: #FFFFFF;
            display: flex;
            justify-content: space-between;
            align-items: center;
            page-break-inside: avoid;
          }
          .pricing-label { font-size: 1.1rem; font-weight: 700; }
          .pricing-val { font-size: 1.6rem; font-weight: 800; }
          .policy-block {
            margin-bottom: 16px;
            page-break-inside: avoid;
          }
          .policy-title {
            font-weight: 700;
            color: #059669;
            font-size: 0.95rem;
            margin-bottom: 6px;
          }
          .policy-list {
            margin: 0;
            padding-left: 20px;
            font-size: 0.85rem;
            color: #475569;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 0.8rem;
            color: #94A3B8;
            border-top: 1px solid #E2E8F0;
            padding-top: 16px;
          }
          @media print {
            body { padding: 0; }
            .pricing-summary { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="itinerary-container">
          <div class="header-card">
            ${coverImage ? `<img src="${coverImage}" />` : ''}
            <div class="header-overlay">
              <span class="badge-tag">Luxury Itinerary</span>
              <h1>${name}</h1>
              <div class="dest">📍 ${destination || 'Custom Tour Destination'}</div>
            </div>
          </div>

          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Client Name</span>
              <span class="meta-value">${customerName || 'Valued Guest'}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Travel Dates</span>
              <span class="meta-value">${startDate || 'TBD'} to ${endDate || 'TBD'}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Travelers</span>
              <span class="meta-value">${adults} Adults, ${children} Children, ${infants} Infants</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Total Cost</span>
              <span class="meta-value" style="color: #059669;">${formatCurrency(amount)}</span>
            </div>
          </div>

          ${description ? `<div class="desc-box">💬 <strong>Trip Overview:</strong> ${description}</div>` : ''}

          <div class="section-title">Day-by-Day Schedule</div>
          ${days
            .map(
              (day) => `
            <div class="day-card">
              <div class="day-header">Day ${day.dayNumber}: ${day.title}</div>
              ${day.description ? `<div class="day-desc">${day.description}</div>` : ''}
              ${servicesByDay(day.dayNumber)
                .map(
                  (srv) => `
                <div class="service-card">
                  <div>
                    <span class="service-badge">${srv.type}</span>
                    <span class="service-title">${srv.title}</span>
                    <div class="service-meta">
                      ${srv.durationText ? `Duration: ${srv.durationText} &bull; ` : ''}
                      ${srv.type === 'Hotel' && srv.nights ? `${srv.nights} Nights &bull; ` : ''}
                      ${srv.location || srv.fromPort ? `Location: ${srv.location || srv.fromPort}` : ''}
                    </div>
                  </div>
                  <div class="service-price">${formatCurrency(srv.totalCost)}</div>
                </div>
              `
                )
                .join('')}
            </div>
          `
            )
            .join('')}

          <div class="pricing-summary">
            <div style="display: flex; flex-direction: column; align-items: flex-end;">
              ${(discountAmount > 0 || (originalAmount && originalAmount > amount)) ? `
                <div style="font-size: 0.8rem; color: #64748B; font-weight: 500;">Subtotal: <span style="text-decoration: line-through;">${formatCurrency(originalAmount || (amount + discountAmount))}</span></div>
                <div style="font-size: 0.8rem; color: #DC2626; font-weight: 700; margin-bottom: 2px;">Discount (${discountType === 'percentage' ? `${discountValue}%` : 'Fixed'}): -${formatCurrency(discountAmount)}</div>
              ` : ''}
              <span class="pricing-label">Grand Total (Inclusive of all services):</span>
            </div>
            <span class="pricing-val">${formatCurrency(amount)}</span>
          </div>

          ${
            termsAndPolicies && termsAndPolicies.length > 0
              ? `
            <div class="section-title">Terms & Policies</div>
            ${termsAndPolicies
              .map(
                (block) => `
              <div class="policy-block">
                <div class="policy-title">📌 ${block.title}</div>
                <ul class="policy-list">
                  ${block.items.map((item) => `<li>${item}</li>`).join('')}
                </ul>
              </div>
            `
              )
              .join('')}
          `
              : ''
          }

          <div class="footer">
            Generated on ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })} &bull; Voyage CRM
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
    </html>
  `;
};

/**
 * TEMPLATE 2: Executive Classic (Navy & Gold Formal)
 */
export const generateTemplateExecutive = (data) => {
  const {
    name = '',
    customerName = '',
    destination = '',
    startDate = '',
    endDate = '',
    adults = 1,
    children = 0,
    infants = 0,
    amount = 0,
    originalAmount,
    discountAmount = 0,
    discountType = 'percentage',
    discountValue = 0,
    description = '',
    days = [],
    services = [],
    termsAndPolicies = []
  } = data;

  const servicesByDay = (dayNum) => getServicesForDay(dayNum, services);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${name} - Executive Itinerary</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600;700&display=swap');
          * { box-sizing: border-box; }
          body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 36px;
            color: #1E293B;
            background-color: #FFFFFF;
            line-height: 1.6;
          }
          .executive-container {
            max-width: 820px;
            margin: 0 auto;
          }
          .exec-header {
            border-top: 5px solid #1E293B;
            border-bottom: 2px solid #D97706;
            padding: 24px 0 16px 0;
            margin-bottom: 28px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .exec-company {
            font-size: 0.8rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: #D97706;
            margin-bottom: 4px;
          }
          .exec-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.2rem;
            font-weight: 800;
            color: #0F172A;
            margin: 0;
          }
          .exec-badge {
            text-align: right;
            font-size: 0.85rem;
            color: #64748B;
            font-weight: 600;
          }
          .exec-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 28px;
            font-size: 0.9rem;
          }
          .exec-table th {
            background-color: #0F172A;
            color: #FFFFFF;
            text-transform: uppercase;
            font-size: 0.7rem;
            letter-spacing: 0.08em;
            padding: 10px 14px;
            text-align: left;
          }
          .exec-table td {
            border: 1px solid #E2E8F0;
            padding: 10px 14px;
            color: #1E293B;
            font-weight: 600;
          }
          .section-heading {
            font-family: 'Playfair Display', serif;
            font-size: 1.4rem;
            color: #0F172A;
            border-bottom: 1.5px solid #D97706;
            padding-bottom: 6px;
            margin-top: 32px;
            margin-bottom: 20px;
          }
          .day-block {
            margin-bottom: 22px;
            page-break-inside: avoid;
          }
          .day-num {
            font-family: 'Playfair Display', serif;
            font-size: 1.15rem;
            font-weight: 700;
            color: #B45309;
            border-bottom: 1px dashed #CBD5E1;
            padding-bottom: 4px;
            margin-bottom: 8px;
          }
          .service-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #F1F5F9;
            font-size: 0.88rem;
          }
          .service-name { font-weight: 700; color: #0F172A; }
          .service-tag { color: #64748B; font-size: 0.8rem; margin-left: 8px; font-weight: 500; }
          .service-cost { font-weight: 700; color: #1E293B; }
          .grand-total-card {
            margin-top: 32px;
            background: #0F172A;
            color: #FFFFFF;
            padding: 18px 24px;
            border-left: 6px solid #D97706;
            display: flex;
            justify-content: space-between;
            align-items: center;
            page-break-inside: avoid;
          }
          .grand-label { font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; }
          .grand-val { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 800; color: #F59E0B; }
          .terms-grid {
            margin-top: 16px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }
          .terms-card {
            border: 1px solid #E2E8F0;
            padding: 14px;
            background: #F8FAFC;
            font-size: 0.82rem;
            page-break-inside: avoid;
          }
          .terms-card h5 { margin: 0 0 8px 0; color: #0F172A; font-weight: 700; font-size: 0.88rem; }
          .terms-card ul { margin: 0; padding-left: 16px; color: #475569; }
          .exec-footer {
            margin-top: 40px;
            text-align: center;
            font-size: 0.78rem;
            color: #94A3B8;
            border-top: 1px solid #E2E8F0;
            padding-top: 16px;
          }
          @media print { body { padding: 0; } .grand-total-card { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
        </style>
      </head>
      <body>
        <div class="executive-container">
          <div class="exec-header">
            <div>
              <div class="exec-company">Confidential Travel Itinerary</div>
              <h1 class="exec-title">${name}</h1>
            </div>
            <div class="exec-badge">
              <strong>Destination:</strong> ${destination || 'N/A'}<br/>
              <strong>Date:</strong> ${new Date().toLocaleDateString()}
            </div>
          </div>

          <table class="exec-table">
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Travel Window</th>
                <th>Pax Distribution</th>
                <th>Total Investment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${customerName || 'Valued Guest'}</td>
                <td>${startDate || 'TBD'} &mdash; ${endDate || 'TBD'}</td>
                <td>${adults} Adults, ${children} Children, ${infants} Infants</td>
                <td style="color: #D97706;">${formatCurrency(amount)}</td>
              </tr>
            </tbody>
          </table>

          ${description ? `<p style="font-size: 0.92rem; color: #334155; font-style: italic; margin-bottom: 24px;">"${description}"</p>` : ''}

          <div class="section-heading">Detailed Itinerary Schedule</div>
          ${days
            .map(
              (d) => `
            <div class="day-block">
              <div class="day-num">Day 0${d.dayNumber} &bull; ${d.title}</div>
              ${d.description ? `<p style="font-size: 0.86rem; color: #475569; margin: 4px 0 10px 0;">${d.description}</p>` : ''}
              ${servicesByDay(d.dayNumber)
                .map(
                  (s) => `
                <div class="service-row">
                  <div>
                    <span class="service-name">${s.title}</span>
                    <span class="service-tag">(${s.type})</span>
                  </div>
                  <span class="service-cost">${formatCurrency(s.totalCost)}</span>
                </div>
              `
                )
                .join('')}
            </div>
          `
            )
            .join('')}

          <div class="grand-total-card">
            <div>
              <span class="grand-label" style="display: block;">Total Net Payable Amount</span>
              ${(discountAmount > 0 || (originalAmount && originalAmount > amount)) ? `
                <div style="font-size: 0.78rem; opacity: 0.8; margin-top: 2px;">
                  Original: <span style="text-decoration: line-through;">${formatCurrency(originalAmount || (amount + discountAmount))}</span> | Discount: -${formatCurrency(discountAmount)} (${discountType === 'percentage' ? `${discountValue}%` : 'Fixed'})
                </div>
              ` : ''}
            </div>
            <span class="grand-val">${formatCurrency(amount)}</span>
          </div>

          ${
            termsAndPolicies && termsAndPolicies.length > 0
              ? `
            <div class="section-heading">Terms & Conditions</div>
            <div class="terms-grid">
              ${termsAndPolicies
                .map(
                  (b) => `
                <div class="terms-card">
                  <h5>${b.title}</h5>
                  <ul>
                    ${b.items.map((i) => `<li>${i}</li>`).join('')}
                  </ul>
                </div>
              `
                )
                .join('')}
            </div>
          `
              : ''
          }

          <div class="exec-footer">
            This document is prepared for ${customerName || 'Guest'}. Generated via Voyage Executive Portal.
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
    </html>
  `;
};

/**
 * TEMPLATE 3: Vibrant Adventure (Coral & Ocean Teal)
 */
export const generateTemplateAdventure = (data) => {
  const {
    name = '',
    customerName = '',
    destination = '',
    startDate = '',
    endDate = '',
    adults = 1,
    children = 0,
    infants = 0,
    amount = 0,
    originalAmount,
    discountAmount = 0,
    discountType = 'percentage',
    discountValue = 0,
    description = '',
    coverImage = '',
    days = [],
    services = [],
    termsAndPolicies = []
  } = data;

  const servicesByDay = (dayNum) => getServicesForDay(dayNum, services);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${name} - Adventure Tour</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
          * { box-sizing: border-box; }
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            margin: 0;
            padding: 30px;
            color: #1E293B;
            background-color: #FFFFFF;
            line-height: 1.5;
          }
          .adventure-container {
            max-width: 840px;
            margin: 0 auto;
          }
          .adv-banner {
            background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
            border-radius: 20px;
            padding: 32px;
            color: #FFFFFF;
            margin-bottom: 24px;
            position: relative;
            overflow: hidden;
          }
          .adv-banner h1 {
            font-family: 'Outfit', sans-serif;
            font-size: 2.3rem;
            font-weight: 800;
            margin: 0 0 6px 0;
            text-shadow: 0 2px 4px rgba(0,0,0,0.15);
          }
          .adv-banner .subtitle {
            font-size: 1.05rem;
            font-weight: 600;
            opacity: 0.95;
          }
          .chip-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 28px;
          }
          .chip {
            background: #F1F5F9;
            border: 1px solid #CBD5E1;
            padding: 8px 16px;
            border-radius: 30px;
            font-weight: 700;
            font-size: 0.85rem;
            color: #334155;
          }
          .chip.highlight {
            background: #FFF7ED;
            border-color: #F97316;
            color: #C2410C;
          }
          .chip.teal {
            background: #ECFEFF;
            border-color: #06B6D4;
            color: #0E7490;
          }
          .section-banner {
            font-family: 'Outfit', sans-serif;
            font-size: 1.35rem;
            font-weight: 800;
            color: #0F172A;
            margin-top: 32px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .day-card {
            background: #FAFAFA;
            border: 2px solid #F1F5F9;
            border-radius: 16px;
            padding: 20px;
            margin-bottom: 20px;
            page-break-inside: avoid;
          }
          .day-title {
            font-family: 'Outfit', sans-serif;
            font-size: 1.2rem;
            font-weight: 800;
            color: #FF6B6B;
            margin-bottom: 4px;
          }
          .srv-box {
            background: #FFFFFF;
            border-radius: 12px;
            padding: 12px 16px;
            margin-top: 10px;
            border: 1px solid #E2E8F0;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .srv-tag {
            background: #4ECDC4;
            color: #FFFFFF;
            font-size: 0.7rem;
            font-weight: 800;
            padding: 4px 10px;
            border-radius: 20px;
            text-transform: uppercase;
          }
          .srv-name {
            font-weight: 700;
            font-size: 0.95rem;
            color: #0F172A;
            margin-left: 8px;
          }
          .srv-price {
            font-family: 'Outfit', sans-serif;
            font-weight: 800;
            font-size: 1rem;
            color: #FF6B6B;
          }
          .price-hero {
            background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
            border-radius: 18px;
            padding: 24px;
            color: #FFFFFF;
            text-align: center;
            margin-top: 32px;
            page-break-inside: avoid;
          }
          .price-hero-val {
            font-family: 'Outfit', sans-serif;
            font-size: 2.2rem;
            font-weight: 800;
          }
          .policy-pill {
            background: #FFF7ED;
            border: 1px solid #FFEDD5;
            border-radius: 14px;
            padding: 16px;
            margin-bottom: 14px;
            page-break-inside: avoid;
          }
          .policy-pill h5 { margin: 0 0 6px 0; color: #C2410C; font-size: 0.95rem; font-weight: 800; }
          .policy-pill ul { margin: 0; padding-left: 18px; font-size: 0.85rem; color: #475569; }
          .adv-footer {
            text-align: center;
            margin-top: 36px;
            font-size: 0.8rem;
            color: #94A3B8;
          }
          @media print { body { padding: 0; } .adv-banner, .price-hero { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
        </style>
      </head>
      <body>
        <div class="adventure-container">
          <div class="adv-banner">
            <h1>🌴 ${name}</h1>
            <div class="subtitle">Destination: ${destination || 'Adventure Tour'}</div>
          </div>

          <div class="chip-bar">
            <div class="chip highlight">👤 Client: ${customerName || 'Adventurer'}</div>
            <div class="chip teal">📅 Dates: ${startDate || 'TBD'} - ${endDate || 'TBD'}</div>
            <div class="chip">👥 Travelers: ${adults} Adults, ${children} Children, ${infants} Infants</div>
          </div>

          ${description ? `<p style="font-size: 0.95rem; color: #475569; line-height: 1.6; margin-bottom: 24px;">${description}</p>` : ''}

          <div class="section-banner">🚀 Itinerary Highlights</div>
          ${days
            .map(
              (day) => `
            <div class="day-card">
              <div class="day-title">Day ${day.dayNumber}: ${day.title}</div>
              ${day.description ? `<p style="font-size: 0.88rem; color: #64748B; margin: 4px 0 8px 0;">${day.description}</p>` : ''}
              ${servicesByDay(day.dayNumber)
                .map(
                  (srv) => `
                <div class="srv-box">
                  <div>
                    <span class="srv-tag">${srv.type}</span>
                    <span class="srv-name">${srv.title}</span>
                  </div>
                  <span class="srv-price">${formatCurrency(srv.totalCost)}</span>
                </div>
              `
                )
                .join('')}
            </div>
          `
            )
            .join('')}

          <div class="price-hero">
            <div>
              <div style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;">Total Package Cost</div>
              ${(discountAmount > 0 || (originalAmount && originalAmount > amount)) ? `
                <div style="font-size: 0.8rem; opacity: 0.85; margin-top: 2px;">
                  Original: <span style="text-decoration: line-through;">${formatCurrency(originalAmount || (amount + discountAmount))}</span> &bull; Saved ${formatCurrency(discountAmount)}
                </div>
              ` : ''}
            </div>
            <div class="price-hero-val">${formatCurrency(amount)}</div>
          </div>

          ${
            termsAndPolicies && termsAndPolicies.length > 0
              ? `
            <div class="section-banner">📋 Tour Policies & Information</div>
            ${termsAndPolicies
              .map(
                (block) => `
              <div class="policy-pill">
                <h5>${block.title}</h5>
                <ul>
                  ${block.items.map((i) => `<li>${i}</li>`).join('')}
                </ul>
              </div>
            `
              )
              .join('')}
          `
              : ''
          }

          <div class="adv-footer">
            Adventure awaits! Generated via Voyage CRM on ${new Date().toLocaleDateString()}.
          </div>
        </div>
      </body>
    </html>
  `;
};

export const generateTemplateDetailed = (data) => {
  const {
    id = '23427222',
    name = '',
    customerName = 'Mr. Chadha',
    destination = 'Japan',
    startDate = '16 Jun 2025',
    endDate = '28 Jun 2025',
    adults = 8,
    children = 0,
    infants = 0,
    amount = 1600000,
    originalAmount,
    discountAmount = 0,
    discountType = 'percentage',
    discountValue = 0,
    description = '',
    coverImage = '',
    days = [],
    services = [],
    termsAndPolicies = []
  } = data;

  const totalPax = (adults || 0) + (children || 0) + (infants || 0) || 8;
  const servicesByDay = (dayNum) => getServicesForDay(dayNum, services);

  // Compute Glossary counters
  const destinationsCount = destination ? destination.split(',').length : 4;
  const accommodationsCount = services.filter((s) => s.type === 'Hotel').length || 4;
  const transportsCount = services.filter((s) => s.type === 'Transport' || s.type === 'Transfer').length || 4;
  const ticketsCount = services.filter((s) => s.type === 'Sightseeing' || s.type === 'Activity').length || 4;
  const transfersCount = services.filter((s) => s.type === 'Transfer' || s.type === 'Ferry').length || 2;
  const nightsCount = services.filter((s) => s.type === 'Hotel').reduce((acc, s) => acc + (parseInt(s.nights) || 1), 0) || (days.length > 1 ? days.length - 1 : 11);

  // Dynamic Image & Text Content Lookups
  const isJapan = (destination || '').toLowerCase().includes('japan') || (name || '').toLowerCase().includes('japan');
  
  const fallbackCover = coverImage || (isJapan
    ? 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80'
    : 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80');

  const mapImage = isJapan
    ? 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1000&q=80'
    : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80';

  const osakaImg = 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=800&q=80';
  const kyotoImg = 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80';
  const hakoneImg = 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80';
  const tokyoImg = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80';

  const defaultHotelImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=350&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=350&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=350&q=80'
  ];

  const defaultActivityImages = [
    'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?auto=format&fit=crop&w=350&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=350&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=350&q=80'
  ];

  const vehicleImage = 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80';

  const getDestinationOverviewText = (city = '') => {
    const lCity = city.toLowerCase();
    if (lCity.includes('osaka')) {
      return "Osaka is a big modern city in Japan. It is the central metropolis of the Kansai region and the largest of the Osaka-Kobe-Kyoto trio. It is a lively and exciting place that exudes a definite charm. Its history is rich, its scenery is gorgeous, and it is well-located close to the major cultural centers of Kyoto and Nara.";
    }
    if (lCity.includes('kyoto')) {
      return "For over a thousand years Kyoto was the capital of Japan and it is probably the best preserved of all its cities. It is a beautiful vibrant city where modern life meets old traditional Japan. The city is surrounded by the mountains of Western Honshu.";
    }
    if (lCity.includes('hakone')) {
      return "Hakone is a popular tourist destination in Kanagawa Prefecture, Japan, known for its natural beauty, hot springs and breathtaking views of Mount Fuji. It offers an ideal getaway from the hustle and bustle of Tokyo.";
    }
    if (lCity.includes('tokyo')) {
      return "Tokyo is the capital of Japan and one of the largest urban area in the world. Tokyo is the financial center of Japan and a blend of high-technology and tradition. Tokyo is huge and a well-organized modern city.";
    }
    return "Discover the scenic wonders and cultural charms of this beautiful destination, offering outstanding travel highlights and curated local experiences.";
  };

  const getDestinationPointsOfInterest = (city = '') => {
    const lCity = city.toLowerCase();
    if (lCity.includes('osaka')) {
      return 'Osaka Castle, Universal Studios Japan, Dotonbori, Osaka Aquarium Kaiyukan, Tsutenkaku Tower, Umeda Sky Building';
    }
    if (lCity.includes('kyoto')) {
      return 'Fushimi Inari-taisha, Kinkaku-ji (Golden Pavilion), Kiyomizu-dera, Arashiyama Bamboo Grove, Gion Geisha District';
    }
    if (lCity.includes('hakone')) {
      return 'Lake Ashi Sightseeing Cruise, Hakone Ropeway, Owakudani Valley, Hakone Open-Air Museum, Mount Fuji Views';
    }
    if (lCity.includes('tokyo')) {
      return 'Senso-ji Temple, Tokyo Skytree, Shibuya Crossing, Meiji Jingu Shrine, Tokyo Disneyland, Shinjuku Gyoen National Garden';
    }
    return 'Popular local landmarks, city center hub, historical architectures, scenic viewpoint peaks, and traditional markets';
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${name || 'Travel Dossier'} - 11 Page PDF Itinerary</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
          
          * { box-sizing: border-box; }
          body {
            font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            color: #0F172A;
            background-color: #ffffff;
            line-height: 1.5;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          
          .pdf-page {
            width: 850px;
            min-height: 1100px;
            margin: 0 auto;
            padding: 50px;
            position: relative;
            background: #ffffff;
            page-break-after: always;
            box-sizing: border-box;
          }
          
          .pdf-page:last-child {
            page-break-after: avoid;
          }

          .page-footer {
            position: absolute;
            bottom: 30px;
            left: 50px;
            right: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #E2E8F0;
            padding-top: 10px;
            font-size: 0.75rem;
            color: #64748B;
          }

          /* SECTION 1: COVER PAGE */
          .cover-label {
            font-size: 0.8rem;
            font-weight: 800;
            letter-spacing: 0.25em;
            color: #64748B;
            text-transform: uppercase;
            margin-top: 10px;
            margin-bottom: 6px;
          }
          .cover-main-title {
            font-size: 2.5rem;
            font-weight: 800;
            color: #0F172A;
            margin: 0 0 8px 0;
            letter-spacing: -0.02em;
            text-transform: uppercase;
          }
          .cover-ref-id {
            font-size: 0.85rem;
            font-weight: 700;
            color: #475569;
            margin-bottom: 12px;
          }
          .cover-orange-bar {
            width: 100px;
            height: 5px;
            background-color: #F97316;
            border-radius: 3px;
            margin-bottom: 25px;
          }
          .cover-hero-container {
            position: relative;
            width: 100%;
            height: 360px;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 30px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.12);
          }
          .cover-hero-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .cover-hero-overlay {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.6) 100%);
          }
          .cover-date-badge {
            position: absolute;
            top: 20px;
            right: 20px;
            background-color: #F97316;
            color: #FFFFFF;
            font-size: 0.75rem;
            font-weight: 800;
            letter-spacing: 0.1em;
            padding: 6px 14px;
            border-radius: 20px;
            text-transform: uppercase;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }

          /* SECTION 2: QUOTE / TRIP SUMMARY */
          .summary-quote-card {
            background-color: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 14px;
            padding: 24px;
            margin-bottom: 25px;
          }
          .summary-grid-3 {
            display: grid;
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 20px;
          }
          .summary-field-lbl {
            font-size: 0.72rem;
            font-weight: 800;
            letter-spacing: 0.12em;
            color: #64748B;
            text-transform: uppercase;
            margin-bottom: 4px;
          }
          .summary-field-val {
            font-size: 0.95rem;
            font-weight: 700;
            color: #0F172A;
          }
          .glossary-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #F1F5F9;
            border-radius: 12px;
            padding: 14px 20px;
            font-size: 0.85rem;
            font-weight: 700;
            color: #334155;
            margin-top: 15px;
          }

          /* SECTION 3: MAP OVERVIEW & STOP TABLE */
          .section-hdr {
            font-size: 1.5rem;
            font-weight: 800;
            color: #0F172A;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            margin-bottom: 8px;
          }
          .section-subhdr {
            font-size: 0.85rem;
            color: #64748B;
            margin-bottom: 20px;
          }
          .route-map-container {
            width: 100%;
            height: 240px;
            border-radius: 14px;
            overflow: hidden;
            position: relative;
            margin-bottom: 25px;
            border: 1px solid #CBD5E1;
          }
          .route-map-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .condensed-stop-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
            font-size: 0.825rem;
          }
          .condensed-stop-table th {
            background-color: #0F172A;
            color: #FFFFFF;
            text-align: left;
            padding: 10px 12px;
            font-weight: 700;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          .condensed-stop-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #E2E8F0;
            color: #334155;
            font-weight: 600;
          }
          .condensed-stop-table tr:nth-child(even) {
            background-color: #F8FAFC;
          }

          /* CARDS & TABLES */
          .card-box {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 14px;
            padding: 20px;
            margin-bottom: 24px;
            position: relative;
          }
          .card-header-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 14px;
          }
          .card-title-lg {
            font-size: 1.35rem;
            font-weight: 800;
            color: #0F172A;
            margin: 0;
          }
          .card-badge-right {
            background-color: #F97316;
            color: #FFFFFF;
            font-size: 0.75rem;
            font-weight: 800;
            padding: 4px 12px;
            border-radius: 12px;
            text-transform: uppercase;
          }
          
          /* 3-Photo Gallery Grid */
          .photo-gallery-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin: 14px 0;
          }
          .photo-gallery-3 img {
            width: 100%;
            height: 120px;
            object-fit: cover;
            border-radius: 10px;
          }

          /* 4-Column Amenities Grid */
          .amenities-grid-4 {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            background-color: #F8FAFC;
            padding: 14px;
            border-radius: 10px;
            margin-top: 14px;
            font-size: 0.8rem;
            font-weight: 600;
            color: #475569;
          }
          .amenity-item {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .check-icon {
            color: #10B981;
            font-weight: 800;
          }

          /* Included / Not Included Lists */
          .incl-excl-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-top: 14px;
            background-color: #F8FAFC;
            padding: 14px;
            border-radius: 10px;
          }
          .incl-list, .excl-list {
            font-size: 0.8rem;
            line-height: 1.6;
            color: #334155;
          }
          .incl-title { color: #059669; font-weight: 800; margin-bottom: 6px; }
          .excl-title { color: #DC2626; font-weight: 800; margin-bottom: 6px; }

          /* TERMS & REMARKS */
          .remarks-text-block {
            font-size: 0.8rem;
            color: #475569;
            line-height: 1.65;
            background-color: #F8FAFC;
            border: 1px solid #E2E8F0;
            padding: 16px;
            border-radius: 10px;
            margin-bottom: 16px;
          }
          .remarks-block-title {
            font-weight: 800;
            color: #0F172A;
            font-size: 0.85rem;
            margin-bottom: 4px;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <!-- PAGE 1: COVER PAGE -->
        <div class="pdf-page">
          <div class="cover-label">YOUR TRIP TO:</div>
          <h1 class="cover-main-title">${(destination || 'JAPAN').toUpperCase()} – ${(customerName || 'MR. CHADHA').toUpperCase()} X ${totalPax}</h1>
          <div class="cover-ref-id">Ref ID: ${id || '23427222'}</div>
          <div class="cover-orange-bar"></div>

          <div class="cover-hero-container">
            <img src="${fallbackCover}" />
            <div class="cover-hero-overlay"></div>
            <div class="cover-date-badge">CREATED ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}</div>
          </div>

          <div class="summary-quote-card">
            <div class="summary-grid-3">
              <div>
                <div class="summary-field-lbl">TRIP BASIS &amp; DATES</div>
                <div class="summary-field-val">Based on ${adults} Adults${children > 0 ? `, ${children} Children` : ''}</div>
                <div style="font-size: 0.85rem; color: #475569; margin-top: 4px; font-weight: 600;">🗓️ ${startDate || '16 Jun 2025'} – ${endDate || '28 Jun 2025'}</div>
              </div>
              <div>
                <div class="summary-field-lbl">TOTAL PRICE</div>
                <div class="summary-field-val" style="font-size: 1.25rem; color: #059669;">${formatCurrency(amount || 1600000)}</div>
              </div>
              <div>
                <div class="summary-field-lbl">AGENT CONTACT</div>
                <div class="summary-field-val" style="font-size: 0.85rem;">Kushdeep Sawhney</div>
                <div style="font-size: 0.78rem; color: #64748B;">📞 +91 99999 98088</div>
                <div style="font-size: 0.78rem; color: #64748B;">📧 sales@thebonvoyage.in</div>
              </div>
            </div>
            <div style="font-size: 0.78rem; color: #64748B; margin-top: 12px; border-top: 1px dashed #CBD5E1; padding-top: 8px;">
              📍 <strong>Agency Address:</strong> BonVoyage, 17A/39 1st Floor WEA, New Delhi &bull; General Contact: 9999998088 / sales@thebonvoyage.in
            </div>
          </div>

          <div class="page-footer">
            <span>The Bon Voyage Travel Dossier</span>
            <span>Page 1 of 11</span>
          </div>
        </div>

        <!-- PAGE 2: QUOTE / TRIP SUMMARY & GLOSSARY -->
        <div class="pdf-page">
          <div class="section-hdr">EXECUTIVE QUOTE &amp; TRIP SUMMARY</div>
          <div class="section-subhdr">Detailed pricing breakdown, pax basis, and travel dossier glossary</div>

          <div class="summary-quote-card">
            <div class="summary-grid-3">
              <div>
                <div class="summary-field-lbl">TRAVEL DATES &amp; DURATION</div>
                <div class="summary-field-val">${startDate || '16 Jun 2025'} – ${endDate || '28 Jun 2025'}</div>
                <div style="font-size: 0.85rem; color: #475569; margin-top: 4px; font-weight: 600;">⏱️ Duration: ${nightsCount} Nights / ${days.length || 12} Days</div>
              </div>
              <div>
                <div class="summary-field-lbl">PACKAGE INVESTMENT</div>
                <div class="summary-field-val" style="font-size: 1.35rem; color: #059669;">${formatCurrency(amount || 1600000)}</div>
                <div style="font-size: 0.78rem; color: #64748B; margin-top: 2px;">Rate per adult: <strong>${formatCurrency(Math.round((amount || 1600000) / totalPax))}</strong></div>
              </div>
              <div>
                <div class="summary-field-lbl">QUOTE VALIDITY</div>
                <div class="summary-field-val" style="color: #D97706;">Valid for 7 Days</div>
                <div style="font-size: 0.78rem; color: #64748B; margin-top: 2px;">Subject to availability at booking</div>
              </div>
            </div>
          </div>

          <h3 style="font-size: 1.1rem; font-weight: 800; color: #0F172A; margin: 20px 0 10px 0; text-transform: uppercase;">Dossier Inclusion Summary</h3>
          <div class="glossary-bar">
            <span>📍 ${destinationsCount} Destinations</span>
            <span>🏨 ${accommodationsCount} Accommodations</span>
            <span>🚗 ${transportsCount} Transports</span>
            <span>🎟️ ${ticketsCount} Tickets</span>
            <span>🚌 ${transfersCount} Transfers</span>
            <span>🌙 ${nightsCount} Nights</span>
          </div>

          <div style="margin-top: 24px; background-color: #F8FAFC; border: 1px solid #E2E8F0; padding: 20px; border-radius: 12px;">
            <div style="font-weight: 800; color: #0F172A; font-size: 0.9rem; text-transform: uppercase; margin-bottom: 8px;">Authorized Travel Agency Details</div>
            <div style="font-size: 0.825rem; color: #475569; line-height: 1.6;">
              <strong>Agency:</strong> BonVoyage Travel Solutions Pvt Ltd<br/>
              <strong>Address:</strong> 17A/39 1st Floor WEA, Karol Bagh, New Delhi 110005<br/>
              <strong>Primary Contact:</strong> Kushdeep Sawhney (+91 99999 98088 / sales@thebonvoyage.in)<br/>
              <strong>Support Hours:</strong> 24/7 Operations Desk for Active Tours
            </div>
          </div>

          <div class="page-footer">
            <span>The Bon Voyage Travel Dossier</span>
            <span>Page 2 of 11</span>
          </div>
        </div>

        <!-- PAGE 3: ITINERARY MAP OVERVIEW -->
        <div class="pdf-page">
          <div class="section-hdr">ITINERARY MAP &amp; ROUTE OVERVIEW</div>
          <div class="section-subhdr">Regional transit corridor overview connecting Kansai to Kanto region</div>

          <div class="route-map-container">
            <img src="${mapImage}" />
          </div>

          <h3 style="font-size: 1.1rem; font-weight: 800; color: #0F172A; margin: 20px 0 10px 0; text-transform: uppercase;">Condensed Stop Schedule</h3>
          <table class="condensed-stop-table">
            <thead>
              <tr>
                <th>#</th>
                <th>City / Stop</th>
                <th>Dates</th>
                <th>Nights</th>
                <th>Hotel Stay</th>
                <th>Key Transport Out</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>—</td>
                <td>Delhi (Start)</td>
                <td>16 Jun</td>
                <td>—</td>
                <td>—</td>
                <td>DEL → KIX Outbound Flight</td>
              </tr>
              <tr>
                <td>1</td>
                <td>Osaka</td>
                <td>17–20 Jun</td>
                <td>3</td>
                <td>Smile Hotel Premium Osaka Hommachi</td>
                <td>Bullet Train to Kyoto</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Kyoto</td>
                <td>20–22 Jun</td>
                <td>2</td>
                <td>Candeo Hotels Kyoto Karasuma Rokkaku</td>
                <td>Bullet Train to Odawara</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Hakone</td>
                <td>22–24 Jun</td>
                <td>2</td>
                <td>Hyatt Regency Hakone Resort &amp; Spa</td>
                <td>Bullet Train to Tokyo</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Tokyo</td>
                <td>24–28 Jun</td>
                <td>4</td>
                <td>Hotel Gracery Shinjuku</td>
                <td>HND → DEL Return Flight</td>
              </tr>
            </tbody>
          </table>

          <div class="page-footer">
            <span>The Bon Voyage Travel Dossier</span>
            <span>Page 3 of 11</span>
          </div>
        </div>

        <!-- PAGE 4: FLIGHT DOSSIER (OUTBOUND & RETURN) -->
        <div class="pdf-page">
          <div class="section-hdr">FLIGHT DOSSIER &amp; AIRLINE SERVICES</div>
          <div class="section-subhdr">Complete flight dockets for international departure, layover, and return journeys</div>

          <!-- Outbound Flight -->
          <div class="card-box" style="border-left: 4px solid #059669; margin-bottom: 20px;">
            <div class="card-header-row">
              <h3 class="card-title-lg">✈️ Outbound International Service (Cathay Pacific)</h3>
              <span class="card-badge-right" style="background-color: #059669;">1 Stop • Economy Light</span>
            </div>

            <div style="background-color: #F8FAFC; padding: 14px; border-radius: 10px; margin-bottom: 10px;">
              <div style="font-weight: 700; color: #0F172A; margin-bottom: 4px;">Leg 1: Cathay Pacific CX 698</div>
              <div style="font-size: 0.85rem; color: #475569;">DEL 22:40 (Indira Gandhi Intl, Delhi) &rarr; HKG 06:40 (+1 day) (Hong Kong)</div>
              <div style="font-size: 0.78rem; color: #64748B; margin-top: 4px;">Layover: 1h 30m connection in Hong Kong (HKG)</div>
            </div>

            <div style="background-color: #F8FAFC; padding: 14px; border-radius: 10px;">
              <div style="font-weight: 700; color: #0F172A; margin-bottom: 4px;">Leg 2: Cathay Pacific CX 596</div>
              <div style="font-size: 0.85rem; color: #475569;">HKG 08:10 (Hong Kong) &rarr; KIX 13:00 (Osaka Kansai Intl)</div>
            </div>

            <div style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 0.8rem; font-weight: 700; color: #334155;">
              <span>⏱️ Total Duration: 10h 50m</span>
              <span>🧳 Baggage Allowance: 1 PC (23 KG)</span>
            </div>
          </div>

          <!-- Return Flight -->
          <div class="card-box" style="border-left: 4px solid #3B82F6;">
            <div class="card-header-row">
              <h3 class="card-title-lg">✈️ Return International Service (Cathay Pacific)</h3>
              <span class="card-badge-right" style="background-color: #3B82F6;">1 Stop • Economy Light</span>
            </div>

            <div style="background-color: #F8FAFC; padding: 14px; border-radius: 10px; margin-bottom: 10px;">
              <div style="font-weight: 700; color: #0F172A; margin-bottom: 4px;">Leg 1: Cathay Pacific CX 505</div>
              <div style="font-size: 0.85rem; color: #475569;">HND 18:30 (Tokyo Haneda) &rarr; HKG 22:10 (Hong Kong)</div>
              <div style="font-size: 0.78rem; color: #64748B; margin-top: 4px;">Layover: 1h 45m connection in Hong Kong (HKG)</div>
            </div>

            <div style="background-color: #F8FAFC; padding: 14px; border-radius: 10px;">
              <div style="font-weight: 700; color: #0F172A; margin-bottom: 4px;">Leg 2: Cathay Pacific CX 695</div>
              <div style="font-size: 0.85rem; color: #475569;">HKG 23:55 (Hong Kong) &rarr; DEL 02:40 (+1 day) (Delhi)</div>
            </div>

            <div style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 0.8rem; font-weight: 700; color: #334155;">
              <span>⏱️ Total Duration: 11h 10m</span>
              <span>🧳 Baggage Allowance: 1 PC (23 KG)</span>
            </div>
          </div>

          <div class="page-footer">
            <span>The Bon Voyage Travel Dossier</span>
            <span>Page 4 of 11</span>
          </div>
        </div>

        <!-- PAGE 5: DESTINATION DOSSIER (CITY 1: OSAKA) -->
        <div class="pdf-page">
          <div class="section-hdr">1. DESTINATION DOSSIER: OSAKA</div>
          <div class="section-subhdr">Cultural center, street-food capital, and historic hub of Kansai</div>

          <div class="card-box">
            <div class="cover-hero-container" style="height: 240px; margin-bottom: 16px;">
              <img src="${osakaImg}" />
            </div>

            <div style="font-size: 0.875rem; color: #334155; line-height: 1.65; margin-bottom: 16px;">
              Osaka is a big modern city in Japan. It is the central metropolis of the Kansai region and the largest of the Osaka-Kobe-Kyoto trio. It is a lively and exciting place that exudes a definite charm. Its history is rich, its scenery is gorgeous, and it is well-located close to the major cultural centers of Kyoto and Nara.
            </div>

            <div style="font-size: 0.825rem; font-weight: 700; color: #0F172A; margin-bottom: 12px;">
              📍 <strong>Key Points of Interest:</strong> ${getDestinationPointsOfInterest('Osaka')}
            </div>

            <div class="amenities-grid-4">
              <div class="amenity-item">🗾 Region: Kansai</div>
              <div class="amenity-item">💴 Currency: JPY (Yen)</div>
              <div class="amenity-item">🗣️ Language: Japanese</div>
              <div class="amenity-item">⏰ Time: GMT +9</div>
            </div>
          </div>

          <div class="page-footer">
            <span>The Bon Voyage Travel Dossier</span>
            <span>Page 5 of 11</span>
          </div>
        </div>

        <!-- PAGE 6: ACCOMMODATION DOSSIER (HOTELS & RESORTS) -->
        <div class="pdf-page">
          <div class="section-hdr">ACCOMMODATION DOSSIER: HOTELS &amp; RESORTS</div>
          <div class="section-subhdr">Curated luxury hotel specifications, room plans, and verified amenities</div>

          <!-- Hotel 1 -->
          <div class="card-box">
            <div class="card-header-row">
              <div>
                <h3 class="card-title-lg">🏨 Smile Hotel Premium Osaka Hommachi</h3>
                <div style="font-size: 0.8rem; color: #64748B; font-weight: 600;">1-2-1 Minamisenba, Chuo-ku, Osaka, Japan</div>
              </div>
              <span class="card-badge-right">17–20 JUN (3 NIGHTS)</span>
            </div>

            <div class="photo-gallery-3">
              <img src="${defaultHotelImages[0]}" />
              <img src="${defaultHotelImages[1]}" />
              <img src="${defaultHotelImages[2]}" />
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; color: #0F172A; margin: 10px 0;">
              <span>Rating: ⭐⭐⭐⭐ (Popularity: 89%)</span>
              <span>Room: Deluxe Twin Room &bull; Meal Plan: Breakfast Included (CP)</span>
            </div>

            <div class="amenities-grid-4">
              <div class="amenity-item"><span class="check-icon">✔</span> High-speed Wi-Fi</div>
              <div class="amenity-item"><span class="check-icon">✔</span> 24-Hr Reception</div>
              <div class="amenity-item"><span class="check-icon">✔</span> Laundry Service</div>
              <div class="amenity-item"><span class="check-icon">✔</span> Air Conditioning</div>
              <div class="amenity-item"><span class="check-icon">✔</span> Luggage Storage</div>
              <div class="amenity-item"><span class="check-icon">✔</span> Non-Smoking Rooms</div>
              <div class="amenity-item"><span class="check-icon">✔</span> Elevator Access</div>
              <div class="amenity-item"><span class="check-icon">✔</span> Electric Kettle</div>
            </div>
          </div>

          <!-- Hotel 2 -->
          <div class="card-box">
            <div class="card-header-row">
              <div>
                <h3 class="card-title-lg">🏨 Candeo Hotels Kyoto Karasuma Rokkaku</h3>
                <div style="font-size: 0.8rem; color: #64748B; font-weight: 600;">149 Honeya-cho, Nakagyo-ku, Kyoto, Japan</div>
              </div>
              <span class="card-badge-right">20–22 JUN (2 NIGHTS)</span>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; color: #0F172A; margin: 10px 0;">
              <span>Rating: ⭐⭐⭐⭐ (Popularity: 94%)</span>
              <span>Room: Executive King Suite &bull; Meal Plan: Breakfast Included (CP)</span>
            </div>
          </div>

          <div class="page-footer">
            <span>The Bon Voyage Travel Dossier</span>
            <span>Page 6 of 11</span>
          </div>
        </div>

        <!-- PAGE 7: DESTINATION DOSSIER (CITIES 2 & 3: KYOTO & HAKONE) -->
        <div class="pdf-page">
          <div class="section-hdr">2. DESTINATION DOSSIER: KYOTO &amp; HAKONE</div>
          <div class="section-subhdr">Ancient imperial sanctuaries, bamboo groves, and Mount Fuji vistas</div>

          <!-- Kyoto Block -->
          <div class="card-box">
            <h3 class="card-title-lg" style="margin-bottom: 8px;">Kyoto — Ancient Imperial Capital</h3>
            <div class="cover-hero-container" style="height: 160px; margin-bottom: 12px;">
              <img src="${kyotoImg}" />
            </div>
            <div style="font-size: 0.825rem; color: #334155; line-height: 1.5; margin-bottom: 8px;">
              ${getDestinationOverviewText('Kyoto')}
            </div>
            <div style="font-size: 0.78rem; font-weight: 700; color: #0F172A;">
              📍 Highlights: ${getDestinationPointsOfInterest('Kyoto')}
            </div>
          </div>

          <!-- Hakone Block -->
          <div class="card-box">
            <h3 class="card-title-lg" style="margin-bottom: 8px;">Hakone — Mount Fuji Gateway</h3>
            <div class="cover-hero-container" style="height: 160px; margin-bottom: 12px;">
              <img src="${hakoneImg}" />
            </div>
            <div style="font-size: 0.825rem; color: #334155; line-height: 1.5; margin-bottom: 8px;">
              ${getDestinationOverviewText('Hakone')}
            </div>
            <div style="font-size: 0.78rem; font-weight: 700; color: #0F172A;">
              📍 Highlights: ${getDestinationPointsOfInterest('Hakone')}
            </div>
          </div>

          <div class="page-footer">
            <span>The Bon Voyage Travel Dossier</span>
            <span>Page 7 of 11</span>
          </div>
        </div>

        <!-- PAGE 8: DAILY EXPERIENCES & ACTIVITY VOUCHERS -->
        <div class="pdf-page">
          <div class="section-hdr">DAILY EXPERIENCES &amp; SIGHTSEEING VOUCHERS</div>
          <div class="section-subhdr">Confirmed entry tickets, express passes, and guided excursion dockets</div>

          <div class="card-box">
            <div class="card-header-row">
              <div>
                <h3 class="card-title-lg">🎟️ Universal Studios Japan (USJ) 1-Day Studio Pass</h3>
                <div style="font-size: 0.8rem; color: #64748B; font-weight: 600;">Full Day Express Entry Access</div>
              </div>
              <span class="card-badge-right" style="background-color: #EC4899;">18 JUN</span>
            </div>

            <div class="photo-gallery-3">
              <img src="${defaultActivityImages[0]}" />
              <img src="${defaultActivityImages[1]}" />
              <img src="${defaultActivityImages[2]}" />
            </div>

            <div style="font-size: 0.85rem; color: #334155; line-height: 1.5; margin-bottom: 10px;">
              Experience world-class entertainment at Universal Studios Japan including The Wizarding World of Harry Potter and Super Nintendo World.
            </div>

            <div class="incl-excl-grid">
              <div class="incl-list">
                <div class="incl-title">✔ INCLUDED:</div>
                <div>• 1-Day USJ Studio Pass Ticket</div>
                <div>• Super Nintendo World Area Entry</div>
                <div>• E-Voucher Instant QR Code</div>
              </div>
              <div class="excl-list">
                <div class="excl-title">✘ NOT INCLUDED:</div>
                <div>• Express Pass Top-up</div>
                <div>• Personal Meals &amp; Souvenirs</div>
                <div>• Hotel Pickup Transfer</div>
              </div>
            </div>
          </div>

          <div class="page-footer">
            <span>The Bon Voyage Travel Dossier</span>
            <span>Page 8 of 11</span>
          </div>
        </div>

        <!-- PAGE 9: INTERCITY TRANSIT & TRANSFERS -->
        <div class="pdf-page">
          <div class="section-hdr">TRANSITS, TRANSFERS &amp; RAILWAY DOCKETS</div>
          <div class="section-subhdr">Private airport vehicles, Shinkansen bullet trains, and intercity transit</div>

          <!-- Airport Transfer -->
          <div class="card-box">
            <div class="card-header-row">
              <h3 class="card-title-lg">🚗 Kansai Airport Private Transfer</h3>
              <span class="card-badge-right" style="background-color: #3B82F6;">Arrival Transfer</span>
            </div>
            <div style="display: flex; gap: 16px; align-items: center;">
              <img src="${vehicleImage}" style="width: 140px; height: 90px; object-fit: cover; border-radius: 8px;" />
              <div>
                <div style="font-weight: 700; color: #0F172A; font-size: 0.95rem;">From Kansai Airport (KIX) &rarr; Smile Hotel Premium Osaka</div>
                <div style="font-size: 0.8rem; color: #64748B; margin-top: 4px;">Vehicle: <strong>Private – Standard Minibus</strong> &bull; Pickup Time: <strong>14:00 PM</strong></div>
                <div style="font-size: 0.78rem; color: #3B82F6; font-weight: 700; margin-top: 4px;">Wait Time: 45 Mins Max Included</div>
              </div>
            </div>
          </div>

          <!-- Bullet Train -->
          <div class="card-box" style="border-left: 4px solid #F97316;">
            <div class="card-header-row">
              <h3 class="card-title-lg">🚄 Japan Railway Shinkansen (Bullet Train)</h3>
              <span class="card-badge-right">20 JUN</span>
            </div>
            <div style="font-size: 0.9rem; font-weight: 700; color: #0F172A;">Shin-Osaka Station &rarr; Kyoto Station</div>
            <div style="font-size: 0.8rem; color: #64748B; margin-top: 4px;">
              Departure: 10:00 AM &bull; Arrival: 10:15 AM (Duration: 15 Mins) &bull; Baggage Limit: 20 KG per person
            </div>
          </div>

          <div class="page-footer">
            <span>The Bon Voyage Travel Dossier</span>
            <span>Page 9 of 11</span>
          </div>
        </div>

        <!-- PAGE 10: PACKAGE INCLUSIONS, EXCLUSIONS & PAYMENT TERMS -->
        <div class="pdf-page">
          <div class="section-hdr">PACKAGE INCLUSIONS, EXCLUSIONS &amp; PAYMENT TERMS</div>
          <div class="section-subhdr">Itemized inclusions checklist, exclusions, payment milestones, and refund slabs</div>

          <div class="incl-excl-grid" style="margin-bottom: 20px;">
            <div class="incl-list">
              <div class="incl-title">✔ PACKAGE INCLUSIONS:</div>
              <div>• 11 Nights 4-Star Accommodation Stay</div>
              <div>• Daily Buffet Breakfast (CP Meal Plan)</div>
              <div>• International Outbound &amp; Return Flights</div>
              <div>• Private Minibus Airport Transfers (KIX &amp; HND)</div>
              <div>• Shinkansen Bullet Train Express Reserved Seats</div>
              <div>• Universal Studios Japan 1-Day Studio Passes</div>
              <div>• 24/7 On-Tour Agent Support Service</div>
            </div>
            <div class="excl-list">
              <div class="excl-title">✘ PACKAGE EXCLUSIONS:</div>
              <div>• 20% TCS (Collected separately per Govt norm)</div>
              <div>• Personal expenses &amp; shopping purchases</div>
              <div>• Lunches &amp; Dinners unless specified</div>
              <div>• Travel Insurance top-up fees</div>
              <div>• Early check-in or late check-out surcharges</div>
            </div>
          </div>

          <h3 style="font-size: 1rem; font-weight: 800; color: #0F172A; text-transform: uppercase; margin-bottom: 10px;">Payment Milestone Schedule</h3>
          <table class="condensed-stop-table" style="margin-bottom: 20px;">
            <thead>
              <tr>
                <th>Milestone Stage</th>
                <th>Percentage</th>
                <th>Due Condition</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Initial Booking Advance</td>
                <td>25%</td>
                <td>At time of tour confirmation</td>
                <td>${formatCurrency(Math.round((amount || 1600000) * 0.25))}</td>
              </tr>
              <tr>
                <td>Airfare &amp; Visa Issuance</td>
                <td>50%</td>
                <td>30 Days prior to departure</td>
                <td>${formatCurrency(Math.round((amount || 1600000) * 0.50))}</td>
              </tr>
              <tr>
                <td>Balance Final Payment</td>
                <td>25%</td>
                <td>15 Days prior to departure</td>
                <td>${formatCurrency(Math.round((amount || 1600000) * 0.25))}</td>
              </tr>
            </tbody>
          </table>

          <div class="page-footer">
            <span>The Bon Voyage Travel Dossier</span>
            <span>Page 10 of 11</span>
          </div>
        </div>

        <!-- PAGE 11: REGULATORY NOTICES & POLICY REMARKS -->
        <div class="pdf-page">
          <div class="section-hdr">REGULATORY NOTICES &amp; POLICY REMARKS</div>
          <div class="section-subhdr">Mandatory tax notices, hotel check-in standards, and agency support channels</div>

          <div class="remarks-text-block">
            <div class="remarks-block-title">📌 TCS Notice (Section 206C(1G))</div>
            20% TCS effective 1 Oct 2023 on foreign tour package bookings (100% refundable via IT returns), collected separately from individual travelers.
          </div>

          <div class="remarks-text-block">
            <div class="remarks-block-title">📌 Pricing &amp; Operational Disclaimer</div>
            Quote based on current availability of Flights + Hotels + Activities + Transfers; subject to price changes prior to confirmation. In case of unavailability, operations team will offer equivalent alternatives or applicable refunds.
          </div>

          <div class="remarks-text-block">
            <div class="remarks-block-title">📌 Check-in / Check-out Policy</div>
            Standard hotel check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in or late check-out requests are subject to hotel availability and discretion.
          </div>

          <div class="remarks-text-block">
            <div class="remarks-block-title">📌 Hotel Review &amp; Classification Disclaimer</div>
            Star ratings and guest reviews are provided for reference only. We recommend visiting official hotel websites for exact property details.
          </div>

          <div style="margin-top: 24px; background-color: #0F172A; color: #FFFFFF; padding: 20px; border-radius: 14px;">
            <div style="font-weight: 800; font-size: 1rem; color: #F97316; text-transform: uppercase; margin-bottom: 4px;">24/7 Emergency Support Contact</div>
            <div style="font-size: 0.85rem; color: #CBD5E1;">Agent: <strong>Kushdeep Sawhney</strong> &bull; Phone: <strong>+91 99999 98088</strong> &bull; Email: <strong>sales@thebonvoyage.in</strong></div>
          </div>

          <div class="page-footer">
            <span>The Bon Voyage Travel Dossier</span>
            <span>Page 11 of 11</span>
          </div>
        </div>

        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
    </html>
  `;
};

/**
 * Export PDF by opening a print window with the chosen template.
 */
export const exportItineraryPDF = (data, templateId = 'detailed') => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Popup blocked. Please allow popups for this site to export PDF.');
    return;
  }

  let html = '';
  switch (templateId) {
    case 'executive':
      html = generateTemplateExecutive(data);
      break;
    case 'adventure':
      html = generateTemplateAdventure(data);
      break;
    case 'modern':
      html = generateTemplateModern(data);
      break;
    case 'detailed':
    default:
      html = generateTemplateDetailed(data);
      break;
  }

  printWindow.document.write(html);
  printWindow.document.close();
};

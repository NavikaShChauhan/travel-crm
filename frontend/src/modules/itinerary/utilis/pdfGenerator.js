/**
 * PDF Generator utility with 3 distinct HTML/CSS templates for Itinerary Export.
 */

const formatCurrency = (amount) => {
  return `₹ ${(amount || 0).toLocaleString('en-IN')}`;
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

  const servicesByDay = (dayNum) => services.filter((s) => s.dayNumber === dayNum);

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

  const servicesByDay = (dayNum) => services.filter((s) => s.dayNumber === dayNum);

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

  const servicesByDay = (dayNum) => services.filter((s) => s.dayNumber === dayNum);

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
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
    </html>
  `;
};

/**
 * TEMPLATE 4: Detailed Luxury Dossier (Images, Galleries, Timeline & Flights)
 */
export const generateTemplateDetailed = (data) => {
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

  const totalPax = adults + children + infants;
  const servicesByDay = (dayNum) => services.filter((s) => s.dayNumber === dayNum);

  // Compute Glossary counters
  const destinationsCount = destination ? destination.split(',').length : 1;
  const accommodationsCount = services.filter((s) => s.type === 'Hotel').length;
  const transportsCount = services.filter((s) => s.type === 'Transport' || s.type === 'Transfer').length;
  const ticketsCount = services.filter((s) => s.type === 'Sightseeing' || s.type === 'Activity').length;
  const transfersCount = services.filter((s) => s.type === 'Transfer' || s.type === 'Ferry').length;
  const nightsCount = services.filter((s) => s.type === 'Hotel').reduce((acc, s) => acc + (parseInt(s.nights) || 1), 0) || (days.length > 1 ? days.length - 1 : 1);

  // Default images for preview fallback
  const isJapan = (destination || '').toLowerCase().includes('japan');
  const fallbackCover = isJapan
    ? 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80'
    : 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80';

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

  // Specific content details based on destinations
  const getDestinationOverviewText = (city = '') => {
    const lCity = city.toLowerCase();
    if (lCity.includes('osaka')) {
      return `Osaka is a big modern city in Japan. It is the central metropolis of the Kansai region and the largest of the Osaka-Kobe-Kyoto trio. It is a lively and exciting place that exudes a definite charm. Its history is rich, its scenery is gorgeous, and it's well-located close to the major cultural centers of Kyoto and Nara.`;
    }
    if (lCity.includes('kyoto')) {
      return `For over a thousand years Kyoto was the capital of Japan and it is probably the best preserved of all its cities. It’s a beautiful vibrant city where modern life meets old traditional Japan. The city is surrounded by the mountains of Western Honshu.`;
    }
    if (lCity.includes('hakone')) {
      return `Hakone is a popular tourist destination in Kanagawa Prefecture, Japan, known for its natural beauty, hot springs and breathtaking views of Mount Fuji. It offers an ideal getaway from the hustle and bustle of Tokyo.`;
    }
    if (lCity.includes('tokyo')) {
      return `Tokyo is the capital of Japan and one of the largest urban area in the world. Tokyo is the financial center of Japan and a blend of high-technology and tradition. Tokyo is huge and a well-organized modern city.`;
    }
    if (lCity.includes('shimla')) {
      return `Shimla is the capital and the largest city of the northern Indian state of Himachal Pradesh. A popular tourist destination, Shimla is often referred to as the "Queen of the Hills" and is famous for colonial architecture.`;
    }
    if (lCity.includes('manali')) {
      return `Manali is a resort town nestled in the snow-capped slopes of the Pir Panjal and the Dhauladhar ranges. Serving as a gateway for Solang Valley and Rohtang Pass, it is famous for meadows, valleys and adventure activities.`;
    }
    if (lCity.includes('dharamshala')) {
      return `Dharamshala is the winter capital of Himachal Pradesh. Surrounded by dense coniferous forests, the suburb of McLeod Ganj is famous worldwide as the home of His Holiness the Dalai Lama.`;
    }
    return `Discover the scenic wonders and cultural charms of this beautiful destination, offering outstanding travel highlights and curated local experiences.`;
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
    if (lCity.includes('shimla')) {
      return 'The Ridge, Mall Road, Jakhoo Temple, Christ Church, Kufri Peak, Indian Institute of Advanced Study';
    }
    if (lCity.includes('manali')) {
      return 'Hadimba Temple, Solang Valley, Rohtang Pass, Jogini Waterfalls, Vashisht Hot Water Springs, Old Manali';
    }
    if (lCity.includes('dharamshala')) {
      return 'Dalai Lama Temple (Tsuglagkhang), Bhagsunag Waterfall, Dal Lake, HPCA Cricket Stadium, McLeod Ganj market';
    }
    return 'Popular local landmarks, city center hub, historical architectures, scenic viewpoint peaks, and traditional markets';
  };

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${name} - Luxury Travel Dossier</title>
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
          
          /* Printable Page breaks */
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

          /* Header / Footer page numbers */
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

          /* COVER PAGE (Page 1) */
          .cover-label {
            font-size: 0.8rem;
            font-weight: 700;
            letter-spacing: 0.25em;
            color: #94A3B8;
            text-transform: uppercase;
            margin-top: 20px;
            margin-bottom: 8px;
          }
          .cover-title {
            font-size: 2.6rem;
            font-weight: 800;
            color: #0F172A;
            margin: 0 0 16px 0;
            letter-spacing: -0.02em;
            text-transform: uppercase;
          }
          .cover-line {
            width: 80px;
            height: 5px;
            background-color: #F59E0B;
            border-radius: 2.5px;
            margin-bottom: 40px;
          }
          .cover-created-date {
            text-align: right;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            color: #64748B;
            text-transform: uppercase;
            margin-bottom: 12px;
          }
          .cover-image-container {
            width: 100%;
            height: 380px;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 15px 45px rgba(0, 0, 0, 0.15);
            margin-bottom: 40px;
          }
          .cover-image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .cover-details-grid {
            display: grid;
            grid-template-columns: 1.8fr 1fr;
            gap: 40px;
            margin-bottom: 40px;
          }
          .details-block-title {
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.15em;
            color: #64748B;
            text-transform: uppercase;
            border-bottom: 1.5px solid #E2E8F0;
            padding-bottom: 6px;
            margin-bottom: 12px;
          }
          .details-val {
            font-size: 0.95rem;
            color: #1E293B;
            margin-bottom: 6px;
            font-weight: 600;
          }
          .details-val strong {
            color: #0F172A;
          }
          .glossary-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            background-color: #F8FAFC;
            border: 1px dashed #CBD5E1;
            padding: 16px;
            border-radius: 12px;
          }
          .glossary-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.85rem;
            font-weight: 600;
            color: #475569;
          }
          .glossary-icon {
            color: #F59E0B;
            font-size: 1.15rem;
          }

          /* PAGE 2: SUMMARY ITINERARY */
          .itinerary-summary-map {
            width: 100%;
            height: 280px;
            border-radius: 16px;
            background-color: #EFF6FF;
            border: 1.5px solid #BFDBFE;
            background-image: url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80');
            background-size: cover;
            background-position: center;
            margin-bottom: 30px;
            position: relative;
          }
          .map-overlay {
            position: absolute;
            top: 15px;
            left: 15px;
            background: rgba(255, 255, 255, 0.9);
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 700;
            color: #1E3A8A;
          }
          .summary-timeline {
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-top: 20px;
          }
          .summary-node {
            display: flex;
            gap: 20px;
            align-items: flex-start;
          }
          .summary-node-badge {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-color: #FEF3C7;
            border: 2px solid #F59E0B;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #B45309;
            font-weight: 800;
            font-size: 0.88rem;
            flex-shrink: 0;
          }
          .summary-node-badge.start-end {
            background-color: #EEF2FF;
            border-color: #4F46E5;
            color: #3730A3;
          }
          .summary-node-content {
            flex: 1;
            border-bottom: 1.5px solid #F1F5F9;
            padding-bottom: 12px;
          }
          .summary-node-title {
            font-size: 1.05rem;
            font-weight: 700;
            color: #0F172A;
            margin: 0 0 4px 0;
          }
          .summary-node-date {
            font-size: 0.85rem;
            color: #64748B;
            font-weight: 500;
            margin-bottom: 6px;
          }
          .summary-node-details {
            font-size: 0.85rem;
            color: #475569;
            line-height: 1.45;
          }

          /* SERVICE SEGMENTS (Flight, Hotel, Transport, Activity) */
          .section-block {
            margin-bottom: 30px;
            border-bottom: 1px solid #E2E8F0;
            padding-bottom: 24px;
          }
          .section-block:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          .segment-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
          }
          .segment-icon-box {
            width: 36px;
            height: 36px;
            border-radius: 8px;
            background-color: #FEF3C7;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #B45309;
            font-size: 1.2rem;
          }
          .segment-icon-box.flight { background-color: #ECFDF5; color: #059669; }
          .segment-icon-box.transport { background-color: #EFF6FF; color: #1D4ED8; }
          .segment-icon-box.hotel { background-color: #FEF3C7; color: #B45309; }
          
          .segment-title-box h3 {
            font-size: 1.15rem;
            font-weight: 800;
            color: #0F172A;
            margin: 0;
          }
          .segment-title-box p {
            font-size: 0.78rem;
            color: #64748B;
            font-weight: 600;
            margin: 2px 0 0 0;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          /* FLIGHT CARD VIEW */
          .flight-box-detailed {
            border: 1.5px solid #E2E8F0;
            border-radius: 12px;
            padding: 16px 20px;
            background-color: #FCFDFE;
          }
          .flight-row-main {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
          }
          .flight-port-block {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .flight-time {
            font-size: 1.25rem;
            font-weight: 800;
            color: #0F172A;
          }
          .flight-airport {
            font-size: 0.8rem;
            color: #64748B;
            font-weight: 600;
          }
          .flight-divider-line {
            flex: 1;
            margin: 0 20px;
            position: relative;
            text-align: center;
          }
          .flight-line-dots {
            height: 2px;
            background-color: #CBD5E1;
            width: 100%;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
          .flight-duration-lbl {
            position: relative;
            background: #FCFDFE;
            padding: 0 8px;
            font-size: 0.75rem;
            color: #475569;
            font-weight: 700;
            z-index: 1;
          }
          .flight-meta-strip {
            display: flex;
            justify-content: space-between;
            background-color: #F1F5F9;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 0.78rem;
            font-weight: 700;
            color: #475569;
          }

          /* HOTEL DETAILS VIEW */
          .gallery-grid-detailed {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 16px;
          }
          .gallery-image-box {
            height: 120px;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #E2E8F0;
          }
          .gallery-image-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .hotel-specs-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            background-color: #FEFDF9;
            border: 1px solid #FDE68A;
            padding: 14px;
            border-radius: 10px;
            margin-bottom: 16px;
          }
          .hotel-spec-item {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .hotel-spec-label {
            font-size: 0.7rem;
            font-weight: 700;
            color: #B45309;
            text-transform: uppercase;
          }
          .hotel-spec-value {
            font-size: 0.85rem;
            font-weight: 700;
            color: #1E293B;
          }
          .checklist-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px 16px;
            margin-top: 10px;
          }
          .checklist-item {
            font-size: 0.8rem;
            color: #475569;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .check-bullet {
            color: #059669;
            font-weight: 800;
          }

          /* TRANSPORT CARD VIEW */
          .transport-specs-box {
            display: grid;
            grid-template-columns: 100px 1.5fr 1fr;
            gap: 20px;
            border: 1.5px solid #E2E8F0;
            border-radius: 12px;
            padding: 16px 20px;
            background-color: #F8FAFC;
            align-items: center;
          }
          .transport-img-box {
            width: 90px;
            height: 60px;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #CBD5E1;
          }
          .transport-img-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .transport-route-title {
            font-size: 0.95rem;
            font-weight: 800;
            color: #0F172A;
            margin: 0 0 4px 0;
          }
          .transport-route-detail {
            font-size: 0.8rem;
            color: #64748B;
            font-weight: 600;
          }
          .transport-wait-tag {
            text-align: right;
            font-size: 0.78rem;
            font-weight: 700;
            color: #1D4ED8;
            background-color: #EFF6FF;
            padding: 6px 12px;
            border-radius: 8px;
            width: fit-content;
            margin-left: auto;
          }

          /* DESTINATION HIGHLIGHT PAGE */
          .destination-hero-img {
            width: 100%;
            height: 260px;
            border-radius: 16px;
            overflow: hidden;
            margin-bottom: 20px;
          }
          .destination-hero-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .dest-description-text {
            font-size: 0.9rem;
            color: #334155;
            line-height: 1.6;
            margin-bottom: 20px;
            text-align: justify;
          }
          .points-of-interest-box {
            background-color: #F8FAFC;
            border: 1.5px dashed #CBD5E1;
            padding: 16px 20px;
            border-radius: 12px;
          }
          .points-of-interest-title {
            font-size: 0.85rem;
            font-weight: 800;
            color: #0F172A;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 8px;
          }
          .points-of-interest-content {
            font-size: 0.85rem;
            color: #475569;
            font-weight: 600;
            line-height: 1.5;
          }

          /* TOTAL PRICE FOOTER CARD */
          .luxury-price-card {
            background: linear-gradient(135deg, #153328 0%, #0B1914 100%);
            border-radius: 16px;
            padding: 24px 32px;
            color: #ffffff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 30px;
            box-shadow: 0 10px 30px rgba(21, 51, 40, 0.25);
          }
          .price-left-stack h4 {
            font-size: 1.15rem;
            font-weight: 800;
            color: #D4AF37;
            margin: 0 0 4px 0;
            letter-spacing: 0.02em;
          }
          .price-left-stack p {
            font-size: 0.78rem;
            color: #94A3B8;
            font-weight: 500;
            margin: 0;
          }
          .price-val-display {
            font-size: 2.1rem;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: -0.03em;
          }

          @media print {
            body { background: #ffffff; }
            .pdf-page {
              box-shadow: none !important;
              border: none !important;
              margin: 0 !important;
              padding: 40px !important;
            }
          }
        </style>
      </head>
      <body>
        <!-- PAGE 1: COVER PAGE -->
        <div class="pdf-page">
          <div class="cover-label">YOUR TRIP TO:</div>
          <h1 class="cover-title">${name || destination || 'Custom Journey'}</h1>
          <div class="cover-line"></div>
          
          <div class="cover-created-date">CREATED ${new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}</div>
          
          <div class="cover-image-container">
            <img src="${coverImage || fallbackCover}" />
          </div>

          <div class="cover-details-grid">
            <div>
              <div class="details-block-title">QUOTE FOR YOUR TRIP</div>
              <div class="details-val">Based on <strong>${adults} Adults</strong> ${children > 0 ? `, <strong>${children} Children</strong>` : ''}</div>
              <div class="details-val">🗓️ Travel period: <strong>${startDate || 'TBD'} to ${endDate || 'TBD'}</strong></div>
              ${(discountAmount > 0 || (originalAmount && originalAmount > amount)) ? `
                <div class="details-val">Subtotal: <span style="text-decoration: line-through;">${formatCurrency(originalAmount || (amount + discountAmount))}</span></div>
                <div class="details-val" style="color: #059669;">Saved: ${formatCurrency(discountAmount)}</div>
              ` : ''}
              <div class="details-val" style="font-size: 1.15rem; margin-top: 8px; color: #0F172A;">Total Price: <strong style="color: #059669;">${formatCurrency(amount)}</strong></div>
            </div>

            <div>
              <div class="details-block-title">CONTACT</div>
              <div class="details-val">📞 +91 99999 98088</div>
              <div class="details-val">📧 sales@thebonvoyage.in</div>
              
              <div class="details-block-title" style="margin-top: 15px;">AGENT CONTACT</div>
              <div class="details-val"><strong>Kushdeep Sawhney</strong></div>
              <div class="details-val">📧 sales@thebonvoyage.in</div>
            </div>
          </div>

          <div>
            <div class="details-block-title">GLOSSARY</div>
            <div class="glossary-grid">
              <div class="glossary-item"><span class="glossary-icon">📍</span> ${destinationsCount} Destinations</div>
              <div class="glossary-item"><span class="glossary-icon">🏨</span> ${accommodationsCount} Accommodations</div>
              <div class="glossary-item"><span class="glossary-icon">🚗</span> ${transportsCount} Transports</div>
              <div class="glossary-item"><span class="glossary-icon">🎟️</span> ${ticketsCount} Tickets</div>
              <div class="glossary-item"><span class="glossary-icon">🚌</span> ${transfersCount} Transfers</div>
              <div class="glossary-item"><span class="glossary-icon">🌙</span> ${nightsCount} Nights</div>
            </div>
          </div>

          <div class="page-footer">
            <span>The Bon Voyage Travel Dossier</span>
            <span>Page 1</span>
          </div>
        </div>

        <!-- PAGE 2: ITINERARY TIMELINE SUMMARY -->
        <div class="pdf-page">
          <h2 style="font-size: 1.7rem; font-weight: 800; color: #0F172A; text-transform: uppercase; margin-bottom: 20px; letter-spacing: 0.05em;">ITINERARY SUMMARY</h2>
          <div class="cover-line" style="margin-bottom: 25px;"></div>

          <div class="itinerary-summary-map">
            <div class="map-overlay">📍 ROUTE MAP OVERVIEW</div>
          </div>

          <div class="summary-timeline">
            <div class="summary-node">
              <div class="summary-node-badge start-end">🏁</div>
              <div class="summary-node-content">
                <div class="summary-node-title">Start of Journey</div>
                <div class="summary-node-date">${startDate || 'Departure Date'}</div>
                <div class="summary-node-details">Departure and airport transfers initiated.</div>
              </div>
            </div>

            ${days.map((day, idx) => {
              const dayServices = servicesByDay(day.dayNumber);
              const hotelService = dayServices.find(s => s.type === 'Hotel');
              const activityServices = dayServices.filter(s => s.type === 'Sightseeing' || s.type === 'Activity');
              
              return `
                <div class="summary-node">
                  <div class="summary-node-badge">${idx + 1}</div>
                  <div class="summary-node-content">
                    <div class="summary-node-title">Day ${day.dayNumber}: ${day.title}</div>
                    <div class="summary-node-date">${day.description || 'Sightseeing & leisure agenda'}</div>
                    <div class="summary-node-details">
                      ${hotelService ? `🏨 <strong>Stay:</strong> ${hotelService.title} (${hotelService.nights || 1} Nights)<br/>` : ''}
                      ${activityServices.length > 0 ? `🎟️ <strong>Activities:</strong> ${activityServices.map(a => a.title).join(', ')}` : ''}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}

            <div class="summary-node">
              <div class="summary-node-badge start-end">🏁</div>
              <div class="summary-node-content">
                <div class="summary-node-title">End of Journey</div>
                <div class="summary-node-date">${endDate || 'Return Date'}</div>
                <div class="summary-node-details">Airport transfers and return flight boarding.</div>
              </div>
            </div>
          </div>

          <div class="page-footer">
            <span>The Bon Voyage Travel Dossier</span>
            <span>Page 2</span>
          </div>
        </div>

        <!-- DAYWISE DETAILS & GALLERIES -->
        ${days.map((day, pageIdx) => {
          const dayServices = servicesByDay(day.dayNumber);
          const flightServices = dayServices.filter(s => s.type === 'Flight');
          const hotelServices = dayServices.filter(s => s.type === 'Hotel');
          const transportServices = dayServices.filter(s => s.type === 'Transport' || s.type === 'Transfer');
          const activityServices = dayServices.filter(s => s.type === 'Sightseeing' || s.type === 'Activity');

          return `
            <div class="pdf-page">
              <h2 style="font-size: 1.6rem; font-weight: 800; color: #0F172A; text-transform: uppercase; margin-bottom: 8px;">Day ${day.dayNumber}: ${day.title}</h2>
              <div class="cover-line" style="margin-bottom: 24px; height: 3px;"></div>

              <!-- Day Hero & Destination Description -->
              <div class="destination-hero-img">
                <img src="${coverImage || fallbackCover}" />
              </div>
              <p class="dest-description-text">${day.description || getDestinationOverviewText(day.title || destination)}</p>
              
              <div class="points-of-interest-box" style="margin-bottom: 24px;">
                <div class="points-of-interest-title">Points of Interest:</div>
                <div class="points-of-interest-content">${getDestinationPointsOfInterest(day.title || destination)}</div>
              </div>

              <!-- Services rendering -->
              ${flightServices.map(fl => `
                <div class="section-block">
                  <div class="segment-header">
                    <div class="segment-icon-box flight">✈️</div>
                    <div class="segment-title-box">
                      <h3>${fl.title}</h3>
                      <p>Flight Service details</p>
                    </div>
                  </div>
                  <div class="flight-box-detailed">
                    <div class="flight-row-main">
                      <div class="flight-port-block">
                        <span class="flight-time">${fl.pickupTime || '10:00'}</span>
                        <span class="flight-airport">${fl.fromPort || 'Departure Port'}</span>
                      </div>
                      <div class="flight-divider-line">
                        <div class="flight-line-dots"></div>
                        <span class="flight-duration-lbl">Direct Flight</span>
                      </div>
                      <div class="flight-port-block" style="text-align: right;">
                        <span class="flight-time">${fl.dropTime || '14:00'}</span>
                        <span class="flight-airport">${fl.toPort || 'Arrival Port'}</span>
                      </div>
                    </div>
                    <div class="flight-meta-strip">
                      <span>Fare Category: Economy Class</span>
                      <span>Baggage Allowance: 1 PC (23 KG)</span>
                    </div>
                  </div>
                </div>
              `).join('')}

              ${hotelServices.map(ht => `
                <div class="section-block">
                  <div class="segment-header">
                    <div class="segment-icon-box hotel">🏨</div>
                    <div class="segment-title-box">
                      <h3>${ht.title}</h3>
                      <p>Accommodation stay</p>
                    </div>
                  </div>
                  
                  <div class="gallery-grid-detailed">
                    ${defaultHotelImages.map(img => `
                      <div class="gallery-image-box"><img src="${img}" /></div>
                    `).join('')}
                  </div>

                  <div class="hotel-specs-grid">
                    <div class="hotel-spec-item">
                      <span class="hotel-spec-label">Nights</span>
                      <span class="hotel-spec-value">${ht.nights || 1} Night/s</span>
                    </div>
                    <div class="hotel-spec-item">
                      <span class="hotel-spec-label">Room Type</span>
                      <span class="hotel-spec-value">${ht.roomType || 'Standard'}</span>
                    </div>
                    <div class="hotel-spec-item">
                      <span class="hotel-spec-label">Meal Plan</span>
                      <span class="hotel-spec-value">${ht.mealPlan || 'CP'}</span>
                    </div>
                    <div class="hotel-spec-item">
                      <span class="hotel-spec-label">Rating</span>
                      <span class="hotel-spec-value">⭐⭐⭐⭐</span>
                    </div>
                  </div>

                  <div class="checklist-container">
                    <div class="checklist-item"><span class="check-bullet">✔</span> Free high-speed Wi-Fi</div>
                    <div class="checklist-item"><span class="check-bullet">✔</span> Laundry service</div>
                    <div class="checklist-item"><span class="check-bullet">✔</span> 24-Hour Reception Desk</div>
                    <div class="checklist-item"><span class="check-bullet">✔</span> Smoking area</div>
                    <div class="checklist-item"><span class="check-bullet">✔</span> Air conditioning</div>
                    <div class="checklist-item"><span class="check-bullet">✔</span> Luggage storage room</div>
                  </div>
                </div>
              `).join('')}

              ${transportServices.map(tr => {
                const isMini = (tr.title || '').toLowerCase().includes('minibus') || (tr.vehicleType || '').toLowerCase().includes('minibus') || (tr.vehicleType || '').toLowerCase().includes('coach');
                const vehImg = isMini 
                  ? 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=350&q=80'
                  : 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=350&q=80';

                return `
                  <div class="section-block">
                    <div class="segment-header">
                      <div class="segment-icon-box transport">🚗</div>
                      <div class="segment-title-box">
                        <h3>${tr.title}</h3>
                        <p>Transit & Transfer</p>
                      </div>
                    </div>

                    <div class="transport-specs-box">
                      <div class="transport-img-box"><img src="${vehImg}" /></div>
                      <div>
                        <div class="transport-route-title">From ${tr.fromLocation || 'Pickup Point'} to ${tr.toLocation || 'Drop Point'}</div>
                        <div class="transport-route-detail">🕗 Pickup: <strong>${tr.pickupTime || '09:00 AM'}</strong> &bull; Vehicle: <strong>${tr.vehicleType || 'Private Cab'}</strong></div>
                      </div>
                      <div>
                        <div class="transport-wait-tag">Wait: 45 Mins Max</div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}

              ${activityServices.map(act => `
                <div class="section-block">
                  <div class="segment-header">
                    <div class="segment-icon-box" style="background-color: #FEF2F2; color: #EF4444;">🎟️</div>
                    <div class="segment-title-box">
                      <h3>${act.title}</h3>
                      <p>Sightseeing ticket</p>
                    </div>
                  </div>

                  <div class="gallery-grid-detailed">
                    ${defaultActivityImages.map(img => `
                      <div class="gallery-image-box"><img src="${img}" /></div>
                    `).join('')}
                  </div>

                  <div style="font-size: 0.88rem; color: #475569; line-height: 1.5; margin-bottom: 12px;">
                    ${act.description || 'Sightseeing activity voucher access included. Experience premium tours and cultural attractions with a professional guide.'}
                  </div>

                  <div class="hotel-specs-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 0;">
                    <div class="hotel-spec-item">
                      <span class="hotel-spec-label">Duration</span>
                      <span class="hotel-spec-value">${act.durationText || '1 Day'}</span>
                    </div>
                    <div class="hotel-spec-item">
                      <span class="hotel-spec-label">Tickets count</span>
                      <span class="hotel-spec-value">${totalPax} Tickets</span>
                    </div>
                    <div class="hotel-spec-item">
                      <span class="hotel-spec-label">Meeting Point</span>
                      <span class="hotel-spec-value">Hotel Lobby</span>
                    </div>
                  </div>
                </div>
              `).join('')}

              <div class="page-footer">
                <span>The Bon Voyage Travel Dossier</span>
                <span>Page ${pageIdx + 3}</span>
              </div>
            </div>
          `;
        }).join('')}

        <!-- FINAL PAGE: BILLING SUMMARY & TERMS -->
        <div class="pdf-page">
          <h2 style="font-size: 1.7rem; font-weight: 800; color: #0F172A; text-transform: uppercase; margin-bottom: 20px;">PRICING &amp; TERMS</h2>
          <div class="cover-line" style="margin-bottom: 25px;"></div>

          <div class="luxury-price-card">
            <div class="price-left-stack">
              <h4>GRAND TOTAL INVESTMENT</h4>
              <p>Inclusive of all accommodation, transit cobs, flight fares, activity tickets, and tax charges</p>
            </div>
            <div class="price-val-display">${formatCurrency(amount)}</div>
          </div>

          ${termsAndPolicies && termsAndPolicies.length > 0 ? `
            <div style="margin-top: 40px;">
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; text-transform: uppercase; margin-bottom: 16px;">Tour Policies &amp; Inclusions</h3>
              ${termsAndPolicies.map(block => `
                <div style="margin-bottom: 20px;">
                  <h4 style="font-size: 0.95rem; font-weight: 800; color: #B45309; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.02em;">📌 ${block.title}</h4>
                  <ul style="margin: 0; padding-left: 20px; font-size: 0.85rem; color: #475569; line-height: 1.6;">
                    ${block.items.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div class="page-footer">
            <span>The Bon Voyage Travel Dossier</span>
            <span>Page ${days.length + 3}</span>
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
export const exportItineraryPDF = (data, templateId = 'modern') => {
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
    case 'detailed':
      html = generateTemplateDetailed(data);
      break;
    case 'modern':
    default:
      html = generateTemplateModern(data);
      break;
  }

  printWindow.document.write(html);
  printWindow.document.close();
};

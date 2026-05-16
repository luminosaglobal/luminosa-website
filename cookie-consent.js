/* ============================================================
   LUMINOSA COOKIE CONSENT
   Upload this file to your repo root, then add ONE line before
   </body> on every page:
   <script src="/cookie-consent.js"></script>
   
   Replace YOUR_PIXEL_ID_HERE below with your Meta Pixel ID.
============================================================ */

(function() {
  var META_PIXEL_ID = 'YOUR_PIXEL_ID_HERE'; // <-- replace this

  // Inject styles
  var style = document.createElement('style');
  style.textContent = `
    #cookie-consent-banner {
      position: fixed; bottom: 0; left: 0; right: 0;
      background: #FAF7F2; border-top: 1px solid #005CAF;
      padding: 20px 24px; z-index: 9999; display: none;
      box-shadow: 0 -2px 12px rgba(0,0,0,0.08);
      font-family: 'DM Sans', sans-serif;
    }
    #cookie-consent-banner.show {
      display: flex; flex-wrap: wrap; align-items: center;
      justify-content: space-between; gap: 16px;
    }
    #cookie-consent-banner .cc-text {
      flex: 1; min-width: 280px; font-size: 14px;
      line-height: 1.5; color: #1a1a1a;
    }
    #cookie-consent-banner .cc-text a { color: #005CAF; text-decoration: underline; }
    #cookie-consent-banner .cc-buttons { display: flex; gap: 8px; flex-shrink: 0; }
    #cookie-consent-banner button {
      padding: 10px 20px; border: none; border-radius: 4px;
      font-family: 'DM Sans', sans-serif; font-size: 14px;
      font-weight: 500; cursor: pointer; transition: opacity 0.2s;
    }
    #cookie-consent-banner button:hover { opacity: 0.85; }
    #cookie-consent-banner .cc-reject {
      background: transparent; color: #1a1a1a; border: 1px solid #1a1a1a;
    }
    #cookie-consent-banner .cc-accept { background: #005CAF; color: #ffffff; }
    @media (max-width: 600px) {
      #cookie-consent-banner.show { flex-direction: column; align-items: stretch; }
      #cookie-consent-banner .cc-buttons { width: 100%; }
      #cookie-consent-banner button { flex: 1; }
    }
  `;
  document.head.appendChild(style);

  // Inject banner HTML
  var banner = document.createElement('div');
  banner.id = 'cookie-consent-banner';
  banner.innerHTML = `
    <div class="cc-text">
      We use cookies to measure site performance and to power Meta (Facebook/Instagram) advertising. See our <a href="/privacy-policy">Privacy Policy</a>.
    </div>
    <div class="cc-buttons">
      <button class="cc-reject">Reject</button>
      <button class="cc-accept">Accept</button>
    </div>
  `;
  document.body.appendChild(banner);

  // Wire up buttons
  banner.querySelector('.cc-reject').addEventListener('click', function() { setConsent('rejected'); });
  banner.querySelector('.cc-accept').addEventListener('click', function() { setConsent('accepted'); });

  // Check existing consent
  var consent = localStorage.getItem('cookie_consent');
  if (!consent) {
    banner.classList.add('show');
  } else if (consent === 'accepted') {
    loadMetaPixel();
  }

  function setConsent(choice) {
    localStorage.setItem('cookie_consent', choice);
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    banner.classList.remove('show');
    if (choice === 'accepted') loadMetaPixel();
  }

  function loadMetaPixel() {
    if (window.fbq) return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
  }
})();

const LOGO_MAP = {
  // Telecoms
  'orange.png': 'orange.svg',
  'inwi.png': 'inwi.svg',
  
  // Transport & Port
  'markoub.png': 'markoub.svg',
  'portnet.png': 'portnet.png',
  
  // CNSS
  'cnss_aff.png': 'cnss.svg',
  'cnss_ass.png': 'cnss.svg',
  'cnss_tns.png': 'cnss.svg',
  'cnss.png': 'cnss.svg',
  
  // DGI / Impôts / TVA / IR / IS / e-Timbre / Vignette (all use the official DGI logo)
  'dgi.png': 'dgi.svg',
  'etimbre.png': 'dgi.svg',
  'tva.png': 'dgi.svg',
  'ir.png': 'dgi.svg',
  'is.png': 'dgi.svg',
  'vignette.png': 'dgi.svg',
  'tsava.png': 'dgi.svg',
  'taxe.png': 'dgi.svg',
  'impot.png': 'dgi.svg',
  'impots.png': 'dgi.svg',
  
  // Water & Electricity Utilities
  'redal.png': 'redal.svg',
  'amendis.png': 'amendis.svg',
  'amendis_tanger.png': 'amendis.svg',
  'amendis_tetouan.png': 'amendis.svg',
  'onee.png': 'onee.svg',
  'ancfcc.png': 'ancfcc.png',
  'tgr.png': 'tgr.svg',
  'lydec.png': 'lydec.svg',
  'radeec.png': 'srm_casablanca.png',
  'srm.png': 'srm_casablanca.png',
  'radeeta.png': 'radeeta.png',
  'radem.png': 'radeeta.png',
  'srm_rsk_onee.png': 'srm_rsk_onee.png',
  'srm_tta.png': 'srm_tta.png',
  'radeet.png': 'radeet.png',
  'radeel.png': 'radeel.png',
  'radeema.png': 'radeema.png',
  'srm_ms.png': 'srm_ms_radeema.png',
  'srm_ms_radeema.png': 'srm_ms_radeema.png',
  'srm_ms_radees.png': 'srm_ms_radees.png',
  'srm_OREINTAL.png': 'radeeo.png',
  'radeeo.png': 'radeeo.png',
  'ramsa.png': 'ramsa.png',
  'srm_sm.png': 'ramsa.png'
};

function getHighResLogo(imageName, serviceTitle) {
  if (imageName) {
    const cleanName = imageName.toLowerCase().split('?')[0].split('#')[0];
    if (LOGO_MAP[cleanName]) {
      return chrome.runtime.getURL('logos/' + LOGO_MAP[cleanName]);
    }
  }
  if (serviceTitle) {
    const t = serviceTitle.toLowerCase();
    
    // Redal exact match
    if (t.includes('redal') || t.includes('ريضال')) {
      return chrome.runtime.getURL('logos/redal.svg');
    }
    
    // DGI and all Moroccan Tax products (TVA, IR, IS, e-Timbre, Vignette, etc.)
    if (
      t.includes('dgi') ||
      t.includes('tva') ||
      t.includes('timbre') ||
      t.includes('vignette') ||
      t.includes('tsava') ||
      t.includes('impôt') ||
      t.includes('impot') ||
      t.includes('taxe') ||
      t.includes('الضرائب') ||
      /\b(ir|is)\b/i.test(t)
    ) {
      return chrome.runtime.getURL('logos/dgi.svg');
    }

    if (t.includes('orange')) return chrome.runtime.getURL('logos/orange.svg');
    if (t.includes('inwi')) return chrome.runtime.getURL('logos/inwi.svg');
    if (t.includes('cnss')) return chrome.runtime.getURL('logos/cnss.svg');
    if (t.includes('markoub')) return chrome.runtime.getURL('logos/markoub.svg');
    if (t.includes('onee') || t.includes('one')) return chrome.runtime.getURL('logos/onee.svg');
    if (t.includes('portnet')) return chrome.runtime.getURL('logos/portnet.png');
    if (t.includes('ancfcc') || t.includes('conservation')) return chrome.runtime.getURL('logos/ancfcc.png');
    if (t.includes('tgr') || t.includes('trésorerie') || t.includes('tresorerie')) return chrome.runtime.getURL('logos/tgr.svg');
    if (t.includes('lydec')) return chrome.runtime.getURL('logos/lydec.svg');
    if (t.includes('amendis') || t.includes('أمانديس')) return chrome.runtime.getURL('logos/amendis.svg');
    if (t.includes('casablanca') || t.includes('radeec')) return chrome.runtime.getURL('logos/srm_casablanca.png');
    if (t.includes('radem') || t.includes('radeeta') || t.includes('fès') || t.includes('fes')) return chrome.runtime.getURL('logos/radeeta.png');
    if (t.includes('rsk') || t.includes('rabat')) return chrome.runtime.getURL('logos/srm_rsk_onee.png');
    if (t.includes('tta') || t.includes('tanger')) return chrome.runtime.getURL('logos/srm_tta.png');
    if (t.includes('tadla') || t.includes('radeet')) return chrome.runtime.getURL('logos/radeet.png');
    if (t.includes('larache') || t.includes('radeel')) return chrome.runtime.getURL('logos/radeel.png');
    if (t.includes('radeema') || t.includes('marrakech')) return chrome.runtime.getURL('logos/srm_ms_radeema.png');
    if (t.includes('oriental') || t.includes('radeeo') || t.includes('oujda')) return chrome.runtime.getURL('logos/radeeo.png');
    if (t.includes('ramsa') || t.includes('souss') || t.includes('agadir')) return chrome.runtime.getURL('logos/ramsa.png');
  }
  return null;
}

function updateFormHeaderLogo() {
  const caption = document.querySelector('.portlet-title .caption');
  if (!caption) return;
  const captionImg = caption.querySelector('img');
  if (captionImg) {
    let src = captionImg.getAttribute('src') || '';
    let imageName = src.split('/').pop().split('?')[0].split('#')[0];
    const captionText = caption.innerText || '';
    const highRes = getHighResLogo(imageName, captionText);
    if (highRes && captionImg.src !== highRes) {
      captionImg.src = highRes;
    }
  }
}

function injectCustomGrid() {
  // If it already exists, do nothing
  if (document.getElementById('vpos-custom-grid')) return;

  const container = document.querySelector('.page-container');
  if (!container) return;

  // Find all service links from the hidden sidebar
  const serviceLinks = document.querySelectorAll('.page-sidebar-menu .sub-menu .sub-menu .nav-item a');
  
  // If Angular hasn't rendered them yet, try again in 200ms
  if (serviceLinks.length === 0) {
    setTimeout(injectCustomGrid, 200);
    return;
  }

  // Create our perfect custom container
  const gridContainer = document.createElement('div');
  gridContainer.id = 'vpos-custom-grid';
  gridContainer.className = 'vpos-custom-grid';

  // Clone visual data into perfect custom cards
  serviceLinks.forEach(link => {
    const titleEl = link.querySelector('.title');
    const imgEl = link.querySelector('img');
    
    if (!titleEl || !imgEl) return;

    const card = document.createElement('div');
    card.className = 'vpos-card';
    
    const imgWrap = document.createElement('div');
    imgWrap.className = 'vpos-card-img-wrap';

    const img = document.createElement('img');
    let imageName = imgEl.getAttribute('image') || '';
    if (!imageName && imgEl.src) {
      imageName = imgEl.src.split('/').pop();
    }
    imageName = imageName.split('?')[0].split('#')[0];

    const highRes = getHighResLogo(imageName, titleEl.innerText);
    img.src = highRes || imgEl.src;
    img.alt = titleEl.innerText;
    
    const title = document.createElement('div');
    title.className = 'vpos-card-title';
    title.innerText = titleEl.innerText;
    
    imgWrap.appendChild(img);
    card.appendChild(imgWrap);
    card.appendChild(title);
    
    // When our card is clicked, save scroll position and virtually click the original hidden Angular link!
    card.onclick = (e) => {
      e.preventDefault();
      const currentY = window.scrollY || document.documentElement.scrollTop || 0;
      if (currentY > 0) {
        homeScrollY = currentY;
        try { sessionStorage.setItem('vpos_home_scroll', currentY.toString()); } catch (e) {}
      }
      link.click();
      
      // Ensure state updates immediately
      setTimeout(updateLayoutState, 50);
    };
    
    gridContainer.appendChild(card);
  });

  // Inject it into the page layout
  container.insertBefore(gridContainer, container.firstChild);
}

function injectBackButton() {
  const formHeaders = document.querySelectorAll('.portlet-title');
  formHeaders.forEach(formHeader => {
    if (!formHeader.querySelector('.btn-back-home')) {
      const backBtn = document.createElement('a');
      backBtn.className = 'btn red btn-back-home';
      backBtn.innerHTML = '← RETOUR';
      backBtn.style.cursor = 'pointer';
      backBtn.href = '#/admin/home';
      backBtn.onclick = (e) => {
        e.preventDefault();
        currentTab = 'services';
        try { sessionStorage.setItem('vpos_current_tab', 'services'); } catch(e) {}
        window.location.hash = '#/admin/home';
        updateLayoutState();
      };
      
      formHeader.insertBefore(backBtn, formHeader.firstChild);
    }
  });
}

function restructureCheckout() {
  const portlet = document.querySelector('.portlet');
  const titleBox = document.querySelector('.portlet-title');
  
  if (!portlet || !titleBox || document.getElementById('vpos-checkout-footer')) return;

  const titleChildren = Array.from(titleBox.children);
  
  const rightSideElements = titleChildren.filter(el => {
      return !el.classList.contains('caption') && 
             !el.classList.contains('btn-back-home');
  });

  if (rightSideElements.length > 0) {
       const footer = document.createElement('div');
       footer.id = 'vpos-checkout-footer';
       rightSideElements.forEach(el => footer.appendChild(el));
       portlet.appendChild(footer);
  }
}

// Safely replaces text inside text nodes to avoid breaking Angular bindings
function replaceTextInNode(node, searchRegex, replacement) {
  if (node.nodeType === Node.TEXT_NODE) {
      node.nodeValue = node.nodeValue.replace(searchRegex, replacement);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach(child => replaceTextInNode(child, searchRegex, replacement));
  }
}

function fixCheckboxCells() {
  document.querySelectorAll('th').forEach(th => {
      replaceTextInNode(th, /NUM.?RO DE FACTURE/ig, 'N° FACTURE');
      replaceTextInNode(th, /NUM.?RO DE CONTRAT/ig, 'N° CONTRAT');
  });

  // Kill the mt-checkbox margin-bottom that shifts the checkbox up inside the cell
  document.querySelectorAll('th.bs-checkbox .mt-checkbox, td.bs-checkbox .mt-checkbox').forEach(cb => {
      cb.style.marginBottom = '0';
      cb.style.right = 'auto';
  });
}

function fixInputs() {
  // Ensure click on input clear icon reliably clears the input and updates Angular model
  document.querySelectorAll('.input-icon.right > i, .input-icon > i.fa-close, .input-icon > i.fa-times').forEach(icon => {
    if (!icon.dataset.vposBound) {
      icon.dataset.vposBound = 'true';
      icon.addEventListener('click', (e) => {
        const container = icon.closest('.input-icon') || icon.parentElement;
        if (container) {
          const input = container.querySelector('input');
          if (input) {
            input.value = '';
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            input.focus();
          }
        }
      });
    }
  });

  // Ensure select2 containers are forced to 100% width so they never clamp
  document.querySelectorAll('.select2-container').forEach(s2 => {
    if (s2.style.width !== '100%') {
      s2.style.setProperty('width', '100%', 'important');
    }
  });
}

function formatMontantColumn() {
  document.querySelectorAll('table.table').forEach(table => {
    const thead = table.querySelector('thead');
    if (!thead) return;
    const headerRow = thead.querySelector('tr');
    if (!headerRow) return;

    // Collect all th elements
    const ths = Array.from(headerRow.children);
    // Find index of the Montant column
    const montantThIndex = ths.findIndex(th => /MONTANT/i.test(th.textContent));
    if (montantThIndex === -1) return;

    const montantTh = ths[montantThIndex];
    montantTh.classList.add('vpos-col-montant');

    // Find the checkbox th if present
    const checkboxTh = ths.find(th => th.classList.contains('bs-checkbox') || th.querySelector('input[type="checkbox"]'));

    // Move montantTh to be right before checkboxTh (or to the end if no checkbox)
    if (checkboxTh) {
      if (montantTh.nextElementSibling !== checkboxTh) {
        headerRow.insertBefore(montantTh, checkboxTh);
      }
    } else {
      if (headerRow.lastElementChild !== montantTh) {
        headerRow.appendChild(montantTh);
      }
    }

    // Now format and reorder all rows in tbody
    const tbody = table.querySelector('tbody');
    if (!tbody) return;

    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
      const tds = Array.from(row.children);
      if (tds.length === 0) return;

      // Identify Montant td: either already marked, or by DH/currency pattern, or by original index
      let montantTd = row.querySelector('td.vpos-col-montant');
      if (!montantTd) {
        montantTd = tds.find(td => /\bDH\b|[\d,.]+\s*(?:DH|MAD|DHS)/i.test(td.textContent)) || tds[montantThIndex];
      }

      if (!montantTd) return;
      montantTd.classList.add('vpos-col-montant');

      const checkboxTd = tds.find(td => td.classList.contains('bs-checkbox') || td.querySelector('input[type="checkbox"]'));
      if (checkboxTd) {
        if (montantTd.nextElementSibling !== checkboxTd) {
          row.insertBefore(montantTd, checkboxTd);
        }
      } else {
        if (row.lastElementChild !== montantTd) {
          row.appendChild(montantTd);
        }
      }
    });
  });
}

function updateContentVisibility() {
  const table = document.querySelector('table.table');
  const tableResponsive = document.querySelector('.table-responsive');
  const footer = document.getElementById('vpos-checkout-footer') || document.querySelector('.tools');

  if (!table) return;

  const tbody = table.querySelector('tbody');
  const tfoot = table.querySelector('tfoot');
  const hasRows = tbody && tbody.querySelectorAll('tr').length > 0;
  const hasNotFound = tfoot && tfoot.querySelectorAll('tr').length > 0;

  if (tableResponsive) {
    if (!hasRows && !hasNotFound) {
      tableResponsive.style.setProperty('display', 'none', 'important');
    } else {
      tableResponsive.style.removeProperty('display');
    }
  }

  if (footer) {
    if (!hasRows) {
      footer.style.setProperty('display', 'none', 'important');
    } else {
      footer.style.removeProperty('display');
    }
  }
}

function observeAndFormatTable() {
  if (window.vposTableObserver) return;

  // Run immediately on existing DOM
  injectHeaderNav();
  fixCheckboxCells();
  fixInputs();
  formatMontantColumn();
  restructureCheckout();
  updateContentVisibility();

  // Also keep running every 500ms for the first 5 seconds in case Angular renders late
  let retries = 10;
  const retryInterval = setInterval(() => {
    injectHeaderNav();
    fixCheckboxCells();
    fixInputs();
    formatMontantColumn();
    restructureCheckout();
    updateContentVisibility();
    if (--retries <= 0) clearInterval(retryInterval);
  }, 500);
  
  window.vposTableObserver = new MutationObserver(() => {
    injectHeaderNav();
    if (document.body.classList.contains('view-form') || document.body.classList.contains('view-reload') || document.body.classList.contains('view-transaction')) {
      injectBackButton();
    }
    fixCheckboxCells();
    fixInputs();
    formatMontantColumn();
    restructureCheckout();
    updateContentVisibility();
  });
  
  window.vposTableObserver.observe(document.body, { childList: true, subtree: true });
}

let currentTab = sessionStorage.getItem('vpos_current_tab') || 'services';
let homeScrollY = parseInt(sessionStorage.getItem('vpos_home_scroll') || '0', 10) || 0;
let isRestoringScroll = false;
let restoreInterval = null;

// Ensure page-patch is loaded in the webpage context to block Metronic auto-scroll
function ensurePagePatchInjected() {
  if (document.getElementById('vpos-injected-patch')) return;
  const script = document.createElement('script');
  script.id = 'vpos-injected-patch';
  script.src = chrome.runtime.getURL('page-patch.js');
  (document.head || document.documentElement).appendChild(script);
}
try { ensurePagePatchInjected(); } catch (e) {}

// Continuously track scroll position on the home services grid
function saveHomeScroll() {
  if (isRestoringScroll) return; // Do NOT record during restoration transition
  const isServices = document.body.classList.contains('view-services') ||
    (document.body.classList.contains('view-home') && !document.body.classList.contains('view-downloads') && !document.body.classList.contains('view-form'));
  if (isServices) {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    if (y > 0) {
      homeScrollY = y;
      try {
        sessionStorage.setItem('vpos_home_scroll', y.toString());
      } catch (e) {}
    }
  }
}

window.addEventListener('scroll', saveHomeScroll, { passive: true });

function restoreHomeScroll() {
  const saved = sessionStorage.getItem('vpos_home_scroll');
  const targetY = saved ? parseInt(saved, 10) : homeScrollY;

  if (!targetY || isNaN(targetY) || targetY <= 0) return;

  isRestoringScroll = true;
  if (restoreInterval) clearInterval(restoreInterval);

  try {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  } catch (e) {}

  const startTime = Date.now();
  const maxDuration = 1800; // Hold restoration across Metronic's 1000ms delay & jQuery animations

  function doScroll() {
    const isServices = document.body.classList.contains('view-services') ||
      (document.body.classList.contains('view-home') && !document.body.classList.contains('view-downloads') && !document.body.classList.contains('view-form'));
    
    if (!isServices) {
      isRestoringScroll = false;
      if (restoreInterval) clearInterval(restoreInterval);
      return;
    }

    const currentY = window.scrollY || document.documentElement.scrollTop || 0;
    if (Math.abs(currentY - targetY) > 5) {
      window.scrollTo(0, targetY);
      if (document.documentElement) document.documentElement.scrollTop = targetY;
      if (document.body) document.body.scrollTop = targetY;
    }

    if (Date.now() - startTime > maxDuration) {
      isRestoringScroll = false;
      if (restoreInterval) clearInterval(restoreInterval);
    }
  }

  // Cancel immediately if the user intentionally scrolls
  const cancel = () => {
    isRestoringScroll = false;
    if (restoreInterval) clearInterval(restoreInterval);
    window.removeEventListener('wheel', cancel);
    window.removeEventListener('touchstart', cancel);
    window.removeEventListener('keydown', cancel);
  };

  window.addEventListener('wheel', cancel, { passive: true, once: true });
  window.addEventListener('touchstart', cancel, { passive: true, once: true });
  window.addEventListener('keydown', cancel, { passive: true, once: true });

  doScroll();
  restoreInterval = setInterval(doScroll, 40);
}

function injectHeaderNav() {
  const headerInner = document.querySelector('.page-header-inner');
  if (!headerInner || document.getElementById('vpos-nav-tabs')) return;

  const nav = document.createElement('div');
  nav.id = 'vpos-nav-tabs';
  nav.className = 'vpos-nav-tabs';
  nav.innerHTML = `
    <button type="button" class="vpos-nav-btn ${currentTab === 'services' ? 'active' : ''}" id="vpos-tab-services">Services</button>
    <button type="button" class="vpos-nav-btn ${currentTab === 'downloads' ? 'active' : ''}" id="vpos-tab-downloads">Téléchargements</button>
  `;

  const pageLogo = headerInner.querySelector('.page-logo');
  if (pageLogo && pageLogo.nextSibling) {
    headerInner.insertBefore(nav, pageLogo.nextSibling);
  } else {
    headerInner.appendChild(nav);
  }

  nav.querySelector('#vpos-tab-services').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentTab === 'services' && !window.location.hash.includes('/admin/product/')) {
      // If already on services view and user clicks Services tab, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      homeScrollY = 0;
      try { sessionStorage.removeItem('vpos_home_scroll'); } catch(e) {}
    } else {
      switchTab('services');
    }
  });

  nav.querySelector('#vpos-tab-downloads').addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('downloads');
  });
}

function switchTab(tab) {
  currentTab = tab;
  try { sessionStorage.setItem('vpos_current_tab', tab); } catch(e) {}

  if (window.location.hash.includes('/admin/product/') || window.location.hash.includes('/admin/reload') || window.location.hash.includes('/admin/transaction')) {
    window.location.hash = '#/admin/home';
  }

  updateLayoutState();
}

function updateLayoutState() {
  const hash = window.location.hash || '';
  
  injectHeaderNav();
  injectCustomGrid();
  
  const tabServices = document.getElementById('vpos-tab-services');
  const tabDownloads = document.getElementById('vpos-tab-downloads');
  
  if (hash.includes('/admin/product/')) {
    document.body.classList.remove('view-home', 'view-downloads', 'view-services', 'view-reload', 'view-transaction');
    document.body.classList.add('view-form');
    if (tabServices) tabServices.classList.remove('active');
    if (tabDownloads) tabDownloads.classList.remove('active');
    
    setTimeout(() => {
      injectBackButton();
      restructureCheckout();
      updateFormHeaderLogo();
    }, 200);
    setTimeout(updateFormHeaderLogo, 600);
    
    observeAndFormatTable();
  } else if (hash.includes('/admin/reload')) {
    // "Commander une recharge" view!
    document.body.classList.remove('view-home', 'view-downloads', 'view-services', 'view-form', 'view-transaction');
    document.body.classList.add('view-reload');
    if (tabServices) tabServices.classList.remove('active');
    if (tabDownloads) tabDownloads.classList.remove('active');

    setTimeout(injectBackButton, 150);
    setTimeout(injectBackButton, 500);
  } else if (hash.includes('/admin/transaction')) {
    // "Historique" view!
    document.body.classList.remove('view-home', 'view-downloads', 'view-services', 'view-form', 'view-reload');
    document.body.classList.add('view-transaction');
    if (tabServices) tabServices.classList.remove('active');
    if (tabDownloads) tabDownloads.classList.remove('active');

    setTimeout(injectBackButton, 150);
    setTimeout(injectBackButton, 500);
  } else {
    // We are on home / admin.home
    document.body.classList.remove('view-form', 'view-reload', 'view-transaction');
    document.body.classList.add('view-home');
    
    // If URL contains download, switch to downloads tab
    if (hash.includes('download')) {
      currentTab = 'downloads';
    }

    if (currentTab === 'downloads') {
      document.body.classList.add('view-downloads');
      document.body.classList.remove('view-services');
      if (tabDownloads) tabDownloads.classList.add('active');
      if (tabServices) tabServices.classList.remove('active');
    } else {
      document.body.classList.add('view-services');
      document.body.classList.remove('view-downloads');
      if (tabServices) tabServices.classList.add('active');
      if (tabDownloads) tabDownloads.classList.remove('active');
      // Restore scroll position on the home grid
      restoreHomeScroll();
    }
  }
}

// Listen for standard hash changes
window.addEventListener('hashchange', updateLayoutState);

// Run on initial load
setTimeout(updateLayoutState, 500);

// Fallback observer
let lastHash = window.location.hash;
setInterval(() => {
  if (window.location.hash !== lastHash) {
    lastHash = window.location.hash;
    updateLayoutState();
  }
}, 300);

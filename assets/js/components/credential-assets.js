/* Credential media: use original local files when present; never display broken images.
   Deliberately do not synthesize, replace, or misrepresent certificates or awards. */
(() => {
  'use strict';
  const selector = '.hc-document img, .credential-picture img';
  function fallback(img) {
    const parent = img.parentElement;
    if (!parent || parent.classList.contains('credential-missing')) return;
    const card = img.closest('.hc-card, .credential-card');
    const name = card?.querySelector('h3, h4')?.textContent?.trim() || 'Credential';
    const block = document.createElement('div');
    block.className = 'credential-unavailable';
    block.setAttribute('role', 'status');
    const symbol = document.createElementNS('http://www.w3.org/2000/svg','svg');
    symbol.setAttribute('viewBox','0 0 24 24');
    symbol.setAttribute('fill','none');
    symbol.setAttribute('stroke','currentColor');
    symbol.setAttribute('stroke-width','1.3');
    symbol.setAttribute('stroke-linecap','round');
    symbol.setAttribute('stroke-linejoin','round');
    symbol.setAttribute('aria-hidden','true');
    for (const path of ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6','M8 13h8','M8 17h5']) {
      const el=document.createElementNS('http://www.w3.org/2000/svg','path');
      el.setAttribute('d',path); symbol.appendChild(el);
    }
    const title=document.createElement('strong');
    title.textContent=name;
    const status=document.createElement('span');
    status.textContent='Original document image unavailable. No substitute image has been used.';
    block.append(symbol,title,status);
    img.replaceWith(block);
    parent.classList.add('credential-missing');
    parent.removeAttribute('href');
    parent.removeAttribute('target');
    parent.removeAttribute('rel');
    parent.removeAttribute('tabindex');
    parent.setAttribute('role','group');
    parent.setAttribute('aria-label', name + ': original document image currently unavailable');
  }
  function init(){
    document.querySelectorAll(selector).forEach(img=>{
      img.addEventListener('error',()=>fallback(img),{once:true});
      if(img.complete && img.naturalWidth===0) fallback(img);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();


/* PDF.js first-page previews (progressive enhancement).
   The native browser <object> previews remain in place if the CDN or rendering fails.
   Source PDFs remain original and clickable; no synthetic certificate images. */
(() => {
  'use strict';
  const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs';
  const WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';
  let pdfjsPromise = null;

  function getPdfjs() {
    if (!pdfjsPromise) {
      pdfjsPromise = import(PDFJS).then(mod => {
        mod.GlobalWorkerOptions.workerSrc = WORKER;
        return mod;
      });
    }
    return pdfjsPromise;
  }

  async function renderPreview(element) {
    const src = element.dataset.pdfSource;
    if (!src || !element.isConnected) return;
    const bounds = element.getBoundingClientRect();
    // Hidden sections and off-screen cards are handled when made visible.
    if (bounds.width < 80 || bounds.height < 80) return;
    try {
      const pdfjs = await getPdfjs();
      const pdf = await pdfjs.getDocument({url:src}).promise;
      const page = await pdf.getPage(1);
      const size = page.getViewport({scale:1});
      const cssScale = Math.min((bounds.width - 8) / size.width, (bounds.height - 8) / size.height);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = page.getViewport({scale:Math.max(0.1,cssScale) * pixelRatio});
      const canvas = document.createElement('canvas');
      canvas.className = 'credential-pdf-canvas';
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      canvas.style.width = (viewport.width / pixelRatio) + 'px';
      canvas.style.height = (viewport.height / pixelRatio) + 'px';
      canvas.setAttribute('role','img');
      canvas.setAttribute('aria-label',element.getAttribute('aria-label') || 'Certificate preview');
      const context = canvas.getContext('2d',{alpha:false});
      if (!context) return;
      await page.render({canvasContext:context,viewport}).promise;
      if (element.isConnected) element.replaceWith(canvas);
    } catch (error) {
      // Keep the native PDF object preview. The original PDF link remains usable.
      console.warn('Credential PDF preview: native fallback retained',error);
    }
  }

  function init() {
    const elements = document.querySelectorAll('.credential-pdf-preview[data-pdf-source]');
    if (!elements.length) return;
    if (!('IntersectionObserver' in window)) {
      elements.forEach(renderPreview);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          renderPreview(entry.target);
        }
      }
    },{rootMargin:'120px'});
    elements.forEach(el => observer.observe(el));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();

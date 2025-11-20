(function () {
  function ensureModal() {
    let overlay = document.querySelector('.arch-modal-overlay');
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.className = 'arch-modal-overlay';
    overlay.innerHTML = [
      '<div class="arch-modal" role="dialog" aria-modal="true" aria-labelledby="arch-modal-title">',
      '  <div class="arch-modal-header">',
      '    <h4 id="arch-modal-title" class="arch-modal-title"></h4>',
      '    <button class="arch-modal-close" aria-label="Close">×</button>',
      '  </div>',
      '  <div class="arch-modal-content"></div>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);
    return overlay;
  }

  function openModal(title, content) {
    const overlay = ensureModal();
    overlay.querySelector('.arch-modal-title').textContent = title || 'Details';
    overlay.querySelector('.arch-modal-content').innerHTML = content || '';
    overlay.classList.add('active');
    overlay.style.display = 'flex';
  }

  function closeModal() {
    const overlay = document.querySelector('.arch-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      overlay.style.display = 'none';
    }
  }

  async function resolveContent(target) {
    const title = target.getAttribute('data-title') || inferTitle(target) || 'Details';

    // 1) From selector target (template/div)
    const selector = target.getAttribute('data-info-target');
    if (selector) {
      const el = document.querySelector(selector);
      if (el) {
        if (el.tagName.toLowerCase() === 'template') {
          return { title, content: el.innerHTML || el.content?.firstElementChild?.outerHTML || '' };
        }
        return { title, content: el.innerHTML };
      }
    }

    // 2) From external URL
    const url = target.getAttribute('data-info-url');
    if (url) {
      try {
        const res = await fetch(url, { credentials: 'same-origin' });
        const html = await res.text();
        return { title, content: html };
      } catch (e) {
        return { title, content: 'Failed to load content from URL.' };
      }
    }

    // 3) Inline HTML in attribute
    const info = target.getAttribute('data-info');
    if (info) return { title, content: info };

    // Default fallback
    return { title, content: 'Additional information is not provided. Add data-info, data-info-target, or data-info-url to customize this popup.' };
  }

  function inferTitle(target) {
    // For icon-box inside component → take sibling span text
    const component = target.closest('.component');
    if (component) {
      const span = component.querySelector('span');
      if (span && span.textContent) return span.textContent.trim();
    }
    // For flow-container → use its label
    const flow = target.closest('.flow-container');
    if (flow) {
      const label = flow.querySelector('.flow-label');
      if (label && label.textContent) return label.textContent.trim();
    }
    return null;
  }

  async function handleClick(e) {
    const iconBox = e.target.closest('.icon-box');
    const flow = e.target.closest('.flow-container');
    const target = iconBox || flow;
    if (!target) return;
    const { title, content } = await resolveContent(target);
    openModal(title, content);
  }

  function handleOverlayClick(e) {
    const overlay = e.currentTarget;
    const isCloseButton = e.target.closest('.arch-modal-close');
    const clickedOutside = e.target === overlay;
    if (isCloseButton || clickedOutside) closeModal();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') closeModal();
  }

  // Initialize
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', onKeyDown);
  // Delegate close clicks to overlay once it exists
  const overlay = ensureModal();
  overlay.addEventListener('click', handleOverlayClick);
})();



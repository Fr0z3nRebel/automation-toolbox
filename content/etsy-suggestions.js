// Storage key shared with sidepanel Search Suggester
const SEARCH_SUGGESTER_SAVED_KEY = 'searchSuggesterSavedKeywords';

// Inject "Save" buttons next to Etsy search suggestion items and persist to extension storage
function injectSaveButtonsIntoSuggestions() {
  // Suggestions dropdown: header search form ul with li items; text in strong/span (e.g. .../ul/li/.../strong/span)
  const uls = document.querySelectorAll('header form ul');
  uls.forEach((ul) => {
    const lis = ul.querySelectorAll(':scope > li');
    lis.forEach((li) => {
      if (li.hasAttribute('data-automation-save-injected')) return;
      const strong = li.querySelector('strong');
      // Use full text of strong (all words); strong may contain multiple spans
      const keyword = strong ? (strong.textContent || '').replace(/\s+/g, ' ').trim() : '';
      if (!keyword) return;
      li.setAttribute('data-automation-save-injected', '1');
      const wrapper = document.createElement('span');
      wrapper.className = 'automation-toolbox-suggestion-save-wrap';
      wrapper.style.cssText = 'display:inline-flex;align-items:center;margin-right:8px;flex-shrink:0;';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'automation-toolbox-save-suggestion';
      btn.textContent = 'Save';
      btn.title = 'Save to Search Suggester (Automation Toolbox)';
      btn.style.cssText = 'font-size:11px;padding:2px 6px;cursor:pointer;background:#0a7c42;color:#fff;border:none;border-radius:4px;white-space:nowrap;';
      function saveKeyword(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        chrome.storage.local.get(SEARCH_SUGGESTER_SAVED_KEY, (result) => {
          const list = Array.isArray(result[SEARCH_SUGGESTER_SAVED_KEY]) ? result[SEARCH_SUGGESTER_SAVED_KEY] : [];
          if (list.includes(keyword)) {
            btn.textContent = 'Saved';
            return;
          }
          list.push(keyword);
          chrome.storage.local.set({ [SEARCH_SUGGESTER_SAVED_KEY]: list }, () => {
            const orig = btn.textContent;
            btn.textContent = 'Saved';
            btn.style.background = '#555';
            setTimeout(() => {
              btn.textContent = orig;
              btn.style.background = '#0a7c42';
            }, 1500);
          });
        });
        return false;
      }
      // Prevent input blur so the suggestions dropdown stays open
      btn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }, true);
      btn.addEventListener('click', saveKeyword, true);
      wrapper.appendChild(btn);
      if (!li.querySelector('.automation-toolbox-suggestion-save-wrap')) {
        li.insertBefore(wrapper, li.firstChild);
      }
    });
  });
}

function observeEtsySearchSuggestions() {
  const observer = new MutationObserver(() => injectSaveButtonsIntoSuggestions());
  observer.observe(document.body, { childList: true, subtree: true });
  injectSaveButtonsIntoSuggestions();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observeEtsySearchSuggestions);
} else {
  observeEtsySearchSuggestions();
}

// Runs on Etsy pages. Listens for result from MAIN-world fetch (page context = full Etsy response).
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'expect-etsy-result') {
    const requestId = message.requestId;
    const handler = (event) => {
      if (event.data?.type !== 'etsy-suggestions-result') return;
      window.removeEventListener('message', handler);
      const payload = event.data.payload || {};
      chrome.runtime.sendMessage({
        type: 'etsy-suggestions-result',
        requestId,
        ok: payload.ok !== false,
        data: payload.data,
        error: payload.error,
        debug: payload.debug || {}
      });
    };
    window.addEventListener('message', handler);
    sendResponse({ ready: true });
    return false;
  }
  if (message.action === 'fetch-etsy-suggestions-page') {
    const query = (message.query || '').trim().replace(/\s+/g, '+');
    const url = `https://www.etsy.com/suggestions_ajax.php?search_query=${encodeURIComponent(query).replace(/%20/g, '+')}`;
    fetch(url)
      .then((res) => res.text())
      .then((rawText) => {
        try {
          const data = JSON.parse(rawText);
          const rawResults = data.results || [];
          sendResponse({
            ok: true,
            data,
            debug: {
              statusCode: 200,
              rawResultCount: rawResults.length,
              rawQuerySamples: rawResults.slice(0, 5).map((r) => (r && r.query != null ? String(r.query) : String(r)))
            }
          });
        } catch (e) {
          sendResponse({
            ok: false,
            error: e.message,
            debug: { rawPreview: rawText.slice(0, 300) }
          });
        }
      })
      .catch((err) => {
        sendResponse({ ok: false, error: err.message, debug: { fetchError: err.message } });
      });
    return true;
  }
});

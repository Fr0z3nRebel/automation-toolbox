// Background service worker for Automation Toolbox extension

// Open side panel when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  // Extension installed or updated
});

// Etsy suggestions: fetch in background (correct URL format: search_query=word+word)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetch-etsy-suggestions') {
    const requestId = message.requestId;
    const query = message.query || '';
    const forward = (payload) => {
      chrome.runtime.sendMessage({
        type: 'etsy-suggestions-result',
        requestId,
        ...payload
      });
    };
    const searchParam = (query || '').trim().replace(/\s+/g, '+');
    const url = 'https://www.etsy.com/suggestions_ajax.php?search_query=' + encodeURIComponent(searchParam).replace(/%2B/g, '+');
    fetch(url)
      .then((res) => res.text())
      .then((rawText) => {
        try {
          const data = JSON.parse(rawText);
          const raw = data.results || [];
          forward({
            ok: true,
            data,
            debug: {
              statusCode: 200,
              rawResultCount: raw.length,
              rawQuerySamples: raw.slice(0, 5).map((r) => (r && r.query != null ? String(r.query) : String(r)))
            }
          });
        } catch (e) {
          forward({
            ok: false,
            error: e.message,
            debug: { rawPreview: rawText.slice(0, 300) }
          });
        }
      })
      .catch((err) => {
        forward({ ok: false, error: err.message, debug: {} });
      });
    sendResponse({ sent: true });
    return false;
  }
  return true;
});

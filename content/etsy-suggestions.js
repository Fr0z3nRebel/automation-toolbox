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

// Background service worker for Automation Toolbox extension

// Open side panel when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  // Extension installed or updated
});

// Message passing between side panel and content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Messages are handled directly between side panel and content script
  // This is here for any future background processing needs
  return true;
});

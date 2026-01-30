// Content script for automating Artistly AI Illustrator

// Prevent double injection
if (window.artislyAutomationLoaded) {
  // Content script already loaded
} else {
  window.artislyAutomationLoaded = true;

let stopRequested = false;

// Listen for messages from side panel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'ping') {
    sendResponse({ success: true });
  } else if (message.action === 'check-page-ready') {
    const ready = checkPageReady();
    sendResponse({ ready: ready });
  } else if (message.action === 'process-prompt') {
    stopRequested = false;
    processPrompt(message.style, message.prompt, message.promptNumber, message.totalPrompts)
      .then(() => {
        sendResponse({ success: true });
      })
      .catch((error) => {
        if (!stopRequested) {
          chrome.runtime.sendMessage({
            action: 'automation-error',
            error: error.message || 'An error occurred processing the prompt'
          });
        }
        sendResponse({ success: false, error: error.message });
      });
  } else if (message.action === 'stop-automation') {
    stopRequested = true;
    sendResponse({ success: true });
  }
  return true; // Keep channel open for async response
});

function checkPageReady() {
  // Check if page has finished loading
  if (document.readyState !== 'complete') {
    return false;
  }

  // Check if style image is present and visible (textarea appears after clicking style)
  const styleImage = findStyleImage('Watercolor Style') || findStyleImage('Watercolor-Inspired Digital Style');
  
  if (!styleImage || !isElementVisible(styleImage)) {
    return false;
  }

  // Check network activity - wait for all resources to finish loading
  if (window.performance && window.performance.getEntriesByType) {
    const networkEntries = window.performance.getEntriesByType('resource');
    const now = performance.now();
    
    // Check if any resources are still loading (no responseEnd means still loading)
    const stillLoading = networkEntries.some(entry => {
      // If entry doesn't have responseEnd, it might still be loading
      // Also check if it finished very recently (within last 500ms)
      if (!entry.responseEnd || entry.responseEnd === 0) {
        return true;
      }
      // Check if resource finished very recently (might indicate ongoing loading)
      const timeSinceLoad = now - entry.responseEnd;
      return timeSinceLoad < 500;
    });
    
    if (stillLoading) {
      return false;
    }
  }

  // Additional check: wait for navigation timing to be complete
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const loadComplete = timing.loadEventEnd;
    if (loadComplete === 0) {
      return false; // Load event hasn't fired yet
    }
  }

  return true;
}

async function processPrompt(style, prompt, promptNumber, totalPrompts) {
  try {
    // Check if stopped
    if (stopRequested) {
      throw new Error('Automation stopped by user');
    }

    // Ensure we're on the correct page
    if (!window.location.href.includes('app.artistly.ai/ai/ai-illustrator')) {
      window.location.href = 'https://app.artistly.ai/ai/ai-illustrator';
      await waitForPageLoad();
    }

    // Check if stopped
    if (stopRequested) {
      throw new Error('Automation stopped by user');
    }

    // Wait for page to be ready (just need style image, textarea appears after clicking)
    await waitForPageReady();
    
    // Check if stopped during wait
    if (stopRequested) {
      throw new Error('Automation stopped by user');
    }

    // Click on the style image first (this makes the textarea appear)
    if (stopRequested) throw new Error('Automation stopped by user');
    await clickStyleImage(style);

    // Wait for textarea to appear after clicking style
    await waitForTextarea();

    // Small wait after style selection and textarea appears
    await sleep(500);
    if (stopRequested) throw new Error('Automation stopped by user');

    // Enter prompt
    await enterPrompt(prompt);
    if (stopRequested) throw new Error('Automation stopped by user');

    // Small wait after entering prompt
    await sleep(500);
    if (stopRequested) throw new Error('Automation stopped by user');

    // Wait for generate button to be ready
    await waitForGenerateButton();

    // Click generate button
    await clickGenerateButton();
    if (stopRequested) throw new Error('Automation stopped by user');

    // Send completion message
    chrome.runtime.sendMessage({
      action: 'prompt-complete',
      promptNumber: promptNumber
    });

  } catch (error) {
    throw error;
  }
}

async function waitForPageLoad() {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve, { once: true });
    }
  });
}

async function waitForPageReady() {
  // Wait for the page to be fully loaded and interactive
  // Only need style image - textarea appears after clicking style
  let attempts = 0;
  const maxAttempts = 150; // 15 seconds max wait
  let stableCount = 0;
  const requiredStableChecks = 3; // Need 3 consecutive stable checks
  
  while (attempts < maxAttempts) {
    if (stopRequested) {
      throw new Error('Automation stopped by user');
    }

    // Check if page is ready (just style image needed)
    if (checkPageReady()) {
      stableCount++;
        if (stableCount >= requiredStableChecks) {
          return;
        }
    } else {
      stableCount = 0; // Reset if not ready
    }
    
    await sleep(100);
    attempts++;
  }
  
  // If we get here, some elements might be missing, but try to continue anyway
}

async function waitForTextarea() {
  // Wait for textarea to appear after style is clicked
  let attempts = 0;
  const maxAttempts = 100; // 10 seconds max wait
  
  while (attempts < maxAttempts) {
    if (stopRequested) {
      throw new Error('Automation stopped by user');
    }

    const textarea = findTextarea();
    if (textarea && isElementVisible(textarea)) {
      return;
    }
    
    await sleep(100);
    attempts++;
  }
  
  throw new Error('Textarea did not appear after clicking style image');
}

async function waitForGenerateButton() {
  // Wait for generate button to be ready
  let attempts = 0;
  const maxAttempts = 50; // 5 seconds max wait
  
  while (attempts < maxAttempts) {
    if (stopRequested) {
      throw new Error('Automation stopped by user');
    }

    const button = findGenerateButton();
    if (button && isElementVisible(button) && !button.disabled) {
      return;
    }
    
    await sleep(100);
    attempts++;
  }
}

function isElementVisible(element) {
  if (!element) return false;
  
  const style = window.getComputedStyle(element);
  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
    return false;
  }
  
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function findTextarea() {
  // Try multiple strategies to find the textarea
  const textareas = document.querySelectorAll('textarea');
  
  // Strategy 1: Check placeholder text
  for (const textarea of textareas) {
    if (textarea.placeholder) {
      const placeholder = textarea.placeholder.toLowerCase();
      if (placeholder.includes('enter prompt') || 
          placeholder.includes('prompt') ||
          placeholder.includes('describe')) {
        return textarea;
      }
    }
  }
  
  // Strategy 2: Check aria-label
  for (const textarea of textareas) {
    if (textarea.getAttribute('aria-label')) {
      const ariaLabel = textarea.getAttribute('aria-label').toLowerCase();
      if (ariaLabel.includes('prompt') || ariaLabel.includes('description')) {
        return textarea;
      }
    }
  }
  
  // Strategy 3: Check name attribute
  for (const textarea of textareas) {
    if (textarea.name) {
      const name = textarea.name.toLowerCase();
      if (name.includes('prompt') || name.includes('description')) {
        return textarea;
      }
    }
  }
  
  // Strategy 4: Check id attribute
  for (const textarea of textareas) {
    if (textarea.id) {
      const id = textarea.id.toLowerCase();
      if (id.includes('prompt') || id.includes('description') || id.includes('input')) {
        return textarea;
      }
    }
  }
  
  // Strategy 5: If only one textarea, use it
  if (textareas.length === 1) {
    return textareas[0];
  }
  
  // Strategy 6: Check for visible textarea (fallback)
  for (const textarea of textareas) {
    if (isElementVisible(textarea)) {
      return textarea;
    }
  }
  
  return null;
}

function findStyleImage(styleAltText) {
  const images = document.querySelectorAll('img');
  for (const img of images) {
    if (img.alt && img.alt.trim() === styleAltText) {
      return img;
    }
  }
  return null;
}

function findGenerateButton() {
  const buttons = document.querySelectorAll('button');
  for (const button of buttons) {
    const text = button.textContent || button.innerText;
    if (text.trim().toLowerCase().includes('generate image')) {
      return button;
    }
  }
  return null;
}

async function clickStyleImage(style) {
  const maxAttempts = 30;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const img = findStyleImage(style);
    if (img) {
      // Scroll into view
      img.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await sleep(500);
      
      // Click the image
      img.click();
      await sleep(1000); // Wait for style to be selected
      return;
    }
    await sleep(200);
    attempts++;
  }

  throw new Error(`Could not find style image with alt text: "${style}"`);
}

async function enterPrompt(prompt) {
  const maxAttempts = 30;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const textarea = findTextarea();
    if (textarea) {
      // Clear existing content
      textarea.value = '';
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      
      // Enter new prompt
      textarea.value = prompt;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.dispatchEvent(new Event('change', { bubbles: true }));
      
      // Focus the textarea
      textarea.focus();
      
      await sleep(500);
      return;
    }
    await sleep(200);
    attempts++;
  }

  throw new Error('Could not find textarea with placeholder "Enter prompt here"');
}

async function clickGenerateButton() {
  const maxAttempts = 30;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const button = findGenerateButton();
    if (button) {
      // Check if button is disabled
      if (button.disabled) {
        await sleep(500);
        attempts++;
        continue;
      }

      // Scroll into view
      button.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await sleep(500);
      
      // Click the button
      button.click();
      await sleep(1000); // Wait for generation to start
      return;
    }
    await sleep(200);
    attempts++;
  }

  throw new Error('Could not find "Generate Image" button');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Quick Navigation: click tool on ai-design-assistants or kids-puzzles page
const quickNavPaths = ['ai-design-assistants', 'kids-puzzles'];
const onQuickNavPage = quickNavPaths.some(p => window.location.pathname.includes(p));
if (onQuickNavPage) {
  console.log('[Automation Toolbox] Quick Nav page detected:', window.location.pathname, 'readyState:', document.readyState, 'body:', !!document.body);
  chrome.storage.local.get('quickNavToolToClick', (data) => {
    if (data.quickNavToolToClick) {
      const toolName = data.quickNavToolToClick;
      console.log('[Automation Toolbox] Quick Nav tool to click:', toolName);
      chrome.storage.local.remove('quickNavToolToClick');
      waitAndClickToolByName(toolName);
    } else {
      console.log('[Automation Toolbox] No quickNavToolToClick in storage');
    }
  });
}

function normalizeText(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/\s+/g, ' ').trim();
}

function findDivContainingText(text) {
  const normalizedSearch = normalizeText(text);
  if (!document.body) {
    console.log('[Automation Toolbox] findDivContainingText: document.body is null');
    return null;
  }
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    null,
    false
  );
  let node;
  let divCount = 0;
  const divsWithExactText = [];
  while ((node = walker.nextNode())) {
    if (node.tagName !== 'DIV') continue;
    divCount++;
    const nodeText = normalizeText(node.textContent);
    if (nodeText === normalizedSearch) {
      divsWithExactText.push(node);
    }
  }
  console.log('[Automation Toolbox] findDivContainingText: checked', divCount, 'divs, exact matches:', divsWithExactText.length, 'for', JSON.stringify(normalizedSearch));
  if (divsWithExactText.length > 0) {
    const insideButton = divsWithExactText.filter(d => d.closest('button'));
    const pool = insideButton.length > 0 ? insideButton : divsWithExactText;
    const innermost = pool.find(d => !pool.some(other => other !== d && other.contains(d)));
    const chosen = innermost || pool[0];
    console.log('[Automation Toolbox] findDivContainingText: using', insideButton.length > 0 ? 'div inside button' : 'div', ', innermost of', pool.length);
    return chosen;
  }
  const divsContainingText = [];
  walker.currentNode = document.body;
  while ((node = walker.nextNode())) {
    if (node.tagName !== 'DIV') continue;
    const nodeText = normalizeText(node.textContent);
    if (nodeText.includes(normalizedSearch) || normalizedSearch.includes(nodeText)) {
      divsContainingText.push(node);
    }
  }
  if (divsContainingText.length > 0) {
    console.log('[Automation Toolbox] findDivContainingText: found', divsContainingText.length, 'div(s) containing text');
  }
  return divsContainingText[0] || null;
}

function findElementByExactText(text) {
  const normalizedSearch = normalizeText(text);
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    null,
    false
  );
  let node;
  while ((node = walker.nextNode())) {
    if (node.textContent && normalizeText(node.textContent) === normalizedSearch) {
      return node;
    }
  }
  return null;
}

function clickElement(el) {
  if (!el) {
    console.log('[Automation Toolbox] clickElement: no element');
    return;
  }
  console.log('[Automation Toolbox] clickElement: clicking', el.tagName, el.className || '(no class)', 'text:', el.textContent?.slice(0, 50));
  el.scrollIntoView({ behavior: 'instant', block: 'center' });
  const rect = el.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const common = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y };
  el.focus?.();
  el.dispatchEvent(new PointerEvent('pointerdown', { ...common, pointerType: 'mouse' }));
  el.dispatchEvent(new PointerEvent('pointerup', { ...common, pointerType: 'mouse' }));
  el.dispatchEvent(new MouseEvent('mousedown', common));
  el.dispatchEvent(new MouseEvent('mouseup', common));
  el.dispatchEvent(new MouseEvent('click', common));
  if (el.click) el.click();
}

function waitAndClickToolByName(toolName) {
  const maxAttempts = 150;
  let attempts = 0;
  console.log('[Automation Toolbox] waitAndClickToolByName: starting for', JSON.stringify(toolName), 'readyState:', document.readyState, 'body children:', document.body?.childElementCount ?? 'no body');

  function tryClick() {
    attempts++;
    if (!document.body) {
      console.log('[Automation Toolbox] tryClick attempt', attempts, ': document.body is null');
      if (attempts < maxAttempts) setTimeout(tryClick, 200);
      return;
    }
    const bodyChildren = document.body.childElementCount;
    let div = findDivContainingText(toolName);
    if (!div) {
      const el = findElementByExactText(toolName);
      if (el) {
        div = el.tagName === 'DIV' ? el : el.closest('div');
        console.log('[Automation Toolbox] tryClick attempt', attempts, ': found via findElementByExactText, div:', !!div);
      }
    } else {
      console.log('[Automation Toolbox] tryClick attempt', attempts, ': found div via findDivContainingText');
    }
    if (div) {
      const button = div.closest('button') || div.closest('[role="button"]');
      const target = button || div;
      console.log('[Automation Toolbox] tryClick: target found,', button ? 'clicking button/role=button ancestor' : 'clicking div', ', scheduling click in 600ms');
      setTimeout(() => clickElement(target), 600);
      return;
    }
    if (attempts <= 3 || attempts % 25 === 0) {
      console.log('[Automation Toolbox] tryClick attempt', attempts, ': no match yet, body children:', bodyChildren);
    }
    if (attempts < maxAttempts) {
      setTimeout(tryClick, 200);
    } else {
      console.log('[Automation Toolbox] tryClick: gave up after', maxAttempts, 'attempts');
    }
  }

  if (document.readyState === 'complete') {
    console.log('[Automation Toolbox] DOM already complete, starting tryClick');
    tryClick();
  } else {
    console.log('[Automation Toolbox] Waiting for load event, readyState:', document.readyState);
    window.addEventListener('load', () => {
      console.log('[Automation Toolbox] Load event fired, starting tryClick');
      tryClick();
    });
  }
}

} // End of window.artislyAutomationLoaded check

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

} // End of window.artislyAutomationLoaded check

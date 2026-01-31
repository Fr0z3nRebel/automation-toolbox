// Quick Navigation: nav-only (just navigate, no click on page)
const navOnlyTools = [
  { name: 'Advanced AI Image Designer', url: 'https://editor.artistly.ai/', badge: 'Artistly' },
  { name: 'AI Art Illustrator', url: 'https://app.artistly.ai/ai/ai-illustrator', badge: 'Artistly' },
  { name: 'AI Bulk Actions', url: 'https://app.artistly.ai/ai/ai-workflow', badge: 'Artistly' },
  { name: 'Community Designs', url: 'https://app.artistly.ai/community-designs', badge: 'Artistly' },
  { name: 'Evergreen Cash Cows', url: 'https://kdpnichefinder.com/app/category/evergreen', badge: 'KDP Niche Finder' },
  { name: 'Fresh Money', url: 'https://kdpnichefinder.com/app/category/fresh_money', badge: 'KDP Niche Finder' },
  { name: 'Hidden Gems', url: 'https://kdpnichefinder.com/app/category/hidden_gems', badge: 'KDP Niche Finder' },
  { name: 'High-Ticket Heavyweights', url: 'https://kdpnichefinder.com/app/category/high_ticket', badge: 'KDP Niche Finder' },
  { name: 'My Flipbooks', url: 'https://app.artistly.ai/flipbook', badge: 'Artistly' },
  { name: 'Personal Designs', url: 'https://app.artistly.ai/personal-designs', badge: 'Artistly' }
];

// Quick Navigation: design-assistants tools (navigate to ai-design-assistants)
const designAssistantTools = [
  'AI Portrait',
  'AI Stylizer',
  'AI Upscaler',
  'Aspect Ratio Calculator',
  'Character Creator',
  'Character Sheet',
  'Colorify Pages',
  'Custom Upscaler',
  'Human Stylizer',
  'Merch Magic',
  'Mockup Creator',
  'Pet Stylizer',
  'Photo Editor',
  'Photo Restoration',
  'Photo to Coloring Page',
  'Pinterest Pin Creator',
  'Product Holding',
  'Product Photos',
  'Sketch to 3D Render',
  'Storybook Illustrator',
  'Text Editor'
];

// Quick Navigation: kids-puzzles tools (navigate to kids-puzzles)
const kidsPuzzleTools = [
  'Activity Book Builder',
  'Bi-Lingual Word to Image Matching',
  'Complete the Word',
  'Counting Numbers',
  'Crossword Puzzle',
  'Logic Puzzle (For Adults)',
  'Maze Generator',
  'Shadow Matching',
  'Spot the Correct Spelling',
  'Spot the Difference',
  'Sudoku Puzzle',
  'Word Search Puzzle'
];

// Quick Navigation: storybook studio tools (navigate to ai-storybook-studio)
const storybookStudioTools = [
  'Coloring Books',
  'Idea To Illustrated Book',
  'Idea To Storybook',
  'Personalized Alphabet Book',
  'Script To Storybook V2'
];

// Quick Navigation: design agents tools (navigate to ai-design-agents)
const designAgentTools = [
  'Ad Creator',
  'Book Cover',
  'Clip Art',
  'Coloring Book (Advance)',
  'Coloring Page',
  'Consistent Character Storybook',
  'Cookbook Creator',
  'Joke Book for Kids',
  'Kids Story Books',
  'Music Storyboard',
  'Multi-Character Storybook',
  'Personalized Story Books',
  'Pet Portraits',
  'Script To Storybook',
  'Soulmate Sketch',
  'T-shirt Designs',
  'Wall Art Sketch',
  'Youtube Thumbnails'
];

// Quick Navigation: image designer v6 tools (navigate to image-designer-v6)
const imageDesignerV6Tools = [
  'Animal',
  'Artistic Designer',
  'Artistic Designer V2',
  'Cards & Invites',
  'Create From Prompt',
  'Logo',
  'Perfect Text in Image Designer',
  'Poster Maker',
  'Photorealism',
  'Seamless Patterns',
  'Seamless Patterns V2',
  'Social Media Posts',
  'Sticker',
  'T-Shirt Designs',
  'v4 Image Designer'
];

// Quick Navigation: consistent characters tools (navigate to consistent-characters)
const consistentCharactersTools = [
  '3d & 2d Style Images',
  'Multi-consistent Characters',
  'Realistic Images'
];

// Combined list for Quick Nav display (alphabetized A–Z)
const quickNavTools = [
  ...designAssistantTools,
  ...kidsPuzzleTools,
  ...storybookStudioTools,
  ...designAgentTools,
  ...imageDesignerV6Tools,
  ...consistentCharactersTools,
  ...navOnlyTools.map(t => t.name)
].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

function getBadgeForTool(toolName) {
  const navOnly = navOnlyTools.find(t => t.name === toolName);
  return navOnly ? (navOnly.badge || 'Artistly') : 'Artistly';
}

function quickNavMatchesQuery(toolName, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  const nameMatch = toolName.toLowerCase().includes(q);
  const badgeMatch = getBadgeForTool(toolName).toLowerCase().includes(q);
  return nameMatch || badgeMatch;
}

// All available styles
const availableStyles = [
  '2d Flat',
  '8-bit Pixel Style',
  'AAA Game Style',
  'Adult Coloring Book',
  'Adult Coloring Book v2',
  'Anime Style',
  'Anime Style Illustration',
  'Chibi Style',
  'Children Drawing Style',
  "Children's Book Style",
  'Clay Style',
  'Clip Art',
  'Clipart Style',
  'Collage Art',
  'Coloring Page',
  'Comicbook Illustration',
  'Crayon Painting Style',
  'Crayon Style',
  'Creepy Vintage',
  'Dark Manga Style',
  'Detailed Cartoon Style',
  'Doodle Style Illustration',
  'Dreamy Invitation Style',
  'Flat & Stylized Digital Illustration',
  'Flat Illustration Style',
  'Futuristic Robots',
  'Game Characters',
  'Ghibli Style',
  'Golden Style',
  'Grunge Scrapebook',
  'Hand Knitted Style',
  'Impasto Oil Painting',
  'Intricate Pastoral Watercolor Style',
  'Kawaii Watercolor Style',
  'Linocut Style',
  'Loose Expressive Sketch Style',
  'Lush Realistic Watercolor Style',
  'Manga',
  'Minecraft Cinematic Style',
  'Minecraft Style',
  'Miniature',
  'Minimalist Graphite Style',
  'Minimalist Illustration',
  'Modern Paper Cutout Style',
  'Multi-Expression Style',
  'Mystic Fantasy',
  'Naive Acrylic Style',
  'Noise Vector Illustration',
  'Oil Painting',
  'Oldschool Style',
  'Origami Style',
  'Painted Tissue Collage Style',
  'Painting Illustration',
  'Pencil Sketch Style',
  'Picturebook Style Version 2',
  'Pixar Style',
  'Pixelart Illustration',
  'Plant & Flowers Pattern Style',
  'Playful Cartoon Storybook Style',
  'Quirky Minimal Line Style',
  'Retro Game Illustration',
  'Retro Vibe',
  'Semi-Realistic Cartoon Style',
  'Soft Digital Pastel Style',
  'Soft Woolen Fiber Style',
  'Stained Glass',
  'Steampunk Journal',
  'Storybook Illustration',
  'Unique Dreamy Style',
  'Van Gogh',
  'Vector Illustration',
  'Wall Art Style',
  'Watercolor Portrait',
  'Watercolor Style',
  'Watercolor-Inspired Digital Style',
  'Whimsical Fantasy Illustration',
  'Whimsical Illustration',
  'Whimsical Storybook Style'
];

// State management
let currentView = 'tool-selection';
let selectedStyle = null;
let isRunning = false;
let currentTabId = null;
let promptsQueue = [];
let currentPromptIndex = 0;

// DOM elements
const toolSelectionView = document.getElementById('tool-selection-view');
const aiIllustratorView = document.getElementById('ai-illustrator-view');
const backButton = document.getElementById('back-button');
const toolButtons = document.querySelectorAll('.tool-button');
const styleSearchInput = document.getElementById('style-search');
const styleDropdownList = document.getElementById('style-dropdown-list');
const selectedStyleDisplay = document.getElementById('selected-style');
const promptsInput = document.getElementById('prompts-input');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const statsContainer = document.getElementById('stats-container');
const totalImagesDisplay = document.getElementById('total-images');
const currentImageDisplay = document.getElementById('current-image');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const errorMessage = document.getElementById('error-message');
const quickNavInput = document.getElementById('quick-nav-input');
const quickNavDropdown = document.getElementById('quick-nav-dropdown');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  initializeQuickNav();
  initializeStyleDropdown();
  checkCurrentTab();
});

function setupEventListeners() {
  // Tool selection
  toolButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const tool = e.currentTarget.dataset.tool;
      switchToTool(tool);
    });
  });

  // Back button
  backButton.addEventListener('click', () => {
    switchToView('tool-selection');
  });

  // Style search input
  styleSearchInput.addEventListener('input', (e) => {
    if (isRunning) return;
    filterStyles(e.target.value);
    styleDropdownList.classList.add('visible');
  });

  styleSearchInput.addEventListener('focus', () => {
    if (isRunning) return;
    styleDropdownList.classList.add('visible');
    filterStyles(styleSearchInput.value);
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.style-dropdown-container')) {
      styleDropdownList.classList.remove('visible');
    }
    if (!e.target.closest('.quick-nav-wrapper')) {
      quickNavDropdown.classList.remove('visible');
    }
  });

  // Start button
  startButton.addEventListener('click', () => {
    startAutomation();
  });

  // Stop button
  stopButton.addEventListener('click', () => {
    stopAutomation();
  });
}

function switchToView(viewName) {
  currentView = viewName;
  
  toolSelectionView.classList.toggle('active', viewName === 'tool-selection');
  aiIllustratorView.classList.toggle('active', viewName === 'ai-illustrator');
}

function switchToTool(toolName) {
  if (toolName === 'ai-illustrator') {
    switchToView('ai-illustrator');
  }
}

function initializeQuickNav() {
  quickNavInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length === 0) {
      renderQuickNavResults(quickNavTools);
    } else {
      const filtered = quickNavTools.filter(name => quickNavMatchesQuery(name, query));
      renderQuickNavResults(filtered);
    }
    quickNavDropdown.classList.add('visible');
  });

  quickNavInput.addEventListener('focus', () => {
    const query = quickNavInput.value.trim();
    if (query.length === 0) {
      renderQuickNavResults(quickNavTools);
    } else {
      const filtered = quickNavTools.filter(name => quickNavMatchesQuery(name, query));
      renderQuickNavResults(filtered);
    }
    quickNavDropdown.classList.add('visible');
  });

  quickNavInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      quickNavDropdown.classList.remove('visible');
      quickNavInput.blur();
    }
  });
}

function renderQuickNavResults(tools) {
  quickNavDropdown.innerHTML = '';
  if (tools.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'quick-nav-item quick-nav-empty';
    empty.textContent = 'No matching tools';
    quickNavDropdown.appendChild(empty);
    return;
  }
  tools.forEach(toolName => {
    const item = document.createElement('div');
    item.className = 'quick-nav-item';
    const navOnly = navOnlyTools.find(t => t.name === toolName);
    const badgeLabel = navOnly ? (navOnly.badge || 'Artistly') : 'Artistly';
    const showV6Badge = toolName === 'Seamless Patterns' || toolName === 'T-Shirt Designs';
    let badgesHtml;
    if (showV6Badge) {
      badgesHtml = `<span class="quick-nav-badges"><span class="quick-nav-badge quick-nav-badge-v6">V6</span><span class="quick-nav-badge">Artistly</span></span>`;
    } else if (badgeLabel === 'KDP Niche Finder') {
      badgesHtml = `<span class="quick-nav-badge quick-nav-badge-kdp">KDP Niche Finder</span>`;
    } else {
      badgesHtml = `<span class="quick-nav-badge">Artistly</span>`;
    }
    item.innerHTML = `
      <span class="quick-nav-item-text">${escapeHtml(toolName)}</span>
      ${badgesHtml}
    `;
    item.addEventListener('click', () => {
      selectQuickNavItem(toolName);
    });
    quickNavDropdown.appendChild(item);
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getQuickNavUrlForTool(toolName) {
  const navOnly = navOnlyTools.find(t => t.name === toolName);
  if (navOnly) return navOnly.url;
  if (kidsPuzzleTools.includes(toolName)) {
    return 'https://app.artistly.ai/ai/kids-puzzles';
  }
  if (designAgentTools.includes(toolName)) {
    return 'https://app.artistly.ai/ai/ai-design-agents';
  }
  if (storybookStudioTools.includes(toolName)) {
    return 'https://app.artistly.ai/ai/ai-storybook-studio';
  }
  if (imageDesignerV6Tools.includes(toolName)) {
    return 'https://app.artistly.ai/ai/image-designer-v6';
  }
  if (consistentCharactersTools.includes(toolName)) {
    return 'https://app.artistly.ai/ai/consistent-characters';
  }
  return 'https://app.artistly.ai/ai/ai-design-assistants';
}

function isNavOnlyTool(toolName) {
  return navOnlyTools.some(t => t.name === toolName);
}

function selectQuickNavItem(toolName) {
  quickNavInput.value = '';
  quickNavDropdown.classList.remove('visible');
  quickNavDropdown.innerHTML = '';

  const url = getQuickNavUrlForTool(toolName);
  if (isNavOnlyTool(toolName)) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) chrome.tabs.update(tabs[0].id, { url });
    });
  } else {
    chrome.storage.local.set({ quickNavToolToClick: toolName }, () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) chrome.tabs.update(tabs[0].id, { url });
      });
    });
  }
}

function initializeStyleDropdown() {
  // Populate dropdown with all styles
  styleDropdownList.innerHTML = '';
  availableStyles.forEach(style => {
    const item = document.createElement('div');
    item.className = 'style-dropdown-item';
    item.textContent = style;
    item.addEventListener('click', () => {
      selectStyle(style);
    });
    styleDropdownList.appendChild(item);
  });
}

function filterStyles(searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  const items = styleDropdownList.querySelectorAll('.style-dropdown-item');
  
  items.forEach(item => {
    const styleText = item.textContent.toLowerCase();
    if (term === '' || styleText.includes(term)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

function selectStyle(style) {
  if (isRunning) return;
  
  selectedStyle = style;
  styleSearchInput.value = style;
  selectedStyleDisplay.textContent = `Selected: ${style}`;
  styleDropdownList.classList.remove('visible');
  
  // Update selected state in dropdown
  const items = styleDropdownList.querySelectorAll('.style-dropdown-item');
  items.forEach(item => {
    item.classList.remove('selected');
    if (item.textContent === style) {
      item.classList.add('selected');
    }
  });
}

async function checkCurrentTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      currentTabId = tab.id;
    }
  } catch (error) {
    // Error getting current tab
  }
}

function parsePrompts(text) {
  // Split by blank lines (double newline or more)
  const prompts = text
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
  return prompts;
}

async function startAutomation() {
  // Validate inputs
  if (!selectedStyle) {
    showError('Please select a style');
    return;
  }

  const promptsText = promptsInput.value.trim();
  if (!promptsText) {
    showError('Please enter at least one prompt');
    return;
  }

  const prompts = parsePrompts(promptsText);
  if (prompts.length === 0) {
    showError('Please enter at least one prompt');
    return;
  }

  // Get current tab
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
      showError('No active tab found');
      return;
    }

    currentTabId = tab.id;

    // Navigate to artistly.ai if not already there
    if (!tab.url.includes('app.artistly.ai/ai/ai-illustrator')) {
      await chrome.tabs.update(tab.id, {
        url: 'https://app.artistly.ai/ai/ai-illustrator'
      });
      // Wait for navigation
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Start automation
    isRunning = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    statsContainer.style.display = 'block';
    hideError();

    // Update stats
    totalImagesDisplay.textContent = prompts.length;
    currentImageDisplay.textContent = '0';
    updateProgress(0);

    // Store prompts for sequential processing
    promptsQueue = prompts;
    currentPromptIndex = 0;

    // Process first prompt
    await processNextPrompt(tab.id);
  } catch (error) {
    showError(`Error: ${error.message}`);
    stopAutomation();
  }
}

function stopAutomation() {
  isRunning = false;
  startButton.disabled = false;
  stopButton.disabled = true;
  promptsQueue = [];
  currentPromptIndex = 0;

  if (currentTabId) {
    chrome.tabs.sendMessage(currentTabId, {
      action: 'stop-automation'
    }).catch(() => {
      // Ignore errors if content script is not available
    });
  }
}

async function processNextPrompt(tabId) {
  // Check if stopped before starting
  if (!isRunning || currentPromptIndex >= promptsQueue.length) {
    if (isRunning && currentPromptIndex >= promptsQueue.length) {
      // All prompts completed
      chrome.runtime.sendMessage({
        action: 'automation-complete'
      });
      stopAutomation();
    }
    return;
  }

  const prompt = promptsQueue[currentPromptIndex];
  const promptNumber = currentPromptIndex + 1;

  try {
    // Check if stopped before navigation
    if (!isRunning) return;

    // Navigate to the AI Illustrator page (always navigate to reset state)
    await chrome.tabs.update(tabId, {
      url: 'https://app.artistly.ai/ai/ai-illustrator'
    });

    // Check if stopped during navigation
    if (!isRunning) return;

    // Wait for tab to finish loading
    await new Promise((resolve) => {
      const checkTab = (tabId, changeInfo, tab) => {
        if (!isRunning) {
          chrome.tabs.onUpdated.removeListener(checkTab);
          resolve();
          return;
        }
        if (tab.id === tabId && changeInfo.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(checkTab);
          resolve();
        }
      };
      chrome.tabs.onUpdated.addListener(checkTab);
      // Also check if already loaded
      chrome.tabs.get(tabId).then((tab) => {
        if (tab.status === 'complete') {
          chrome.tabs.onUpdated.removeListener(checkTab);
          resolve();
        }
      });
    });

    // Check if stopped after navigation
    if (!isRunning) return;

    // Inject content script first (always inject to ensure it's loaded)
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['content/content.js']
      });
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      throw new Error('Failed to inject content script: ' + error.message);
    }

    // Check if stopped after injection
    if (!isRunning) return;

    // Wait for page to be fully loaded and ready
    await waitForPageStable(tabId);

    // Check if stopped after waiting
    if (!isRunning) return;

    // Verify content script is responding
    try {
      await chrome.tabs.sendMessage(tabId, { action: 'ping' });
    } catch (error) {
      throw new Error('Content script is not responding');
    }

    // Check if stopped before processing
    if (!isRunning) return;

    // Send message to process this prompt
    await chrome.tabs.sendMessage(tabId, {
      action: 'process-prompt',
      style: selectedStyle,
      prompt: prompt,
      promptNumber: promptNumber,
      totalPrompts: promptsQueue.length
    });

    // Check if stopped after sending message
    if (!isRunning) return;

    // Update progress
    currentImageDisplay.textContent = promptNumber.toString();
    const percentage = (promptNumber / promptsQueue.length) * 100;
    updateProgress(percentage);

    // Wait 5 seconds after generation starts, then process next prompt
    // But check for stop during wait
    for (let i = 0; i < 50; i++) {
      if (!isRunning) return;
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Check if stopped before moving to next
    if (!isRunning) return;

    // Move to next prompt
    currentPromptIndex++;
    await processNextPrompt(tabId);

  } catch (error) {
    if (isRunning) {
      showError(`Error processing prompt ${promptNumber}: ${error.message}`);
      stopAutomation();
    }
  }
}

async function waitForPageStable(tabId) {
  // Wait for browser page to be completely loaded (tab spinner stops)
  return new Promise(async (resolve, reject) => {
    let timeoutId = setTimeout(() => {
      reject(new Error('Timeout waiting for page to be stable'));
    }, 30000); // 30 second timeout

    // First, wait for tab status to be 'complete'
    let tabComplete = false;
    let attempts = 0;
    const maxTabAttempts = 100; // 10 seconds max
    
    const checkTabStatus = async () => {
      if (!isRunning) {
        clearTimeout(timeoutId);
        resolve();
        return;
      }

      try {
        const tab = await chrome.tabs.get(tabId);
        if (tab.status === 'complete') {
          tabComplete = true;
          // Tab is complete, now check if page resources are fully loaded
          checkPageResources();
        } else {
          attempts++;
          if (attempts < maxTabAttempts) {
            setTimeout(checkTabStatus, 100);
          } else {
            tabComplete = true;
            checkPageResources();
          }
        }
      } catch (error) {
        // Tab might not be accessible, try checking page resources anyway
        setTimeout(checkPageResources, 500);
      }
    };

    let stableCount = 0;
    const requiredStableChecks = 2; // Need 2 consecutive stable checks
    let resourceCheckAttempts = 0;
    const maxResourceAttempts = 150; // 30 seconds max
    
    const checkPageResources = async () => {
      if (!isRunning) {
        clearTimeout(timeoutId);
        resolve();
        return;
      }

      resourceCheckAttempts++;
      if (resourceCheckAttempts > maxResourceAttempts) {
        clearTimeout(timeoutId);
        resolve();
        return;
      }

      try {
        // Check if page is ready via content script (checks network activity and elements)
        const result = await chrome.tabs.sendMessage(tabId, { 
          action: 'check-page-ready' 
        });
        
        if (result && result.ready) {
          stableCount++;
          if (stableCount >= requiredStableChecks) {
            clearTimeout(timeoutId);
            resolve();
            return;
          }
        } else {
          stableCount = 0; // Reset if not ready
        }
      } catch (error) {
        // Content script might not be ready yet
        stableCount = 0;
      }
      
      // Continue checking
      setTimeout(checkPageResources, 200);
    };
    
    // Start checking tab status
    checkTabStatus();
  });
}

function updateProgress(percentage) {
  const progress = Math.min(100, Math.max(0, percentage));
  progressText.textContent = `${Math.round(progress)}%`;
  
  const circumference = 2 * Math.PI * 45; // radius is 45
  const offset = circumference - (progress / 100) * circumference;
  progressBar.style.strokeDashoffset = offset;
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

function hideError() {
  errorMessage.style.display = 'none';
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'prompt-complete') {
    // Prompt was successfully processed, continue with next
    // (next prompt is already being processed by processNextPrompt)
  } else if (message.action === 'automation-error') {
    showError(message.error || 'An error occurred during automation');
    stopAutomation();
  }
});

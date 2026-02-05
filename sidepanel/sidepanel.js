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
const clipboardView = document.getElementById('clipboard-view');
const searchSuggesterView = document.getElementById('search-suggester-view');
const backButton = document.getElementById('back-button');
const clipboardBackButton = document.getElementById('clipboard-back-button');
const searchSuggesterBackButton = document.getElementById('search-suggester-back-button');
const toolButtons = document.querySelectorAll('.tool-button');
const clipboardInput = document.getElementById('clipboard-input');
const clipboardSplitButton = document.getElementById('clipboard-split-button');
const clipboardClearButton = document.getElementById('clipboard-clear-button');
const clipboardSections = document.getElementById('clipboard-sections');
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
const searchSuggesterInput = document.getElementById('search-suggester-input');
const searchSuggesterFetchButton = document.getElementById('search-suggester-fetch-button');
const searchSuggesterResetButton = document.getElementById('search-suggester-reset-button');
const searchSuggesterSavedList = document.getElementById('search-suggester-saved-list');
const searchSuggesterResultsList = document.getElementById('search-suggester-results-list');
const searchSuggesterCopyCsvButton = document.getElementById('search-suggester-copy-csv-button');
const searchSuggesterError = document.getElementById('search-suggester-error');
const snippetsView = document.getElementById('snippets-view');
const snippetsBackButton = document.getElementById('snippets-back-button');
const snippetsSearchInput = document.getElementById('snippets-search-input');
const snippetsTitleInput = document.getElementById('snippets-title-input');
const snippetsCategorySelect = document.getElementById('snippets-category-select');
const snippetsContentInput = document.getElementById('snippets-content-input');
const snippetsSaveButton = document.getElementById('snippets-save-button');
const snippetsList = document.getElementById('snippets-list');
const snippetsNewButton = document.getElementById('snippets-new-button');
const snippetsFormSection = document.getElementById('snippets-form-section');
const snippetsCloseButton = document.getElementById('snippets-close-button');

// Snippets: categories and storage key
const SNIPPET_CATEGORIES = ['Note', 'Prompt', 'Code', 'Other'];
const SNIPPETS_STORAGE_KEY = 'snippets';

// Listen for Etsy suggestions result (pushed from background)
chrome.runtime.onMessage.addListener((message) => {
  if (message && message.type === 'etsy-suggestions-result') {
    applyEtsySuggestionsResult(message);
  }
});

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

  // Back buttons
  backButton.addEventListener('click', () => {
    switchToView('tool-selection');
  });
  clipboardBackButton.addEventListener('click', () => {
    switchToView('tool-selection');
  });
  searchSuggesterBackButton.addEventListener('click', () => {
    switchToView('tool-selection');
  });
  snippetsBackButton.addEventListener('click', () => {
    switchToView('tool-selection');
  });

  // Snippets: search filter
  snippetsSearchInput.addEventListener('input', () => {
    if (typeof renderSnippets === 'function' && snippetsData) renderSnippets(snippetsData);
  });

  // Snippets: show new snippet form
  snippetsNewButton.addEventListener('click', () => {
    if (snippetsFormSection) {
      snippetsFormSection.classList.add('snippets-form-visible');
      if (snippetsView) snippetsView.classList.add('snippets-form-open');
      if (snippetsTitleInput) snippetsTitleInput.focus();
    }
  });

  // Snippets: save new snippet
  snippetsSaveButton.addEventListener('click', () => {
    addSnippetFromForm();
  });

  // Snippets: close new snippet form
  snippetsCloseButton.addEventListener('click', () => {
    if (snippetsFormSection) snippetsFormSection.classList.remove('snippets-form-visible');
    if (snippetsView) snippetsView.classList.remove('snippets-form-open');
    if (snippetsTitleInput) snippetsTitleInput.value = '';
    if (snippetsContentInput) snippetsContentInput.value = '';
    if (snippetsCategorySelect) snippetsCategorySelect.value = 'Note';
  });

  // Search Suggester: fetch suggestions
  searchSuggesterFetchButton.addEventListener('click', () => {
    fetchEtsySuggestions();
  });
  searchSuggesterResetButton.addEventListener('click', () => {
    resetSearchSuggester();
  });

  searchSuggesterCopyCsvButton.addEventListener('click', () => {
    if (!currentSuggestionKeywords.length) return;
    const csv = currentSuggestionKeywords.join(',');
    navigator.clipboard.writeText(csv).then(() => {
      searchSuggesterCopyCsvButton.textContent = '✓';
      setTimeout(() => { searchSuggesterCopyCsvButton.textContent = '📋'; }, 1500);
    });
  });

  // Clipboard: split into sections
  clipboardSplitButton.addEventListener('click', () => {
    splitClipboardAndRender();
  });

  // Clipboard: clear text and sections
  clipboardClearButton.addEventListener('click', () => {
    clipboardInput.value = '';
    clipboardSections.innerHTML = '';
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
  clipboardView.classList.toggle('active', viewName === 'clipboard');
  snippetsView.classList.toggle('active', viewName === 'snippets');
  searchSuggesterView.classList.toggle('active', viewName === 'search-suggester');
}

function switchToTool(toolName) {
  if (toolName === 'ai-illustrator') {
    switchToView('ai-illustrator');
  } else if (toolName === 'clipboard') {
    switchToView('clipboard');
  } else if (toolName === 'snippets') {
    switchToView('snippets');
    loadAndRenderSnippets();
  } else if (toolName === 'search-suggester') {
    switchToView('search-suggester');
    renderSearchSuggesterSaved();
  }
}

// Snippets state (in-memory copy; persisted in chrome.storage.local)
let snippetsData = [];

function loadSnippets(callback) {
  chrome.storage.local.get(SNIPPETS_STORAGE_KEY, (result) => {
    const list = Array.isArray(result[SNIPPETS_STORAGE_KEY]) ? result[SNIPPETS_STORAGE_KEY] : [];
    callback(list);
  });
}

function saveSnippets(snippets) {
  chrome.storage.local.set({ [SNIPPETS_STORAGE_KEY]: snippets }, () => {
    snippetsData = snippets.slice();
    renderSnippets(snippetsData);
  });
}

function loadAndRenderSnippets() {
  loadSnippets((list) => {
    snippetsData = list.slice();
    renderSnippets(snippetsData);
  });
}

function snippetMatchesQuery(snippet, query) {
  if (!query || !query.trim()) return true;
  const q = query.trim().toLowerCase();
  const title = (snippet.title || '').toLowerCase();
  const category = (snippet.category || '').toLowerCase();
  const content = (snippet.content || '').toLowerCase();
  return title.includes(q) || category.includes(q) || content.includes(q);
}

function getSnippetCategoryClass(category) {
  const c = (category || 'Other').toLowerCase();
  if (c === 'note') return 'snippet-category-note';
  if (c === 'prompt') return 'snippet-category-prompt';
  if (c === 'code') return 'snippet-category-code';
  return 'snippet-category-other';
}

function renderSnippets(snippets) {
  const query = snippetsSearchInput ? snippetsSearchInput.value.trim() : '';
  const filtered = query ? snippets.filter((s) => snippetMatchesQuery(s, query)) : snippets;
  snippetsList.innerHTML = '';

  if (snippets.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'snippets-empty';
    empty.textContent = 'No snippets yet. Add one above.';
    snippetsList.appendChild(empty);
    return;
  }
  if (filtered.length === 0) {
    const noMatch = document.createElement('div');
    noMatch.className = 'snippets-no-match';
    noMatch.textContent = 'No snippets match your search.';
    snippetsList.appendChild(noMatch);
    return;
  }

  filtered.forEach((snippet) => {
    const card = document.createElement('div');
    card.className = 'snippet-card';
    card.dataset.snippetId = snippet.id;

    const header = document.createElement('div');
    header.className = 'snippet-card-header';
    const expandBtn = document.createElement('button');
    expandBtn.type = 'button';
    expandBtn.className = 'snippet-expand-toggle';
    expandBtn.setAttribute('aria-label', 'Expand');
    expandBtn.innerHTML = '<span class="button-icon">▶</span>';
    expandBtn.addEventListener('click', () => {
      const isCollapsed = contentWrap.classList.toggle('collapsed');
      card.classList.toggle('snippet-card-expanded', !isCollapsed);
      expandBtn.innerHTML = isCollapsed ? '<span class="button-icon">▶</span>' : '<span class="button-icon">▼</span>';
      expandBtn.setAttribute('aria-label', isCollapsed ? 'Expand' : 'Collapse');
    });
    const titleEl = document.createElement('span');
    titleEl.className = 'snippet-card-title';
    titleEl.textContent = snippet.title || '(Untitled)';
    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'snippet-copy-icon';
    copyBtn.setAttribute('aria-label', 'Copy to clipboard');
    copyBtn.innerHTML = '<span class="button-icon">📋</span>';
    copyBtn.addEventListener('click', () => {
      const text = (snippet.content || '').trim();
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.innerHTML = '<span class="button-icon">✓</span>';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.innerHTML = '<span class="button-icon">📋</span>';
          copyBtn.classList.remove('copied');
        }, 1500);
      });
    });
    const badge = document.createElement('span');
    badge.className = 'snippet-category-badge ' + getSnippetCategoryClass(snippet.category);
    badge.textContent = snippet.category || 'Other';
    header.appendChild(expandBtn);
    header.appendChild(titleEl);
    header.appendChild(copyBtn);
    header.appendChild(badge);
    card.appendChild(header);

    const contentWrap = document.createElement('div');
    contentWrap.className = 'snippet-card-content-wrap collapsed';
    const contentEl = document.createElement('textarea');
    contentEl.className = 'snippet-card-content';
    contentEl.value = snippet.content || '';
    contentEl.rows = 3;
    contentEl.addEventListener('blur', () => {
      const newContent = contentEl.value;
      if (newContent !== (snippet.content || '')) {
        const idx = snippetsData.findIndex((s) => s.id === snippet.id);
        if (idx !== -1) {
          snippetsData[idx] = { ...snippetsData[idx], content: newContent };
          saveSnippets(snippetsData);
        }
      }
    });
    contentWrap.appendChild(contentEl);
    card.appendChild(contentWrap);

    const actions = document.createElement('div');
    actions.className = 'snippet-card-actions';
    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'snippet-edit-button';
    editBtn.innerHTML = '<span class="button-icon">💾</span> Save';
    editBtn.addEventListener('click', () => {
      const newContent = contentEl.value;
      const idx = snippetsData.findIndex((s) => s.id === snippet.id);
      if (idx !== -1) {
        snippetsData[idx] = { ...snippetsData[idx], content: newContent };
        saveSnippets(snippetsData);
      }
    });
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'snippet-delete-button';
    deleteBtn.innerHTML = '<span class="button-icon">🗑</span> Delete';
    deleteBtn.addEventListener('click', () => {
      if (confirm('Delete this snippet?')) {
        const next = snippetsData.filter((s) => s.id !== snippet.id);
        saveSnippets(next);
      }
    });
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    card.appendChild(actions);
    snippetsList.appendChild(card);
  });
}

function addSnippetFromForm() {
  const title = (snippetsTitleInput && snippetsTitleInput.value || '').trim();
  const content = (snippetsContentInput && snippetsContentInput.value || '').trim();
  if (!title && !content) return;
  const category = snippetsCategorySelect && snippetsCategorySelect.value ? snippetsCategorySelect.value : 'Other';
  const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
  const newSnippet = { id, title: title || '(Untitled)', category, content };
  const next = snippetsData.slice();
  next.push(newSnippet);
  snippetsData = next;
  chrome.storage.local.set({ [SNIPPETS_STORAGE_KEY]: next }, () => {
    if (snippetsTitleInput) snippetsTitleInput.value = '';
    if (snippetsContentInput) snippetsContentInput.value = '';
    if (snippetsCategorySelect) snippetsCategorySelect.value = 'Note';
    renderSnippets(snippetsData);
  });
}

// Etsy Search Suggester state
let savedKeywords = [];
let currentSuggestionKeywords = [];

function stripHtmlFromQuery(str) {
  if (typeof str !== 'string') return '';
  const div = document.createElement('div');
  div.innerHTML = str;
  return (div.textContent || div.innerText || '').trim();
}

function renderSearchSuggesterSaved() {
  searchSuggesterSavedList.innerHTML = '';
  if (savedKeywords.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'search-suggester-empty';
    empty.textContent = 'No saved keywords yet. Clip suggestions below.';
    searchSuggesterSavedList.appendChild(empty);
    return;
  }
  savedKeywords.forEach((keyword) => {
    const item = document.createElement('div');
    item.className = 'search-suggester-keyword-item search-suggester-saved-item';
    const text = document.createElement('span');
    text.className = 'search-suggester-keyword-text';
    text.textContent = keyword;
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'search-suggester-remove-button';
    removeBtn.setAttribute('aria-label', 'Remove');
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', () => {
      savedKeywords = savedKeywords.filter((k) => k !== keyword);
      renderSearchSuggesterSaved();
    });
    item.appendChild(text);
    item.appendChild(removeBtn);
    searchSuggesterSavedList.appendChild(item);
  });
}

function clipKeyword(keyword) {
  if (!keyword || savedKeywords.includes(keyword)) return;
  savedKeywords.push(keyword);
  renderSearchSuggesterSaved();
  currentSuggestionKeywords = currentSuggestionKeywords.filter((k) => k !== keyword);
  const items = searchSuggesterResultsList.querySelectorAll('.search-suggester-keyword-item');
  items.forEach((el) => {
    if (el.querySelector('.search-suggester-keyword-text')?.textContent === keyword) el.remove();
  });
}

function resetSearchSuggester() {
  savedKeywords = [];
  renderSearchSuggesterSaved();
  searchSuggesterResultsList.innerHTML = '';
  searchSuggesterError.style.display = 'none';
}

// Pending Etsy request id and timeout (for matching push response)
let pendingEtsyRequestId = null;
let searchSuggesterTimeoutId = null;

function showSearchSuggesterStatus(text, isError) {
  searchSuggesterError.textContent = text;
  searchSuggesterError.style.display = 'block';
  searchSuggesterError.classList.toggle('search-suggester-status-info', !isError);
  if (isError) searchSuggesterError.classList.remove('search-suggester-status-info');
}

function applyEtsySuggestionsResult(payload) {
  if (payload.requestId !== pendingEtsyRequestId) return;
  pendingEtsyRequestId = null;
  if (searchSuggesterTimeoutId) {
    clearTimeout(searchSuggesterTimeoutId);
    searchSuggesterTimeoutId = null;
  }
  searchSuggesterFetchButton.disabled = false;
  searchSuggesterError.style.display = 'none';
  searchSuggesterError.classList.remove('search-suggester-status-info');
  if (!payload.ok) {
    searchSuggesterResultsList.innerHTML = '';
    showSearchSuggesterStatus(payload.error || 'Could not load suggestions.', true);
    return;
  }
  const data = payload.data || {};
  const debug = payload.debug || {};
  const rawResults = data.results || [];
  let results = rawResults
    .filter((r) => !r.shop_suggestion_item)
    .map((r) => stripHtmlFromQuery(r && r.query != null ? r.query : ''))
    .filter((q) => q.length > 0);
  results = results.filter((q) => !savedKeywords.includes(q));
  console.log('[Search Suggester] payload:', { ok: payload.ok, debug, rawResultCount: rawResults.length, filteredCount: results.length });
  searchSuggesterResultsList.innerHTML = '';
  currentSuggestionKeywords = [];
  if (results.length === 0) {
    const statusCode = debug.statusCode != null ? debug.statusCode : '—';
    const rawCount = debug.rawResultCount != null ? debug.rawResultCount : rawResults.length;
    const samples = debug.rawQuerySamples || rawResults.slice(0, 3).map((r) => (r && r.query != null ? String(r.query).slice(0, 60) : ''));
    const debugHtml = [
      `HTTP ${statusCode}`,
      `Raw results: ${rawCount}`,
      `After filter: 0`,
      rawCount > 0 ? `Sample raw queries: ${samples.join(' | ')}` : (debug.rawPreview ? `Response preview: ${String(debug.rawPreview).slice(0, 200)}…` : '')
    ].filter(Boolean).join(' · ');
    showSearchSuggesterStatus(`No suggestions returned. Try another keyword. Debug: ${debugHtml}`, false);
    const debugEl = document.createElement('div');
    debugEl.className = 'search-suggester-debug';
    debugEl.textContent = debugHtml;
    searchSuggesterResultsList.appendChild(debugEl);
    return;
  }
  currentSuggestionKeywords = results.slice();
  results.forEach((keyword) => {
    const item = document.createElement('div');
    item.className = 'search-suggester-keyword-item';
    const text = document.createElement('span');
    text.className = 'search-suggester-keyword-text';
    text.textContent = keyword;
    const clipBtn = document.createElement('button');
    clipBtn.type = 'button';
    clipBtn.className = 'search-suggester-clip-button';
    clipBtn.textContent = 'Clip';
    clipBtn.addEventListener('click', () => clipKeyword(keyword));
    item.appendChild(text);
    item.appendChild(clipBtn);
    searchSuggesterResultsList.appendChild(item);
  });
}

function fetchEtsySuggestions() {
  const query = searchSuggesterInput.value.trim();
  if (!query) {
    showSearchSuggesterStatus('Enter a search keyword.', true);
    return;
  }
  searchSuggesterError.style.display = 'none';
  searchSuggesterFetchButton.disabled = true;
  pendingEtsyRequestId = Date.now();
  searchSuggesterResultsList.innerHTML = '<div class="search-suggester-loading">Loading suggestions…</div>';
  const timeoutMs = 15000;
  searchSuggesterTimeoutId = setTimeout(() => {
    if (pendingEtsyRequestId !== null) {
      pendingEtsyRequestId = null;
      searchSuggesterFetchButton.disabled = false;
      searchSuggesterResultsList.innerHTML = '';
      showSearchSuggesterStatus('Request timed out. Try again.', true);
    }
  }, timeoutMs);
  chrome.runtime.sendMessage(
    { action: 'fetch-etsy-suggestions', query, requestId: pendingEtsyRequestId },
    (response) => {
      if (chrome.runtime.lastError) {
        clearTimeout(searchSuggesterTimeoutId);
        searchSuggesterTimeoutId = null;
        searchSuggesterFetchButton.disabled = false;
        searchSuggesterResultsList.innerHTML = '';
        showSearchSuggesterStatus(`Send failed: ${chrome.runtime.lastError.message}`, true);
        pendingEtsyRequestId = null;
      }
    }
  );
}

function splitClipboardAndRender() {
  const text = clipboardInput.value.trim();
  if (!text) {
    clipboardSections.innerHTML = '';
    return;
  }
  const sections = text
    .split(/\n\s*\n/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  clipboardSections.innerHTML = '';
  sections.forEach((sectionText) => {
    const card = document.createElement('div');
    card.className = 'clipboard-section-card';
    const textArea = document.createElement('textarea');
    textArea.className = 'clipboard-section-input';
    textArea.value = sectionText;
    textArea.rows = 3;
    const actions = document.createElement('div');
    actions.className = 'clipboard-section-actions';
    const copyBtn = document.createElement('button');
    copyBtn.className = 'clipboard-copy-button';
    copyBtn.type = 'button';
    copyBtn.innerHTML = '<span class="button-icon">📋</span> Copy';
    copyBtn.addEventListener('click', () => {
      const value = textArea.value.trim();
      navigator.clipboard.writeText(value).then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.innerHTML = '<span class="button-icon">📋</span> Copy';
          copyBtn.classList.remove('copied');
        }, 1500);
      });
    });
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'clipboard-delete-button';
    deleteBtn.type = 'button';
    deleteBtn.innerHTML = '<span class="button-icon">🗑</span> Delete';
    deleteBtn.addEventListener('click', () => {
      card.remove();
    });
    actions.appendChild(copyBtn);
    actions.appendChild(deleteBtn);
    card.appendChild(textArea);
    card.appendChild(actions);
    clipboardSections.appendChild(card);
  });
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
    if (!tab.url || !tab.url.includes('app.artistly.ai/ai/ai-illustrator')) {
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

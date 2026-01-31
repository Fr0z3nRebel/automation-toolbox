# Chrome Web Store — Privacy Practices Justifications

Copy each justification into the corresponding field on the **Privacy practices** tab of your Chrome Web Store listing.

---

## activeTab

**Justification:**

Automation Toolbox needs access to the active tab so users can run tools against the page they have open. When you use Quick Navigation, we navigate that tab to the chosen Artistly tool URL. When you use the AI Art Illustrator automation, we use the active tab to load the Artistly page, inject our content script so we can fill the style and prompt and trigger generation, and we send messages to that tab to run the automation step-by-step. We only interact with the tab when you explicitly start an action from the side panel; we do not read or modify tab content in the background.

---

## Host permission (https://app.artistly.ai/*)

**Justification:**

The extension’s main features are built for Artistly. We need host permission for https://app.artistly.ai/* so that: (1) our content script can run on Artistly pages to support Quick Nav (e.g. clicking the right tool after navigation) and (2) the AI Art Illustrator automation can run on the Artistly AI Illustrator page—we inject our script there, fill the style and prompt fields, and click generate. We do not access any other sites; permission is limited to app.artistly.ai.

---

## Remote code

**Justification:**

We do not load or execute code from the internet. The only “dynamic” behavior is using the `scripting` API to inject our own packaged content script (content.js) into the user’s current tab when they start AI Art Illustrator automation. That script is bundled in the extension and is the same file declared in the manifest; it is not fetched from a remote server and no remote code is run. Injection is used only so the script is present and can respond to messages that drive the automation (e.g. selecting style, entering prompt, clicking generate).

---

## scripting

**Justification:**

Scripting is used so we can inject our bundled content script (content.js) into the active tab when the user runs the AI Art Illustrator automation. The Artistly page is loaded in the tab, but our content script is only injected after the user clicks Start in the side panel; once injected, it receives messages from the side panel to select the style, paste the prompt, and trigger image generation. We do not inject scripts into any other sites or run arbitrary code—only our packaged content script on Artistly pages the user has chosen to automate.

---

## sidePanel

**Justification:**

Automation Toolbox is built around a side panel UI. When users click the extension icon, we open the side panel so they can use Quick Navigation, the Clipboard tool, and the AI Art Illustrator tool (style selection, prompts, Start/Stop, progress). All user interaction happens in the side panel; we need the sidePanel permission to open and display this interface. We do not open the side panel without user action (e.g. clicking the extension icon).

---

## storage

**Justification:**

We use local storage only to pass a single, non-sensitive value from the side panel to the content script: the name of the Quick Nav tool the user chose (e.g. “Coloring Page”). When the user picks a tool that requires a click after navigation (e.g. design assistants), we navigate the tab to the right Artistly page, and the content script reads that stored tool name once to simulate a click on the matching tool. After use, we remove the value. We do not store personal data, browsing history, or anything beyond this one-time handoff for the chosen tool.

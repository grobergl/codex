# AI Study Chats · Daalaa

Interactive instructor mockup of AI Study Chats embedded in Canvas, using a sample business course.

## Open the mockup

Open `study-chats.html` directly in a modern browser. No installation or server is required. Download the repository ZIP and extract it first. The HTML file contains the entire app; optional web fonts need an internet connection.

## Team preview

Open and share the live preview: https://grobergl.github.io/codex/ . GitHub Pages is enabled and deploys from the `gh-pages` branch at `/docs`. No download or GitHub login is required.

The `gh-pages` branch contains a self-contained `docs/index.html` and `docs/.nojekyll`, matching the current Pages source folder. A root copy is also kept. To update an enabled preview, regenerate `study-chats.html` with `npm run build:standalone`, copy it to both `docs/index.html` and `index.html` on `gh-pages`, and push that branch. The public preview uses sample content; each browser maintains its own local drafts and library changes.

## Document preview

The AI draft editor and its rendered reading are shown side by side on desktop, with a live preview as you type. On mobile, the panels stack vertically.

![Side-by-side document editor and rendered preview](docs/document-preview.png)

## Develop

```sh
npm install
npm run dev
```

Build with `npm run build`. Regenerate the single-file demo with `npm run build:standalone`. The development server uses port 5173 by default.

## Included flows

- Canvas shell with AI Study Chats as the course navigation item. Tabs are Materials, Activities, Results, AI Setup, Preferences, and About Daalaa, in that order. About Daalaa opens on a first visit; the last tab is then remembered in the current browser.
- About Daalaa provides a welcome screen, written Materials tutorials, and entry points into the existing reading and module wizards.
- Activities preserves saved drafts and the draft form, with a guided-setup preview outlining format, context, and completion choices.
- Results sketches live conversations and grade review, concept understanding, debate patterns, and AI usage. No student data or usage statistics are populated.
- AI Setup has Models & access, Limits, Usage, Language, Prompts & instructions, and Personas sections. Editable course defaults are saved locally, with per-category permission to customize an activity. Model slots and disabled API-key setup remain placeholders; no key is collected or stored. Detailed AI usage is here; Results links to it.
- Each new activity captures a snapshot of its model, persona, instructions, language, time/turn completion, and token/request limits. Changes to course defaults do not change saved activities. Instructors can explicitly apply the current defaults; permitted numerical overrides are bounded by course maxima. Existing activities without a snapshot keep their data and can opt into current defaults.
- An example instructor trial begins with 1,000 credits, shared across both sample courses. A suggestion or summary uses 1 credit, document generation 5, and a persona test 3. These are illustrative credits, not real tokens, money, or provider charges. Usage is attributed to its course, model slot, and instructor tool. No student conversations or provider token data are fabricated.
- Admin preview can edit the total allowance and optional expiration, and approve locally saved access requests. Credit grants preserve prior usage. A used-up/expired allowance pauses new simulated AI actions; uploads, manual module creation/editing, saved materials, drafts, and Results remain available. Text uploads awaiting an AI summary can be summarized later from their context editor.
- Quick Request more access actions request 500 example credits; Usage also accepts a custom request amount/reason. Requests remain pending until approved in Admin preview, and do not send external messages. Role switching and quota checks are client-side demonstrations rather than authentication or production billing.
- Preferences shows illustrative defaults for summaries, optional learning goals, reviewed material placement, and general activity setup guidance. Completion and AI-specific controls are in AI Setup; the remaining proposed Preferences controls are disabled previews. The existing course connection dialog remains available from Preferences and Materials.
- Course selection and simulated automatic/manual sync of pages and files, with separate libraries for two sample business courses.
- Search, source/type/date/module filters, sorting, list and grid views, and material previews.
- Create course modules directly in Materials. Creation uses a three-step wizard: choose a starting point, build the module plan, then review and create. Goal-first entry carries the typed goal forward and always shows the full course library. Suggested matches appear first with badges and explanations; instructors explicitly check the materials they want. A prominent Suggest matches action never changes those selections. Search and module/type filters preserve selection across views, and both the library and sticky wizard navigation show the selected count. No-match guidance keeps the library available, and the list scrolls within the wizard. Material-first entry lets instructors choose sources or a suggested group, then reviews a proposed learning goal derived from that selection. Title, goal, and chosen readings appear together at final review; nothing is saved until Create module. Back navigation preserves edits. Goals and readings can be left for later, and material assignment is an explicit final-review choice. Existing modules retain a direct edit form. Module titles display their automatic number, and empty titles explain why Create module is disabled. Drag handles and up/down controls reorder and renumber modules while stable identifiers preserve material and activity links. Edit module titles and goals later. Assign individual materials to one or several modules, or select materials for bulk assignment. Create a module inline while assigning, clear assignments, and filter by every assigned module. Modules persist per course and are available in uploads and Activity setup. Existing browser data retains its original assignments.
- Multi-file uploads with drag-and-drop and a mirrored demo Canvas Files list. Readable imports get an editable summary excerpt, labeled as an AI draft in this demo. Each material has optional instructor context and learning goals; suggested goals require explicit acceptance. Unreadable binary files show Needs context instead of invented summaries or objectives.
- Review organization suggestions against module goals. Each suggestion explains its match and offers Accept or Dismiss; accepted suggestions can add an assignment or explicitly replace existing assignments. No automatic moves occur.
- Activity setup can reuse the selected module’s learning goal. Generated readings retain the learning goal entered in the document wizard.
- Five-step document wizard: purpose, topics, document format/audience/length/tone, references, and review. Fields accept typed answers and sample AI suggestions.
- Side-by-side Markdown editor and live rendered document preview on desktop; stacked panes on mobile. Headings, emphasis, links, lists, and tables render in both the draft preview and saved documents.
- Editable generated draft saved to Materials. Draft activity creation and editing link selected materials to a course module in the Activity tab.
- Responsive layouts, horizontally scrollable app tabs on smaller screens, and browser-local persistence.

## Prototype boundaries

AI Setup, its trial ledger, and activity snapshots are browser-local prototype state. No model, real API key, admin identity, institution account, provider usage feed, or billing backend is connected. Credit checks govern the simulated instructor tools in this page; student-level token/request limits are saved configuration for a future conversation service. Demo snapshots do not translate the English reading generator or execute model prompts.

Canvas and AI integrations are simulated. Sync reads sample data and runs on course selection and app load, with a manual refresh option. No actual Canvas API, LTI installation, language model, student chat, publication, or analytics is connected. Goal/title suggestions and source grouping use deterministic keyword profiles, summaries are cleaned excerpts, and organization recommendations use keyword overlap against module goals. They illustrate the intended workflow rather than a live AI system. The document generator uses a template and selected source excerpts; it does not implement all format, length, or tone choices as a production model would.

Text, Markdown, and CSV uploads preserve text in local browser storage. Binary uploads retain metadata only; their original contents are not stored or downloadable. The preview download is a text representation, not the original file. Uploading mirrors entries only to the simulated Canvas Files list.

Course modules, material assignments, library metadata, text content, drafts, and activity links persist in localStorage in the current browser. They are not shared between users or devices. No live credentials are required. Instructor-only labels illustrate intended product behavior; this prototype has no authentication or authorization backend.

## Validation

Navigation checks cover exact branding/tab order, first-visit welcome, remembered tabs, written guides and wizard entry points, the AI usage shortcut, empty Results/model/key layouts, activity drafts, Preferences course connection, and mobile navigation.

AI Setup browser checks cover six sections, current/legacy tab routing, saved course defaults, old/new activity snapshots, explicit updates and locked/bounded overrides, per-action credits, a shared cross-course trial, exhaustion and manual work, pending summaries, request/admin approval, persistence, and mobile layouts.

Run `npm test` for migration, stable identity, readable/unreadable metadata, source grouping, and placement regression checks. Library browser checks cover no-match visibility, suggested-first ranking/badges/reasons, explicit selections, search and combined module/type filters, reset behavior, selection retention through filtering and back navigation, updated goals, mobile actions/sticky navigation, and final assignments. Browser checks additionally cover all three creation steps, distinct goal/material paths, explained reading matches, proposed source-grounded goals, back/edit preservation, final-review-only creation, assignment opt-out, duplicate and empty titles, cancellation, optional goal review, explicit placement acceptance, disabled-button guidance, module reordering with linked materials/activities, persistence, and mobile layouts.

Module-specific checks cover creation, duplicates, individual and bulk assignments, multiple modules per material, filters, unassignment, cancellation, reload/sync persistence, course isolation, upload/activity choices, and mobile layout. Production build and browser checks also cover search, the five-step wizard, saving drafts, uploading text files, the Files mirror, activity linking, persistence, course isolation, and mobile overflow.

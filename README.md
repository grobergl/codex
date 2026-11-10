# Study Chats · Materials

Interactive instructor mockup of Study Chats embedded in Canvas, using a sample business course.

## Open the mockup

Open `study-chats.html` directly in a modern browser. No installation or server is required. Download the repository ZIP and extract it first. The HTML file contains the entire app; optional web fonts need an internet connection.

## Develop

```sh
npm install
npm run dev
```

Build with `npm run build`. Regenerate the single-file demo with `npm run build:standalone`. The development server uses port 5173 by default.

## Included flows

- Canvas shell with Study Chats as the course navigation item and Materials, Activity, and Results tabs.
- Course selection and simulated automatic/manual sync of pages and files, with separate libraries for two sample business courses.
- Search, source/type/date/module filters, sorting, list and grid views, and material previews.
- Multi-file uploads with drag-and-drop and a mirrored demo Canvas Files list.
- Five-step document wizard: purpose, topics, document format/audience/length/tone, references, and review. Fields accept typed answers and sample AI suggestions.
- Side-by-side Markdown editor and live rendered document preview on desktop; stacked panes on mobile. Headings, emphasis, links, lists, and tables render in both the draft preview and saved documents.
- Editable generated draft saved to Materials. Draft activity creation and editing link selected materials to a course module in the Activity tab.
- Results placeholder. Responsive layouts and browser-local persistence.

## Prototype boundaries

Canvas and AI integrations are simulated. Sync reads sample data and runs on course selection and app load, with a manual refresh option. No actual Canvas API, LTI installation, language model, student chat, publication, or analytics is connected. The document generator uses a template and selected source excerpts; it does not implement all format, length, or tone choices as a production model would.

Text, Markdown, and CSV uploads preserve text in local browser storage. Binary uploads retain metadata only; their original contents are not stored or downloadable. The preview download is a text representation, not the original file. Uploading mirrors entries only to the simulated Canvas Files list.

Library metadata, text content, drafts, and activity links persist in localStorage in the current browser. They are not shared between users or devices. No live credentials are required. Instructor-only labels illustrate intended product behavior; this prototype has no authentication or authorization backend.

## Validation

Production build and browser checks cover search, the five-step wizard, saving drafts, uploading text files, the Files mirror, activity linking, persistence, course isolation, and mobile overflow.

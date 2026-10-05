# Validation

**Short public demonstration · October 5, 2026**

## Completed checks

`npm run check` passes nineteen checks:

- The inherited review contains 3 source variants, 4 component groups and 9 uniquely identified options. One group uses multiple selection.
- All source references and replacement SVG assets resolve.
- The public content contains no original client identifiers, source links, credentials or backend connection.
- The JavaScript parses successfully.
- A fresh review blocks final approval and export.
- Single and multiple selections appear in the generated summary.
- Ordinary decision notes appear in the summary and export.
- Resolving all groups locks the content selection state while leaving Text QA incomplete.
- Ordinary approval retains any notes and captures a typed reference link.
- QA completion enables export; clearing confirmation blocks it.
- Export includes approved passages, decision notes, exclusions and source notes.
- Stored state restores the selected IDs and notes; reset clears only the demo’s own review key.
- Export still downloads when browser storage is unavailable.
- None of these clears approval and prevents export until resolved.
- Reference links validate their protocol and persist with review state.
- Attachment bytes and metadata are retained through a file-storage adapter; the export includes references.

These checks exercise actual state, summary and export functions in Node, with an in-memory IndexedDB adapter for file operations. They do not establish native browser-storage behavior, file-picker interactions or visual quality.

## Browser verification remains pending

The execution environment did not provide a usable local browser, and its cloud browser blocked local addresses and file URLs. The public demo has therefore **not yet received browser visual or interaction QA**.

Before publishing, open the demo and check:

1. Desktop and mobile layout, readable controls and no unintended horizontal scrolling.
2. Source/component previews, keyboard navigation and closing the preview.
3. Selecting options, editing notes and reopening the page with saved state.
4. Approval, exclusion and approval with notes and references.
5. Text QA confirmation, invalidation after editing, export download and resetting the demo.

Copying reference images depends on browser clipboard support. Text copying includes a fallback for contexts where the modern clipboard API is unavailable.

Additional alternative-approval checks cover approving a typed link or attached file, restoring that approval, exporting the alternative without crop-based text QA, and reopening the choice when its last reference is removed.

// Short public demonstration of the real review workflow.
window.VRS_FIXTURES = {
  "components": [
    {
      "id": "c01",
      "name": "Opening / Guide Description",
      "mode": "single",
      "description": "Single choice: choose one opening and select Approve.",
      "options": [
        {
          "id": "c01_a",
          "label": "A shared starting point",
          "sources": [
            1
          ],
          "src": 1,
          "crop": "assets/components/c01_a.svg",
          "text": "Creative work benefits from a shared starting point. This guide helps a small team clarify its purpose, compare possible directions and agree on the next step.",
          "sub": "Sources V1"
        },
        {
          "id": "c01_b",
          "label": "Make room for good work",
          "sources": [
            2
          ],
          "src": 2,
          "crop": "assets/components/c01_b.svg",
          "text": "Make room for good work. Agree on the question, explore a few useful alternatives and document the choice before producing the final materials.",
          "sub": "Sources V2"
        }
      ]
    },
    {
      "id": "c04",
      "name": "Featured Callouts",
      "mode": "multi",
      "description": "Multiple choice: retain one or more compatible callouts and approve them together.",
      "options": [
        {
          "id": "c04_q1",
          "label": "Clarity before production",
          "sources": [
            1,
            3
          ],
          "src": 1,
          "crop": "assets/components/c04_q1.svg",
          "text": "A clear decision is a useful production input.",
          "sub": "Sources V1, V3"
        },
        {
          "id": "c04_q2",
          "label": "Document the reasoning",
          "sources": [
            1
          ],
          "src": 1,
          "crop": "assets/components/c04_q2.svg",
          "text": "Keep the reasoning alongside the choice.",
          "sub": "Sources V1"
        },
        {
          "id": "c04_q3",
          "label": "Ask one useful question",
          "sources": [
            2
          ],
          "src": 2,
          "crop": "assets/components/c04_q3.svg",
          "text": "Ask the question that changes the next step.",
          "sub": "Sources V2"
        }
      ]
    },
    {
      "id": "c08",
      "name": "Application / Team Use",
      "mode": "single",
      "description": "Notes and references: choose a passage, optionally add a note or link, and select Approve.",
      "options": [
        {
          "id": "c08_v1",
          "label": "A short team review",
          "sources": [
            1
          ],
          "src": 1,
          "crop": "assets/components/c08_v1.svg",
          "text": "Before the meeting, gather the alternatives. During the review, decide by component. After the meeting, verify the selected wording and export the brief.",
          "sub": "Sources V1"
        },
        {
          "id": "c08_v4",
          "label": "A production handoff",
          "sources": [
            3
          ],
          "src": 3,
          "crop": "assets/components/c08_v4.svg",
          "text": "Use the approved summary as a content reference. Check every selected passage, document exceptions and keep layout decisions separate.",
          "sub": "Sources V3"
        }
      ]
    },
    {
      "id": "c05",
      "name": "About the Method",
      "mode": "single",
      "description": "Optional content: exclude this component if the opening already explains the method, or select and approve a supporting passage.",
      "options": [
        {
          "id": "c05_v2",
          "label": "A review method",
          "sources": [
            2
          ],
          "src": 2,
          "crop": "assets/components/c05_v2.svg",
          "text": "This method organizes existing alternatives into a small set of reviewable questions. The team keeps the useful differences and removes repetition before production.",
          "sub": "Sources V2"
        },
        {
          "id": "c05_v46",
          "label": "Supporting callout",
          "sources": [
            3
          ],
          "src": 3,
          "crop": "assets/components/c05_v46.svg",
          "text": "Organize the alternatives before asking for a decision.",
          "sub": "Sources V3"
        }
      ]
    }
  ],
  "sources": [
    {
      "id": 1,
      "label": "V1",
      "file": "Creative Collaboration — draft 1.svg",
      "drive": "assets/sources/v1.svg",
      "thumb": "assets/sources/v1.svg",
      "hi": "assets/sources/v1.svg"
    },
    {
      "id": 2,
      "label": "V2",
      "file": "Creative Collaboration — draft 2.svg",
      "drive": "assets/sources/v2.svg",
      "thumb": "assets/sources/v2.svg",
      "hi": "assets/sources/v2.svg"
    },
    {
      "id": 3,
      "label": "V3",
      "file": "Creative Collaboration — draft 3.svg",
      "drive": "assets/sources/v3.svg",
      "thumb": "assets/sources/v3.svg",
      "hi": "assets/sources/v3.svg"
    }
  ]
};

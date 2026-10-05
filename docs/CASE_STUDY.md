# Variant Reconciliation System

## Building a production workflow for an editable, AI-originated book

**Laura Mujica · 2026**  
Client project · Visual identity, content reconciliation and editorial production

I was hired as a **Senior Graphic Designer** to develop the visual identity and editable book. The assignment expanded into content systems, workflow design, web prototyping, automation research and QA testing. My interest in understanding and improving creative processes led me to take on these additional areas.

My years in graphic design, together with my knowledge of web development, UX/UI and QA testing, helped me define usable interactions, understand technical dependencies and evaluate successive experiments. AI generated the code; I directed the implementation, specified the behavior and assessed the results. The client’s identity and source material are omitted from this public account.

## The objective and the source material

The client wanted to turn page images they had generated with AI into a physical book. The production files needed to be editable so that the client could change text or replace an image later. The brief therefore included reconstructing the pages as an editable editorial document, with live text, vector elements where applicable and replaceable image assets.

The book comprised **six volumes, numbered 0–5**. Volume 0 contained the editorial guidance and design-system material. It became the source from which I developed the VIS. Each of the other five volumes contained **more than twenty pages**, and each page had **between two and nine versions**.

Those versions varied in content, layout, logo treatment and typography. Typefaces could look similar without being the same, and a different page composition could also contain different wording or sections. Across more than one hundred content pages, there was no single, settled reference that could simply be reproduced throughout the book.

The pages often looked convincing on screen, but their image quality and dimensions were not suitable for the intended printed output. Their appearance did not establish whether the text would remain legible at physical size, whether assets had sufficient resolution, or whether the files could meet the printer’s production requirements.

The intended print run was **20–50 copies**. The project combined identity development, content review, editable book production and preparation for that print run within a limited time and budget.

## Three connected deliverables within one project

The work had three distinct deliverables: **the identity manual, the review board and the book**. Each addressed a different production dependency.

| Deliverable | Purpose | My work |
| --- | --- | --- |
| Visual Identity System and identity manual | Establish consistent visual and editorial rules across all volumes. | Extracted and consolidated the guidance in Volume 0 into a usable VIS for typography, color, logo application, hierarchy and supporting visual elements. |
| Variant Reconciliation System, with the Variant Decision Board as its interface | Establish which content should move into production when each page has several competing versions. | Audited the alternatives, structured the decisions and developed a tool for review, notes, approval and a checked content handoff. |
| Editable book and print-production preparation | Rebuild and assemble the approved material into an editable document and prepare suitable output for a 20–50-copy run. | Worked on editorial layout, page assembly, editable reconstruction and production tests; the remit also included coordinating with the printer to confirm imposition requirements and final output specifications. |

The VIS defined how the book should look. The review system established what it should contain. Book assembly and print preparation addressed how that material could become an editable, reproducible physical publication.

These deliverables competed for the same limited project hours and budget. Their dependencies made it necessary to resolve visual rules and content choices before committing to extensive page reconstruction.

## Creating the VIS from Volume 0

I read the design-system and editorial material in Volume 0 and consolidated it into a VIS covering typography, text hierarchy, color, logo use and supporting elements. The generated pages across the other volumes did not apply those rules consistently, so the identity manual provided a common reference for assessing variants and rebuilding approved content.

Creating that reference did not automatically resolve every asset or layout decision. Later production tests still exposed gaps, including the need for a more fully specified icon family and clearer rules for reconstructing certain page elements.

## The observation that led to the VRS

The review tool emerged from the book-production problem. With two to nine alternatives per page, I needed a way to help the client settle content before I invested time in rebuilding it as editable artwork.

A whole-page choice was too coarse. One version could have the strongest opening while another contained the preferred sequence or a useful supporting section. Treating every difference as a separate decision was also inefficient: repeated wording did not need repeated approval, and complementary content did not always need to compete.

I distinguished between:

- Competing definitions that required a single choice.
- Compatible material that could be selected together.
- Repeated content that could be represented once with several source references.
- Supporting content that could be excluded deliberately.
- Feedback that required a specific note or wording instruction.

This became the basis of the **Variant Reconciliation System**. The **Variant Decision Board** was its review interface.

## Designing the process before the interface

The VRS workflow began with preparing the source material, before it reached the review interface:

1. **Identify sections:** read each page as components—such as an introduction, a sequence or a callout—and locate corresponding sections across variants.
2. **Recognize and extract text:** recover wording from the flattened images, keep its source references and check it against the originals. AI-assisted recognition and Python-supported image and file processing helped prepare these inputs.
3. **Reconcile the alternatives:** identify duplicates, competing wording and compatible passages, then organize meaningful choices with text and image crops for review.
4. **Review and verify:** record selections and notes in the board, check the approved text and export a production reference.

I understood the relationship between these steps well enough to specify inputs, direct AI-generated scripts and evaluate their outputs. Source analysis and extraction were preparation work; the web board used the prepared dataset rather than automatically recognizing new uploads.

The audit also informed the questions shown to the reviewer. One pilot review contained **seven source variants, thirteen component groups and fifty-five options**. These figures describe a single review set within the larger book project, rather than its total volume of material.

The system kept the complete sources available while exposing a more focused view of their components. Source notes and decision notes served different purposes: an observation on a draft was not automatically treated as a formal approval decision.

## Building a functional review tool

I defined the review behavior and guided implementation using ChatGPT and Claude. My web-development and UX/UI knowledge informed navigation, component selection, feedback and approval states; QA testing informed checks for persistence, export and regressions. The interface used HTML, CSS and JavaScript.

The prototype evolved through repeated development iterations, from browser-local storage to shared data in Firebase Firestore, with online access through Vercel. This made the review accessible outside my machine and allowed selections, notes, review state and activity to be retained. The deployment and persistence work were tested during the project; the public demonstration uses local storage.

The VRS review flowed through five connected views:

| View | What it makes possible |
| --- | --- |
| Source variants | Inspect the full references and capture observations. |
| Component decisions | Select content, approve it with context or exclude it. |
| Approved summary | See which material has been retained and inspect its wording. |
| Review activity | Follow recorded decisions and actions. |
| Producer/admin workflow | Verify extracted text and prepare the content handoff. |

Approval and text QA were separate. An approved crop identifies the intended material; its extraction still needs to be checked. The export gate required the review to be resolved and the applicable text checks to be confirmed.

Combining material remained a human editorial task. Multi-selection could preserve compatible passages, and notes could describe how wording should be combined. The application did not automatically write a merged final text.

## Editable book production and printer coordination

Content approval was an input to book production. The next step required rebuilding the selected material in InDesign, applying the VIS, arranging pages and spreads, and keeping the text and relevant visual elements editable.

A flattened AI-generated page does not provide separate text frames, vector icons, replaceable illustrations or reliable typographic styles. Recovering those elements required extraction and reconstruction. Text converted to outlines would also fail the client’s need to make ordinary wording changes, even if the resulting file was technically vector-based.

I investigated how to separate the text from the visual assets, structure it by component and place it into an editable document. The work combined editorial judgment with technical questions about typography, image quality, physical scale and scripted page assembly.

Printer coordination was another part of the production scope. The intended 20–50-copy run required confirming the printer’s expectations for imposition and final files, then relating those requirements to the document setup and export process. Trim size, bleed, margins, safe areas, page sequence, image resolution and color output were production constraints to establish and verify.

Print tests and specification work informed the pilot. A successful on-screen reconstruction still needed to be checked at its intended physical size and against the requirements of the printed object.

## Working files and technical handoffs

The workflow connected several file types, each with a practical purpose:

| Format | Use in the project |
| --- | --- |
| Markdown (`.md`) | Extracted and approved content, visual rules, findings and handoff documentation. |
| JSON (`.json`) | Structured component data, page positions and instructions for scripted assembly. |
| Python (`.py`) | AI-generated scripts supporting image and file processing, preparation and checks. |
| ExtendScript (`.jsx`) | InDesign scripts for placing text and assembling editable page elements. |
| InDesign (`.indd`) and editable PDF | Editable reconstruction prototypes, design assets and production reviews. |
| High-resolution PNG (`.png`) | Generated or regenerated visual assets, including transparent assets, and rendered output checks. |

My contribution was understanding how these files connected, defining what each stage needed and checking whether the resulting output met the design and production criteria.

## Testing the production boundary

The approved content workflow produced a Markdown reference for the pilot. An early InDesign script used approved text and other references to assemble editable text, but it still had overflow and incomplete visual assets.

A later investigation asked a different question: could a single flattened page image become an independently editable InDesign page while retaining its appearance?

Four approaches were tested across three source images, including vector conversion, scripted reconstruction and hybrid text-and-asset assembly. Regional analysis, structured component data and scripts produced useful editable text and first page assemblies. Some builds reported no overflowing text or missing links, while visual review still found incorrect placement, inconsistent icons, missing decorative details and typography differences.

The single-image tests did not use the VDB application or its approved decisions as per-page inputs. They reused the method of reading a page by component and structuring its text before assembly. This distinction matters when assessing what each experiment established.

## Final assessment and specialist handoff

After reviewing the sample-page tests, I consolidated the technical checks and visual findings into a final feasibility assessment. Partial editability had been demonstrated, but the missing assets, inconsistent visual rules and correction work prevented a reliable process for completing all six volumes within the agreed time and budget.

I communicated that conclusion to the client and recommended handing the production-automation work to an **InDesign automation specialist**. I prepared a client-facing report and a technical handoff covering the tested approaches, available files, unresolved requirements and next steps. This closed my phase with documented evidence and a route for continuation.

## Results

The project produced a VIS derived from Volume 0, a working review prototype, organized content decisions, an approved pilot content reference, documented production rules, editable reconstruction tests and a specialist handoff.

| Workstream | Established outcome |
| --- | --- |
| Identity manual / VIS | A consolidated visual identity reference based on the book’s foundational volume. |
| VRS / review board | A functioning system for reviewing variants, recording decisions and preparing checked content for a pilot. |
| Book / production | Pilot layouts, print-related specifications and editable reconstruction experiments that revealed the requirements and limits of a scalable production approach. The complete six-volume editable book and final print run were not established outcomes. |

No verified time-saving percentage or full-book production rate was established. The outcome is best supported by the working system, the approved content artifacts and the documented tests.

## What this project shows about my work

The project shows how I combined senior design experience with technical understanding to move between identity, content, interfaces, testing and physical production. I could direct AI-assisted implementation, explore alternatives and judge their usefulness because I understood the workflow and its dependencies. That judgment also informed the final decision to recommend specialist support.

## About the public demonstration

The demo presents the VRS review workflow, preserving the working prototype’s source/component relationships and selection modes. Client content, images, identity, links and data connections have been replaced. Its *Creative Collaboration* material is a demonstration dataset, not a claim of work for another client.

The public adaptation also makes the producer workflow directly accessible, adds a demo reset and checks that editing approved text invalidates its QA confirmation. It illustrates the system’s operation while keeping the original project separate.

---

**Laura Mujica · 2026 ⚡**  
[lauramujica.com](https://lauramujica.com/)

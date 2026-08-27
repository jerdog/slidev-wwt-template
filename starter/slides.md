---
theme: wwt
title: Make a new world happen
info: Sample deck for the slidev-theme-wwt package.
layout: cover
subtitle: A WWT-branded Slidev starter — every layout in one deck.
presenterName: Your Name
presenterRole: Solutions Architect, World Wide Technology
date: 2026
---

---
layout: speaker
title: Meet your speakers
speakers:
  - name: Priya Raman
    role: Principal Engineer
    company: World Wide Technology
    socials:
      bluesky: "@priyaraman.dev"
      github: priyaraman
      linkedin: priyaraman
    orgs:
      - CNCF Ambassador
      - name: DevOpsDays Chicago
  - name: Marcus Webb
    role: Solutions Architect
    company: World Wide Technology
    socials:
      mastodon: "@marcuswebb@fosstodon.org"
      github: marcuswebb
---

---
layout: agenda
items:
  - Why this template exists
  - How to use it
  - What's in the box
  - Make it your own
---

---
layout: section
number: "01"
title: Why this template exists
---

---
layout: default
title: Why this template exists
---

# Why this template exists

World Wide Technology helps the world's most ambitious companies deliver
business outcomes. This Slidev template gives WWT teams a fast, on-brand
way to author technical presentations in Markdown.

- Author once in Markdown, present anywhere
- Brand-compliant out of the box
- Inter as a Roobert stand-in — swap in your licensed copy when ready
- Export to PDF for handoff

---
layout: default
title: How to use it
---

# How to use it

1. Clone this repo and run `pnpm install`
2. Open `slides.md` and start writing
3. Use `pnpm dev` to preview, `pnpm export` to ship a PDF

---
layout: two-cols
title: Built for speed
---

# Built for speed

::left::

Author in Markdown — every layout responds to frontmatter so you spend zero
time fighting slide masters.

::right::

Run `pnpm dev` and Slidev rebuilds in milliseconds. Ship a PDF with
`pnpm export` when you're ready to hand it off.

---
layout: stats
title: By the numbers
stats:
  - value: "19"
    label: layouts
    caption: every common business slide pattern
  - value: "1"
    label: command
    caption: pnpm dev to preview
  - value: "0"
    label: license fees
    caption: Inter as the Roobert stand-in
---

---
layout: quote
attribution: WWT customer
role: Fortune 100 retailer
---

Markdown-first authoring shaved a full day off our quarterly business review
prep — and the deck still looks like a real WWT deck.

---
layout: team
title: Your team
members:
  - name: Avery Chen
    role: Engagement Lead
  - name: Jordan Patel
    role: Principal Architect
  - name: Riley Okonkwo
    role: Solutions Engineer
  - name: Sam Rivera
    role: Customer Success
---

---
layout: section
number: "02"
title: How we deliver
---

---
layout: code-focus
title: Author in Markdown
---

```ts
// slides.md frontmatter drives every layout
const slide = {
  layout: "stats",
  stats: [
    { value: "19", label: "layouts" },
    { value: "1", label: "command" },
  ],
};
```

---
layout: customer-quote
quote: We rebuilt our annual customer review in two days instead of two weeks — and it actually looked like a WWT deck.
name: Anonymous customer
role: VP, Engineering
---

---
layout: comparison
title: Markdown vs slide-master decks
left:
  title: Slide-master deck
  points:
    - Drag boxes around for hours
    - Inconsistent typography
    - Version control unfriendly
right:
  title: Markdown deck
  points:
    - Write content, not layout
    - On-brand by default
    - Pull-request-friendly
---

Source: internal WWT authoring retro, 2026

::left::

_Fine for a one-off internal update._

::right::

_What every recurring deck should use._

---
layout: timeline
title: Engagement milestones
events:
  - date: Week 0
    label: Kickoff
    detail: Goals and stakeholders aligned.
  - date: Week 2
    label: Discovery
    detail: Architecture and risks captured.
  - date: Week 6
    label: Build
    detail: Iterative delivery with weekly demos.
  - date: Week 10
    label: Launch
    detail: Operational handoff and runbook.
---

---
layout: process
title: How we deliver
steps:
  - title: Listen
    detail: We start with your business outcomes.
  - title: Architect
    detail: Reference architectures grounded in lab-tested patterns.
  - title: Deliver
    detail: Iterative builds with continuous demos.
  - title: Operate
    detail: Runbooks, handoff, and ongoing support.
---

---
layout: image-feature
title: Capability spotlight
side: right
image: /wwt-gradient-rule.png
imageAlt: Sample placeholder — replace with your screenshot.
---

# Capability spotlight

Drop a screenshot, demo capture, or hero image alongside a short paragraph.
The frontmatter `side` key flips the image between left and right.

---
layout: image-full
image: /bg-section-gradient.jpeg
headline: One world. One team.
imageAlt: WWT section break visual.
---

---
layout: demo
title: Live preview
src: /bg-section-gradient.jpeg
caption: Sample placeholder — drop in your product screenshot or set `iframe: true` for an embedded URL.
---

---
layout: default
title: Recap
---

# Recap

- 19 WWT-branded layouts ready to compose
- Light and dark modes with one keystroke (`D`)
- AutoAnimate reveals on agenda, timeline, stats, team, process
- Author in Markdown, ship a PDF

---
layout: thank-you
speakers:
  - name: Priya Raman
    socials:
      bluesky: "@priyaraman.dev"
      github: priyaraman
  - name: Marcus Webb
    socials:
      mastodon: "@marcuswebb@fosstodon.org"
      github: marcuswebb
slidesUrl: wwt.com/talks/make-a-new-world-happen
---

---
layout: end
---

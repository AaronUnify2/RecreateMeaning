# RecreateMeaning

The repository behind **THE POST IDEALIST** — Aaron's site of tools, articles
and fiction. Despite the repo name, the site's name is the one in
`content.json`, and that's what it's called in conversation.

Unlike UnifyVersion1, this is **not** a pile of standalone pages. It's one
content-driven site: a renderer, a JSON index, and a folder of content files.

## How it fits together

| File           | What it is                                              |
|----------------|---------------------------------------------------------|
| `home.html`    | The site. The whole renderer, in one file.               |
| `content.json` | The index — site meta, tools, articles, the novel.       |
| `articles/`    | One JSON file per article.                               |
| `tools/`       | One JSON file per tool write-up.                         |
| `viz.js`       | Interactive widgets that articles embed by name.         |
| `drafts/`      | Markdown not on the site. See `drafts/README.md`.        |

No build step, no `package.json`, no npm. React 18.2.0, ReactDOM and
Babel-standalone 7.23.9 load from cdnjs at pinned versions, and the whole app
is one `<script type="text/babel">` block in `home.html`. Keep it that way.

## `home.html` is the live one

There are four: `home.html`, `home1.html`, `home2.html`, `home3.html`.
**`home.html` is the site** — confirmed live, September 2026. The other three
are older drafts kept around.

This matters because of how the split works:

- **Content changes appear in all four automatically.** They all fetch the same
  `content.json` and the same `articles/*.json`.
- **Code changes only exist where you put them.** Banners, section types and
  renderer fixes go in `home.html` unless told otherwise.

An unknown section type falls through to `return null`, so a newer section type
used in an article just doesn't render in the older variants. It degrades
quietly rather than breaking.

> **TO DECIDE (Aaron):** whether the other three should be kept in sync,
> retired, or left as-is. Until this says otherwise, edit `home.html` only and
> mention the others in the summary.

## Adding an article

Two steps, always.

**1.** Write `articles/<slug>.json`:

```json
{
  "title": "The Fifth Slice",
  "subtitle": "A short article about knowing when to stop",
  "date": "2026-03-15",
  "category": "Economics",
  "readTime": "5 min",
  "sections": [
    { "type": "text", "content": "A paragraph." }
  ]
}
```

**2.** Append an entry to the `articles` array in `content.json`:

```json
{ "id": "fifth-slice", "title": "The Fifth Slice", "subtitle": "…",
  "date": "2026-03-15", "category": "Economics",
  "file": "articles/fifth-slice.json" }
```

Notes that bite:

- **Append to the end.** The Articles page renders in array order, not by date.
  (The home feed sorts by date; the Articles page doesn't.)
- **`hideFeed: true` only if the piece also has a banner.** It suppresses the
  plain feed row so a promoted piece doesn't appear twice. Everything else
  belongs in the feed, so leave it off. (This reverses the old "hideFeed on
  every article" rule, which left the feed empty — see Banners.)
- `readTime` is estimated at roughly 225 words per minute, rounded.
- Keep `content.json` formatted as it is — one entry per line. Edit it as text;
  don't reformat the whole file by round-tripping it through a JSON dumper.

## Section types

| Type         | Fields                              | Renders as                          |
|--------------|-------------------------------------|-------------------------------------|
| `text`       | `content`                           | Body paragraph                      |
| `heading`    | `content`                           | Orange section heading              |
| `note`       | `content`                           | Small italic aside                  |
| `plug`       | `content`, `url`, `label`, `color`  | Dashed rule + link button at the foot |
| `viz`        | `module`                            | A widget from `viz.js`              |
| `screenshot` | `number`, `title`, `style`, `content` | Framed box; styles: `text`, `lines`, `chat`, `algorithm` |

`viz` modules currently registered in `viz.js`: `pizza-slider`, `oven-sim`,
`hegemonica-system`, `compound-sim`, `ripple-sim`, `intervention-quadrant`.
A `viz` naming a module that doesn't exist renders nothing.

Interactive fiction is a different shape: set `"interactive": true`, a `start`
scene id, and a `scenes` object instead of `sections`. See `lone-clown.json`.

**Scene art.** An interactive piece can add `"sceneArt": "<key>"`. Then
`SCENE_ART[key]` in `home.html` supplies two things, both drawn from the shared
sprites in `CK`:

- `scenes[sceneId] = { draw, before }` (or a list of them, for a long scene)
  is an animated pixel-art panel on a 190×80 grid at 3×. It sits above the first paragraph that starts with
  `before`, or at the top if there's no `before`. The clock only runs while the
  panel is at least half on screen, so an action (a knife throw) happens when
  the reader gets to it. Anchoring to text rather than an index means
  inserting paragraphs doesn't move the art.
- `intros[sceneId]` is a full-screen 190×107 "▶▶ FAST FWD" interlude that
  plays on the way *into* that scene, about three seconds long. A click skips
  it. Going back from a dead end plays the matching "◀◀ REWIND" (`CK.rewind`).

Reduced-motion users get a still frame and no interludes. The Lone Clown is the
only piece that uses this. Dead ends are where the horror goes, and the
scolding text stays as the punchline.

Shared machinery in `CK` worth reusing: `layer` caches anything static
(backgrounds are drawn once, not per frame), `gradient`/`dither` give
ordered-dithered skies and light pools instead of flat bands, `fx`/`post` add
vignette and grain, and `sil` draws any sprite as a flat silhouette for shadows.

House style for this piece: the horror sits in small wrong details rather than
gore. His shadow is a full clown before he is, the windscreen reflection already
grins, the stars rearrange, the crucifix freezes mid-swing. Keep flashes slow
(nothing under about half a second) and his lit face only part-visible.

The genre shifts on purpose. Page one (`opening`) reads like literary fiction,
and its panel is drawn like the cover of one: flat colour, paper texture, no
grain, but in the same dusk palette as page two so the two pages match. Its subject is the man who watches and doesn't help. Page two (`door`)
turns into a romance, with pink light, sparkles and Claire blushing, though his
shadow on the wall is already a clown. The horror starts with the van. Keep each
page's art in its own genre.

The opening is two scenes, `opening` and `door`, joined by a single choice, and
the ending is two, `finale` and `christmas`, joined the same way.
A scene with exactly one choice drops the "What does Claire do?" header.

Scale matters: a person is about 24px tall, so the van is 70×30, a car 58×19
and the barn door 32px tall. The van interior is drawn from Claire's seat,
with him in profile against his window, the wheel edge-on and her phone in her
lap.

## Inline markup

Two tags work inside any `content` string:

- `[R]text[/R]` — blacked-out redaction.
- `[I]text[/I]` — invisible until the reader hovers it.

## Categories

In use: **Economics**, **Finance**, **Strategy**, **Essay**,
**Interactive Fiction**.

The first three have series pages with prev/next navigation between articles in
that category. Anything else is standalone — "Back to articles" returns to the
list. That's fine; not every piece needs to be in a series.

## Routing

Views have addresses, handled by `parseHash`/`buildHash` in `home.html`:

```
#/articles/<id>   #/tools/<id>   #/articles   #/tools   #/novel   #/about   #/
```

`parseHash` reads the hash on mount and on `hashchange`; an effect in `App`
mirrors the current view back with `replaceState`, so in-app clicking doesn't
pile up history entries and Back still leaves the site. A bare `#<id>` is read
as an article id and rewritten to the canonical form. An unknown id falls
through to the list view.

This is in `home.html` only — `home1/2/3.html` ignore the hash.

Two things follow from it: any view can be linked directly, and **unlisting a
piece from the nav doesn't make it unreachable** — `#/novel` still works.

## Banners

A hand-written animated `<canvas>` component in `home.html`, stacked at the top
of the feed in `HomePage`.

**Banners are for the two flagships and the three series — five in total.** The
Lone Clown and Problems Are the Main Show lead, then Econ, Finance, Strategy.
Individual tools get an ordinary feed row, not a banner.

This is a real constraint, not a default: the page once carried ten banners and
no feed at all, and promoting everything promoted nothing. Adding a sixth means
deciding which of the five stops being a banner.

Several banner components are written, working and deliberately **not** stacked:
`LanternBanner`, `ClipboardBanner`, `ProcessMapperBanner`, `ForestBanner`,
`TommySpaceBanner`, `BrickBreakerBanner`, `BigfootShoeBanner`. Leave them
defined — they're the parked set, and re-promoting a piece is a one-line change.

The house pattern, worth matching: 570×150 canvas, a caption bar underneath
with title, one-line tagline in the accent colour, and a small `READ`/`OPEN`
chip on the right. Wrap in `<div onClick={onClick}>` for an article, or an `<a>`
with the real URL for a tool. Always `cancelAnimationFrame` on cleanup.

Make the animation say something about the piece rather than decorating it.
`ProblemsBanner` is a reasonable model — it's the essay's opening argument, not
a pattern that happens to look nice.

## Tools

Same two-step shape: `tools/<id>.json` plus an entry in the `tools` array. Tool
JSON adds `description`, `tech`, `status`, `url` and `color`, and its `sections`
support an `interactive` type.

**The tools themselves live in UnifyVersion1**, not here. They're linked by
absolute URL (`https://aaronunify2.github.io/UnifyVersion1/<file>.html`). This
repo holds the write-up, not the app.

## Leave alone

`articles/origin-of-ideas.json` exists on disk but is deliberately **not**
listed in `content.json`. That's intentional. Don't wire it in.

Everything in `drafts/` is the same: unposted prose, kept deliberately. Don't
convert a draft to `articles/<slug>.json` as tidying — that conversion *is*
publishing, and it waits for Aaron to say the piece is ready. `drafts/README.md`
tracks what's in there and what each one still needs.

The same goes for four tool write-ups kept on disk and unlisted, pending a
decision about where children's and games content belongs: `tools/tommypop.json`,
`tools/tommyspace.json`, `tools/brick-breaker.json`, `tools/mystic-forest.json`.
They read as a different site next to the essays. Note that `brick-breaker.json`
promises "upcoming articles on economics" that don't exist — that IOU needs
resolving before it goes back.

`BIGFOOT'S SHOE` is parked the same way: `content.json` still carries the novel
and its rotating synopsis, and `NovelPage` still renders at `#/novel`, but there's
no nav tab and no feed row while `chapters` is empty.

> **TO DECIDE (Aaron):** whether the parked tools return under a separate
> section, move to UnifyVersion1, or stay out.

## Aaron's writing is Aaron's

When posting an essay, post it **verbatim**. One `text` section per paragraph.
Don't add headings, don't tighten sentences, don't restructure. If a piece would
genuinely read better with headings, say so and let him decide — don't just do
it. Verify the text round-trips against the source before committing.

Framing written *around* the piece — a subtitle, a banner tagline, a `plug` —
is yours to draft, and he'll tell you if it's wrong.

## Testing

There's no build step, so nothing catches a broken edit before it's live. Two
checks that work and are worth doing every time:

**Syntax.** Extract the `<script type="text/babel">` block and parse it with
espree (bundled with the global eslint install), with `ecmaFeatures: { jsx: true }`.
This catches any splice that breaks the file.

**Canvas work.** Extract the render function into a small standalone harness
with a frame-stepping hook, load it in Chromium via Playwright, and screenshot
key frames. You can verify the drawing properly this way, and read pixel stats
back to confirm the animation actually does what you claim.

In Claude Code web sessions the network policy has *usually* blocked cdnjs,
npm and `github.io`, so React never loads. Check first with
`curl -sS -o /dev/null -w "%{http_code}" https://cdnjs.cloudflare.com/...`.
If it answers 200, download the three pinned files with curl, serve the repo
with `python3 -m http.server`, and use Playwright `page.route` to answer the
cdnjs requests from the local copies. That mounts the real page (this worked in
October 2026). If cdnjs is blocked, say so plainly: the drawing is verified, the
React mount isn't.

## Workflow

- Develop on the assigned branch, commit with a clear message.
- Merge to `main` when done. **No pull request** unless Aaron asks.
- GitHub Pages serves `main`. There's no workflow file in this repo (unlike
  UnifyVersion1) — Pages is configured in repo settings — and changes are live
  within a minute or two.
- Send him the live URL afterwards:

```
https://aaronunify2.github.io/RecreateMeaning/home.html
```

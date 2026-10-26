# AGENTS.md

Static collection of HTML/CSS course practice pages (《高级网页设计》). No build system, no tests, no package manager, no git repo — open files directly in a browser or serve with any static server (e.g. `python -m http.server`).

## Structure

- `index.html` is the hub page cataloging every practice page as a card. When adding a page, add a matching card link there. **Rule: every new HTML file must have a corresponding hyperlink added to `index.html`.**
- Practice pages follow `N-M.html` (chapter-page, e.g. `3-2.html`, `10-4.html`); one legacy file uses `2.2.html`. Keep the convention for new pages.
- `css.css` is a shared stylesheet but is only linked by `5-1.html`. All other pages use inline `<style>` — keep new page styles inline, don't introduce shared CSS.
- Images live in `image/` and are referenced with relative paths (`image/1.jpg` or `./image/1.jpg`).

## File Header Comment

- **Rule: every newly created HTML file must include a header comment inside `<head>` (right after `<title>`).** The comment must contain, in Chinese: 作者「侯雅月」、建立时间（creation timestamp）、使用的大模型（model name）、功能名称（page feature name）. Example:
  ```html
  <!--
    作者：侯雅月
    建立时间：2026-10-26 13:53:33
    使用的大模型：GLM-5.3-Flash
    功能名称：数7游戏（逢七过）
  -->
  ```

## Naming Convention

- All CSS class names, id names, and JS variables must start with `hou_ya_yue_`.

## Prompt Log

- Before executing any task, append the prompt to `hou_ya_yue_prompt.md`. Include timestamp, model name, and the full prompt text. Never overwrite existing content — always append.

## Gotchas

- Some filenames contain Chinese characters and spaces (e.g. `7-1 上图下文.html`). Links to them in `index.html` must be URL-encoded (`7-1%20%E4%B8%8A%E5%9B%BE%E4%B8%8B%E6%96%87.html`) — copy the existing encoding pattern when adding such links.
- Content (titles, comments, alt text) is in Chinese; preserve the language when editing.

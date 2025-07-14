# Reveal.js Template for Uppsala University

You can open a running example of this template [here](https://StephanSpengler.github.io/revealjs-uu/) or download all neccessary files as a zip archive [here](https://github.com/StephanSpengler/revealjs-uu/archive/refs/heads/master.zip).

## Usage Hints <!-- .element: class="make-fragment" -->

- For general information about reveal.js, check out their [documentation](https://revealjs.com/). 
  - Reveal.js is configured in `theme-uu/init.js`.
- All paragraphs and list items are revealed as fragments.
  - This behaviour can also be configured in `theme-uu/init.js`.
- All headers are centred, everything else is left-aligned.
  - This can be changed in `theme-uu/theme-uu.css`.
- To change the information in the slide footer, look for the `<footer>` tag at the bottom of `index.html`.
- To use markdown files as slides, you need to serve the web page from a webserver.
  - e.g. locally by running `python3 -m http.server 8000`, accessible via `http://localhost:8000`
- All default plugins are enabled, particularly $\LaTeX$ math: $f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$.
// make all paragraphs and list items fragments
Reveal.addEventListener("ready", () =>
    document.querySelectorAll("section p, section li, *[fragment], .make-fragment").forEach(
        li => li.classList.add("fragment")
    )
);

Reveal.initialize({
    // see https://revealjs.com/config/
    controls: false,
    hash: true,
    center: false,
    transition: "convex",

    // see https://revealjs.com/presentation-size/
    width: 1920,
    height: 1080,
    margin: 0.2,

    // see https://revealjs.com/plugins/
    plugins: [RevealHighlight, RevealMarkdown, RevealMath, RevealNotes, RevealSearch, RevealZoom],
});
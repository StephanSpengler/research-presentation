// make all paragraphs and list items fragments
Reveal.addEventListener("ready", () =>{
    document.querySelectorAll("*[fragment], .make-fragment, .make-fragments>*").forEach(
        element => element.classList.add("fragment")
    );
    document.querySelectorAll(".no-fragment, .no-fragments>*").forEach(
        element => element.classList.remove("fragment")
    );
});

Reveal.initialize({
    // see https://revealjs.com/config/
    controls: false,
    hash: true,
    center: false,
    transition: "convex",

    // see https://revealjs.com/presentation-size/
    width: 1280,
    height: 720,
    margin: 0.2,

    // see https://revealjs.com/plugins/
    plugins: [RevealHighlight, RevealMarkdown, RevealMath, RevealNotes, RevealSearch, RevealZoom],
});

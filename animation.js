function highlight(element) {
    element.classList.remove("highlight-animate");
    void element.offsetWidth; // trigger reflow
    element.classList.add("highlight-animate");
}

function addFragments(section, count) {
    for (let i = 0; i < count; i++) {
        const span = document.createElement("span");
        span.classList.add("fragment");
        section.appendChild(span);
    }
}

{
    // INTRO-SC
    const section = document.getElementById("intro-sc");
    const varX = section.querySelector("#var-x");
    const varY = section.querySelector("#var-y");
    const assignX = section.querySelector("#assign-x");
    const assignY = section.querySelector("#assign-y");
    const readA = section.querySelector("#read-a");
    const readB = section.querySelector("#read-b");
    const commentA = section.querySelector("#comment-a");
    const commentB = section.querySelector("#comment-b");
    const assumeA = section.querySelector("#assume-a");
    const assumeB = section.querySelector("#assume-b");
    const criticalX = section.querySelector("#critical-x");
    const criticalY = section.querySelector("#critical-y");

    addFragments(section, 5);

    Reveal.on("fragmentshown", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            assignX.classList.remove("active");
            varX.textContent = "x = 1";
            highlight(varX);
            readA.classList.add("active");
        }
        if (idx == 1) {
            readA.classList.remove("active");
            commentA.style.display = "inline";
            assumeA.classList.add("active");
        }
        if (idx == 2) {
            assumeA.classList.remove("active");
            criticalX.classList.add("active");
        }
        if (idx == 3) {
            assignY.classList.remove("active");
            varY.textContent = "y = 1";
            highlight(varY);
            readB.classList.add("active");
        }
        if (idx == 4) {
            readB.classList.remove("active");
            commentB.style.display = "inline";
            assumeB.classList.add("active");
        }
    });

    Reveal.on("fragmenthidden", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            assignX.classList.add("active");
            varX.textContent = "x = 0";
            readA.classList.remove("active");
        }
        if (idx == 1) {
            readA.classList.add("active");
            commentA.style.display = "none";
            assumeA.classList.remove("active");
        }
        if (idx == 2) {
            assumeA.classList.add("active");
            criticalX.classList.remove("active");
        }
        if (idx == 3) {
            assignY.classList.add("active");
            varY.textContent = "y = 0";
            readB.classList.remove("active");
        }
        if (idx == 4) {
            readB.classList.add("active");
            commentB.style.display = "none";
            assumeB.classList.remove("active");
        }
    });
}

{
    // INTRO-TSO
    const section = document.getElementById("intro-tso");
    const varX = section.querySelector("#var-x");
    const varY = section.querySelector("#var-y");
    const assignX = section.querySelector("#assign-x");
    const assignY = section.querySelector("#assign-y");
    const readA = section.querySelector("#read-a");
    const readB = section.querySelector("#read-b");
    const commentA = section.querySelector("#comment-a");
    const commentB = section.querySelector("#comment-b");
    const assumeA = section.querySelector("#assume-a");
    const assumeB = section.querySelector("#assume-b");
    const criticalX = section.querySelector("#critical-x");
    const criticalY = section.querySelector("#critical-y");
    const buffer1 = section.querySelector("#buffer-1");
    const buffer2 = section.querySelector("#buffer-2");

    addFragments(section, 6);

    Reveal.on("fragmentshown", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            assignX.classList.remove("active");
            const code = document.createElement("code");
            code.textContent = "⟨x = 1⟩";
            buffer1.appendChild(code);
            highlight(code);
            readA.classList.add("active");
        }
        if (idx == 1) {
            readA.classList.remove("active");
            commentA.style.display = "inline";
            assumeA.classList.add("active");
        }
        if (idx == 2) {
            assumeA.classList.remove("active");
            criticalX.classList.add("active");
        }
        if (idx == 3) {
            assignY.classList.remove("active");
            const code = document.createElement("code");
            code.textContent = "⟨y = 1⟩";
            buffer2.appendChild(code);
            highlight(code);
            readB.classList.add("active");
        }
        if (idx == 4) {
            readB.classList.remove("active");
            commentB.style.display = "inline";
            assumeB.classList.add("active");
        }
        if (idx == 5) {
            assumeB.classList.remove("active");
            criticalY.classList.add("active");
        }
    });

    Reveal.on("fragmenthidden", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            assignX.classList.add("active");
            buffer1.innerHTML = "";
            readA.classList.remove("active");
        }
        if (idx == 1) {
            readA.classList.add("active");
            commentA.style.display = "none";
            assumeA.classList.remove("active");
        }
        if (idx == 2) {
            assumeA.classList.add("active");
            criticalX.classList.remove("active");
        }
        if (idx == 3) {
            assignY.classList.add("active");
            buffer2.innerHTML = "";
            readB.classList.remove("active");
        }
        if (idx == 4) {
            readB.classList.add("active");
            commentB.style.display = "none";
            assumeB.classList.remove("active");
        }
        if (idx == 5) {
            assumeB.classList.add("active");
            criticalY.classList.remove("active");
        }
    });
}
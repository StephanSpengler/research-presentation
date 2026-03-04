function highlight(element) {
    element.classList.remove("highlight-animate");
    void element.offsetWidth; // trigger reflow
    element.classList.add("highlight-animate");
}

function vanish(element) {
    element.classList.add("vanish");
    element.addEventListener("animationend", () => {
        element.style.display = "none";
        element.classList.remove("vanish");
    }, { once: true });
}

function addFragments(section, count) {
    for (let i = 0; i < count; i++) {
        const span = document.createElement("span");
        span.classList.add("fragment");
        section.appendChild(span);
    }
}

function addToBuffer(buffer, text) {
    const code = document.createElement("code");
    code.textContent = text;
    buffer.appendChild(code);
    highlight(code);
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
            addToBuffer(buffer1, "⟨x = 1⟩");
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


{
    // TSO-SEMANTICS
    const section = document.getElementById("tso-semantics");
    const varX = section.querySelector("#var-x");
    const varY = section.querySelector("#var-y");
    const varZ = section.querySelector("#var-z");
    // P1
    const assignX = section.querySelector("#assign-x");
    const assignY = section.querySelector("#assign-y");
    const readA = section.querySelector("#read-a");
    const commentA = section.querySelector("#comment-a");
    const readB = section.querySelector("#read-b");
    const commentB = section.querySelector("#comment-b");
    const readC = section.querySelector("#read-c");
    const commentC = section.querySelector("#comment-c");
    const continued1 = section.querySelector("#continued-1");
    const buffer1 = section.querySelector("#buffer-1");
    // P2
    const readD = section.querySelector("#read-d");
    const commentD = section.querySelector("#comment-d");
    const readE = section.querySelector("#read-e");
    const commentE = section.querySelector("#comment-e");
    const continued2 = section.querySelector("#continued-2");
    const buffer2 = section.querySelector("#buffer-2");

    addFragments(section, 8);

    Reveal.on("fragmentshown", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            assignX.classList.remove("active");
            addToBuffer(buffer1, "⟨x = 1⟩");
            assignY.classList.add("active");
        }
        if (idx == 1) {
            assignY.classList.remove("active");
            addToBuffer(buffer1, "⟨y = 2⟩");
            readA.classList.add("active");
        }
        if (idx == 2) {
            readA.classList.remove("active");
            commentA.style.display = "inline";
            readB.classList.add("active");
        }
        if (idx == 3) {
            readB.classList.remove("active");
            commentB.style.display = "inline";
            readC.classList.add("active");
        }
        if (idx == 4) {
            readD.classList.remove("active");
            commentD.style.display = "inline";
            readE.classList.add("active");
        }
        if (idx == 5) {
            vanish(buffer1.children[0]);
            varX.textContent = "x = 1";
            highlight(varX);
        }
        if (idx == 6) {
            readC.classList.remove("active");
            commentC.style.display = "inline";
            continued1.classList.add("active");
        }
        if (idx == 7) {
            readE.classList.remove("active");
            commentE.style.display = "inline";
            continued2.classList.add("active");
        }
    });

    Reveal.on("fragmenthidden", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            assignX.classList.add("active");
            buffer1.removeChild(buffer1.lastChild);
            assignY.classList.remove("active");
        }
        if (idx == 1) {
            assignY.classList.add("active");
            buffer1.removeChild(buffer1.lastChild);
            readA.classList.remove("active");
        }
        if (idx == 2) {
            readA.classList.add("active");
            commentA.style.display = "none";
            readB.classList.remove("active");
        }
        if (idx == 3) {
            readB.classList.add("active");
            commentB.style.display = "none";
            readC.classList.remove("active");
        }
        if (idx == 4) {
            readD.classList.add("active");
            commentD.style.display = "none";
            readE.classList.remove("active");
        }
        if (idx == 5) {
            buffer1.children[0].style.display = "inherit";
            varX.textContent = "x = 0";
        }
        if (idx == 6) {
            readC.classList.add("active");
            commentC.style.display = "none";
            continued1.classList.remove("active");
        }
        if (idx == 7) {
            readE.classList.add("active");
            commentE.style.display = "none";
            continued2.classList.remove("active");
        }
    });
}
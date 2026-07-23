function highlight(element) {
    element.classList.remove("highlight-animate");
    void element.offsetWidth; // trigger reflow
    element.classList.add("highlight-animate");
}

function vanish(element) {
    element.classList.add("vanish");
    element.addEventListener("animationend", () => element.remove(), { once: true });
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
    code.innerHTML = text;
    buffer.appendChild(code);
    highlight(code);
}

function addToSequence(sequence, text) {
    if (!sequence) return;
    const div = document.createElement("code");
    div.innerHTML = text;
    sequence.appendChild(div);
    highlight(div);
}

function animateRDMA(section) {
    const lines = section.querySelectorAll(".code>div");
    const buffers = section.querySelectorAll(".fifo-box.inner");
    const vars = section.querySelectorAll(".straight code");
    const seq = section.querySelector("#event-sequence");

    addFragments(section, 8);
    Reveal.on("fragmentshown", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            lines[0].classList.remove("active");
            addToBuffer(buffers[0], `⟨${lines[0].innerHTML}⟩`);
            lines[1].classList.add("active");
        }
        if (idx == 1) {
            vanish(buffers[0].lastChild);
            addToBuffer(buffers[1], `⟨${lines[0].innerHTML}⟩`);
        }
        if (idx == 2) {
            vanish(buffers[1].lastChild);
            addToBuffer(buffers[2], `⟨y = 1⟩`);
            addToSequence(seq, "R(w, 1)");
            lines[1].classList.add("active");
        }
        if (idx == 3) {
            lines[1].classList.remove("active");
            addToBuffer(buffers[0], `⟨${lines[1].innerHTML}⟩`);
            lines[2].classList.add("active");
        }
        if (idx == 4) {
            lines[2].classList.remove("active");
            vars[0].textContent = "x = 2";
            highlight(vars[0]);
            addToSequence(seq, "W(x, 2)");
        }
        if (idx == 5) {
            vanish(buffers[0].lastChild);
            addToBuffer(buffers[1], `⟨${lines[1].innerHTML}⟩`.replace("x", "2"));
            addToSequence(seq, "R(x, 2)");
        }
        if (idx == 6) {
            vanish(buffers[1].lastChild);
            vars[2].textContent = "z = 2";
            highlight(vars[2]);
            addToSequence(seq, "W(z, 2)");
        }
        if (idx == 7) {
            vanish(buffers[2].lastChild);
            vars[1].textContent = "y = 1";
            highlight(vars[1]);
            addToSequence(seq, "W(y, 1)");
        }
    });

    Reveal.on("fragmenthidden", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            lines[0].classList.add("active");
            buffers[0].removeChild(buffers[0].lastChild);
            lines[1].classList.remove("active");
        }
        if (idx == 1) {
            addToBuffer(buffers[0], `⟨${lines[0].innerHTML}⟩`);
            buffers[1].removeChild(buffers[1].lastChild);
        }
        if (idx == 2) {
            addToBuffer(buffers[1], `⟨${lines[0].innerHTML}⟩`);
            buffers[2].removeChild(buffers[2].lastChild);
        }
        if (idx == 3) {
            lines[1].classList.add("active");
            buffers[0].removeChild(buffers[0].lastChild);
            lines[2].classList.remove("active");
        }
        if (idx == 4) {
            lines[2].classList.add("active");
            vars[0].textContent = "x = 0";
        }
        if (idx == 5) {
            addToBuffer(buffers[0], `⟨${lines[1].innerHTML}⟩`);
            buffers[1].removeChild(buffers[1].lastChild);
        }
        if (idx == 6) {
            addToBuffer(buffers[1], `⟨<span class="bar">z</span> = 2⟩`);
            vars[2].textContent = "z = 0";
        }
        if (idx == 7) {
            addToBuffer(buffers[2], `⟨y = 1⟩`);
            vars[1].textContent = "y = 0";
        }
        if (seq && idx >= 2 && idx <= 7 && idx != 3) {
            seq.removeChild(seq.lastChild);
        }
    });
}
animateRDMA(document.getElementById("rdma-example"));
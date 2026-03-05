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
    code.innerHTML = text;
    buffer.appendChild(code);
    highlight(code);
}

function addToSequence(sequence, text) {
    const div = document.createElement("div");
    div.innerHTML = text;
    sequence.appendChild(div);
    highlight(div);
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
    const assumeZ = section.querySelector("#assume-z");
    const assumeY = section.querySelector("#assume-y");
    const assumeX = section.querySelector("#assume-x");
    const mfence = section.querySelector("#mfence");
    const continued1 = section.querySelector("#continued-1");
    const buffer1 = section.querySelector("#buffer-1");
    // P2
    const assumeX0 = section.querySelector("#assume-x0");
    const assumeX1 = section.querySelector("#assume-x1");
    const continued2 = section.querySelector("#continued-2");
    const buffer2 = section.querySelector("#buffer-2");

    addFragments(section, 9);

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
            assumeZ.classList.add("active");
        }
        if (idx == 2) {
            assumeZ.classList.remove("active");
            assumeY.classList.add("active");
        }
        if (idx == 3) {
            assumeY.classList.remove("active");
            mfence.classList.add("active");
        }
        if (idx == 4) {
            assumeX0.classList.remove("active");
            assumeX1.classList.add("active");
        }
        if (idx == 5) {
            vanish(buffer1.children[0]);
            varX.textContent = "x = 1";
            highlight(varX);
        }
        if (idx == 6) {
            assumeX1.classList.remove("active");
            continued2.classList.add("active");
        }
        if (idx == 7) {
            vanish(buffer1.children[1]);
            varY.textContent = "y = 2";
            highlight(varY);
        }
        if (idx == 8) {
            mfence.classList.remove("active");
            continued1.classList.add("active");
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
            mfence.classList.remove("active");
        }
        if (idx == 7) {
            readE.classList.add("active");
            commentE.style.display = "none";
            continued2.classList.remove("active");
        }
        if (idx == 8) {
            buffer1.children[0].style.display = "inherit";
            varY.textContent = "y = 0";
        }
        if (idx == 9) {
            continued1.classList.remove("active");
            mfence.classList.add("active");
        }
    });
}

{
    // TSO-GAME-1-RUN-1
    const section = document.getElementById("tso-game-1-run-1");
    const varX = section.querySelector("#var-x");
    // P1
    const assignX1 = section.querySelector("#assign-x1");
    const assumeX1 = section.querySelector("#assume-x1");
    const end1 = section.querySelector("#end-1");
    const buffer1 = section.querySelector("#buffer-1");
    // P2
    const assignX2 = section.querySelector("#assign-x2");
    const end2 = section.querySelector("#end-2");
    const buffer2 = section.querySelector("#buffer-2");
    
    addFragments(section, 4);

    Reveal.on("fragmentshown", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            assignX1.classList.remove("active");
            addToBuffer(buffer1, "⟨x = 1⟩");
            assumeX1.classList.add("active");
        }
        if (idx == 1) {
            vanish(buffer1.children[0]);
            varX.textContent = "x = 1";
            highlight(varX);
        }
        if (idx == 2) {
            assignX2.classList.remove("active");
            addToBuffer(buffer2, "⟨x = 2⟩");
            end2.classList.add("active");
        }
        if (idx == 3) {
            vanish(buffer2.children[0]);
            varX.textContent = "x = 2";
            highlight(varX);
        }
    });

    Reveal.on("fragmenthidden", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            assignX1.classList.add("active");
            buffer1.removeChild(buffer1.lastChild);
            assumeX1.classList.remove("active");
        }
        if (idx == 1) {
            buffer1.children[0].style.display = "inherit";
            varX.textContent = "x = 0";
        }
        if (idx == 2) {
            assignX2.classList.add("active");
            buffer2.removeChild(buffer2.lastChild);
            end2.classList.remove("active");
        }
        if (idx == 3) {
            buffer2.children[0].style.display = "inherit";
            varX.textContent = "x = 0";
        }
    });
}

{
    // TSO-GAME-1-RUN-2
    const section = document.getElementById("tso-game-1-run-2");
    const varX = section.querySelector("#var-x");
    // P1
    const assignX1 = section.querySelector("#assign-x1");
    const assumeX1 = section.querySelector("#assume-x1");
    const end1 = section.querySelector("#end-1");
    const buffer1 = section.querySelector("#buffer-1");
    // P2
    const assignX2 = section.querySelector("#assign-x2");
    const end2 = section.querySelector("#end-2");
    const buffer2 = section.querySelector("#buffer-2");
    
    addFragments(section, 3);

    Reveal.on("fragmentshown", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            assignX1.classList.remove("active");
            addToBuffer(buffer1, "⟨x = 1⟩");
            assumeX1.classList.add("active");
        }
        if (idx == 1) {
            vanish(buffer1.children[0]);
            varX.textContent = "x = 1";
            highlight(varX);
        }
        if (idx == 2) {
            assumeX1.classList.remove("active");
            end1.classList.add("active");
        }
    });

    Reveal.on("fragmenthidden", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            assignX1.classList.add("active");
            buffer1.removeChild(buffer1.lastChild);
            assumeX1.classList.remove("active");
        }
        if (idx == 1) {
            buffer1.children[0].style.display = "inherit";
            varX.textContent = "x = 0";
        }
        if (idx == 2) {
            assumeX1.classList.add("active");
            end1.classList.remove("active");
        }
    });
}

{
    // TSO-GAME-2-RUN-1
    const section = document.getElementById("tso-game-2-run-1");
    const varX = section.querySelector("#var-x");
    // P1
    const assignX1 = section.querySelector("#assign-x1");
    const assumeX1 = section.querySelector("#assume-x1");
    const end1 = section.querySelector("#end-1");
    const buffer1 = section.querySelector("#buffer-1");
    // P2
    const assignX2 = section.querySelector("#assign-x2");
    const end2 = section.querySelector("#end-2");
    const buffer2 = section.querySelector("#buffer-2");
    
    addFragments(section, 5);

    Reveal.on("fragmentshown", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            assignX1.classList.remove("active");
            addToBuffer(buffer1, "⟨x = 1⟩");
            assumeX1.classList.add("active");
        }
        if (idx == 1) {
            vanish(buffer1.children[0]);
            varX.textContent = "x = 1";
            highlight(varX);
        }
        if (idx == 2) {
            assignX2.classList.remove("active");
            addToBuffer(buffer2, "⟨x = 2⟩");
            end2.classList.add("active");
        }
        if (idx == 3) {
            vanish(buffer2.children[0]);
            varX.textContent = "x = 2";
            highlight(varX);
        }
        if (idx == 4) {
            assumeX1.classList.remove("active");
            end1.classList.add("active");
        }
    });

    Reveal.on("fragmenthidden", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            assignX1.classList.add("active");
            buffer1.removeChild(buffer1.lastChild);
            assumeX1.classList.remove("active");
        }
        if (idx == 1) {
            buffer1.children[0].style.display = "inherit";
            varX.textContent = "x = 0";
        }
        if (idx == 2) {
            assignX2.classList.add("active");
            buffer2.removeChild(buffer2.lastChild);
            end2.classList.remove("active");
        }
        if (idx == 3) {
            buffer2.children[0].style.display = "inherit";
            varX.textContent = "x = 0";
        }
        if (idx == 4) {
            assumeX1.classList.add("active");
            end1.classList.remove("active");
        }
    });
}

{
    // TSO-GAME-2-RUN-2
    const section = document.getElementById("tso-game-2-run-2");
    const varX = section.querySelector("#var-x");
    // P1
    const assignX1 = section.querySelector("#assign-x1");
    const assumeX1 = section.querySelector("#assume-x1");
    const end1 = section.querySelector("#end-1");
    const buffer1 = section.querySelector("#buffer-1");
    // P2
    const assignX2 = section.querySelector("#assign-x2");
    const end2 = section.querySelector("#end-2");
    const buffer2 = section.querySelector("#buffer-2");
    
    addFragments(section, 2);

    Reveal.on("fragmentshown", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            assignX1.classList.remove("active");
            addToBuffer(buffer1, "⟨x = 1⟩");
            assumeX1.classList.add("active");
        }
        if (idx == 1) {
            assignX2.classList.remove("active");
            addToBuffer(buffer2, "⟨x = 2⟩");
            end2.classList.add("active");
        }
    });

    Reveal.on("fragmenthidden", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            assignX1.classList.add("active");
            buffer1.removeChild(buffer1.lastChild);
            assumeX1.classList.remove("active");
        }
        if (idx == 1) {
            assignX2.classList.add("active");
            buffer2.removeChild(buffer2.lastChild);
            end2.classList.remove("active");
        }
    });
}

{
    // PCS-REDUCTION
    const section = document.getElementById("pcs");
    const varX = section.querySelector("#var-x");
    const varY = section.querySelector("#var-y");
    const process1 = section.querySelectorAll(".code")[0].children;
    const process2 = section.querySelectorAll(".code")[1].children;
    const buffer1 = section.querySelector("#buffer-1");
    const buffer2 = section.querySelector("#buffer-2");

    addFragments(section, 9);
    
    Reveal.on("fragmentshown", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            process1[0].classList.remove("active");
            process1[1].classList.add("active");
        }
        if (idx == 1) {
            process1[1].classList.remove("active");
            addToBuffer(buffer1, "⟨x = m<sub>1</sub>⟩");
            process1[2].classList.add("active");
        }
        if (idx == 2) {
            process1[2].classList.remove("active");
            addToBuffer(buffer1, "⟨x = m<sub>2</sub>⟩");
            process1[3].classList.add("active");
        }
        if (idx == 3) {
            vanish(buffer1.children[0]);
            varX.innerHTML = "x = m<sub>1</sub>";
            highlight(varX);
        }
        if (idx == 4) {
            process2[0].classList.remove("active");
            process2[1].classList.add("active");
        }
        if (idx == 5) {
            process2[1].classList.remove("active");
            process2[2].classList.add("active");
        }
        if (idx == 6) {
            process2[2].classList.remove("active");
            addToBuffer(buffer2, "⟨y = m<sub>1</sub>⟩");
            process2[6].classList.add("active");
        }
        if (idx == 7) {
            vanish(buffer2.children[0]);
            varY.innerHTML = "y = m<sub>1</sub>";
            highlight(varY);
        }
        if (idx == 8) {
            process1[3].classList.remove("active");
            process1[4].classList.add("active");
        }
    });

    Reveal.on("fragmenthidden", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            process1[0].classList.add("active");
            process1[1].classList.remove("active");
        }
        if (idx == 1) {
            process1[1].classList.add("active");
            buffer1.removeChild(buffer1.lastChild);
            process1[2].classList.remove("active");
        }
        if (idx == 2) {
            process1[2].classList.add("active");
            buffer1.removeChild(buffer1.lastChild);
            process1[3].classList.remove("active");
        }
        if (idx == 3) {
            buffer1.children[0].style.display = "inherit";
            varX.innerHTML = "x = 0";
        }
        if (idx == 4) {
            process2[0].classList.add("active");
            process2[1].classList.remove("active");
        }
        if (idx == 5) {
            process2[1].classList.add("active");
            process2[2].classList.remove("active");
        }
        if (idx == 6) {
            process2[2].classList.add("active");
            buffer2.removeChild(buffer2.lastChild);
            process2[6].classList.remove("active");
        }
        if (idx == 7) {
            buffer2.children[0].style.display = "inherit";
            varY.innerHTML = "y = 0";
        }
        if (idx == 8) {
            process1[3].classList.add("active");
            process1[4].classList.remove("active");
        }
    });
}

{
    const section = document.getElementById("classical-data-flow");
    const file0 = section.querySelector("#file0");
    const file1 = section.querySelector("#file1");
    const file2 = section.querySelector("#file2");
    const file3 = section.querySelector("#file3");
    const file4 = section.querySelector("#file4");

    function moveTo(element, to) {
        const s = window.getComputedStyle(to);
        console.log(s.left, s.top);
        element.style.transform = `translateX(${window.getComputedStyle(to).left}) translateY(${window.getComputedStyle(to).top})`;
    }

    addFragments(section, 3);

    Reveal.on("fragmentshown", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0){
            file1.style.display = "inherit";
            moveTo(file0, file2);
        }
        if (idx == 1) {
            file2.style.display = "inherit";
            moveTo(file0, file3);
        }
        if (idx == 2) {
            file3.style.display = "inherit";
            moveTo(file0, file4);
        }
    });

    Reveal.on("fragmenthidden", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0){
            file2.style.display = "none";
            moveTo(file0, file1);
        }
        if (idx == 1) {
            file3.style.display = "none";
            moveTo(file0, file2);
        }
        if (idx == 2) {
            file4.style.display = "none";
            moveTo(file0, file3);
        }
    });
}

{
    const section = document.getElementById("rdma-data-flow");
    const file0 = section.querySelector("#file0");
    const file1 = section.querySelector("#file1");
    const file4 = section.querySelector("#file4");

    function moveTo(element, to) {
        const s = window.getComputedStyle(to);
        console.log(s.left, s.top);
        element.style.transform = `translateX(${window.getComputedStyle(to).left}) translateY(${window.getComputedStyle(to).top})`;
    }

    addFragments(section, 1);

    Reveal.on("fragmentshown", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0){
            file1.style.display = "inherit";
            moveTo(file0, file4);
        }
    });

    Reveal.on("fragmenthidden", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0){
            file4.style.display = "none";
            moveTo(file0, file1);
        }
    });
}

{
    const section = document.getElementById("rdma-violation");
    const lines = section.querySelectorAll(".code>div");
    const buffers = section.querySelectorAll(".fifo-box.inner");
    const vars = section.querySelectorAll(".straight code");
    const seq = section.querySelector("#event-sequence");

    addFragments(section, 6);
    Reveal.on("fragmentshown", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            lines[0].classList.remove("active");
            addToBuffer(buffers[2], `⟨y = 1⟩`);
            addToSequence(seq, "nrR(w, 1)");
            lines[1].classList.add("active");
        }
        if (idx == 1) {
            lines[1].classList.remove("active");
            addToBuffer(buffers[0], `⟨${lines[1].innerHTML}⟩`);
            lines[2].classList.add("active");
        }
        if (idx == 2) {
            lines[2].classList.remove("active");
            vars[0].textContent = "x = 2";
            highlight(vars[0]);
            addToSequence(seq, "lW(x, 2)");
        }
        if (idx == 3) {
            vanish(buffers[0].children[0]);
            addToBuffer(buffers[1], `⟨z = 2⟩`);
            addToSequence(seq, "nlR(x, 2)");
        }
        if (idx == 4) {
            vanish(buffers[1].children[0]);
            vars[2].textContent = "z = 2";
            highlight(vars[2]);
            addToSequence(seq, "nrW(z, 2)");
        }
        if (idx == 5) {
            vanish(buffers[2].children[0]);
            vars[1].textContent = "y = 1";
            highlight(vars[1]);
            addToSequence(seq, "nlW(y, 1)");
        }
    });

    Reveal.on("fragmenthidden", event => {
        if (Reveal.getCurrentSlide() !== section) return;
        const idx = event.fragment.dataset.fragmentIndex;
        if (idx == 0) {
            lines[0].classList.add("active");
            buffers[2].removeChild(buffers[2].lastChild);
            lines[1].classList.remove("active");
        }
        if (idx == 1) {
            lines[1].classList.add("active");
            buffers[0].removeChild(buffers[0].lastChild);
            lines[2].classList.remove("active");
        }
        if (idx == 2) {
            lines[2].classList.add("active");
            vars[0].textContent = "x = 0";
        }
        if (idx == 3) {
            addToBuffer(buffers[0], `⟨${lines[1].innerHTML}⟩`);
            buffers[1].removeChild(buffers[1].lastChild);
        }
        if (idx == 4) {
            addToBuffer(buffers[1], `⟨<span class="bar">z</span> = 2⟩`);
            vars[2].textContent = "z = 0";
        }
        if (idx == 5) {
            addToBuffer(buffers[2], `⟨y = 1⟩`);
            vars[1].textContent = "y = 0";
        }
        if (idx >= 0 && idx <= 5 && idx != 1) {
            seq.removeChild(seq.lastChild);
        }
    });
}
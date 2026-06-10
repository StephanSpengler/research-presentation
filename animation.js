class Thread {
    constructor(name) {
        this.name = name;
        this.code = [];
    }

    static build(name, builder) {
        const thread = new Thread(name);
        builder(thread);
        return thread;
    }

    assign(variable, value) {
        this.code.push({ type: "assign", variable, value });
    }
    assume(variable, value) {
        this.code.push({ type: "assume", variable, value });
    }
    comment(text) {
        this.code.push({ type: "comment", text });
    }
    mfence() {
        this.code.push({ type: "mfence" });
    }

    getDiv() {
        const div = document.createElement("div");
        div.classList.add("code");
        this.code.forEach(instruction => {
            const line = document.createElement("div");
            line.classList.add(instruction.type);
            line.textContent = this.getText(instruction);
            div.appendChild(line);
        });
        div.firstChild.classList.add("active");
        return div;
    }

    getText(instruction) {
        switch (instruction.type) {
            case "assign":
                return `${instruction.variable} := ${instruction.value}`;
            case "assume":
                return `assume(${instruction.variable} == ${instruction.value})`;
            case "comment":
                return `// ${instruction.text}`;
            case "mfence":
                return "mfence";
        }
    }
}

function makeProgram(
    sectionId, // section element id
    type, // sc / tso / rdma
    threadObjs, // [threadObj1, threadObj2, ...]
    variablesDesc, // [varDesc1, varDesc2, ...]
    computation, // (...threads) => void
) {
    const section = document.getElementById(sectionId);
    const program = section.querySelector(".program");
    program.classList.add("columns");

    const threads = document.createElement("div");
    threads.classList.add("threads");
    threadObjs.forEach(threadObj => {
        const thread = document.createElement("div");
        thread.dataset.name = threadObj.name;
        thread.classList.add("thread", "columns");
        thread.appendChild(threadObj.getDiv());
        if (type === "sc") {
            thread.appendChild(document.createElement("div"));
        }
        if (type === "tso") {
            const bufferOuter = document.createElement("div");
            bufferOuter.classList.add("buffer", "fifo-box", "outer");
            const bufferInner = document.createElement("div");
            bufferInner.classList.add("buffer", "fifo-box", "inner");
            bufferOuter.appendChild(bufferInner);
            thread.appendChild(bufferOuter);
        }
        if (type === "rdma") {
            // TODO: create three buffers
        }
        threads.appendChild(thread);
    });

    const memory = document.createElement("div");
    memory.classList.add("memory");
    const bottom = document.createElement("div");
    bottom.classList.add("bottom", "oval");
    const main = document.createElement("div");
    main.classList.add("main", "straight", "center");
    variablesDesc.forEach(([name, value]) => {
        const variable = document.createElement("code");
        variable.classList.add("variable");
        variable.textContent = `${name} = ${value}`;
        variable.dataset.name = name;
        main.appendChild(variable);
    });
    const top = document.createElement("div");
    top.classList.add("top", "oval", "center");
    top.textContent = "Memory";
    memory.append(bottom, main, top);

    program.append(threads, memory);

    function* execute(thread) {
        const threadDiv = threads.querySelector(`.thread[data-name="${thread.name}"]`);
        const lineDivs = threadDiv.querySelector(".code").children;
        const bufferDiv = threadDiv.querySelector(".buffer.inner");

        for (let lineIdx = 0; ; lineIdx++) {
            const fragmentId = section.querySelectorAll(".fragment").length;
            section.appendChild(document.createElement("span")).classList.add("fragment");
    
            const code = thread.code[lineIdx];
            const div = lineDivs[lineIdx];
            const next = lineDivs[lineIdx + 1];
            const varDiv = main.querySelector(`code[data-name="${code.variable}"]`);
            let previousMemory = "";

            const bufMsg = document.createElement("code");
            if (code.type === "assign" && type === "tso") {
                bufMsg.dataset.variable = code.variable;
                bufMsg.dataset.value = code.value;
                bufMsg.innerHTML = `⟨${code.variable} = ${code.value}⟩`;
                bufferDiv.appendChild(bufMsg);
                bufMsg.style.display = "none";
            }

            Reveal.addEventListener("fragmentshown", event => {
                if (Reveal.getCurrentSlide() !== section) return;
                if (event.fragment.dataset.fragmentIndex != fragmentId) return;
                div.classList.remove("active");
                next.classList.add("active");
                if (code.type === "assign") {
                    if (type === "sc") {
                        previousMemory = varDiv.innerHTML;
                        varDiv.innerHTML = `${code.variable} = ${code.value}`;
                        highlight(varDiv);
                    }
                    if (type === "tso") {
                        bufMsg.style.display = "inherit";
                        highlight(bufMsg);
                    }
                }
            });
            Reveal.addEventListener("fragmenthidden", event => {
                if (Reveal.getCurrentSlide() !== section) return;
                if (event.fragment.dataset.fragmentIndex != fragmentId) return;
                div.classList.add("active");
                next.classList.remove("active");
                if (code.type === "assign") {
                    if (type === "sc")
                        varDiv.innerHTML = previousMemory;
                    if (type === "tso")
                        bufMsg.style.display = "none";
                }
            });

            yield;
        }
    }

    function* update(thread) {
        const threadDiv = threads.querySelector(`.thread[data-name="${thread.name}"]`);
        const bufferDiv = threadDiv.querySelector(".buffer.inner");

        for (let bufMsgIdx = 0; ; bufMsgIdx++) {
            const bufferIdx = yield; // TODO: use to determine RDMA buffer
            
            const fragmentId = section.querySelectorAll(".fragment").length;
            section.appendChild(document.createElement("span")).classList.add("fragment");

            const bufMsg = bufferDiv.children[bufMsgIdx];
            const variable = bufMsg.dataset.variable;
            const value = bufMsg.dataset.value;
            const varDiv = main.querySelector(`code[data-name="${variable}"]`);
            let previousMemory = "";

            Reveal.addEventListener("fragmentshown", event => {
                if (Reveal.getCurrentSlide() !== section) return;
                if (event.fragment.dataset.fragmentIndex != fragmentId) return;
                vanish(bufMsg);
                previousMemory = varDiv.innerHTML;
                varDiv.innerHTML = `${variable} = ${value}`;
                highlight(varDiv);
            });
            Reveal.addEventListener("fragmenthidden", event => {
                if (Reveal.getCurrentSlide() !== section) return;
                if (event.fragment.dataset.fragmentIndex != fragmentId) return;
                bufMsg.style.display = "inherit";
                varDiv.innerHTML = previousMemory;
            });
        }
    }

    computation(...threadObjs.map(threadObj => {
        const genExecute = execute(threadObj);
        const genUpdate = update(threadObj);
        genUpdate.next(); // start the generator
        return {
            execute: () => genExecute.next(),
            update: bufferIdx => genUpdate.next(bufferIdx),
        };
    }));
}


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
    const div = document.createElement("div");
    div.innerHTML = text;
    sequence.appendChild(div);
    highlight(div);
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
            addToSequence(seq, "nrR(w, 1)");
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
            addToSequence(seq, "lW(x, 2)");
        }
        if (idx == 5) {
            vanish(buffers[0].lastChild);
            addToBuffer(buffers[1], `⟨${lines[1].innerHTML}⟩`.replace("x", "2"));
            addToSequence(seq, "nlR(x, 2)");
        }
        if (idx == 6) {
            vanish(buffers[1].lastChild);
            vars[2].textContent = "z = 2";
            highlight(vars[2]);
            addToSequence(seq, "nrW(z, 2)");
        }
        if (idx == 7) {
            vanish(buffers[2].lastChild);
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
animateRDMA(document.getElementById("rdma-violation"));
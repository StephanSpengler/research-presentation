## Verification of Weak Memory
<!-- .slide: class="centered bullet-unshift" -->
- Classical SC assumptions break:
    - Hardware reordering → unexpected behaviours
        - TSO: Delayed writes, outdated reads
    - Infinite-state effects
        - TSO: Unbounded buffers
- → Even simple programs become non-trivial.

---

## Central Questions of my Research
<!-- .slide: class="centered" -->
<br>

- When is verification decidable?
- Can we reduce infinite-state to analysable models?
- Can we identify structural patterns?
- What are complexity boundaries?
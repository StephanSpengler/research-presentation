## Verification of Weak Memory

Classical SC assumptions break:

- Hardware reordering → unexpected behaviours
    - TSO: Delayed writes, outdated reads
- Infinite-state effects
    - TSO: Unbounded buffers

→ Even simple programs become non-trivial.

---

## Theoretical Challenges

- Infinite state
- Non-local interactions
- Non-intuitive execution sequences
- Hard to reason algorithmically

---

## Central Research Questions

- When is verification decidable?
- Can we reduce infinite-state to analysable models?
- Can we identify structural patterns?
- What are complexity boundaries?

---

## My Research Direction

- Game-theoretic abstractions of weak memory
- Normal forms & canonical violations
- Decidability vs. undecidability
- Tight complexity classifications
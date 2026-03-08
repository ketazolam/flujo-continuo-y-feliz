

## Plan: Adjust Border Radius

Change the global `--radius` CSS variable from `0.75rem` (current) to `1rem` for a softer, more modern feel without being overly rounded.

**Single file change:** `src/index.css`
- Update `--radius: 0.75rem` → `--radius: 1rem`

This propagates automatically to all components via Tailwind's `rounded-lg`, `rounded-md`, `rounded-sm` utilities. Cards, buttons, inputs, badges — everything gets slightly softer corners.


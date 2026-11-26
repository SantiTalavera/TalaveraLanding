# Scroll performance review

The animated window clouds caused SVG layout and style work every frame, including while the Capabilities section was invisible. Full-viewport backdrop blurs also repeatedly processed the moving imagery. The hero's photo zoom added work during the transition between two full-screen scenes.

## Changes

- Window clouds use composited HTML transforms and opacity with a static mask aligned to the panoramic photo. The cursor remains aligned in SVG.
- CSS style queries pause and hide background effects only when the corresponding scroll-driven section is fully invisible. They resume on reverse scrolling. Existing stage timing and interaction rules are preserved.
- Vignette blur uses static image copies instead of repeatedly blurring the moving backdrop.
- The hero photo keeps a constant overscan during the staged transition; the section's scroll-linked fade and translation remain active.
- The panoramic photo is a JPEG of the same dimensions and framing, reduced from 1,691,045 to 118,141 bytes. It is decoded ahead of the first transition. The source PNG remains available.

## Verification

Compared in an isolated headless Chrome window at 1440 × 960 using 15 wheel events of 260 pixels. These are measurements of this local test, not device-independent FPS guarantees.

| Metric | Before | After |
| --- | ---: | ---: |
| Layout recalculations | 171 | 1 |
| 95th percentile animation-frame interval | 17.2 ms | 16.9 ms |
| Longest animation-frame interval | 300.1 ms | 83.4 ms |
| Intervals over 33.5 ms | 8 | 1 |

The remaining peak occurred on the first entry to Capabilities. The optimization reduces stutter rather than guaranteeing that every first frame meets a 16.7 ms budget.

Browser checks passed for forward and reverse wheel scrolling, anchor navigation, FAQ opening, pause/resume states at each stage, actual cloud movement in both scenes, the 390-pixel layout without horizontal overflow, and reduced-motion fallback. Build and lint passed.

FAQ answers retain their existing native internal scrolling when several open answers exceed the viewport; the wheel then reads the overflowing answers before returning to the main stage. This behavior was not changed by the rendering optimization.

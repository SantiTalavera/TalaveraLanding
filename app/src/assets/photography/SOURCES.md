# Photography

Locally stored photographic assets used as editorial context. These are not TALAVERA projects, clients, offices, or portfolio evidence.

- `architecture.jpg`: Sean Pollock / Unsplash, https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85
- `workplace.jpg`: Unsplash, https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85
- `systems-workspace.jpg`: Alexander Nrjwolf / Unsplash, https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-desk-ysZnFnexwRE — https://images.unsplash.com/photo-1641736494173-e7d5775121b2?auto=format&fit=crop&w=2800&q=90
- `systems-workspace-wide.png`: AI-assisted panoramic edit of `systems-workspace.jpg`, using the built-in image generation tool. Window and desk extended to open the framing; the original photographic asset remains available. Prompt: widen to a 2:1 photographic frame, make the laptop smaller on the right, show more window and city, preserve the room, avoid added objects or flat-color borders.
- `systems-workspace-wide.jpg`: optimized JPEG copy of the panoramic PNG, quality 90, same dimensions and framing. Used by the landing; the PNG is retained as the source.
- `workspace-sky-mask.svg`: code-native alpha mask aligned with the panoramic photo, allowing the window clouds to animate as composited HTML layers instead of repainting the SVG scene.
- `clouds.jpg`: Unsplash, https://images.unsplash.com/photo-1595949389862-dcc5a5945217?auto=format&fit=crop&w=1600&q=82
- `sky-mask.svg`: local feathered mask following the hero photograph's sky; used to keep cloud movement away from the buildings.
- `sky-mask.png`: current pixel-aligned sky mask generated from `architecture.jpg` by `app/scripts/create-hero-sky-mask.ps1`. Connected sky selection, explicit glass-facade exclusions and a small inward alpha feather. The mask and photo share the same size, crop and position on desktop and mobile. Supersedes the approximate SVG mask above.
- License: https://unsplash.com/license
- `city-evening.jpg`: Unsplash, https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2400&q=85 — street-level city photograph used as contextual imagery for the closing CTA.
- `workshop-table.jpg`: Unsplash, https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2200&q=85 — working table with computers, notebooks and people collaborating; current closing CTA background. Contextual stock photography, not a representation of TALAVERA's staff or premises.

The landing uses photography rather than the previous Three.js experiment. The earlier scene source files are retained, but are no longer imported by the hero.

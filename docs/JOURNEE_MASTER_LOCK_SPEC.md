# JOURNEE MASTER LOCK SPEC

This document is the permanent design governance source for Journee. It is mandatory for all future agents and contributors working in this repository.

Never override this file unless the user explicitly requests modification of the master specification itself.

## Purpose

Journee must remain a cinematic travel companion, not a generic SaaS product, dashboard shell, booking widget, or template marketplace. All future interface work must preserve the immersive travel atmosphere, editorial typography, controlled motion, spatial navigation, image-led storytelling, and quiet premium tone already established in the app.

This specification locks the visual and behavioral identity of the product so future edits do not accidentally flatten, redesign, or normalize the experience.

## Absolute Rules

- Do not redesign Journee from first principles.
- Do not replace the cinematic experience with SaaS, admin, dashboard, CRM, analytics, or productivity styling.
- Do not introduce visible slideshow controls, dots, arrows, thumbnails, progress bars, or carousel chrome to the homepage hero.
- Do not replace the homepage hero with a static marketing landing page.
- Do not remove the atmosphere layers, image rotation, cinematic background treatment, or editorial hero language.
- Do not change typography scale, font intent, text hierarchy, or uppercase micro-label treatment unless the user specifically asks to change the master spec.
- Do not compress navigation spacing into a dense app toolbar.
- Do not turn profile behavior into a generic account dropdown or utility-only account page.
- Do not remove destination-specific image rotation behavior.
- Do not make cards, panels, controls, and navigation feel like a B2B dashboard.
- Do not add decorative gradient blobs, generic SVG illustrations, flat icon grids, or template-style hero sections.

## Cinematic Identity

Journee is image-led, atmospheric, tactile, and transportive. The interface should feel like a premium travel film still combined with a calm planning companion.

Required qualities:

- Full-bleed or deeply integrated photographic imagery.
- Dark, layered, high-contrast surfaces with restrained warm gold accents.
- Soft glass, vignette, haze, grain, and atmosphere layers used to create depth.
- Editorial travel copy that feels specific, calm, and sensory.
- Motion that is slow, cinematic, and nearly invisible unless the user is paying attention.
- UI that supports discovery without drawing attention away from place, light, and mood.

Forbidden qualities:

- SaaS dashboards, large metric grids, flat admin panels, generic CRM shells, analytics surfaces, productivity-app styling, sterile white backgrounds, template hero sections, and obvious carousel UI.
- Loud gradients, purple-blue app theming, beige lifestyle palettes, over-rounded pill-heavy systems, and abstract illustration-first visuals.

## Homepage Lock

The homepage is locked as an immersive cinematic travel entry, not a conventional landing page.

Locked homepage behaviors:

- The homepage hero uses rotating destination imagery.
- The active hero slide advances automatically on a 60000 ms interval.
- The image transition is hidden and cinematic, using slow cross-fade behavior, not visible slideshow controls.
- The homepage must not expose dots, arrows, thumbnails, pagination, progress indicators, pause buttons, or any other visible slideshow UI.
- Scene text changes with the active image and should animate subtly through the existing scene text timing.
- The hero headline remains editorial and place-led. It must not become a SaaS value proposition headline.
- The search experience remains integrated below the cinematic hero with glass, blur, and warm action styling.
- The right-side quote panel remains a cinematic editorial companion on large screens.
- The homepage must retain a strong first-viewport sense of place and atmosphere.

Locked homepage timing:

- Hero scene rotation: 60000 ms.
- Cinematic image opacity transition: approximately 3200 ms.
- Scene text animation: approximately 3.2 s.
- Hero drift and atmospheric movement: slow, long-running motion in the 30 s to 50 s range.

Any change to these timings requires an explicit user request to modify this master specification.

## Cinematic Background Lock

The shared cinematic background system is a protected primitive.

Required behavior:

- Background imagery should remain full-bleed, object-cover, and behind all foreground interface.
- Background image changes must cross-fade quietly.
- Background image movement must remain slow and cinematic.
- Vignette, haze, glow, grain, and atmosphere layers must stay subtle and additive.
- Rich overlays may be tuned for readability, but must not make images look flat, washed out, or generic.
- Motion reduction support must be preserved.

Do not replace the cinematic background with flat gradients, blurred stock-photo panels, static color bands, or dashboard-style page shells.

## Atmosphere Lock

Destination atmosphere behavior is locked.

Required behavior:

- Destinations must retain atmosphere-specific treatment such as aurora, sakura, lantern, dust, rain, ocean, desert, snow, city, and garden.
- Atmosphere detection should remain destination-aware and scene-aware.
- Atmosphere layers must sit behind content and must not interfere with readability.
- Atmospheric movement should feel environmental, not decorative.
- Tokyo must retain city-specific atmosphere rather than being flattened into a generic Japan treatment.

Do not remove atmosphere layers to simplify layout unless the user explicitly asks to change the master specification.

## Typography Lock

Journee typography is editorial, cinematic, and high contrast.

Required behavior:

- Hero display typography remains large, cinematic, and expressive.
- Display headings use the established display heading classes and preserve the premium editorial tone.
- Micro-labels use restrained uppercase tracking and warm gold or muted white treatments.
- Body text remains calm, legible, and airy with generous line height.
- Navigation and controls use clean sans typography with strong but quiet weight.
- Do not scale all type down into dashboard density.
- Do not replace display type with generic SaaS headings.
- Do not introduce novelty travel fonts, faux-cultural type, or decorative script fonts.

Typography may be adjusted only to fix readability, responsiveness, clipping, or accessibility while preserving the established hierarchy.

## Navigation Lock

Journee navigation is spacious, cinematic, and integrated with the hero.

Required behavior:

- Desktop navigation preserves generous spacing, subtle underline behavior, and warm hover states.
- Search and notification controls stay circular, glassy, and visually quiet.
- The profile entry remains visible on supported desktop widths as a premium "My Journee" affordance.
- Mobile navigation remains horizontal, compact, and atmospheric without becoming a full dashboard sidebar.
- Navigation must not be compressed into a dense utility toolbar.

Do not replace the navigation with SaaS tabs, admin sidebars, dashboard breadcrumbs, or generic app-shell controls.

## Profile Behavior Lock

Profile behavior is locked as a cinematic traveler profile, not a generic account settings surface.

Required behavior:

- Profile entry points should preserve the "My Journee" concept and the premium traveler identity feel.
- Profile pages must foreground saved places, travel style, preferences, journey context, membership cues, privacy, and account settings in a travel-native way.
- Profile settings can exist, but they must remain embedded in the Journee atmosphere and not become a generic settings dashboard.
- Profile tabs and keyboard behavior should remain accessible.
- Avatar, initials, membership tier, and traveler summary behavior should remain visible and coherent.

Do not strip profile pages down to a plain account portal.

## Image Rotation Lock

Journee relies on destination-specific image rotation to avoid repeated, generic imagery.

Required behavior:

- Preserve the image rotation utilities and unique-image selection behavior.
- Destination imagery should be selected from the best available category and destination context.
- Repeated images on the same page should be avoided when the rotation system can prevent them.
- Images must show actual places, travel states, landscapes, streets, stays, routes, or destination details.
- Do not replace meaningful place imagery with abstract graphics, flat illustrations, or generic stock-like backgrounds.

## Slideshow UI Ban

Homepage image rotation is not a visible slideshow.

Forbidden:

- Carousel dots.
- Slide arrows.
- Thumbnail strips.
- Slide counters.
- Progress bars.
- Pause/play controls.
- Labels that describe the image rotation mechanism.
- Any visible UI whose purpose is to expose the hero as a slideshow.

The rotation should feel like the environment changing, not like a carousel component.

## Transition Lock

Journee transitions are slow, cinematic, and understated.

Required behavior:

- Image cross-fades should remain smooth and long.
- Hover states should feel premium and restrained.
- Cards can lift slightly, but should not jump, bounce, spin, flash, or feel playful in a game-like way.
- Text entrance should remain subtle.
- Atmosphere and background motion should stay slow.
- Reduced-motion behavior must be preserved.

Do not introduce fast app transitions, dashboard hover flashes, aggressive spring animations, or obvious slideshow movement.

## Layout And Spacing Lock

Journee layouts must feel breathable and cinematic while still functional.

Required behavior:

- Hero sections use generous height, layered depth, and strong foreground/background separation.
- Search and planning controls remain usable but atmospheric.
- Cards may exist for repeated destination or content items, but they must remain image-led and cinematic.
- Keep border radii restrained unless existing components require otherwise.
- Avoid nested cards and over-framed sections.
- Avoid dense dashboard grids as the default page structure.

## SaaS And Dashboard Styling Ban

Never style Journee as:

- A SaaS homepage.
- An admin dashboard.
- A CRM.
- A productivity tool.
- A metrics console.
- A generic travel booking widget.
- A white-label template marketplace.

When operational surfaces are necessary, they must still use Journee's cinematic shell, warm accents, atmospheric depth, and travel-native information design.

## Agent Compliance

Before changing UI, future agents must:

1. Read this file.
2. Identify whether the requested change touches any locked behavior.
3. Preserve locked behavior unless the user explicitly asks to modify this master specification.
4. Keep visual changes scoped to the requested surface.
5. Avoid replacing established primitives with generic alternatives.
6. Verify that homepage timing, image rotation, atmosphere behavior, typography, navigation spacing, profile behavior, and the visible slideshow UI ban remain intact when touched.

If a request conflicts with this specification, the agent must explain the conflict and ask whether the user wants to modify the master specification itself.


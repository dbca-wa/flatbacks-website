Custom module for the nws website to provide map block functions.

## What it does

1. **Interactive map block(s)**
   - Registers a `map_block` theme (`nws_misc_theme()`).
   - Provides a single block plugin — `MapBlock` (plugin id `nws_misc_map`) — that loads **node 68** (configurable via the block's `node_id` setting), reads its `field_content_map` paragraph field, and recurses into nested `field_children_map` paragraphs.
   - Each paragraph contributes `lat`, `lon`, `name`, a link, and a logo, rendered into a Leaflet/OpenStreetMap via `templates/map-block.html.twig`.
   - The Twig/JS builds a map centered on the Kimberley/Pilbara coast, adds an ISWAG marker, plots parent group markers, and reveals child markers when zoomed in past level 7.

2. **Views filter “remove pill” URL builder**
   - `nws_misc_preprocess_views_view()` intercepts four specific views: `peer_reviewed_research`, `primary`, `upper_secondary`, and `lower_secondary`.
   - It reads the active query-string filters (year, subject/category/course, etc.) and builds per-item URLs that remove just that one filter value while keeping the rest.
   - This is the classic “active filter chip with an X” pattern.

3. **Miscellaneous form UX / assets**
   - `js/main.js` adds “select all” checkbox behaviour for form IDs like `edit-field-elementary`, `edit-secondary`, etc., and syncs selections to hidden `field-school` checkboxes.
   - `css/main.css` provides a four-column layout and hides `fieldset#edit-field-school--wrapper`.

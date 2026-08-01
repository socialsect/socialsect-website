# Project Instructions

## Critical Rule

* Do not change any existing design, layout, styling, spacing, colors, typography, animations, functionality, routes, or page structure unless explicitly requested.
* Implement only the requested changes.
* Preserve all existing behavior.

## Task 1: Blog Author Integration

### Requirements

* All blog author information already exists in Sanity CMS.
* Fetch author data directly from Sanity.
* Display author information on every blog post.
* Create a dedicated author detail page.
* Author page should include:

  * Author name
  * Author image
  * Author bio
  * Social links (if available)
  * List of author's published articles


### Notes

* Do not hardcode author data.
* Use existing Sanity schema if available.
* Maintain current blog design.


---

## Task 2: Replace Published Date with Updated Date

### Current Behavior

* Blog pages currently display the publish date.

### Required Behavior

* Whenever a blog is updated, display the latest updated date instead of the original publish date.
* The displayed date should automatically reflect the most recent modification date from the CMS.

### Example

Current:
Published: Jan 10, 2026

After Update:
Updated: Jul 07, 2026

---

## Task 3: Insert Form Inside Blog Content

### Requirements

* Add a lead generation/contact form in the middle of every blog post.
* Form should appear approximately halfway through the article content.
* Form must be inserted dynamically.
* Existing content should remain unchanged.

### Notes

* Ensure the form is responsive.
* Maintain spacing consistent with the existing design.

---

## Task 4: Exit/Delay Popup Form

### Popup Requirements

Create a popup lead form with the following behavior:

### First Visit

* When a user lands on any page for the first time:

  * Wait 4–5 seconds.
  * Show the popup automatically.

### Page Navigation

* If the user navigates to another page:

  * Show the popup again after 30 seconds.

### Additional Rules

* Popup should not appear immediately.
* Popup should be fully responsive.
* Popup should have:

  * Close button
  * Overlay background
  * Smooth open/close animation

### Important

* Use localStorage or sessionStorage to track popup timing.
* Prevent popup spam.
* Maintain existing UI design.

--

## Development Rules

* Make minimal code changes.
* Reuse existing components where possible.
* Do not introduce unnecessary dependencies.
* Follow existing project architecture.
* Test all changes before completion.
* Preserve SEO and page performance.

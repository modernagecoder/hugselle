# Design Document

## Overview

The about modal auto-close issue is caused by event propagation and timing conflicts between the modal opening and closing handlers. The click event that opens the modal is bubbling through the DOM and triggering the overlay's click handler, which interprets it as a backdrop click and closes the modal immediately.

The solution involves properly managing event propagation and ensuring that the modal's close handlers are only active after the modal has fully opened and the triggering event has completed its propagation.

## Architecture

The fix will be implemented across two components:
- **NavigationComponent** (`src/components/navigation.js`): Handles the "About" button click and modal creation
- **AboutModalComponent** (`src/components/about-modal.js`): Manages the modal lifecycle and close handlers

## Components and Interfaces

### NavigationComponent Changes

**Current Issue:**
- The `showAboutModal()` method uses a 150ms timeout before appending the modal, but this doesn't prevent event propagation
- The click event from the About button continues to propagate after the modal is added

**Solution:**
- Add `e.stopPropagation()` to the About button click handler (already present but needs verification)
- Ensure the modal is added to the DOM immediately but with close handlers disabled initially
- Remove the arbitrary timeout that doesn't solve the root cause

### AboutModalComponent Changes

**Current Issue:**
- The overlay click handler is attached with a 200ms delay, but the triggering click event can still reach it
- Multiple timeouts create race conditions
- The overlay click handler doesn't properly distinguish between the triggering click and subsequent clicks

**Solution:**
1. **Deferred Handler Activation**: Use `requestAnimationFrame` and a flag to ensure close handlers are only active after the current event loop completes
2. **Event Timestamp Tracking**: Track when the modal was opened and ignore clicks that occur within a safe threshold
3. **Proper Event Stopping**: Ensure all click events within the modal content are stopped from propagating

## Data Models

### Modal State Tracking

```javascript
{
  isClosing: boolean,           // Existing - prevents multiple close attempts
  openTimestamp: number,        // New - tracks when modal was opened
  handlersActive: boolean       // New - tracks if close handlers are active
}
```

## Error Handling

### Edge Cases

1. **Rapid Clicking**: User clicks About button multiple times rapidly
   - Solution: Check if modal already exists before creating new one (already implemented)

2. **Mobile Touch Events**: Touch events may behave differently than click events
   - Solution: Use event timestamp checking which works for both click and touch

3. **Keyboard Navigation**: Users navigating with keyboard shouldn't trigger unexpected closes
   - Solution: Escape key handler remains separate and intentional

## Testing Strategy

### Manual Testing Scenarios

1. **Basic Open/Close**
   - Click About button → Modal opens and stays open
   - Click close button → Modal closes
   - Click backdrop → Modal closes
   - Press Escape → Modal closes

2. **Event Propagation**
   - Click About button → Wait 2 seconds → Verify modal is still open
   - Click About button → Immediately move mouse → Verify modal stays open
   - Click About button on mobile → Verify modal stays open

3. **Rapid Interaction**
   - Click About button twice rapidly → Only one modal appears
   - Click About button → Immediately click inside modal → Modal stays open
   - Click About button → Immediately click backdrop → Modal should stay open (within threshold)

4. **Mobile Menu Integration**
   - Open mobile menu → Click About → Verify mobile menu closes and modal opens
   - Open modal from mobile menu → Verify modal stays open

### Implementation Approach

The fix will use a combination of:
1. **Immediate Handler Attachment**: Attach handlers immediately but keep them inactive
2. **requestAnimationFrame**: Activate handlers after the browser has completed the current rendering frame
3. **Timestamp Checking**: Add a 300ms grace period where backdrop clicks are ignored
4. **Event Stopping**: Ensure proper `stopPropagation()` on all relevant events

This approach is more reliable than arbitrary timeouts because it's tied to the browser's event loop and rendering cycle.

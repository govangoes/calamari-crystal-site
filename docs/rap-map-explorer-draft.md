# Rap Map Explorer UX Draft

## Overview

- The Rap Map Explorer allows users to browse hip‑hop artists in a grid or list view and click an artist to view their top bars and a short bio.
- Seed the explorer with two artist entries (e.g., MF DOOM and Nas) wired up to the existing data model.

## Layout

- A toggle button to switch between grid and list layouts.
- A responsive container displaying artist cards (grid) or rows (list), each showing the artist’s name and a brief bio.
- A details panel below the list/grid that appears when an artist is selected, showing the artist’s name and their sample bars.

## Interaction

- By default, present artists in a grid view; users can switch to a list view using the toggle button.
- Clicking an artist card/row sets it as the selected artist and reveals the details panel with bars.
- Clicking another artist updates the details panel with the new artist’s information.

## Tests Outline

- **Render default view**: Ensure the page renders with the grid view and displays all seeded artists.
- **Toggle view**: Simulate clicking the view toggle and verify that the layout switches between grid and list.
- **Select artist**: Click on an artist and assert that the details panel shows the correct artist name and bars.
- **Switch artist**: After selecting one artist, select another and check that the details panel updates accordingly.
- **Data integration**: Mock the data model to provide artist data and verify that the explorer consumes it correctly.

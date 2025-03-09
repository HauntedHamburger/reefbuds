# ReefBuds Website

This repository contains the code for the ReefBuds website, showcasing their innovative biocrete solutions for marine environments.

## Content Section Component

The website includes a reusable content section component that can be used to display headings and paragraphs with different alignment options.

### Usage

To use the content section component, add the following HTML structure to your page:

```html
<div class="content-section content-section--[alignment]">
  <h2 class="content-section__heading type-heading-1">Your Heading</h2>
  <p class="content-section__text type-body-large">Your paragraph text goes here.</p>
</div>
```

Replace `[alignment]` with one of the following options:
- `left`: Left-aligned text (default for most reading scenarios)
- `center`: Center-aligned text (great for headlines and introductions)
- `right`: Right-aligned text (for specific design purposes)

### Features

- **Responsive Design**: The component is fully responsive and adapts to different screen sizes.
- **Animations**: Headings and paragraphs animate into view when they enter the viewport.
- **Accessibility**: The component is built with accessibility in mind, ensuring proper semantic structure.
- **Customizable**: The component can be easily customized by modifying the CSS variables.

### Demo

A demo page is available at `content-section-demo.html` that showcases all the different alignment options for the content section component.

## Development

### CSS Architecture

The CSS follows the SMACSS (Scalable and Modular Architecture for CSS) methodology, with files organized into the following categories:

- **Base**: Reset, typography, and variables
- **Layout**: Grid and container styles
- **Modules**: Component-specific styles
- **State**: Animation and interactive states

### JavaScript

The JavaScript code handles the following functionality:

- Scroll animations for the content sections
- Navigation menu toggle
- Gallery functionality
- Header behavior on scroll

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
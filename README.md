# react-grid-ui

A React implementation of a dynamic and exportable grid layout.

[![forthebadge](https://forthebadge.com/images/badges/uses-badges.svg)](https://forthebadge.com)

## Getting started

Perform `npm install` and `npm start` to run.

The web application is then available at `http://localhost:3000`.

## Challenge 1

Since for the first part we need an immutable grid we are only dealing with the grid validation here. The `ImmutableGrid` component is taking a grid specification from props and based on that it generates an appropriate column structure. The grid specification, containing data about the column widths, is validated before render and if it doesn't conform to requirements the component returns `Grid specification passed is invalid` with the passed configuration.

I have added `minColumnWidth`, `maxColumnWidth` and `maxGridWidth` to allow the grid definition to be more flexible and reusable - the props determine the minimum and maximum size of a single column, as well as the overall size of the grid.

## Challenge 2

In Challenge 2 I am extending `ImmutableGrid` to support dynamic add and remove of columns in a new component, `MutableGrid`. Because we want to modify the existing component we need to store the grid specification in state - I am doing this using the `useState` hook, which controls the `columns` stateful variable. Then I also have added buttons, which trigger the add and remove of columns. Each button activates a recalculation of the grid specification. Because we are using `ImmutableGrid` as a child component to render the grid, we are also getting the validation from Challenge 1.

I am also adding an `id` prop to each column part of the new grid component, since this will allow for precise targeting of which column to remove. In my current implementation however I'm always adding and removing the last column within the grid.

## Challenge 3

For Challenge 3 I have a new component, `ExportPanel`, which contains the options to export a grid to HTML and JSON. The only information that the `ExportPanel` needs to properly export a grid is the ID of the DOM element in which the grid is rendered - therefore I am adding a top-level `id` prop onto the `MutableGrid` component.

The HMTL generation is pretty straightforward - I am getting the `outerHTML` of the DOM element where the grid lies (located by the `targetId` passed to `ExportPanel`). I then have an `a` tag element disguised as a Button to download the HTML content as a file.

Theoretically, a JSON serialization of the HTML is easily achievable by putting all of the HTML code within one JSON root - this would produce a valid JSON. I have done this for the 'Export JSON' button, however that might be a cop out and is also not very readable. So I'm not sure if this is considered a solution.

Because of the reasoning above I have created a second way to generate and export a JSON representation of the grid. This is available using the `Generate JSON` button exposed by the third Grid component, `ExpandableGrid`. The component uses the grid specification passed to generate the structure to produce an easy to understand JSON of the form:

```json
{
  "type": "grid",
  "width": 12,
  "columns": [{
    "type": "column",
    "width": 6,
    "text": "culpa"
  }, {
    "type": "column",
    "width": 3,
    "text": "elit"
  }, {
    "type": "column",
    "width": 3,
    "text": "amet"
  }]
}
```

I hope that the format is mostly self-explainable. It is mostly based on the original grid specification used to set up the grid, with some metadata added.

> How would an import function work?

Using the above JSON structure the import should be very easy - a `type` and `width` at the same level of the document should be enough information to pass as props to the components created as part of this implementation. The `columns` section should be mostly plug-and-play within any of the `Grid` components.

## Additional questions

**How would we be able to add a new type of column, like a ​menuColumn​, while still having it behave the same as a column?**

Because the validation and mechanism of the grid is done at one level higher than the basic `Column` component, we should be able to replace the `Column` with any new div-based component without difference. Perhaps we can specify a `columnType` prop, where we would pass the specific new type of column component to be generated. Or rather than providing a grid specification in the way my components work, we can directly pass a set of `Column`-type components as children to the `ImmutableGrid`.

**How would we be able to support multiple types of content inside a column, besides text? Such as images, video’s, etc.**

This would probably require extending the `Column` component to accept any children and not only text via a specification. That way we would be able to put whatever we want in the columns of a grid.

**If the grid size (12) is not fixed but instead is different for each grid created, what would need to change to support that? How can we ensure that columns added do not appear smaller on one grid (12 width) from the other grid (24 width) when we add them?**

I had originally already set up the structure for supporting different grid sizes (using `maxGridSize` prop). The validation is dynamic based on the props passed to the Grid components - we can also have variable limits for the sizes of each column. 

I am using CSS Grid to control the size appearance of each grid and each column. Because I am programatically setting up the `grid-template-columns` property based on the valid column widths in a grid, I expect that modifying the grid size should lead to an automatic restyling of the page.

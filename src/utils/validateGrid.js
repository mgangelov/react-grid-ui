import getColumnWidths from "./getColumnWidths";

const validateGrid = (
  columnSpec,
  minColumnWidth,
  maxColumnWidth,
  gridWidth
) => {
  const columnWidths = getColumnWidths(columnSpec);
  const columnWidthsSum = columnWidths
    .reduce((sum, width) => sum + width, 0);
  return (
    columnWidths.every(width => width >= minColumnWidth) &&
    columnWidths.every(width => width <= maxColumnWidth) &&
    columnWidthsSum === gridWidth
  );
};

export default validateGrid;
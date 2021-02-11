import { v4 as uuidv4 } from 'uuid';
import getColumnWidths from './getColumnWidths';

export const recalculateGridOnElementAdd = (
  newColumn,
  columnSpec,
  maxGridWidth,
) => {
  const gridRemainingWidth = maxGridWidth - newColumn.width;
  const existingGridScaleFactor = gridRemainingWidth / maxGridWidth;
  const resizedColumnSpec = columnSpec.map(({ width, ...rest}) => ({
    width: width * existingGridScaleFactor,
    ...rest
  }));

  return [...resizedColumnSpec, newColumn];
};

export const recalculateGridOnElementRemove = (
  removedColumnId,
  columnSpec,
  maxGridWidth
) => {
  const remainingColumns = columnSpec.filter(
    ({ id }) => id && id !== removedColumnId
  );
  const currentOccupiedWidth = getColumnWidths(remainingColumns)
    .reduce((sum, width) => sum + width, 0);
  const existingGridScaleFactor = maxGridWidth / currentOccupiedWidth;
  return remainingColumns.map(({ width, ...rest }) => ({
    width: width * existingGridScaleFactor,
    ...rest
  }));
};

export const addColumnIds = columns => columns.map(column => {
  if (!(typeof column.id === 'string' && column.id)) {
    return {
      id: uuidv4(),
      ...column
    }
  }
  return column;
});
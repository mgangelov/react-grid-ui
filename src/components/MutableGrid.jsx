import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { generateRandomNumber, generateRandomWord } from '../utils/randomDataUtils';
import {
  recalculateGridOnElementAdd,
  addColumnIds,
  recalculateGridOnElementRemove
} from '../utils/recalculateGridUtils';
import ImmutableGrid from './ImmutableGrid';

const MutableGrid = ({
  gridColumnSpec,
  minColumnWidth,
  maxColumnWidth,
  maxGridWidth
}) => {
  const gridColumnSpecWithIds = addColumnIds(gridColumnSpec);
  const [columns, setColumns] = useState(gridColumnSpecWithIds);

  const onColumnAdd = (newColumn) => {
    const newColumns = recalculateGridOnElementAdd(
      newColumn,
      columns,
      maxGridWidth
    );
    setColumns(addColumnIds(newColumns));
  }

  const onColumnRemove = (columnId) => {
    const newColumns = recalculateGridOnElementRemove(
      columnId,
      columns,
      maxGridWidth
    );
    setColumns(newColumns);
  }

  return (
    <div>
      <ImmutableGrid
        gridColumnSpec={columns}
        maxGridWidth={maxGridWidth}
      />
      <Button
        onClick={() => onColumnAdd({
          width: generateRandomNumber(minColumnWidth, maxColumnWidth),
          text: generateRandomWord()
        })}
      >Add new random column</Button>
      <Button
        onClick={() => onColumnRemove(columns[columns.length - 1].id)}
      >Remove last column</Button>
    </div>
  );
};

MutableGrid.defaultProps = {
  gridColumnSpec: [],
  minColumnWidth: 1,
  maxColumnWidth: 12,
  maxGridWidth: 12
}

MutableGrid.propTypes = {
  gridColumnSpec: PropTypes.arrayOf(PropTypes.object),
  minColumnWidth: PropTypes.number,
  maxColumnWidth: PropTypes.number,
  maxGridWidth: PropTypes.number
};

export default MutableGrid;

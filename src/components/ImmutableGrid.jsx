import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import getColumnWidths from '../utils/getColumnWidths';
import validateGrid from '../utils/validateGrid';
import Column from './Column';

const GridBody = styled.div`
  display: grid;
  border: 1px solid black;
  grid-template-columns: ${
    ({ columnSpec }) => {
      const columnWidths = getColumnWidths(columnSpec);
      return columnWidths.map(width => `${width}fr`)
        .join(' ');
    }
  }
`
const GridColumn = styled(Column)`
  border: 1px dashed gray;
  box-sizing: border-box;
  margin: 1px;
`

const ImmutableGrid = ({
  id,
  gridColumnSpec,
  minColumnWidth,
  maxColumnWidth,
  gridWidth
}) => {
  const isSpecValid = validateGrid(
    gridColumnSpec,
    minColumnWidth,
    maxColumnWidth,
    gridWidth
  );

  return (
    <>
    {
      isSpecValid
        ? <GridBody id={id} columnSpec={gridColumnSpec} className='grid width=12'>
            {gridColumnSpec.map(
              ({width, text, id}, idx) => (<GridColumn id={id} key={idx} width={width} text={text}/>)
            )}
          </GridBody>
        : <div>
            Grid specification passed is invalid:
            {getColumnWidths(gridColumnSpec).join(' ')}
          </div>
    }
    </>
  );
};

ImmutableGrid.defaultProps = {
  id: null,
  gridColumnSpec: [],
  minColumnWidth: 1,
  maxColumnWidth: 12,
  gridWidth: 12
};

ImmutableGrid.propTypes = {
  id: PropTypes.string,
  gridColumnSpec: PropTypes.arrayOf(PropTypes.object),
  minColumnWidth: PropTypes.number,
  maxColumnWidth: PropTypes.number,
  gridWidth: PropTypes.number
};

export default ImmutableGrid;
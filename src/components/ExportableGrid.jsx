import React from 'react';
import PropTypes from 'prop-types';
import MutableGrid from './MutableGrid';
import {
  Button,
  OverlayTrigger,
  Popover
} from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { exportJson } from '../utils/exportUtils';

const ExportableGrid = ({
  id,
  gridColumnSpec,
  minColumnWidth,
  maxColumnWidth,
  maxGridWidth
}) => {
  const [
    gridJsonRepresentation,
    setGridJsonRepresentation
  ] = useState(null);

  useEffect(() => {
    if (gridColumnSpec && maxGridWidth) {
      setGridJsonRepresentation(exportJson(gridColumnSpec, maxGridWidth));
    }

  }, [gridColumnSpec, maxGridWidth]);


  const jsonPopover = (
    <Popover id='grid-json-popover'>
      <Popover.Title>Grid JSON</Popover.Title>
      <Popover.Content>
        {gridJsonRepresentation}
      </Popover.Content>
    </Popover>
  );

  return (
    <div>
    <OverlayTrigger
      trigger='click'
      placement='right'
      overlay={jsonPopover}
    >
      <Button variant='success'>Generate JSON</Button>
    </OverlayTrigger>
    <MutableGrid 
      id={id}
      enableEditControls={false}
      gridColumnSpec={gridColumnSpec}
      minColumnWidth={minColumnWidth}
      maxColumnWidth={maxColumnWidth}
      maxGridWidth={maxGridWidth}
    />
    </div>
  );
}

ExportableGrid.defaultProps = {
  id: null,
  gridColumnSpec: [],
  minColumnWidth: 1,
  maxColumnWidth: 12,
  maxGridWidth: 12
}

ExportableGrid.propTypes = {
  id: PropTypes.string,
  gridColumnSpec: PropTypes.arrayOf(PropTypes.object),
  minColumnWidth: PropTypes.number,
  maxColumnWidth: PropTypes.number,
  maxGridWidth: PropTypes.number
};

export default ExportableGrid;
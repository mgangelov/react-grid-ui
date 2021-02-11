import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { exportHtml, exportJsonSerialisedHtml } from '../utils/exportUtils';
import { useState } from 'react';
import { useEffect } from 'react';

const ExportLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
`

const ExportPanel = ({
  targetId
}) => {
  const [htmlContent, setHtmlContent] = useState(null);
  const [
    jsonSerialisedHtmlContent,
    setJsonSerialisedHtmlContent
  ] = useState(null);
  useEffect(() => {
    if (targetId) {
      setHtmlContent('data:text/html,' + exportHtml(targetId));
      setJsonSerialisedHtmlContent(
        'data:application/json,' + exportJsonSerialisedHtml(targetId)
      );
    }
  }, [targetId]);

  return (
    <ExportLayout>
      <Button
        variant='light'
        href={htmlContent}
        target={'_blank'}
        download='test.html'
        // onClick={() => exportHtml(targetId)}
      >
        Export HTML
      </Button>
      <Button
        variant='dark'
        href={jsonSerialisedHtmlContent}
        target={'_blank'}
        download='test.json'
        // onClick={() => exportHtml(targetId)}
      >
        Export JSON
      </Button>
    </ExportLayout>
  );
}

ExportPanel.propTypes = {
  targetId: PropTypes.string
}

export default ExportPanel;
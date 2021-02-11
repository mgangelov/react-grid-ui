import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ExportableGrid from './components/ExportableGrid';
import ExportPanel from './components/ExportPanel';
import ImmutableGrid from './components/ImmutableGrid';
import MutableGrid from './components/MutableGrid';
import {
  invalidColumnSpec1,
  validColumnSpec1,
  validColumnSpec2
} from './test-cases/immutableGridTestCases';
import { generateValidTestGrid } from './utils/randomDataUtils';


const ChallengeContainer = styled.div`
  padding: 1rem;
`;

function App() {
  const exportGridId = uuidv4();
  return (
    <div className="App">
      <ChallengeContainer id='challenge-1'>
        <h1>Challenge 1</h1>
        <sub>Valid grid 1</sub>
        <ImmutableGrid
          gridColumnSpec={validColumnSpec1}
        />
        <sub>Valid grid 2</sub>
        <ImmutableGrid
          gridColumnSpec={validColumnSpec2}
        />
        <sub>Invalid grid</sub>
        <ImmutableGrid
          gridColumnSpec={invalidColumnSpec1}
        />
      </ChallengeContainer>
      <ChallengeContainer id='challenge-2'>
        <h1>Challenge 2</h1>
        <sub>Dynamic grid</sub>
        <MutableGrid
          gridColumnSpec={generateValidTestGrid()}
        />
      </ChallengeContainer>
      <ChallengeContainer id='challenge-3'>
        <h1>Challenge 3</h1>
        <sub>Grid with export options</sub>
        <MutableGrid
          id={exportGridId}
          enableEditControls={false}
          gridColumnSpec={generateValidTestGrid()}
        />
        <ExportPanel targetId={exportGridId}/>
        <sub>Exportable grid with clean JSON specification</sub>
        <ExportableGrid
          gridColumnSpec={generateValidTestGrid()}
        />
      </ChallengeContainer>
    </div>
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ImmutableGrid from './components/ImmutableGrid';
import MutableGrid from './components/MutableGrid';
import {
  invalidColumnSpec1,
  validColumnSpec1,
  validColumnSpec2
} from './test-cases/immutableGridTestCases';

function App() {
  return (
    <div className="App">
      <div id='challenge1'>
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
      </div>
      <div id='challenge2'>
        <h1>Challenge 2</h1>
        <MutableGrid
          gridColumnSpec={validColumnSpec2}
        />
      </div>
    </div>
  );
}

export default App;

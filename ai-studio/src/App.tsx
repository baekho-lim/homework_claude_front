import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import S01_GoalStart from './pages/S01_GoalStart';
import S02_TimerRunning from './pages/S02_TimerRunning';
import S04_CompleteProof from './pages/S04_CompleteProof';
import S05_ShareExport from './pages/S05_ShareExport';
import S06_QuietLog from './pages/S06_QuietLog';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<S01_GoalStart />} />
        <Route path="/timer" element={<S02_TimerRunning />} />
        <Route path="/complete" element={<S04_CompleteProof />} />
        <Route path="/share/:proofId" element={<S05_ShareExport />} />
        <Route path="/log" element={<S06_QuietLog />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
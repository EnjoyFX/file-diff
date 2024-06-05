import React, { useState, useEffect, useRef } from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import './App.css';

function App() {
  const [beforeContent, setBeforeContent] = useState('');
  const [afterContent, setAfterContent] = useState('');
  const [timing, setTiming] = useState(null);
  const viewerRef = useRef();

  const handleFileChange = (event, setContent) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setContent(e.target.result);
    };

    reader.readAsText(file);
  };

  useEffect(() => {
    if (beforeContent && afterContent) {
      const start = window.performance.now();
      // Виклик функції для вимірювання часу рендерингу
      setTiming(null);
      viewerRef.current = (
        <ReactDiffViewer
          oldValue={beforeContent}
          newValue={afterContent}
          compareMethod={DiffMethod.WORDS}
          splitView={true}
          className="diff-viewer"
        />
      );
      const end = window.performance.now();
      setTiming(end - start);
    }
  }, [beforeContent, afterContent]);

  return (
    <div className="App">
      <h1>JSON Diff Viewer</h1>
      <div className="file-inputs">
        <input type="file" accept=".json" onChange={(e) => handleFileChange(e, setBeforeContent)} />
        <input type="file" accept=".json" onChange={(e) => handleFileChange(e, setAfterContent)} />
      </div>
      {timing !== null && <div>Render time: {timing.toFixed(3)} ms</div>}
      {viewerRef.current}
    </div>
  );
}

export default App;

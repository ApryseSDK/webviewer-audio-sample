import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import { initializeAudioViewer } from '@pdftron/webviewer-audio';
import './App.css';

const App = () => {
  const viewer = useRef(null);

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    WebViewer(
      {
        path: '/webviewer/lib',
      },
      viewer.current,
    ).then(async instance => {
      instance.setTheme('dark');
      instance.openElements(['notesPanel']);

      const license = `---- Insert commercial license key here after purchase ----`;
      // Extends WebViewer to allow loading media files (.mp3, .mp4, ogg, webm, etc.)
      const {
        loadAudio,
      } = await initializeAudioViewer(
        instance,
        { license },
      );

      // Load a media element at a specific url. Can be a local or public link
      // If local it needs to be relative to lib/ui/index.html.
      // Or at the root. (eg '/audio.mp3')
      const audioUrl = '/audio.mp3';
      loadAudio(audioUrl);
    });
  }, []);

  return (
    <div className="App">
      <div className="webviewer" ref={viewer}/>
    </div>
  );
};

export default App;

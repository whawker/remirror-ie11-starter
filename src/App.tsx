import './App.css';
import React from 'react';
import { wysiwygPreset } from 'remirror/extensions';
import { Remirror, useRemirror } from '@remirror/react';

export const App = () => {
  const { manager, state } = useRemirror({
    extensions: () => [...wysiwygPreset()],
    content: '<p>I love <b>Remirror</b></p>',
    selection: 'start',
    stringHandler: 'html',
  });

  return (
      <div className='remirror-theme'>
        {/* the className is used to define css variables necessary for the editor */}
        <Remirror manager={manager} initialContent={state} />
      </div>
  );
};

export default App;

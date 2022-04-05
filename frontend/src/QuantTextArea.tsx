import React, { FormEvent } from 'react';
import Editor from '@monaco-editor/react';

import { Streamlit } from 'streamlit-component-lib';

import type { State, Props } from './App';

import './QuantTextArea.css';

class QuantTextArea extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  onChange = (newValue: string | undefined) => {
    if (newValue !== undefined) this.props?.parentCallback(newValue);
  };

  render = () => {
    const options = {
      selectOnLineNumbers: true,
    };

    return (
      <Editor
        className="QuantTextArea"
        width="99vw"
        height="40vh"
        defaultLanguage="python"
        theme="vs-dark"
        value={this.props?.code}
        options={options}
        onChange={this.onChange}
      />
    );
  };
}

export default QuantTextArea;

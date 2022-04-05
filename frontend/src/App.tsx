import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from 'streamlit-component-lib';
import React, { ReactNode, useEffect } from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Indicators from 'highcharts/indicators/indicators-all.js';
import DragPanes from 'highcharts/modules/drag-panes.js';
import AnnotationsAdvanced from 'highcharts/modules/annotations-advanced.js';
import PriceIndicator from 'highcharts/modules/price-indicator.js';
import FullScreen from 'highcharts/modules/full-screen.js';
import StockTools from 'highcharts/modules/stock-tools.js';

import QuantTextArea from './QuantTextArea';

import './App.css';

// import APPL_TS from './aapl-c.json'; // use this to test without streamlit
const APPL_TS = null;

// init the module
Indicators(Highcharts);
DragPanes(Highcharts);
AnnotationsAdvanced(Highcharts);
PriceIndicator(Highcharts);
FullScreen(Highcharts);
StockTools(Highcharts);

const options = {
  yAxis: [
    {
      height: '80%',
    },
    {
      top: '80%',
      height: '20%',
      offset: 0,
    },
  ],
  rangeSelector: {
    selected: 1,
  },
  title: {
    text: 'AAPL Stock Price',
  },
  series: [
    {
      name: null,
      data: null,
      tooltip: {
        valueDecimals: 2,
      },
    },
  ],
};

export type State = {
  data: number[][] | null;
  code: string;
};

export type Props = {
  parentCallback: (value: string) => void;
  onChange: (value: string) => void;
  code: string;
};

class App extends StreamlitComponentBase<State> {
  componentDidMount(): void {
    // important to set streamlit height again.
    Streamlit.setFrameHeight(900);
  }

  public state = { data: APPL_TS, code: '# type your python here...' };

  public keyDown = (value: string): void => {
    Streamlit.setComponentValue(value);
  };

  public onChange = (value: string): void => {
    this.setState({ code: value });
  };

  public render = (): ReactNode => {
    const title = this.props.args?.title ?? 'temp';
    const data = this.props.args?.data ?? APPL_TS;

    options.series[0].name = title;
    options.series[0].data = data;

    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={options}
        />
        <QuantTextArea
          parentCallback={this.keyDown}
          onChange={this.onChange}
          code={this.state.code}
        />
      </div>
    );
  };
}

//export default App; // run this as standalone.
export default withStreamlitConnection(App);

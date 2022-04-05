import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from 'streamlit-component-lib';
import React, { ReactNode } from 'react';

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Indicators from 'highcharts/indicators/indicators-all.js';
import DragPanes from 'highcharts/modules/drag-panes.js';
import AnnotationsAdvanced from 'highcharts/modules/annotations-advanced.js';
import PriceIndicator from 'highcharts/modules/price-indicator.js';
import FullScreen from 'highcharts/modules/full-screen.js';
import StockTools from 'highcharts/modules/stock-tools.js';

import './App.css';

import APPL_TS from './aapl-c.json';

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

interface State {
  data: number[][];
}

class App extends StreamlitComponentBase<State> {
  public state = { data: APPL_TS };

  public render = (): ReactNode => {
    const title = this.props.args['title'];
    const data = this.props.args['data'];

    options.series[0].name = title;
    options.series[0].data = data;

    Streamlit.setComponentValue('OK!');

    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={options}
        />
      </div>
    );
  };
}

//export default App; // run this as standalone.
export default withStreamlitConnection(App);

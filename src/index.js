import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './assets/scss/index.scss';


ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();

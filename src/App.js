import React from 'react';
import theme from './theme';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import {BrowserRouter as Router} from 'react-router-dom'
import Main from './main'


const store = configureStore();

function App() {
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Main />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

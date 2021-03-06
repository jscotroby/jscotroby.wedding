import React, {Component} from 'react';
import store from './redux/Store';
import {Provider} from 'react-redux';
import Router from './Router.js';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './App.css';

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Existence'
    },
    palette: {
        primary: {main: '#b21c0e'},
        secondary: {main: '#1C59A7'}
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <div className="App">
                        <Router/>
                    </div>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;

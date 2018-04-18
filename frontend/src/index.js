
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker';
import { Route, Switch } from 'react-router'
import PrivateRoute from './containers/PrivateRoute';
import './index.css';
import 'typeface-roboto'
import 'bootstrap/dist/css/bootstrap.css';

/* eslint-disable */
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

// Apps
import App from './App'
import LandingPage from './containers/LandingPage';

const history = createHistory()
const store = configureStore(history)

ReactDOM.render((
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/login" component={LandingPage} />
                    <Route exact path="/signup" component={LandingPage} />
                    <PrivateRoute path="/appointments/" component={App}/>
                    <PrivateRoute path="/" component={App}/>
                    <PrivateRoute component={App}/>
                </Switch>
            </ConnectedRouter>
        </Provider>
    </MuiPickersUtilsProvider>
), document.getElementById('root'));
registerServiceWorker();

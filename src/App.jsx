import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import { SnackBarProvider } from './contexts';
import {
  Login,
  TextFieldDemo,
  InputDemo,
  ChildrenDemo,
  Trainee,
  NoMatch,
} from './pages';
import { AuthRoute, PrivateRoute } from './routes';

const App = () => (
  <>
    <SnackBarProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <AuthRoute exact path="/Login" component={Login} />
            <PrivateRoute exact path="/text-field-demo" component={TextFieldDemo} />
            <PrivateRoute exact path="/input-demo" component={InputDemo} />
            <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
            <PrivateRoute path="/trainee" component={Trainee} />
            <PrivateRoute component={NoMatch} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </SnackBarProvider>
  </>
);

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import './App.scss';
import { History } from "history";
import { store } from './redux/store';
import { ConnectedRouter } from 'connected-react-router';
import Homepage from './pages/homepage/homepage';
import NavbarComponent from './components/navbar/navbar.component';
import ForgotPasswordPage from './pages/forgot-password/forgot-password.page';
import VerificationPage from './components/verification/verificationPage'
interface AppProps {
  history: History;
}

const renderForgotPasswordPage = (routeProps: any) => {
  return <React.Fragment>
      <ForgotPasswordPage routeParams={routeProps.match.params} />
  </React.Fragment>;
}

const renderVerificationPage = (routeProps: any) => {
  return <React.Fragment>
    <VerificationPage routeParams={routeProps.match.params} />
  </React.Fragment>
}

const App = (props: AppProps) => {
  const { history } = props;

  return (
    <Provider store={store}>
      <div className="App">
        <ConnectedRouter history={history}>
          <NavbarComponent/>
          <Switch>
            <Route exact={true} path="/" component={Homepage} />
            <Route path={'/forgotPassword/:uid'} render={(routeProps: RouteComponentProps) =>
                            renderForgotPasswordPage({ ...routeProps })} exact={true}
                        />
            <Route path={'/verify/:uid'} render={(routeProps: RouteComponentProps) =>
                            renderVerificationPage({ ...routeProps })} exact={true}
                        />
          </Switch>
        </ConnectedRouter>
      </div>
    </Provider>
  );
}

export default App;

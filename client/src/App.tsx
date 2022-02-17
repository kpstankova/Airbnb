import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import { History } from "history";
import { store } from './redux/store';
import { ConnectedRouter } from 'connected-react-router';
import Homepage from './pages/homepage/homepage';
import NavbarComponent from './components/navbar/navbar.component';
import ForgotPasswordPage from './pages/forgot-password/forgot-password.page';

interface AppProps {
  history: History;
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
            <Route exact={true} path='/forgot-password' component={ForgotPasswordPage}/>
          </Switch>
        </ConnectedRouter>
      </div>
    </Provider>
  );
}

export default App;

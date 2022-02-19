import React from 'react';
import { connect, Provider } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import './App.scss';
import { History } from "history";
import { store } from './redux/store';
import { ConnectedRouter } from 'connected-react-router';
import Homepage from './pages/homepage/homepage';
import NavbarComponent from './components/navbar/navbar.component';
import ForgotPasswordPage from './pages/forgot-password/forgot-password.page';
import VerificationPage from './components/verification/verificationPage';
import OnboardingPageComponent from './pages/onboarding/onboarding.page'
import SearchPageComponent from './pages/search/search.page';
import { StoreState } from './redux/root-reducer';
import { selectEndDate, selectNumberOfGuests, selectSearchString, selectStartDate } from './redux/search/search.selectors';
import { format } from 'date-fns';
import AddHousingComponent from './pages/add-housing/add-housing.component'
interface AppProps {
  history: History;
  searchString: string;
  startDateFilter: Date;
  endDateFilter: Date;
  numberOfGuestsFilter: number;
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
  const { history, searchString, startDateFilter, endDateFilter, numberOfGuestsFilter } = props;
  const formattedStartDate = format(new Date(startDateFilter), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDateFilter), "dd MMMM yy");

  return (
    <Provider store={store}>
      <div className="App">
        <ConnectedRouter history={history}>
          <NavbarComponent placeholder={`${searchString} | ${formattedStartDate} | ${formattedEndDate} | ${numberOfGuestsFilter} guests`} />
          <Switch>
            <Route exact={true} path="/" component={Homepage} />
            <Route path={'/forgotPassword/:uid'} render={(routeProps: RouteComponentProps) =>
              renderForgotPasswordPage({ ...routeProps })} exact={true}
            />
            <Route path={'/verify/:uid'} render={(routeProps: RouteComponentProps) =>
              renderVerificationPage({ ...routeProps })} exact={true}
            />
            <Route exact={true} path='/onboarding' component={OnboardingPageComponent} />
            <Route exact={false} path='/results' component={SearchPageComponent} />
            <Route exact={true} path='/add-housing' component={AddHousingComponent}/>
          </Switch>
        </ConnectedRouter>
      </div>
    </Provider>
  );
};

const mapStateToProps = (state: StoreState): { searchString: string, startDateFilter: Date, endDateFilter: Date, numberOfGuestsFilter: number } => {
  return {
    searchString: selectSearchString(state),
    startDateFilter: selectStartDate(state),
    endDateFilter: selectEndDate(state),
    numberOfGuestsFilter: selectNumberOfGuests(state)
  }
}

export default connect(mapStateToProps, null)(App);

import React from 'react';
import { Router, Route, Redirect, browserHistory, Switch } from 'react-router';

// Transition Component
import { RouteTransition } from 'react-router-transition';

// Components
import Home from 'components/Home';
import NotFoundPage from 'components/NotFoundPage';
import Footer from 'components/Footer';
import About from 'components/About';
// import HowItWorks from 'components/HowItWorks';
import ReportABug from 'components/ReportABug';

// Containers
import Session from 'containers/Session';
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import ForgotPassword from 'containers/ForgotPassword';
import ResetPassword from 'containers/ResetPassword';
import Profile from 'containers/Profile';
import Alert from 'containers/Alert';
import SportingGoodsIndex from 'containers/SportingGoodsIndex';
import SportingGoodsShow from 'containers/SportingGoodsShow';
import OwnersSportingGoodsIndex from 'containers/owner/OwnersSportingGoodsIndex';
import OwnersSportingGoodsEdit from 'containers/owner/OwnersSportingGoodsEdit';
import OwnersSportingGoodsShow from 'containers/owner/OwnersSportingGoodsShow';
import OwnersRentalsShow from 'containers/owner/OwnersRentalsShow';
import SportingGoodsNew from 'containers/owner/SportingGoodsNew';
import OwnersSchedule from 'containers/owner/OwnersSchedule';
import RentalsShow from 'containers/RentalsShow';
import ModalContainer from 'containers/ModalContainer';

// Route transition settings
const RouteTransitionSettings = {
	className: "transition",
	pathname: location.pathname,
	atEnter: {opacity: 0 },
	atLeave: { opacity: 0 },
	atActive: { opacity: 1 }
}

export default (props, store) => {

	const isAuthenticated = () => {
		const state = store.getState();
		return !!state.session && state.session.token;
	}

	// Render Login if not authenticated
	const protectedRoute = (ProtectedComponent, AlternativeSessionComponent) => {
		if (isAuthenticated()) {
			return <ProtectedComponent { ...props }/>;
		} else {
			return AlternativeSessionComponent ? <AlternativeSessionComponent { ...props }/> : <Login { ...props }/>;
		}
	}

	return (
		<div className="main-wrapper" id="mainWrapper">
			<Session { ...props }/>
			<Alert/>

			<ModalContainer/>

			<Route render={({ location }) => (
				<RouteTransition { ...RouteTransitionSettings }>
					<Switch key={location.key} location={location}>
						<Route path="(/|/home)" exact={ true } render={ () => {
							return protectedRoute(SportingGoodsIndex, Home);
						}}/>
						<Route path="/signup" render={ () => {
							return protectedRoute(SportingGoodsIndex, Signup);
						}}/>
						<Route path="/login" render={ () => {
							return protectedRoute(SportingGoodsIndex);
						}}/>

						<Route path="/forgot_password" component={ ForgotPassword }/>
						<Route path="/reset_password/:reset_token" component={ ResetPassword }/>

						<Route exact path="/sporting_goods/:slug/rentals/:id" render={ () => {
							return protectedRoute(RentalsShow);
						}}/>
						<Route exact path="/owner/sporting_goods/:slug/rentals/:id" render={ () => {
							return protectedRoute(OwnersRentalsShow);
						}}/>
						<Route exact path="/owner/sporting_goods/:slug/edit" render={ () => {
							return protectedRoute(OwnersSportingGoodsEdit);
						}}/>
						<Route exact path="/owner/sporting_goods/new" render={ () => {
							return protectedRoute(SportingGoodsNew);
						}}/>
						<Route exact path="/owner/sporting_goods" render={ () => {
							return protectedRoute(OwnersSportingGoodsIndex);
						}}/>
						<Route exact path="/owner/sporting_goods/:slug" render={ () => {
							return protectedRoute(OwnersSportingGoodsShow);
						}}/>
						<Route exact path="/owner/schedule" render={ () => {
							return protectedRoute(OwnersSchedule);
						}}/>
						<Route exact path="/sporting_goods/:slug" render={ () => {
							return protectedRoute(SportingGoodsShow);
						}}/>
						<Route exact path="/sporting_goods" render={ () => {
							return protectedRoute(SportingGoodsIndex);
						}}/>
						<Route exact path="/profile" render={ () => {
							return protectedRoute(Profile);
						}}/>
						<Route path="/about" component={ About } />
						<Route path="*" component={ NotFoundPage } />
					</Switch>
				</RouteTransition>
			)} />

			<Footer { ...props }/>
		</div>
	);
};

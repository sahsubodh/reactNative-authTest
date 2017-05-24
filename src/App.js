import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	
	state = { loggedIn: null }


	componentWillMount() {
		firebase.initializeApp({
			apiKey: 'AIzaSyA_hEGZtwPg8cJ49uTnPCAgF4byvezvyI0',
			authDomain: 'reactauthtest-796f2.firebaseapp.com',
			databaseURL: 'https://reactauthtest-796f2.firebaseio.com',
			projectId: 'reactauthtest-796f2',
			storageBucket: 'reactauthtest-796f2.appspot.com',
			messagingSenderId: '514615740987'
		});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}

	renderContent() {
		switch (this.state.loggedIn) {
			case true:
			return (
				<CardSection>
					<Button onPress={() => firebase.auth().signOut()}>
						Log Out
					</Button>
				</CardSection>
				);

			case false:
				return <LoginForm />;

			default:
				return <Spinner size='large' />;
		}
	}

	render() {
		return (
			<View>
				<Header headerText="Authentication" />
					{this.renderContent()}
			</View>
			);
	}
}

export default App;

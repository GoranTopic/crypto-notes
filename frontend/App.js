import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'; // import reducer
import { store, persistor } from './src/state/store.js'; 
//import AppNavigator from './src/navigation/AppNavigator.js';
// call inizilizer to produce a state
import { PersistGate } from 'redux-persist/integration/react';
import { createLogger } from "redux-logger";

export default function App() {
		return <>
				<Provider store={store}>
						<PersistGate loading={null} persistor={persistor}>
								<View style={styles.container}>
										<Text>if you can read this the App is working well</Text>
										<StatusBar style="auto" />
								</View>
						</PersistGate>
				</Provider>
		</>
}

/*
		return <>
								<AppNavigator/>
		</>
}
*/


const styles = StyleSheet.create({
		container: {
				flex: 1,
				backgroundColor: '#fff',
				alignItems: 'center',
				justifyContent: 'center',
		},
});

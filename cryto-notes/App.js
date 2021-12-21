import React from 'react';
import { Provider } from 'react-redux'; // import reducer
import AppNavigator from './src/navigation/AppNavigator.js';
import { store, persistor } from './src/state/store.js'; 
// call inizilizer to produce a state
import { PersistGate } from 'redux-persist/integration/react';
import { createLogger } from "redux-logger";

export default function App() {
		return <>
				<Provider store={store}>
						<PersistGate loading={null} persistor={persistor}>
								<AppNavigator/>
						</PersistGate>
				</Provider>
		</>
}


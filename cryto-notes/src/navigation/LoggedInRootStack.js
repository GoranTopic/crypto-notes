import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../state/mappers.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import UserDrawer from './UserDrawer.js';

const Stack = createStackNavigator();

// render this stack if user is logged In
/* this navigator defines the routes for a logged in user, 
 * it provide the user logged in context information */
const RootStack = props => <>
		<Stack.Navigator>
				<Stack.Screen name="UserDrawer"
						component={UserDrawer}
						options={{ headerShown: false }} />  
		</Stack.Navigator>  
</>
 
export default connect(mapStateToProps, mapDispatchToProps)(RootStack);


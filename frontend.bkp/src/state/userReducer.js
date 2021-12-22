import initUser from '../inicializers/initUser.js';

const userReducer = (state = initUser, action) => {
		switch (action.type) {
				case 'SET_USER':
						const checkIfNew = field => // check is payload bring new values
								action.payload[field]? action.payload[field] : state[field]; 
						return { 
								...state, 
								isSignedIn: true,
								cookie: action.payload.cookie, 
								username: action.payload.username,
								firstname: checkIfNew('firstname'),
								lastanem: checkIfNew('lastname'),
								email: checkIfNew('email'),
								phone: checkIfNew('phone'),
						};
				case 'SET_STATE':
						state.stateReducer = action.payload;
						return  state;
				case 'SET_SOCKET':
						state.stateReducer.socket = action.payload;
						return state;
				case 'SET_COOKIE':
						state.stateReducer.cookie = action.payload;
						return state;
				default:
						return state;
		}
};

export default userReducer;

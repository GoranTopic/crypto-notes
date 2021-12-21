import initAppState  from '../inicializers/initApp.js';

const appReducer = (state = initAppState,   action) => {
		switch (action.type) {
				case 'SET_IS_LOADING':
						state.isLoading = action.payload;
						return state;
				case 'SET_IS_ERROR':
						state.isError = action.payload;
						return state;
				default:
						return state;
		}
};

export default appReducer;

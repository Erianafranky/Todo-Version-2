import { createContext, useReducer } from 'react';

export const AppContext = createContext();

// reducer function
function reducer(state, action) {
	// create a copy of your state
	let stateCopy = { ...state };

	// set the name on our state copy to action
	stateCopy.action = action;

	if (action.type === 'ADD_ITEM') {
		stateCopy.shoppingList.unshift(action.payload);
	}

	return stateCopy;
}

const initialState = {
	shoppingList: [
		{
			id: 1,
			title: 'Item 1',
			description:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, totam!',
		},
		{
			id: 2,
			title: 'Item 2',
			description:
				'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, totam!',
		},
	],
	isUserLoggedIn: false,
	action: '',
};

function AppState({ children }) {
	// const [state, setState] = useState('');

	const [appstate, dispatch] = useReducer(reducer, initialState);

	const contextObject = {
		state: appstate,
		dispatch: dispatch,
	};

	return (
		<AppContext.Provider value={contextObject}>
			{children}
		</AppContext.Provider>
	);
}

export default AppState;

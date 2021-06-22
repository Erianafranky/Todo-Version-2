import { createContext, useReducer } from 'react';

export const AppContext = createContext();

// reducer function
function reducer(state, action) {
	// create a copy of your state
	let stateCopy = { ...state };

	// set the name on our state copy to action
	stateCopy.action = action;

	// if action.type is ADD_ITEM
	// add the payload to shoppingList
	if (action.type === 'ADD_ITEM') {
		if (stateCopy.isEditing) {
			stateCopy.todoList = stateCopy.todoList.map(
				item => {
					if (item.id === stateCopy.currentlyEditing) {
						item.title = stateCopy.title;
					}
					return item;
				}
			);
		} else {
			stateCopy.todoList.unshift(action.payload);
		}
	}

	// if action.type is LOGIN
	// set isUserLoggedIn to true
	// & set userData to payload
	if (action.type === 'LOGIN') {
		stateCopy.isUserLoggedIn = true;
		stateCopy.userData = action.payload;
	}

	// if action.type is LOGOUT
	// set isUserLoggedIn to false
	// & set userData to null
	if (action.type === 'LOGOUT') {
		stateCopy.isUserLoggedIn = false;
		stateCopy.userData = null;
	}

	// remove an item if action.type is DELETE
	if (action.type === 'DELETE') {
		stateCopy.shoppingList = stateCopy.todoList.filter(
			item => item.id !== action.payload.id
		);
	}

	// action to set title
	if (action.type === 'UPDATE_TITLE') {
		stateCopy.title = action.payload;
	}

	// action to set title
	if (action.type === 'UPDATE_DESCRIPTION') {
		stateCopy.description = action.payload;
	}

	// action to edit an item.
	// get the item from the action payload
	// set the title and description to the content
	// of title and description found in payload
	// on Save, find and update item
	if (action.type === 'EDIT') {
		stateCopy.title = action.payload.title;
		stateCopy.description = action.payload.description;
		stateCopy.isEditing = true;
		stateCopy.currentlyEditing = action.payload.id;
	}

	if (action.type === 'RESET_INPUTS') {
		stateCopy.title = '';
	}

	return stateCopy;
}

const initialState = {
	todoList: [
		{
			id: 1,
			title: 'Item 1',
			
		}
		
	],
	isUserLoggedIn: false,
	userData: null,
	title: '',
	isEditing: false,
	currentlyEditing: '',
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

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppState, { AppContext } from './components/appstate';
import Shopper from './components/shopper';
import { useContext, useEffect } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/navbar';
import './styles/form.css'

// REACT HOOKS

function App() {
	const context = useContext(AppContext);
	console.log(context);

	useEffect(() => {}, []);

	return (
		<BrowserRouter>
			<AppState>
				<Navbar />

				<Switch>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/register'>
						<Register />
					</Route>
					<div className="todo-app">
					<Route path='/todos'>
						<Shopper />
					</Route>
					</div>
					<Route>
						<Login />
					</Route>
					
				</Switch>
			</AppState>
		</BrowserRouter>
	);
}

export default App;

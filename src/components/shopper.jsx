import { useLayoutEffect } from 'react';
import { useHistory } from 'react-router';
import Form from './form';
import Todo from './todo';
import useContextGetter from '../hooks/useContextGetter';

function Shopper() {
	const history = useHistory();
	const context = useContextGetter();

	useLayoutEffect(() => {
		if (!context.state.isUserLoggedIn) {
			history.push('/login');
		}
	}, [context.state, history]);

	return (
		<div class='shopper'>
			<Form />
			<Todo />
		</div>
	);
}

export default Shopper;

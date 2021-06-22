import useContextGetter from '../hooks/useContextGetter';
import '../styles/form.css';

function Form() {
	const context = useContextGetter();

	const handleSubmit = e => {
		e.preventDefault();

		if (!context.state.title) {
			return false;
		}

		const newItem = {
			title: context.state.title,
			//description: context.state.description,
			id: Date.now(),
		};

		context.dispatch({
			type: 'ADD_ITEM',
			payload: newItem,
		});

		// reset the values of the input boxes
		context.dispatch({ type: 'RESET_INPUTS' });
	};

	const setTitle = e => {
		context.dispatch({
			type: 'UPDATE_TITLE',
			payload: e.target.value,
		});
	};


	return (
		<div>
			<form className='todo-form' onSubmit={handleSubmit}>
				<input
					value={context.state.title}
					onChange={setTitle}
					type='text'
					name='title'
					id='title'
					placeholder='Title'
					className='todo-input'
				/>
				
				<button className='todo-button' type='submit'>
					Add Item
				</button>
			</form>
		</div>
	);
}

export default Form;

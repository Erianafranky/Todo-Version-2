import useContextGetter from '../hooks/useContextGetter';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import '../App.css';

function TodoList({ item }) {
	const context = useContextGetter();

	// remove an item from the list
	const removeHandler = () => {
		context.dispatch({ type: 'DELETE', payload: item });
	};

	// edit an item
	const editHandler = () => {
		// TODO implement the edit action
		context.dispatch({ type: 'EDIT', payload: item });
	};

	return (
		<div className="todo-row">
			<h2 className='title'>{item.title}</h2>
			<div className='icons'>] 
				<RiCloseCircleLine onClick={removeHandler}
				className='delete-icon' />
					
				<TiEdit
				onClick={editHandler}
				className='edit-icon' />
			
			</div>
		</div>
	);
}

export default TodoList;

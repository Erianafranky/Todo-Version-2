import useContextGetter from '../hooks/useContextGetter';
import TodoList from './todoList';

// scoped styling
import '../styles/shopping-list.css';

function Todo() {
	const context = useContextGetter();
	console.log(context);

	return (
		<ul>
			{context.state.todoList.map(function (todoItem) {
				return (
					<TodoList
						key={todoItem.id}
						item={todoItem}
					/>
				);
			})}
		</ul>
	);
}

export default Todo;

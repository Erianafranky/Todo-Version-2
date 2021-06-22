import useContextGetter from '../hooks/useContextGetter';
import { Link, useLocation } from 'react-router-dom';
import styles from '../styles/navbar.module.css';

function Navbar() {
	const {
		dispatch,
		state: { isUserLoggedIn },
	} = useContextGetter();
	const location = useLocation();

	const logout = () => {
		dispatch({
			type: 'LOGOUT',
		});
	};

	const renderNav = () => {
		if (!isUserLoggedIn && location.pathname === '/login') {
			return (
				<>
					<Link className={styles.navlink} to='/register'>Register</Link>
				</>
			);
		}

		if (!isUserLoggedIn && location.pathname === '/register') {
			return (
				<>
					<Link className={styles.navlink} to='/login'>Login</Link>
				</>
			);
		}

		if (isUserLoggedIn) {
			return (
				<>
					<Link className={styles.navlink} to='/todos'>My List</Link>
					<br />
					<span onClick={logout}>Logout</span>
				</>
			);
		}
	};

	return <nav className={styles.navbar}>{renderNav()}</nav>;
}

export default Navbar;

// <nav>
// 	{context.state.isUserLoggedIn ? (
// 		<>
// 			<Link to='/shopping-list'>My List</Link>
// 			<br />
// 			<span onClick={logout}>Logout</span>
// 		</>
// 	) : (
// 		<>
// 			<Link to='/login'>Login</Link>
// 			<br />
// 			<Link to='/register'>Register</Link>
// 			<br />
// 		</>
// 	)}
// </nav>

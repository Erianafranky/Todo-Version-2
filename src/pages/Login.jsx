import { useForm } from 'react-hook-form';
import useContextGetter from '../hooks/useContextGetter';
import useLoggedIn from '../hooks/useLoggedIn';
import '../styles/form.css';

function Login() {
	// redirect the user to the
	// shopping list page if they are
	// already signed in
	useLoggedIn();

	const context = useContextGetter();

	const { register, handleSubmit } = useForm();

	const loginHandler = ({ email, password }) => {
		// create data to be sent to the api for validation
		let userdata = {
			email: email,
			password: password,
		};

		fetch(
			'https://user-manager-three.vercel.app/api/user/login',
			{
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(userdata),
			}
		)
			.then(res => res.json())
			.then(result => {
				if (result.error) {
					return alert(result.message);
				}

				context.dispatch({
					type: 'LOGIN',
					payload: result.body,
				});

				// history.push('/shopping-list');
			})
			.catch(err => {
				alert(
					'Unable to complete request. Please try again after some time'
				);
				console.log({ err });
			});
	};

	return (
		<>
		<div className="form-container">
			<span className='close-btn'>×</span>
        	<div className='form-content-left'>
          		<img className='form-img' src='img/img-2.svg' alt='spaceship' />
        	</div>
			<div className='form-content-right'>
				<form onSubmit={handleSubmit(loginHandler)}>
					
						<h1 className="form-success">
						Get started with us today! Login to your account by filling out the
						information below.
						</h1>
					<div className="form-inputs">
						{/* <label htmlFor='email'>Email</label>
						<br /> */}
						<input
							className="form-input"
							type='email'
							name='email'
							id='email'
							placeholder='email'
							required
							{...register('email')}
						/>
					</div>
					<div className="form-inputs">
						{/* <label htmlFor='password'>Password</label>
						<br /> */}
						<input
							className="form-input"
							type='password'
							name='password'
							id='password'
							placeholder='password'
							required
							{...register('password')}
						/>
					</div>
					
						<button className='form-input-btn' type='submit'>
							Login
						</button>
				</form>
				</div>
				</div>
				</>
	);
}

export default Login;

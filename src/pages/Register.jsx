import { useForm } from 'react-hook-form';
import useContextGetter from '../hooks/useContextGetter';
import useLoggedIn from '../hooks/useLoggedIn';
// styles
import '../styles/form.css';

function Register() {
	// redirect the user to the
	// shopping list page if they are
	// already signed in
	useLoggedIn();

	const { register, handleSubmit } = useForm();
	const context = useContextGetter();

	const handleRegister = ({ email, password, confirmPassword }) => {
		// check if the password and confirmPassword match
		if (password !== confirmPassword) {
			return alert(`passwords don't match`);
		}

		// send a request to register a
		// new user
		let newuser = {
			email: email,
			password: password,
		};

		fetch(
			`https://user-manager-three.vercel.app/api/user/register`,
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify(newuser), //always stringify objects
			}
		)
			.then(res => res.json())
			.then(result => {
				if (result.error === true) {
					return alert(result.message);
				}

				context.dispatch({
					type: 'LOGIN',
					payload: result.body,
				});
			})
			.catch(err => {
				console.log('this error occurred', err);
				alert('an error occurred. Please try again later');
			});
	};

	return (
		<>
		<div className='form-container'>
        	<span className='close-btn'>×</span>
        	<div className='form-content-left'>
          		<img className='form-img' src='img/img-2.svg' alt='spaceship' />
        	</div>
			<div className='form-content-right'>
		<form onSubmit={handleSubmit(handleRegister)}>
			<h1>
				Get started with us today! Create your account by filling out the
				information below.
        	</h1>
			
			<div className="form-inputs">
			<label className='form-label' htmlFor='email'>Email</label>
				
				<input
					className="form-input"
					type='email'
					name='email'
					id='email'
					placeholder='Enter your email'
					required
					{...register('email')}
				/>
			</div>
			
			<div className="form-inputs">
				<label className="form-label" htmlFor='password'>Password</label>
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
			
			<div className="form-inputs">
				<label className="form-label" htmlFor='confirm-password'>
					Confirm Password
				</label>
				<input
					className="form-input"
					type='password'
					name='confirm-password'
					id='confirm-password'
					placeholder='password'
					required
					{...register('confirmPassword')}
				/>
			</div>
			
			
			<button className='form-input-btn' type='submit'>
				Register
			</button>
			<br />
			<span className='form-input-logins'>
         		Already have an account? Login <a href='/login'>here</a>
        	</span>		
		</form>
		</div>
		</div>
		</>
	);
}

export default Register;

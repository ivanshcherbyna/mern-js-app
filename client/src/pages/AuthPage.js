import React, { useState, useEffect, useContext } from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/AuthContext';

export const AuthPage = () =>{
	const auth = useContext(AuthContext);
	const message = useMessage();
	const {loading, error, request, clearError} = useHttp();
	const [form, setForm] = useState({
		email: '', password: ''
	});

	useEffect(()=>{
		window.M.updateTextFields();
	},[]);

	useEffect(()=>{
		message(error);
		clearError();
	},[error, message, clearError])

	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

const registerHandler = async() =>{
	try {
		const data = await request('/api/auth/register', 'POST', {...form})
		message(data.message);
	}
	catch (e){

	}
};

const loginHandler = async() =>{
	try {
		const data = await request('/api/auth/login', 'POST', {...form})
		auth.login(data.token, data.userId)
		message(data.message);
	}
	catch (e){

	}
}

	return(
		<div className="row">
			<div className="col s6 offset-s3">
				<h1>Сократи ссылку</h1>

				<div className="card blue darken-1">
					<div className="card-content white-text">
						<span className="card-title">Авторизация</span>
						<div>
							<div className="input-field">
								<input
									placeholder="Введите email"
									id="first_name"
									type="text"
									name="email"
									className="yellow-input"
									onChange={changeHandler}
									value={form.email}
								/>
									<label htmlFor="first_name">Email</label>
							</div>

							<div className="input-field">
								<input
									placeholder="Введите password"
									id="first_name"
									type="password"
									name="password"
									className="yellow-input"
									onChange={changeHandler}
									value={form.password}
								/>
									<label htmlFor="first_name">Пароль</label>
							</div>
						</div>
					</div>
					<div className="card-action">
						<button
							className="btn yellow darken-4"
							style={{marginRight: 10}}
							onClick={loginHandler}
							disabled={loading}
						>
							Войти
						</button>
						<button
							className="btn grey darken-4"
							onClick={registerHandler}
							disabled={loading}
						>
							Регистрация
						</button>
					</div>
				</div>

			</div>
		</div>
	)
}

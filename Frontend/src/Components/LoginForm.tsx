import Input from "./Input";
import Button from "./Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { urlBackend } from "../variables";
import { useState } from "react";

type IUserData = {
	user_id: number;
	username: string;
	user_email: string;
	exp: number;
};

type FormTypes = {
	username: string;
	password: string;
};

const LoginForm = ({ checked }: { checked: boolean }) => {
	const { register, handleSubmit, reset, formState, setError, clearErrors } =
		useForm<FormTypes>();

	const { errors } = formState;
	const singIn = useSignIn<IUserData>();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = (data: FormTypes) => {
		setIsLoading(true);
		const url = `${urlBackend}/includes/login.inc.php`;

		axios
			.post(url, data)
			.then((response) => {
				// console.log(response);
				const token = response.data.token;
				const userData = JSON.parse(atob(token.split(".")[1]));
				singIn({
					auth: {
						token,
						type: "Bearer",
					},
					userState: {
						...userData,
					},
				});
				navigate("/account");
				reset();
				setIsLoading(false);
			})
			.catch((error) => {
				const errorData = error.response.data;
				setError(errorData.field, {
					type: "custom",
					message: errorData.error,
				});
				toast.error(errorData.error);
				setTimeout(() => {
					clearErrors();
				}, 2000);
				setIsLoading(false);
			});
	};

	return (
		<form method="post" className="login" onSubmit={handleSubmit(onSubmit)}>
			<label>Logowanie</label>
			<Input
				label="Nazwa"
				color={errors.username?.message && "red"}
				title={errors.username?.message}
				disabled={!checked || isLoading}
				{...register("username", {
					required: "Pole wymagane",
					minLength: {
						value: 5,
						message: "Minimalna długość nazwy to 5 znaków",
					},
				})}
			/>

			<Input
				label="Hasło"
				type="password"
				disabled={!checked || isLoading}
				color={errors.password?.message && "red"}
				title={errors.password?.message}
				{...register("password", {
					required: "Pole wymagane",
					minLength: {
						value: 8,
						message: "Minimalna długość hasła to 8 znaków",
					},
				})}
			/>

			<Button type="submit" disabled={!checked || isLoading}>
				Zaloguj
			</Button>
		</form>
	);
};

export default LoginForm;

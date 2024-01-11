import Input from "./Input";
import Button from "./Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { urlBackend } from "../variables";
import { useState } from "react";

type FormTypes = {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const RegisterForm = ({ checked }: { checked: boolean }) => {
	const {
		register,
		handleSubmit,
		getValues,
		reset,
		formState,
		setError,
		clearErrors,
	} = useForm<FormTypes>();
	const { errors } = formState;

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = (data: FormTypes) => {
		setIsLoading(true);
		const url = `${urlBackend}/includes/signup.inc.php`;
		// const url = `https://mysql-server-project.000webhostapp.com/includes/signup.inc.php`;

		axios
			.post(url, data)
			.then((response) => {
				// console.log(response);
				toast.success(response.data, {
					duration: 5000,
				});
				reset();
				setIsLoading(false);
			})
			.catch((error) => {
				// console.log(error);
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
		<form method="post" className="register" onSubmit={handleSubmit(onSubmit)}>
			<label>Rejestracja</label>

			<Input
				label="Nazwa"
				color={errors.username?.message && "red"}
				title={errors.username?.message}
				disabled={checked || isLoading}
				{...register("username", {
					required: "Pole wymagane",
					minLength: {
						value: 5,
						message: "Minimalna długość nazwy to 5 znaków",
					},
					pattern: {
						value: /^[a-zA-Z0-9]*$/,
						message: "Nazwa musi składać tylko z liter i znaków",
					},
				})}
			/>

			<Input
				label="Adres email"
				disabled={checked || isLoading}
				color={errors.email?.message && "red"}
				title={errors.email?.message}
				{...register("email", {
					required: "Pole wymagane",
					pattern: {
						value: /\S+@\S+\.\S+/,
						message: "Wprowadź poprawny adres email",
					},
				})}
			/>
			<Input
				label="Hasło"
				type="password"
				disabled={checked || isLoading}
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
			<Input
				label="Powtórz hasło"
				type="password"
				disabled={checked || isLoading}
				color={errors.confirmPassword?.message && "red"}
				title={errors.confirmPassword?.message}
				{...register("confirmPassword", {
					required: "Pole wymagane",
					validate: (value) =>
						getValues().password === value || "Hasła różnią się od siebie",
				})}
			/>
			<Button type="submit" disabled={checked || isLoading} name="submit">
				Zarejestruj
			</Button>
		</form>
	);
};

export default RegisterForm;

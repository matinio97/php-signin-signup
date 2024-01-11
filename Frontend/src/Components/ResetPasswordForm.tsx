import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "./Input";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { urlBackend } from "../variables";

type FormTypes = {
	token: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const ResetPasswordForm = () => {
	const {
		register,
		handleSubmit,
		getValues,
		reset,
		formState,
		setValue,
		setError,
		clearErrors,
	} = useForm<FormTypes>();
	const { errors } = formState;

	const [searchParams] = useSearchParams();
	const token: string = searchParams.get("token") || "";
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!token || token.length !== 32) navigate("/");
		else setValue("token", token);

		// console.log(token);
	}, [token, navigate, setValue]);

	const onSubmit = (data: FormTypes) => {
		setIsLoading(true);
		const url = `${urlBackend}/includes/password-recovery-form.inc.php`;

		axios
			.post(url, data)
			.then((response) => {
				toast.success(response.data, {
					duration: 5000,
				});
				reset();
				navigate("/");
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
		<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
			<form
				method="post"
				className="register"
				onSubmit={handleSubmit(onSubmit)}>
				<label>Zmiana hasła</label>
				<Input
					label="Adres email"
					color={errors.email?.message && "red"}
					title={errors.email?.message}
					disabled={isLoading}
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
					color={errors.password?.message && "red"}
					title={errors.password?.message}
					disabled={isLoading}
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
					color={errors.confirmPassword?.message && "red"}
					title={errors.confirmPassword?.message}
					disabled={isLoading}
					{...register("confirmPassword", {
						required: "Pole wymagane",
						validate: (value) =>
							getValues().password === value || "Hasła różnią się od siebie",
					})}
				/>
				<Button
					type="submit"
					name="submit"
					style={{ width: "max-content" }}
					disabled={isLoading}>
					Zmień hasło
				</Button>
			</form>
		</div>
	);
};

export default ResetPasswordForm;

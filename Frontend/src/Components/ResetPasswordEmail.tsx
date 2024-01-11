import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import styled from "styled-components";
import axios from "axios";
import toast from "react-hot-toast";
import { urlBackend } from "../variables";
import { useState } from "react";

const P = styled.p`
	font-weight: 600;
	color: #fff;
`;

type Props = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormTypes = {
	email: string;
};

const ResetPasswordEmail = ({ setOpen }: Props) => {
	const { register, handleSubmit, reset, formState, setError, clearErrors } =
		useForm<FormTypes>();
	const { errors } = formState;
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const onSubmit = (data: FormTypes) => {
		setIsLoading(true);
		const url = `${urlBackend}/includes/password-recovery-email.inc.php`;

		const postData = new FormData();
		postData.append("email", data.email);

		axios
			.post(url, data)
			.then((response) => {
				toast.success(response.data, {
					duration: 5000,
				});
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
		<Modal
			setOpen={setOpen}
			style={{ background: "url(background.jpg) no-repeat center / cover" }}>
			<form
				method="post"
				className="register"
				onSubmit={handleSubmit(onSubmit)}>
				<label>Zresetuj hasło</label>
				<P>Wprowadź adres email konta</P>
				<Input
					label="Adres email"
					disabled={isLoading}
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
				<Button
					type="submit"
					name="submit"
					style={{ width: "max-content" }}
					disabled={isLoading}>
					Zresetuj hasło
				</Button>
			</form>
		</Modal>
	);
};

export default ResetPasswordEmail;

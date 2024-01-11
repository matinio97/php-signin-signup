import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../Components/Button";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useState } from "react";
import { urlBackend } from "../variables";
import axios from "axios";
import toast from "react-hot-toast";

const Layout = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 1.2rem;
`;

const Box = styled.div`
	width: 100%;
	padding: 1rem;
`;

interface IUserData {
	user_id: number;
	username: string;
	user_email: string;
	exp: number;
}

const Account = () => {
	const authUser = useAuthUser<IUserData>();
	const user_id = authUser?.user_id;
	const username = authUser?.username;
	const user_email = authUser?.user_email;

	const signOut = useSignOut();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const logout = () => {
		signOut();
		navigate("/");
	};

	const deleteAccount = () => {
		setIsLoading(true);
		const url = `${urlBackend}/includes/delete-account.inc.php`;

		axios
			.post(url, { id: user_id })
			.then((response) => {
				logout();
				toast.success(response.data);
				setIsLoading(false);
			})
			.catch(() => {
				toast.error("Wystąpił błąd podczas usuwania konta");
			});
	};

	return (
		<Layout>
			<Box style={{ flex: 1 }}>
				<h3>Twoje konto </h3>
				<br />
				Id: {user_id} <br />
				Nazwa: {username} <br />
				Email: {user_email} <br />
			</Box>
			<Box className="account-buttons">
				<Button onClick={() => logout()} disabled={isLoading}>
					Wyloguj
				</Button>
				<Button
					style={{ background: "linear-gradient(90deg, #f25454, #ff0000)" }}
					onClick={() => deleteAccount()}
					disabled={isLoading}>
					Usuń konto
				</Button>
			</Box>
		</Layout>
	);
};

export default Account;

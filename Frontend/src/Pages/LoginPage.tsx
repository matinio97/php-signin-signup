import { useState } from "react";
import RegisterForm from "../Components/RegisterForm";
import Overlay from "../Components/Overlay";
import LoginForm from "../Components/LoginForm";

const LoginPage = () => {
	const storedValue = localStorage.getItem("loginChecked");

	const [checked, setChecked] = useState<boolean>(
		storedValue !== null ? JSON.parse(storedValue) : false
	);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked);
		localStorage.setItem("loginChecked", JSON.stringify(e.target.checked));
	};

	return (
		<main className="main">
			<input
				onChange={(e) => handleChange(e)}
				checked={checked}
				type="checkbox"
				id="chk"
				aria-hidden={true}
			/>
			<RegisterForm checked={checked} />
			<Overlay checked={checked} />
			<LoginForm checked={checked} />
		</main>
	);
};

export default LoginPage;

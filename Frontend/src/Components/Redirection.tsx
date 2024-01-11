import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirection = () => {
	const navigation = useNavigate();
	useEffect(() => {
		navigation("/");
	}, [navigation]);

	return null;
};

export default Redirection;

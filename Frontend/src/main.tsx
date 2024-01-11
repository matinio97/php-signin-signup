import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";

interface IUserData {}

const store = createStore<IUserData>({
	authName: "_auth",
	authType: "cookie",
	cookieDomain: window.location.hostname,
	cookieSecure: false,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider store={store}>
			<App />
		</AuthProvider>
	</React.StrictMode>
);

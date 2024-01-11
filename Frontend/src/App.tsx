import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./Pages/Account";
import LoginPage from "./Pages/LoginPage";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import ResetPasswordForm from "./Components/ResetPasswordForm";
import Redirection from "./Components/Redirection";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/reset-password" element={<ResetPasswordForm />} />
					<Route path="*" element={<Redirection />} />
					<Route
						path="/account"
						element={
							<RequireAuth fallbackPath="/">
								<Account />
							</RequireAuth>
						}
					/>
				</Routes>
			</BrowserRouter>

			<Toaster
				position="top-center"
				gutter={12}
				containerStyle={{ margin: "8px" }}
				toastOptions={{
					success: {
						duration: 3000,
						style: {
							color: "#d4fad4",
							border: "1px solid #62a062",
						},
					},
					error: {
						duration: 3000,
						style: {
							color: "#fcc2c2",
							border: "1px solid #a10707",
						},
					},
					style: {
						fontSize: "12px",
						maxWidth: "500px",
						padding: "8px 12px",
						backgroundColor: "#131313",
					},
				}}
			/>
		</>
	);
}

export default App;

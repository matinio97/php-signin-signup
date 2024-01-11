import React, { useState } from "react";
import { useWindowWidth } from "../Hooks/useWindowWidth";
import ResetPasswordEmail from "./ResetPasswordEmail";

const Overlay = ({ checked }: { checked: boolean }) => {
	const windowWidth = useWindowWidth();
	const [open, setOpen] = useState<boolean>(false);
	return (
		<div className="overlay">
			{!checked ? (
				<React.Fragment key="register_info">
					{windowWidth < 768 ? (
						<></>
					) : (
						<>
							<h3>Cześć!</h3>
							<p>
								Aby dołączyć do naszej społeczności wprowadź dane w formularzu
								rejestracyjnym.
							</p>
						</>
					)}
					<p>Masz już konto?</p>
					<label htmlFor="chk" aria-hidden={true} className="formLabel">
						Zaloguj się
					</label>
				</React.Fragment>
			) : (
				<React.Fragment key="login_mobile_info">
					{windowWidth < 768 ? (
						<></>
					) : (
						<>
							<h3>Witaj ponownie!</h3>
							<p>
								Wprowadź dane w formularzu, aby zalogować się na swoje konto.
							</p>
						</>
					)}
					<p>Nie masz konta?</p>
					<label htmlFor="chk" aria-hidden={true} className="formLabel">
						Zarejestruj się
					</label>
					<span onClick={() => setOpen(true)} className="formLabel">
						Zapomniałeś hasła?
					</span>
					{open && <ResetPasswordEmail open={open} setOpen={setOpen} />}
				</React.Fragment>
			)}
		</div>
	);
};

export default Overlay;

import { createPortal } from "react-dom";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Window = styled.div`
	overflow: hidden;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 100;
	background-color: white;
	border-radius: 1rem;
	box-shadow: 0px 0px 25px #082568;
`;

const Box = styled.div`
	height: 100%;
	position: relative;
	padding: 2rem 1rem 1rem 1rem;
`;

const Icon = styled.div`
	position: absolute;
	border-radius: 999px;
	right: 1.5rem;
	top: 1.5rem;
	padding: 0.2rem;
	transition: all 0.3s;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	& svg {
		box-sizing: border-box;
		font-size: 1.4rem;
		color: #fff;
	}
`;

type ModalProps = React.ComponentPropsWithRef<"div"> & {
	children: React.ReactNode;
	style?: React.CSSProperties;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ children, style = {}, setOpen }: ModalProps) => {
	return createPortal(
		<Overlay>
			<Window style={style}>
				<Box>
					<Icon
						onClick={() => {
							setOpen(false);
						}}>
						<MdClose />
					</Icon>
					{children}
				</Box>
			</Window>
		</Overlay>,
		document.body
	);
};

export default Modal;

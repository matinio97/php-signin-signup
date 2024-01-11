import { useRef } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
	width: max-content;
	padding: 1rem 3rem;
	color: #fff;
	font-weight: 600;
	font-size: 16px;
	border-radius: 999px;
	background: linear-gradient(90deg, #0162c8, #7730b6);
	border: none;
	outline: none;
	overflow: hidden;
	position: relative;
	user-select: none;
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		box-shadow: inset 0 0 3px #7497be;
	}

	& span {
		position: absolute;
		background-color: #fff;
		transform: translate(-50%, -50%);
		pointer-events: none;
		border-radius: 50%;
		animation: ripples 0.5s ease-in-out;
	}

	@keyframes ripples {
		0% {
			width: 0;
			height: 0;
			opacity: 0.5;
		}
		100% {
			width: 200px;
			height: 200px;
			opacity: 0;
		}
	}
`;

type ButtonProps = React.ComponentPropsWithRef<"button"> & {
	children: React.ReactNode;
	style?: React.CSSProperties;
	onClick?: () => void;
};

const Button = ({ children, style = {}, onClick, ...rest }: ButtonProps) => {
	const ref = useRef<HTMLButtonElement>(null);

	function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		const rect = e.currentTarget.getBoundingClientRect();
		const x: number = e.clientX - rect.left;
		const y: number = e.clientY - rect.top;
		const ripples = document.createElement("span");
		ripples.style.left = x + "px";
		ripples.style.top = y + "px";

		if (ref.current) {
			ref.current.appendChild(ripples);
			setTimeout(() => {
				ripples.remove();
			}, 1000);
		}
		onClick?.();
	}

	return (
		<StyledButton
			ref={ref}
			onClick={(e) => handleClick(e)}
			style={style}
			{...rest}>
			{children}
		</StyledButton>
	);
};

export default Button;

import React, { Ref } from "react";
import styled, { css } from "styled-components";

const Box = styled.div`
	position: relative;
	width: 250px;

	& input {
		font-size: 12px;
		width: 100%;
		padding: 1.2rem 1rem 0.6rem 1rem;
		border: none;
		border-bottom: 2px solid ${(props) => props.color || "white"};
		outline: none;
		background-color: rgba(0, 0, 0, 0.5);
		color: #dadada;
		transition: all 0.3s;

		&:placeholder-shown ~ span {
			transform: translateX(0);
			padding: 0.8rem;
			font-size: 12px;
		}

		&:not(empty) ~ span,
		&:valid ~ span,
		&:focus ~ span {
			transform: translateX(0.8rem);
			font-size: 10px;
			padding: 0.2rem;
		}
		&:focus ~ span {
			color: ${(props) => props.color || "#7c9dff"};
		}

		&:focus {
			border-bottom: 2px solid ${(props) => props.color || "#7c9dff"};
		}
	}

	& span {
		font-size: 12px;
		position: absolute;
		left: 0;
		padding: 0.8rem;
		pointer-events: none;
		color: ${(props) => props.color || "white"};
		text-transform: uppercase;
		transition: all 0.3s;
	}

	${(props) =>
		props.color === "red" &&
		css`
			animation: shake 0.2s ease-in-out;
		`}

	@keyframes shake {
		0% {
			margin-left: 0rem;
		}
		25% {
			margin-left: 0.5rem;
		}
		75% {
			margin-left: -0.5rem;
		}
		100% {
			margin-left: 0rem;
		}
	}
`;

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
	label: string;
	color?: string;
};

const Input = React.forwardRef(
	(
		{ type = "text", label, color, ...rest }: InputProps,
		ref: Ref<HTMLInputElement>
	) => {
		if (
			type === "text" ||
			type === "number" ||
			type === "password" ||
			type === "email" ||
			type === "search" ||
			type === "url" ||
			type === "tel"
		) {
			return (
				<Box color={color}>
					<input
						type={type}
						required={true}
						{...rest}
						autoComplete="off"
						ref={ref}
						placeholder=" "
					/>
					<span>{label}</span>
				</Box>
			);
		}
		return <input type={type} ref={ref} />;
	}
);

export default Input;

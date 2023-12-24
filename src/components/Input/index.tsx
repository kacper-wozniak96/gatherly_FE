import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';
import { useStyles } from './styles';
import { InputLabel } from '../InputLabel';

export enum EInputType {
	TEXT = 'text',
	PASSWORD = 'password',
}

interface IInputProps<TInputName> {
	label: string;
	type?: EInputType;
	isRequired?: boolean;
	value: string;
	onChange: (inputName: TInputName, value: string) => void;
	inputName: TInputName;
	textFieldProps?: TextFieldProps;
	className?: string;
}

export const Input = <TInputName,>(props: IInputProps<TInputName>) => {
	const { label, type = 'text', isRequired, value, onChange, inputName, textFieldProps, className } = props;
	const { classes } = useStyles();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(inputName, event.target.value);
	};

	return (
		<div className={`${classes.wrapper} ${className}`}>
			<InputLabel label={label} isRequired={isRequired} />
			<TextField
				{...textFieldProps}
				className={classes.input}
				hiddenLabel
				type={type}
				value={value}
				onChange={handleChange}
				size="small"
			/>
		</div>
	);
};

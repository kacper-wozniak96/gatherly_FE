import { TextField } from '@mui/material';
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
}

export const Input = <TInputName,>(props: IInputProps<TInputName>) => {
	const { label, type = 'text', isRequired, value, onChange, inputName } = props;
	const { classes } = useStyles();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(inputName, event.target.value);
	};

	return (
		<div className={classes.wrapper}>
			<InputLabel label={label} isRequired={isRequired} />
			<TextField className={classes.input} hiddenLabel type={type} value={value} onChange={handleChange} />
		</div>
	);
};

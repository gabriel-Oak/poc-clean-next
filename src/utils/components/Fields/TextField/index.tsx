/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { FieldProps } from '../types';

export type TextFieldProps = MuiTextFieldProps & FieldProps;

const TextField: FC<TextFieldProps> = ({
  name,
  rules,
  control,
  defaultValue,
  ...inputProps
}) => (
  <Controller
    name={name}
    defaultValue={defaultValue}
    rules={rules}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <MuiTextField
        {...inputProps}
        {...field}
        error={!!error}
        helperText={error?.message}
      />
    )}
  />
);

TextField.defaultProps = {
  defaultValue: '',
};

export default TextField;

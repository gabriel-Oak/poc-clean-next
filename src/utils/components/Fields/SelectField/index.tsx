/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { FieldProps } from '../types';
import clsx from 'clsx';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Label } from './styles';

export type SelectProps = FieldProps & {
  classes?: {
    root?: string;
    label?: string;
    helperText?: string;
  };
  label: string;
  children: JSX.Element | JSX.Element[];
};

const SelectField: FC<SelectProps> = ({
  name,
  rules,
  control,
  defaultValue,
  classes,
  label,
  children,
  ...inputProps
}) => (
  <Controller
    name={name}
    defaultValue={defaultValue}
    rules={rules}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <FormControl fullWidth error={!!error}>
        <Label htmlFor={name}>
          {label}
        </Label>

        <Select {...field} {...inputProps} className={classes?.root}>
          <MenuItem value="">
            {label}
          </MenuItem>
          {children}
        </Select>

        {!!error && (
          <FormHelperText
            className={clsx(classes?.helperText)}
          >
            {error?.message}
          </FormHelperText>
        )}
      </FormControl>
    )}
  />
);


SelectField.defaultProps = {
  defaultValue: '',
};

export default SelectField;

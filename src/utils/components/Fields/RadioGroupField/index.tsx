/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { FieldProps } from '../types';
import clsx from 'clsx';
import { FormControl, FormHelperText, InputLabel, RadioGroup, RadioGroupProps, Typography } from '@mui/material';

export type RadioGroupFieldProps = RadioGroupProps &
  FieldProps & {
    classes?: {
      root?: string;
      label?: string;
      helperText?: string;
    };
    label?: string;
  };

const RadioGroupField: FC<RadioGroupFieldProps> = ({
  name,
  rules,
  control,
  defaultValue,
  children,
  classes,
  label,
  ...inputProps
}) => (
  <Controller
    name={name}
    defaultValue={defaultValue}
    rules={rules}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <FormControl fullWidth error={!!error}>
        <Typography variant="subtitle1">
          {label}
        </Typography>

        <RadioGroup className={classes?.root} {...inputProps} {...field}>
          {children}
        </RadioGroup>

        {!!error && (
          <FormHelperText>
            {error?.message}
          </FormHelperText>
        )}
      </FormControl>
    )}
  />
);

RadioGroupField.defaultProps = {
  defaultValue: '',
};

export default RadioGroupField;

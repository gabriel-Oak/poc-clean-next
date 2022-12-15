/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  RadioGroup,
} from '@material-ui/core';
import { RadioGroupProps } from '@material-ui/core/RadioGroup';
import { FieldProps } from '../types';
import useStyles from './styles';
import clsx from 'clsx';

export type RadioGroupFieldProps = RadioGroupProps &
  FieldProps & {
    classes?: {
      root?: string;
      label?: string;
      helperText?: string;
    };
  };

const RadioGroupField: FC<RadioGroupFieldProps> = ({
  name,
  rules,
  control,
  defaultValue,
  children,
  classes,
  ...inputProps
}) => {
  const internalClasses = useStyles();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <RadioGroup className={classes?.root} {...inputProps} {...field}>
            {children}
          </RadioGroup>

          {!!error && (
            <FormHelperText className={clsx(internalClasses.helperText)}>
              {error?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

RadioGroupField.defaultProps = {
  defaultValue: '',
};

export default RadioGroupField;

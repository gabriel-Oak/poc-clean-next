/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { FieldProps } from '../types';
import useStyles from './styles';
import clsx from 'clsx';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';

export type SelectProps = FieldProps & {
    classes?: {
      root?: string;
      label?: string;
      helperText?: string;
    };
    options: Map<string, any>[];
    mapOptions?: {
      label?: string;
      value?: string;
    };
  };

const SelectField: FC<SelectProps> = ({
  name,
  rules,
  control,
  defaultValue,
  classes,
  options,
  mapOptions,
  ...inputProps
}) => {
  const internalClasses = useStyles();
  const mappedOptions = useMemo(
    () =>
      mapOptions
        ? options.map((o: any) => ({
            label: o[mapOptions?.label || 'label'],
            value: o[mapOptions?.value || 'value'],
          }))
        : options,
    [options, mapOptions],
  );

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel htmlFor={name} className={internalClasses.selectLabel}>
            Selecione o provedor
          </InputLabel>

          <Select {...field} {...inputProps} className={classes?.root}>
            {mappedOptions.map(({ label, value }: any) => (
              <MenuItem value={value} key={value}>
                {label}
              </MenuItem>
            ))}
          </Select>

          {!!error && (
            <FormHelperText
              className={clsx(internalClasses.helperText, classes?.helperText)}
            >
              {error?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

SelectField.defaultProps = {
  defaultValue: '',
};

export default SelectField;

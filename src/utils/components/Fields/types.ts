/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, ControllerProps } from 'react-hook-form';

export type FieldProps = {
  control: Control<any, any>;
  name: string;
  rules?: ControllerProps['rules'];
  defaultValue?: any;
};

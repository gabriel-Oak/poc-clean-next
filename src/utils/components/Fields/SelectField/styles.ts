import { InputLabel } from '@mui/material';
import { styled } from '@mui/system';

export const Label = styled(InputLabel)({
  '&.Mui-focused, &.MuiFormLabel-filled': {
    paddingTop: 12,
  },
});
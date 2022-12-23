import { FC } from 'react';
import { Close } from '@mui/icons-material';
import {
  Button, Divider, FormControlLabel, IconButton, MenuItem, Radio, Toolbar,
} from '@mui/material';
import { Box } from '@mui/system';
import { Container, FilterActions, Form } from './styles';
import TextField from '../../../utils/components/Fields/TextField';
import SelectField from '../../../utils/components/Fields/SelectField';
import { CharacterStatus } from '../../../features/character/types/character-filter';
import RadioGroupField from '../../../utils/components/Fields/RadioGroupField';
import { useHome } from '../HomeContext';
import { useFilter } from './FilterContext';

const FilterContent: FC = () => {
  const { onSubmit, setOpen, state, clearFilters } = useFilter();
  const { handleSubmit, control } = useHome().state.form;

  const status = Object.keys(CharacterStatus).map((k) => ({
    label: `${k[0].toUpperCase()}${k.substring(1)}`,
    value: k
  }));

  return (
    <>
      {state.isMobile && (
        <>
          <Toolbar>
            <Box marginLeft="auto">
              <IconButton onClick={() => setOpen(false)}>
                <Close />
              </IconButton>
            </Box>
          </Toolbar>

          <Divider />
        </>
      )}

      <Container
        ref={state.containerRef}
        isMobile={state.isMobile}
        height={state.containerRef?.current?.clientHeight || 200}
        windowHeight={global.innerHeight}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="name"
            label="Name"
            defaultValue=""
            variant="outlined"
            fullWidth
            control={control}
          />

          <TextField
            name="species"
            label="Species"
            defaultValue=""
            variant="outlined"
            fullWidth
            control={control}
          />

          <SelectField
            name="gender"
            defaultValue=""
            label="Gender"
            control={control}
          >
            <MenuItem value="female" >
              Female
            </MenuItem>

            <MenuItem value="male" >
              Male
            </MenuItem>

            <MenuItem value="genderless" >
              Genderless
            </MenuItem>
          </SelectField>

          <RadioGroupField
            name="status"
            defaultValue=""
            label="Status"
            row
            control={control}
          >
            <FormControlLabel
              value=""
              control={<Radio color="primary" size="small" />}
              label="All"
              labelPlacement="end"
            />

            {status.map(({ label, value }: any) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio color="primary" size="small" />}
                label={label}
                labelPlacement="end"
              />
            ))}
          </RadioGroupField>

          <FilterActions>
          <Button 
            type="button" 
            onClick={clearFilters} 
            fullWidth 
            color="secondary" 
            variant="contained"
          >
            Clear
          </Button>

          <Button type="submit" fullWidth variant="contained">
            Search
          </Button>
          </FilterActions>
        </Form>
      </Container>
    </>
  );
}

export default FilterContent;
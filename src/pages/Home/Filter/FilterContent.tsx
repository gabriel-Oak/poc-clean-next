import { FC } from 'react';
import { Close } from '@mui/icons-material';
import { Divider, IconButton, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { Container } from './styles';
import { useFilter } from './context';
import TextField from '../../../utils/components/Fields/TextField';

const FilterContent: FC = () => {
  const { onSubmit, toggleDrawer, state } = useFilter();
  const { handleSubmit, control } = state.form;

  return (
    <>
      {state.isMobile && (
        <>
          <Toolbar>
            <Box marginLeft="auto">
              <IconButton onClick={() => toggleDrawer(false)}>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            name="name"
            label="Name"
            defaultValue=""
            variant="outlined"
            fullWidth
            control={control}
          />

          <Box height={16} />

          <TextField
            name="species"
            label="Species"
            defaultValue=""
            variant="outlined"
            fullWidth
            control={control}
          />
        </form>
      </Container>
    </>
  );
}

export default FilterContent;
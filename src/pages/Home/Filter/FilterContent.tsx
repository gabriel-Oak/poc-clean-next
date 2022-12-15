import { FC } from 'react';
import { Close } from '@mui/icons-material';
import { Divider, IconButton, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { Container } from './styles';
import { useFilter } from './context';

const FilterContent: FC = () => {
  const { onSubmit, toggleDrawer, state } = useFilter();
  const { handleSubmit } = state.form;

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
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
          Consequaes sagittis orci a.Consequaes sagittis orci a.Consequaes sagittis orci a.Consequaes sagittis orci a.Consequaes sagittis orci a.
        </form>
      </Container>
    </>
  );
}

export default FilterContent;
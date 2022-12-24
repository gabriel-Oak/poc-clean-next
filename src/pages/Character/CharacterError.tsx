import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { FC } from 'react';
import { CustomError } from '../../utils/custom-error';
import { useCharacter } from './CharacterContext';

const CharacterError: FC = () => {
  const { search, state: { errorState, characterId } } = useCharacter();
  return (
    <Box alignItems="center" display="flex" flexDirection="column" mt={12}>
      <Image
        alt="error"
        src="https://i0.wp.com/indutalks.com.br/wp-content/uploads/2021/09/Entenda-a-historia-de-Rick-and-Morty.jpg?fit=1280%2C720&ssl=1"
        width={500}
        height={300}
        style={{ width: '100%', maxWidth: 500, height: 'auto', borderRadius: 16 }}
      />

      <Box mt={2} mb={2} alignItems="center">
        <Typography variant="h4" textAlign="center">
          Sorry, something went very very bad!
        </Typography>

        <Typography variant="body2" textAlign="center">
          {errorState!.message}
        </Typography>
      </Box>


      <Button variant="outlined" onClick={() => search(characterId)}>
        Refresh
      </Button>
    </Box>
  );
}

export default CharacterError;
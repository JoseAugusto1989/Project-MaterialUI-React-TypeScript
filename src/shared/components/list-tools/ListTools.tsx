import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

import { Environment } from '../../environments';

interface IListToolsProps {
    searchText?: string;
    showSearchInput?: boolean;
    changeSearchText?: (newText: string) => void;
    newButtonText?: string;
    showNewButton?: boolean;
    clickInNew?: () => void;
}

export const ListTools = ({
  searchText = '',
  showSearchInput = false, 
  changeSearchText,
  clickInNew,
  newButtonText = 'Novo',
  showNewButton = true,
}: IListToolsProps) => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      component={Paper}
      display="flex"
      alignItems="center"
    >
      {showSearchInput && (
        <TextField 
          size="small" 
          value={searchText}
          placeholder={Environment.SEARCH_INPUT}
          onChange={(e) => changeSearchText?.(e.target.value)} 
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {showNewButton && (
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={clickInNew}
            endIcon={<Icon>add</Icon>}
          >{newButtonText}</Button>
        )}
      </Box>
    </Box>
  );
};

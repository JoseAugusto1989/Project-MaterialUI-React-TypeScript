import {
  Box,
  Button,
  Divider,
  Icon,
  Skeleton,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Theme } from '@mui/system';

interface IDetailToolsProps {
  textButtonNew?: string;
  textButtonLogout?: string;
  showButtonNew?: boolean;
  showButtonBack?: boolean;
  showButtonDelete?: boolean;
  showButtonSave?: boolean;
  showButtonSaveAndClose?: boolean;

  showButtonLogout?: boolean;
  showButtonSaveLoading?: boolean;
  showButtonNewLoading?: boolean;
  showButtonBackLoading?: boolean;
  showButtonDeleteLoading?: boolean;
  showButtonSaveAndCloseLoading?: boolean;

  toClickInNew?: () => void;
  toClickInBack?: () => void;
  toClickInDelete?: () => void;
  toClickInSave?: () => void;
  toClickInLogout?: () => void;
  toClickInSaveAndClose?: () => void;
}

export const DetailTools = ({
  textButtonNew = 'Novo',
  textButtonLogout = 'Logout',
  showButtonNew = true,
  showButtonBack = true,
  showButtonDelete = true,
  showButtonSave = true,
  showButtonSaveAndClose = false,

  showButtonLogout = false,
  showButtonSaveLoading = false,
  showButtonNewLoading = false,
  showButtonBackLoading = false,
  showButtonDeleteLoading = false,
  showButtonSaveAndCloseLoading = false,

  toClickInBack,
  toClickInDelete,
  toClickInNew,
  toClickInLogout,
  toClickInSave,
  toClickInSaveAndClose,
}: IDetailToolsProps) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
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
      {showButtonSave && !showButtonSaveLoading && (
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={toClickInSave}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}

      {showButtonSaveLoading && <Skeleton width={110} height={60} />}

      {showButtonNew && !showButtonNewLoading && !smDown && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          onClick={toClickInNew}
          startIcon={<Icon>add</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            {textButtonNew}
          </Typography>
        </Button>
      )}

      {showButtonNewLoading && !smDown && <Skeleton width={95} height={60} />}

      {showButtonDelete && !showButtonDeleteLoading && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          onClick={toClickInDelete}
          startIcon={<Icon>delete</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}

      {showButtonDeleteLoading && !smDown && (
        <Skeleton width={110} height={60} />
      )}

      {showButtonSaveAndClose &&
        !showButtonSaveAndCloseLoading &&
        !smDown &&
        !mdDown && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          onClick={toClickInSaveAndClose}
          startIcon={<Icon>save</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
              Salvar e fechar
          </Typography>
        </Button>
      )}

      {showButtonSaveAndCloseLoading && !smDown && !mdDown && (
        <Skeleton width={170} height={60} />
      )}

      {showButtonBack &&
        (showButtonNew ||
          showButtonDelete ||
          showButtonSave ||
          showButtonSaveAndClose) && (
        <Divider variant="middle" orientation="vertical" />
      )}

      {showButtonBack && !showButtonBackLoading && (
        <Button
          color="primary"
          variant="outlined"
          disableElevation
          onClick={toClickInBack}
          startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}

      {showButtonBackLoading && <Skeleton width={110} height={60} />}
    </Box>
  );
};

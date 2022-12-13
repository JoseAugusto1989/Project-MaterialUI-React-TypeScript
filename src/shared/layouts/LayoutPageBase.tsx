import {
  Icon,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDrawerContext } from '../contexts';
import { ButtonLog, ContainerLog } from './LayoutPageBase.styles';

interface ILayoutPageBaseProps {
  title: string;
  children: ReactNode;
  toolbar?: ReactNode;
}

const LayoutPageBase = ({ children, title, toolbar }: ILayoutPageBaseProps) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggleDrawerOpen } = useDrawerContext();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        display="flex"
        padding={1}
        alignItems="center"
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
        gap={1}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {title}
        </Typography>
        <ContainerLog>
          <ButtonLog onClick={handleLogout}>Logout</ButtonLog>
        </ContainerLog>
      </Box>

      {toolbar && <Box>{toolbar}</Box>}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};

export default LayoutPageBase;

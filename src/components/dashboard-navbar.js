import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  AppBar,
  Box,
  IconButton, MenuList,
  Toolbar,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountMenu } from './menu/account-menu';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small"/>
          </IconButton>
          <Box sx={{ ml: 1 }}/>
          <Typography
            variant="h3"
            color="black"
          >
            Time Tracker
          </Typography>
          <Box sx={{ flexGrow: 1 }}/>
          <MenuList>
            <AccountMenu/>
          </MenuList>
          <Box sx={{ mr: 1 }}/>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};

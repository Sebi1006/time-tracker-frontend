import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { Users as UsersIcon } from '../icons/users';
import { Clock as ClockIcon } from '../icons/clock';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { getOrganizationName } from '../utils/config';

const adminItems = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small"/>),
    title: 'Dashboard'
  },
  {
    href: '/timetracking',
    icon: (<ClockIcon fontSize="small"/>),
    title: 'Track Time'
  },
  {
    href: '/users',
    icon: (<UsersIcon fontSize="small"/>),
    title: 'Users'
  },
  {
    href: '/projects-tags',
    icon: (<ShoppingBagIcon fontSize="small"/>),
    title: 'Projects & Tags'
  },
  {
    href: '/account',
    icon: (<UserIcon fontSize="small"/>),
    title: 'Account'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small"/>),
    title: 'Settings'
  }
];

const userItems = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small"/>),
    title: 'Dashboard'
  },
  {
    href: '/timetracking',
    icon: (<ClockIcon fontSize="small"/>),
    title: 'Track Time'
  },
  {
    href: '/projects-tags',
    icon: (<ShoppingBagIcon fontSize="small"/>),
    title: 'Projects & Tags'
  },
  {
    href: '/account',
    icon: (<UserIcon fontSize="small"/>),
    title: 'Account'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small"/>),
    title: 'Settings'
  }
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  const [values, setValues] = useState({
    organization: '',
    subModel: ''
  });

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
      setAdmin(JSON.parse(localStorage.getItem('USER_INFORMATION')).roles.includes('ROLE_ADMIN'));

      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }

      if (JSON.parse(localStorage.getItem('USER_INFORMATION')).subModel === 'free') {
        setValues({
          organization: 'Sample Inc.',
          subModel: 'Free'
        });
      } else if (JSON.parse(localStorage.getItem('USER_INFORMATION')).subModel === 'premium') {
        if (localStorage.getItem('ORGANIZATION_NAME') !== null) {
          setValues({
            organization: localStorage.getItem('ORGANIZATION_NAME'),
            subModel: 'Premium'
          });
        } else {
          getOrganizationName()
            .then(response => {
              setValues({
                organization: response,
                subModel: 'Premium'
              });
              localStorage.setItem('ORGANIZATION_NAME', response);
            });
        }
      } else if (JSON.parse(localStorage.getItem('USER_INFORMATION')).subModel === 'enterprise') {
        if (localStorage.getItem('ORGANIZATION_NAME') !== null) {
          setValues({
            organization: localStorage.getItem('ORGANIZATION_NAME'),
            subModel: 'Enterprise'
          });
        } else {
          getOrganizationName()
            .then(response => {
              setValues({
                organization: response,
                subModel: 'Enterprise'
              });
              localStorage.setItem('ORGANIZATION_NAME', response);
            });
        }
      } else {
        setValues({
          organization: '???',
          subModel: 'Unknown'
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  {values.organization}
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  Your tier: {values.subModel}
                </Typography>
              </div>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        {
          admin ?
            <Box sx={{ flexGrow: 1 }}>
              {adminItems.map((item) => (
                <NavItem
                  key={item.title}
                  icon={item.icon}
                  href={item.href}
                  title={item.title}
                />
              ))}
            </Box> :
            <Box sx={{ flexGrow: 1 }}>
              {userItems.map((item) => (
                <NavItem
                  key={item.title}
                  icon={item.icon}
                  href={item.href}
                  title={item.title}
                />
              ))}
            </Box>
        }
        <Divider sx={{ borderColor: '#2D3748' }}/>
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="neutral.100"
            variant="subtitle2"
          >
            Created by Group STS
          </Typography>
          <Typography
            color="neutral.500"
            variant="body2"
          >
            Cloud Application Development (Winter Term 2021/22)
          </Typography>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};

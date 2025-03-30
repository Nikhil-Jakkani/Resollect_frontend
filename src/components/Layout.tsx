import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Avatar, Typography } from '@mui/material';
import Sidebar from './Sidebar';

const LayoutRoot = styled('div')({
  display: 'flex',
  height: '100vh',
});

const MainContent = styled('div')({
  flexGrow: 1,
  padding: '0',
  marginLeft: '240px', // Same as drawer width
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  overflow: 'auto',
});

const StyledAppBar = styled(AppBar)({
  marginLeft: '240px',
  width: 'calc(100% - 240px)',
  backgroundColor: 'white',
  color: 'black',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
});

const UserProfile = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginLeft: 'auto',
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutRoot>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="fixed">
          <Toolbar>
            <UserProfile>
              <Avatar sx={{ bgcolor: '#1976d2' }}>T</Avatar>
              <Box>
                <Typography variant="subtitle1">Tushar</Typography>
                <Typography variant="caption" color="textSecondary">
                  tushar@resollect.com
                </Typography>
              </Box>
            </UserProfile>
          </Toolbar>
        </StyledAppBar>
        <MainContent>
          <Toolbar /> {/* Spacing for fixed AppBar */}
          {children}
        </MainContent>
      </Box>
    </LayoutRoot>
  );
};

export default Layout; 
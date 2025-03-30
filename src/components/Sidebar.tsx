import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  ListItemButton,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DescriptionIcon from '@mui/icons-material/Description';
import GavelIcon from '@mui/icons-material/Gavel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import LockIcon from '@mui/icons-material/Lock';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
  },
});

const Logo = styled('div')({
  padding: '20px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
});

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Portfolio', icon: <FolderIcon />, path: '/portfolio' },
  { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
  { text: 'Notices', icon: <DescriptionIcon />, path: '/notices' },
  { text: 'Auction', icon: <GavelIcon />, path: '/auction' },
  { text: 'Data Upload', icon: <CloudUploadIcon />, path: '/data-upload' },
  { text: 'Control Panel', icon: <SettingsIcon />, path: '/control-panel' },
  { text: 'User Management', icon: <PeopleIcon />, path: '/user-management' },
  { text: 'Permissions', icon: <LockIcon />, path: '/permissions' },
];

const Sidebar: React.FC = () => {
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Logo>
        <Typography variant="h6" component="div">
          Resollect
        </Typography>
      </Logo>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
              },
              '&.active': {
                backgroundColor: 'rgba(25, 118, 210, 0.12)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar; 
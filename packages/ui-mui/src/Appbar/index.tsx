'use client';

import { AppBar as MuiAppbar, Avatar, Box, IconButton, Toolbar, Typography, AppBarProps } from '@mui/material';

interface Props extends Omit<AppBarProps, 'color'> {
  icon: React.ReactNode;
  title: string;
  color: string;
}

export const Appbar = ({ icon, title, color }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppbar position="static">
        <Toolbar sx={{ background: color }}>
          <IconButton size="large" edge="start" color="inherit">
            {icon}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Avatar alt="dohyun" src="./favicon.ico" sx={{ mr: 0.42 }} />
        </Toolbar>
      </MuiAppbar>
    </Box>
  );
};

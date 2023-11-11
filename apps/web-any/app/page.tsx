'use client';

import { Chat } from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors';
import { SnackbarProvider } from 'notistack';
import { Appbar, Progress } from 'ui-mui';

export default function Home() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Appbar icon={<Chat fontSize="large" />} title="Web-any" color={deepPurple[500]} />
      <Progress value={50} />
    </SnackbarProvider>
  );
}

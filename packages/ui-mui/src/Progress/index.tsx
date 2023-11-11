import { Box, LinearProgressProps, LinearProgress } from '@mui/material';

interface Props extends LinearProgressProps {
  value: number;
}

export const Progress = ({ ...props }: Props) => {
  return (
    <Box sx={{ width: '100%', mr: 1, mb: 2 }}>
      <LinearProgress variant="determinate" {...props} />
    </Box>
  );
};

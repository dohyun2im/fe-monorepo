import { ButtonTypeMap, Button as MuiButton } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';

export interface Props {
  children: ReactNode;
  isDisabled?: boolean;
  size?: ButtonTypeMap['props']['size'];
  bgColor?: CSSProperties['backgroundColor'];
  onClick: () => void;
}

export const Button = ({ children, isDisabled, size, onClick }: Props) => {
  return (
    <MuiButton variant="contained" disabled={isDisabled} size={size} onClick={onClick}>
      {children}
    </MuiButton>
  );
};

'use client';

import { useGlobalState } from '@/context';
import { type ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  icon?: ReactNode;
  name?: string;
  background?: string;
  selector?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  click?(): void;
  type?: 'submit' | 'button' | 'reset' | undefined;
  border?: string;
  color?: string;
}

const StyledButton = styled.button`
  display: flex;
  position: relative;
  align-items: center;
  color: ${(props) => props.theme.colorGrey2};
  z-index: 5;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.55s ease-in-out;

  i {
    font-size: 1.5rem;
    transition: all 0.55s ease-in-out;

    color: ${(props) => props.theme.colorGrey2};
  }

  &:hover {
    color: ${(props) => props.theme.colorGrey0};

    i {
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export function Button({
  icon,
  name,
  background,
  padding = '0.5rem 1rem',
  borderRad: borderRadius = '0.5rem',
  fw = '500',
  fs,
  click,
  type = 'button',
  border = 'none',
  color,
}: Props) {
  const { theme } = useGlobalState();

  return (
    <StyledButton
      type={type}
      onClick={click}
      theme={theme}
      style={{
        background,
        padding,
        borderRadius,
        fontWeight: fw,
        fontSize: fs,
        border,
        color,
      }}
    >
      {Boolean(icon) && icon}
      {name}
    </StyledButton>
  );
}

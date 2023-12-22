'use client';

import { useGlobalState } from '@/context';
import React from 'react';
import styled from 'styled-components';

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    filter: blur(4px);
  }

  .modal-content {
    padding: 2rem;
    position: relative;
    max-width: 630px;
    width: 100%;
    z-index: 100;

    background: ${(props) => props.theme.colorBg2};
    border-radius: 1rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  }
`;

export const ModalContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  border-radius: ${(props) => props.theme.borderRadiusMd2 ?? '1rem'};
  color: ${(props) => props.theme.colorWhite};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    label {
      margin-bottom: 0.7rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);
      cursor: pointer;

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      resize: none;
      padding: 1rem;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease;
    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      color: ${(props) => props.theme.colorWhite};
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;

    input {
      width: max-content;
    }

    label {
      margin: 0;
    }
  }
`;

export function Modal({ children }: LayoutProps) {
  const { theme, closeAllModals } = useGlobalState();

  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={closeAllModals!}></div>
      <div className="modal-content">{children}</div>
    </ModalStyled>
  );
}

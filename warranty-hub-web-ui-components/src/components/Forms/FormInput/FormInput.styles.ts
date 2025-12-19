import styled, { css } from 'styled-components';

// Define theme interface for TypeScript if not globally extended yet
interface ThemeProps {
  theme: {
    colors: {
      primary: string;
      error: string;
      text: {
        primary: string;
        secondary: string;
        disabled: string;
      };
      border: {
        default: string;
        focus: string;
        error: string;
      };
      background: {
        input: string;
        disabled: string;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
    };
    typography: {
      fontSizes: {
        sm: string;
        md: string;
      };
      fontFamily: string;
    };
    borderRadius: string;
    transitions: {
      default: string;
    };
  };
}

export const InputContainer = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

export const Label = styled.label<ThemeProps>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 500;
  cursor: pointer;
`;

interface StyledInputProps {
  $hasError: boolean;
}

export const StyledInput = styled.input<StyledInputProps & ThemeProps>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: ${({ theme }) => theme.colors.background.input};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.border.error : theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius};
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.default};

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.border.error : theme.colors.border.focus};
    box-shadow: 0 0 0 2px
      ${({ theme, $hasError }) =>
        $hasError ? `${theme.colors.error}33` : `${theme.colors.primary}33`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.disabled};
    color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
    border-color: ${({ theme }) => theme.colors.border.default};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export const ErrorText = styled.span<ThemeProps>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.xs};
  min-height: 1.2em;
  display: flex;
  align-items: center;
`;

export const HelperText = styled.span<ThemeProps>`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
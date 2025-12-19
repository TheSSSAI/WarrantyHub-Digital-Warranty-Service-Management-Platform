import styled, { css } from 'styled-components';

interface ThemeProps {
  theme: {
    colors: {
      border: {
        default: string;
      };
      background: {
        primary: string;
        secondary: string;
        hover: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
      primary: string;
    };
    spacing: {
      sm: string;
      md: string;
      lg: string;
    };
    typography: {
      fontFamily: string;
      fontSizes: {
        sm: string;
        md: string;
      };
      fontWeights: {
        bold: number;
        medium: number;
      };
    };
    borderRadius: string;
  };
}

export const GridContainer = styled.div<ThemeProps>`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.background.primary};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; /* Ensure readability on small screens via scroll */
`;

export const Thead = styled.thead<ThemeProps>`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;

export const Th = styled.th<{ $width?: string; $sortable?: boolean } & ThemeProps>`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  width: ${({ $width }) => $width || 'auto'};
  cursor: ${({ $sortable }) => ($sortable ? 'pointer' : 'default')};
  user-select: none;
  white-space: nowrap;

  &:hover {
    color: ${({ theme, $sortable }) => ($sortable ? theme.colors.text.primary : theme.colors.text.secondary)};
  }

  svg {
    vertical-align: middle;
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Tr = styled.tr<ThemeProps>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.hover};
  }
`;

export const Td = styled.td<ThemeProps>`
  padding: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.primary};
  vertical-align: middle;
`;

export const PaginationContainer = styled.div<ThemeProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

export const PaginationButton = styled.button<ThemeProps>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.background.hover};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
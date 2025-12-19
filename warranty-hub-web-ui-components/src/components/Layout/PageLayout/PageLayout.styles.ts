import styled from 'styled-components';

interface ThemeProps {
  theme: {
    colors: {
      background: {
        body: string;
        surface: string;
      };
      border: {
        default: string;
      };
    };
    spacing: {
      md: string;
      lg: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    zIndex: {
      header: number;
      sidebar: number;
    };
    dimensions: {
      headerHeight: string;
      sidebarWidth: string;
      sidebarWidthCollapsed: string;
    };
  };
}

export const LayoutContainer = styled.div<ThemeProps>`
  display: grid;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.background.body};
  
  /* Desktop Layout: Sidebar | Header+Content */
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  grid-template-columns: ${({ theme }) => theme.dimensions.sidebarWidth} 1fr;
  grid-template-rows: ${({ theme }) => theme.dimensions.headerHeight} 1fr;
  
  /* Tablet/Mobile Layout: Stacked or Overlay Sidebar */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-areas:
      "header"
      "main";
    grid-template-columns: 1fr;
    grid-template-rows: ${({ theme }) => theme.dimensions.headerHeight} 1fr;
  }
`;

interface SidebarAreaProps {
  $collapsed?: boolean;
}

export const SidebarArea = styled.aside<SidebarAreaProps & ThemeProps>`
  grid-area: sidebar;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border.default};
  z-index: ${({ theme }) => theme.zIndex.sidebar};
  transition: width 0.3s ease;
  overflow-y: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none; /* In a real implementation, this would be a drawer */
  }
`;

export const HeaderArea = styled.header<ThemeProps>`
  grid-area: header;
  background-color: ${({ theme }) => theme.colors.background.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: ${({ theme }) => theme.zIndex.header};
`;

export const MainArea = styled.main<ThemeProps>`
  grid-area: main;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

export const PageTitle = styled.h1<ThemeProps>`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.background.surface}; /* Assuming text color usually contrasts surface */
`;
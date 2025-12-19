import React, { useState, useCallback } from 'react';
import { PageLayoutProps } from './PageLayout.types';
import { 
  LayoutContainer, 
  Main, 
  ContentWrapper, 
  Overlay 
} from './PageLayout.styles';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

/**
 * Standard Page Layout component for the WarrantyHub application.
 * 
 * Provides a responsive shell with:
 * - Collapsible Sidebar for navigation
 * - Header for titles and global actions
 * - Main content area
 * - Responsive mobile menu handling
 * 
 * Implements WCAG 2.1 AA landmarks (banner, navigation, main).
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  navigation,
  actions,
  title,
  userProfile,
  className
}) => {
  // State for sidebar visibility (Mobile) and collapsed state (Desktop)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // ---- Handlers ----

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleSidebarCollapse = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  // ---- Render ----

  return (
    <LayoutContainer className={className}>
      {/* 
        Mobile Overlay: Clicking this closes the sidebar on mobile devices.
        Only visible when mobile menu is open.
      */}
      <Overlay 
        $isOpen={isMobileMenuOpen} 
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* 
        Sidebar Navigation:
        - Responsive behavior handled by styles based on $isOpen and $isCollapsed props
        - Contains the primary app navigation
      */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={closeMobileMenu}
        onToggleCollapse={toggleSidebarCollapse}
      >
        {navigation}
      </Sidebar>

      {/* 
        Main Content Wrapper:
        - shifts based on sidebar width on desktop
      */}
      <ContentWrapper $isSidebarCollapsed={isSidebarCollapsed}>
        {/* 
          Header:
          - Contains page title, user profile, and global actions
          - Includes hamburger menu trigger for mobile
        */}
        <Header
          title={title}
          onMenuClick={toggleMobileMenu}
          actions={actions}
          userProfile={userProfile}
        />

        {/* 
          Main Content Area:
          - Where the page specific content is injected
          - Role="main" for accessibility landmark
        */}
        <Main role="main" id="main-content" tabIndex={-1}>
          {children}
        </Main>
      </ContentWrapper>
    </LayoutContainer>
  );
};
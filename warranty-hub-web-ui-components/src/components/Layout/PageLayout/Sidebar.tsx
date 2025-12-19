import React from 'react';
import {
  SidebarContainer,
  SidebarContent,
} from './PageLayout.styles';

export interface SidebarProps {
  /**
   * The navigation content (Menu items, Links) to render inside the sidebar.
   */
  children: React.ReactNode;

  /**
   * Optional class name for styling overrides
   */
  className?: string;

  /**
   * Whether the sidebar is in a collapsed state (for responsive layouts).
   * Note: This prop affects internal styling logic if connected to styled-components.
   */
  isCollapsed?: boolean;

  /**
   * Accessibility ID
   */
  id?: string;
}

/**
 * Standard Sidebar component for the PageLayout.
 * Acts as a container for navigation elements.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  children,
  className,
  isCollapsed = false,
  id = 'page-sidebar',
}) => {
  return (
    <SidebarContainer 
      as="aside" 
      className={className} 
      id={id}
      $isCollapsed={isCollapsed}
      aria-label="Main Navigation"
    >
      <SidebarContent>
        {children}
      </SidebarContent>
    </SidebarContainer>
  );
};
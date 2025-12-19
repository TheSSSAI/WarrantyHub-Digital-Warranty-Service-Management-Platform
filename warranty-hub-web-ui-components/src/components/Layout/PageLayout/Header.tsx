import React from 'react';
import {
  HeaderContainer,
  HeaderTitle,
  HeaderActions,
} from './PageLayout.styles';

export interface HeaderProps {
  /**
   * The main title to display in the header area.
   */
  title?: string;

  /**
   * Custom content for the header actions area (e.g., User Menu, Notifications, Theme Toggle).
   */
  actions?: React.ReactNode;

  /**
   * Optional class name for styling overrides
   */
  className?: string;
  
  /**
   * Accessibility ID
   */
  id?: string;
}

/**
 * Standard Header component for the PageLayout.
 * Provides a consistent top bar structure with title and action areas.
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  actions,
  className,
  id = 'page-header',
}) => {
  return (
    <HeaderContainer as="header" className={className} id={id}>
      <HeaderTitle as="h1">
        {title}
      </HeaderTitle>
      
      {actions && (
        <HeaderActions>
          {actions}
        </HeaderActions>
      )}
    </HeaderContainer>
  );
};
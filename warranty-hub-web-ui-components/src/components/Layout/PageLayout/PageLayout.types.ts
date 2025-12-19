import { ReactNode } from 'react';

/**
 * Props for the PageLayout component.
 * Provides the structural shell for the application.
 */
export interface PageLayoutProps {
  /**
   * The main content of the page.
   * Rendered in the main content area.
   */
  children: ReactNode;

  /**
   * The navigation component (Sidebar).
   * Should contain the navigation links.
   */
  navigation: ReactNode;

  /**
   * Optional actions/controls to render in the header (e.g., User Profile dropdown, Notifications).
   */
  actions?: ReactNode;

  /**
   * The title of the current page, displayed in the header.
   */
  title?: string;

  /**
   * Whether the sidebar is collapsed (minimized).
   * Useful for increasing content space on smaller desktop screens.
   * @default false
   */
  isSidebarCollapsed?: boolean;

  /**
   * Callback when the user toggles the sidebar collapse state.
   */
  onToggleSidebar?: () => void;

  /**
   * Optional class name for the root container.
   */
  className?: string;
  
  /**
   * Test ID for automation.
   */
  'data-testid'?: string;
}
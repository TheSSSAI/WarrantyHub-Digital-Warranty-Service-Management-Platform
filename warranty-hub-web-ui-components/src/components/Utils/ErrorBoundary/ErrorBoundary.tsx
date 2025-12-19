import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Fallback } from './Fallback';

export interface ErrorBoundaryProps {
  /**
   * Content to render when no errors are present
   */
  children: ReactNode;
  /**
   * Optional custom fallback UI to render when an error occurs.
   * If not provided, the default Fallback component will be used.
   */
  fallback?: ReactNode;
  /**
   * Optional callback fired when an error is caught.
   * Useful for logging to external services like Sentry or Azure App Insights.
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /**
   * Optional key to reset the error boundary when changed
   */
  resetKey?: string | number;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Enterprise-grade Error Boundary component for catching JavaScript errors
 * anywhere in the child component tree, logging those errors, and displaying
 * a fallback UI instead of the component tree that crashed.
 * 
 * Implements the React Error Boundary pattern.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined
    };
  }

  /**
   * Lifecycle method to update state when an error is thrown.
   * Enables showing the fallback UI in the next render pass.
   */
  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  /**
   * Lifecycle method for side effects like error logging.
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Execute the onError callback if provided (e.g., for logging services)
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      // Default logging to console in development
      if (process.env.NODE_ENV === 'development') {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
      }
    }
  }

  /**
   * Reacts to prop changes, specifically to reset the error state
   * if the resetKey prop changes (e.g., on route change).
   */
  public componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (this.props.resetKey !== prevProps.resetKey && this.state.hasError) {
      this.resetError();
    }
  }

  /**
   * Resets the error boundary state to attempt re-rendering children.
   */
  public resetError = (): void => {
    this.setState({
      hasError: false,
      error: undefined
    });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise use the standard Fallback component from Level 1
      return (
        <Fallback 
          error={this.state.error} 
          resetErrorBoundary={this.resetError} 
        />
      );
    }

    return this.props.children;
  }
}
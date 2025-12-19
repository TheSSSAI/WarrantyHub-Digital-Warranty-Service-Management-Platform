import React from 'react';
import styled from 'styled-components';

// Local styled components for the fallback UI
// In a larger system, these might be shared atoms, but for the ErrorBoundary package 
// they are often self-contained to ensure they render even if other systems fail.

const FallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 200px;
  background-color: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 8px;
  color: #991B1B;
  font-family: system-ui, -apple-system, sans-serif;
  text-align: center;
  role: alert;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

const Message = styled.p`
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: #7F1D1D;
  max-width: 600px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #DC2626;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #B91C1C;
  }

  &:focus {
    outline: 2px solid #991B1B;
    outline-offset: 2px;
  }
`;

export interface FallbackProps {
  /**
   * The error object that was thrown
   */
  error: Error;
  
  /**
   * Function to reset the error boundary state
   */
  resetErrorBoundary: () => void;
}

/**
 * Default fallback UI displayed when an error is caught by the ErrorBoundary.
 * Provides a user-friendly message and a way to retry the operation.
 */
export const Fallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <FallbackContainer role="alert" aria-live="assertive">
      <Title>Something went wrong</Title>
      <Message>
        {error.message || 'An unexpected error occurred. Please try again.'}
      </Message>
      <RetryButton 
        onClick={resetErrorBoundary}
        type="button"
        aria-label="Try again to reload the component"
      >
        Try Again
      </RetryButton>
    </FallbackContainer>
  );
};
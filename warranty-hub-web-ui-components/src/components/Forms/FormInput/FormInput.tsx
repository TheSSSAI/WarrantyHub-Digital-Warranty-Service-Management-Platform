import React, { forwardRef, useId } from 'react';
import {
  InputContainer,
  Label,
  StyledInput,
  ErrorText,
  HelperText,
} from './FormInput.styles';
import { FormInputProps } from './FormInput.types';

/**
 * Atomic Input component with built-in labeling, error handling, and accessibility support.
 * Implements WCAG 2.1 AA standards for form controls.
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      helperText,
      id: providedId,
      disabled,
      required,
      className,
      ...rest
    },
    ref
  ) => {
    // Generate unique IDs for accessibility linkage if not provided
    const uniqueId = useId();
    const inputId = providedId || `input-${uniqueId}`;
    const errorId = `error-${uniqueId}`;
    const helperId = `helper-${uniqueId}`;

    // Determine which element describes the input (error takes precedence)
    const describedBy = error ? errorId : helperText ? helperId : undefined;

    return (
      <InputContainer className={className} $isDisabled={disabled} $hasError={!!error}>
        <Label htmlFor={inputId} $isDisabled={disabled} $isRequired={required}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </Label>

        <StyledInput
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          aria-required={required}
          $hasError={!!error}
          {...rest}
        />

        {error && (
          <ErrorText id={errorId} role="alert" aria-live="polite">
            {error}
          </ErrorText>
        )}

        {!error && helperText && (
          <HelperText id={helperId}>
            {helperText}
          </HelperText>
        )}
      </InputContainer>
    );
  }
);

FormInput.displayName = 'FormInput';
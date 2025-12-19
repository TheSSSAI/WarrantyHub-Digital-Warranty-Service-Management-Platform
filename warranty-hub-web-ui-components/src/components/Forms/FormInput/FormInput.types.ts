import { InputHTMLAttributes } from 'react';

/**
 * Props for the FormInput component.
 * Extends standard HTML input attributes.
 */
export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * The label text displayed above the input.
   * Required for accessibility.
   */
  label: string;

  /**
   * Error message to display below the input.
   * If present, changes the input style to indicate an error state.
   */
  error?: string;

  /**
   * Helper text to display below the input (if no error is present).
   * Used for hints or instructions.
   */
  helperText?: string;

  /**
   * Unique identifier for the input.
   * If not provided, a UUID will be generated automatically to link label and input.
   */
  id?: string;

  /**
   * Test ID for automation.
   */
  'data-testid'?: string;
}
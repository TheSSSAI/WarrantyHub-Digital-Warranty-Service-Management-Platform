/**
 * Constants definitions for the OCR (Optical Character Recognition) Worker module.
 * These constants are used for Dependency Injection tokens, Queue names, and
 * configuration keys specific to the OCR processing domain.
 */

// Dependency Injection Tokens
export const OCR_PROVIDER = Symbol('OCR_PROVIDER');
export const OCR_OPTIONS = Symbol('OCR_OPTIONS');

// Service Bus / Messaging Constants
export const OCR_PROCESSING_QUEUE = 'ocr-processing-queue';
export const INVOICE_EVENTS_TOPIC = 'invoice-events';
export const INVOICE_UPLOADED_SUBSCRIPTION = 'ocr-worker';

// Event Patterns
export const INVOICE_UPLOADED_PATTERN = 'invoice.uploaded';

// Configuration Keys (for ConfigService)
export const CONFIG_KEY_DOC_INTELLIGENCE = 'docIntelligence';

// OCR Confidence Thresholds (Default values)
export const DEFAULT_CONFIDENCE_THRESHOLD = 0.8;

// Error Messages
export const ERR_OCR_PROCESSING_FAILED = 'OCR processing failed due to an provider error.';
export const ERR_FILE_DOWNLOAD_FAILED = 'Failed to download invoice file from storage.';
export const ERR_INVALID_FILE_TYPE = 'Unsupported file type for OCR processing.';
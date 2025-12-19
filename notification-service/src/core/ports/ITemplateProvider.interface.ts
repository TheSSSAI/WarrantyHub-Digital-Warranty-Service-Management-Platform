/**
 * Dependency Injection Token for the Template Provider.
 */
export const TEMPLATE_PROVIDER = Symbol('ITemplateProvider');

/**
 * Represents the result of a template rendering operation.
 */
export interface RenderedContent {
  subject: string;
  body: string; // HTML for email, Plain text for SMS/Push
  metadata?: Record<string, any>;
}

/**
 * Port (Interface) defining the contract for template rendering services.
 * Allows decoupling the core logic from specific template engines (Handlebars, EJS, SendGrid Templates).
 */
export interface ITemplateProvider {
  /**
   * Renders a notification template with the provided data context.
   * 
   * @param templateKey Unique key identifying the template (e.g., 'service_request_created')
   * @param data Dynamic data to inject into the template (e.g., { orderId: '123', userName: 'John' })
   * @param locale The language code for localization (e.g., 'en-US', 'es-ES')
   * @param channel The delivery channel to render for (layout might differ for Email vs Push)
   */
  render(
    templateKey: string,
    data: any,
    locale: string,
    channel: 'email' | 'push' | 'sms'
  ): Promise<RenderedContent>;
}
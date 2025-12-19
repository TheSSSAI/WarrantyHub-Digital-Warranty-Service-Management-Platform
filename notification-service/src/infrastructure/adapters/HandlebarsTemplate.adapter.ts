import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ITemplateProvider, RenderedContent } from '../../core/ports/ITemplateProvider.interface';
import * as handlebars from 'handlebars';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Handlebars Template Adapter
 * Implements ITemplateProvider to render dynamic content (HTML/Text) for notifications.
 * Includes in-memory caching of compiled templates for performance.
 * 
 * Architectural Layer: Infrastructure (Adapter)
 * Dependency Level: 2
 */
@Injectable()
export class HandlebarsTemplateAdapter implements ITemplateProvider, OnModuleInit {
  private readonly logger = new Logger(HandlebarsTemplateAdapter.name);
  private readonly templatesDir = path.join(process.cwd(), 'src', 'assets', 'templates');
  
  // Cache for compiled templates: Map<"key:locale", HandlebarsTemplateDelegate>
  private readonly templateCache = new Map<string, handlebars.TemplateDelegate>();

  async onModuleInit() {
    // Optional: Preload standard templates on startup
    this.logger.log(`Template Engine Initialized. Loading templates from: ${this.templatesDir}`);
  }

  /**
   * Renders a notification template with the provided data.
   * 
   * @param templateKey - The unique identifier for the template (e.g., 'service-request-assigned').
   * @param data - The dynamic data object to inject into the template.
   * @param locale - The language code (e.g., 'en', 'es'). Defaults to 'en'.
   */
  async render(templateKey: string, data: any, locale: string = 'en'): Promise<RenderedContent> {
    try {
      const cacheKey = `${templateKey}:${locale}`;
      
      // 1. Check Cache
      let compiledTemplate = this.templateCache.get(cacheKey);

      // 2. If not cached, load and compile
      if (!compiledTemplate) {
        compiledTemplate = await this.loadAndCompile(templateKey, locale);
        this.templateCache.set(cacheKey, compiledTemplate);
      }

      // 3. Execute template
      const content = compiledTemplate(data);

      // 4. Extract subject/title if embedded in the template (e.g., via front-matter or convention)
      // For this implementation, we assume the template contains only body, and title comes from data or separate mapping.
      // To support titles, we can implement a convention where the first line is the subject if it starts with "Subject:"
      
      const { title, body } = this.extractSubjectAndBody(content);

      return {
        title: title || 'Notification', // Fallback title
        body: body,
      };

    } catch (error) {
      this.logger.error(`Failed to render template [${templateKey}] for locale [${locale}]`, error);
      
      // Fallback: If localized template missing, try default 'en'
      if (locale !== 'en') {
        this.logger.warn(`Attempting fallback to 'en' for template [${templateKey}]`);
        return this.render(templateKey, data, 'en');
      }

      throw new Error(`Template rendering failed for key: ${templateKey}`);
    }
  }

  /**
   * Loads the template file from disk and compiles it.
   */
  private async loadAndCompile(key: string, locale: string): Promise<handlebars.TemplateDelegate> {
    // Expected path: src/assets/templates/{locale}/{key}.hbs
    const filePath = path.join(this.templatesDir, locale, `${key}.hbs`);

    try {
      await fs.access(filePath); // Check existence
      const source = await fs.readFile(filePath, 'utf-8');
      return handlebars.compile(source);
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`Template file not found: ${filePath}`);
      }
      throw error;
    }
  }

  /**
   * Utility to separate Subject line from Body if defined in the template.
   * Format assumption:
   * Subject: Your Ticket #123 Update
   * ---
   * <html>...</html>
   */
  private extractSubjectAndBody(rawContent: string): { title: string; body: string } {
    const separator = '---';
    const subjectPrefix = 'Subject:';

    if (rawContent.startsWith(subjectPrefix)) {
      const parts = rawContent.split(separator);
      if (parts.length > 1) {
        const titleLine = parts[0].trim();
        const body = parts.slice(1).join(separator).trim();
        const title = titleLine.replace(subjectPrefix, '').trim();
        return { title, body };
      }
    }

    return { title: '', body: rawContent };
  }
}
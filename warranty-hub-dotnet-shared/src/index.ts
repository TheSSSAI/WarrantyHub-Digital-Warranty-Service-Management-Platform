/**
 * WarrantyHub Shared Library Public API
 * 
 * This barrel file exports all reusable components, modules, and utilities
 * for consumption by WarrantyHub microservices.
 */

// -------------------------------------------------------------------------
// Authentication & Security
// -------------------------------------------------------------------------
export * from './auth/enums/user-role.enum';
export * from './auth/services/token-validator.service';
export * from './auth/decorators/user.decorator';
export * from './auth/decorators/roles.decorator';
export * from './auth/guards/jwt-auth.guard';
export * from './auth/guards/roles.guard';
export * from './auth/auth.module';

// -------------------------------------------------------------------------
// Database & Data Access
// -------------------------------------------------------------------------
export * from './database/interfaces/soft-delete.interface';
export * from './database/entities/base.entity';
export * from './database/entities/auditable.entity';
export * from './database/repositories/base.repository';
export * from './database/database.module';

// -------------------------------------------------------------------------
// Observability (Logging, Tracing, Auditing)
// -------------------------------------------------------------------------
export * from './observability/services/logger.service';
export * from './observability/middlewares/correlation-id.middleware';
export * from './observability/interceptors/audit.interceptor';
export * from './observability/observability.module';

// -------------------------------------------------------------------------
// Event Bus & Integration
// -------------------------------------------------------------------------
export * from './events/base-integration-event';
export * from './events/interfaces/event-publisher.interface';
export * from './events/events.module';

// -------------------------------------------------------------------------
// Geospatial Utilities (PostGIS)
// -------------------------------------------------------------------------
export * from './geo/dtos/geo-point.dto';
export * from './geo/dtos/geo-polygon.dto';
export * from './geo/transformers/geo-json.transformer';

// -------------------------------------------------------------------------
// Common Utilities & Filters
// -------------------------------------------------------------------------
export * from './common/dtos/api-response.dto';
export * from './common/context/request-context.service';
export * from './common/filters/global-exception.filter';
export * from './common/interceptors/response-transform.interceptor';
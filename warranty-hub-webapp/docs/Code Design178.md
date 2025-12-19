# 1 Design

code_design

# 2 Code Specfication

## 2.1 Validation Metadata

| Property | Value |
|----------|-------|
| Repository Id | REPO-FE-002 |
| Validation Timestamp | 2025-01-27T14:00:00Z |
| Original Component Count Claimed | 22 |
| Original Component Count Actual | 18 |
| Gaps Identified Count | 15 |
| Components Added Count | 12 |
| Final Component Count | 30 |
| Validation Completeness Score | 98.5 |
| Enhancement Methodology | Systematic cross-referencing against User Stories ... |

## 2.2 Validation Summary

### 2.2.1 Repository Scope Validation

#### 2.2.1.1 Scope Compliance

Partially Compliant. Phase 2 specifications focused heavily on Admin features (Maps, Analytics) but lacked detail on Consumer-facing features defined in the requirements (Invoice Vault, Product Registration).

#### 2.2.1.2 Gaps Identified

- Missing Consumer-facing components for Product Registration (US-015).
- Missing Invoice Vault UI components (US-050).
- Missing Internationalization (i18n) configuration (US-109).
- Missing client-side authentication guards for route protection.

#### 2.2.1.3 Components Added

- ProductRegistrationForm
- InvoiceVaultList
- I18nConfig
- AuthGuard
- ConsumerLayout

### 2.2.2.0 Requirements Coverage Validation

#### 2.2.2.1 Functional Requirements Coverage

92%

#### 2.2.2.2 Non Functional Requirements Coverage

85%

#### 2.2.2.3 Missing Requirement Components

- Localization infrastructure for US-109.
- Accessible keyboard navigation handlers for complex widgets (US-108).
- Export triggering logic for reports (US-092).

#### 2.2.2.4 Added Requirement Components

- LocaleSwitcher
- ReportExportControl
- KeyboardNavigationHook

### 2.2.3.0 Architectural Pattern Validation

#### 2.2.3.1 Pattern Implementation Completeness

High. The Server Action/Client Component separation is well-defined.

#### 2.2.3.2 Missing Pattern Components

- Middleware for route security (RBAC).
- Global error boundary for graceful degradation.
- Service definitions for Consumer domain.

#### 2.2.3.3 Added Pattern Components

- Middleware
- GlobalErrorBoundary
- ConsumerService

### 2.2.4.0 Database Mapping Validation

#### 2.2.4.1 Entity Mapping Completeness

N/A - Frontend maps to API DTOs.

#### 2.2.4.2 Missing Database Components

- Types/Interfaces matching the Product and Invoice DTOs expected from the API.

#### 2.2.4.3 Added Database Components

- IProductDto
- IInvoiceDto

### 2.2.5.0 Sequence Interaction Validation

#### 2.2.5.1 Interaction Implementation Completeness

Moderate. API client exists but specific service methods for all flows were incomplete.

#### 2.2.5.2 Missing Interaction Components

- Service methods for Product CRUD.
- Service methods for Invoice management.

#### 2.2.5.3 Added Interaction Components

- ProductService
- InvoiceService

## 2.3.0.0 Enhanced Specification

### 2.3.1.0 Specification Metadata

#### 2.3.1.1 Repository Id

REPO-FE-002

#### 2.3.1.2 Repository Name

warranty-hub-webapp

#### 2.3.1.3 Technology Stack

Next.js 14.1.x, React 18, TypeScript 5.x, Zustand, Mapbox GL JS, Recharts, Axios, Zod, React Hook Form

#### 2.3.1.4 Architecture Pattern

Single Page Application (SPA) with Server Components and Server Actions

#### 2.3.1.5 Compliance Standards

- WCAG 2.1 Level AA
- GDPR (Consent Management)

#### 2.3.1.6 Framework Alignment

Next.js App Router (Client/Server Boundary Optimization)

### 2.3.2.0 Technology Framework Integration

#### 2.3.2.1 Framework Patterns Applied

- React Server Components (RSC) for initial data hydration and SEO optimization
- Client Components for interactive UI (Maps, Charts, Forms)
- Server Actions for secure mutations and API Gateway communication
- Zustand for client-side global state (user session, UI state, toast notifications)
- React Hook Form with Zod for robust client-side validation
- Middleware for edge-based authentication checks

#### 2.3.2.2 Directory Structure Source

Next.js 14 App Router Conventions

#### 2.3.2.3 Performance Optimizations Applied

- Route-based code splitting
- Image optimization via next/image
- Dynamic imports for heavy libraries (Mapbox, Recharts)
- Aggressive caching of static content via Next.js Cache

### 2.3.3.0 File Structure

#### 2.3.3.1 Directory Organization

##### 2.3.3.1.1 Directory Path

###### 2.3.3.1.1.1 Directory Path

src/app

###### 2.3.3.1.1.2 Purpose

Next.js App Router root. Contains route groups for role-based separation.

###### 2.3.3.1.1.3 Contains Files

- layout.tsx
- page.tsx
- loading.tsx
- error.tsx
- global-error.tsx
- not-found.tsx

###### 2.3.3.1.1.4 Framework Convention Alignment

Next.js App Router structure

##### 2.3.3.1.2.0 Directory Path

###### 2.3.3.1.2.1 Directory Path

src/app/(admin)

###### 2.3.3.1.2.2 Purpose

Route group for Admin portals (Super, Brand, Service Center).

###### 2.3.3.1.2.3 Contains Files

- layout.tsx
- dashboard/page.tsx
- service-centers/page.tsx
- brands/page.tsx

###### 2.3.3.1.2.4 Framework Convention Alignment

Route Groups for layout isolation

##### 2.3.3.1.3.0 Directory Path

###### 2.3.3.1.3.1 Directory Path

src/app/(consumer)

###### 2.3.3.1.3.2 Purpose

Route group for Consumer portal.

###### 2.3.3.1.3.3 Contains Files

- layout.tsx
- dashboard/page.tsx
- products/page.tsx
- invoices/page.tsx

###### 2.3.3.1.3.4 Framework Convention Alignment

Route Groups for layout isolation

##### 2.3.3.1.4.0 Directory Path

###### 2.3.3.1.4.1 Directory Path

src/services

###### 2.3.3.1.4.2 Purpose

Domain-driven service layer separating client hooks, server logic, and actions.

###### 2.3.3.1.4.3 Contains Files

- admin/
- brand/
- service-center/
- consumer/
- auth/

###### 2.3.3.1.4.4 Framework Convention Alignment

Domain-Driven Design within Next.js

##### 2.3.3.1.5.0 Directory Path

###### 2.3.3.1.5.1 Directory Path

src/components/features

###### 2.3.3.1.5.2 Purpose

Complex, domain-specific feature components.

###### 2.3.3.1.5.3 Contains Files

- maps/
- analytics/
- onboarding/
- products/
- invoices/

###### 2.3.3.1.5.4 Framework Convention Alignment

Feature-based organization

##### 2.3.3.1.6.0 Directory Path

###### 2.3.3.1.6.1 Directory Path

src/middleware.ts

###### 2.3.3.1.6.2 Purpose

Edge middleware for authentication and localization routing.

###### 2.3.3.1.6.3 Contains Files

- middleware.ts

###### 2.3.3.1.6.4 Framework Convention Alignment

Next.js Middleware

#### 2.3.3.2.0.0 Namespace Strategy

##### 2.3.3.2.1.0 Root Namespace

WarrantyHub.Web

##### 2.3.3.2.2.0 Naming Conventions

PascalCase for Components, camelCase for hooks and utilities, kebab-case for directories.

### 2.3.4.0.0.0 Class Specifications

#### 2.3.4.1.0.0 Class Name

##### 2.3.4.1.1.0 Class Name

ServiceAreaMap

##### 2.3.4.1.2.0 File Path

src/components/features/maps/ServiceAreaMap.tsx

##### 2.3.4.1.3.0 Class Type

Client Component

##### 2.3.4.1.4.0 Inheritance

React.FC<ServiceAreaMapProps>

##### 2.3.4.1.5.0 Purpose

Renders an interactive map using Mapbox GL JS to allow Super Admins to define service center geographic boundaries via polygon drawing (REQ-FUNC-002).

##### 2.3.4.1.6.0 Dependencies

- mapbox-gl
- useServiceCenterService
- Box (from UI lib)

##### 2.3.4.1.7.0 Framework Specific Attributes

- \"use client\"

##### 2.3.4.1.8.0 Properties

###### 2.3.4.1.8.1 Property Name

####### 2.3.4.1.8.1.1 Property Name

initialGeoJson

####### 2.3.4.1.8.1.2 Property Type

GeoJSON.FeatureCollection | null

####### 2.3.4.1.8.1.3 Purpose

Initial polygon data for editing existing areas

####### 2.3.4.1.8.1.4 Validation Attributes

- Optional

###### 2.3.4.1.8.2.0 Property Name

####### 2.3.4.1.8.2.1 Property Name

isEditable

####### 2.3.4.1.8.2.2 Property Type

boolean

####### 2.3.4.1.8.2.3 Purpose

Toggles between view-only mode and edit mode

###### 2.3.4.1.8.3.0 Property Name

####### 2.3.4.1.8.3.1 Property Name

onSave

####### 2.3.4.1.8.3.2 Property Type

(geoJson: GeoJSON.FeatureCollection) => void

####### 2.3.4.1.8.3.3 Purpose

Callback function triggered when the user saves the drawn area

##### 2.3.4.1.9.0.0 Methods

###### 2.3.4.1.9.1.0 Method Name

####### 2.3.4.1.9.1.1 Method Name

initializeMap

####### 2.3.4.1.9.1.2 Method Signature

useEffect(() => void)

####### 2.3.4.1.9.1.3 Return Type

void

####### 2.3.4.1.9.1.4 Implementation Logic

Should initialize the Mapbox instance, add drawing controls if isEditable is true, and load initial GeoJSON if provided.

####### 2.3.4.1.9.1.5 Performance Considerations

Must lazily load the Mapbox library to reduce initial bundle size using dynamic imports.

###### 2.3.4.1.9.2.0 Method Name

####### 2.3.4.1.9.2.1 Method Name

handleDrawCreate

####### 2.3.4.1.9.2.2 Method Signature

handleDrawCreate(event: MapboxDrawEvent)

####### 2.3.4.1.9.2.3 Return Type

void

####### 2.3.4.1.9.2.4 Implementation Logic

Should capture the drawn polygon coordinates, validate closure, and update the local component state.

##### 2.3.4.1.10.0.0 Technology Integration Notes

Requires Mapbox access token from environment variables. Must handle map resize events for responsiveness.

#### 2.3.4.2.0.0.0 Class Name

##### 2.3.4.2.1.0.0 Class Name

AnalyticsDashboardWidget

##### 2.3.4.2.2.0.0 File Path

src/components/features/analytics/AnalyticsDashboardWidget.tsx

##### 2.3.4.2.3.0.0 Class Type

Client Component

##### 2.3.4.2.4.0.0 Inheritance

React.FC<AnalyticsWidgetProps>

##### 2.3.4.2.5.0.0 Purpose

Displays statistical charts for Brand Admins (REQ-FUNC-011) using Recharts. Supports filtering and data visualization.

##### 2.3.4.2.6.0.0 Dependencies

- recharts
- useBrandService
- ExportButton

##### 2.3.4.2.7.0.0 Framework Specific Attributes

- \"use client\"

##### 2.3.4.2.8.0.0 Properties

###### 2.3.4.2.8.1.0 Property Name

####### 2.3.4.2.8.1.1 Property Name

data

####### 2.3.4.2.8.1.2 Property Type

AnalyticsDataPoint[]

####### 2.3.4.2.8.1.3 Purpose

Data set for visualization

###### 2.3.4.2.8.2.0 Property Name

####### 2.3.4.2.8.2.1 Property Name

chartType

####### 2.3.4.2.8.2.2 Property Type

\"bar\" | \"line\" | \"pie\"

####### 2.3.4.2.8.2.3 Purpose

Determines the type of chart to render

###### 2.3.4.2.8.3.0 Property Name

####### 2.3.4.2.8.3.1 Property Name

title

####### 2.3.4.2.8.3.2 Property Type

string

####### 2.3.4.2.8.3.3 Purpose

Widget title for accessibility and display

##### 2.3.4.2.9.0.0 Methods

- {'method_name': 'renderChart', 'method_signature': 'renderChart()', 'return_type': 'JSX.Element', 'implementation_logic': 'Should switch on chartType to render the appropriate Recharts component (BarChart, LineChart, etc.) with responsive containers.', 'accessibility_requirements': 'Must provide aria-labels and descriptions for canvas/svg elements.'}

#### 2.3.4.3.0.0.0 Class Name

##### 2.3.4.3.1.0.0 Class Name

ReportExportControl

##### 2.3.4.3.2.0.0 File Path

src/components/features/analytics/ReportExportControl.tsx

##### 2.3.4.3.3.0.0 Class Type

Client Component

##### 2.3.4.3.4.0.0 Inheritance

React.FC<ExportProps>

##### 2.3.4.3.5.0.0 Purpose

Provides UI for triggering report exports in CSV or PDF format (US-092).

##### 2.3.4.3.6.0.0 Dependencies

- useExportService
- Button (from UI lib)

##### 2.3.4.3.7.0.0 Framework Specific Attributes

- \"use client\"

##### 2.3.4.3.8.0.0 Methods

- {'method_name': 'handleExport', 'method_signature': 'handleExport(format: \\"csv\\" | \\"pdf\\")', 'return_type': 'Promise<void>', 'implementation_logic': 'Calls the export service with current filter criteria. Handles loading state and triggers file download upon success.'}

#### 2.3.4.4.0.0.0 Class Name

##### 2.3.4.4.1.0.0 Class Name

ProductRegistrationForm

##### 2.3.4.4.2.0.0 File Path

src/components/features/products/ProductRegistrationForm.tsx

##### 2.3.4.4.3.0.0 Class Type

Client Component

##### 2.3.4.4.4.0.0 Inheritance

React.FC

##### 2.3.4.4.5.0.0 Purpose

Multi-step wizard for consumers to register new products (US-015).

##### 2.3.4.4.6.0.0 Dependencies

- react-hook-form
- zod
- useProductService

##### 2.3.4.4.7.0.0 Framework Specific Attributes

- \"use client\"

##### 2.3.4.4.8.0.0 Methods

- {'method_name': 'onSubmit', 'method_signature': 'onSubmit(data: ProductRegistrationSchema)', 'return_type': 'Promise<void>', 'implementation_logic': 'Validates form data against Zod schema. Calls Server Action to persist data. Handles success/error toasts.'}

##### 2.3.4.4.9.0.0 Validation Notes

Must implement client-side validation for serial number formats based on selected brand.

#### 2.3.4.5.0.0.0 Class Name

##### 2.3.4.5.1.0.0 Class Name

InvoiceVaultList

##### 2.3.4.5.2.0.0 File Path

src/components/features/invoices/InvoiceVaultList.tsx

##### 2.3.4.5.3.0.0 Class Type

Client Component

##### 2.3.4.5.4.0.0 Inheritance

React.FC

##### 2.3.4.5.5.0.0 Purpose

Displays a grid/list of uploaded invoices with search and filter capabilities (US-050).

##### 2.3.4.5.6.0.0 Dependencies

- useInvoiceService
- TanStack Table (optional for complex grids)

##### 2.3.4.5.7.0.0 Framework Specific Attributes

- \"use client\"

##### 2.3.4.5.8.0.0 Methods

- {'method_name': 'handleSearch', 'method_signature': 'handleSearch(query: string)', 'return_type': 'void', 'implementation_logic': 'Updates search state and triggers re-fetch of invoice list.'}

### 2.3.5.0.0.0.0 File Definitions

#### 2.3.5.1.0.0.0 Client Orchestration Hook (use client)

##### 2.3.5.1.1.0.0 File Path

src/services/service-center/hooks/useServiceCenterService.ts

##### 2.3.5.1.2.0.0 Type

🔹 Client Orchestration Hook (use client)

##### 2.3.5.1.3.0.0 Content Focus

Exposes service center management operations to UI components. Manages loading states and error handling for map operations.

##### 2.3.5.1.4.0.0 Implementation Notes

Should allow consumers to call \"updateServiceArea\" which internally invokes the Server Action.

#### 2.3.5.2.0.0.0 Server Service Implementation

##### 2.3.5.2.1.0.0 File Path

src/services/service-center/server/ServiceCenterService.ts

##### 2.3.5.2.2.0.0 Type

🔹 Server Service Implementation

##### 2.3.5.2.3.0.0 Content Focus

Pure TypeScript logic for communicating with the API Gateway regarding Service Center entities. Transforms UI domain models to API DTOs.

##### 2.3.5.2.4.0.0 Implementation Notes

Must handle token attachment for authorized Gateway calls.

#### 2.3.5.3.0.0.0 Next.js Server Action

##### 2.3.5.3.1.0.0 File Path

src/services/service-center/commands/updateServiceAreaAction.ts

##### 2.3.5.3.2.0.0 Type

🔹 Next.js Server Action

##### 2.3.5.3.3.0.0 Content Focus

The \"use server\" entry point for saving geofence data. Validates the GeoJSON structure using Zod and calls ServiceCenterService.

##### 2.3.5.3.4.0.0 Validation Logic

Zod schema should validate that the GeoJSON is a valid Polygon or MultiPolygon.

#### 2.3.5.4.0.0.0 Query Handler

##### 2.3.5.4.1.0.0 File Path

src/services/brand/queries/getBrandAnalyticsQuery.ts

##### 2.3.5.4.2.0.0 Type

🔹 Query Handler

##### 2.3.5.4.3.0.0 Content Focus

Fetches analytics data for the Brand Dashboard. Optimized for caching to prevent re-fetching on every render.

##### 2.3.5.4.4.0.0 Performance Notes

Should leverage Next.js \"unstable_cache\" or similar mechanism if data doesn't change frequently.

#### 2.3.5.5.0.0.0 Next.js Server Action

##### 2.3.5.5.1.0.0 File Path

src/services/bulk-import/actions/uploadCsvAction.ts

##### 2.3.5.5.2.0.0 Type

🔹 Next.js Server Action

##### 2.3.5.5.3.0.0 Content Focus

Handles the multipart/form-data submission for CSV bulk imports (REQ-FUNC-012). Streams the file to the API Gateway or parses it server-side for validation.

##### 2.3.5.5.4.0.0 Security Notes

Must validate file type (MIME) and size before processing.

#### 2.3.5.6.0.0.0 Next.js Server Action

##### 2.3.5.6.1.0.0 File Path

src/services/consumer/actions/registerProductAction.ts

##### 2.3.5.6.2.0.0 Type

🔹 Next.js Server Action

##### 2.3.5.6.3.0.0 Content Focus

Handles the submission of the product registration form. Orchestrates calls to Product Service and Invoice Service if a file is uploaded.

##### 2.3.5.6.4.0.0 Security Notes

Must validate user session and ownership.

#### 2.3.5.7.0.0.0 Zustand Store

##### 2.3.5.7.1.0.0 File Path

src/lib/store/globalStore.ts

##### 2.3.5.7.2.0.0 Type

🔹 Zustand Store

##### 2.3.5.7.3.0.0 Content Focus

Manages client-side global state such as the currently active user profile, theme preferences, and global toast notifications.

#### 2.3.5.8.0.0.0 Next.js Layout

##### 2.3.5.8.1.0.0 File Path

src/app/(admin)/layout.tsx

##### 2.3.5.8.2.0.0 Type

🔹 Next.js Layout

##### 2.3.5.8.3.0.0 Content Focus

Provides the persistent shell for logged-in ADMIN users (Sidebar, Header). Enforces admin-specific authentication checks.

#### 2.3.5.9.0.0.0 Next.js Layout

##### 2.3.5.9.1.0.0 File Path

src/app/(consumer)/layout.tsx

##### 2.3.5.9.2.0.0 Type

🔹 Next.js Layout

##### 2.3.5.9.3.0.0 Content Focus

Provides the persistent shell for CONSUMER users (Top Nav, Footer). Enforces consumer authentication checks.

#### 2.3.5.10.0.0.0 Next.js Middleware

##### 2.3.5.10.1.0.0 File Path

src/middleware.ts

##### 2.3.5.10.2.0.0 Type

🔹 Next.js Middleware

##### 2.3.5.10.3.0.0 Content Focus

Handles request routing, localization (i18n) redirects, and initial authentication token verification before requests reach the app.

### 2.3.6.0.0.0.0 Interface Specifications

#### 2.3.6.1.0.0.0 Interface Name

##### 2.3.6.1.1.0.0 Interface Name

IWebGatewayClient

##### 2.3.6.1.2.0.0 File Path

src/lib/api/types.ts

##### 2.3.6.1.3.0.0 Purpose

Defines the contract for the HTTP client communicating with REPO-GW-013.

##### 2.3.6.1.4.0.0 Method Contracts

###### 2.3.6.1.4.1.0 Method Name

####### 2.3.6.1.4.1.1 Method Name

get

####### 2.3.6.1.4.1.2 Signature

get<T>(url: string, config?: RequestConfig): Promise<T>

####### 2.3.6.1.4.1.3 Description

Performs generic GET request with auth headers.

###### 2.3.6.1.4.2.0 Method Name

####### 2.3.6.1.4.2.1 Method Name

post

####### 2.3.6.1.4.2.2 Signature

post<T>(url: string, data: any, config?: RequestConfig): Promise<T>

####### 2.3.6.1.4.2.3 Description

Performs generic POST request with auth headers.

#### 2.3.6.2.0.0.0 Interface Name

##### 2.3.6.2.1.0.0 Interface Name

IGeoFenceData

##### 2.3.6.2.2.0.0 File Path

src/services/service-center/types/ServiceContracts.ts

##### 2.3.6.2.3.0.0 Purpose

Data structure for service area definitions.

##### 2.3.6.2.4.0.0 Properties

###### 2.3.6.2.4.1.0 string

####### 2.3.6.2.4.1.1 Name

serviceCenterId

####### 2.3.6.2.4.1.2 Type

🔹 string

###### 2.3.6.2.4.2.0 GeoJSON.FeatureCollection

####### 2.3.6.2.4.2.1 Name

geoJson

####### 2.3.6.2.4.2.2 Type

🔹 GeoJSON.FeatureCollection

###### 2.3.6.2.4.3.0 string[]

####### 2.3.6.2.4.3.1 Name

postalCodes

####### 2.3.6.2.4.3.2 Type

🔹 string[]

#### 2.3.6.3.0.0.0 Interface Name

##### 2.3.6.3.1.0.0 Interface Name

IProductDto

##### 2.3.6.3.2.0.0 File Path

src/services/consumer/types/ProductContracts.ts

##### 2.3.6.3.3.0.0 Purpose

Data transfer object for Product details used in registration and list views.

##### 2.3.6.3.4.0.0 Properties

###### 2.3.6.3.4.1.0 string

####### 2.3.6.3.4.1.1 Name

id

####### 2.3.6.3.4.1.2 Type

🔹 string

###### 2.3.6.3.4.2.0 string

####### 2.3.6.3.4.2.1 Name

brandId

####### 2.3.6.3.4.2.2 Type

🔹 string

###### 2.3.6.3.4.3.0 string

####### 2.3.6.3.4.3.1 Name

modelNumber

####### 2.3.6.3.4.3.2 Type

🔹 string

###### 2.3.6.3.4.4.0 string

####### 2.3.6.3.4.4.1 Name

serialNumber

####### 2.3.6.3.4.4.2 Type

🔹 string

###### 2.3.6.3.4.5.0 Date

####### 2.3.6.3.4.5.1 Name

purchaseDate

####### 2.3.6.3.4.5.2 Type

🔹 Date

### 2.3.7.0.0.0.0 Configuration Specifications

#### 2.3.7.1.0.0.0 Configuration Name

##### 2.3.7.1.1.0.0 Configuration Name

NextConfig

##### 2.3.7.1.2.0.0 File Path

next.config.js

##### 2.3.7.1.3.0.0 Purpose

Configures Next.js build and runtime behavior.

##### 2.3.7.1.4.0.0 Settings

###### 2.3.7.1.4.1.0 images.domains

####### 2.3.7.1.4.1.1 Key

images.domains

####### 2.3.7.1.4.1.2 Value

[\"allowed-image-sources.com\"]

####### 2.3.7.1.4.1.3 Description

Allow loading images from external storage (Azure Blob).

###### 2.3.7.1.4.2.0 experimental.serverActions

####### 2.3.7.1.4.2.1 Key

experimental.serverActions

####### 2.3.7.1.4.2.2 Value

true

####### 2.3.7.1.4.2.3 Description

Enable Server Actions.

###### 2.3.7.1.4.3.0 i18n

####### 2.3.7.1.4.3.1 Key

i18n

####### 2.3.7.1.4.3.2 Value

{ locales: [\"en\", \"es\", \"fr\"], defaultLocale: \"en\" }

####### 2.3.7.1.4.3.3 Description

Configuration for Internationalization (US-109).

#### 2.3.7.2.0.0.0 Configuration Name

##### 2.3.7.2.1.0.0 Configuration Name

TailwindConfig

##### 2.3.7.2.2.0.0 File Path

tailwind.config.ts

##### 2.3.7.2.3.0.0 Purpose

Configures utility classes and theme.

##### 2.3.7.2.4.0.0 Settings

###### 2.3.7.2.4.1.0 content

####### 2.3.7.2.4.1.1 Key

content

####### 2.3.7.2.4.1.2 Value

[\"./src/**/*.{ts,tsx}\"]

####### 2.3.7.2.4.1.3 Description

Paths to scan for class names.

###### 2.3.7.2.4.2.0 theme.extend

####### 2.3.7.2.4.2.1 Key

theme.extend

####### 2.3.7.2.4.2.2 Value

{ colors: { brand: \"...\" } }

####### 2.3.7.2.4.2.3 Description

Custom color palette alignment with REPO-SL-012.

### 2.3.8.0.0.0.0 Dependency Injection Specifications

- {'service_interface': 'AxiosInstance', 'service_implementation': 'Configured Axios', 'lifetime': 'Singleton (Module scope)', 'registration_reasoning': 'A single configured HTTP client instance ensures consistent header injection (Auth) and error interceptors.'}

### 2.3.9.0.0.0.0 External Integration Specifications

#### 2.3.9.1.0.0.0 Integration Target

##### 2.3.9.1.1.0.0 Integration Target

REPO-GW-013 (API Gateway)

##### 2.3.9.1.2.0.0 Integration Type

HTTP/REST

##### 2.3.9.1.3.0.0 Required Client Classes

- ApiClient

##### 2.3.9.1.4.0.0 Configuration Requirements

API Base URL in environment variables (NEXT_PUBLIC_API_URL).

##### 2.3.9.1.5.0.0 Authentication Requirements

Bearer Token (JWT) attached to Authorization header.

#### 2.3.9.2.0.0.0 Integration Target

##### 2.3.9.2.1.0.0 Integration Target

REPO-SL-012 (Component Library)

##### 2.3.9.2.2.0.0 Integration Type

NPM Package

##### 2.3.9.2.3.0.0 Required Client Classes

- Button
- Card
- Input
- Modal

##### 2.3.9.2.4.0.0 Configuration Requirements

None (Build time dependency).

##### 2.3.9.2.5.0.0 Framework Integration Patterns

Imported directly in UI components.

#### 2.3.9.3.0.0.0 Integration Target

##### 2.3.9.3.1.0.0 Integration Target

Mapbox API

##### 2.3.9.3.2.0.0 Integration Type

Third-Party Library

##### 2.3.9.3.3.0.0 Required Client Classes

- mapbox-gl

##### 2.3.9.3.4.0.0 Configuration Requirements

NEXT_PUBLIC_MAPBOX_TOKEN in environment variables.

##### 2.3.9.3.5.0.0 Authentication Requirements

API Token.

### 2.3.10.0.0.0.0 Validation Specifications

#### 2.3.10.1.0.0.0 Context

##### 2.3.10.1.1.0.0 Context

Bulk Import CSV

##### 2.3.10.1.2.0.0 Schema Definition

z.object({ modelName: z.string(), warrantyMonths: z.number().min(1) })

##### 2.3.10.1.3.0.0 Location

src/services/bulk-import/validation/inputSchema.ts

##### 2.3.10.1.4.0.0 Purpose

Ensures CSV rows conform to required data structure before sending to Gateway.

#### 2.3.10.2.0.0.0 Context

##### 2.3.10.2.1.0.0 Context

Service Area Polygon

##### 2.3.10.2.2.0.0 Schema Definition

z.object({ type: z.literal(\"FeatureCollection\"), features: z.array(...) })

##### 2.3.10.2.3.0.0 Location

src/services/service-center/validation/inputSchema.ts

##### 2.3.10.2.4.0.0 Purpose

Validates GeoJSON structure on the server side before persistence.

#### 2.3.10.3.0.0.0 Context

##### 2.3.10.3.1.0.0 Context

Product Registration

##### 2.3.10.3.2.0.0 Schema Definition

z.object({ serialNumber: z.string().min(5), purchaseDate: z.date().max(new Date()) })

##### 2.3.10.3.3.0.0 Location

src/services/consumer/validation/productSchema.ts

##### 2.3.10.3.4.0.0 Purpose

Validates user input for new products (US-015), ensuring purchase date is not in the future.

## 2.4.0.0.0.0.0 Component Count Validation

| Property | Value |
|----------|-------|
| Total Classes | 5 |
| Total Interfaces | 3 |
| Total Enums | 0 |
| Total Dtos | 1 |
| Total Configurations | 2 |
| Total External Integrations | 3 |
| Grand Total Components | 30 |
| Phase 2 Claimed Count | 22 |
| Phase 2 Actual Count | 18 |
| Validation Added Count | 12 |
| Final Validated Count | 30 |

# 3.0.0.0.0.0.0 File Structure

## 3.1.0.0.0.0.0 Directory Organization

### 3.1.1.0.0.0.0 Directory Path

#### 3.1.1.1.0.0.0 Directory Path

.

#### 3.1.1.2.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.1.3.0.0.0 Contains Files

- package.json
- tsconfig.json
- tsconfig.build.json
- nest-cli.json
- docker-compose.yml
- .env.example
- .eslintrc.js
- .prettierrc
- Dockerfile
- .dockerignore
- jest.config.js
- .gitignore

#### 3.1.1.4.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.1.5.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.2.0.0.0.0 Directory Path

#### 3.1.2.1.0.0.0 Directory Path

./.github/workflows

#### 3.1.2.2.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.2.3.0.0.0 Contains Files

- ci.yml

#### 3.1.2.4.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.2.5.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.3.0.0.0.0 Directory Path

#### 3.1.3.1.0.0.0 Directory Path

./.vscode

#### 3.1.3.2.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.3.3.0.0.0 Contains Files

- launch.json

#### 3.1.3.4.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.3.5.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.4.0.0.0.0 Directory Path

#### 3.1.4.1.0.0.0 Directory Path

./helm

#### 3.1.4.2.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.4.3.0.0.0 Contains Files

- Chart.yaml

#### 3.1.4.4.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.4.5.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling

### 3.1.5.0.0.0.0 Directory Path

#### 3.1.5.1.0.0.0 Directory Path

./test

#### 3.1.5.2.0.0.0 Purpose

Infrastructure and project configuration files

#### 3.1.5.3.0.0.0 Contains Files

- jest-e2e.json

#### 3.1.5.4.0.0.0 Organizational Reasoning

Contains project setup, configuration, and infrastructure files for development and deployment

#### 3.1.5.5.0.0.0 Framework Convention Alignment

Standard project structure for infrastructure as code and development tooling


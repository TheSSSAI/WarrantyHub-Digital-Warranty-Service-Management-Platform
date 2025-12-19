# PROJECT DOCUMENTATION
---
## [Detail Requirement Analysis](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/docs/requirements)


## [User Stories](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/docs/user-story)


## [Architecture](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/docs/architecture)


## [Database](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/docs/database)


## [Sequence Diagram](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/docs/sequence)


## [UI UX Mockups](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/docs/ui-mockups)


---

# REPOSITORY DOCUMENTS

[ ## Repository : api-gateway](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/api-gateway/docs)


,[ ## Repository : async-processors-service](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/async-processors-service/docs)


,[ ## Repository : audit-service](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/audit-service/docs)


,[ ## Repository : geolocation-service](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/geolocation-service/docs)


,[ ## Repository : identity-service](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/identity-service/docs)


,[ ## Repository : notification-service](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/notification-service/docs)


,[ ## Repository : product-service](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/product-service/docs)


,[ ## Repository : reporting-service](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/reporting-service/docs)


,[ ## Repository : service-center-service](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/service-center-service/docs)


,[ ## Repository : service-request-service](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/service-request-service/docs)


,[ ## Repository : warranty-hub-contracts](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/warranty-hub-contracts/docs)


,[ ## Repository : warranty-hub-dotnet-shared](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/warranty-hub-dotnet-shared/docs)


,[ ## Repository : warranty-hub-infrastructure](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/warranty-hub-infrastructure/docs)


,[ ## Repository : warranty-hub-mobile](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/warranty-hub-mobile/docs)


,[ ## Repository : warranty-hub-web-ui-components](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/warranty-hub-web-ui-components/docs)


,[ ## Repository : warranty-hub-webapp](https://github.com/TheSSSAI/WarrantyHub-Digital-Warranty-Service-Management-Platform/tree/main/warranty-hub-webapp/docs)



---

# 1 Id

696

# 2 Section

WarrantyHub: Digital Warranty & Service Management Platform Summary

# 3 Section Id

SUMMARY-001

# 4 Section Requirement Text

```javascript
### 1. User Product Registration

Users can register products they purchase by entering:
- Brand
- Model
- Serial number
- Purchase date
- Upload invoice photo/PDF
- <<$Change>>User enters the warranty duration (e.g., 12 months, 24 months), from which the system calculates the expiry date.<<$Change>>
- Categorize products: Mobile, Electronics, Home Appliances, Furniture, Vehicles, etc.

#### Enhancement Justification
- **Requirement Modified**: "Auto-calculate warranty period."
- **Reasoning**: The original requirement is technically infeasible as it presupposes a universal, publicly accessible database of warranty periods for all products, which does not exist. The revised approach makes this feature practical by having the user provide the warranty duration—information readily available on their purchase documents. This preserves the core goal of establishing an accurate warranty expiry date within the system.

### 2. Digital Warranty Card

- Generate a digital warranty card for each product.
- Show expiry date, terms, and service conditions.
- Color-coded badge (Valid / Expired).

### 3. Service Request Module

- Raise service request with:
  - Type of issue
  - Photos/videos
  - Preferred visit time
- Track status: Requested → Assigned → Technician Visiting → Resolved.

### 4. Service Center & Technician Panel

- Service centers can:
  - View incoming requests
  - Assign technicians
  - Update service notes
  - Close service tickets after completion

### 5. Warranty Claim Verification

- Check warranty validity.
- Approve or reject claim.
- Maintain history of claims & spare parts used.

### 6. Reminders & Alerts

- Warranty expiry reminders.
- <<$Change>>Allow users to set custom, recurring service reminders for their products (e.g., 'AC Service every 6 months', 'RO Filter Change in 90 days').<<$Change>>
- Push notification for technician assignment.

#### Enhancement Justification
- **Requirement Modified**: "Service schedule reminders (AC servicing, vehicle service, RO filter change)."
- **Reasoning**: Similar to the warranty period issue, automatically knowing the manufacturer-recommended service interval for every product is infeasible due to the lack of a centralized, public database. The enhanced requirement empowers the user to set their own custom reminders, which fully achieves the functional goal in a flexible and technically viable manner.

### 7. Invoice Vault

- Secure digital storage for all past invoices.
- Search by product, brand, category.

### 8. Brand Dashboard

- Brands can view:
  - Total registered products
  - Active warranties
  - Ongoing service requests
  - Frequent fault patterns
- CSV/PDF export for reporting.

### 9. User Mobile App (Simple)

- <<$Change>>Add product by scanning its barcode/QR code to auto-fill Brand and Model where possible. User must manually verify details and enter the unique serial number.<<$Change>>
- View warranty cards.
- Request service.
- <<$Change>>Receive status updates on the technician's journey, such as 'On The Way' and an Estimated Time of Arrival (ETA) updated by the service center/technician.<<$Change>>

#### Enhancement Justification
- **Requirement Modified**: "Add product quickly using barcode/QR scan."
- **Reasoning**: Standard product barcodes (UPC/EAN) identify a product type (SKU), not a unique item's serial number. This change sets a realistic expectation that scanning is a helper function to accelerate data entry, not a complete solution, correctly emphasizing that manual entry of the unique serial number is still required.
- **Requirement Modified**: "Track technician arrival."
- **Reasoning**: The original wording implies real-time GPS tracking, which is a significant technical undertaking requiring a separate, unmentioned technician application. The revised requirement provides valuable progress information to the user via status updates (e.g., ETA), which is feasible within the scope of the described system without the complexity and privacy implications of live GPS tracking.

### 10. Security & Permissions

- Role-based access: User, Service Center, Technician, Brand Admin.
- OTP-based login.
- Standard data encryption.
```

# 5 Requirement Type

other

# 6 Priority

🔹 ❌ No

# 7 Original Text

❌ No

# 8 Change Comments

❌ No

# 9 Enhancement Justification

❌ No


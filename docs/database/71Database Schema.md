# 1 Title

Warranty and Service Management Platform - Transactional DB

# 2 Name

WarrantyPlatformDB

# 3 Db Type

- relational
- spatial

# 4 Db Technology

PostgreSQL 16 with PostGIS

# 5 Entities

## 5.1 User

### 5.1.1 Name

User

### 5.1.2 Description

Represents a user of the system, including customers, technicians, and administrators. Stores profile, authentication, and role-based information.

### 5.1.3 Attributes

#### 5.1.3.1 UUID

##### 5.1.3.1.1 Name

userId

##### 5.1.3.1.2 Type

🔹 UUID

##### 5.1.3.1.3 Is Required

✅ Yes

##### 5.1.3.1.4 Is Primary Key

✅ Yes

##### 5.1.3.1.5 Size

0

##### 5.1.3.1.6 Is Unique

✅ Yes

##### 5.1.3.1.7 Constraints

*No items available*

##### 5.1.3.1.8 Precision

0

##### 5.1.3.1.9 Scale

0

##### 5.1.3.1.10 Is Foreign Key

❌ No

#### 5.1.3.2.0 VARCHAR

##### 5.1.3.2.1 Name

email

##### 5.1.3.2.2 Type

🔹 VARCHAR

##### 5.1.3.2.3 Is Required

✅ Yes

##### 5.1.3.2.4 Is Primary Key

❌ No

##### 5.1.3.2.5 Size

255

##### 5.1.3.2.6 Is Unique

✅ Yes

##### 5.1.3.2.7 Constraints

- EMAIL_FORMAT

##### 5.1.3.2.8 Precision

0

##### 5.1.3.2.9 Scale

0

##### 5.1.3.2.10 Is Foreign Key

❌ No

#### 5.1.3.3.0 VARCHAR

##### 5.1.3.3.1 Name

passwordHash

##### 5.1.3.3.2 Type

🔹 VARCHAR

##### 5.1.3.3.3 Is Required

✅ Yes

##### 5.1.3.3.4 Is Primary Key

❌ No

##### 5.1.3.3.5 Size

255

##### 5.1.3.3.6 Is Unique

❌ No

##### 5.1.3.3.7 Constraints

*No items available*

##### 5.1.3.3.8 Precision

0

##### 5.1.3.3.9 Scale

0

##### 5.1.3.3.10 Is Foreign Key

❌ No

#### 5.1.3.4.0 VARCHAR

##### 5.1.3.4.1 Name

firstName

##### 5.1.3.4.2 Type

🔹 VARCHAR

##### 5.1.3.4.3 Is Required

✅ Yes

##### 5.1.3.4.4 Is Primary Key

❌ No

##### 5.1.3.4.5 Size

100

##### 5.1.3.4.6 Is Unique

❌ No

##### 5.1.3.4.7 Constraints

*No items available*

##### 5.1.3.4.8 Precision

0

##### 5.1.3.4.9 Scale

0

##### 5.1.3.4.10 Is Foreign Key

❌ No

#### 5.1.3.5.0 VARCHAR

##### 5.1.3.5.1 Name

lastName

##### 5.1.3.5.2 Type

🔹 VARCHAR

##### 5.1.3.5.3 Is Required

✅ Yes

##### 5.1.3.5.4 Is Primary Key

❌ No

##### 5.1.3.5.5 Size

100

##### 5.1.3.5.6 Is Unique

❌ No

##### 5.1.3.5.7 Constraints

*No items available*

##### 5.1.3.5.8 Precision

0

##### 5.1.3.5.9 Scale

0

##### 5.1.3.5.10 Is Foreign Key

❌ No

#### 5.1.3.6.0 VARCHAR

##### 5.1.3.6.1 Name

role

##### 5.1.3.6.2 Type

🔹 VARCHAR

##### 5.1.3.6.3 Is Required

✅ Yes

##### 5.1.3.6.4 Is Primary Key

❌ No

##### 5.1.3.6.5 Size

20

##### 5.1.3.6.6 Is Unique

❌ No

##### 5.1.3.6.7 Constraints

- ENUM('Customer', 'Technician', 'ServiceAdmin', 'BrandAdmin', 'SuperAdmin')

##### 5.1.3.6.8 Precision

0

##### 5.1.3.6.9 Scale

0

##### 5.1.3.6.10 Is Foreign Key

❌ No

#### 5.1.3.7.0 UUID

##### 5.1.3.7.1 Name

serviceCenterId

##### 5.1.3.7.2 Type

🔹 UUID

##### 5.1.3.7.3 Is Required

❌ No

##### 5.1.3.7.4 Is Primary Key

❌ No

##### 5.1.3.7.5 Size

0

##### 5.1.3.7.6 Is Unique

❌ No

##### 5.1.3.7.7 Constraints

*No items available*

##### 5.1.3.7.8 Precision

0

##### 5.1.3.7.9 Scale

0

##### 5.1.3.7.10 Is Foreign Key

✅ Yes

#### 5.1.3.8.0 UUID

##### 5.1.3.8.1 Name

brandId

##### 5.1.3.8.2 Type

🔹 UUID

##### 5.1.3.8.3 Is Required

❌ No

##### 5.1.3.8.4 Is Primary Key

❌ No

##### 5.1.3.8.5 Size

0

##### 5.1.3.8.6 Is Unique

❌ No

##### 5.1.3.8.7 Constraints

*No items available*

##### 5.1.3.8.8 Precision

0

##### 5.1.3.8.9 Scale

0

##### 5.1.3.8.10 Is Foreign Key

✅ Yes

#### 5.1.3.9.0 VARCHAR

##### 5.1.3.9.1 Name

photoUrl

##### 5.1.3.9.2 Type

🔹 VARCHAR

##### 5.1.3.9.3 Is Required

❌ No

##### 5.1.3.9.4 Is Primary Key

❌ No

##### 5.1.3.9.5 Size

512

##### 5.1.3.9.6 Is Unique

❌ No

##### 5.1.3.9.7 Constraints

*No items available*

##### 5.1.3.9.8 Precision

0

##### 5.1.3.9.9 Scale

0

##### 5.1.3.9.10 Is Foreign Key

❌ No

#### 5.1.3.10.0 BOOLEAN

##### 5.1.3.10.1 Name

isActive

##### 5.1.3.10.2 Type

🔹 BOOLEAN

##### 5.1.3.10.3 Is Required

✅ Yes

##### 5.1.3.10.4 Is Primary Key

❌ No

##### 5.1.3.10.5 Size

0

##### 5.1.3.10.6 Is Unique

❌ No

##### 5.1.3.10.7 Constraints

- DEFAULT true

##### 5.1.3.10.8 Precision

0

##### 5.1.3.10.9 Scale

0

##### 5.1.3.10.10 Is Foreign Key

❌ No

#### 5.1.3.11.0 BOOLEAN

##### 5.1.3.11.1 Name

isDeleted

##### 5.1.3.11.2 Type

🔹 BOOLEAN

##### 5.1.3.11.3 Is Required

✅ Yes

##### 5.1.3.11.4 Is Primary Key

❌ No

##### 5.1.3.11.5 Size

0

##### 5.1.3.11.6 Is Unique

❌ No

##### 5.1.3.11.7 Constraints

- DEFAULT false

##### 5.1.3.11.8 Precision

0

##### 5.1.3.11.9 Scale

0

##### 5.1.3.11.10 Is Foreign Key

❌ No

#### 5.1.3.12.0 DateTime

##### 5.1.3.12.1 Name

createdAt

##### 5.1.3.12.2 Type

🔹 DateTime

##### 5.1.3.12.3 Is Required

✅ Yes

##### 5.1.3.12.4 Is Primary Key

❌ No

##### 5.1.3.12.5 Size

0

##### 5.1.3.12.6 Is Unique

❌ No

##### 5.1.3.12.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.1.3.12.8 Precision

0

##### 5.1.3.12.9 Scale

0

##### 5.1.3.12.10 Is Foreign Key

❌ No

#### 5.1.3.13.0 DateTime

##### 5.1.3.13.1 Name

updatedAt

##### 5.1.3.13.2 Type

🔹 DateTime

##### 5.1.3.13.3 Is Required

✅ Yes

##### 5.1.3.13.4 Is Primary Key

❌ No

##### 5.1.3.13.5 Size

0

##### 5.1.3.13.6 Is Unique

❌ No

##### 5.1.3.13.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.1.3.13.8 Precision

0

##### 5.1.3.13.9 Scale

0

##### 5.1.3.13.10 Is Foreign Key

❌ No

### 5.1.4.0.0 Primary Keys

- userId

### 5.1.5.0.0 Unique Constraints

- {'name': 'UC_User_Email', 'columns': ['email']}

### 5.1.6.0.0 Indexes

#### 5.1.6.1.0 BTree

##### 5.1.6.1.1 Name

IX_User_FullName

##### 5.1.6.1.2 Columns

- lastName
- firstName

##### 5.1.6.1.3 Type

🔹 BTree

#### 5.1.6.2.0 BTree

##### 5.1.6.2.1 Name

IX_User_Role

##### 5.1.6.2.2 Columns

- role

##### 5.1.6.2.3 Type

🔹 BTree

#### 5.1.6.3.0 BTree

##### 5.1.6.3.1 Name

IX_User_Active_NotDeleted

##### 5.1.6.3.2 Columns

- isActive
- isDeleted

##### 5.1.6.3.3 Type

🔹 BTree

## 5.2.0.0.0 Device

### 5.2.1.0.0 Name

Device

### 5.2.2.0.0 Description

Stores device information for sending push notifications via FCM. (REQ-INTG-001)

### 5.2.3.0.0 Attributes

#### 5.2.3.1.0 UUID

##### 5.2.3.1.1 Name

deviceId

##### 5.2.3.1.2 Type

🔹 UUID

##### 5.2.3.1.3 Is Required

✅ Yes

##### 5.2.3.1.4 Is Primary Key

✅ Yes

##### 5.2.3.1.5 Size

0

##### 5.2.3.1.6 Is Unique

✅ Yes

##### 5.2.3.1.7 Constraints

*No items available*

##### 5.2.3.1.8 Precision

0

##### 5.2.3.1.9 Scale

0

##### 5.2.3.1.10 Is Foreign Key

❌ No

#### 5.2.3.2.0 UUID

##### 5.2.3.2.1 Name

userId

##### 5.2.3.2.2 Type

🔹 UUID

##### 5.2.3.2.3 Is Required

✅ Yes

##### 5.2.3.2.4 Is Primary Key

❌ No

##### 5.2.3.2.5 Size

0

##### 5.2.3.2.6 Is Unique

❌ No

##### 5.2.3.2.7 Constraints

*No items available*

##### 5.2.3.2.8 Precision

0

##### 5.2.3.2.9 Scale

0

##### 5.2.3.2.10 Is Foreign Key

✅ Yes

#### 5.2.3.3.0 VARCHAR

##### 5.2.3.3.1 Name

fcmToken

##### 5.2.3.3.2 Type

🔹 VARCHAR

##### 5.2.3.3.3 Is Required

✅ Yes

##### 5.2.3.3.4 Is Primary Key

❌ No

##### 5.2.3.3.5 Size

255

##### 5.2.3.3.6 Is Unique

✅ Yes

##### 5.2.3.3.7 Constraints

*No items available*

##### 5.2.3.3.8 Precision

0

##### 5.2.3.3.9 Scale

0

##### 5.2.3.3.10 Is Foreign Key

❌ No

#### 5.2.3.4.0 VARCHAR

##### 5.2.3.4.1 Name

deviceType

##### 5.2.3.4.2 Type

🔹 VARCHAR

##### 5.2.3.4.3 Is Required

✅ Yes

##### 5.2.3.4.4 Is Primary Key

❌ No

##### 5.2.3.4.5 Size

10

##### 5.2.3.4.6 Is Unique

❌ No

##### 5.2.3.4.7 Constraints

- ENUM('Android', 'iOS')

##### 5.2.3.4.8 Precision

0

##### 5.2.3.4.9 Scale

0

##### 5.2.3.4.10 Is Foreign Key

❌ No

#### 5.2.3.5.0 DateTime

##### 5.2.3.5.1 Name

createdAt

##### 5.2.3.5.2 Type

🔹 DateTime

##### 5.2.3.5.3 Is Required

✅ Yes

##### 5.2.3.5.4 Is Primary Key

❌ No

##### 5.2.3.5.5 Size

0

##### 5.2.3.5.6 Is Unique

❌ No

##### 5.2.3.5.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.2.3.5.8 Precision

0

##### 5.2.3.5.9 Scale

0

##### 5.2.3.5.10 Is Foreign Key

❌ No

### 5.2.4.0.0 Primary Keys

- deviceId

### 5.2.5.0.0 Unique Constraints

- {'name': 'UC_Device_FcmToken', 'columns': ['fcmToken']}

### 5.2.6.0.0 Indexes

- {'name': 'IX_Device_UserId', 'columns': ['userId'], 'type': 'BTree'}

## 5.3.0.0.0 UserNotificationPreference

### 5.3.1.0.0 Name

UserNotificationPreference

### 5.3.2.0.0 Description

Stores user-specific notification preferences. (REQ-ALERT-6.1)

### 5.3.3.0.0 Attributes

#### 5.3.3.1.0 UUID

##### 5.3.3.1.1 Name

userId

##### 5.3.3.1.2 Type

🔹 UUID

##### 5.3.3.1.3 Is Required

✅ Yes

##### 5.3.3.1.4 Is Primary Key

✅ Yes

##### 5.3.3.1.5 Size

0

##### 5.3.3.1.6 Is Unique

✅ Yes

##### 5.3.3.1.7 Constraints

*No items available*

##### 5.3.3.1.8 Precision

0

##### 5.3.3.1.9 Scale

0

##### 5.3.3.1.10 Is Foreign Key

✅ Yes

#### 5.3.3.2.0 JSONB

##### 5.3.3.2.1 Name

preferences

##### 5.3.3.2.2 Type

🔹 JSONB

##### 5.3.3.2.3 Is Required

✅ Yes

##### 5.3.3.2.4 Is Primary Key

❌ No

##### 5.3.3.2.5 Size

0

##### 5.3.3.2.6 Is Unique

❌ No

##### 5.3.3.2.7 Constraints

- DEFAULT '{}'

##### 5.3.3.2.8 Precision

0

##### 5.3.3.2.9 Scale

0

##### 5.3.3.2.10 Is Foreign Key

❌ No

### 5.3.4.0.0 Primary Keys

- userId

### 5.3.5.0.0 Unique Constraints

*No items available*

### 5.3.6.0.0 Indexes

- {'name': 'IX_UserNotificationPreference_Preferences', 'columns': ['preferences'], 'type': 'GIN'}

## 5.4.0.0.0 Brand

### 5.4.1.0.0 Name

Brand

### 5.4.2.0.0 Description

Represents a product brand or manufacturer. Data is frequently accessed and suitable for caching.

### 5.4.3.0.0 Attributes

#### 5.4.3.1.0 UUID

##### 5.4.3.1.1 Name

brandId

##### 5.4.3.1.2 Type

🔹 UUID

##### 5.4.3.1.3 Is Required

✅ Yes

##### 5.4.3.1.4 Is Primary Key

✅ Yes

##### 5.4.3.1.5 Size

0

##### 5.4.3.1.6 Is Unique

✅ Yes

##### 5.4.3.1.7 Constraints

*No items available*

##### 5.4.3.1.8 Precision

0

##### 5.4.3.1.9 Scale

0

##### 5.4.3.1.10 Is Foreign Key

❌ No

#### 5.4.3.2.0 VARCHAR

##### 5.4.3.2.1 Name

name

##### 5.4.3.2.2 Type

🔹 VARCHAR

##### 5.4.3.2.3 Is Required

✅ Yes

##### 5.4.3.2.4 Is Primary Key

❌ No

##### 5.4.3.2.5 Size

150

##### 5.4.3.2.6 Is Unique

✅ Yes

##### 5.4.3.2.7 Constraints

*No items available*

##### 5.4.3.2.8 Precision

0

##### 5.4.3.2.9 Scale

0

##### 5.4.3.2.10 Is Foreign Key

❌ No

#### 5.4.3.3.0 VARCHAR

##### 5.4.3.3.1 Name

status

##### 5.4.3.3.2 Type

🔹 VARCHAR

##### 5.4.3.3.3 Is Required

✅ Yes

##### 5.4.3.3.4 Is Primary Key

❌ No

##### 5.4.3.3.5 Size

20

##### 5.4.3.3.6 Is Unique

❌ No

##### 5.4.3.3.7 Constraints

- ENUM('Pending', 'Approved', 'Rejected')
- DEFAULT 'Pending'

##### 5.4.3.3.8 Precision

0

##### 5.4.3.3.9 Scale

0

##### 5.4.3.3.10 Is Foreign Key

❌ No

#### 5.4.3.4.0 BOOLEAN

##### 5.4.3.4.1 Name

isDeleted

##### 5.4.3.4.2 Type

🔹 BOOLEAN

##### 5.4.3.4.3 Is Required

✅ Yes

##### 5.4.3.4.4 Is Primary Key

❌ No

##### 5.4.3.4.5 Size

0

##### 5.4.3.4.6 Is Unique

❌ No

##### 5.4.3.4.7 Constraints

- DEFAULT false

##### 5.4.3.4.8 Precision

0

##### 5.4.3.4.9 Scale

0

##### 5.4.3.4.10 Is Foreign Key

❌ No

#### 5.4.3.5.0 DateTime

##### 5.4.3.5.1 Name

createdAt

##### 5.4.3.5.2 Type

🔹 DateTime

##### 5.4.3.5.3 Is Required

✅ Yes

##### 5.4.3.5.4 Is Primary Key

❌ No

##### 5.4.3.5.5 Size

0

##### 5.4.3.5.6 Is Unique

❌ No

##### 5.4.3.5.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.4.3.5.8 Precision

0

##### 5.4.3.5.9 Scale

0

##### 5.4.3.5.10 Is Foreign Key

❌ No

#### 5.4.3.6.0 DateTime

##### 5.4.3.6.1 Name

updatedAt

##### 5.4.3.6.2 Type

🔹 DateTime

##### 5.4.3.6.3 Is Required

✅ Yes

##### 5.4.3.6.4 Is Primary Key

❌ No

##### 5.4.3.6.5 Size

0

##### 5.4.3.6.6 Is Unique

❌ No

##### 5.4.3.6.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.4.3.6.8 Precision

0

##### 5.4.3.6.9 Scale

0

##### 5.4.3.6.10 Is Foreign Key

❌ No

### 5.4.4.0.0 Primary Keys

- brandId

### 5.4.5.0.0 Unique Constraints

- {'name': 'UC_Brand_Name', 'columns': ['name']}

### 5.4.6.0.0 Indexes

- {'name': 'IX_Brand_Status', 'columns': ['status'], 'type': 'BTree'}

## 5.5.0.0.0 ProductCategory

### 5.5.1.0.0 Name

ProductCategory

### 5.5.2.0.0 Description

Defines a hierarchical structure for product categories, managed by Super Admins. (REQ-FUNC-3.1)

### 5.5.3.0.0 Attributes

#### 5.5.3.1.0 UUID

##### 5.5.3.1.1 Name

productCategoryId

##### 5.5.3.1.2 Type

🔹 UUID

##### 5.5.3.1.3 Is Required

✅ Yes

##### 5.5.3.1.4 Is Primary Key

✅ Yes

##### 5.5.3.1.5 Size

0

##### 5.5.3.1.6 Is Unique

✅ Yes

##### 5.5.3.1.7 Constraints

*No items available*

##### 5.5.3.1.8 Precision

0

##### 5.5.3.1.9 Scale

0

##### 5.5.3.1.10 Is Foreign Key

❌ No

#### 5.5.3.2.0 VARCHAR

##### 5.5.3.2.1 Name

name

##### 5.5.3.2.2 Type

🔹 VARCHAR

##### 5.5.3.2.3 Is Required

✅ Yes

##### 5.5.3.2.4 Is Primary Key

❌ No

##### 5.5.3.2.5 Size

150

##### 5.5.3.2.6 Is Unique

✅ Yes

##### 5.5.3.2.7 Constraints

*No items available*

##### 5.5.3.2.8 Precision

0

##### 5.5.3.2.9 Scale

0

##### 5.5.3.2.10 Is Foreign Key

❌ No

#### 5.5.3.3.0 TEXT

##### 5.5.3.3.1 Name

description

##### 5.5.3.3.2 Type

🔹 TEXT

##### 5.5.3.3.3 Is Required

❌ No

##### 5.5.3.3.4 Is Primary Key

❌ No

##### 5.5.3.3.5 Size

0

##### 5.5.3.3.6 Is Unique

❌ No

##### 5.5.3.3.7 Constraints

*No items available*

##### 5.5.3.3.8 Precision

0

##### 5.5.3.3.9 Scale

0

##### 5.5.3.3.10 Is Foreign Key

❌ No

#### 5.5.3.4.0 UUID

##### 5.5.3.4.1 Name

parentCategoryId

##### 5.5.3.4.2 Type

🔹 UUID

##### 5.5.3.4.3 Is Required

❌ No

##### 5.5.3.4.4 Is Primary Key

❌ No

##### 5.5.3.4.5 Size

0

##### 5.5.3.4.6 Is Unique

❌ No

##### 5.5.3.4.7 Constraints

*No items available*

##### 5.5.3.4.8 Precision

0

##### 5.5.3.4.9 Scale

0

##### 5.5.3.4.10 Is Foreign Key

✅ Yes

#### 5.5.3.5.0 BOOLEAN

##### 5.5.3.5.1 Name

isActive

##### 5.5.3.5.2 Type

🔹 BOOLEAN

##### 5.5.3.5.3 Is Required

✅ Yes

##### 5.5.3.5.4 Is Primary Key

❌ No

##### 5.5.3.5.5 Size

0

##### 5.5.3.5.6 Is Unique

❌ No

##### 5.5.3.5.7 Constraints

- DEFAULT true

##### 5.5.3.5.8 Precision

0

##### 5.5.3.5.9 Scale

0

##### 5.5.3.5.10 Is Foreign Key

❌ No

### 5.5.4.0.0 Primary Keys

- productCategoryId

### 5.5.5.0.0 Unique Constraints

- {'name': 'UC_ProductCategory_Name', 'columns': ['name']}

### 5.5.6.0.0 Indexes

- {'name': 'IX_ProductCategory_ParentCategoryId', 'columns': ['parentCategoryId'], 'type': 'BTree'}

## 5.6.0.0.0 ProductModel

### 5.6.1.0.0 Name

ProductModel

### 5.6.2.0.0 Description

Represents a specific product model from a brand. Data is frequently accessed and suitable for caching. (REQ-FUNC-012)

### 5.6.3.0.0 Attributes

#### 5.6.3.1.0 UUID

##### 5.6.3.1.1 Name

productModelId

##### 5.6.3.1.2 Type

🔹 UUID

##### 5.6.3.1.3 Is Required

✅ Yes

##### 5.6.3.1.4 Is Primary Key

✅ Yes

##### 5.6.3.1.5 Size

0

##### 5.6.3.1.6 Is Unique

✅ Yes

##### 5.6.3.1.7 Constraints

*No items available*

##### 5.6.3.1.8 Precision

0

##### 5.6.3.1.9 Scale

0

##### 5.6.3.1.10 Is Foreign Key

❌ No

#### 5.6.3.2.0 UUID

##### 5.6.3.2.1 Name

brandId

##### 5.6.3.2.2 Type

🔹 UUID

##### 5.6.3.2.3 Is Required

✅ Yes

##### 5.6.3.2.4 Is Primary Key

❌ No

##### 5.6.3.2.5 Size

0

##### 5.6.3.2.6 Is Unique

❌ No

##### 5.6.3.2.7 Constraints

*No items available*

##### 5.6.3.2.8 Precision

0

##### 5.6.3.2.9 Scale

0

##### 5.6.3.2.10 Is Foreign Key

✅ Yes

#### 5.6.3.3.0 UUID

##### 5.6.3.3.1 Name

productCategoryId

##### 5.6.3.3.2 Type

🔹 UUID

##### 5.6.3.3.3 Is Required

✅ Yes

##### 5.6.3.3.4 Is Primary Key

❌ No

##### 5.6.3.3.5 Size

0

##### 5.6.3.3.6 Is Unique

❌ No

##### 5.6.3.3.7 Constraints

*No items available*

##### 5.6.3.3.8 Precision

0

##### 5.6.3.3.9 Scale

0

##### 5.6.3.3.10 Is Foreign Key

✅ Yes

#### 5.6.3.4.0 VARCHAR

##### 5.6.3.4.1 Name

modelNumber

##### 5.6.3.4.2 Type

🔹 VARCHAR

##### 5.6.3.4.3 Is Required

✅ Yes

##### 5.6.3.4.4 Is Primary Key

❌ No

##### 5.6.3.4.5 Size

100

##### 5.6.3.4.6 Is Unique

❌ No

##### 5.6.3.4.7 Constraints

*No items available*

##### 5.6.3.4.8 Precision

0

##### 5.6.3.4.9 Scale

0

##### 5.6.3.4.10 Is Foreign Key

❌ No

#### 5.6.3.5.0 VARCHAR

##### 5.6.3.5.1 Name

name

##### 5.6.3.5.2 Type

🔹 VARCHAR

##### 5.6.3.5.3 Is Required

✅ Yes

##### 5.6.3.5.4 Is Primary Key

❌ No

##### 5.6.3.5.5 Size

200

##### 5.6.3.5.6 Is Unique

❌ No

##### 5.6.3.5.7 Constraints

*No items available*

##### 5.6.3.5.8 Precision

0

##### 5.6.3.5.9 Scale

0

##### 5.6.3.5.10 Is Foreign Key

❌ No

#### 5.6.3.6.0 VARCHAR

##### 5.6.3.6.1 Name

serialNumberRegex

##### 5.6.3.6.2 Type

🔹 VARCHAR

##### 5.6.3.6.3 Is Required

❌ No

##### 5.6.3.6.4 Is Primary Key

❌ No

##### 5.6.3.6.5 Size

255

##### 5.6.3.6.6 Is Unique

❌ No

##### 5.6.3.6.7 Constraints

*No items available*

##### 5.6.3.6.8 Precision

0

##### 5.6.3.6.9 Scale

0

##### 5.6.3.6.10 Is Foreign Key

❌ No

### 5.6.4.0.0 Primary Keys

- productModelId

### 5.6.5.0.0 Unique Constraints

- {'name': 'UC_ProductModel_Brand_ModelNumber', 'columns': ['brandId', 'modelNumber']}

### 5.6.6.0.0 Indexes

#### 5.6.6.1.0 BTree

##### 5.6.6.1.1 Name

IX_ProductModel_BrandId

##### 5.6.6.1.2 Columns

- brandId

##### 5.6.6.1.3 Type

🔹 BTree

#### 5.6.6.2.0 BTree

##### 5.6.6.2.1 Name

IX_ProductModel_ProductCategoryId

##### 5.6.6.2.2 Columns

- productCategoryId

##### 5.6.6.2.3 Type

🔹 BTree

## 5.7.0.0.0 ProductBarcode

### 5.7.1.0.0 Name

ProductBarcode

### 5.7.2.0.0 Description

Maps known barcode values (UPC, EAN, etc.) to product models for easy registration via scanning. (REQ-FUNC-3.9)

### 5.7.3.0.0 Attributes

#### 5.7.3.1.0 VARCHAR

##### 5.7.3.1.1 Name

barcodeValue

##### 5.7.3.1.2 Type

🔹 VARCHAR

##### 5.7.3.1.3 Is Required

✅ Yes

##### 5.7.3.1.4 Is Primary Key

✅ Yes

##### 5.7.3.1.5 Size

255

##### 5.7.3.1.6 Is Unique

✅ Yes

##### 5.7.3.1.7 Constraints

*No items available*

##### 5.7.3.1.8 Precision

0

##### 5.7.3.1.9 Scale

0

##### 5.7.3.1.10 Is Foreign Key

❌ No

#### 5.7.3.2.0 UUID

##### 5.7.3.2.1 Name

productModelId

##### 5.7.3.2.2 Type

🔹 UUID

##### 5.7.3.2.3 Is Required

✅ Yes

##### 5.7.3.2.4 Is Primary Key

❌ No

##### 5.7.3.2.5 Size

0

##### 5.7.3.2.6 Is Unique

❌ No

##### 5.7.3.2.7 Constraints

*No items available*

##### 5.7.3.2.8 Precision

0

##### 5.7.3.2.9 Scale

0

##### 5.7.3.2.10 Is Foreign Key

✅ Yes

### 5.7.4.0.0 Primary Keys

- barcodeValue

### 5.7.5.0.0 Unique Constraints

*No items available*

### 5.7.6.0.0 Indexes

- {'name': 'IX_ProductBarcode_ProductModelId', 'columns': ['productModelId'], 'type': 'BTree'}

## 5.8.0.0.0 UserProduct

### 5.8.1.0.0 Name

UserProduct

### 5.8.2.0.0 Description

Represents a specific instance of a product owned by a user. (REQ-BR-001, REQ-FUNC-005)

### 5.8.3.0.0 Attributes

#### 5.8.3.1.0 UUID

##### 5.8.3.1.1 Name

userProductId

##### 5.8.3.1.2 Type

🔹 UUID

##### 5.8.3.1.3 Is Required

✅ Yes

##### 5.8.3.1.4 Is Primary Key

✅ Yes

##### 5.8.3.1.5 Size

0

##### 5.8.3.1.6 Is Unique

✅ Yes

##### 5.8.3.1.7 Constraints

*No items available*

##### 5.8.3.1.8 Precision

0

##### 5.8.3.1.9 Scale

0

##### 5.8.3.1.10 Is Foreign Key

❌ No

#### 5.8.3.2.0 UUID

##### 5.8.3.2.1 Name

userId

##### 5.8.3.2.2 Type

🔹 UUID

##### 5.8.3.2.3 Is Required

✅ Yes

##### 5.8.3.2.4 Is Primary Key

❌ No

##### 5.8.3.2.5 Size

0

##### 5.8.3.2.6 Is Unique

❌ No

##### 5.8.3.2.7 Constraints

*No items available*

##### 5.8.3.2.8 Precision

0

##### 5.8.3.2.9 Scale

0

##### 5.8.3.2.10 Is Foreign Key

✅ Yes

#### 5.8.3.3.0 UUID

##### 5.8.3.3.1 Name

productModelId

##### 5.8.3.3.2 Type

🔹 UUID

##### 5.8.3.3.3 Is Required

✅ Yes

##### 5.8.3.3.4 Is Primary Key

❌ No

##### 5.8.3.3.5 Size

0

##### 5.8.3.3.6 Is Unique

❌ No

##### 5.8.3.3.7 Constraints

*No items available*

##### 5.8.3.3.8 Precision

0

##### 5.8.3.3.9 Scale

0

##### 5.8.3.3.10 Is Foreign Key

✅ Yes

#### 5.8.3.4.0 VARCHAR

##### 5.8.3.4.1 Name

serialNumber

##### 5.8.3.4.2 Type

🔹 VARCHAR

##### 5.8.3.4.3 Is Required

✅ Yes

##### 5.8.3.4.4 Is Primary Key

❌ No

##### 5.8.3.4.5 Size

100

##### 5.8.3.4.6 Is Unique

✅ Yes

##### 5.8.3.4.7 Constraints

*No items available*

##### 5.8.3.4.8 Precision

0

##### 5.8.3.4.9 Scale

0

##### 5.8.3.4.10 Is Foreign Key

❌ No

#### 5.8.3.5.0 DATE

##### 5.8.3.5.1 Name

purchaseDate

##### 5.8.3.5.2 Type

🔹 DATE

##### 5.8.3.5.3 Is Required

✅ Yes

##### 5.8.3.5.4 Is Primary Key

❌ No

##### 5.8.3.5.5 Size

0

##### 5.8.3.5.6 Is Unique

❌ No

##### 5.8.3.5.7 Constraints

*No items available*

##### 5.8.3.5.8 Precision

0

##### 5.8.3.5.9 Scale

0

##### 5.8.3.5.10 Is Foreign Key

❌ No

#### 5.8.3.6.0 BOOLEAN

##### 5.8.3.6.1 Name

isLocked

##### 5.8.3.6.2 Type

🔹 BOOLEAN

##### 5.8.3.6.3 Is Required

✅ Yes

##### 5.8.3.6.4 Is Primary Key

❌ No

##### 5.8.3.6.5 Size

0

##### 5.8.3.6.6 Is Unique

❌ No

##### 5.8.3.6.7 Constraints

- DEFAULT false

##### 5.8.3.6.8 Precision

0

##### 5.8.3.6.9 Scale

0

##### 5.8.3.6.10 Is Foreign Key

❌ No

#### 5.8.3.7.0 BOOLEAN

##### 5.8.3.7.1 Name

isDeleted

##### 5.8.3.7.2 Type

🔹 BOOLEAN

##### 5.8.3.7.3 Is Required

✅ Yes

##### 5.8.3.7.4 Is Primary Key

❌ No

##### 5.8.3.7.5 Size

0

##### 5.8.3.7.6 Is Unique

❌ No

##### 5.8.3.7.7 Constraints

- DEFAULT false

##### 5.8.3.7.8 Precision

0

##### 5.8.3.7.9 Scale

0

##### 5.8.3.7.10 Is Foreign Key

❌ No

#### 5.8.3.8.0 DateTime

##### 5.8.3.8.1 Name

createdAt

##### 5.8.3.8.2 Type

🔹 DateTime

##### 5.8.3.8.3 Is Required

✅ Yes

##### 5.8.3.8.4 Is Primary Key

❌ No

##### 5.8.3.8.5 Size

0

##### 5.8.3.8.6 Is Unique

❌ No

##### 5.8.3.8.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.8.3.8.8 Precision

0

##### 5.8.3.8.9 Scale

0

##### 5.8.3.8.10 Is Foreign Key

❌ No

#### 5.8.3.9.0 DateTime

##### 5.8.3.9.1 Name

updatedAt

##### 5.8.3.9.2 Type

🔹 DateTime

##### 5.8.3.9.3 Is Required

✅ Yes

##### 5.8.3.9.4 Is Primary Key

❌ No

##### 5.8.3.9.5 Size

0

##### 5.8.3.9.6 Is Unique

❌ No

##### 5.8.3.9.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.8.3.9.8 Precision

0

##### 5.8.3.9.9 Scale

0

##### 5.8.3.9.10 Is Foreign Key

❌ No

### 5.8.4.0.0 Primary Keys

- userProductId

### 5.8.5.0.0 Unique Constraints

- {'name': 'UC_UserProduct_SerialNumber', 'columns': ['serialNumber']}

### 5.8.6.0.0 Indexes

#### 5.8.6.1.0 BTree

##### 5.8.6.1.1 Name

IX_UserProduct_UserId

##### 5.8.6.1.2 Columns

- userId

##### 5.8.6.1.3 Type

🔹 BTree

#### 5.8.6.2.0 BTree

##### 5.8.6.2.1 Name

IX_UserProduct_ProductModelId

##### 5.8.6.2.2 Columns

- productModelId

##### 5.8.6.2.3 Type

🔹 BTree

## 5.9.0.0.0 WarrantyPolicy

### 5.9.1.0.0 Name

WarrantyPolicy

### 5.9.2.0.0 Description

Defines a standard warranty policy for a product model, managed by Brand Admins. Includes default duration and T&C document. (REQ-FUNC-3.3)

### 5.9.3.0.0 Attributes

#### 5.9.3.1.0 UUID

##### 5.9.3.1.1 Name

warrantyPolicyId

##### 5.9.3.1.2 Type

🔹 UUID

##### 5.9.3.1.3 Is Required

✅ Yes

##### 5.9.3.1.4 Is Primary Key

✅ Yes

##### 5.9.3.1.5 Size

0

##### 5.9.3.1.6 Is Unique

✅ Yes

##### 5.9.3.1.7 Constraints

*No items available*

##### 5.9.3.1.8 Precision

0

##### 5.9.3.1.9 Scale

0

##### 5.9.3.1.10 Is Foreign Key

❌ No

#### 5.9.3.2.0 UUID

##### 5.9.3.2.1 Name

productModelId

##### 5.9.3.2.2 Type

🔹 UUID

##### 5.9.3.2.3 Is Required

✅ Yes

##### 5.9.3.2.4 Is Primary Key

❌ No

##### 5.9.3.2.5 Size

0

##### 5.9.3.2.6 Is Unique

✅ Yes

##### 5.9.3.2.7 Constraints

*No items available*

##### 5.9.3.2.8 Precision

0

##### 5.9.3.2.9 Scale

0

##### 5.9.3.2.10 Is Foreign Key

✅ Yes

#### 5.9.3.3.0 INT

##### 5.9.3.3.1 Name

defaultDurationMonths

##### 5.9.3.3.2 Type

🔹 INT

##### 5.9.3.3.3 Is Required

✅ Yes

##### 5.9.3.3.4 Is Primary Key

❌ No

##### 5.9.3.3.5 Size

0

##### 5.9.3.3.6 Is Unique

❌ No

##### 5.9.3.3.7 Constraints

- POSITIVE_VALUE

##### 5.9.3.3.8 Precision

0

##### 5.9.3.3.9 Scale

0

##### 5.9.3.3.10 Is Foreign Key

❌ No

#### 5.9.3.4.0 VARCHAR

##### 5.9.3.4.1 Name

termsAndConditionsUrl

##### 5.9.3.4.2 Type

🔹 VARCHAR

##### 5.9.3.4.3 Is Required

✅ Yes

##### 5.9.3.4.4 Is Primary Key

❌ No

##### 5.9.3.4.5 Size

512

##### 5.9.3.4.6 Is Unique

❌ No

##### 5.9.3.4.7 Constraints

*No items available*

##### 5.9.3.4.8 Precision

0

##### 5.9.3.4.9 Scale

0

##### 5.9.3.4.10 Is Foreign Key

❌ No

### 5.9.4.0.0 Primary Keys

- warrantyPolicyId

### 5.9.5.0.0 Unique Constraints

- {'name': 'UC_WarrantyPolicy_ProductModelId', 'columns': ['productModelId']}

### 5.9.6.0.0 Indexes

*No items available*

## 5.10.0.0.0 Warranty

### 5.10.1.0.0 Name

Warranty

### 5.10.2.0.0 Description

Represents a single warranty (primary or extended) for a user's product, enabling multiple warranties per product. (REQ-FUNC-3.2)

### 5.10.3.0.0 Attributes

#### 5.10.3.1.0 UUID

##### 5.10.3.1.1 Name

warrantyId

##### 5.10.3.1.2 Type

🔹 UUID

##### 5.10.3.1.3 Is Required

✅ Yes

##### 5.10.3.1.4 Is Primary Key

✅ Yes

##### 5.10.3.1.5 Size

0

##### 5.10.3.1.6 Is Unique

✅ Yes

##### 5.10.3.1.7 Constraints

*No items available*

##### 5.10.3.1.8 Precision

0

##### 5.10.3.1.9 Scale

0

##### 5.10.3.1.10 Is Foreign Key

❌ No

#### 5.10.3.2.0 UUID

##### 5.10.3.2.1 Name

userProductId

##### 5.10.3.2.2 Type

🔹 UUID

##### 5.10.3.2.3 Is Required

✅ Yes

##### 5.10.3.2.4 Is Primary Key

❌ No

##### 5.10.3.2.5 Size

0

##### 5.10.3.2.6 Is Unique

❌ No

##### 5.10.3.2.7 Constraints

*No items available*

##### 5.10.3.2.8 Precision

0

##### 5.10.3.2.9 Scale

0

##### 5.10.3.2.10 Is Foreign Key

✅ Yes

#### 5.10.3.3.0 VARCHAR

##### 5.10.3.3.1 Name

warrantyType

##### 5.10.3.3.2 Type

🔹 VARCHAR

##### 5.10.3.3.3 Is Required

✅ Yes

##### 5.10.3.3.4 Is Primary Key

❌ No

##### 5.10.3.3.5 Size

20

##### 5.10.3.3.6 Is Unique

❌ No

##### 5.10.3.3.7 Constraints

- ENUM('Primary', 'Extended')

##### 5.10.3.3.8 Precision

0

##### 5.10.3.3.9 Scale

0

##### 5.10.3.3.10 Is Foreign Key

❌ No

#### 5.10.3.4.0 DATE

##### 5.10.3.4.1 Name

expiryDate

##### 5.10.3.4.2 Type

🔹 DATE

##### 5.10.3.4.3 Is Required

✅ Yes

##### 5.10.3.4.4 Is Primary Key

❌ No

##### 5.10.3.4.5 Size

0

##### 5.10.3.4.6 Is Unique

❌ No

##### 5.10.3.4.7 Constraints

*No items available*

##### 5.10.3.4.8 Precision

0

##### 5.10.3.4.9 Scale

0

##### 5.10.3.4.10 Is Foreign Key

❌ No

#### 5.10.3.5.0 VARCHAR

##### 5.10.3.5.1 Name

documentUrl

##### 5.10.3.5.2 Type

🔹 VARCHAR

##### 5.10.3.5.3 Is Required

❌ No

##### 5.10.3.5.4 Is Primary Key

❌ No

##### 5.10.3.5.5 Size

512

##### 5.10.3.5.6 Is Unique

❌ No

##### 5.10.3.5.7 Constraints

*No items available*

##### 5.10.3.5.8 Precision

0

##### 5.10.3.5.9 Scale

0

##### 5.10.3.5.10 Is Foreign Key

❌ No

### 5.10.4.0.0 Primary Keys

- warrantyId

### 5.10.5.0.0 Unique Constraints

*No items available*

### 5.10.6.0.0 Indexes

#### 5.10.6.1.0 BTree

##### 5.10.6.1.1 Name

IX_Warranty_UserProductId

##### 5.10.6.1.2 Columns

- userProductId

##### 5.10.6.1.3 Type

🔹 BTree

#### 5.10.6.2.0 BTree

##### 5.10.6.2.1 Name

IX_Warranty_ExpiryDate

##### 5.10.6.2.2 Columns

- expiryDate

##### 5.10.6.2.3 Type

🔹 BTree

## 5.11.0.0.0 OwnershipTransferRequest

### 5.11.1.0.0 Name

OwnershipTransferRequest

### 5.11.2.0.0 Description

Tracks the state of a product ownership transfer request. A unique constraint on userProductId is filtered for 'Pending' status. (REQ-FUNC-004, REQ-BR-002)

### 5.11.3.0.0 Attributes

#### 5.11.3.1.0 UUID

##### 5.11.3.1.1 Name

transferRequestId

##### 5.11.3.1.2 Type

🔹 UUID

##### 5.11.3.1.3 Is Required

✅ Yes

##### 5.11.3.1.4 Is Primary Key

✅ Yes

##### 5.11.3.1.5 Size

0

##### 5.11.3.1.6 Is Unique

✅ Yes

##### 5.11.3.1.7 Constraints

*No items available*

##### 5.11.3.1.8 Precision

0

##### 5.11.3.1.9 Scale

0

##### 5.11.3.1.10 Is Foreign Key

❌ No

#### 5.11.3.2.0 UUID

##### 5.11.3.2.1 Name

userProductId

##### 5.11.3.2.2 Type

🔹 UUID

##### 5.11.3.2.3 Is Required

✅ Yes

##### 5.11.3.2.4 Is Primary Key

❌ No

##### 5.11.3.2.5 Size

0

##### 5.11.3.2.6 Is Unique

❌ No

##### 5.11.3.2.7 Constraints

*No items available*

##### 5.11.3.2.8 Precision

0

##### 5.11.3.2.9 Scale

0

##### 5.11.3.2.10 Is Foreign Key

✅ Yes

#### 5.11.3.3.0 UUID

##### 5.11.3.3.1 Name

fromUserId

##### 5.11.3.3.2 Type

🔹 UUID

##### 5.11.3.3.3 Is Required

✅ Yes

##### 5.11.3.3.4 Is Primary Key

❌ No

##### 5.11.3.3.5 Size

0

##### 5.11.3.3.6 Is Unique

❌ No

##### 5.11.3.3.7 Constraints

*No items available*

##### 5.11.3.3.8 Precision

0

##### 5.11.3.3.9 Scale

0

##### 5.11.3.3.10 Is Foreign Key

✅ Yes

#### 5.11.3.4.0 VARCHAR

##### 5.11.3.4.1 Name

toUserEmail

##### 5.11.3.4.2 Type

🔹 VARCHAR

##### 5.11.3.4.3 Is Required

✅ Yes

##### 5.11.3.4.4 Is Primary Key

❌ No

##### 5.11.3.4.5 Size

255

##### 5.11.3.4.6 Is Unique

❌ No

##### 5.11.3.4.7 Constraints

*No items available*

##### 5.11.3.4.8 Precision

0

##### 5.11.3.4.9 Scale

0

##### 5.11.3.4.10 Is Foreign Key

❌ No

#### 5.11.3.5.0 VARCHAR

##### 5.11.3.5.1 Name

status

##### 5.11.3.5.2 Type

🔹 VARCHAR

##### 5.11.3.5.3 Is Required

✅ Yes

##### 5.11.3.5.4 Is Primary Key

❌ No

##### 5.11.3.5.5 Size

20

##### 5.11.3.5.6 Is Unique

❌ No

##### 5.11.3.5.7 Constraints

- ENUM('Pending', 'Accepted', 'Rejected', 'Expired')
- DEFAULT 'Pending'

##### 5.11.3.5.8 Precision

0

##### 5.11.3.5.9 Scale

0

##### 5.11.3.5.10 Is Foreign Key

❌ No

#### 5.11.3.6.0 DateTime

##### 5.11.3.6.1 Name

expiresAt

##### 5.11.3.6.2 Type

🔹 DateTime

##### 5.11.3.6.3 Is Required

✅ Yes

##### 5.11.3.6.4 Is Primary Key

❌ No

##### 5.11.3.6.5 Size

0

##### 5.11.3.6.6 Is Unique

❌ No

##### 5.11.3.6.7 Constraints

*No items available*

##### 5.11.3.6.8 Precision

0

##### 5.11.3.6.9 Scale

0

##### 5.11.3.6.10 Is Foreign Key

❌ No

#### 5.11.3.7.0 DateTime

##### 5.11.3.7.1 Name

createdAt

##### 5.11.3.7.2 Type

🔹 DateTime

##### 5.11.3.7.3 Is Required

✅ Yes

##### 5.11.3.7.4 Is Primary Key

❌ No

##### 5.11.3.7.5 Size

0

##### 5.11.3.7.6 Is Unique

❌ No

##### 5.11.3.7.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.11.3.7.8 Precision

0

##### 5.11.3.7.9 Scale

0

##### 5.11.3.7.10 Is Foreign Key

❌ No

#### 5.11.3.8.0 DateTime

##### 5.11.3.8.1 Name

updatedAt

##### 5.11.3.8.2 Type

🔹 DateTime

##### 5.11.3.8.3 Is Required

✅ Yes

##### 5.11.3.8.4 Is Primary Key

❌ No

##### 5.11.3.8.5 Size

0

##### 5.11.3.8.6 Is Unique

❌ No

##### 5.11.3.8.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.11.3.8.8 Precision

0

##### 5.11.3.8.9 Scale

0

##### 5.11.3.8.10 Is Foreign Key

❌ No

### 5.11.4.0.0 Primary Keys

- transferRequestId

### 5.11.5.0.0 Unique Constraints

- {'name': 'UC_OwnershipTransferRequest_Pending_UserProduct', 'columns': ['userProductId', 'status']}

### 5.11.6.0.0 Indexes

- {'name': 'IX_OwnershipTransferRequest_Status_ExpiresAt', 'columns': ['status', 'expiresAt'], 'type': 'BTree'}

## 5.12.0.0.0 Invoice

### 5.12.1.0.0 Name

Invoice

### 5.12.2.0.0 Description

Stores uploaded invoice images/PDFs and their OCR results. (REQ-DATA-001)

### 5.12.3.0.0 Attributes

#### 5.12.3.1.0 UUID

##### 5.12.3.1.1 Name

invoiceId

##### 5.12.3.1.2 Type

🔹 UUID

##### 5.12.3.1.3 Is Required

✅ Yes

##### 5.12.3.1.4 Is Primary Key

✅ Yes

##### 5.12.3.1.5 Size

0

##### 5.12.3.1.6 Is Unique

✅ Yes

##### 5.12.3.1.7 Constraints

*No items available*

##### 5.12.3.1.8 Precision

0

##### 5.12.3.1.9 Scale

0

##### 5.12.3.1.10 Is Foreign Key

❌ No

#### 5.12.3.2.0 UUID

##### 5.12.3.2.1 Name

userProductId

##### 5.12.3.2.2 Type

🔹 UUID

##### 5.12.3.2.3 Is Required

✅ Yes

##### 5.12.3.2.4 Is Primary Key

❌ No

##### 5.12.3.2.5 Size

0

##### 5.12.3.2.6 Is Unique

✅ Yes

##### 5.12.3.2.7 Constraints

*No items available*

##### 5.12.3.2.8 Precision

0

##### 5.12.3.2.9 Scale

0

##### 5.12.3.2.10 Is Foreign Key

✅ Yes

#### 5.12.3.3.0 VARCHAR

##### 5.12.3.3.1 Name

fileUrl

##### 5.12.3.3.2 Type

🔹 VARCHAR

##### 5.12.3.3.3 Is Required

✅ Yes

##### 5.12.3.3.4 Is Primary Key

❌ No

##### 5.12.3.3.5 Size

512

##### 5.12.3.3.6 Is Unique

❌ No

##### 5.12.3.3.7 Constraints

*No items available*

##### 5.12.3.3.8 Precision

0

##### 5.12.3.3.9 Scale

0

##### 5.12.3.3.10 Is Foreign Key

❌ No

#### 5.12.3.4.0 VARCHAR

##### 5.12.3.4.1 Name

ocrStatus

##### 5.12.3.4.2 Type

🔹 VARCHAR

##### 5.12.3.4.3 Is Required

✅ Yes

##### 5.12.3.4.4 Is Primary Key

❌ No

##### 5.12.3.4.5 Size

20

##### 5.12.3.4.6 Is Unique

❌ No

##### 5.12.3.4.7 Constraints

- ENUM('Pending', 'Success', 'Failed')
- DEFAULT 'Pending'

##### 5.12.3.4.8 Precision

0

##### 5.12.3.4.9 Scale

0

##### 5.12.3.4.10 Is Foreign Key

❌ No

#### 5.12.3.5.0 JSONB

##### 5.12.3.5.1 Name

extractedData

##### 5.12.3.5.2 Type

🔹 JSONB

##### 5.12.3.5.3 Is Required

❌ No

##### 5.12.3.5.4 Is Primary Key

❌ No

##### 5.12.3.5.5 Size

0

##### 5.12.3.5.6 Is Unique

❌ No

##### 5.12.3.5.7 Constraints

*No items available*

##### 5.12.3.5.8 Precision

0

##### 5.12.3.5.9 Scale

0

##### 5.12.3.5.10 Is Foreign Key

❌ No

#### 5.12.3.6.0 DateTime

##### 5.12.3.6.1 Name

createdAt

##### 5.12.3.6.2 Type

🔹 DateTime

##### 5.12.3.6.3 Is Required

✅ Yes

##### 5.12.3.6.4 Is Primary Key

❌ No

##### 5.12.3.6.5 Size

0

##### 5.12.3.6.6 Is Unique

❌ No

##### 5.12.3.6.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.12.3.6.8 Precision

0

##### 5.12.3.6.9 Scale

0

##### 5.12.3.6.10 Is Foreign Key

❌ No

### 5.12.4.0.0 Primary Keys

- invoiceId

### 5.12.5.0.0 Unique Constraints

- {'name': 'UC_Invoice_UserProductId', 'columns': ['userProductId']}

### 5.12.6.0.0 Indexes

*No items available*

## 5.13.0.0.0 Address

### 5.13.1.0.0 Name

Address

### 5.13.2.0.0 Description

Stores structured address information, normalized from other entities.

### 5.13.3.0.0 Attributes

#### 5.13.3.1.0 UUID

##### 5.13.3.1.1 Name

addressId

##### 5.13.3.1.2 Type

🔹 UUID

##### 5.13.3.1.3 Is Required

✅ Yes

##### 5.13.3.1.4 Is Primary Key

✅ Yes

##### 5.13.3.1.5 Size

0

##### 5.13.3.1.6 Is Unique

✅ Yes

##### 5.13.3.1.7 Constraints

*No items available*

##### 5.13.3.1.8 Precision

0

##### 5.13.3.1.9 Scale

0

##### 5.13.3.1.10 Is Foreign Key

❌ No

#### 5.13.3.2.0 VARCHAR

##### 5.13.3.2.1 Name

street

##### 5.13.3.2.2 Type

🔹 VARCHAR

##### 5.13.3.2.3 Is Required

✅ Yes

##### 5.13.3.2.4 Is Primary Key

❌ No

##### 5.13.3.2.5 Size

255

##### 5.13.3.2.6 Is Unique

❌ No

##### 5.13.3.2.7 Constraints

*No items available*

##### 5.13.3.2.8 Precision

0

##### 5.13.3.2.9 Scale

0

##### 5.13.3.2.10 Is Foreign Key

❌ No

#### 5.13.3.3.0 VARCHAR

##### 5.13.3.3.1 Name

city

##### 5.13.3.3.2 Type

🔹 VARCHAR

##### 5.13.3.3.3 Is Required

✅ Yes

##### 5.13.3.3.4 Is Primary Key

❌ No

##### 5.13.3.3.5 Size

100

##### 5.13.3.3.6 Is Unique

❌ No

##### 5.13.3.3.7 Constraints

*No items available*

##### 5.13.3.3.8 Precision

0

##### 5.13.3.3.9 Scale

0

##### 5.13.3.3.10 Is Foreign Key

❌ No

#### 5.13.3.4.0 VARCHAR

##### 5.13.3.4.1 Name

state

##### 5.13.3.4.2 Type

🔹 VARCHAR

##### 5.13.3.4.3 Is Required

✅ Yes

##### 5.13.3.4.4 Is Primary Key

❌ No

##### 5.13.3.4.5 Size

100

##### 5.13.3.4.6 Is Unique

❌ No

##### 5.13.3.4.7 Constraints

*No items available*

##### 5.13.3.4.8 Precision

0

##### 5.13.3.4.9 Scale

0

##### 5.13.3.4.10 Is Foreign Key

❌ No

#### 5.13.3.5.0 VARCHAR

##### 5.13.3.5.1 Name

postalCode

##### 5.13.3.5.2 Type

🔹 VARCHAR

##### 5.13.3.5.3 Is Required

✅ Yes

##### 5.13.3.5.4 Is Primary Key

❌ No

##### 5.13.3.5.5 Size

20

##### 5.13.3.5.6 Is Unique

❌ No

##### 5.13.3.5.7 Constraints

*No items available*

##### 5.13.3.5.8 Precision

0

##### 5.13.3.5.9 Scale

0

##### 5.13.3.5.10 Is Foreign Key

❌ No

#### 5.13.3.6.0 VARCHAR

##### 5.13.3.6.1 Name

country

##### 5.13.3.6.2 Type

🔹 VARCHAR

##### 5.13.3.6.3 Is Required

✅ Yes

##### 5.13.3.6.4 Is Primary Key

❌ No

##### 5.13.3.6.5 Size

50

##### 5.13.3.6.6 Is Unique

❌ No

##### 5.13.3.6.7 Constraints

*No items available*

##### 5.13.3.6.8 Precision

0

##### 5.13.3.6.9 Scale

0

##### 5.13.3.6.10 Is Foreign Key

❌ No

#### 5.13.3.7.0 GEOGRAPHY

##### 5.13.3.7.1 Name

location

##### 5.13.3.7.2 Type

🔹 GEOGRAPHY

##### 5.13.3.7.3 Is Required

❌ No

##### 5.13.3.7.4 Is Primary Key

❌ No

##### 5.13.3.7.5 Size

0

##### 5.13.3.7.6 Is Unique

❌ No

##### 5.13.3.7.7 Constraints

- POSTGIS_POINT_TYPE

##### 5.13.3.7.8 Precision

0

##### 5.13.3.7.9 Scale

0

##### 5.13.3.7.10 Is Foreign Key

❌ No

### 5.13.4.0.0 Primary Keys

- addressId

### 5.13.5.0.0 Unique Constraints

*No items available*

### 5.13.6.0.0 Indexes

- {'name': 'SP_Address_Location', 'columns': ['location'], 'type': 'GIST'}

## 5.14.0.0.0 ServiceCenter

### 5.14.1.0.0 Name

ServiceCenter

### 5.14.2.0.0 Description

Represents a service center that handles repairs.

### 5.14.3.0.0 Attributes

#### 5.14.3.1.0 UUID

##### 5.14.3.1.1 Name

serviceCenterId

##### 5.14.3.1.2 Type

🔹 UUID

##### 5.14.3.1.3 Is Required

✅ Yes

##### 5.14.3.1.4 Is Primary Key

✅ Yes

##### 5.14.3.1.5 Size

0

##### 5.14.3.1.6 Is Unique

✅ Yes

##### 5.14.3.1.7 Constraints

*No items available*

##### 5.14.3.1.8 Precision

0

##### 5.14.3.1.9 Scale

0

##### 5.14.3.1.10 Is Foreign Key

❌ No

#### 5.14.3.2.0 VARCHAR

##### 5.14.3.2.1 Name

name

##### 5.14.3.2.2 Type

🔹 VARCHAR

##### 5.14.3.2.3 Is Required

✅ Yes

##### 5.14.3.2.4 Is Primary Key

❌ No

##### 5.14.3.2.5 Size

200

##### 5.14.3.2.6 Is Unique

❌ No

##### 5.14.3.2.7 Constraints

*No items available*

##### 5.14.3.2.8 Precision

0

##### 5.14.3.2.9 Scale

0

##### 5.14.3.2.10 Is Foreign Key

❌ No

#### 5.14.3.3.0 UUID

##### 5.14.3.3.1 Name

addressId

##### 5.14.3.3.2 Type

🔹 UUID

##### 5.14.3.3.3 Is Required

✅ Yes

##### 5.14.3.3.4 Is Primary Key

❌ No

##### 5.14.3.3.5 Size

0

##### 5.14.3.3.6 Is Unique

✅ Yes

##### 5.14.3.3.7 Constraints

*No items available*

##### 5.14.3.3.8 Precision

0

##### 5.14.3.3.9 Scale

0

##### 5.14.3.3.10 Is Foreign Key

✅ Yes

#### 5.14.3.4.0 BOOLEAN

##### 5.14.3.4.1 Name

isDeleted

##### 5.14.3.4.2 Type

🔹 BOOLEAN

##### 5.14.3.4.3 Is Required

✅ Yes

##### 5.14.3.4.4 Is Primary Key

❌ No

##### 5.14.3.4.5 Size

0

##### 5.14.3.4.6 Is Unique

❌ No

##### 5.14.3.4.7 Constraints

- DEFAULT false

##### 5.14.3.4.8 Precision

0

##### 5.14.3.4.9 Scale

0

##### 5.14.3.4.10 Is Foreign Key

❌ No

#### 5.14.3.5.0 DateTime

##### 5.14.3.5.1 Name

createdAt

##### 5.14.3.5.2 Type

🔹 DateTime

##### 5.14.3.5.3 Is Required

✅ Yes

##### 5.14.3.5.4 Is Primary Key

❌ No

##### 5.14.3.5.5 Size

0

##### 5.14.3.5.6 Is Unique

❌ No

##### 5.14.3.5.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.14.3.5.8 Precision

0

##### 5.14.3.5.9 Scale

0

##### 5.14.3.5.10 Is Foreign Key

❌ No

#### 5.14.3.6.0 DateTime

##### 5.14.3.6.1 Name

updatedAt

##### 5.14.3.6.2 Type

🔹 DateTime

##### 5.14.3.6.3 Is Required

✅ Yes

##### 5.14.3.6.4 Is Primary Key

❌ No

##### 5.14.3.6.5 Size

0

##### 5.14.3.6.6 Is Unique

❌ No

##### 5.14.3.6.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.14.3.6.8 Precision

0

##### 5.14.3.6.9 Scale

0

##### 5.14.3.6.10 Is Foreign Key

❌ No

### 5.14.4.0.0 Primary Keys

- serviceCenterId

### 5.14.5.0.0 Unique Constraints

*No items available*

### 5.14.6.0.0 Indexes

*No items available*

## 5.15.0.0.0 ServiceCenterBrand

### 5.15.1.0.0 Name

ServiceCenterBrand

### 5.15.2.0.0 Description

Associates service centers with the brands they are authorized to service (Many-to-Many). (REQ-FUNC-002)

### 5.15.3.0.0 Attributes

#### 5.15.3.1.0 UUID

##### 5.15.3.1.1 Name

serviceCenterId

##### 5.15.3.1.2 Type

🔹 UUID

##### 5.15.3.1.3 Is Required

✅ Yes

##### 5.15.3.1.4 Is Primary Key

✅ Yes

##### 5.15.3.1.5 Size

0

##### 5.15.3.1.6 Is Unique

❌ No

##### 5.15.3.1.7 Constraints

*No items available*

##### 5.15.3.1.8 Precision

0

##### 5.15.3.1.9 Scale

0

##### 5.15.3.1.10 Is Foreign Key

✅ Yes

#### 5.15.3.2.0 UUID

##### 5.15.3.2.1 Name

brandId

##### 5.15.3.2.2 Type

🔹 UUID

##### 5.15.3.2.3 Is Required

✅ Yes

##### 5.15.3.2.4 Is Primary Key

✅ Yes

##### 5.15.3.2.5 Size

0

##### 5.15.3.2.6 Is Unique

❌ No

##### 5.15.3.2.7 Constraints

*No items available*

##### 5.15.3.2.8 Precision

0

##### 5.15.3.2.9 Scale

0

##### 5.15.3.2.10 Is Foreign Key

✅ Yes

### 5.15.4.0.0 Primary Keys

- serviceCenterId
- brandId

### 5.15.5.0.0 Unique Constraints

*No items available*

### 5.15.6.0.0 Indexes

- {'name': 'IX_ServiceCenterBrand_BrandId', 'columns': ['brandId'], 'type': 'BTree'}

## 5.16.0.0.0 ServiceAreaPolygon

### 5.16.1.0.0 Name

ServiceAreaPolygon

### 5.16.2.0.0 Description

Stores geofenced polygon data for a service center's area. (REQ-FUNC-002)

### 5.16.3.0.0 Attributes

#### 5.16.3.1.0 UUID

##### 5.16.3.1.1 Name

serviceAreaPolygonId

##### 5.16.3.1.2 Type

🔹 UUID

##### 5.16.3.1.3 Is Required

✅ Yes

##### 5.16.3.1.4 Is Primary Key

✅ Yes

##### 5.16.3.1.5 Size

0

##### 5.16.3.1.6 Is Unique

✅ Yes

##### 5.16.3.1.7 Constraints

*No items available*

##### 5.16.3.1.8 Precision

0

##### 5.16.3.1.9 Scale

0

##### 5.16.3.1.10 Is Foreign Key

❌ No

#### 5.16.3.2.0 UUID

##### 5.16.3.2.1 Name

serviceCenterId

##### 5.16.3.2.2 Type

🔹 UUID

##### 5.16.3.2.3 Is Required

✅ Yes

##### 5.16.3.2.4 Is Primary Key

❌ No

##### 5.16.3.2.5 Size

0

##### 5.16.3.2.6 Is Unique

❌ No

##### 5.16.3.2.7 Constraints

*No items available*

##### 5.16.3.2.8 Precision

0

##### 5.16.3.2.9 Scale

0

##### 5.16.3.2.10 Is Foreign Key

✅ Yes

#### 5.16.3.3.0 UUID

##### 5.16.3.3.1 Name

brandId

##### 5.16.3.3.2 Type

🔹 UUID

##### 5.16.3.3.3 Is Required

✅ Yes

##### 5.16.3.3.4 Is Primary Key

❌ No

##### 5.16.3.3.5 Size

0

##### 5.16.3.3.6 Is Unique

❌ No

##### 5.16.3.3.7 Constraints

*No items available*

##### 5.16.3.3.8 Precision

0

##### 5.16.3.3.9 Scale

0

##### 5.16.3.3.10 Is Foreign Key

✅ Yes

#### 5.16.3.4.0 GEOMETRY

##### 5.16.3.4.1 Name

polygonData

##### 5.16.3.4.2 Type

🔹 GEOMETRY

##### 5.16.3.4.3 Is Required

✅ Yes

##### 5.16.3.4.4 Is Primary Key

❌ No

##### 5.16.3.4.5 Size

0

##### 5.16.3.4.6 Is Unique

❌ No

##### 5.16.3.4.7 Constraints

- POSTGIS_POLYGON_TYPE

##### 5.16.3.4.8 Precision

0

##### 5.16.3.4.9 Scale

0

##### 5.16.3.4.10 Is Foreign Key

❌ No

### 5.16.4.0.0 Primary Keys

- serviceAreaPolygonId

### 5.16.5.0.0 Unique Constraints

*No items available*

### 5.16.6.0.0 Indexes

#### 5.16.6.1.0 BTree

##### 5.16.6.1.1 Name

IX_ServiceAreaPolygon_ServiceCenter_Brand

##### 5.16.6.1.2 Columns

- serviceCenterId
- brandId

##### 5.16.6.1.3 Type

🔹 BTree

#### 5.16.6.2.0 GIST

##### 5.16.6.2.1 Name

SP_ServiceAreaPolygon_PolygonData

##### 5.16.6.2.2 Columns

- polygonData

##### 5.16.6.2.3 Type

🔹 GIST

## 5.17.0.0.0 ServiceAreaPostalCode

### 5.17.1.0.0 Name

ServiceAreaPostalCode

### 5.17.2.0.0 Description

Stores postal codes for a service center's area. (REQ-FUNC-002)

### 5.17.3.0.0 Attributes

#### 5.17.3.1.0 UUID

##### 5.17.3.1.1 Name

serviceAreaPostalCodeId

##### 5.17.3.1.2 Type

🔹 UUID

##### 5.17.3.1.3 Is Required

✅ Yes

##### 5.17.3.1.4 Is Primary Key

✅ Yes

##### 5.17.3.1.5 Size

0

##### 5.17.3.1.6 Is Unique

✅ Yes

##### 5.17.3.1.7 Constraints

*No items available*

##### 5.17.3.1.8 Precision

0

##### 5.17.3.1.9 Scale

0

##### 5.17.3.1.10 Is Foreign Key

❌ No

#### 5.17.3.2.0 UUID

##### 5.17.3.2.1 Name

serviceCenterId

##### 5.17.3.2.2 Type

🔹 UUID

##### 5.17.3.2.3 Is Required

✅ Yes

##### 5.17.3.2.4 Is Primary Key

❌ No

##### 5.17.3.2.5 Size

0

##### 5.17.3.2.6 Is Unique

❌ No

##### 5.17.3.2.7 Constraints

*No items available*

##### 5.17.3.2.8 Precision

0

##### 5.17.3.2.9 Scale

0

##### 5.17.3.2.10 Is Foreign Key

✅ Yes

#### 5.17.3.3.0 UUID

##### 5.17.3.3.1 Name

brandId

##### 5.17.3.3.2 Type

🔹 UUID

##### 5.17.3.3.3 Is Required

✅ Yes

##### 5.17.3.3.4 Is Primary Key

❌ No

##### 5.17.3.3.5 Size

0

##### 5.17.3.3.6 Is Unique

❌ No

##### 5.17.3.3.7 Constraints

*No items available*

##### 5.17.3.3.8 Precision

0

##### 5.17.3.3.9 Scale

0

##### 5.17.3.3.10 Is Foreign Key

✅ Yes

#### 5.17.3.4.0 VARCHAR

##### 5.17.3.4.1 Name

postalCode

##### 5.17.3.4.2 Type

🔹 VARCHAR

##### 5.17.3.4.3 Is Required

✅ Yes

##### 5.17.3.4.4 Is Primary Key

❌ No

##### 5.17.3.4.5 Size

20

##### 5.17.3.4.6 Is Unique

❌ No

##### 5.17.3.4.7 Constraints

*No items available*

##### 5.17.3.4.8 Precision

0

##### 5.17.3.4.9 Scale

0

##### 5.17.3.4.10 Is Foreign Key

❌ No

### 5.17.4.0.0 Primary Keys

- serviceAreaPostalCodeId

### 5.17.5.0.0 Unique Constraints

- {'name': 'UC_ServiceArea_ServiceCenter_Brand_PostalCode', 'columns': ['serviceCenterId', 'brandId', 'postalCode']}

### 5.17.6.0.0 Indexes

- {'name': 'IX_ServiceAreaPostalCode_PostalCode', 'columns': ['postalCode'], 'type': 'BTree'}

## 5.18.0.0.0 IssueType

### 5.18.1.0.0 Name

IssueType

### 5.18.2.0.0 Description

A lookup table for common issue types. Can be global or specific to a Brand/Product Category. (REQ-FUNC-011)

### 5.18.3.0.0 Attributes

#### 5.18.3.1.0 UUID

##### 5.18.3.1.1 Name

issueTypeId

##### 5.18.3.1.2 Type

🔹 UUID

##### 5.18.3.1.3 Is Required

✅ Yes

##### 5.18.3.1.4 Is Primary Key

✅ Yes

##### 5.18.3.1.5 Size

0

##### 5.18.3.1.6 Is Unique

✅ Yes

##### 5.18.3.1.7 Constraints

*No items available*

##### 5.18.3.1.8 Precision

0

##### 5.18.3.1.9 Scale

0

##### 5.18.3.1.10 Is Foreign Key

❌ No

#### 5.18.3.2.0 UUID

##### 5.18.3.2.1 Name

brandId

##### 5.18.3.2.2 Type

🔹 UUID

##### 5.18.3.2.3 Is Required

❌ No

##### 5.18.3.2.4 Is Primary Key

❌ No

##### 5.18.3.2.5 Size

0

##### 5.18.3.2.6 Is Unique

❌ No

##### 5.18.3.2.7 Constraints

*No items available*

##### 5.18.3.2.8 Precision

0

##### 5.18.3.2.9 Scale

0

##### 5.18.3.2.10 Is Foreign Key

✅ Yes

#### 5.18.3.3.0 UUID

##### 5.18.3.3.1 Name

productCategoryId

##### 5.18.3.3.2 Type

🔹 UUID

##### 5.18.3.3.3 Is Required

❌ No

##### 5.18.3.3.4 Is Primary Key

❌ No

##### 5.18.3.3.5 Size

0

##### 5.18.3.3.6 Is Unique

❌ No

##### 5.18.3.3.7 Constraints

*No items available*

##### 5.18.3.3.8 Precision

0

##### 5.18.3.3.9 Scale

0

##### 5.18.3.3.10 Is Foreign Key

✅ Yes

#### 5.18.3.4.0 VARCHAR

##### 5.18.3.4.1 Name

issueDescription

##### 5.18.3.4.2 Type

🔹 VARCHAR

##### 5.18.3.4.3 Is Required

✅ Yes

##### 5.18.3.4.4 Is Primary Key

❌ No

##### 5.18.3.4.5 Size

255

##### 5.18.3.4.6 Is Unique

❌ No

##### 5.18.3.4.7 Constraints

*No items available*

##### 5.18.3.4.8 Precision

0

##### 5.18.3.4.9 Scale

0

##### 5.18.3.4.10 Is Foreign Key

❌ No

#### 5.18.3.5.0 BOOLEAN

##### 5.18.3.5.1 Name

isActive

##### 5.18.3.5.2 Type

🔹 BOOLEAN

##### 5.18.3.5.3 Is Required

✅ Yes

##### 5.18.3.5.4 Is Primary Key

❌ No

##### 5.18.3.5.5 Size

0

##### 5.18.3.5.6 Is Unique

❌ No

##### 5.18.3.5.7 Constraints

- DEFAULT true

##### 5.18.3.5.8 Precision

0

##### 5.18.3.5.9 Scale

0

##### 5.18.3.5.10 Is Foreign Key

❌ No

### 5.18.4.0.0 Primary Keys

- issueTypeId

### 5.18.5.0.0 Unique Constraints

- {'name': 'UC_IssueType_Brand_Category_Description', 'columns': ['brandId', 'productCategoryId', 'issueDescription']}

### 5.18.6.0.0 Indexes

*No items available*

## 5.19.0.0.0 ServiceRequest

### 5.19.1.0.0 Name

ServiceRequest

### 5.19.2.0.0 Description

Represents a single service request ticket. (REQ-FUNC-007, REQ-FUNC-008)

### 5.19.3.0.0 Attributes

#### 5.19.3.1.0 UUID

##### 5.19.3.1.1 Name

serviceRequestId

##### 5.19.3.1.2 Type

🔹 UUID

##### 5.19.3.1.3 Is Required

✅ Yes

##### 5.19.3.1.4 Is Primary Key

✅ Yes

##### 5.19.3.1.5 Size

0

##### 5.19.3.1.6 Is Unique

✅ Yes

##### 5.19.3.1.7 Constraints

*No items available*

##### 5.19.3.1.8 Precision

0

##### 5.19.3.1.9 Scale

0

##### 5.19.3.1.10 Is Foreign Key

❌ No

#### 5.19.3.2.0 UUID

##### 5.19.3.2.1 Name

userProductId

##### 5.19.3.2.2 Type

🔹 UUID

##### 5.19.3.2.3 Is Required

✅ Yes

##### 5.19.3.2.4 Is Primary Key

❌ No

##### 5.19.3.2.5 Size

0

##### 5.19.3.2.6 Is Unique

❌ No

##### 5.19.3.2.7 Constraints

*No items available*

##### 5.19.3.2.8 Precision

0

##### 5.19.3.2.9 Scale

0

##### 5.19.3.2.10 Is Foreign Key

✅ Yes

#### 5.19.3.3.0 UUID

##### 5.19.3.3.1 Name

serviceCenterId

##### 5.19.3.3.2 Type

🔹 UUID

##### 5.19.3.3.3 Is Required

✅ Yes

##### 5.19.3.3.4 Is Primary Key

❌ No

##### 5.19.3.3.5 Size

0

##### 5.19.3.3.6 Is Unique

❌ No

##### 5.19.3.3.7 Constraints

*No items available*

##### 5.19.3.3.8 Precision

0

##### 5.19.3.3.9 Scale

0

##### 5.19.3.3.10 Is Foreign Key

✅ Yes

#### 5.19.3.4.0 UUID

##### 5.19.3.4.1 Name

assignedTechnicianId

##### 5.19.3.4.2 Type

🔹 UUID

##### 5.19.3.4.3 Is Required

❌ No

##### 5.19.3.4.4 Is Primary Key

❌ No

##### 5.19.3.4.5 Size

0

##### 5.19.3.4.6 Is Unique

❌ No

##### 5.19.3.4.7 Constraints

*No items available*

##### 5.19.3.4.8 Precision

0

##### 5.19.3.4.9 Scale

0

##### 5.19.3.4.10 Is Foreign Key

✅ Yes

#### 5.19.3.5.0 UUID

##### 5.19.3.5.1 Name

issueTypeId

##### 5.19.3.5.2 Type

🔹 UUID

##### 5.19.3.5.3 Is Required

✅ Yes

##### 5.19.3.5.4 Is Primary Key

❌ No

##### 5.19.3.5.5 Size

0

##### 5.19.3.5.6 Is Unique

❌ No

##### 5.19.3.5.7 Constraints

*No items available*

##### 5.19.3.5.8 Precision

0

##### 5.19.3.5.9 Scale

0

##### 5.19.3.5.10 Is Foreign Key

✅ Yes

#### 5.19.3.6.0 TEXT

##### 5.19.3.6.1 Name

issueDescription

##### 5.19.3.6.2 Type

🔹 TEXT

##### 5.19.3.6.3 Is Required

❌ No

##### 5.19.3.6.4 Is Primary Key

❌ No

##### 5.19.3.6.5 Size

0

##### 5.19.3.6.6 Is Unique

❌ No

##### 5.19.3.6.7 Constraints

*No items available*

##### 5.19.3.6.8 Precision

0

##### 5.19.3.6.9 Scale

0

##### 5.19.3.6.10 Is Foreign Key

❌ No

#### 5.19.3.7.0 UUID

##### 5.19.3.7.1 Name

contactAddressId

##### 5.19.3.7.2 Type

🔹 UUID

##### 5.19.3.7.3 Is Required

✅ Yes

##### 5.19.3.7.4 Is Primary Key

❌ No

##### 5.19.3.7.5 Size

0

##### 5.19.3.7.6 Is Unique

❌ No

##### 5.19.3.7.7 Constraints

*No items available*

##### 5.19.3.7.8 Precision

0

##### 5.19.3.7.9 Scale

0

##### 5.19.3.7.10 Is Foreign Key

✅ Yes

#### 5.19.3.8.0 DateTime

##### 5.19.3.8.1 Name

preferredVisitSlotStart

##### 5.19.3.8.2 Type

🔹 DateTime

##### 5.19.3.8.3 Is Required

❌ No

##### 5.19.3.8.4 Is Primary Key

❌ No

##### 5.19.3.8.5 Size

0

##### 5.19.3.8.6 Is Unique

❌ No

##### 5.19.3.8.7 Constraints

*No items available*

##### 5.19.3.8.8 Precision

0

##### 5.19.3.8.9 Scale

0

##### 5.19.3.8.10 Is Foreign Key

❌ No

#### 5.19.3.9.0 DateTime

##### 5.19.3.9.1 Name

preferredVisitSlotEnd

##### 5.19.3.9.2 Type

🔹 DateTime

##### 5.19.3.9.3 Is Required

❌ No

##### 5.19.3.9.4 Is Primary Key

❌ No

##### 5.19.3.9.5 Size

0

##### 5.19.3.9.6 Is Unique

❌ No

##### 5.19.3.9.7 Constraints

*No items available*

##### 5.19.3.9.8 Precision

0

##### 5.19.3.9.9 Scale

0

##### 5.19.3.9.10 Is Foreign Key

❌ No

#### 5.19.3.10.0 VARCHAR

##### 5.19.3.10.1 Name

status

##### 5.19.3.10.2 Type

🔹 VARCHAR

##### 5.19.3.10.3 Is Required

✅ Yes

##### 5.19.3.10.4 Is Primary Key

❌ No

##### 5.19.3.10.5 Size

30

##### 5.19.3.10.6 Is Unique

❌ No

##### 5.19.3.10.7 Constraints

- ENUM('Created', 'Acknowledged', 'TechnicianAssigned', 'InProgress', 'Resolved', 'Disputed', 'Closed', 'Cancelled')
- DEFAULT 'Created'

##### 5.19.3.10.8 Precision

0

##### 5.19.3.10.9 Scale

0

##### 5.19.3.10.10 Is Foreign Key

❌ No

#### 5.19.3.11.0 DateTime

##### 5.19.3.11.1 Name

resolvedAt

##### 5.19.3.11.2 Type

🔹 DateTime

##### 5.19.3.11.3 Is Required

❌ No

##### 5.19.3.11.4 Is Primary Key

❌ No

##### 5.19.3.11.5 Size

0

##### 5.19.3.11.6 Is Unique

❌ No

##### 5.19.3.11.7 Constraints

*No items available*

##### 5.19.3.11.8 Precision

0

##### 5.19.3.11.9 Scale

0

##### 5.19.3.11.10 Is Foreign Key

❌ No

#### 5.19.3.12.0 UUID

##### 5.19.3.12.1 Name

brandId

##### 5.19.3.12.2 Type

🔹 UUID

##### 5.19.3.12.3 Is Required

✅ Yes

##### 5.19.3.12.4 Is Primary Key

❌ No

##### 5.19.3.12.5 Size

0

##### 5.19.3.12.6 Is Unique

❌ No

##### 5.19.3.12.7 Constraints

*No items available*

##### 5.19.3.12.8 Precision

0

##### 5.19.3.12.9 Scale

0

##### 5.19.3.12.10 Is Foreign Key

✅ Yes

#### 5.19.3.13.0 UUID

##### 5.19.3.13.1 Name

productModelId

##### 5.19.3.13.2 Type

🔹 UUID

##### 5.19.3.13.3 Is Required

✅ Yes

##### 5.19.3.13.4 Is Primary Key

❌ No

##### 5.19.3.13.5 Size

0

##### 5.19.3.13.6 Is Unique

❌ No

##### 5.19.3.13.7 Constraints

*No items available*

##### 5.19.3.13.8 Precision

0

##### 5.19.3.13.9 Scale

0

##### 5.19.3.13.10 Is Foreign Key

✅ Yes

#### 5.19.3.14.0 BOOLEAN

##### 5.19.3.14.1 Name

isDeleted

##### 5.19.3.14.2 Type

🔹 BOOLEAN

##### 5.19.3.14.3 Is Required

✅ Yes

##### 5.19.3.14.4 Is Primary Key

❌ No

##### 5.19.3.14.5 Size

0

##### 5.19.3.14.6 Is Unique

❌ No

##### 5.19.3.14.7 Constraints

- DEFAULT false

##### 5.19.3.14.8 Precision

0

##### 5.19.3.14.9 Scale

0

##### 5.19.3.14.10 Is Foreign Key

❌ No

#### 5.19.3.15.0 DateTime

##### 5.19.3.15.1 Name

createdAt

##### 5.19.3.15.2 Type

🔹 DateTime

##### 5.19.3.15.3 Is Required

✅ Yes

##### 5.19.3.15.4 Is Primary Key

❌ No

##### 5.19.3.15.5 Size

0

##### 5.19.3.15.6 Is Unique

❌ No

##### 5.19.3.15.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.19.3.15.8 Precision

0

##### 5.19.3.15.9 Scale

0

##### 5.19.3.15.10 Is Foreign Key

❌ No

#### 5.19.3.16.0 DateTime

##### 5.19.3.16.1 Name

updatedAt

##### 5.19.3.16.2 Type

🔹 DateTime

##### 5.19.3.16.3 Is Required

✅ Yes

##### 5.19.3.16.4 Is Primary Key

❌ No

##### 5.19.3.16.5 Size

0

##### 5.19.3.16.6 Is Unique

❌ No

##### 5.19.3.16.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.19.3.16.8 Precision

0

##### 5.19.3.16.9 Scale

0

##### 5.19.3.16.10 Is Foreign Key

❌ No

### 5.19.4.0.0 Primary Keys

- serviceRequestId

### 5.19.5.0.0 Unique Constraints

*No items available*

### 5.19.6.0.0 Indexes

#### 5.19.6.1.0 BTree

##### 5.19.6.1.1 Name

IX_ServiceRequest_UserProduct

##### 5.19.6.1.2 Columns

- userProductId

##### 5.19.6.1.3 Type

🔹 BTree

#### 5.19.6.2.0 BTree

##### 5.19.6.2.1 Name

IX_ServiceRequest_ServiceCenter

##### 5.19.6.2.2 Columns

- serviceCenterId

##### 5.19.6.2.3 Type

🔹 BTree

#### 5.19.6.3.0 BTree

##### 5.19.6.3.1 Name

IX_ServiceRequest_Technician

##### 5.19.6.3.2 Columns

- assignedTechnicianId

##### 5.19.6.3.3 Type

🔹 BTree

#### 5.19.6.4.0 BTree

##### 5.19.6.4.1 Name

IX_ServiceRequest_Status_Date

##### 5.19.6.4.2 Columns

- status
- createdAt

##### 5.19.6.4.3 Type

🔹 BTree

#### 5.19.6.5.0 BTree

##### 5.19.6.5.1 Name

IX_ServiceRequest_BrandId

##### 5.19.6.5.2 Columns

- brandId

##### 5.19.6.5.3 Type

🔹 BTree

#### 5.19.6.6.0 BTree

##### 5.19.6.6.1 Name

IX_ServiceRequest_ProductModelId

##### 5.19.6.6.2 Columns

- productModelId

##### 5.19.6.6.3 Type

🔹 BTree

## 5.20.0.0.0 ServiceRequestMedia

### 5.20.1.0.0 Name

ServiceRequestMedia

### 5.20.2.0.0 Description

Stores links to photos or videos uploaded for a service request. (REQ-FUNC-3.4)

### 5.20.3.0.0 Attributes

#### 5.20.3.1.0 UUID

##### 5.20.3.1.1 Name

serviceRequestMediaId

##### 5.20.3.1.2 Type

🔹 UUID

##### 5.20.3.1.3 Is Required

✅ Yes

##### 5.20.3.1.4 Is Primary Key

✅ Yes

##### 5.20.3.1.5 Size

0

##### 5.20.3.1.6 Is Unique

✅ Yes

##### 5.20.3.1.7 Constraints

*No items available*

##### 5.20.3.1.8 Precision

0

##### 5.20.3.1.9 Scale

0

##### 5.20.3.1.10 Is Foreign Key

❌ No

#### 5.20.3.2.0 UUID

##### 5.20.3.2.1 Name

serviceRequestId

##### 5.20.3.2.2 Type

🔹 UUID

##### 5.20.3.2.3 Is Required

✅ Yes

##### 5.20.3.2.4 Is Primary Key

❌ No

##### 5.20.3.2.5 Size

0

##### 5.20.3.2.6 Is Unique

❌ No

##### 5.20.3.2.7 Constraints

*No items available*

##### 5.20.3.2.8 Precision

0

##### 5.20.3.2.9 Scale

0

##### 5.20.3.2.10 Is Foreign Key

✅ Yes

#### 5.20.3.3.0 VARCHAR

##### 5.20.3.3.1 Name

mediaUrl

##### 5.20.3.3.2 Type

🔹 VARCHAR

##### 5.20.3.3.3 Is Required

✅ Yes

##### 5.20.3.3.4 Is Primary Key

❌ No

##### 5.20.3.3.5 Size

512

##### 5.20.3.3.6 Is Unique

❌ No

##### 5.20.3.3.7 Constraints

*No items available*

##### 5.20.3.3.8 Precision

0

##### 5.20.3.3.9 Scale

0

##### 5.20.3.3.10 Is Foreign Key

❌ No

#### 5.20.3.4.0 VARCHAR

##### 5.20.3.4.1 Name

mediaType

##### 5.20.3.4.2 Type

🔹 VARCHAR

##### 5.20.3.4.3 Is Required

✅ Yes

##### 5.20.3.4.4 Is Primary Key

❌ No

##### 5.20.3.4.5 Size

10

##### 5.20.3.4.6 Is Unique

❌ No

##### 5.20.3.4.7 Constraints

- ENUM('Image', 'Video')

##### 5.20.3.4.8 Precision

0

##### 5.20.3.4.9 Scale

0

##### 5.20.3.4.10 Is Foreign Key

❌ No

### 5.20.4.0.0 Primary Keys

- serviceRequestMediaId

### 5.20.5.0.0 Unique Constraints

*No items available*

### 5.20.6.0.0 Indexes

- {'name': 'IX_ServiceRequestMedia_ServiceRequestId', 'columns': ['serviceRequestId'], 'type': 'BTree'}

## 5.21.0.0.0 CustomerSignature

### 5.21.1.0.0 Name

CustomerSignature

### 5.21.2.0.0 Description

Stores the customer's digital signature as proof of completion. (REQ-FUNC-010)

### 5.21.3.0.0 Attributes

#### 5.21.3.1.0 UUID

##### 5.21.3.1.1 Name

signatureId

##### 5.21.3.1.2 Type

🔹 UUID

##### 5.21.3.1.3 Is Required

✅ Yes

##### 5.21.3.1.4 Is Primary Key

✅ Yes

##### 5.21.3.1.5 Size

0

##### 5.21.3.1.6 Is Unique

✅ Yes

##### 5.21.3.1.7 Constraints

*No items available*

##### 5.21.3.1.8 Precision

0

##### 5.21.3.1.9 Scale

0

##### 5.21.3.1.10 Is Foreign Key

❌ No

#### 5.21.3.2.0 UUID

##### 5.21.3.2.1 Name

serviceRequestId

##### 5.21.3.2.2 Type

🔹 UUID

##### 5.21.3.2.3 Is Required

✅ Yes

##### 5.21.3.2.4 Is Primary Key

❌ No

##### 5.21.3.2.5 Size

0

##### 5.21.3.2.6 Is Unique

✅ Yes

##### 5.21.3.2.7 Constraints

*No items available*

##### 5.21.3.2.8 Precision

0

##### 5.21.3.2.9 Scale

0

##### 5.21.3.2.10 Is Foreign Key

✅ Yes

#### 5.21.3.3.0 VARCHAR

##### 5.21.3.3.1 Name

imageUrl

##### 5.21.3.3.2 Type

🔹 VARCHAR

##### 5.21.3.3.3 Is Required

✅ Yes

##### 5.21.3.3.4 Is Primary Key

❌ No

##### 5.21.3.3.5 Size

512

##### 5.21.3.3.6 Is Unique

❌ No

##### 5.21.3.3.7 Constraints

*No items available*

##### 5.21.3.3.8 Precision

0

##### 5.21.3.3.9 Scale

0

##### 5.21.3.3.10 Is Foreign Key

❌ No

#### 5.21.3.4.0 DateTime

##### 5.21.3.4.1 Name

signedAt

##### 5.21.3.4.2 Type

🔹 DateTime

##### 5.21.3.4.3 Is Required

✅ Yes

##### 5.21.3.4.4 Is Primary Key

❌ No

##### 5.21.3.4.5 Size

0

##### 5.21.3.4.6 Is Unique

❌ No

##### 5.21.3.4.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.21.3.4.8 Precision

0

##### 5.21.3.4.9 Scale

0

##### 5.21.3.4.10 Is Foreign Key

❌ No

### 5.21.4.0.0 Primary Keys

- signatureId

### 5.21.5.0.0 Unique Constraints

- {'name': 'UC_CustomerSignature_ServiceRequestId', 'columns': ['serviceRequestId']}

### 5.21.6.0.0 Indexes

*No items available*

## 5.22.0.0.0 ServiceRating

### 5.22.1.0.0 Name

ServiceRating

### 5.22.2.0.0 Description

Stores customer ratings and feedback for a completed service request. (REQ-FUNC-3.4)

### 5.22.3.0.0 Attributes

#### 5.22.3.1.0 UUID

##### 5.22.3.1.1 Name

serviceRatingId

##### 5.22.3.1.2 Type

🔹 UUID

##### 5.22.3.1.3 Is Required

✅ Yes

##### 5.22.3.1.4 Is Primary Key

✅ Yes

##### 5.22.3.1.5 Size

0

##### 5.22.3.1.6 Is Unique

✅ Yes

##### 5.22.3.1.7 Constraints

*No items available*

##### 5.22.3.1.8 Precision

0

##### 5.22.3.1.9 Scale

0

##### 5.22.3.1.10 Is Foreign Key

❌ No

#### 5.22.3.2.0 UUID

##### 5.22.3.2.1 Name

serviceRequestId

##### 5.22.3.2.2 Type

🔹 UUID

##### 5.22.3.2.3 Is Required

✅ Yes

##### 5.22.3.2.4 Is Primary Key

❌ No

##### 5.22.3.2.5 Size

0

##### 5.22.3.2.6 Is Unique

✅ Yes

##### 5.22.3.2.7 Constraints

*No items available*

##### 5.22.3.2.8 Precision

0

##### 5.22.3.2.9 Scale

0

##### 5.22.3.2.10 Is Foreign Key

✅ Yes

#### 5.22.3.3.0 SMALLINT

##### 5.22.3.3.1 Name

rating

##### 5.22.3.3.2 Type

🔹 SMALLINT

##### 5.22.3.3.3 Is Required

✅ Yes

##### 5.22.3.3.4 Is Primary Key

❌ No

##### 5.22.3.3.5 Size

0

##### 5.22.3.3.6 Is Unique

❌ No

##### 5.22.3.3.7 Constraints

- CHECK (rating BETWEEN 1 AND 5)

##### 5.22.3.3.8 Precision

0

##### 5.22.3.3.9 Scale

0

##### 5.22.3.3.10 Is Foreign Key

❌ No

#### 5.22.3.4.0 TEXT

##### 5.22.3.4.1 Name

feedback

##### 5.22.3.4.2 Type

🔹 TEXT

##### 5.22.3.4.3 Is Required

❌ No

##### 5.22.3.4.4 Is Primary Key

❌ No

##### 5.22.3.4.5 Size

0

##### 5.22.3.4.6 Is Unique

❌ No

##### 5.22.3.4.7 Constraints

*No items available*

##### 5.22.3.4.8 Precision

0

##### 5.22.3.4.9 Scale

0

##### 5.22.3.4.10 Is Foreign Key

❌ No

#### 5.22.3.5.0 DateTime

##### 5.22.3.5.1 Name

createdAt

##### 5.22.3.5.2 Type

🔹 DateTime

##### 5.22.3.5.3 Is Required

✅ Yes

##### 5.22.3.5.4 Is Primary Key

❌ No

##### 5.22.3.5.5 Size

0

##### 5.22.3.5.6 Is Unique

❌ No

##### 5.22.3.5.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.22.3.5.8 Precision

0

##### 5.22.3.5.9 Scale

0

##### 5.22.3.5.10 Is Foreign Key

❌ No

### 5.22.4.0.0 Primary Keys

- serviceRatingId

### 5.22.5.0.0 Unique Constraints

- {'name': 'UC_ServiceRating_ServiceRequestId', 'columns': ['serviceRequestId']}

### 5.22.6.0.0 Indexes

*No items available*

## 5.23.0.0.0 Skill

### 5.23.1.0.0 Name

Skill

### 5.23.2.0.0 Description

A lookup table for technician skills and certifications. (REQ-FUNC-3.5)

### 5.23.3.0.0 Attributes

#### 5.23.3.1.0 UUID

##### 5.23.3.1.1 Name

skillId

##### 5.23.3.1.2 Type

🔹 UUID

##### 5.23.3.1.3 Is Required

✅ Yes

##### 5.23.3.1.4 Is Primary Key

✅ Yes

##### 5.23.3.1.5 Size

0

##### 5.23.3.1.6 Is Unique

✅ Yes

##### 5.23.3.1.7 Constraints

*No items available*

##### 5.23.3.1.8 Precision

0

##### 5.23.3.1.9 Scale

0

##### 5.23.3.1.10 Is Foreign Key

❌ No

#### 5.23.3.2.0 VARCHAR

##### 5.23.3.2.1 Name

skillName

##### 5.23.3.2.2 Type

🔹 VARCHAR

##### 5.23.3.2.3 Is Required

✅ Yes

##### 5.23.3.2.4 Is Primary Key

❌ No

##### 5.23.3.2.5 Size

100

##### 5.23.3.2.6 Is Unique

✅ Yes

##### 5.23.3.2.7 Constraints

*No items available*

##### 5.23.3.2.8 Precision

0

##### 5.23.3.2.9 Scale

0

##### 5.23.3.2.10 Is Foreign Key

❌ No

### 5.23.4.0.0 Primary Keys

- skillId

### 5.23.5.0.0 Unique Constraints

- {'name': 'UC_Skill_SkillName', 'columns': ['skillName']}

### 5.23.6.0.0 Indexes

*No items available*

## 5.24.0.0.0 TechnicianSkill

### 5.24.1.0.0 Name

TechnicianSkill

### 5.24.2.0.0 Description

Associates technicians with their skills (Many-to-Many). (REQ-FUNC-3.5)

### 5.24.3.0.0 Attributes

#### 5.24.3.1.0 UUID

##### 5.24.3.1.1 Name

technicianId

##### 5.24.3.1.2 Type

🔹 UUID

##### 5.24.3.1.3 Is Required

✅ Yes

##### 5.24.3.1.4 Is Primary Key

✅ Yes

##### 5.24.3.1.5 Size

0

##### 5.24.3.1.6 Is Unique

❌ No

##### 5.24.3.1.7 Constraints

*No items available*

##### 5.24.3.1.8 Precision

0

##### 5.24.3.1.9 Scale

0

##### 5.24.3.1.10 Is Foreign Key

✅ Yes

#### 5.24.3.2.0 UUID

##### 5.24.3.2.1 Name

skillId

##### 5.24.3.2.2 Type

🔹 UUID

##### 5.24.3.2.3 Is Required

✅ Yes

##### 5.24.3.2.4 Is Primary Key

✅ Yes

##### 5.24.3.2.5 Size

0

##### 5.24.3.2.6 Is Unique

❌ No

##### 5.24.3.2.7 Constraints

*No items available*

##### 5.24.3.2.8 Precision

0

##### 5.24.3.2.9 Scale

0

##### 5.24.3.2.10 Is Foreign Key

✅ Yes

### 5.24.4.0.0 Primary Keys

- technicianId
- skillId

### 5.24.5.0.0 Unique Constraints

*No items available*

### 5.24.6.0.0 Indexes

- {'name': 'IX_TechnicianSkill_SkillId', 'columns': ['skillId'], 'type': 'BTree'}

## 5.25.0.0.0 MaintenanceReminder

### 5.25.1.0.0 Name

MaintenanceReminder

### 5.25.2.0.0 Description

Stores user-defined recurring service reminders for products. (REQ-ALERT-6.1)

### 5.25.3.0.0 Attributes

#### 5.25.3.1.0 UUID

##### 5.25.3.1.1 Name

reminderId

##### 5.25.3.1.2 Type

🔹 UUID

##### 5.25.3.1.3 Is Required

✅ Yes

##### 5.25.3.1.4 Is Primary Key

✅ Yes

##### 5.25.3.1.5 Size

0

##### 5.25.3.1.6 Is Unique

✅ Yes

##### 5.25.3.1.7 Constraints

*No items available*

##### 5.25.3.1.8 Precision

0

##### 5.25.3.1.9 Scale

0

##### 5.25.3.1.10 Is Foreign Key

❌ No

#### 5.25.3.2.0 UUID

##### 5.25.3.2.1 Name

userProductId

##### 5.25.3.2.2 Type

🔹 UUID

##### 5.25.3.2.3 Is Required

✅ Yes

##### 5.25.3.2.4 Is Primary Key

❌ No

##### 5.25.3.2.5 Size

0

##### 5.25.3.2.6 Is Unique

❌ No

##### 5.25.3.2.7 Constraints

*No items available*

##### 5.25.3.2.8 Precision

0

##### 5.25.3.2.9 Scale

0

##### 5.25.3.2.10 Is Foreign Key

✅ Yes

#### 5.25.3.3.0 VARCHAR

##### 5.25.3.3.1 Name

reminderTitle

##### 5.25.3.3.2 Type

🔹 VARCHAR

##### 5.25.3.3.3 Is Required

✅ Yes

##### 5.25.3.3.4 Is Primary Key

❌ No

##### 5.25.3.3.5 Size

200

##### 5.25.3.3.6 Is Unique

❌ No

##### 5.25.3.3.7 Constraints

*No items available*

##### 5.25.3.3.8 Precision

0

##### 5.25.3.3.9 Scale

0

##### 5.25.3.3.10 Is Foreign Key

❌ No

#### 5.25.3.4.0 VARCHAR

##### 5.25.3.4.1 Name

recurrenceRule

##### 5.25.3.4.2 Type

🔹 VARCHAR

##### 5.25.3.4.3 Is Required

✅ Yes

##### 5.25.3.4.4 Is Primary Key

❌ No

##### 5.25.3.4.5 Size

100

##### 5.25.3.4.6 Is Unique

❌ No

##### 5.25.3.4.7 Constraints

*No items available*

##### 5.25.3.4.8 Precision

0

##### 5.25.3.4.9 Scale

0

##### 5.25.3.4.10 Is Foreign Key

❌ No

#### 5.25.3.5.0 DATE

##### 5.25.3.5.1 Name

nextDueDate

##### 5.25.3.5.2 Type

🔹 DATE

##### 5.25.3.5.3 Is Required

✅ Yes

##### 5.25.3.5.4 Is Primary Key

❌ No

##### 5.25.3.5.5 Size

0

##### 5.25.3.5.6 Is Unique

❌ No

##### 5.25.3.5.7 Constraints

*No items available*

##### 5.25.3.5.8 Precision

0

##### 5.25.3.5.9 Scale

0

##### 5.25.3.5.10 Is Foreign Key

❌ No

### 5.25.4.0.0 Primary Keys

- reminderId

### 5.25.5.0.0 Unique Constraints

*No items available*

### 5.25.6.0.0 Indexes

- {'name': 'IX_MaintenanceReminder_NextDueDate', 'columns': ['nextDueDate'], 'type': 'BTree'}

## 5.26.0.0.0 AuditLog

### 5.26.1.0.0 Name

AuditLog

### 5.26.2.0.0 Description

Records critical actions in an immutable audit trail. Data is partitioned for manageability. (REQ-AUDIT-001)

### 5.26.3.0.0 Attributes

#### 5.26.3.1.0 BIGSERIAL

##### 5.26.3.1.1 Name

auditLogId

##### 5.26.3.1.2 Type

🔹 BIGSERIAL

##### 5.26.3.1.3 Is Required

✅ Yes

##### 5.26.3.1.4 Is Primary Key

✅ Yes

##### 5.26.3.1.5 Size

0

##### 5.26.3.1.6 Is Unique

✅ Yes

##### 5.26.3.1.7 Constraints

*No items available*

##### 5.26.3.1.8 Precision

0

##### 5.26.3.1.9 Scale

0

##### 5.26.3.1.10 Is Foreign Key

❌ No

#### 5.26.3.2.0 UUID

##### 5.26.3.2.1 Name

userId

##### 5.26.3.2.2 Type

🔹 UUID

##### 5.26.3.2.3 Is Required

❌ No

##### 5.26.3.2.4 Is Primary Key

❌ No

##### 5.26.3.2.5 Size

0

##### 5.26.3.2.6 Is Unique

❌ No

##### 5.26.3.2.7 Constraints

*No items available*

##### 5.26.3.2.8 Precision

0

##### 5.26.3.2.9 Scale

0

##### 5.26.3.2.10 Is Foreign Key

✅ Yes

#### 5.26.3.3.0 VARCHAR

##### 5.26.3.3.1 Name

actionType

##### 5.26.3.3.2 Type

🔹 VARCHAR

##### 5.26.3.3.3 Is Required

✅ Yes

##### 5.26.3.3.4 Is Primary Key

❌ No

##### 5.26.3.3.5 Size

100

##### 5.26.3.3.6 Is Unique

❌ No

##### 5.26.3.3.7 Constraints

*No items available*

##### 5.26.3.3.8 Precision

0

##### 5.26.3.3.9 Scale

0

##### 5.26.3.3.10 Is Foreign Key

❌ No

#### 5.26.3.4.0 VARCHAR

##### 5.26.3.4.1 Name

targetEntity

##### 5.26.3.4.2 Type

🔹 VARCHAR

##### 5.26.3.4.3 Is Required

✅ Yes

##### 5.26.3.4.4 Is Primary Key

❌ No

##### 5.26.3.4.5 Size

100

##### 5.26.3.4.6 Is Unique

❌ No

##### 5.26.3.4.7 Constraints

*No items available*

##### 5.26.3.4.8 Precision

0

##### 5.26.3.4.9 Scale

0

##### 5.26.3.4.10 Is Foreign Key

❌ No

#### 5.26.3.5.0 VARCHAR

##### 5.26.3.5.1 Name

targetEntityId

##### 5.26.3.5.2 Type

🔹 VARCHAR

##### 5.26.3.5.3 Is Required

✅ Yes

##### 5.26.3.5.4 Is Primary Key

❌ No

##### 5.26.3.5.5 Size

100

##### 5.26.3.5.6 Is Unique

❌ No

##### 5.26.3.5.7 Constraints

*No items available*

##### 5.26.3.5.8 Precision

0

##### 5.26.3.5.9 Scale

0

##### 5.26.3.5.10 Is Foreign Key

❌ No

#### 5.26.3.6.0 JSONB

##### 5.26.3.6.1 Name

changeDetails

##### 5.26.3.6.2 Type

🔹 JSONB

##### 5.26.3.6.3 Is Required

❌ No

##### 5.26.3.6.4 Is Primary Key

❌ No

##### 5.26.3.6.5 Size

0

##### 5.26.3.6.6 Is Unique

❌ No

##### 5.26.3.6.7 Constraints

*No items available*

##### 5.26.3.6.8 Precision

0

##### 5.26.3.6.9 Scale

0

##### 5.26.3.6.10 Is Foreign Key

❌ No

#### 5.26.3.7.0 VARCHAR

##### 5.26.3.7.1 Name

sourceIpAddress

##### 5.26.3.7.2 Type

🔹 VARCHAR

##### 5.26.3.7.3 Is Required

❌ No

##### 5.26.3.7.4 Is Primary Key

❌ No

##### 5.26.3.7.5 Size

45

##### 5.26.3.7.6 Is Unique

❌ No

##### 5.26.3.7.7 Constraints

*No items available*

##### 5.26.3.7.8 Precision

0

##### 5.26.3.7.9 Scale

0

##### 5.26.3.7.10 Is Foreign Key

❌ No

#### 5.26.3.8.0 DateTime

##### 5.26.3.8.1 Name

timestamp

##### 5.26.3.8.2 Type

🔹 DateTime

##### 5.26.3.8.3 Is Required

✅ Yes

##### 5.26.3.8.4 Is Primary Key

✅ Yes

##### 5.26.3.8.5 Size

0

##### 5.26.3.8.6 Is Unique

❌ No

##### 5.26.3.8.7 Constraints

- DEFAULT CURRENT_TIMESTAMP

##### 5.26.3.8.8 Precision

0

##### 5.26.3.8.9 Scale

0

##### 5.26.3.8.10 Is Foreign Key

❌ No

### 5.26.4.0.0 Primary Keys

- auditLogId
- timestamp

### 5.26.5.0.0 Unique Constraints

*No items available*

### 5.26.6.0.0 Indexes

#### 5.26.6.1.0 BTree

##### 5.26.6.1.1 Name

IX_AuditLog_Target

##### 5.26.6.1.2 Columns

- targetEntity
- targetEntityId

##### 5.26.6.1.3 Type

🔹 BTree

#### 5.26.6.2.0 BTree

##### 5.26.6.2.1 Name

IX_AuditLog_Timestamp

##### 5.26.6.2.2 Columns

- timestamp

##### 5.26.6.2.3 Type

🔹 BTree

#### 5.26.6.3.0 GIN

##### 5.26.6.3.1 Name

IX_AuditLog_ChangeDetails_GIN

##### 5.26.6.3.2 Columns

- changeDetails

##### 5.26.6.3.3 Type

🔹 GIN


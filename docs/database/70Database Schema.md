# 1 Entities

## 1.1 User

### 1.1.1 Name

User

### 1.1.2 Description

Represents a user of the system, including customers, technicians, and administrators. Stores profile, authentication, and role-based information.

### 1.1.3 Attributes

#### 1.1.3.1 Guid

##### 1.1.3.1.1 Name

userId

##### 1.1.3.1.2 Type

🔹 Guid

##### 1.1.3.1.3 Is Required

✅ Yes

##### 1.1.3.1.4 Is Primary Key

✅ Yes

##### 1.1.3.1.5 Is Unique

✅ Yes

##### 1.1.3.1.6 Index Type

UniqueIndex

##### 1.1.3.1.7 Size

0

##### 1.1.3.1.8 Constraints

*No items available*

##### 1.1.3.1.9 Default Value

null

##### 1.1.3.1.10 Is Foreign Key

❌ No

##### 1.1.3.1.11 Precision

0

##### 1.1.3.1.12 Scale

0

#### 1.1.3.2.0 VARCHAR

##### 1.1.3.2.1 Name

email

##### 1.1.3.2.2 Type

🔹 VARCHAR

##### 1.1.3.2.3 Is Required

✅ Yes

##### 1.1.3.2.4 Is Primary Key

❌ No

##### 1.1.3.2.5 Is Unique

✅ Yes

##### 1.1.3.2.6 Index Type

UniqueIndex

##### 1.1.3.2.7 Size

255

##### 1.1.3.2.8 Constraints

- EMAIL_FORMAT

##### 1.1.3.2.9 Default Value

null

##### 1.1.3.2.10 Is Foreign Key

❌ No

##### 1.1.3.2.11 Precision

0

##### 1.1.3.2.12 Scale

0

#### 1.1.3.3.0 VARCHAR

##### 1.1.3.3.1 Name

passwordHash

##### 1.1.3.3.2 Type

🔹 VARCHAR

##### 1.1.3.3.3 Is Required

✅ Yes

##### 1.1.3.3.4 Is Primary Key

❌ No

##### 1.1.3.3.5 Is Unique

❌ No

##### 1.1.3.3.6 Index Type

None

##### 1.1.3.3.7 Size

255

##### 1.1.3.3.8 Constraints

*No items available*

##### 1.1.3.3.9 Default Value

null

##### 1.1.3.3.10 Is Foreign Key

❌ No

##### 1.1.3.3.11 Precision

0

##### 1.1.3.3.12 Scale

0

#### 1.1.3.4.0 VARCHAR

##### 1.1.3.4.1 Name

firstName

##### 1.1.3.4.2 Type

🔹 VARCHAR

##### 1.1.3.4.3 Is Required

✅ Yes

##### 1.1.3.4.4 Is Primary Key

❌ No

##### 1.1.3.4.5 Is Unique

❌ No

##### 1.1.3.4.6 Index Type

Index

##### 1.1.3.4.7 Size

100

##### 1.1.3.4.8 Constraints

*No items available*

##### 1.1.3.4.9 Default Value

null

##### 1.1.3.4.10 Is Foreign Key

❌ No

##### 1.1.3.4.11 Precision

0

##### 1.1.3.4.12 Scale

0

#### 1.1.3.5.0 VARCHAR

##### 1.1.3.5.1 Name

lastName

##### 1.1.3.5.2 Type

🔹 VARCHAR

##### 1.1.3.5.3 Is Required

✅ Yes

##### 1.1.3.5.4 Is Primary Key

❌ No

##### 1.1.3.5.5 Is Unique

❌ No

##### 1.1.3.5.6 Index Type

Index

##### 1.1.3.5.7 Size

100

##### 1.1.3.5.8 Constraints

*No items available*

##### 1.1.3.5.9 Default Value

null

##### 1.1.3.5.10 Is Foreign Key

❌ No

##### 1.1.3.5.11 Precision

0

##### 1.1.3.5.12 Scale

0

#### 1.1.3.6.0 VARCHAR

##### 1.1.3.6.1 Name

role

##### 1.1.3.6.2 Type

🔹 VARCHAR

##### 1.1.3.6.3 Is Required

✅ Yes

##### 1.1.3.6.4 Is Primary Key

❌ No

##### 1.1.3.6.5 Is Unique

❌ No

##### 1.1.3.6.6 Index Type

Index

##### 1.1.3.6.7 Size

20

##### 1.1.3.6.8 Constraints

- ENUM('Customer', 'Technician', 'ServiceAdmin', 'BrandAdmin', 'SuperAdmin')

##### 1.1.3.6.9 Default Value

'Customer'

##### 1.1.3.6.10 Is Foreign Key

❌ No

##### 1.1.3.6.11 Precision

0

##### 1.1.3.6.12 Scale

0

#### 1.1.3.7.0 Guid

##### 1.1.3.7.1 Name

serviceCenterId

##### 1.1.3.7.2 Type

🔹 Guid

##### 1.1.3.7.3 Is Required

❌ No

##### 1.1.3.7.4 Is Primary Key

❌ No

##### 1.1.3.7.5 Is Unique

❌ No

##### 1.1.3.7.6 Index Type

Index

##### 1.1.3.7.7 Size

0

##### 1.1.3.7.8 Constraints

*No items available*

##### 1.1.3.7.9 Default Value

null

##### 1.1.3.7.10 Is Foreign Key

✅ Yes

##### 1.1.3.7.11 Precision

0

##### 1.1.3.7.12 Scale

0

#### 1.1.3.8.0 Guid

##### 1.1.3.8.1 Name

brandId

##### 1.1.3.8.2 Type

🔹 Guid

##### 1.1.3.8.3 Is Required

❌ No

##### 1.1.3.8.4 Is Primary Key

❌ No

##### 1.1.3.8.5 Is Unique

❌ No

##### 1.1.3.8.6 Index Type

Index

##### 1.1.3.8.7 Size

0

##### 1.1.3.8.8 Constraints

*No items available*

##### 1.1.3.8.9 Default Value

null

##### 1.1.3.8.10 Is Foreign Key

✅ Yes

##### 1.1.3.8.11 Precision

0

##### 1.1.3.8.12 Scale

0

#### 1.1.3.9.0 BOOLEAN

##### 1.1.3.9.1 Name

isActive

##### 1.1.3.9.2 Type

🔹 BOOLEAN

##### 1.1.3.9.3 Is Required

✅ Yes

##### 1.1.3.9.4 Is Primary Key

❌ No

##### 1.1.3.9.5 Is Unique

❌ No

##### 1.1.3.9.6 Index Type

Index

##### 1.1.3.9.7 Size

0

##### 1.1.3.9.8 Constraints

*No items available*

##### 1.1.3.9.9 Default Value

true

##### 1.1.3.9.10 Is Foreign Key

❌ No

##### 1.1.3.9.11 Precision

0

##### 1.1.3.9.12 Scale

0

#### 1.1.3.10.0 BOOLEAN

##### 1.1.3.10.1 Name

isDeleted

##### 1.1.3.10.2 Type

🔹 BOOLEAN

##### 1.1.3.10.3 Is Required

✅ Yes

##### 1.1.3.10.4 Is Primary Key

❌ No

##### 1.1.3.10.5 Is Unique

❌ No

##### 1.1.3.10.6 Index Type

Index

##### 1.1.3.10.7 Size

0

##### 1.1.3.10.8 Constraints

*No items available*

##### 1.1.3.10.9 Default Value

false

##### 1.1.3.10.10 Is Foreign Key

❌ No

##### 1.1.3.10.11 Precision

0

##### 1.1.3.10.12 Scale

0

#### 1.1.3.11.0 DateTime

##### 1.1.3.11.1 Name

createdAt

##### 1.1.3.11.2 Type

🔹 DateTime

##### 1.1.3.11.3 Is Required

✅ Yes

##### 1.1.3.11.4 Is Primary Key

❌ No

##### 1.1.3.11.5 Is Unique

❌ No

##### 1.1.3.11.6 Index Type

Index

##### 1.1.3.11.7 Size

0

##### 1.1.3.11.8 Constraints

*No items available*

##### 1.1.3.11.9 Default Value

CURRENT_TIMESTAMP

##### 1.1.3.11.10 Is Foreign Key

❌ No

##### 1.1.3.11.11 Precision

0

##### 1.1.3.11.12 Scale

0

#### 1.1.3.12.0 DateTime

##### 1.1.3.12.1 Name

updatedAt

##### 1.1.3.12.2 Type

🔹 DateTime

##### 1.1.3.12.3 Is Required

✅ Yes

##### 1.1.3.12.4 Is Primary Key

❌ No

##### 1.1.3.12.5 Is Unique

❌ No

##### 1.1.3.12.6 Index Type

None

##### 1.1.3.12.7 Size

0

##### 1.1.3.12.8 Constraints

*No items available*

##### 1.1.3.12.9 Default Value

CURRENT_TIMESTAMP

##### 1.1.3.12.10 Is Foreign Key

❌ No

##### 1.1.3.12.11 Precision

0

##### 1.1.3.12.12 Scale

0

### 1.1.4.0.0 Primary Keys

- userId

### 1.1.5.0.0 Unique Constraints

- {'name': 'UC_User_Email', 'columns': ['email']}

### 1.1.6.0.0 Indexes

#### 1.1.6.1.0 BTree

##### 1.1.6.1.1 Name

IX_User_FullName

##### 1.1.6.1.2 Columns

- lastName
- firstName

##### 1.1.6.1.3 Type

🔹 BTree

#### 1.1.6.2.0 BTree

##### 1.1.6.2.1 Name

IX_User_Role

##### 1.1.6.2.2 Columns

- role

##### 1.1.6.2.3 Type

🔹 BTree

#### 1.1.6.3.0 BTree

##### 1.1.6.3.1 Name

IX_User_Active_NotDeleted

##### 1.1.6.3.2 Columns

- isActive
- isDeleted

##### 1.1.6.3.3 Type

🔹 BTree

## 1.2.0.0.0 Device

### 1.2.1.0.0 Name

Device

### 1.2.2.0.0 Description

Stores device information for sending push notifications via FCM. (REQ-INTG-001)

### 1.2.3.0.0 Attributes

#### 1.2.3.1.0 Guid

##### 1.2.3.1.1 Name

deviceId

##### 1.2.3.1.2 Type

🔹 Guid

##### 1.2.3.1.3 Is Required

✅ Yes

##### 1.2.3.1.4 Is Primary Key

✅ Yes

##### 1.2.3.1.5 Is Unique

✅ Yes

##### 1.2.3.1.6 Index Type

UniqueIndex

##### 1.2.3.1.7 Size

0

##### 1.2.3.1.8 Constraints

*No items available*

##### 1.2.3.1.9 Default Value

null

##### 1.2.3.1.10 Is Foreign Key

❌ No

##### 1.2.3.1.11 Precision

0

##### 1.2.3.1.12 Scale

0

#### 1.2.3.2.0 Guid

##### 1.2.3.2.1 Name

userId

##### 1.2.3.2.2 Type

🔹 Guid

##### 1.2.3.2.3 Is Required

✅ Yes

##### 1.2.3.2.4 Is Primary Key

❌ No

##### 1.2.3.2.5 Is Unique

❌ No

##### 1.2.3.2.6 Index Type

Index

##### 1.2.3.2.7 Size

0

##### 1.2.3.2.8 Constraints

*No items available*

##### 1.2.3.2.9 Default Value

null

##### 1.2.3.2.10 Is Foreign Key

✅ Yes

##### 1.2.3.2.11 Precision

0

##### 1.2.3.2.12 Scale

0

#### 1.2.3.3.0 VARCHAR

##### 1.2.3.3.1 Name

fcmToken

##### 1.2.3.3.2 Type

🔹 VARCHAR

##### 1.2.3.3.3 Is Required

✅ Yes

##### 1.2.3.3.4 Is Primary Key

❌ No

##### 1.2.3.3.5 Is Unique

✅ Yes

##### 1.2.3.3.6 Index Type

UniqueIndex

##### 1.2.3.3.7 Size

255

##### 1.2.3.3.8 Constraints

*No items available*

##### 1.2.3.3.9 Default Value

null

##### 1.2.3.3.10 Is Foreign Key

❌ No

##### 1.2.3.3.11 Precision

0

##### 1.2.3.3.12 Scale

0

#### 1.2.3.4.0 VARCHAR

##### 1.2.3.4.1 Name

deviceType

##### 1.2.3.4.2 Type

🔹 VARCHAR

##### 1.2.3.4.3 Is Required

✅ Yes

##### 1.2.3.4.4 Is Primary Key

❌ No

##### 1.2.3.4.5 Is Unique

❌ No

##### 1.2.3.4.6 Index Type

Index

##### 1.2.3.4.7 Size

10

##### 1.2.3.4.8 Constraints

- ENUM('Android', 'iOS')

##### 1.2.3.4.9 Default Value

null

##### 1.2.3.4.10 Is Foreign Key

❌ No

##### 1.2.3.4.11 Precision

0

##### 1.2.3.4.12 Scale

0

#### 1.2.3.5.0 DateTime

##### 1.2.3.5.1 Name

createdAt

##### 1.2.3.5.2 Type

🔹 DateTime

##### 1.2.3.5.3 Is Required

✅ Yes

##### 1.2.3.5.4 Is Primary Key

❌ No

##### 1.2.3.5.5 Is Unique

❌ No

##### 1.2.3.5.6 Index Type

Index

##### 1.2.3.5.7 Size

0

##### 1.2.3.5.8 Constraints

*No items available*

##### 1.2.3.5.9 Default Value

CURRENT_TIMESTAMP

##### 1.2.3.5.10 Is Foreign Key

❌ No

##### 1.2.3.5.11 Precision

0

##### 1.2.3.5.12 Scale

0

### 1.2.4.0.0 Primary Keys

- deviceId

### 1.2.5.0.0 Unique Constraints

- {'name': 'UC_Device_FcmToken', 'columns': ['fcmToken']}

### 1.2.6.0.0 Indexes

- {'name': 'IX_Device_UserId', 'columns': ['userId'], 'type': 'BTree'}

## 1.3.0.0.0 Brand

### 1.3.1.0.0 Name

Brand

### 1.3.2.0.0 Description

Represents a product brand or manufacturer.

### 1.3.3.0.0 Caching

| Property | Value |
|----------|-------|
| Strategy | ReadThrough |
| Provider | DistributedCache (e.g., Redis) |
| Scope | FrequentlyAccessed |

### 1.3.4.0.0 Attributes

#### 1.3.4.1.0 Guid

##### 1.3.4.1.1 Name

brandId

##### 1.3.4.1.2 Type

🔹 Guid

##### 1.3.4.1.3 Is Required

✅ Yes

##### 1.3.4.1.4 Is Primary Key

✅ Yes

##### 1.3.4.1.5 Is Unique

✅ Yes

##### 1.3.4.1.6 Index Type

UniqueIndex

##### 1.3.4.1.7 Size

0

##### 1.3.4.1.8 Constraints

*No items available*

##### 1.3.4.1.9 Default Value

null

##### 1.3.4.1.10 Is Foreign Key

❌ No

##### 1.3.4.1.11 Precision

0

##### 1.3.4.1.12 Scale

0

#### 1.3.4.2.0 VARCHAR

##### 1.3.4.2.1 Name

name

##### 1.3.4.2.2 Type

🔹 VARCHAR

##### 1.3.4.2.3 Is Required

✅ Yes

##### 1.3.4.2.4 Is Primary Key

❌ No

##### 1.3.4.2.5 Is Unique

✅ Yes

##### 1.3.4.2.6 Index Type

UniqueIndex

##### 1.3.4.2.7 Size

150

##### 1.3.4.2.8 Constraints

*No items available*

##### 1.3.4.2.9 Default Value

null

##### 1.3.4.2.10 Is Foreign Key

❌ No

##### 1.3.4.2.11 Precision

0

##### 1.3.4.2.12 Scale

0

#### 1.3.4.3.0 BOOLEAN

##### 1.3.4.3.1 Name

isDeleted

##### 1.3.4.3.2 Type

🔹 BOOLEAN

##### 1.3.4.3.3 Is Required

✅ Yes

##### 1.3.4.3.4 Is Primary Key

❌ No

##### 1.3.4.3.5 Is Unique

❌ No

##### 1.3.4.3.6 Index Type

Index

##### 1.3.4.3.7 Size

0

##### 1.3.4.3.8 Constraints

*No items available*

##### 1.3.4.3.9 Default Value

false

##### 1.3.4.3.10 Is Foreign Key

❌ No

##### 1.3.4.3.11 Precision

0

##### 1.3.4.3.12 Scale

0

#### 1.3.4.4.0 DateTime

##### 1.3.4.4.1 Name

createdAt

##### 1.3.4.4.2 Type

🔹 DateTime

##### 1.3.4.4.3 Is Required

✅ Yes

##### 1.3.4.4.4 Is Primary Key

❌ No

##### 1.3.4.4.5 Is Unique

❌ No

##### 1.3.4.4.6 Index Type

Index

##### 1.3.4.4.7 Size

0

##### 1.3.4.4.8 Constraints

*No items available*

##### 1.3.4.4.9 Default Value

CURRENT_TIMESTAMP

##### 1.3.4.4.10 Is Foreign Key

❌ No

##### 1.3.4.4.11 Precision

0

##### 1.3.4.4.12 Scale

0

#### 1.3.4.5.0 DateTime

##### 1.3.4.5.1 Name

updatedAt

##### 1.3.4.5.2 Type

🔹 DateTime

##### 1.3.4.5.3 Is Required

✅ Yes

##### 1.3.4.5.4 Is Primary Key

❌ No

##### 1.3.4.5.5 Is Unique

❌ No

##### 1.3.4.5.6 Index Type

None

##### 1.3.4.5.7 Size

0

##### 1.3.4.5.8 Constraints

*No items available*

##### 1.3.4.5.9 Default Value

CURRENT_TIMESTAMP

##### 1.3.4.5.10 Is Foreign Key

❌ No

##### 1.3.4.5.11 Precision

0

##### 1.3.4.5.12 Scale

0

### 1.3.5.0.0 Primary Keys

- brandId

### 1.3.6.0.0 Unique Constraints

- {'name': 'UC_Brand_Name', 'columns': ['name']}

### 1.3.7.0.0 Indexes

*No items available*

## 1.4.0.0.0 ProductModel

### 1.4.1.0.0 Name

ProductModel

### 1.4.2.0.0 Description

Represents a specific product model from a brand. (REQ-FUNC-012)

### 1.4.3.0.0 Caching

| Property | Value |
|----------|-------|
| Strategy | ReadThrough |
| Provider | DistributedCache (e.g., Redis) |
| Scope | FrequentlyAccessed |

### 1.4.4.0.0 Attributes

#### 1.4.4.1.0 Guid

##### 1.4.4.1.1 Name

productModelId

##### 1.4.4.1.2 Type

🔹 Guid

##### 1.4.4.1.3 Is Required

✅ Yes

##### 1.4.4.1.4 Is Primary Key

✅ Yes

##### 1.4.4.1.5 Is Unique

✅ Yes

##### 1.4.4.1.6 Index Type

UniqueIndex

##### 1.4.4.1.7 Size

0

##### 1.4.4.1.8 Constraints

*No items available*

##### 1.4.4.1.9 Default Value

null

##### 1.4.4.1.10 Is Foreign Key

❌ No

##### 1.4.4.1.11 Precision

0

##### 1.4.4.1.12 Scale

0

#### 1.4.4.2.0 Guid

##### 1.4.4.2.1 Name

brandId

##### 1.4.4.2.2 Type

🔹 Guid

##### 1.4.4.2.3 Is Required

✅ Yes

##### 1.4.4.2.4 Is Primary Key

❌ No

##### 1.4.4.2.5 Is Unique

❌ No

##### 1.4.4.2.6 Index Type

Index

##### 1.4.4.2.7 Size

0

##### 1.4.4.2.8 Constraints

*No items available*

##### 1.4.4.2.9 Default Value

null

##### 1.4.4.2.10 Is Foreign Key

✅ Yes

##### 1.4.4.2.11 Precision

0

##### 1.4.4.2.12 Scale

0

#### 1.4.4.3.0 VARCHAR

##### 1.4.4.3.1 Name

modelNumber

##### 1.4.4.3.2 Type

🔹 VARCHAR

##### 1.4.4.3.3 Is Required

✅ Yes

##### 1.4.4.3.4 Is Primary Key

❌ No

##### 1.4.4.3.5 Is Unique

❌ No

##### 1.4.4.3.6 Index Type

Index

##### 1.4.4.3.7 Size

100

##### 1.4.4.3.8 Constraints

*No items available*

##### 1.4.4.3.9 Default Value

null

##### 1.4.4.3.10 Is Foreign Key

❌ No

##### 1.4.4.3.11 Precision

0

##### 1.4.4.3.12 Scale

0

#### 1.4.4.4.0 VARCHAR

##### 1.4.4.4.1 Name

name

##### 1.4.4.4.2 Type

🔹 VARCHAR

##### 1.4.4.4.3 Is Required

✅ Yes

##### 1.4.4.4.4 Is Primary Key

❌ No

##### 1.4.4.4.5 Is Unique

❌ No

##### 1.4.4.4.6 Index Type

Index

##### 1.4.4.4.7 Size

200

##### 1.4.4.4.8 Constraints

*No items available*

##### 1.4.4.4.9 Default Value

null

##### 1.4.4.4.10 Is Foreign Key

❌ No

##### 1.4.4.4.11 Precision

0

##### 1.4.4.4.12 Scale

0

#### 1.4.4.5.0 INT

##### 1.4.4.5.1 Name

defaultWarrantyMonths

##### 1.4.4.5.2 Type

🔹 INT

##### 1.4.4.5.3 Is Required

✅ Yes

##### 1.4.4.5.4 Is Primary Key

❌ No

##### 1.4.4.5.5 Is Unique

❌ No

##### 1.4.4.5.6 Index Type

None

##### 1.4.4.5.7 Size

0

##### 1.4.4.5.8 Constraints

- POSITIVE_VALUE

##### 1.4.4.5.9 Default Value

12

##### 1.4.4.5.10 Is Foreign Key

❌ No

##### 1.4.4.5.11 Precision

0

##### 1.4.4.5.12 Scale

0

### 1.4.5.0.0 Primary Keys

- productModelId

### 1.4.6.0.0 Unique Constraints

- {'name': 'UC_ProductModel_Brand_ModelNumber', 'columns': ['brandId', 'modelNumber']}

### 1.4.7.0.0 Indexes

- {'name': 'IX_ProductModel_BrandId', 'columns': ['brandId'], 'type': 'BTree'}

## 1.5.0.0.0 UserProduct

### 1.5.1.0.0 Name

UserProduct

### 1.5.2.0.0 Description

Represents a specific instance of a product owned by a user. (REQ-BR-001, REQ-FUNC-005)

### 1.5.3.0.0 Attributes

#### 1.5.3.1.0 Guid

##### 1.5.3.1.1 Name

userProductId

##### 1.5.3.1.2 Type

🔹 Guid

##### 1.5.3.1.3 Is Required

✅ Yes

##### 1.5.3.1.4 Is Primary Key

✅ Yes

##### 1.5.3.1.5 Is Unique

✅ Yes

##### 1.5.3.1.6 Index Type

UniqueIndex

##### 1.5.3.1.7 Size

0

##### 1.5.3.1.8 Constraints

*No items available*

##### 1.5.3.1.9 Default Value

null

##### 1.5.3.1.10 Is Foreign Key

❌ No

##### 1.5.3.1.11 Precision

0

##### 1.5.3.1.12 Scale

0

#### 1.5.3.2.0 Guid

##### 1.5.3.2.1 Name

userId

##### 1.5.3.2.2 Type

🔹 Guid

##### 1.5.3.2.3 Is Required

✅ Yes

##### 1.5.3.2.4 Is Primary Key

❌ No

##### 1.5.3.2.5 Is Unique

❌ No

##### 1.5.3.2.6 Index Type

Index

##### 1.5.3.2.7 Size

0

##### 1.5.3.2.8 Constraints

*No items available*

##### 1.5.3.2.9 Default Value

null

##### 1.5.3.2.10 Is Foreign Key

✅ Yes

##### 1.5.3.2.11 Precision

0

##### 1.5.3.2.12 Scale

0

#### 1.5.3.3.0 Guid

##### 1.5.3.3.1 Name

productModelId

##### 1.5.3.3.2 Type

🔹 Guid

##### 1.5.3.3.3 Is Required

✅ Yes

##### 1.5.3.3.4 Is Primary Key

❌ No

##### 1.5.3.3.5 Is Unique

❌ No

##### 1.5.3.3.6 Index Type

Index

##### 1.5.3.3.7 Size

0

##### 1.5.3.3.8 Constraints

*No items available*

##### 1.5.3.3.9 Default Value

null

##### 1.5.3.3.10 Is Foreign Key

✅ Yes

##### 1.5.3.3.11 Precision

0

##### 1.5.3.3.12 Scale

0

#### 1.5.3.4.0 VARCHAR

##### 1.5.3.4.1 Name

serialNumber

##### 1.5.3.4.2 Type

🔹 VARCHAR

##### 1.5.3.4.3 Is Required

✅ Yes

##### 1.5.3.4.4 Is Primary Key

❌ No

##### 1.5.3.4.5 Is Unique

✅ Yes

##### 1.5.3.4.6 Index Type

UniqueIndex

##### 1.5.3.4.7 Size

100

##### 1.5.3.4.8 Constraints

*No items available*

##### 1.5.3.4.9 Default Value

null

##### 1.5.3.4.10 Is Foreign Key

❌ No

##### 1.5.3.4.11 Precision

0

##### 1.5.3.4.12 Scale

0

#### 1.5.3.5.0 Date

##### 1.5.3.5.1 Name

purchaseDate

##### 1.5.3.5.2 Type

🔹 Date

##### 1.5.3.5.3 Is Required

✅ Yes

##### 1.5.3.5.4 Is Primary Key

❌ No

##### 1.5.3.5.5 Is Unique

❌ No

##### 1.5.3.5.6 Index Type

Index

##### 1.5.3.5.7 Size

0

##### 1.5.3.5.8 Constraints

*No items available*

##### 1.5.3.5.9 Default Value

null

##### 1.5.3.5.10 Is Foreign Key

❌ No

##### 1.5.3.5.11 Precision

0

##### 1.5.3.5.12 Scale

0

#### 1.5.3.6.0 Date

##### 1.5.3.6.1 Name

warrantyExpiryDate

##### 1.5.3.6.2 Type

🔹 Date

##### 1.5.3.6.3 Is Required

✅ Yes

##### 1.5.3.6.4 Is Primary Key

❌ No

##### 1.5.3.6.5 Is Unique

❌ No

##### 1.5.3.6.6 Index Type

Index

##### 1.5.3.6.7 Size

0

##### 1.5.3.6.8 Constraints

*No items available*

##### 1.5.3.6.9 Default Value

null

##### 1.5.3.6.10 Is Foreign Key

❌ No

##### 1.5.3.6.11 Precision

0

##### 1.5.3.6.12 Scale

0

#### 1.5.3.7.0 INT

##### 1.5.3.7.1 Name

serviceRequestCount

##### 1.5.3.7.2 Type

🔹 INT

##### 1.5.3.7.3 Is Required

✅ Yes

##### 1.5.3.7.4 Is Primary Key

❌ No

##### 1.5.3.7.5 Is Unique

❌ No

##### 1.5.3.7.6 Index Type

None

##### 1.5.3.7.7 Size

0

##### 1.5.3.7.8 Constraints

- NON_NEGATIVE

##### 1.5.3.7.9 Default Value

0

##### 1.5.3.7.10 Is Foreign Key

❌ No

##### 1.5.3.7.11 Precision

0

##### 1.5.3.7.12 Scale

0

#### 1.5.3.8.0 BOOLEAN

##### 1.5.3.8.1 Name

isDeleted

##### 1.5.3.8.2 Type

🔹 BOOLEAN

##### 1.5.3.8.3 Is Required

✅ Yes

##### 1.5.3.8.4 Is Primary Key

❌ No

##### 1.5.3.8.5 Is Unique

❌ No

##### 1.5.3.8.6 Index Type

Index

##### 1.5.3.8.7 Size

0

##### 1.5.3.8.8 Constraints

*No items available*

##### 1.5.3.8.9 Default Value

false

##### 1.5.3.8.10 Is Foreign Key

❌ No

##### 1.5.3.8.11 Precision

0

##### 1.5.3.8.12 Scale

0

#### 1.5.3.9.0 DateTime

##### 1.5.3.9.1 Name

createdAt

##### 1.5.3.9.2 Type

🔹 DateTime

##### 1.5.3.9.3 Is Required

✅ Yes

##### 1.5.3.9.4 Is Primary Key

❌ No

##### 1.5.3.9.5 Is Unique

❌ No

##### 1.5.3.9.6 Index Type

Index

##### 1.5.3.9.7 Size

0

##### 1.5.3.9.8 Constraints

*No items available*

##### 1.5.3.9.9 Default Value

CURRENT_TIMESTAMP

##### 1.5.3.9.10 Is Foreign Key

❌ No

##### 1.5.3.9.11 Precision

0

##### 1.5.3.9.12 Scale

0

#### 1.5.3.10.0 DateTime

##### 1.5.3.10.1 Name

updatedAt

##### 1.5.3.10.2 Type

🔹 DateTime

##### 1.5.3.10.3 Is Required

✅ Yes

##### 1.5.3.10.4 Is Primary Key

❌ No

##### 1.5.3.10.5 Is Unique

❌ No

##### 1.5.3.10.6 Index Type

None

##### 1.5.3.10.7 Size

0

##### 1.5.3.10.8 Constraints

*No items available*

##### 1.5.3.10.9 Default Value

CURRENT_TIMESTAMP

##### 1.5.3.10.10 Is Foreign Key

❌ No

##### 1.5.3.10.11 Precision

0

##### 1.5.3.10.12 Scale

0

### 1.5.4.0.0 Primary Keys

- userProductId

### 1.5.5.0.0 Unique Constraints

- {'name': 'UC_UserProduct_SerialNumber', 'columns': ['serialNumber']}

### 1.5.6.0.0 Indexes

#### 1.5.6.1.0 BTree

##### 1.5.6.1.1 Name

IX_UserProduct_UserId

##### 1.5.6.1.2 Columns

- userId

##### 1.5.6.1.3 Type

🔹 BTree

#### 1.5.6.2.0 BTree

##### 1.5.6.2.1 Name

IX_UserProduct_ProductModelId

##### 1.5.6.2.2 Columns

- productModelId

##### 1.5.6.2.3 Type

🔹 BTree

#### 1.5.6.3.0 BTree

##### 1.5.6.3.1 Name

IX_UserProduct_User_WarrantyExpiry

##### 1.5.6.3.2 Columns

- userId
- warrantyExpiryDate

##### 1.5.6.3.3 Type

🔹 BTree

## 1.6.0.0.0 OwnershipTransferRequest

### 1.6.1.0.0 Name

OwnershipTransferRequest

### 1.6.2.0.0 Description

Tracks the state of a product ownership transfer request. A unique constraint on userProductId should be filtered for 'Pending' status. (REQ-FUNC-004, REQ-BR-002)

### 1.6.3.0.0 Attributes

#### 1.6.3.1.0 Guid

##### 1.6.3.1.1 Name

transferRequestId

##### 1.6.3.1.2 Type

🔹 Guid

##### 1.6.3.1.3 Is Required

✅ Yes

##### 1.6.3.1.4 Is Primary Key

✅ Yes

##### 1.6.3.1.5 Is Unique

✅ Yes

##### 1.6.3.1.6 Index Type

UniqueIndex

##### 1.6.3.1.7 Size

0

##### 1.6.3.1.8 Constraints

*No items available*

##### 1.6.3.1.9 Default Value

null

##### 1.6.3.1.10 Is Foreign Key

❌ No

##### 1.6.3.1.11 Precision

0

##### 1.6.3.1.12 Scale

0

#### 1.6.3.2.0 Guid

##### 1.6.3.2.1 Name

userProductId

##### 1.6.3.2.2 Type

🔹 Guid

##### 1.6.3.2.3 Is Required

✅ Yes

##### 1.6.3.2.4 Is Primary Key

❌ No

##### 1.6.3.2.5 Is Unique

❌ No

##### 1.6.3.2.6 Index Type

Index

##### 1.6.3.2.7 Size

0

##### 1.6.3.2.8 Constraints

*No items available*

##### 1.6.3.2.9 Default Value

null

##### 1.6.3.2.10 Is Foreign Key

✅ Yes

##### 1.6.3.2.11 Precision

0

##### 1.6.3.2.12 Scale

0

#### 1.6.3.3.0 Guid

##### 1.6.3.3.1 Name

fromUserId

##### 1.6.3.3.2 Type

🔹 Guid

##### 1.6.3.3.3 Is Required

✅ Yes

##### 1.6.3.3.4 Is Primary Key

❌ No

##### 1.6.3.3.5 Is Unique

❌ No

##### 1.6.3.3.6 Index Type

Index

##### 1.6.3.3.7 Size

0

##### 1.6.3.3.8 Constraints

*No items available*

##### 1.6.3.3.9 Default Value

null

##### 1.6.3.3.10 Is Foreign Key

✅ Yes

##### 1.6.3.3.11 Precision

0

##### 1.6.3.3.12 Scale

0

#### 1.6.3.4.0 VARCHAR

##### 1.6.3.4.1 Name

toUserEmail

##### 1.6.3.4.2 Type

🔹 VARCHAR

##### 1.6.3.4.3 Is Required

✅ Yes

##### 1.6.3.4.4 Is Primary Key

❌ No

##### 1.6.3.4.5 Is Unique

❌ No

##### 1.6.3.4.6 Index Type

Index

##### 1.6.3.4.7 Size

255

##### 1.6.3.4.8 Constraints

*No items available*

##### 1.6.3.4.9 Default Value

null

##### 1.6.3.4.10 Is Foreign Key

❌ No

##### 1.6.3.4.11 Precision

0

##### 1.6.3.4.12 Scale

0

#### 1.6.3.5.0 VARCHAR

##### 1.6.3.5.1 Name

status

##### 1.6.3.5.2 Type

🔹 VARCHAR

##### 1.6.3.5.3 Is Required

✅ Yes

##### 1.6.3.5.4 Is Primary Key

❌ No

##### 1.6.3.5.5 Is Unique

❌ No

##### 1.6.3.5.6 Index Type

Index

##### 1.6.3.5.7 Size

20

##### 1.6.3.5.8 Constraints

- ENUM('Pending', 'Accepted', 'Rejected', 'Expired')

##### 1.6.3.5.9 Default Value

'Pending'

##### 1.6.3.5.10 Is Foreign Key

❌ No

##### 1.6.3.5.11 Precision

0

##### 1.6.3.5.12 Scale

0

#### 1.6.3.6.0 DateTime

##### 1.6.3.6.1 Name

expiresAt

##### 1.6.3.6.2 Type

🔹 DateTime

##### 1.6.3.6.3 Is Required

✅ Yes

##### 1.6.3.6.4 Is Primary Key

❌ No

##### 1.6.3.6.5 Is Unique

❌ No

##### 1.6.3.6.6 Index Type

Index

##### 1.6.3.6.7 Size

0

##### 1.6.3.6.8 Constraints

*No items available*

##### 1.6.3.6.9 Default Value

null

##### 1.6.3.6.10 Is Foreign Key

❌ No

##### 1.6.3.6.11 Precision

0

##### 1.6.3.6.12 Scale

0

#### 1.6.3.7.0 DateTime

##### 1.6.3.7.1 Name

createdAt

##### 1.6.3.7.2 Type

🔹 DateTime

##### 1.6.3.7.3 Is Required

✅ Yes

##### 1.6.3.7.4 Is Primary Key

❌ No

##### 1.6.3.7.5 Is Unique

❌ No

##### 1.6.3.7.6 Index Type

Index

##### 1.6.3.7.7 Size

0

##### 1.6.3.7.8 Constraints

*No items available*

##### 1.6.3.7.9 Default Value

CURRENT_TIMESTAMP

##### 1.6.3.7.10 Is Foreign Key

❌ No

##### 1.6.3.7.11 Precision

0

##### 1.6.3.7.12 Scale

0

#### 1.6.3.8.0 DateTime

##### 1.6.3.8.1 Name

updatedAt

##### 1.6.3.8.2 Type

🔹 DateTime

##### 1.6.3.8.3 Is Required

✅ Yes

##### 1.6.3.8.4 Is Primary Key

❌ No

##### 1.6.3.8.5 Is Unique

❌ No

##### 1.6.3.8.6 Index Type

None

##### 1.6.3.8.7 Size

0

##### 1.6.3.8.8 Constraints

*No items available*

##### 1.6.3.8.9 Default Value

CURRENT_TIMESTAMP

##### 1.6.3.8.10 Is Foreign Key

❌ No

##### 1.6.3.8.11 Precision

0

##### 1.6.3.8.12 Scale

0

### 1.6.4.0.0 Primary Keys

- transferRequestId

### 1.6.5.0.0 Unique Constraints

- {'name': 'UC_OwnershipTransferRequest_Pending_UserProduct', 'columns': ['userProductId'], 'condition': "status = 'Pending'"}

### 1.6.6.0.0 Indexes

- {'name': 'IX_OwnershipTransferRequest_Status_ExpiresAt', 'columns': ['status', 'expiresAt'], 'type': 'BTree'}

## 1.7.0.0.0 Invoice

### 1.7.1.0.0 Name

Invoice

### 1.7.2.0.0 Description

Stores uploaded invoice images/PDFs and their OCR results. (REQ-DATA-001)

### 1.7.3.0.0 Attributes

#### 1.7.3.1.0 Guid

##### 1.7.3.1.1 Name

invoiceId

##### 1.7.3.1.2 Type

🔹 Guid

##### 1.7.3.1.3 Is Required

✅ Yes

##### 1.7.3.1.4 Is Primary Key

✅ Yes

##### 1.7.3.1.5 Is Unique

✅ Yes

##### 1.7.3.1.6 Index Type

UniqueIndex

##### 1.7.3.1.7 Size

0

##### 1.7.3.1.8 Constraints

*No items available*

##### 1.7.3.1.9 Default Value

null

##### 1.7.3.1.10 Is Foreign Key

❌ No

##### 1.7.3.1.11 Precision

0

##### 1.7.3.1.12 Scale

0

#### 1.7.3.2.0 Guid

##### 1.7.3.2.1 Name

userProductId

##### 1.7.3.2.2 Type

🔹 Guid

##### 1.7.3.2.3 Is Required

✅ Yes

##### 1.7.3.2.4 Is Primary Key

❌ No

##### 1.7.3.2.5 Is Unique

✅ Yes

##### 1.7.3.2.6 Index Type

UniqueIndex

##### 1.7.3.2.7 Size

0

##### 1.7.3.2.8 Constraints

*No items available*

##### 1.7.3.2.9 Default Value

null

##### 1.7.3.2.10 Is Foreign Key

✅ Yes

##### 1.7.3.2.11 Precision

0

##### 1.7.3.2.12 Scale

0

#### 1.7.3.3.0 VARCHAR

##### 1.7.3.3.1 Name

fileUrl

##### 1.7.3.3.2 Type

🔹 VARCHAR

##### 1.7.3.3.3 Is Required

✅ Yes

##### 1.7.3.3.4 Is Primary Key

❌ No

##### 1.7.3.3.5 Is Unique

❌ No

##### 1.7.3.3.6 Index Type

None

##### 1.7.3.3.7 Size

512

##### 1.7.3.3.8 Constraints

*No items available*

##### 1.7.3.3.9 Default Value

null

##### 1.7.3.3.10 Is Foreign Key

❌ No

##### 1.7.3.3.11 Precision

0

##### 1.7.3.3.12 Scale

0

#### 1.7.3.4.0 VARCHAR

##### 1.7.3.4.1 Name

ocrStatus

##### 1.7.3.4.2 Type

🔹 VARCHAR

##### 1.7.3.4.3 Is Required

✅ Yes

##### 1.7.3.4.4 Is Primary Key

❌ No

##### 1.7.3.4.5 Is Unique

❌ No

##### 1.7.3.4.6 Index Type

Index

##### 1.7.3.4.7 Size

20

##### 1.7.3.4.8 Constraints

- ENUM('Pending', 'Success', 'Failed')

##### 1.7.3.4.9 Default Value

'Pending'

##### 1.7.3.4.10 Is Foreign Key

❌ No

##### 1.7.3.4.11 Precision

0

##### 1.7.3.4.12 Scale

0

#### 1.7.3.5.0 JSONB

##### 1.7.3.5.1 Name

extractedData

##### 1.7.3.5.2 Type

🔹 JSONB

##### 1.7.3.5.3 Is Required

❌ No

##### 1.7.3.5.4 Is Primary Key

❌ No

##### 1.7.3.5.5 Is Unique

❌ No

##### 1.7.3.5.6 Index Type

None

##### 1.7.3.5.7 Size

0

##### 1.7.3.5.8 Constraints

*No items available*

##### 1.7.3.5.9 Default Value

null

##### 1.7.3.5.10 Is Foreign Key

❌ No

##### 1.7.3.5.11 Precision

0

##### 1.7.3.5.12 Scale

0

#### 1.7.3.6.0 DateTime

##### 1.7.3.6.1 Name

createdAt

##### 1.7.3.6.2 Type

🔹 DateTime

##### 1.7.3.6.3 Is Required

✅ Yes

##### 1.7.3.6.4 Is Primary Key

❌ No

##### 1.7.3.6.5 Is Unique

❌ No

##### 1.7.3.6.6 Index Type

Index

##### 1.7.3.6.7 Size

0

##### 1.7.3.6.8 Constraints

*No items available*

##### 1.7.3.6.9 Default Value

CURRENT_TIMESTAMP

##### 1.7.3.6.10 Is Foreign Key

❌ No

##### 1.7.3.6.11 Precision

0

##### 1.7.3.6.12 Scale

0

### 1.7.4.0.0 Primary Keys

- invoiceId

### 1.7.5.0.0 Unique Constraints

- {'name': 'UC_Invoice_UserProductId', 'columns': ['userProductId']}

### 1.7.6.0.0 Indexes

*No items available*

## 1.8.0.0.0 Address

### 1.8.1.0.0 Name

Address

### 1.8.2.0.0 Description

Stores structured address information, normalized from other entities.

### 1.8.3.0.0 Attributes

#### 1.8.3.1.0 Guid

##### 1.8.3.1.1 Name

addressId

##### 1.8.3.1.2 Type

🔹 Guid

##### 1.8.3.1.3 Is Required

✅ Yes

##### 1.8.3.1.4 Is Primary Key

✅ Yes

##### 1.8.3.1.5 Is Unique

✅ Yes

##### 1.8.3.1.6 Index Type

UniqueIndex

##### 1.8.3.1.7 Size

0

##### 1.8.3.1.8 Constraints

*No items available*

##### 1.8.3.1.9 Default Value

null

##### 1.8.3.1.10 Is Foreign Key

❌ No

##### 1.8.3.1.11 Precision

0

##### 1.8.3.1.12 Scale

0

#### 1.8.3.2.0 VARCHAR

##### 1.8.3.2.1 Name

street

##### 1.8.3.2.2 Type

🔹 VARCHAR

##### 1.8.3.2.3 Is Required

✅ Yes

##### 1.8.3.2.4 Is Primary Key

❌ No

##### 1.8.3.2.5 Is Unique

❌ No

##### 1.8.3.2.6 Index Type

None

##### 1.8.3.2.7 Size

255

##### 1.8.3.2.8 Constraints

*No items available*

##### 1.8.3.2.9 Default Value

null

##### 1.8.3.2.10 Is Foreign Key

❌ No

##### 1.8.3.2.11 Precision

0

##### 1.8.3.2.12 Scale

0

#### 1.8.3.3.0 VARCHAR

##### 1.8.3.3.1 Name

city

##### 1.8.3.3.2 Type

🔹 VARCHAR

##### 1.8.3.3.3 Is Required

✅ Yes

##### 1.8.3.3.4 Is Primary Key

❌ No

##### 1.8.3.3.5 Is Unique

❌ No

##### 1.8.3.3.6 Index Type

Index

##### 1.8.3.3.7 Size

100

##### 1.8.3.3.8 Constraints

*No items available*

##### 1.8.3.3.9 Default Value

null

##### 1.8.3.3.10 Is Foreign Key

❌ No

##### 1.8.3.3.11 Precision

0

##### 1.8.3.3.12 Scale

0

#### 1.8.3.4.0 VARCHAR

##### 1.8.3.4.1 Name

state

##### 1.8.3.4.2 Type

🔹 VARCHAR

##### 1.8.3.4.3 Is Required

✅ Yes

##### 1.8.3.4.4 Is Primary Key

❌ No

##### 1.8.3.4.5 Is Unique

❌ No

##### 1.8.3.4.6 Index Type

Index

##### 1.8.3.4.7 Size

100

##### 1.8.3.4.8 Constraints

*No items available*

##### 1.8.3.4.9 Default Value

null

##### 1.8.3.4.10 Is Foreign Key

❌ No

##### 1.8.3.4.11 Precision

0

##### 1.8.3.4.12 Scale

0

#### 1.8.3.5.0 VARCHAR

##### 1.8.3.5.1 Name

postalCode

##### 1.8.3.5.2 Type

🔹 VARCHAR

##### 1.8.3.5.3 Is Required

✅ Yes

##### 1.8.3.5.4 Is Primary Key

❌ No

##### 1.8.3.5.5 Is Unique

❌ No

##### 1.8.3.5.6 Index Type

Index

##### 1.8.3.5.7 Size

20

##### 1.8.3.5.8 Constraints

*No items available*

##### 1.8.3.5.9 Default Value

null

##### 1.8.3.5.10 Is Foreign Key

❌ No

##### 1.8.3.5.11 Precision

0

##### 1.8.3.5.12 Scale

0

#### 1.8.3.6.0 VARCHAR

##### 1.8.3.6.1 Name

country

##### 1.8.3.6.2 Type

🔹 VARCHAR

##### 1.8.3.6.3 Is Required

✅ Yes

##### 1.8.3.6.4 Is Primary Key

❌ No

##### 1.8.3.6.5 Is Unique

❌ No

##### 1.8.3.6.6 Index Type

Index

##### 1.8.3.6.7 Size

50

##### 1.8.3.6.8 Constraints

*No items available*

##### 1.8.3.6.9 Default Value

null

##### 1.8.3.6.10 Is Foreign Key

❌ No

##### 1.8.3.6.11 Precision

0

##### 1.8.3.6.12 Scale

0

### 1.8.4.0.0 Primary Keys

- addressId

### 1.8.5.0.0 Unique Constraints

*No items available*

### 1.8.6.0.0 Indexes

*No items available*

## 1.9.0.0.0 ServiceCenter

### 1.9.1.0.0 Name

ServiceCenter

### 1.9.2.0.0 Description

Represents a service center that handles repairs.

### 1.9.3.0.0 Attributes

#### 1.9.3.1.0 Guid

##### 1.9.3.1.1 Name

serviceCenterId

##### 1.9.3.1.2 Type

🔹 Guid

##### 1.9.3.1.3 Is Required

✅ Yes

##### 1.9.3.1.4 Is Primary Key

✅ Yes

##### 1.9.3.1.5 Is Unique

✅ Yes

##### 1.9.3.1.6 Index Type

UniqueIndex

##### 1.9.3.1.7 Size

0

##### 1.9.3.1.8 Constraints

*No items available*

##### 1.9.3.1.9 Default Value

null

##### 1.9.3.1.10 Is Foreign Key

❌ No

##### 1.9.3.1.11 Precision

0

##### 1.9.3.1.12 Scale

0

#### 1.9.3.2.0 VARCHAR

##### 1.9.3.2.1 Name

name

##### 1.9.3.2.2 Type

🔹 VARCHAR

##### 1.9.3.2.3 Is Required

✅ Yes

##### 1.9.3.2.4 Is Primary Key

❌ No

##### 1.9.3.2.5 Is Unique

❌ No

##### 1.9.3.2.6 Index Type

Index

##### 1.9.3.2.7 Size

200

##### 1.9.3.2.8 Constraints

*No items available*

##### 1.9.3.2.9 Default Value

null

##### 1.9.3.2.10 Is Foreign Key

❌ No

##### 1.9.3.2.11 Precision

0

##### 1.9.3.2.12 Scale

0

#### 1.9.3.3.0 Guid

##### 1.9.3.3.1 Name

addressId

##### 1.9.3.3.2 Type

🔹 Guid

##### 1.9.3.3.3 Is Required

✅ Yes

##### 1.9.3.3.4 Is Primary Key

❌ No

##### 1.9.3.3.5 Is Unique

✅ Yes

##### 1.9.3.3.6 Index Type

UniqueIndex

##### 1.9.3.3.7 Size

0

##### 1.9.3.3.8 Constraints

*No items available*

##### 1.9.3.3.9 Default Value

null

##### 1.9.3.3.10 Is Foreign Key

✅ Yes

##### 1.9.3.3.11 Precision

0

##### 1.9.3.3.12 Scale

0

#### 1.9.3.4.0 BOOLEAN

##### 1.9.3.4.1 Name

isDeleted

##### 1.9.3.4.2 Type

🔹 BOOLEAN

##### 1.9.3.4.3 Is Required

✅ Yes

##### 1.9.3.4.4 Is Primary Key

❌ No

##### 1.9.3.4.5 Is Unique

❌ No

##### 1.9.3.4.6 Index Type

Index

##### 1.9.3.4.7 Size

0

##### 1.9.3.4.8 Constraints

*No items available*

##### 1.9.3.4.9 Default Value

false

##### 1.9.3.4.10 Is Foreign Key

❌ No

##### 1.9.3.4.11 Precision

0

##### 1.9.3.4.12 Scale

0

#### 1.9.3.5.0 DateTime

##### 1.9.3.5.1 Name

createdAt

##### 1.9.3.5.2 Type

🔹 DateTime

##### 1.9.3.5.3 Is Required

✅ Yes

##### 1.9.3.5.4 Is Primary Key

❌ No

##### 1.9.3.5.5 Is Unique

❌ No

##### 1.9.3.5.6 Index Type

Index

##### 1.9.3.5.7 Size

0

##### 1.9.3.5.8 Constraints

*No items available*

##### 1.9.3.5.9 Default Value

CURRENT_TIMESTAMP

##### 1.9.3.5.10 Is Foreign Key

❌ No

##### 1.9.3.5.11 Precision

0

##### 1.9.3.5.12 Scale

0

#### 1.9.3.6.0 DateTime

##### 1.9.3.6.1 Name

updatedAt

##### 1.9.3.6.2 Type

🔹 DateTime

##### 1.9.3.6.3 Is Required

✅ Yes

##### 1.9.3.6.4 Is Primary Key

❌ No

##### 1.9.3.6.5 Is Unique

❌ No

##### 1.9.3.6.6 Index Type

None

##### 1.9.3.6.7 Size

0

##### 1.9.3.6.8 Constraints

*No items available*

##### 1.9.3.6.9 Default Value

CURRENT_TIMESTAMP

##### 1.9.3.6.10 Is Foreign Key

❌ No

##### 1.9.3.6.11 Precision

0

##### 1.9.3.6.12 Scale

0

### 1.9.4.0.0 Primary Keys

- serviceCenterId

### 1.9.5.0.0 Unique Constraints

*No items available*

### 1.9.6.0.0 Indexes

*No items available*

## 1.10.0.0.0 ServiceCenterBrand

### 1.10.1.0.0 Name

ServiceCenterBrand

### 1.10.2.0.0 Description

Associates service centers with the brands they are authorized to service (Many-to-Many). (REQ-FUNC-002)

### 1.10.3.0.0 Attributes

#### 1.10.3.1.0 Guid

##### 1.10.3.1.1 Name

serviceCenterId

##### 1.10.3.1.2 Type

🔹 Guid

##### 1.10.3.1.3 Is Required

✅ Yes

##### 1.10.3.1.4 Is Primary Key

✅ Yes

##### 1.10.3.1.5 Is Unique

❌ No

##### 1.10.3.1.6 Index Type

Index

##### 1.10.3.1.7 Size

0

##### 1.10.3.1.8 Constraints

*No items available*

##### 1.10.3.1.9 Default Value

null

##### 1.10.3.1.10 Is Foreign Key

✅ Yes

##### 1.10.3.1.11 Precision

0

##### 1.10.3.1.12 Scale

0

#### 1.10.3.2.0 Guid

##### 1.10.3.2.1 Name

brandId

##### 1.10.3.2.2 Type

🔹 Guid

##### 1.10.3.2.3 Is Required

✅ Yes

##### 1.10.3.2.4 Is Primary Key

✅ Yes

##### 1.10.3.2.5 Is Unique

❌ No

##### 1.10.3.2.6 Index Type

Index

##### 1.10.3.2.7 Size

0

##### 1.10.3.2.8 Constraints

*No items available*

##### 1.10.3.2.9 Default Value

null

##### 1.10.3.2.10 Is Foreign Key

✅ Yes

##### 1.10.3.2.11 Precision

0

##### 1.10.3.2.12 Scale

0

### 1.10.4.0.0 Primary Keys

- serviceCenterId
- brandId

### 1.10.5.0.0 Unique Constraints

*No items available*

### 1.10.6.0.0 Indexes

- {'name': 'IX_ServiceCenterBrand_BrandId', 'columns': ['brandId'], 'type': 'BTree'}

## 1.11.0.0.0 ServiceAreaPolygon

### 1.11.1.0.0 Name

ServiceAreaPolygon

### 1.11.2.0.0 Description

Stores geofenced polygon data for a service center's area. (REQ-FUNC-002)

### 1.11.3.0.0 Caching

| Property | Value |
|----------|-------|
| Strategy | ApplicationLevel |
| Provider | DistributedCache (e.g., Redis) |
| Scope | CompiledServiceAreaData |
| Invalidation Trigger | Update |

### 1.11.4.0.0 Attributes

#### 1.11.4.1.0 Guid

##### 1.11.4.1.1 Name

serviceAreaPolygonId

##### 1.11.4.1.2 Type

🔹 Guid

##### 1.11.4.1.3 Is Required

✅ Yes

##### 1.11.4.1.4 Is Primary Key

✅ Yes

##### 1.11.4.1.5 Is Unique

✅ Yes

##### 1.11.4.1.6 Index Type

UniqueIndex

##### 1.11.4.1.7 Size

0

##### 1.11.4.1.8 Constraints

*No items available*

##### 1.11.4.1.9 Default Value

null

##### 1.11.4.1.10 Is Foreign Key

❌ No

##### 1.11.4.1.11 Precision

0

##### 1.11.4.1.12 Scale

0

#### 1.11.4.2.0 Guid

##### 1.11.4.2.1 Name

serviceCenterId

##### 1.11.4.2.2 Type

🔹 Guid

##### 1.11.4.2.3 Is Required

✅ Yes

##### 1.11.4.2.4 Is Primary Key

❌ No

##### 1.11.4.2.5 Is Unique

❌ No

##### 1.11.4.2.6 Index Type

Index

##### 1.11.4.2.7 Size

0

##### 1.11.4.2.8 Constraints

*No items available*

##### 1.11.4.2.9 Default Value

null

##### 1.11.4.2.10 Is Foreign Key

✅ Yes

##### 1.11.4.2.11 Precision

0

##### 1.11.4.2.12 Scale

0

#### 1.11.4.3.0 GEOMETRY

##### 1.11.4.3.1 Name

polygonData

##### 1.11.4.3.2 Type

🔹 GEOMETRY

##### 1.11.4.3.3 Is Required

✅ Yes

##### 1.11.4.3.4 Is Primary Key

❌ No

##### 1.11.4.3.5 Is Unique

❌ No

##### 1.11.4.3.6 Index Type

Spatial

##### 1.11.4.3.7 Size

0

##### 1.11.4.3.8 Constraints

- POSTGIS_POLYGON_TYPE

##### 1.11.4.3.9 Default Value

null

##### 1.11.4.3.10 Is Foreign Key

❌ No

##### 1.11.4.3.11 Precision

0

##### 1.11.4.3.12 Scale

0

### 1.11.5.0.0 Primary Keys

- serviceAreaPolygonId

### 1.11.6.0.0 Unique Constraints

*No items available*

### 1.11.7.0.0 Indexes

#### 1.11.7.1.0 BTree

##### 1.11.7.1.1 Name

IX_ServiceAreaPolygon_ServiceCenterId

##### 1.11.7.1.2 Columns

- serviceCenterId

##### 1.11.7.1.3 Type

🔹 BTree

#### 1.11.7.2.0 GIST

##### 1.11.7.2.1 Name

SP_ServiceAreaPolygon_PolygonData

##### 1.11.7.2.2 Columns

- polygonData

##### 1.11.7.2.3 Type

🔹 GIST

## 1.12.0.0.0 ServiceAreaPostalCode

### 1.12.1.0.0 Name

ServiceAreaPostalCode

### 1.12.2.0.0 Description

Stores postal codes for a service center's area. (REQ-FUNC-002)

### 1.12.3.0.0 Caching

| Property | Value |
|----------|-------|
| Strategy | ApplicationLevel |
| Provider | DistributedCache (e.g., Redis) |
| Scope | CompiledServiceAreaData |
| Invalidation Trigger | Update |

### 1.12.4.0.0 Attributes

#### 1.12.4.1.0 Guid

##### 1.12.4.1.1 Name

serviceAreaPostalCodeId

##### 1.12.4.1.2 Type

🔹 Guid

##### 1.12.4.1.3 Is Required

✅ Yes

##### 1.12.4.1.4 Is Primary Key

✅ Yes

##### 1.12.4.1.5 Is Unique

✅ Yes

##### 1.12.4.1.6 Index Type

UniqueIndex

##### 1.12.4.1.7 Size

0

##### 1.12.4.1.8 Constraints

*No items available*

##### 1.12.4.1.9 Default Value

null

##### 1.12.4.1.10 Is Foreign Key

❌ No

##### 1.12.4.1.11 Precision

0

##### 1.12.4.1.12 Scale

0

#### 1.12.4.2.0 Guid

##### 1.12.4.2.1 Name

serviceCenterId

##### 1.12.4.2.2 Type

🔹 Guid

##### 1.12.4.2.3 Is Required

✅ Yes

##### 1.12.4.2.4 Is Primary Key

❌ No

##### 1.12.4.2.5 Is Unique

❌ No

##### 1.12.4.2.6 Index Type

Index

##### 1.12.4.2.7 Size

0

##### 1.12.4.2.8 Constraints

*No items available*

##### 1.12.4.2.9 Default Value

null

##### 1.12.4.2.10 Is Foreign Key

✅ Yes

##### 1.12.4.2.11 Precision

0

##### 1.12.4.2.12 Scale

0

#### 1.12.4.3.0 VARCHAR

##### 1.12.4.3.1 Name

postalCode

##### 1.12.4.3.2 Type

🔹 VARCHAR

##### 1.12.4.3.3 Is Required

✅ Yes

##### 1.12.4.3.4 Is Primary Key

❌ No

##### 1.12.4.3.5 Is Unique

❌ No

##### 1.12.4.3.6 Index Type

Index

##### 1.12.4.3.7 Size

20

##### 1.12.4.3.8 Constraints

*No items available*

##### 1.12.4.3.9 Default Value

null

##### 1.12.4.3.10 Is Foreign Key

❌ No

##### 1.12.4.3.11 Precision

0

##### 1.12.4.3.12 Scale

0

### 1.12.5.0.0 Primary Keys

- serviceAreaPostalCodeId

### 1.12.6.0.0 Unique Constraints

*No items available*

### 1.12.7.0.0 Indexes

- {'name': 'IX_ServiceAreaPostalCode_ServiceCenter_PostalCode', 'columns': ['serviceCenterId', 'postalCode'], 'type': 'BTree'}

## 1.13.0.0.0 IssueType

### 1.13.1.0.0 Name

IssueType

### 1.13.2.0.0 Description

A lookup table for common issue types reported in service requests. (REQ-FUNC-011)

### 1.13.3.0.0 Attributes

#### 1.13.3.1.0 Guid

##### 1.13.3.1.1 Name

issueTypeId

##### 1.13.3.1.2 Type

🔹 Guid

##### 1.13.3.1.3 Is Required

✅ Yes

##### 1.13.3.1.4 Is Primary Key

✅ Yes

##### 1.13.3.1.5 Is Unique

✅ Yes

##### 1.13.3.1.6 Index Type

UniqueIndex

##### 1.13.3.1.7 Size

0

##### 1.13.3.1.8 Constraints

*No items available*

##### 1.13.3.1.9 Default Value

null

##### 1.13.3.1.10 Is Foreign Key

❌ No

##### 1.13.3.1.11 Precision

0

##### 1.13.3.1.12 Scale

0

#### 1.13.3.2.0 VARCHAR

##### 1.13.3.2.1 Name

issueDescription

##### 1.13.3.2.2 Type

🔹 VARCHAR

##### 1.13.3.2.3 Is Required

✅ Yes

##### 1.13.3.2.4 Is Primary Key

❌ No

##### 1.13.3.2.5 Is Unique

✅ Yes

##### 1.13.3.2.6 Index Type

UniqueIndex

##### 1.13.3.2.7 Size

255

##### 1.13.3.2.8 Constraints

*No items available*

##### 1.13.3.2.9 Default Value

null

##### 1.13.3.2.10 Is Foreign Key

❌ No

##### 1.13.3.2.11 Precision

0

##### 1.13.3.2.12 Scale

0

#### 1.13.3.3.0 BOOLEAN

##### 1.13.3.3.1 Name

isActive

##### 1.13.3.3.2 Type

🔹 BOOLEAN

##### 1.13.3.3.3 Is Required

✅ Yes

##### 1.13.3.3.4 Is Primary Key

❌ No

##### 1.13.3.3.5 Is Unique

❌ No

##### 1.13.3.3.6 Index Type

Index

##### 1.13.3.3.7 Size

0

##### 1.13.3.3.8 Constraints

*No items available*

##### 1.13.3.3.9 Default Value

true

##### 1.13.3.3.10 Is Foreign Key

❌ No

##### 1.13.3.3.11 Precision

0

##### 1.13.3.3.12 Scale

0

### 1.13.4.0.0 Primary Keys

- issueTypeId

### 1.13.5.0.0 Unique Constraints

- {'name': 'UC_IssueType_IssueDescription', 'columns': ['issueDescription']}

### 1.13.6.0.0 Indexes

*No items available*

## 1.14.0.0.0 ServiceRequest

### 1.14.1.0.0 Name

ServiceRequest

### 1.14.2.0.0 Description

Represents a single service request ticket. (REQ-FUNC-007, REQ-FUNC-008)

### 1.14.3.0.0 Attributes

#### 1.14.3.1.0 Guid

##### 1.14.3.1.1 Name

serviceRequestId

##### 1.14.3.1.2 Type

🔹 Guid

##### 1.14.3.1.3 Is Required

✅ Yes

##### 1.14.3.1.4 Is Primary Key

✅ Yes

##### 1.14.3.1.5 Is Unique

✅ Yes

##### 1.14.3.1.6 Index Type

UniqueIndex

##### 1.14.3.1.7 Size

0

##### 1.14.3.1.8 Constraints

*No items available*

##### 1.14.3.1.9 Default Value

null

##### 1.14.3.1.10 Is Foreign Key

❌ No

##### 1.14.3.1.11 Precision

0

##### 1.14.3.1.12 Scale

0

#### 1.14.3.2.0 Guid

##### 1.14.3.2.1 Name

userProductId

##### 1.14.3.2.2 Type

🔹 Guid

##### 1.14.3.2.3 Is Required

✅ Yes

##### 1.14.3.2.4 Is Primary Key

❌ No

##### 1.14.3.2.5 Is Unique

❌ No

##### 1.14.3.2.6 Index Type

Index

##### 1.14.3.2.7 Size

0

##### 1.14.3.2.8 Constraints

*No items available*

##### 1.14.3.2.9 Default Value

null

##### 1.14.3.2.10 Is Foreign Key

✅ Yes

##### 1.14.3.2.11 Precision

0

##### 1.14.3.2.12 Scale

0

#### 1.14.3.3.0 Guid

##### 1.14.3.3.1 Name

brandId

##### 1.14.3.3.2 Type

🔹 Guid

##### 1.14.3.3.3 Is Required

✅ Yes

##### 1.14.3.3.4 Is Primary Key

❌ No

##### 1.14.3.3.5 Is Unique

❌ No

##### 1.14.3.3.6 Index Type

Index

##### 1.14.3.3.7 Size

0

##### 1.14.3.3.8 Constraints

*No items available*

##### 1.14.3.3.9 Default Value

null

##### 1.14.3.3.10 Is Foreign Key

✅ Yes

##### 1.14.3.3.11 Precision

0

##### 1.14.3.3.12 Scale

0

#### 1.14.3.4.0 Guid

##### 1.14.3.4.1 Name

productModelId

##### 1.14.3.4.2 Type

🔹 Guid

##### 1.14.3.4.3 Is Required

✅ Yes

##### 1.14.3.4.4 Is Primary Key

❌ No

##### 1.14.3.4.5 Is Unique

❌ No

##### 1.14.3.4.6 Index Type

Index

##### 1.14.3.4.7 Size

0

##### 1.14.3.4.8 Constraints

*No items available*

##### 1.14.3.4.9 Default Value

null

##### 1.14.3.4.10 Is Foreign Key

✅ Yes

##### 1.14.3.4.11 Precision

0

##### 1.14.3.4.12 Scale

0

#### 1.14.3.5.0 Guid

##### 1.14.3.5.1 Name

serviceCenterId

##### 1.14.3.5.2 Type

🔹 Guid

##### 1.14.3.5.3 Is Required

✅ Yes

##### 1.14.3.5.4 Is Primary Key

❌ No

##### 1.14.3.5.5 Is Unique

❌ No

##### 1.14.3.5.6 Index Type

Index

##### 1.14.3.5.7 Size

0

##### 1.14.3.5.8 Constraints

*No items available*

##### 1.14.3.5.9 Default Value

null

##### 1.14.3.5.10 Is Foreign Key

✅ Yes

##### 1.14.3.5.11 Precision

0

##### 1.14.3.5.12 Scale

0

#### 1.14.3.6.0 Guid

##### 1.14.3.6.1 Name

assignedTechnicianId

##### 1.14.3.6.2 Type

🔹 Guid

##### 1.14.3.6.3 Is Required

❌ No

##### 1.14.3.6.4 Is Primary Key

❌ No

##### 1.14.3.6.5 Is Unique

❌ No

##### 1.14.3.6.6 Index Type

Index

##### 1.14.3.6.7 Size

0

##### 1.14.3.6.8 Constraints

*No items available*

##### 1.14.3.6.9 Default Value

null

##### 1.14.3.6.10 Is Foreign Key

✅ Yes

##### 1.14.3.6.11 Precision

0

##### 1.14.3.6.12 Scale

0

#### 1.14.3.7.0 Guid

##### 1.14.3.7.1 Name

issueTypeId

##### 1.14.3.7.2 Type

🔹 Guid

##### 1.14.3.7.3 Is Required

✅ Yes

##### 1.14.3.7.4 Is Primary Key

❌ No

##### 1.14.3.7.5 Is Unique

❌ No

##### 1.14.3.7.6 Index Type

Index

##### 1.14.3.7.7 Size

0

##### 1.14.3.7.8 Constraints

*No items available*

##### 1.14.3.7.9 Default Value

null

##### 1.14.3.7.10 Is Foreign Key

✅ Yes

##### 1.14.3.7.11 Precision

0

##### 1.14.3.7.12 Scale

0

#### 1.14.3.8.0 TEXT

##### 1.14.3.8.1 Name

issueDescription

##### 1.14.3.8.2 Type

🔹 TEXT

##### 1.14.3.8.3 Is Required

❌ No

##### 1.14.3.8.4 Is Primary Key

❌ No

##### 1.14.3.8.5 Is Unique

❌ No

##### 1.14.3.8.6 Index Type

None

##### 1.14.3.8.7 Size

0

##### 1.14.3.8.8 Constraints

*No items available*

##### 1.14.3.8.9 Default Value

null

##### 1.14.3.8.10 Is Foreign Key

❌ No

##### 1.14.3.8.11 Precision

0

##### 1.14.3.8.12 Scale

0

#### 1.14.3.9.0 VARCHAR

##### 1.14.3.9.1 Name

status

##### 1.14.3.9.2 Type

🔹 VARCHAR

##### 1.14.3.9.3 Is Required

✅ Yes

##### 1.14.3.9.4 Is Primary Key

❌ No

##### 1.14.3.9.5 Is Unique

❌ No

##### 1.14.3.9.6 Index Type

Index

##### 1.14.3.9.7 Size

30

##### 1.14.3.9.8 Constraints

- ENUM('Created', 'Assigned', 'In-Progress', 'Resolved', 'Disputed', 'Closed')

##### 1.14.3.9.9 Default Value

'Created'

##### 1.14.3.9.10 Is Foreign Key

❌ No

##### 1.14.3.9.11 Precision

0

##### 1.14.3.9.12 Scale

0

#### 1.14.3.10.0 DateTime

##### 1.14.3.10.1 Name

resolvedAt

##### 1.14.3.10.2 Type

🔹 DateTime

##### 1.14.3.10.3 Is Required

❌ No

##### 1.14.3.10.4 Is Primary Key

❌ No

##### 1.14.3.10.5 Is Unique

❌ No

##### 1.14.3.10.6 Index Type

Index

##### 1.14.3.10.7 Size

0

##### 1.14.3.10.8 Constraints

*No items available*

##### 1.14.3.10.9 Default Value

null

##### 1.14.3.10.10 Is Foreign Key

❌ No

##### 1.14.3.10.11 Precision

0

##### 1.14.3.10.12 Scale

0

#### 1.14.3.11.0 BOOLEAN

##### 1.14.3.11.1 Name

isDeleted

##### 1.14.3.11.2 Type

🔹 BOOLEAN

##### 1.14.3.11.3 Is Required

✅ Yes

##### 1.14.3.11.4 Is Primary Key

❌ No

##### 1.14.3.11.5 Is Unique

❌ No

##### 1.14.3.11.6 Index Type

Index

##### 1.14.3.11.7 Size

0

##### 1.14.3.11.8 Constraints

*No items available*

##### 1.14.3.11.9 Default Value

false

##### 1.14.3.11.10 Is Foreign Key

❌ No

##### 1.14.3.11.11 Precision

0

##### 1.14.3.11.12 Scale

0

#### 1.14.3.12.0 DateTime

##### 1.14.3.12.1 Name

createdAt

##### 1.14.3.12.2 Type

🔹 DateTime

##### 1.14.3.12.3 Is Required

✅ Yes

##### 1.14.3.12.4 Is Primary Key

❌ No

##### 1.14.3.12.5 Is Unique

❌ No

##### 1.14.3.12.6 Index Type

Index

##### 1.14.3.12.7 Size

0

##### 1.14.3.12.8 Constraints

*No items available*

##### 1.14.3.12.9 Default Value

CURRENT_TIMESTAMP

##### 1.14.3.12.10 Is Foreign Key

❌ No

##### 1.14.3.12.11 Precision

0

##### 1.14.3.12.12 Scale

0

#### 1.14.3.13.0 DateTime

##### 1.14.3.13.1 Name

updatedAt

##### 1.14.3.13.2 Type

🔹 DateTime

##### 1.14.3.13.3 Is Required

✅ Yes

##### 1.14.3.13.4 Is Primary Key

❌ No

##### 1.14.3.13.5 Is Unique

❌ No

##### 1.14.3.13.6 Index Type

None

##### 1.14.3.13.7 Size

0

##### 1.14.3.13.8 Constraints

*No items available*

##### 1.14.3.13.9 Default Value

CURRENT_TIMESTAMP

##### 1.14.3.13.10 Is Foreign Key

❌ No

##### 1.14.3.13.11 Precision

0

##### 1.14.3.13.12 Scale

0

### 1.14.4.0.0 Primary Keys

- serviceRequestId

### 1.14.5.0.0 Unique Constraints

*No items available*

### 1.14.6.0.0 Indexes

#### 1.14.6.1.0 BTree

##### 1.14.6.1.1 Name

IX_ServiceRequest_UserProduct

##### 1.14.6.1.2 Columns

- userProductId

##### 1.14.6.1.3 Type

🔹 BTree

#### 1.14.6.2.0 BTree

##### 1.14.6.2.1 Name

IX_ServiceRequest_ServiceCenter

##### 1.14.6.2.2 Columns

- serviceCenterId

##### 1.14.6.2.3 Type

🔹 BTree

#### 1.14.6.3.0 BTree

##### 1.14.6.3.1 Name

IX_ServiceRequest_Technician

##### 1.14.6.3.2 Columns

- assignedTechnicianId

##### 1.14.6.3.3 Type

🔹 BTree

#### 1.14.6.4.0 BTree

##### 1.14.6.4.1 Name

IX_ServiceRequest_Status_Date

##### 1.14.6.4.2 Columns

- status
- createdAt

##### 1.14.6.4.3 Type

🔹 BTree

#### 1.14.6.5.0 BTree

##### 1.14.6.5.1 Name

IX_ServiceRequest_Status_ResolvedAt

##### 1.14.6.5.2 Columns

- status
- resolvedAt

##### 1.14.6.5.3 Type

🔹 BTree

#### 1.14.6.6.0 BTree

##### 1.14.6.6.1 Name

IX_ServiceRequest_BrandId

##### 1.14.6.6.2 Columns

- brandId

##### 1.14.6.6.3 Type

🔹 BTree

#### 1.14.6.7.0 BTree

##### 1.14.6.7.1 Name

IX_ServiceRequest_ProductModelId

##### 1.14.6.7.2 Columns

- productModelId

##### 1.14.6.7.3 Type

🔹 BTree

## 1.15.0.0.0 ChatMessage

### 1.15.1.0.0 Name

ChatMessage

### 1.15.2.0.0 Description

Stores a single message within a service request's chat. (REQ-FUNC-007)

### 1.15.3.0.0 Partitioning

| Property | Value |
|----------|-------|
| Strategy | RANGE |
| Column | sentAt |
| Interval | MONTHLY |

### 1.15.4.0.0 Attributes

#### 1.15.4.1.0 Guid

##### 1.15.4.1.1 Name

chatMessageId

##### 1.15.4.1.2 Type

🔹 Guid

##### 1.15.4.1.3 Is Required

✅ Yes

##### 1.15.4.1.4 Is Primary Key

✅ Yes

##### 1.15.4.1.5 Is Unique

✅ Yes

##### 1.15.4.1.6 Index Type

UniqueIndex

##### 1.15.4.1.7 Size

0

##### 1.15.4.1.8 Constraints

*No items available*

##### 1.15.4.1.9 Default Value

null

##### 1.15.4.1.10 Is Foreign Key

❌ No

##### 1.15.4.1.11 Precision

0

##### 1.15.4.1.12 Scale

0

#### 1.15.4.2.0 Guid

##### 1.15.4.2.1 Name

serviceRequestId

##### 1.15.4.2.2 Type

🔹 Guid

##### 1.15.4.2.3 Is Required

✅ Yes

##### 1.15.4.2.4 Is Primary Key

❌ No

##### 1.15.4.2.5 Is Unique

❌ No

##### 1.15.4.2.6 Index Type

Index

##### 1.15.4.2.7 Size

0

##### 1.15.4.2.8 Constraints

*No items available*

##### 1.15.4.2.9 Default Value

null

##### 1.15.4.2.10 Is Foreign Key

✅ Yes

##### 1.15.4.2.11 Precision

0

##### 1.15.4.2.12 Scale

0

#### 1.15.4.3.0 Guid

##### 1.15.4.3.1 Name

senderId

##### 1.15.4.3.2 Type

🔹 Guid

##### 1.15.4.3.3 Is Required

✅ Yes

##### 1.15.4.3.4 Is Primary Key

❌ No

##### 1.15.4.3.5 Is Unique

❌ No

##### 1.15.4.3.6 Index Type

Index

##### 1.15.4.3.7 Size

0

##### 1.15.4.3.8 Constraints

*No items available*

##### 1.15.4.3.9 Default Value

null

##### 1.15.4.3.10 Is Foreign Key

✅ Yes

##### 1.15.4.3.11 Precision

0

##### 1.15.4.3.12 Scale

0

#### 1.15.4.4.0 TEXT

##### 1.15.4.4.1 Name

messageText

##### 1.15.4.4.2 Type

🔹 TEXT

##### 1.15.4.4.3 Is Required

✅ Yes

##### 1.15.4.4.4 Is Primary Key

❌ No

##### 1.15.4.4.5 Is Unique

❌ No

##### 1.15.4.4.6 Index Type

None

##### 1.15.4.4.7 Size

0

##### 1.15.4.4.8 Constraints

*No items available*

##### 1.15.4.4.9 Default Value

null

##### 1.15.4.4.10 Is Foreign Key

❌ No

##### 1.15.4.4.11 Precision

0

##### 1.15.4.4.12 Scale

0

#### 1.15.4.5.0 DateTime

##### 1.15.4.5.1 Name

sentAt

##### 1.15.4.5.2 Type

🔹 DateTime

##### 1.15.4.5.3 Is Required

✅ Yes

##### 1.15.4.5.4 Is Primary Key

❌ No

##### 1.15.4.5.5 Is Unique

❌ No

##### 1.15.4.5.6 Index Type

Index

##### 1.15.4.5.7 Size

0

##### 1.15.4.5.8 Constraints

*No items available*

##### 1.15.4.5.9 Default Value

CURRENT_TIMESTAMP

##### 1.15.4.5.10 Is Foreign Key

❌ No

##### 1.15.4.5.11 Precision

0

##### 1.15.4.5.12 Scale

0

### 1.15.5.0.0 Primary Keys

- chatMessageId
- sentAt

### 1.15.6.0.0 Unique Constraints

*No items available*

### 1.15.7.0.0 Indexes

- {'name': 'IX_ChatMessage_ServiceRequest_SentAt', 'columns': ['serviceRequestId', 'sentAt'], 'type': 'BTree'}

## 1.16.0.0.0 GpsLocationHistory

### 1.16.1.0.0 Name

GpsLocationHistory

### 1.16.2.0.0 Description

Stores transient real-time GPS location of a technician in 'Travel Mode'. Data should be purged periodically. (REQ-FUNC-009)

### 1.16.3.0.0 Partitioning

| Property | Value |
|----------|-------|
| Strategy | RANGE |
| Column | timestamp |
| Interval | DAILY |

### 1.16.4.0.0 Attributes

#### 1.16.4.1.0 BIGSERIAL

##### 1.16.4.1.1 Name

locationId

##### 1.16.4.1.2 Type

🔹 BIGSERIAL

##### 1.16.4.1.3 Is Required

✅ Yes

##### 1.16.4.1.4 Is Primary Key

✅ Yes

##### 1.16.4.1.5 Is Unique

✅ Yes

##### 1.16.4.1.6 Index Type

UniqueIndex

##### 1.16.4.1.7 Size

0

##### 1.16.4.1.8 Constraints

*No items available*

##### 1.16.4.1.9 Default Value

null

##### 1.16.4.1.10 Is Foreign Key

❌ No

##### 1.16.4.1.11 Precision

0

##### 1.16.4.1.12 Scale

0

#### 1.16.4.2.0 Guid

##### 1.16.4.2.1 Name

serviceRequestId

##### 1.16.4.2.2 Type

🔹 Guid

##### 1.16.4.2.3 Is Required

✅ Yes

##### 1.16.4.2.4 Is Primary Key

❌ No

##### 1.16.4.2.5 Is Unique

❌ No

##### 1.16.4.2.6 Index Type

Index

##### 1.16.4.2.7 Size

0

##### 1.16.4.2.8 Constraints

*No items available*

##### 1.16.4.2.9 Default Value

null

##### 1.16.4.2.10 Is Foreign Key

✅ Yes

##### 1.16.4.2.11 Precision

0

##### 1.16.4.2.12 Scale

0

#### 1.16.4.3.0 Guid

##### 1.16.4.3.1 Name

technicianId

##### 1.16.4.3.2 Type

🔹 Guid

##### 1.16.4.3.3 Is Required

✅ Yes

##### 1.16.4.3.4 Is Primary Key

❌ No

##### 1.16.4.3.5 Is Unique

❌ No

##### 1.16.4.3.6 Index Type

Index

##### 1.16.4.3.7 Size

0

##### 1.16.4.3.8 Constraints

*No items available*

##### 1.16.4.3.9 Default Value

null

##### 1.16.4.3.10 Is Foreign Key

✅ Yes

##### 1.16.4.3.11 Precision

0

##### 1.16.4.3.12 Scale

0

#### 1.16.4.4.0 GEOGRAPHY

##### 1.16.4.4.1 Name

location

##### 1.16.4.4.2 Type

🔹 GEOGRAPHY

##### 1.16.4.4.3 Is Required

✅ Yes

##### 1.16.4.4.4 Is Primary Key

❌ No

##### 1.16.4.4.5 Is Unique

❌ No

##### 1.16.4.4.6 Index Type

Spatial

##### 1.16.4.4.7 Size

0

##### 1.16.4.4.8 Constraints

- POSTGIS_POINT_TYPE

##### 1.16.4.4.9 Default Value

null

##### 1.16.4.4.10 Is Foreign Key

❌ No

##### 1.16.4.4.11 Precision

0

##### 1.16.4.4.12 Scale

0

#### 1.16.4.5.0 DateTime

##### 1.16.4.5.1 Name

timestamp

##### 1.16.4.5.2 Type

🔹 DateTime

##### 1.16.4.5.3 Is Required

✅ Yes

##### 1.16.4.5.4 Is Primary Key

❌ No

##### 1.16.4.5.5 Is Unique

❌ No

##### 1.16.4.5.6 Index Type

Index

##### 1.16.4.5.7 Size

0

##### 1.16.4.5.8 Constraints

*No items available*

##### 1.16.4.5.9 Default Value

CURRENT_TIMESTAMP

##### 1.16.4.5.10 Is Foreign Key

❌ No

##### 1.16.4.5.11 Precision

0

##### 1.16.4.5.12 Scale

0

### 1.16.5.0.0 Primary Keys

- locationId
- timestamp

### 1.16.6.0.0 Unique Constraints

*No items available*

### 1.16.7.0.0 Indexes

#### 1.16.7.1.0 BTree

##### 1.16.7.1.1 Name

IX_GpsLocationHistory_ServiceRequest_Timestamp

##### 1.16.7.1.2 Columns

- serviceRequestId
- timestamp

##### 1.16.7.1.3 Type

🔹 BTree

#### 1.16.7.2.0 GIST

##### 1.16.7.2.1 Name

SP_GpsLocationHistory_Location

##### 1.16.7.2.2 Columns

- location

##### 1.16.7.2.3 Type

🔹 GIST

## 1.17.0.0.0 CustomerSignature

### 1.17.1.0.0 Name

CustomerSignature

### 1.17.2.0.0 Description

Stores the customer's digital signature as proof of completion. (REQ-FUNC-010)

### 1.17.3.0.0 Attributes

#### 1.17.3.1.0 Guid

##### 1.17.3.1.1 Name

signatureId

##### 1.17.3.1.2 Type

🔹 Guid

##### 1.17.3.1.3 Is Required

✅ Yes

##### 1.17.3.1.4 Is Primary Key

✅ Yes

##### 1.17.3.1.5 Is Unique

✅ Yes

##### 1.17.3.1.6 Index Type

UniqueIndex

##### 1.17.3.1.7 Size

0

##### 1.17.3.1.8 Constraints

*No items available*

##### 1.17.3.1.9 Default Value

null

##### 1.17.3.1.10 Is Foreign Key

❌ No

##### 1.17.3.1.11 Precision

0

##### 1.17.3.1.12 Scale

0

#### 1.17.3.2.0 Guid

##### 1.17.3.2.1 Name

serviceRequestId

##### 1.17.3.2.2 Type

🔹 Guid

##### 1.17.3.2.3 Is Required

✅ Yes

##### 1.17.3.2.4 Is Primary Key

❌ No

##### 1.17.3.2.5 Is Unique

✅ Yes

##### 1.17.3.2.6 Index Type

UniqueIndex

##### 1.17.3.2.7 Size

0

##### 1.17.3.2.8 Constraints

*No items available*

##### 1.17.3.2.9 Default Value

null

##### 1.17.3.2.10 Is Foreign Key

✅ Yes

##### 1.17.3.2.11 Precision

0

##### 1.17.3.2.12 Scale

0

#### 1.17.3.3.0 VARCHAR

##### 1.17.3.3.1 Name

imageUrl

##### 1.17.3.3.2 Type

🔹 VARCHAR

##### 1.17.3.3.3 Is Required

✅ Yes

##### 1.17.3.3.4 Is Primary Key

❌ No

##### 1.17.3.3.5 Is Unique

❌ No

##### 1.17.3.3.6 Index Type

None

##### 1.17.3.3.7 Size

512

##### 1.17.3.3.8 Constraints

*No items available*

##### 1.17.3.3.9 Default Value

null

##### 1.17.3.3.10 Is Foreign Key

❌ No

##### 1.17.3.3.11 Precision

0

##### 1.17.3.3.12 Scale

0

#### 1.17.3.4.0 DateTime

##### 1.17.3.4.1 Name

signedAt

##### 1.17.3.4.2 Type

🔹 DateTime

##### 1.17.3.4.3 Is Required

✅ Yes

##### 1.17.3.4.4 Is Primary Key

❌ No

##### 1.17.3.4.5 Is Unique

❌ No

##### 1.17.3.4.6 Index Type

Index

##### 1.17.3.4.7 Size

0

##### 1.17.3.4.8 Constraints

*No items available*

##### 1.17.3.4.9 Default Value

CURRENT_TIMESTAMP

##### 1.17.3.4.10 Is Foreign Key

❌ No

##### 1.17.3.4.11 Precision

0

##### 1.17.3.4.12 Scale

0

### 1.17.4.0.0 Primary Keys

- signatureId

### 1.17.5.0.0 Unique Constraints

- {'name': 'UC_CustomerSignature_ServiceRequestId', 'columns': ['serviceRequestId']}

### 1.17.6.0.0 Indexes

*No items available*

## 1.18.0.0.0 AuditLog

### 1.18.1.0.0 Name

AuditLog

### 1.18.2.0.0 Description

Records critical actions in an immutable audit trail. (REQ-AUDIT-001)

### 1.18.3.0.0 Partitioning

| Property | Value |
|----------|-------|
| Strategy | RANGE |
| Column | timestamp |
| Interval | MONTHLY |

### 1.18.4.0.0 Attributes

#### 1.18.4.1.0 BIGSERIAL

##### 1.18.4.1.1 Name

auditLogId

##### 1.18.4.1.2 Type

🔹 BIGSERIAL

##### 1.18.4.1.3 Is Required

✅ Yes

##### 1.18.4.1.4 Is Primary Key

✅ Yes

##### 1.18.4.1.5 Is Unique

✅ Yes

##### 1.18.4.1.6 Index Type

UniqueIndex

##### 1.18.4.1.7 Size

0

##### 1.18.4.1.8 Constraints

*No items available*

##### 1.18.4.1.9 Default Value

null

##### 1.18.4.1.10 Is Foreign Key

❌ No

##### 1.18.4.1.11 Precision

0

##### 1.18.4.1.12 Scale

0

#### 1.18.4.2.0 Guid

##### 1.18.4.2.1 Name

userId

##### 1.18.4.2.2 Type

🔹 Guid

##### 1.18.4.2.3 Is Required

❌ No

##### 1.18.4.2.4 Is Primary Key

❌ No

##### 1.18.4.2.5 Is Unique

❌ No

##### 1.18.4.2.6 Index Type

Index

##### 1.18.4.2.7 Size

0

##### 1.18.4.2.8 Constraints

*No items available*

##### 1.18.4.2.9 Default Value

null

##### 1.18.4.2.10 Is Foreign Key

✅ Yes

##### 1.18.4.2.11 Precision

0

##### 1.18.4.2.12 Scale

0

#### 1.18.4.3.0 VARCHAR

##### 1.18.4.3.1 Name

actionType

##### 1.18.4.3.2 Type

🔹 VARCHAR

##### 1.18.4.3.3 Is Required

✅ Yes

##### 1.18.4.3.4 Is Primary Key

❌ No

##### 1.18.4.3.5 Is Unique

❌ No

##### 1.18.4.3.6 Index Type

Index

##### 1.18.4.3.7 Size

100

##### 1.18.4.3.8 Constraints

*No items available*

##### 1.18.4.3.9 Default Value

null

##### 1.18.4.3.10 Is Foreign Key

❌ No

##### 1.18.4.3.11 Precision

0

##### 1.18.4.3.12 Scale

0

#### 1.18.4.4.0 VARCHAR

##### 1.18.4.4.1 Name

targetEntity

##### 1.18.4.4.2 Type

🔹 VARCHAR

##### 1.18.4.4.3 Is Required

✅ Yes

##### 1.18.4.4.4 Is Primary Key

❌ No

##### 1.18.4.4.5 Is Unique

❌ No

##### 1.18.4.4.6 Index Type

Index

##### 1.18.4.4.7 Size

100

##### 1.18.4.4.8 Constraints

*No items available*

##### 1.18.4.4.9 Default Value

null

##### 1.18.4.4.10 Is Foreign Key

❌ No

##### 1.18.4.4.11 Precision

0

##### 1.18.4.4.12 Scale

0

#### 1.18.4.5.0 VARCHAR

##### 1.18.4.5.1 Name

targetEntityId

##### 1.18.4.5.2 Type

🔹 VARCHAR

##### 1.18.4.5.3 Is Required

✅ Yes

##### 1.18.4.5.4 Is Primary Key

❌ No

##### 1.18.4.5.5 Is Unique

❌ No

##### 1.18.4.5.6 Index Type

Index

##### 1.18.4.5.7 Size

100

##### 1.18.4.5.8 Constraints

*No items available*

##### 1.18.4.5.9 Default Value

null

##### 1.18.4.5.10 Is Foreign Key

❌ No

##### 1.18.4.5.11 Precision

0

##### 1.18.4.5.12 Scale

0

#### 1.18.4.6.0 JSONB

##### 1.18.4.6.1 Name

changeDetails

##### 1.18.4.6.2 Type

🔹 JSONB

##### 1.18.4.6.3 Is Required

❌ No

##### 1.18.4.6.4 Is Primary Key

❌ No

##### 1.18.4.6.5 Is Unique

❌ No

##### 1.18.4.6.6 Index Type

GIN

##### 1.18.4.6.7 Size

0

##### 1.18.4.6.8 Constraints

*No items available*

##### 1.18.4.6.9 Default Value

null

##### 1.18.4.6.10 Is Foreign Key

❌ No

##### 1.18.4.6.11 Precision

0

##### 1.18.4.6.12 Scale

0

#### 1.18.4.7.0 DateTime

##### 1.18.4.7.1 Name

timestamp

##### 1.18.4.7.2 Type

🔹 DateTime

##### 1.18.4.7.3 Is Required

✅ Yes

##### 1.18.4.7.4 Is Primary Key

❌ No

##### 1.18.4.7.5 Is Unique

❌ No

##### 1.18.4.7.6 Index Type

Index

##### 1.18.4.7.7 Size

0

##### 1.18.4.7.8 Constraints

*No items available*

##### 1.18.4.7.9 Default Value

CURRENT_TIMESTAMP

##### 1.18.4.7.10 Is Foreign Key

❌ No

##### 1.18.4.7.11 Precision

0

##### 1.18.4.7.12 Scale

0

### 1.18.5.0.0 Primary Keys

- auditLogId
- timestamp

### 1.18.6.0.0 Unique Constraints

*No items available*

### 1.18.7.0.0 Indexes

#### 1.18.7.1.0 BTree

##### 1.18.7.1.1 Name

IX_AuditLog_Target

##### 1.18.7.1.2 Columns

- targetEntity
- targetEntityId

##### 1.18.7.1.3 Type

🔹 BTree

#### 1.18.7.2.0 BTree

##### 1.18.7.2.1 Name

IX_AuditLog_Timestamp

##### 1.18.7.2.2 Columns

- timestamp

##### 1.18.7.2.3 Type

🔹 BTree

#### 1.18.7.3.0 GIN

##### 1.18.7.3.1 Name

IX_AuditLog_ChangeDetails_GIN

##### 1.18.7.3.2 Columns

- changeDetails

##### 1.18.7.3.3 Type

🔹 GIN

# 2.0.0.0.0 Relations

## 2.1.0.0.0 Composition

### 2.1.1.0.0 Name

UserDevices

### 2.1.2.0.0 Id

REL_USER_DEVICE_001

### 2.1.3.0.0 Source Entity

User

### 2.1.4.0.0 Target Entity

Device

### 2.1.5.0.0 Type

🔹 Composition

### 2.1.6.0.0 Source Multiplicity

1

### 2.1.7.0.0 Target Multiplicity

0..*

### 2.1.8.0.0 Cascade Delete

✅ Yes

### 2.1.9.0.0 Is Identifying

❌ No

### 2.1.10.0.0 On Delete

Cascade

### 2.1.11.0.0 On Update

Cascade

## 2.2.0.0.0 OneToMany

### 2.2.1.0.0 Name

UserOwnedProducts

### 2.2.2.0.0 Id

REL_USER_USERPRODUCT_002

### 2.2.3.0.0 Source Entity

User

### 2.2.4.0.0 Target Entity

UserProduct

### 2.2.5.0.0 Type

🔹 OneToMany

### 2.2.6.0.0 Source Multiplicity

1

### 2.2.7.0.0 Target Multiplicity

0..*

### 2.2.8.0.0 Cascade Delete

❌ No

### 2.2.9.0.0 Is Identifying

❌ No

### 2.2.10.0.0 On Delete

Restrict

### 2.2.11.0.0 On Update

Cascade

## 2.3.0.0.0 OneToMany

### 2.3.1.0.0 Name

UserInitiatedTransfers

### 2.3.2.0.0 Id

REL_USER_OWNERSHIPTRANSFERREQUEST_003

### 2.3.3.0.0 Source Entity

User

### 2.3.4.0.0 Target Entity

OwnershipTransferRequest

### 2.3.5.0.0 Type

🔹 OneToMany

### 2.3.6.0.0 Source Multiplicity

1

### 2.3.7.0.0 Target Multiplicity

0..*

### 2.3.8.0.0 Cascade Delete

❌ No

### 2.3.9.0.0 Is Identifying

❌ No

### 2.3.10.0.0 On Delete

Cascade

### 2.3.11.0.0 On Update

Cascade

## 2.4.0.0.0 OneToMany

### 2.4.1.0.0 Name

TechnicianAssignments

### 2.4.2.0.0 Id

REL_USER_SERVICEREQUEST_004

### 2.4.3.0.0 Source Entity

User

### 2.4.4.0.0 Target Entity

ServiceRequest

### 2.4.5.0.0 Type

🔹 OneToMany

### 2.4.6.0.0 Source Multiplicity

1

### 2.4.7.0.0 Target Multiplicity

0..*

### 2.4.8.0.0 Cascade Delete

❌ No

### 2.4.9.0.0 Is Identifying

❌ No

### 2.4.10.0.0 On Delete

SetNull

### 2.4.11.0.0 On Update

Cascade

## 2.5.0.0.0 OneToMany

### 2.5.1.0.0 Name

UserSentMessages

### 2.5.2.0.0 Id

REL_USER_CHATMESSAGE_005

### 2.5.3.0.0 Source Entity

User

### 2.5.4.0.0 Target Entity

ChatMessage

### 2.5.5.0.0 Type

🔹 OneToMany

### 2.5.6.0.0 Source Multiplicity

1

### 2.5.7.0.0 Target Multiplicity

0..*

### 2.5.8.0.0 Cascade Delete

❌ No

### 2.5.9.0.0 Is Identifying

❌ No

### 2.5.10.0.0 On Delete

Restrict

### 2.5.11.0.0 On Update

Cascade

## 2.6.0.0.0 OneToMany

### 2.6.1.0.0 Name

TechnicianLocationHistory

### 2.6.2.0.0 Id

REL_USER_GPSLOCATIONHISTORY_006

### 2.6.3.0.0 Source Entity

User

### 2.6.4.0.0 Target Entity

GpsLocationHistory

### 2.6.5.0.0 Type

🔹 OneToMany

### 2.6.6.0.0 Source Multiplicity

1

### 2.6.7.0.0 Target Multiplicity

0..*

### 2.6.8.0.0 Cascade Delete

❌ No

### 2.6.9.0.0 Is Identifying

❌ No

### 2.6.10.0.0 On Delete

Cascade

### 2.6.11.0.0 On Update

Cascade

## 2.7.0.0.0 OneToMany

### 2.7.1.0.0 Name

UserAuditLogs

### 2.7.2.0.0 Id

REL_USER_AUDITLOG_007

### 2.7.3.0.0 Source Entity

User

### 2.7.4.0.0 Target Entity

AuditLog

### 2.7.5.0.0 Type

🔹 OneToMany

### 2.7.6.0.0 Source Multiplicity

1

### 2.7.7.0.0 Target Multiplicity

0..*

### 2.7.8.0.0 Cascade Delete

❌ No

### 2.7.9.0.0 Is Identifying

❌ No

### 2.7.10.0.0 On Delete

SetNull

### 2.7.11.0.0 On Update

Cascade

## 2.8.0.0.0 OneToMany

### 2.8.1.0.0 Name

BrandProductModels

### 2.8.2.0.0 Id

REL_BRAND_PRODUCTMODEL_008

### 2.8.3.0.0 Source Entity

Brand

### 2.8.4.0.0 Target Entity

ProductModel

### 2.8.5.0.0 Type

🔹 OneToMany

### 2.8.6.0.0 Source Multiplicity

1

### 2.8.7.0.0 Target Multiplicity

0..*

### 2.8.8.0.0 Cascade Delete

❌ No

### 2.8.9.0.0 Is Identifying

❌ No

### 2.8.10.0.0 On Delete

Restrict

### 2.8.11.0.0 On Update

Cascade

## 2.9.0.0.0 OneToMany

### 2.9.1.0.0 Name

BrandAdministrators

### 2.9.2.0.0 Id

REL_BRAND_USER_009

### 2.9.3.0.0 Source Entity

Brand

### 2.9.4.0.0 Target Entity

User

### 2.9.5.0.0 Type

🔹 OneToMany

### 2.9.6.0.0 Source Multiplicity

1

### 2.9.7.0.0 Target Multiplicity

0..*

### 2.9.8.0.0 Cascade Delete

❌ No

### 2.9.9.0.0 Is Identifying

❌ No

### 2.9.10.0.0 On Delete

Restrict

### 2.9.11.0.0 On Update

Cascade

## 2.10.0.0.0 ManyToMany

### 2.10.1.0.0 Name

BrandServiceCenters

### 2.10.2.0.0 Id

REL_BRAND_SERVICECENTER_010

### 2.10.3.0.0 Source Entity

Brand

### 2.10.4.0.0 Target Entity

ServiceCenter

### 2.10.5.0.0 Type

🔹 ManyToMany

### 2.10.6.0.0 Source Multiplicity

0..*

### 2.10.7.0.0 Target Multiplicity

0..*

### 2.10.8.0.0 Cascade Delete

❌ No

### 2.10.9.0.0 Is Identifying

✅ Yes

### 2.10.10.0.0 Join Table

#### 2.10.10.1.0 Name

ServiceCenterBrand

#### 2.10.10.2.0 Columns

##### 2.10.10.2.1 Guid

###### 2.10.10.2.1.1 Name

brandId

###### 2.10.10.2.1.2 Type

🔹 Guid

###### 2.10.10.2.1.3 References

Brand.brandId

##### 2.10.10.2.2.0 Guid

###### 2.10.10.2.2.1 Name

serviceCenterId

###### 2.10.10.2.2.2 Type

🔹 Guid

###### 2.10.10.2.2.3 References

ServiceCenter.serviceCenterId

### 2.10.11.0.0.0 On Delete

Cascade

### 2.10.12.0.0.0 On Update

Cascade

## 2.11.0.0.0.0 OneToMany

### 2.11.1.0.0.0 Name

ProductModelInstances

### 2.11.2.0.0.0 Id

REL_PRODUCTMODEL_USERPRODUCT_011

### 2.11.3.0.0.0 Source Entity

ProductModel

### 2.11.4.0.0.0 Target Entity

UserProduct

### 2.11.5.0.0.0 Type

🔹 OneToMany

### 2.11.6.0.0.0 Source Multiplicity

1

### 2.11.7.0.0.0 Target Multiplicity

0..*

### 2.11.8.0.0.0 Cascade Delete

❌ No

### 2.11.9.0.0.0 Is Identifying

❌ No

### 2.11.10.0.0.0 On Delete

Restrict

### 2.11.11.0.0.0 On Update

Cascade

## 2.12.0.0.0.0 OneToMany

### 2.12.1.0.0.0 Name

ProductOwnershipTransfers

### 2.12.2.0.0.0 Id

REL_USERPRODUCT_OWNERSHIPTRANSFERREQUEST_012

### 2.12.3.0.0.0 Source Entity

UserProduct

### 2.12.4.0.0.0 Target Entity

OwnershipTransferRequest

### 2.12.5.0.0.0 Type

🔹 OneToMany

### 2.12.6.0.0.0 Source Multiplicity

1

### 2.12.7.0.0.0 Target Multiplicity

0..*

### 2.12.8.0.0.0 Cascade Delete

❌ No

### 2.12.9.0.0.0 Is Identifying

❌ No

### 2.12.10.0.0.0 On Delete

Cascade

### 2.12.11.0.0.0 On Update

Cascade

## 2.13.0.0.0.0 Composition

### 2.13.1.0.0.0 Name

UserProductInvoice

### 2.13.2.0.0.0 Id

REL_USERPRODUCT_INVOICE_013

### 2.13.3.0.0.0 Source Entity

UserProduct

### 2.13.4.0.0.0 Target Entity

Invoice

### 2.13.5.0.0.0 Type

🔹 Composition

### 2.13.6.0.0.0 Source Multiplicity

1

### 2.13.7.0.0.0 Target Multiplicity

0..1

### 2.13.8.0.0.0 Cascade Delete

✅ Yes

### 2.13.9.0.0.0 Is Identifying

❌ No

### 2.13.10.0.0.0 On Delete

Cascade

### 2.13.11.0.0.0 On Update

Cascade

## 2.14.0.0.0.0 OneToMany

### 2.14.1.0.0.0 Name

ProductServiceRequests

### 2.14.2.0.0.0 Id

REL_USERPRODUCT_SERVICEREQUEST_014

### 2.14.3.0.0.0 Source Entity

UserProduct

### 2.14.4.0.0.0 Target Entity

ServiceRequest

### 2.14.5.0.0.0 Type

🔹 OneToMany

### 2.14.6.0.0.0 Source Multiplicity

1

### 2.14.7.0.0.0 Target Multiplicity

0..*

### 2.14.8.0.0.0 Cascade Delete

❌ No

### 2.14.9.0.0.0 Is Identifying

❌ No

### 2.14.10.0.0.0 On Delete

Restrict

### 2.14.11.0.0.0 On Update

Cascade

## 2.15.0.0.0.0 OneToMany

### 2.15.1.0.0.0 Name

ServiceCenterStaff

### 2.15.2.0.0.0 Id

REL_SERVICECENTER_USER_015

### 2.15.3.0.0.0 Source Entity

ServiceCenter

### 2.15.4.0.0.0 Target Entity

User

### 2.15.5.0.0.0 Type

🔹 OneToMany

### 2.15.6.0.0.0 Source Multiplicity

1

### 2.15.7.0.0.0 Target Multiplicity

0..*

### 2.15.8.0.0.0 Cascade Delete

❌ No

### 2.15.9.0.0.0 Is Identifying

❌ No

### 2.15.10.0.0.0 On Delete

SetNull

### 2.15.11.0.0.0 On Update

Cascade

## 2.16.0.0.0.0 Composition

### 2.16.1.0.0.0 Name

ServiceCenterPolygons

### 2.16.2.0.0.0 Id

REL_SERVICECENTER_SERVICEAREAPOLYGON_016

### 2.16.3.0.0.0 Source Entity

ServiceCenter

### 2.16.4.0.0.0 Target Entity

ServiceAreaPolygon

### 2.16.5.0.0.0 Type

🔹 Composition

### 2.16.6.0.0.0 Source Multiplicity

1

### 2.16.7.0.0.0 Target Multiplicity

0..*

### 2.16.8.0.0.0 Cascade Delete

✅ Yes

### 2.16.9.0.0.0 Is Identifying

❌ No

### 2.16.10.0.0.0 On Delete

Cascade

### 2.16.11.0.0.0 On Update

Cascade

## 2.17.0.0.0.0 Composition

### 2.17.1.0.0.0 Name

ServiceCenterPostalCodes

### 2.17.2.0.0.0 Id

REL_SERVICECENTER_SERVICEAREAPOSTALCODE_017

### 2.17.3.0.0.0 Source Entity

ServiceCenter

### 2.17.4.0.0.0 Target Entity

ServiceAreaPostalCode

### 2.17.5.0.0.0 Type

🔹 Composition

### 2.17.6.0.0.0 Source Multiplicity

1

### 2.17.7.0.0.0 Target Multiplicity

0..*

### 2.17.8.0.0.0 Cascade Delete

✅ Yes

### 2.17.9.0.0.0 Is Identifying

❌ No

### 2.17.10.0.0.0 On Delete

Cascade

### 2.17.11.0.0.0 On Update

Cascade

## 2.18.0.0.0.0 OneToMany

### 2.18.1.0.0.0 Name

ServiceCenterRequests

### 2.18.2.0.0.0 Id

REL_SERVICECENTER_SERVICEREQUEST_018

### 2.18.3.0.0.0 Source Entity

ServiceCenter

### 2.18.4.0.0.0 Target Entity

ServiceRequest

### 2.18.5.0.0.0 Type

🔹 OneToMany

### 2.18.6.0.0.0 Source Multiplicity

1

### 2.18.7.0.0.0 Target Multiplicity

0..*

### 2.18.8.0.0.0 Cascade Delete

❌ No

### 2.18.9.0.0.0 Is Identifying

❌ No

### 2.18.10.0.0.0 On Delete

Restrict

### 2.18.11.0.0.0 On Update

Cascade

## 2.19.0.0.0.0 OneToMany

### 2.19.1.0.0.0 Name

IssueTypeServiceRequests

### 2.19.2.0.0.0 Id

REL_ISSUETYPE_SERVICEREQUEST_019

### 2.19.3.0.0.0 Source Entity

IssueType

### 2.19.4.0.0.0 Target Entity

ServiceRequest

### 2.19.5.0.0.0 Type

🔹 OneToMany

### 2.19.6.0.0.0 Source Multiplicity

1

### 2.19.7.0.0.0 Target Multiplicity

0..*

### 2.19.8.0.0.0 Cascade Delete

❌ No

### 2.19.9.0.0.0 Is Identifying

❌ No

### 2.19.10.0.0.0 On Delete

Restrict

### 2.19.11.0.0.0 On Update

Cascade

## 2.20.0.0.0.0 Composition

### 2.20.1.0.0.0 Name

ServiceRequestChat

### 2.20.2.0.0.0 Id

REL_SERVICEREQUEST_CHATMESSAGE_020

### 2.20.3.0.0.0 Source Entity

ServiceRequest

### 2.20.4.0.0.0 Target Entity

ChatMessage

### 2.20.5.0.0.0 Type

🔹 Composition

### 2.20.6.0.0.0 Source Multiplicity

1

### 2.20.7.0.0.0 Target Multiplicity

0..*

### 2.20.8.0.0.0 Cascade Delete

✅ Yes

### 2.20.9.0.0.0 Is Identifying

❌ No

### 2.20.10.0.0.0 On Delete

Cascade

### 2.20.11.0.0.0 On Update

Cascade

## 2.21.0.0.0.0 Composition

### 2.21.1.0.0.0 Name

ServiceRequestLocationHistory

### 2.21.2.0.0.0 Id

REL_SERVICEREQUEST_GPSLOCATIONHISTORY_021

### 2.21.3.0.0.0 Source Entity

ServiceRequest

### 2.21.4.0.0.0 Target Entity

GpsLocationHistory

### 2.21.5.0.0.0 Type

🔹 Composition

### 2.21.6.0.0.0 Source Multiplicity

1

### 2.21.7.0.0.0 Target Multiplicity

0..*

### 2.21.8.0.0.0 Cascade Delete

✅ Yes

### 2.21.9.0.0.0 Is Identifying

❌ No

### 2.21.10.0.0.0 On Delete

Cascade

### 2.21.11.0.0.0 On Update

Cascade

## 2.22.0.0.0.0 Composition

### 2.22.1.0.0.0 Name

ServiceRequestSignature

### 2.22.2.0.0.0 Id

REL_SERVICEREQUEST_CUSTOMERSIGNATURE_022

### 2.22.3.0.0.0 Source Entity

ServiceRequest

### 2.22.4.0.0.0 Target Entity

CustomerSignature

### 2.22.5.0.0.0 Type

🔹 Composition

### 2.22.6.0.0.0 Source Multiplicity

1

### 2.22.7.0.0.0 Target Multiplicity

0..1

### 2.22.8.0.0.0 Cascade Delete

✅ Yes

### 2.22.9.0.0.0 Is Identifying

❌ No

### 2.22.10.0.0.0 On Delete

Cascade

### 2.22.11.0.0.0 On Update

Cascade

## 2.23.0.0.0.0 OneToMany

### 2.23.1.0.0.0 Name

BrandDenormalizedServiceRequests

### 2.23.2.0.0.0 Id

REL_BRAND_SERVICEREQUEST_023

### 2.23.3.0.0.0 Source Entity

Brand

### 2.23.4.0.0.0 Target Entity

ServiceRequest

### 2.23.5.0.0.0 Type

🔹 OneToMany

### 2.23.6.0.0.0 Source Multiplicity

1

### 2.23.7.0.0.0 Target Multiplicity

0..*

### 2.23.8.0.0.0 Cascade Delete

❌ No

### 2.23.9.0.0.0 Is Identifying

❌ No

### 2.23.10.0.0.0 On Delete

Restrict

### 2.23.11.0.0.0 On Update

Cascade

## 2.24.0.0.0.0 OneToMany

### 2.24.1.0.0.0 Name

ProductModelDenormalizedServiceRequests

### 2.24.2.0.0.0 Id

REL_PRODUCTMODEL_SERVICEREQUEST_024

### 2.24.3.0.0.0 Source Entity

ProductModel

### 2.24.4.0.0.0 Target Entity

ServiceRequest

### 2.24.5.0.0.0 Type

🔹 OneToMany

### 2.24.6.0.0.0 Source Multiplicity

1

### 2.24.7.0.0.0 Target Multiplicity

0..*

### 2.24.8.0.0.0 Cascade Delete

❌ No

### 2.24.9.0.0.0 Is Identifying

❌ No

### 2.24.10.0.0.0 On Delete

Restrict

### 2.24.11.0.0.0 On Update

Cascade


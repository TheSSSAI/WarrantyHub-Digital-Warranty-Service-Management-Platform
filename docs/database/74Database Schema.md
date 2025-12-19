# 1 Title

System Audit & Activity Log

# 2 Name

AuditDB

# 3 Db Type

- search

# 4 Db Technology

OpenSearch

# 5 Entities

- {'name': 'AuditRecord', 'description': 'An indexed representation of audit logs, optimized for fast, complex searching and analysis. (REQ-AUDIT-001)', 'attributes': [{'name': 'auditLogId', 'type': 'KEYWORD', 'isRequired': True, 'isPrimaryKey': True, 'size': 0, 'isUnique': True, 'constraints': [], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'userId', 'type': 'KEYWORD', 'isRequired': False, 'isPrimaryKey': False, 'size': 0, 'isUnique': False, 'constraints': [], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'actionType', 'type': 'KEYWORD', 'isRequired': True, 'isPrimaryKey': False, 'size': 0, 'isUnique': False, 'constraints': [], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'targetEntity', 'type': 'KEYWORD', 'isRequired': True, 'isPrimaryKey': False, 'size': 0, 'isUnique': False, 'constraints': [], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'targetEntityId', 'type': 'KEYWORD', 'isRequired': True, 'isPrimaryKey': False, 'size': 0, 'isUnique': False, 'constraints': [], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'changeDetails', 'type': 'OBJECT', 'isRequired': False, 'isPrimaryKey': False, 'size': 0, 'isUnique': False, 'constraints': [], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'sourceIpAddress', 'type': 'IP', 'isRequired': False, 'isPrimaryKey': False, 'size': 0, 'isUnique': False, 'constraints': [], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'timestamp', 'type': 'DATE', 'isRequired': True, 'isPrimaryKey': False, 'size': 0, 'isUnique': False, 'constraints': [], 'precision': 0, 'scale': 0, 'isForeignKey': False}], 'primaryKeys': ['auditLogId'], 'uniqueConstraints': [], 'indexes': []}


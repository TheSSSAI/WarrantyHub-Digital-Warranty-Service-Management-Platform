# 1 Title

Technician Real-time GPS Location

# 2 Name

GeolocationDB

# 3 Db Type

- timeseries

# 4 Db Technology

TimescaleDB or Azure Data Explorer

# 5 Entities

- {'name': 'TechnicianLocation', 'description': "Stores transient, high-frequency GPS location data for technicians in 'Travel Mode'. Optimized for fast ingestion and time-based queries, with automatic data purging. (REQ-FUNC-009)", 'attributes': [{'name': 'timestamp', 'type': 'DateTime', 'isRequired': True, 'isPrimaryKey': True, 'size': 0, 'isUnique': False, 'constraints': ['Time-series hypertable dimension'], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'technicianId', 'type': 'UUID', 'isRequired': True, 'isPrimaryKey': True, 'size': 0, 'isUnique': False, 'constraints': ['Time-series hypertable dimension'], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'serviceRequestId', 'type': 'UUID', 'isRequired': True, 'isPrimaryKey': False, 'size': 0, 'isUnique': False, 'constraints': [], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'latitude', 'type': 'DOUBLE', 'isRequired': True, 'isPrimaryKey': False, 'size': 0, 'isUnique': False, 'constraints': [], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'longitude', 'type': 'DOUBLE', 'isRequired': True, 'isPrimaryKey': False, 'size': 0, 'isUnique': False, 'constraints': [], 'precision': 0, 'scale': 0, 'isForeignKey': False}], 'primaryKeys': ['timestamp', 'technicianId'], 'uniqueConstraints': [], 'indexes': [{'name': 'IX_TechnicianLocation_ServiceRequestId_Timestamp', 'columns': ['serviceRequestId', 'timestamp'], 'type': 'BTree'}]}


# 1 Title

Real-time Service Request Chat

# 2 Name

ChatDB

# 3 Db Type

- document

# 4 Db Technology

Azure Cosmos DB (MongoDB API)

# 5 Entities

- {'name': 'ChatConversation', 'description': 'Stores an entire chat conversation for a service request as a single document for efficient retrieval. (REQ-FUNC-007)', 'attributes': [{'name': '_id', 'type': 'UUID', 'isRequired': True, 'isPrimaryKey': True, 'size': 0, 'isUnique': True, 'constraints': ['Corresponds to serviceRequestId'], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'participants', 'type': 'Array<UUID>', 'isRequired': True, 'isPrimaryKey': False, 'size': 0, 'isUnique': False, 'constraints': ['List of userIds involved'], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'messages', 'type': 'Array<Object>', 'isRequired': True, 'isPrimaryKey': False, 'size': 0, 'isUnique': False, 'constraints': ['Each object contains: messageId (UUID), senderId (UUID), messageText (String), sentAt (DateTime)'], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'createdAt', 'type': 'DateTime', 'isRequired': True, 'isPrimaryKey': False, 'size': 0, 'isUnique': False, 'constraints': [], 'precision': 0, 'scale': 0, 'isForeignKey': False}, {'name': 'updatedAt', 'type': 'DateTime', 'isRequired': True, 'isPrimaryKey': False, 'size': 0, 'isUnique': False, 'constraints': [], 'precision': 0, 'scale': 0, 'isForeignKey': False}], 'primaryKeys': ['_id'], 'uniqueConstraints': [], 'indexes': [{'name': 'IX_Chat_Participants', 'columns': ['participants'], 'type': 'Array'}, {'name': 'IX_Chat_Messages_SentAt', 'columns': ['messages.sentAt'], 'type': 'BTree'}]}


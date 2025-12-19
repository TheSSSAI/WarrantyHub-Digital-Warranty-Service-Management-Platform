import { v4 as uuidv4 } from 'uuid';

export class ChatMessageEntity {
  private _id: string;
  private _serviceRequestId: string;
  private _senderId: string;
  private _content: string;
  private _sentAt: Date;
  private _readAt: Date | null;

  constructor(
    id: string,
    serviceRequestId: string,
    senderId: string,
    content: string,
    sentAt: Date
  ) {
    this._id = id;
    this._serviceRequestId = serviceRequestId;
    this._senderId = senderId;
    this._content = content;
    this._sentAt = sentAt;
    this._readAt = null;
  }

  public static create(serviceRequestId: string, senderId: string, content: string): ChatMessageEntity {
    if (!content || content.trim().length === 0) {
      throw new Error('Message content cannot be empty');
    }
    
    return new ChatMessageEntity(
      uuidv4(),
      serviceRequestId,
      senderId,
      content,
      new Date()
    );
  }

  public get id(): string { return this._id; }
  public get serviceRequestId(): string { return this._serviceRequestId; }
  public get senderId(): string { return this._senderId; }
  public get content(): string { return this._content; }
  public get sentAt(): Date { return this._sentAt; }
  public get readAt(): Date | null { return this._readAt; }

  public markAsRead(): void {
    if (!this._readAt) {
      this._readAt = new Date();
    }
  }

  public static reconstitute(props: any): ChatMessageEntity {
    const entity = new ChatMessageEntity(
      props.id,
      props.serviceRequestId,
      props.senderId,
      props.content,
      props.sentAt
    );
    if (props.readAt) {
      entity._readAt = props.readAt;
    }
    return entity;
  }
}
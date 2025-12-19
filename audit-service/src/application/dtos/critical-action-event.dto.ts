import { IsString, IsNotEmpty, IsUUID, IsOptional, IsObject, IsDateString, IsIP } from 'class-validator';

/**
 * Data Transfer Object for incoming critical action events.
 * Used to validate the payload received from the Service Bus before processing.
 * 
 * Architecture: Application Layer (Level 0 - Contracts)
 */
export class CriticalActionEventDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  actionType: string;

  @IsString()
  @IsNotEmpty()
  targetEntity: string;

  @IsString()
  @IsNotEmpty()
  targetEntityId: string;

  @IsOptional()
  @IsIP()
  sourceIpAddress?: string;

  @IsOptional()
  @IsObject()
  changeDetails?: Record<string, any>;

  @IsDateString()
  @IsNotEmpty()
  timestamp: string;

  /**
   * Returns a string representation of the event for logging purposes.
   */
  toString(): string {
    return `[${this.timestamp}] User: ${this.userId}, Action: ${this.actionType}, Target: ${this.targetEntity}/${this.targetEntityId}`;
  }
}
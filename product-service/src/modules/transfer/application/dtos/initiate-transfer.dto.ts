import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for initiating a product ownership transfer.
 * 
 * This DTO validates the input required to start the transfer process as defined in REQ-FUNC-004.
 */
export class InitiateTransferDto {
  /**
   * The unique identifier of the product to be transferred.
   * This ensures the transfer is linked to a specific asset in the system.
   */
  @ApiProperty({
    description: 'The UUID of the product to be transferred',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID('4', { message: 'Product ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Product ID is required' })
  productId: string;

  /**
   * The email address of the recipient user.
   * This is used to notify the recipient and link the transfer if the user already exists.
   */
  @ApiProperty({
    description: 'The email address of the user receiving the product',
    example: 'recipient@example.com',
  })
  @IsEmail({}, { message: 'Recipient email must be a valid email address' })
  @IsNotEmpty({ message: 'Recipient email is required' })
  recipientEmail: string;
}
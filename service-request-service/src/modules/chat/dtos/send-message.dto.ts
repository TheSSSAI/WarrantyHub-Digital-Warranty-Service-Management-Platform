import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class SendMessageDto {
  @ApiProperty({
    description: 'The unique identifier of the service request ticket this message belongs to',
    example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  })
  @IsUUID('4')
  @IsNotEmpty()
  ticketId: string;

  @ApiProperty({
    description: 'The textual content of the chat message',
    example: 'Hello, I have arrived at the location.',
    maxLength: 2000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  content: string;
}
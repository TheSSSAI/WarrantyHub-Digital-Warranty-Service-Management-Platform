import { ApiProperty } from '@nestjs/swagger';
import { 
  IsEmail, 
  IsNotEmpty, 
  IsString, 
  Matches, 
  MaxLength, 
  MinLength 
} from 'class-validator';

/**
 * Data Transfer Object for User Registration.
 * Encapsulates the data required to create a new user account across both
 * the Identity Provider (Azure AD B2C) and the local User service.
 */
export class RegisterUserDto {
  @ApiProperty({
    description: 'The email address of the user, used as the primary identifier',
    example: 'user@example.com',
    required: true
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  readonly email: string;

  @ApiProperty({
    description: 'The password for the account. Must be strong (8+ chars, mixed case, numbers, special chars)',
    example: 'P@ssw0rd123!',
    required: true,
    minLength: 8
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(64, { message: 'Password cannot exceed 64 characters' })
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { 
      message: 'Password must contain uppercase, lowercase, numbers, and special characters' 
    }
  )
  readonly password: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    required: true
  })
  @IsNotEmpty({ message: 'First name is required' })
  @IsString()
  @MaxLength(100)
  readonly firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
    required: true
  })
  @IsNotEmpty({ message: 'Last name is required' })
  @IsString()
  @MaxLength(100)
  readonly lastName: string;

  @ApiProperty({
    description: 'Optional phone number for MFA or contact purposes',
    example: '+15551234567',
    required: false
  })
  // Phone number validation logic can be complex; checking for basic string length here
  // Real-world scenarios might use libphonenumber-js
  @IsString()
  @MinLength(7)
  @MaxLength(20)
  readonly phoneNumber?: string;
}
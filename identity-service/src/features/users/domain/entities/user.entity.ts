import { UserRole } from '../enums/user-role.enum';
import { Role } from './role.value-object';
import { UserPreferences } from './user-preferences.value-object';

/**
 * Represents a User in the Identity domain.
 * Acts as the Aggregate Root for user-related operations.
 * This entity encapsulates the state and behavior of a user, including their
 * identity linkage to Azure AD B2C, roles, and preferences.
 */
export class User {
  private _id: string;
  private _azureAdB2cObjectId: string;
  private _email: string;
  private _firstName: string;
  private _lastName: string;
  private _roles: Role[];
  private _preferences: UserPreferences;
  private _isActive: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _lastLoginAt: Date | null;

  /**
   * Private constructor to enforce the use of factory methods.
   */
  private constructor() {
    this._roles = [];
    this._isActive = true;
    this._createdAt = new Date();
    this._updatedAt = new Date();
    this._lastLoginAt = null;
  }

  /**
   * Factory method to create a new User instance.
   * Enforces initial invariants required for a valid user.
   * 
   * @param id - The unique identifier for the user (UUID)
   * @param email - The user's email address
   * @param firstName - The user's first name
   * @param lastName - The user's last name
   * @param azureAdB2cObjectId - The object ID from Azure AD B2C
   * @returns A new User instance
   */
  public static create(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    azureAdB2cObjectId: string,
  ): User {
    if (!email) throw new Error('Email is required for user creation.');
    if (!firstName) throw new Error('First Name is required for user creation.');
    if (!lastName) throw new Error('Last Name is required for user creation.');
    if (!azureAdB2cObjectId) throw new Error('Azure AD B2C Object ID is required.');

    const user = new User();
    user._id = id;
    user._email = email.toLowerCase().trim();
    user._firstName = firstName.trim();
    user._lastName = lastName.trim();
    user._azureAdB2cObjectId = azureAdB2cObjectId;
    
    // Default role assignment
    user.addRole(new Role(UserRole.Customer));
    
    // Default preferences
    user._preferences = UserPreferences.createDefault();

    return user;
  }

  /**
   * Reconstitutes a User entity from persistence.
   * This method should only be used by Repositories/Mappers.
   */
  public static reconstitute(
    id: string,
    azureAdB2cObjectId: string,
    email: string,
    firstName: string,
    lastName: string,
    roles: Role[],
    preferences: UserPreferences,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
    lastLoginAt: Date | null
  ): User {
    const user = new User();
    user._id = id;
    user._azureAdB2cObjectId = azureAdB2cObjectId;
    user._email = email;
    user._firstName = firstName;
    user._lastName = lastName;
    user._roles = roles;
    user._preferences = preferences;
    user._isActive = isActive;
    user._createdAt = createdAt;
    user._updatedAt = updatedAt;
    user._lastLoginAt = lastLoginAt;
    return user;
  }

  // Getters
  public get id(): string { return this._id; }
  public get azureAdB2cObjectId(): string { return this._azureAdB2cObjectId; }
  public get email(): string { return this._email; }
  public get firstName(): string { return this._firstName; }
  public get lastName(): string { return this._lastName; }
  public get fullName(): string { return `${this._firstName} ${this._lastName}`; }
  public get roles(): ReadonlyArray<Role> { return this._roles; }
  public get preferences(): UserPreferences { return this._preferences; }
  public get isActive(): boolean { return this._isActive; }
  public get createdAt(): Date { return this._createdAt; }
  public get updatedAt(): Date { return this._updatedAt; }
  public get lastLoginAt(): Date | null { return this._lastLoginAt; }

  // Business Logic Methods

  /**
   * Updates the user's profile information.
   * Updates the audit timestamp.
   */
  public updateProfile(firstName: string, lastName: string): void {
    if (!firstName || !lastName) {
      throw new Error('Cannot update profile with empty name fields.');
    }
    
    this._firstName = firstName.trim();
    this._lastName = lastName.trim();
    this._updatedAt = new Date();
  }

  /**
   * Assigns a new role to the user if they don't already possess it.
   * @param role The role to assign
   */
  public addRole(role: Role): void {
    const exists = this._roles.some(r => r.equals(role));
    if (!exists) {
      this._roles.push(role);
      this._updatedAt = new Date();
    }
  }

  /**
   * Removes a role from the user.
   * Prevents removing the last role to ensure user always has at least one permission set.
   * @param role The role to revoke
   */
  public revokeRole(role: Role): void {
    if (this._roles.length <= 1) {
      throw new Error('Cannot revoke the last role. User must have at least one role.');
    }

    this._roles = this._roles.filter(r => !r.equals(role));
    this._updatedAt = new Date();
  }

  /**
   * Checks if the user possesses a specific role.
   */
  public hasRole(roleName: UserRole): boolean {
    return this._roles.some(r => r.getValue() === roleName);
  }

  /**
   * Updates user preferences settings.
   */
  public updatePreferences(preferences: UserPreferences): void {
    if (!preferences) {
      throw new Error('Preferences cannot be null.');
    }
    this._preferences = preferences;
    this._updatedAt = new Date();
  }

  /**
   * Records a successful login event.
   */
  public recordLogin(): void {
    this._lastLoginAt = new Date();
    // Login doesn't necessarily count as a profile update, so we don't touch updatedAt
  }

  /**
   * Deactivates the user account, preventing login and access.
   */
  public deactivate(): void {
    if (!this._isActive) return;
    this._isActive = false;
    this._updatedAt = new Date();
  }

  /**
   * Reactivates the user account.
   */
  public activate(): void {
    if (this._isActive) return;
    this._isActive = true;
    this._updatedAt = new Date();
  }
}
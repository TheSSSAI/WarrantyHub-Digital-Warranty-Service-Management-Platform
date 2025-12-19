/**
 * Command to approve a pending Service Center registration.
 * This state transition triggers an event for notification and auditing.
 */
export class ApproveServiceCenterCommand {
  constructor(
    public readonly serviceCenterId: string,
    public readonly adminId: string, // ID of the Super Admin performing the action
  ) {}
}
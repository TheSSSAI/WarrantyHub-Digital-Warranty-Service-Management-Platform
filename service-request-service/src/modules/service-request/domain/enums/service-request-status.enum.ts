export enum ServiceRequestStatus {
  /**
   * The request has been created by the user and is awaiting acknowledgment/routing.
   */
  REQUESTED = 'REQUESTED',

  /**
   * The request has been routed to a service center and acknowledged by an admin.
   */
  ACKNOWLEDGED = 'ACKNOWLEDGED',

  /**
   * A technician has been assigned to the service request.
   */
  ASSIGNED = 'ASSIGNED',

  /**
   * The technician is currently traveling to the service location.
   */
  ON_THE_WAY = 'ON_THE_WAY',

  /**
   * The technician has arrived and work is currently being performed.
   */
  IN_PROGRESS = 'IN_PROGRESS',

  /**
   * The work has been completed by the technician but not yet formally closed by the admin.
   */
  RESOLVED = 'RESOLVED',

  /**
   * The user has rejected the resolution and initiated a dispute.
   */
  DISPUTED = 'DISPUTED',

  /**
   * The ticket has been formally closed by the service center admin.
   */
  CLOSED = 'CLOSED',

  /**
   * The request has been cancelled by the user or admin before completion.
   */
  CANCELLED = 'CANCELLED',
}
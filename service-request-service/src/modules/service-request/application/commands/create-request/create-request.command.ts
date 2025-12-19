import { CreateServiceRequestDto } from '../../../interface/dtos/create-service-request.dto';

export class CreateServiceRequestCommand {
  /**
   * Creates a new command instance to initiate a service request.
   *
   * @param createDto The data transfer object containing the request details.
   * @param userId The ID of the authenticated user creating the request.
   */
  constructor(
    public readonly createDto: CreateServiceRequestDto,
    public readonly userId: string,
  ) {
    if (!createDto) {
      throw new Error('CreateServiceRequestDto is required');
    }
    if (!userId) {
      throw new Error('UserId is required');
    }
  }
}
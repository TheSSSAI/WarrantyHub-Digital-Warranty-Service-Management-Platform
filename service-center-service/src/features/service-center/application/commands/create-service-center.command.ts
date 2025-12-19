export class CreateServiceCenterCommand {
  constructor(
    public readonly name: string,
    public readonly address: string,
    public readonly city: string,
    public readonly state: string,
    public readonly postalCode: string,
    public readonly country: string,
    public readonly contactEmail: string,
    public readonly contactPhone: string,
    public readonly latitude: number,
    public readonly longitude: number,
  ) {}
}
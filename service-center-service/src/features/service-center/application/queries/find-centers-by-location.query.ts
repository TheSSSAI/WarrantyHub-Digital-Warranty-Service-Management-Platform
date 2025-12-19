/**
 * Query to find eligible Service Centers based on a geographic location and brand.
 * This is the primary query used by the routing engine.
 */
export class FindCentersByLocationQuery {
  constructor(
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly brandId: string,
  ) {}
}
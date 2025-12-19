import { Polygon } from 'geojson';

export class DefineServiceAreaCommand {
  constructor(
    public readonly serviceCenterId: string,
    public readonly brandId: string,
    public readonly polygon: Polygon,
  ) {}
}
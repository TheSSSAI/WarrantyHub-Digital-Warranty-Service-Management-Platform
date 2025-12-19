import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ILocationRepository } from '../../domain/ports/ilocation-repository.port';
import { TimescaleLocationRepository } from './repositories/timescale-location.repository';
import { LocationHistoryEntity } from './entities/location-history.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [LocationHistoryEntity],
        synchronize: configService.get<boolean>('database.synchronize', false),
        logging: configService.get<boolean>('database.logging', false),
        // TimescaleDB specific optimizations could be added here if supported by the driver options
      }),
    }),
    TypeOrmModule.forFeature([LocationHistoryEntity]),
  ],
  providers: [
    {
      provide: ILocationRepository,
      useClass: TimescaleLocationRepository,
    },
  ],
  exports: [ILocationRepository],
})
export class PersistenceModule {}
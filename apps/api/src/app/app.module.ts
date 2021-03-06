import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertEntity } from './entities/alert.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'projectmunka',
      database: 'projectmunka',
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([AlertEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: ['./entities/*.entity.ts'],
      synchronize: true,
   })
    ,UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

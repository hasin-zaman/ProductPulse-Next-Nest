import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './modules/users/user.entity';
import { Complaint } from './modules/complaints/complaint.entity';
import { UserModule } from './modules/users/user.module';
import { ComplaintModule } from './modules/complaints/complaint.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admins/admin.module';
import { Admin } from './modules/admins/admin.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { RolesGuard } from './utils/roles.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, AdminModule, UserModule, ComplaintModule, ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      entities: [Admin, User, Complaint],
      synchronize: true
    }),
    inject: [ConfigService]
  })],
  controllers: [AppController],
  providers: [AppService, JwtService, {provide: APP_GUARD, useClass: AuthGuard}, {provide: APP_GUARD, useClass: RolesGuard}],
})
export class AppModule {}

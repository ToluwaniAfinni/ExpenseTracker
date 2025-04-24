import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: 'mongodb+srv://Maverick:test123@cluster0.5phizz5.mongodb.net/', //configService.get<string>('database.url'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        synchronize: true, //configService.get<boolean>('database.synchronize'),
        logging: false, //configService.get<boolean>('database.logging'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    UserModule, TransactionModule, CategoriesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

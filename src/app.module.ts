import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { OrderModule } from './order.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MarketGateway } from './infrastructure/controllers/market.gateway';
import { MarketService } from './application/services/market.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h' },
      global: true,
    }),
    UserModule,
    OrderModule,
  ],
  controllers: [],
  providers: [MarketGateway, MarketService],
})
export class AppModule {}

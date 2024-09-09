import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class MarketService {
  private symbolsApiUrl: string;
  private logger: Logger;
  constructor(private readonly configService: ConfigService) {
    this.symbolsApiUrl = configService.get<string>('KC_URL_SYMBOLS');
    this.logger = new Logger('MarketService');
  }

  async getSymbolsData(): Promise<any> {
    try {
      const response = await axios.get(this.symbolsApiUrl);
      return response.data;
    } catch (err) {
      this.logger.error(`Error calling KC Symbols request: ${err}`);
      return null;
    }
  }
}

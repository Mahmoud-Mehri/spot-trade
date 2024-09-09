import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WsAdapter } from '@nestjs/platform-ws';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MarketService } from 'src/application/services/market.service';
import { Server, WebSocket } from 'ws';

@WebSocketGateway({
  transports: ['websocket'],
  adapter: new WsAdapter(),
})
export class MarketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private logger: Logger;
  private wserver: Server;
  private intervalPriod: number;
  private interval: NodeJS.Timeout | null = null;
  private isBusy: boolean = false;

  constructor(
    private readonly marketService: MarketService,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger('WSGateway');
  }

  handleConnection(client: WebSocket) {
    this.logger.log(`Client Connected`);
  }

  handleDisconnect(client: WebSocket) {
    this.logger.log(`Client Disconnected`);
  }

  afterInit(server: Server) {
    this.wserver = server;
    this.startInterval();
  }

  private startInterval() {
    this.intervalPriod =
      this.configService.get<number>('MARKET_UPDATE_INTERVAL') || 5000;

    if (this.interval) {
      this.stopInterval();
    }

    this.isBusy = false;
    this.interval = setInterval(async () => {
      if (this.isBusy) {
        return;
      }

      this.isBusy = true;
      try {
        const data = await this.marketService.getSymbolsData();
        if (data) {
          this.wserver.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ event: 'symbols-update', data }));
            }
          });
        }
      } catch (err) {
        this.logger.error(`Error on sending data to clients: ${err}`);
      } finally {
        this.isBusy = false;
      }
    }, this.intervalPriod);
  }

  private stopInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

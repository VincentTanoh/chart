import { Injectable } from '@angular/core';

import {WebSocketService} from '@app/services/websocket.service';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {WebsocketOptions} from '@app/models/websocket.options';

export const progressStompConfig: InjectableRxStompConfig = {
  webSocketFactory: () => {
    return new WebSocket('ws://localhost:8080/stomp');
  }
};

@Injectable()
export class ProgressWebsocketService extends WebSocketService {
  constructor(stompService: RxStompService) {
    super(
      stompService,
      progressStompConfig,
      new WebsocketOptions('/topic/progress')
    );
  }
}

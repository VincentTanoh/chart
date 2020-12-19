import { Injectable } from '@angular/core';
import {WebSocketService} from '@app/services/websocket.service';
import {InjectableRxStompConfig, RxStompService} from '@stomp/ng2-stompjs';
import {WebsocketOptions} from '@app/models/websocket.options';
import {Subject} from 'rxjs';
import { map } from 'rxjs/operators';

const CHAT_URL = 'ws://echo.websocket.org/';

export interface Message {
  author: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
// export class ChartService  {
export class ChartService {
  public messages: Subject<Message>;


  constructor(wsService: WebSocketService) {

    // @ts-ignore
    this.messages = <Subject<Message>> wsService.connect(CHAT_URL).pipe(
        map(
      (response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          author: data.author,
          message: data.message
        };
      }));
  }
}


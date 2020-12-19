import { Component, OnInit } from '@angular/core';
import {ChartService} from '@app/services/chart.service';
import {ProgressWebsocketService} from '@app/services/progress-websocket.service';
import {WebSocketService} from '@app/services/websocket.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  providers: [WebSocketService, ChartService]
})
export class ChartComponent implements OnInit {

  public title = 'Using WebSocket under Angular';
  public progress: any = {};

  constructor(private chatService: ChartService, private progressWebsocketService: ProgressWebsocketService) {
    chatService.messages.subscribe(msg => {
      console.log('Response from websocket: ' + msg);
    });
  }

  private message = {
    author: 'ouisend',
    message: 'this is a test message'
  };

  // tslint:disable-next-line:typedef
  sendMsg() {
    console.log('new message from client to websocket: ', this.message);
    this.chatService.messages.next(this.message);
    this.message.message = '';
  }
  // tslint:disable-next-line:typedef
  ngOnInit() {
    // Init Progress WebSocket.
    this.initProgressWebSocket();
  }

  /**
   * Subscribe to the client broker.
   * Return the current status of the batch.
   */
  private initProgressWebSocket = () => {
    const obs = this.progressWebsocketService.getObservable();

    obs.subscribe({
      next: this.onNewProgressMsg,
      error: err => {
        console.log(err);
      }
    });
  }

  /**
   * Apply result of the java server notification to the view.
   */
  private onNewProgressMsg = receivedMsg => {
    if (receivedMsg.type === 'SUCCESS') {
      this.progress = receivedMsg.message;
    }
  }


}

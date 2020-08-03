import { Component } from '@angular/core';
import { ChatService, MessageType } from '../services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  public messages: Array<MessageType> = [

  ];

  public sessionId;

  public messageText = "";

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.startSession();
  }

  send() {
  
    if (!this.sessionId) {
      this.startSession();
    } else {
      this.sendMessage()
    }
  }

  sendMessage() {
    let message: MessageType = {
      message: this.messageText,
      author: 'me'
    }

    this.messages.push(message);

    let data = {
      message: this.messageText,
      session_id: this.sessionId
    }

    this.messageText = "";

    this.chatService.sendMessage(data).then((data: any) => {
      let message: MessageType = {
        message: data.output.generic[0].text,
        author: 'bot'
      }
      this.messages.push(message);


    }).catch((error) => {
      this.messages = [];
      this.startSession();
    })
  }

  startSession() {
    this.chatService.createSession().then((data: any) => {
      this.sessionId = data.output.session_id;
      let message: MessageType = {
        message: data.output.generic[0].text,
        author: 'bot'
      }

      this.messages.push(message);
    })
  }

}

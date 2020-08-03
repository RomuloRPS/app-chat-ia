import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class MessageType {
  public message: string;
  public author: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  api = environment.api;
  
  constructor(
    private http: HttpClient
  ) { }

  createSession() {
    return this.http.post(this.api + 'create-session', {}).toPromise();
  }

  sendMessage(data) {
    return this.http.post(this.api + 'message', data).toPromise();
  }
}

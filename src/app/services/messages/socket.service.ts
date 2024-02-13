import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public connectionStatus$: BehaviorSubject<string> = new BehaviorSubject('Disconnected');
  private socket!: Socket;
  private newMessageEvent$: Subject<void> = new Subject<void>();


  constructor() {
    this.setupWebSocketConnection();
  }

  private setupWebSocketConnection() {
    const token = localStorage.getItem('user'); // Replace with your actual key

    const authToken = `Bearer ${token}`; // Replace with your actual token
    const socketOptions = {
      transports: ['websocket','polling'],
      auth: {
        token: authToken,
      },
    };

    this.socket = io('wss://dreamcareer.onrender.com', socketOptions);

    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.connectionStatus$.next('Connected');
    });

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
      this.connectionStatus$.next('Disconnected');
    });

    this.socket.on('error', (error: any) => {
      console.error('WebSocket error:', error);
      this.connectionStatus$.next('Error: Unable to connect');
    });

      // Assuming this.socket is your WebSocket instance
      this.socket.on('getMessage', ({ sender, content }) => {
        this.message$.next(content);
        // Trigger the new message event
        console.log('msgabdou',content)
        this.newMessageEvent$.next();
      });

  }

  public sendMessage(message: any) {
    if (this.socket.connected) {
      console.log('WebSocket is connected. Sending message:', message);
      this.socket.emit('message', message);
    } else {
      console.error('WebSocket is not connected. Message not sent.');
    }
  }

  public getMessages(): Observable<any> {

    return new Observable((observer) => {
      this.socket.on('getMessage', ({ sender, content }) => {
        observer.next(sender);
        console.log('New event received:', sender);
      });


    });


  }
  sendMessage1(message: string){
    this.socket.emit('sendMessage', message);
  }

  public getNewMessages1 = () => {
    this.socket.on('getMessage', (message) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}

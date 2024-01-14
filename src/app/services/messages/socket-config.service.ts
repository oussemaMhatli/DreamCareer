import { Injectable } from '@angular/core';
import { SocketIoConfig } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketConfigService {

  constructor() { }
  getSocketIoConfig(): SocketIoConfig {
    // Retrieve the token from localStorage
    const authToken = localStorage.getItem('user'); // Replace with your actual key

    // Create the Socket.IO configuration
    const socketConfig: SocketIoConfig = {
      url: 'wss://dreamcareer.onrender.com',  // Replace with your actual socket server URL
      options: {
        transports: ['websocket'],
        auth: {
          token: `Bearer ${authToken}`,
        },
        reconnection: true,
        reconnectionAttempts: 3,
      },
    };

    return socketConfig;
  }

}

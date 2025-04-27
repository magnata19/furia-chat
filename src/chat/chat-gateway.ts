import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: { origin: "*" } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, Socket> = new Map();

  handleConnection(client: any, ...args: any[]): void {
    console.log(`Cliente conectado: ${client.id}`)
    this.connectedClients.set(client.id, client);
    this.server.emit('userConnected', client.id);
    this.sendConnectedUsers();
  }

  handleDisconnect(client: Socket): void {
    console.log(`Cliente conectado: ${client.id}`)
    this.connectedClients.delete(client.id);
    this.server.emit('userConnected', client.id);
    this.sendConnectedUsers();
  }

  sendConnectedUsers(): void {
    const users = Array.from(this.connectedClients.keys());
    this.server.emit('connectedUsers', users);
  }

  handleMessage(client: Socket, payload: string): void {
    console.log(`Mensagem recebida de ${client.id}: ${payload}`);
    this.server.emit('newMessage', { sender: client.id, message: payload });
  }
}
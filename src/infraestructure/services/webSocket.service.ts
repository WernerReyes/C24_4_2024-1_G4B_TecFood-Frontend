import { getEnvs, getStorage } from "@/presentation/utilities";
import { Client, messageCallbackType } from "@stomp/stompjs";

type Subscription = () => void;

const { VITE_WEBSOCKET_URL } = getEnvs();

export class WebSocketService {
  private stompClient: Client | null = null;
  private subscriptions: Subscription[] = [];

  public connect() {
    const token = getStorage("token");
    if (!token) {
      console.error("Token de autenticación no disponible");
      return;
    }

    if (!this.stompClient) {
      this.stompClient = new Client({
        brokerURL: VITE_WEBSOCKET_URL,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        webSocketFactory() {
          return new WebSocket(VITE_WEBSOCKET_URL);
        },

        onStompError: (frame) => {
          console.error("Broker reported error: " + frame.headers.message);
          console.error("Additional details: " + frame.body);
        },

        onWebSocketError: (event) => {
          console.error("WebSocket reported error: ", event);
          console.error("Error type:", event.type);
          console.error("Error target:", event.target);
        },

        onConnect: (frame) => {
          console.log("Conectado: ", frame);
          this.subscriptions.forEach((subscription) => subscription());
        },
      });

      this.stompClient.onConnect = (frame) => {
        console.log("Conectado: ", frame);
        this.subscriptions.forEach((subscription) => subscription());
      };

      this.stompClient.activate();
    }
  }

  subscribe(topic: string, callback: messageCallbackType) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.subscribe(topic, callback);
    } else {
      this.subscriptions.push(() => {
        this.stompClient?.subscribe(topic, callback);
      });
    }
  }

  unsubscribe(topic: string) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.unsubscribe(topic);
    }
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
      this.subscriptions = [];
    }
  }
}

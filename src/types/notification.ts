export interface EmailConfig {
  enable: boolean;
  smtp_host: string;
  smtp_port: number;
  username: string;
  password: string;
  to: string[];
}

export interface TelegramConfig {
  enable: boolean;
  bot_token: string;
  chat_id: string;
}

export interface WebhookConfig {
  enable: boolean;
  url: string;
  method: string;
}

export interface NotifyEvents {
  on_live_start: boolean;
  on_live_end: boolean;
}

export interface NotifyConfig {
  email: EmailConfig;
  telegram: TelegramConfig;
  webhook: WebhookConfig;
  events: NotifyEvents;
}

export interface RoomNotifyConfig {
  enable_notify: boolean;
}

export interface LiveRoomConfig {
  url: string;
  is_listening: boolean;
  quality?: number;
  notify?: RoomNotifyConfig;
} 
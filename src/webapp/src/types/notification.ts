export interface NotifyConfig {
    enable_notify: boolean;
    telegram?: {
        bot_token: string;
        chat_id: string;
    };
    discord?: {
        webhook_url: string;
    };
    bark?: {
        server_url: string;
        device_key: string;
    };
    email?: {
        smtp_server: string;
        smtp_port: number;
        username: string;
        password: string;
        from_address: string;
        to_address: string;
        use_ssl: boolean;
    };
    webhook?: {
        url: string;
        method: 'GET' | 'POST';
        headers?: Record<string, string>;
        body_template?: string;
    };
}

export interface LiveRoomConfig {
    roomId: string | number;
    platform: string;
    url: string;
    notify?: NotifyConfig;
    isLiving?: boolean;
    enabled?: boolean;
    quality?: string;
    output?: string;
}

export default LiveRoomConfig; 
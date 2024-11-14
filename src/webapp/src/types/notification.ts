export interface NotifyConfig {
    enable_notify: boolean;
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
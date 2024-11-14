export interface LiveRoomConfig {
    roomId: string | number;
    platform: string;
    isLiving?: boolean;
    enabled?: boolean;
    quality?: string;
    output?: string;
}

// 添加一个默认导出，确保文件被识别为模块
export default LiveRoomConfig; 
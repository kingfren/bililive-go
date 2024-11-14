import axios from 'axios';
import type { LiveRoomConfig, NotifyConfig } from '../types/notification';

const api = axios.create({
  baseURL: '/api',
});

export const roomApi = {
  // 获取房间列表
  getRooms: () => api.get<LiveRoomConfig[]>('/rooms'),
  
  // 添加房间
  addRoom: (room: Partial<LiveRoomConfig>) => api.post('/rooms', room),
  
  // 删除房间
  deleteRoom: (url: string) => api.delete(`/rooms/${encodeURIComponent(url)}`),
  
  // 更新房间状态
  updateRoomStatus: (url: string, enabled: boolean) => 
    api.patch(`/rooms/${encodeURIComponent(url)}`, { enabled }),
    
  // 获取通知配置
  getNotifyConfig: () => api.get<NotifyConfig>('/notify/config'),
  
  // 更新通知配置
  updateNotifyConfig: (config: NotifyConfig) => api.put('/notify/config', config),
  
  // 更新房间通知状态
  updateRoomNotify: (url: string, enabled: boolean) =>
    api.patch(`/rooms/${encodeURIComponent(url)}/notify`, { enabled }),
}; 
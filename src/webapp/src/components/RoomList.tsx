import React from 'react';
import { Switch } from 'antd';
import { LiveRoomConfig } from '../types/notification';

interface RoomListProps {
  rooms: LiveRoomConfig[];
  onNotifyChange: (url: string, enabled: boolean) => void;
}

export const RoomList: React.FC<RoomListProps> = ({ rooms, onNotifyChange }) => {
  return (
    <div className="room-list">
      <table>
        <thead>
          <tr>
            <th>主播名称</th>
            <th>直播间名称</th>
            <th>直播平台</th>
            <th>运行状态</th>
            <th>开启通知</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.url}>
              {/* ... 其他列保持不变 ... */}
              <td>
                <Switch
                  checked={room.notify?.enable_notify}
                  onChange={(checked: boolean) => onNotifyChange(room.url, checked)}
                />
              </td>
              <td>{/* ... 操作按钮 ... */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 
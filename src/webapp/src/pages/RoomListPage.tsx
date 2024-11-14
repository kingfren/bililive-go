import React from 'react';
import { message } from 'antd';
import { RoomList } from '../components/RoomList';

export const RoomListPage: React.FC = () => {
  // ... 其他状态和方法保持不变 ...

  const handleNotifyChange = async (url: string, enabled: boolean) => {
    try {
      // 调用后端API更新配置
      await fetch('/api/room/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          enable_notify: enabled,
        }),
      });

      // 更新本地状态
      setRooms(rooms.map(room => {
        if (room.url === url) {
          return {
            ...room,
            notify: {
              ...room.notify,
              enable_notify: enabled,
            },
          };
        }
        return room;
      }));

      message.success(`${enabled ? '启用' : '禁用'}通知成功`);
    } catch (error) {
      message.error('更新通知设置失败');
      console.error(error);
    }
  };

  return (
    <div>
      <RoomList
        rooms={rooms}
        onNotifyChange={handleNotifyChange}
      />
    </div>
  );
}; 
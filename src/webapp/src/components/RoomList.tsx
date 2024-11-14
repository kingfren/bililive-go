import React, { useEffect, useState } from 'react';
import { Switch, Button, message } from 'antd';
import type { LiveRoomConfig, NotifyConfig } from '../types/notification';
import { NotifySettings } from './NotifySettings';
import { AddRoom } from './AddRoom';
import { roomApi } from '../api';

export const RoomList: React.FC = () => {
  const [rooms, setRooms] = useState<LiveRoomConfig[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [notifyConfig, setNotifyConfig] = useState<NotifyConfig | null>(null);

  // 加载房间列表
  const loadRooms = async () => {
    try {
      const response = await roomApi.getRooms();
      setRooms(response.data);
    } catch (error) {
      message.error('加载房间列表失败');
    }
  };

  // 加载通知配置
  const loadNotifyConfig = async () => {
    try {
      const response = await roomApi.getNotifyConfig();
      setNotifyConfig(response.data);
    } catch (error) {
      message.error('加载通知配置失败');
    }
  };

  useEffect(() => {
    loadRooms();
    loadNotifyConfig();
  }, []);

  // 处理房间通知状态变更
  const handleNotifyChange = async (url: string, enabled: boolean) => {
    try {
      await roomApi.updateRoomNotify(url, enabled);
      await loadRooms();
      message.success('更新成功');
    } catch (error) {
      message.error('更新失败');
    }
  };

  // 处理添加房间
  const handleAddRoom = async (room: Partial<LiveRoomConfig>) => {
    try {
      await roomApi.addRoom(room);
      await loadRooms();
      message.success('添加成功');
    } catch (error) {
      message.error('添加失败');
    }
  };

  // 处理删除房间
  const handleDeleteRoom = async (url: string) => {
    try {
      await roomApi.deleteRoom(url);
      await loadRooms();
      message.success('删除成功');
    } catch (error) {
      message.error('删除失败');
    }
  };

  // 处理保存通知配置
  const handleSaveNotifyConfig = async (config: NotifyConfig) => {
    try {
      await roomApi.updateNotifyConfig(config);
      setNotifyConfig(config);
      setShowSettings(false);
      message.success('保存成功');
    } catch (error) {
      message.error('保存失败');
    }
  };

  return (
    <div className="room-list">
      <div className="room-list-header">
        <Button onClick={() => setShowAddRoom(true)}>添加房间</Button>
        <Button onClick={() => setShowSettings(true)}>通知设置</Button>
      </div>

      {showSettings && notifyConfig && (
        <NotifySettings 
          config={notifyConfig}
          onSave={handleSaveNotifyConfig}
        />
      )}

      <AddRoom
        visible={showAddRoom}
        onClose={() => setShowAddRoom(false)}
        onAdd={handleAddRoom}
      />

      <table className="room-table">
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
              <td>{room.roomId}</td>
              <td>{room.output}</td>
              <td>{room.platform}</td>
              <td>{room.isLiving ? '直播中' : '未开播'}</td>
              <td>
                <Switch
                  checked={room.notify?.enable_notify}
                  onChange={(checked) => handleNotifyChange(room.url, checked)}
                />
              </td>
              <td>
                <Button type="primary" size="small">开启监控</Button>
                <Button 
                  danger 
                  size="small" 
                  onClick={() => handleDeleteRoom(room.url)}
                >
                  删除
                </Button>
                <Button size="small">文件</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 
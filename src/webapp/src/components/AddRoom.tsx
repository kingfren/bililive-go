import React from 'react';
import { Form, Input, Select, Modal } from 'antd';
import type { LiveRoomConfig } from '../types/notification';

interface AddRoomProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (room: Partial<LiveRoomConfig>) => Promise<void>;
}

export const AddRoom: React.FC<AddRoomProps> = ({ visible, onClose, onAdd }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onAdd(values);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('添加房间失败:', error);
    }
  };

  return (
    <Modal
      title="添加直播间"
      open={visible}
      onOk={handleSubmit}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="平台"
          name="platform"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="bilibili">哔哩哔哩</Select.Option>
            <Select.Option value="douyu">斗鱼</Select.Option>
            <Select.Option value="huya">虎牙</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="房间ID"
          name="roomId"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入直播间ID" />
        </Form.Item>

        <Form.Item
          label="输出路径"
          name="output"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入视频保存路径" />
        </Form.Item>

        <Form.Item
          label="清晰度"
          name="quality"
        >
          <Select>
            <Select.Option value="best">最高画质</Select.Option>
            <Select.Option value="high">高清</Select.Option>
            <Select.Option value="medium">中等</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}; 
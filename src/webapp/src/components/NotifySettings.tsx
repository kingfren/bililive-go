import React from 'react';
import { Form, Input, Switch, Card, Select, Space } from 'antd';
import type { NotifyConfig } from '../types/notification';

interface NotifySettingsProps {
    config: NotifyConfig;
    onSave: (config: NotifyConfig) => void;
}

export const NotifySettings: React.FC<NotifySettingsProps> = ({ config, onSave }) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        onSave({
            ...config,
            ...values
        });
    };

    return (
        <Card title="通知设置">
            <Form
                form={form}
                layout="vertical"
                initialValues={config}
                onFinish={onFinish}
            >
                <Form.Item label="启用通知" name="enable_notify" valuePropName="checked">
                    <Switch />
                </Form.Item>

                {/* Telegram 设置 */}
                <Card type="inner" title="Telegram 设置">
                    <Form.Item label="Bot Token" name={['telegram', 'bot_token']}>
                        <Input placeholder="请输入 Telegram Bot Token" />
                    </Form.Item>
                    <Form.Item label="Chat ID" name={['telegram', 'chat_id']}>
                        <Input placeholder="请输入 Telegram Chat ID" />
                    </Form.Item>
                </Card>

                {/* Discord 设置 */}
                <Card type="inner" title="Discord 设置">
                    <Form.Item label="Webhook URL" name={['discord', 'webhook_url']}>
                        <Input placeholder="请输入 Discord Webhook URL" />
                    </Form.Item>
                </Card>

                {/* Bark 设置 */}
                <Card type="inner" title="Bark 设置">
                    <Form.Item label="服务器地址" name={['bark', 'server_url']}>
                        <Input placeholder="请输入 Bark 服务器地址" />
                    </Form.Item>
                    <Form.Item label="设备密钥" name={['bark', 'device_key']}>
                        <Input placeholder="请输入 Bark 设备密钥" />
                    </Form.Item>
                </Card>

                {/* 邮件设置 */}
                <Card type="inner" title="邮件通知设置">
                    <Form.Item label="SMTP 服务器" name={['email', 'smtp_server']}>
                        <Input placeholder="例如: smtp.gmail.com" />
                    </Form.Item>
                    <Form.Item label="SMTP 端口" name={['email', 'smtp_port']}>
                        <Input type="number" placeholder="例如: 587" />
                    </Form.Item>
                    <Form.Item label="用户名" name={['email', 'username']}>
                        <Input placeholder="SMTP 用户名" />
                    </Form.Item>
                    <Form.Item label="密码" name={['email', 'password']}>
                        <Input.Password placeholder="SMTP 密码或授权码" />
                    </Form.Item>
                    <Form.Item label="发件人地址" name={['email', 'from_address']}>
                        <Input placeholder="发件人邮箱地址" />
                    </Form.Item>
                    <Form.Item label="收件人地址" name={['email', 'to_address']}>
                        <Input placeholder="收件人邮箱地址" />
                    </Form.Item>
                    <Form.Item label="使用 SSL" name={['email', 'use_ssl']} valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Card>

                {/* Webhook 设置 */}
                <Card type="inner" title="Webhook 设置">
                    <Form.Item label="Webhook URL" name={['webhook', 'url']}>
                        <Input placeholder="请输入 Webhook URL" />
                    </Form.Item>
                    <Form.Item label="请求方法" name={['webhook', 'method']}>
                        <Select>
                            <Select.Option value="GET">GET</Select.Option>
                            <Select.Option value="POST">POST</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="请求头" name={['webhook', 'headers']}>
                        <Input.TextArea 
                            placeholder="请输入 JSON 格式的请求头，例如：&#10;{&#10;  &quot;Content-Type&quot;: &quot;application/json&quot;,&#10;  &quot;Authorization&quot;: &quot;Bearer token&quot;&#10;}"
                            rows={4}
                        />
                    </Form.Item>
                    <Form.Item label="请求体模板" name={['webhook', 'body_template']}>
                        <Input.TextArea 
                            placeholder="请输入 JSON 格式的请求体模板，支持变量替换：&#10;{&#10;  &quot;room_id&quot;: &quot;${roomId}&quot;,&#10;  &quot;status&quot;: &quot;${status}&quot;&#10;}"
                            rows={4}
                        />
                    </Form.Item>
                </Card>

                <Form.Item>
                    <button type="submit">保存设置</button>
                </Form.Item>
            </Form>
        </Card>
    );
}; 
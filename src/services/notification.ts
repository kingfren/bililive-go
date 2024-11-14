import nodemailer from 'nodemailer';
import axios from 'axios';
import { NotifyConfig, RoomNotifyConfig } from '../types/notification';

export class NotificationService {
  private config: NotifyConfig;

  constructor(config: NotifyConfig) {
    this.config = config;
  }

  async sendEmail(subject: string, content: string): Promise<void> {
    if (!this.config.email.enable) return;

    const transporter = nodemailer.createTransport({
      host: this.config.email.smtp_host,
      port: this.config.email.smtp_port,
      secure: this.config.email.smtp_port === 465,
      auth: {
        user: this.config.email.username,
        pass: this.config.email.password,
      },
    });

    await transporter.sendMail({
      from: this.config.email.username,
      to: this.config.email.to.join(','),
      subject,
      text: content,
    });
  }

  async sendTelegram(message: string): Promise<void> {
    if (!this.config.telegram.enable) return;

    const url = `https://api.telegram.org/bot${this.config.telegram.bot_token}/sendMessage`;
    await axios.post(url, {
      chat_id: this.config.telegram.chat_id,
      text: message,
      parse_mode: 'Markdown',
    });
  }

  async sendWebhook(data: any): Promise<void> {
    if (!this.config.webhook.enable) return;

    await axios({
      method: this.config.webhook.method,
      url: this.config.webhook.url,
      data,
    });
  }

  async notifyLiveStart(roomInfo: {
    platform: string;
    roomId: string;
    streamerName: string;
    title: string;
    url: string;
    notify?: RoomNotifyConfig;
  }): Promise<void> {
    if (!this.config.events.on_live_start || !roomInfo.notify?.enable_notify) return;

    const message = `
🔴 开播通知
主播: ${roomInfo.streamerName}
平台: ${roomInfo.platform}
标题: ${roomInfo.title}
直播间: ${roomInfo.url}
    `.trim();

    try {
      await Promise.all([
        this.sendEmail('直播开始通知', message),
        this.sendTelegram(message),
        this.sendWebhook({
          type: 'live_start',
          ...roomInfo,
        }),
      ]);
    } catch (error) {
      console.error('发送通知失败:', error);
    }
  }

  async notifyLiveEnd(roomInfo: {
    platform: string;
    roomId: string;
    streamerName: string;
    notify?: RoomNotifyConfig;
  }): Promise<void> {
    if (!this.config.events.on_live_end || !roomInfo.notify?.enable_notify) return;

    const message = `
⚪ 下播通知
主播: ${roomInfo.streamerName}
平台: ${roomInfo.platform}
    `.trim();

    try {
      await Promise.all([
        this.sendEmail('直播结束通知', message),
        this.sendTelegram(message),
        this.sendWebhook({
          type: 'live_end',
          ...roomInfo,
        }),
      ]);
    } catch (error) {
      console.error('发送通知失败:', error);
    }
  }
} 
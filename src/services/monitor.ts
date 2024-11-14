import { NotificationService } from './notification';

export class LiveMonitor {
  private notificationService: NotificationService;

  constructor(config: any) {
    this.notificationService = new NotificationService(config.notify);
  }

  // 在检测到直播开始时调用
  private async onLiveStart(roomInfo: any) {
    await this.notificationService.notifyLiveStart({
      platform: roomInfo.platform,
      roomId: roomInfo.roomId,
      streamerName: roomInfo.streamerName,
      title: roomInfo.title,
      url: roomInfo.url,
    });
  }

  // 在检测到直播结束时调用
  private async onLiveEnd(roomInfo: any) {
    await this.notificationService.notifyLiveEnd({
      platform: roomInfo.platform,
      roomId: roomInfo.roomId,
      streamerName: roomInfo.streamerName,
    });
  }
} 
/* eslint-disable no-case-declarations */
import TcpSocket from 'react-native-tcp-socket';

import { ConnectDeviceInfo } from './connectDeviceInfo';
import eventBus from './eventBus';
import {
  ElectricEvent,
  IdEvent,
  ErrorEvent,
  StatusEvent,
  OverageEvent,
  OrbitEvent,
  NodeEvent,
  OrbitChangeEvent,
  NodeChangeEvent,
  ChangeEvent,
  RebootEvent,
  DownEvent,
  WifiEvent,
} from './events';

import { GlobalActivityIndicatorManager } from '@/components/activity-indicator-global';
import { GlobalSnackbarManager } from '@/components/snackbar-global';
import { GlobalConst, TyingState } from '@/constants';
import { Command } from '@/constants/command';

export class SocketManage {
  private static instance: SocketManage;
  private ip: string;
  private port: number;
  private socket!: TcpSocket.Socket | null;

  private constructor() {
    this.ip = '';
    this.port = 8080;
  }

  // 获取单例实例的静态方法
  public static getInstance(): SocketManage {
    if (!SocketManage.instance) {
      SocketManage.instance = new SocketManage();
    }
    return SocketManage.instance;
  }

  setWifi(ip: string, port: number) {
    this.ip = ip;
    this.port = port;
  }

  async connectSocket() {
    if (!this.ip || !this.port) {
      console.error('ip or port is not set');
      return;
    }

    try {
      // 创建TCP Socket连接，而不是WebSocket
      const options = {
        host: this.ip,
        port: this.port,
      };

      const socket = TcpSocket.createConnection(options, () => {
        console.error('socket connected');
        ConnectDeviceInfo.setWifiIp(this.ip);
        ConnectDeviceInfo.connectStatus = true;

        // 发送登录成功命令
        this.writeData(`${GlobalConst.forwardCmd}:${Command.loginSuccess}`);

        // 发布WiFi连接成功事件
        eventBus.publish(new WifiEvent(true).eventName, new WifiEvent(true).data);
        GlobalActivityIndicatorManager.current?.show('WiFi连接成功');
      });

      this.socket = socket;

      socket.on('data', (data) => {
        // 需要处理buffer到字符串的转换
        const eventData = data.toString();
        this.onData(eventData);
      });

      socket.on('error', (error) => {
        console.error('socket error', error);
      });

      socket.on('close', () => {
        console.log('socket closed');
        this.onDone();
      });
    } catch (error) {
      console.error('Unable to connect:', error);
      GlobalActivityIndicatorManager.current?.show('WiFi连接失败');
      ConnectDeviceInfo.disConnect();
    }
  }

  onDone() {
    ConnectDeviceInfo.disConnect();
    eventBus.publish(new WifiEvent(false).eventName, new WifiEvent(false).eventName);
    GlobalActivityIndicatorManager.current?.show('wifi连接已断开');
  }

  onData(event: string) {
    try {
      const eventData = event;
      const listStr = eventData.split(':');
      const command = listStr[0];
      if (command === GlobalConst.forwardUp) {
        switch (listStr[1]) {
          case GlobalConst.id:
            ConnectDeviceInfo.id = listStr?.[2];
            eventBus.publish(new IdEvent(listStr?.[2]).eventName, new IdEvent(listStr?.[2]).data);
            break;
          case GlobalConst.electric:
            const temp = parseFloat(listStr?.[2]);
            ConnectDeviceInfo.electric = temp;
            eventBus.publish(new ElectricEvent(temp).eventName, new ElectricEvent(temp).data);
            break;
          case GlobalConst.status:
            let temp2;
            if (listStr[2] === `2,${GlobalConst.error}`) {
              temp2 = TyingState.error;
              const faultId = parseInt(listStr?.[3], 10);
              eventBus.publish(new ErrorEvent(faultId).eventName, new ErrorEvent(faultId).data);
            } else {
              temp2 = parseInt(listStr[2], 10);
            }
            console.error(`receive 工作状态:${temp2}`);
            ConnectDeviceInfo.workStatus = temp2;
            eventBus.publish(new StatusEvent(temp2).eventName, new StatusEvent(temp2).data);
            break;
          case GlobalConst.overage:
            const temp3 = parseFloat(listStr?.[2]);
            eventBus.publish(new OverageEvent(temp3).eventName, new OverageEvent(temp3).data);
            break;
          case GlobalConst.orbitLaser:
            const temp4 = parseFloat(listStr?.[2]);
            eventBus.publish(new OrbitEvent(temp4).eventName, new OrbitEvent(temp4).data);
            break;
          case GlobalConst.nodeLaser:
            const temp5 = parseFloat(listStr?.[2]);
            eventBus.publish(new NodeEvent(temp5).eventName, new NodeEvent(temp5).data);
            break;
          case GlobalConst.orbitChangeLaser:
            const temp6 = parseFloat(listStr?.[2]);
            eventBus.publish(
              new OrbitChangeEvent(temp6).eventName,
              new OrbitChangeEvent(temp6).data
            );
            break;
          case GlobalConst.nodeChangeLaser:
            const temp7 = parseFloat(listStr?.[2]);
            eventBus.publish(new NodeChangeEvent(temp7).eventName, new NodeChangeEvent(temp7).data);
            break;
          case GlobalConst.changeStatus:
            const temp8 = parseInt(listStr?.[2], 10);
            eventBus.publish(new ChangeEvent(temp8).eventName, new ChangeEvent(temp8).data);
            break;
          case GlobalConst.rebootStatus:
            const temp9 = parseInt(listStr?.[2], 10);
            eventBus.publish(new RebootEvent(temp9).eventName, new RebootEvent(temp9).data);
            break;
          case GlobalConst.downStatus:
            const temp10 = parseInt(listStr?.[2], 10);
            eventBus.publish(new DownEvent(temp10).eventName, new DownEvent(temp10).data);
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error('onData error', error);
    }
  }

  writeData(fd: string) {
    try {
      if (ConnectDeviceInfo.connectStatus && this.socket) {
        const result = this.socket.write(fd, 'utf8');

        GlobalSnackbarManager.current?.show({
          content: `数据已发送: ${fd}, 写入结果: ${result}`,
        });
      } else {
        GlobalSnackbarManager.current?.show({
          content: 'socket is not connected',
        });
        console.error('socket is not connected');
      }
    } catch (error) {
      GlobalSnackbarManager.current?.show({
        content: `writeData error ${error}`,
      });
      console.error('writeData error', error);
    }
  }

  isConnected() {
    if (!this.socket) {
      return false;
    }

    // 如果socket已被销毁，则表示未连接
    if (this.socket.destroyed) {
      return false;
    }

    // 对于react-native-tcp-socket，可以检查这些属性
    // connecting为true表示正在连接
    // 只有当!destroyed && !connecting && !closing时才是真正已连接状态
    return !this.socket.connecting;
  }

  // 断开连接方法
  disconnectSocket() {
    if (this.socket) {
      this.socket.destroy();
    }
  }
}

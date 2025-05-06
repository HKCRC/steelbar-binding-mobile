/* eslint-disable no-case-declarations */
import WebSocket from 'isomorphic-ws';

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
import { GlobalConst, TyingState } from '@/constants';

export class SocketManage {
  private static instance: SocketManage;
  private ip: string;
  private port: number;
  private socket: WebSocket;

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
    const socket = new WebSocket(`ws://${this.ip}:${this.port}`);
    socket.binaryType = 'blob';

    if (socket) {
      this.socket = socket;
      ConnectDeviceInfo.setWifiIp(this.ip);
      ConnectDeviceInfo.connectStatus = true;

      socket.onopen = () => {
        console.log('socket connected');
      };
      socket.onmessage = (event: any) => {
        this.onData(event);
      };
      socket.onerror = (event: any) => {
        console.error('socket error', event);
      };

      socket.onclose = () => {
        console.log('socket closed');
        this.onDone();
      };
    }
  }

  onDone() {
    ConnectDeviceInfo.disConnect();
    eventBus.publish(new WifiEvent(false).eventName, new WifiEvent(false).eventName);
    GlobalActivityIndicatorManager.current?.show('wifi连接已断开');
  }

  onData(event: any) {
    console.log('onData', event);
    const eventData = event.data;
    const listStr = eventData.split(':');
    const command = listStr[0];
    if (command === GlobalConst.forwardUp) {
      switch (listStr[1]) {
        case GlobalConst.id:
          ConnectDeviceInfo.id = listStr?.[2];
          eventBus.publish(new IdEvent(listStr?.[2]).eventName, new IdEvent(listStr?.[2]).data);
          break;
        case GlobalConst.electric:
          const temp = listStr?.[2];
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
          eventBus.publish(new OrbitChangeEvent(temp6).eventName, new OrbitChangeEvent(temp6).data);
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
  }

  writeData(fd: string) {
    if (ConnectDeviceInfo.connectStatus) {
      this.socket.send(fd);
      console.error(`${fd} send`);
    } else {
      console.error('socket is not connected');
    }
  }

  // 断开连接方法
  disconnectSocket() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

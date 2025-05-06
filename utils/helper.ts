import * as Network from 'expo-network';
import WifiManager from 'react-native-wifi-reborn';

import { ConnectDeviceInfo } from './connectDeviceInfo';
import { SocketManage } from './socketManage';

import { GlobalSnackbarManager } from '@/components/snackbar-global';
import { GlobalConst } from '@/constants';

export const delayed = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const globalGetConnect = async () => {
  try {
    const netWorkInfo = await Network.getNetworkStateAsync();
    if (netWorkInfo.isConnected && netWorkInfo.type === Network.NetworkStateType.WIFI) {
      const connectedWifiSSID = await WifiManager.getCurrentWifiSSID();
      const getWifiIp = await WifiManager.getIP();
      if (
        connectedWifiSSID !== '' &&
        getWifiIp !== '' &&
        connectedWifiSSID.indexOf(GlobalConst.wifiName) > -1
      ) {
        ConnectDeviceInfo.setWifiIp(getWifiIp);
        const socket = SocketManage.getInstance();
        const ip = getWifiIp;
        const port = ConnectDeviceInfo.wifiPort;

        if (ip !== '' && port !== 0) {
          // 设置WiFi IP 和 port
          socket.setWifi(ip, port);
          // 连接socket
          socket.connectSocket();
        } else {
          GlobalSnackbarManager.current?.show({
            content: '缺少WiFi IP 或 port',
          });
        }
      }
    }
  } catch (error) {
    console.error('error', error);
    GlobalSnackbarManager.current?.show({
      content: '获取网络状态失败',
    });
  }
};

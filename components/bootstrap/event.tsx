import { useEffect } from 'react';

import { GlobalActivityIndicatorManager } from '../activity-indicator-global';

import { ChangeState, DownState, RebootState } from '@/constants';
import { eventBusKey } from '@/constants/event';
import useStore from '@/store';
import eventBus from '@/utils/eventBus';

export const EventHandler = () => {
  const { setRobotStatus, setWorkParams, setErrorGroup, errorGroup } = useStore((state) => state);

  useEffect(() => {
    eventBus.subscribe(eventBusKey.StopEvent, (eStop: boolean) => {
      console.log('停止', eStop);
      setRobotStatus({
        robotDangerStatus: eStop,
      });
    });

    eventBus.subscribe(eventBusKey.OverageEvent, (eRage: number) => {
      console.log('卷丝余量', eRage);
      setRobotStatus({
        overage: eRage,
      });
    });

    eventBus.subscribe(eventBusKey.OrbitEvent, (eLaser: number) => {
      console.log('变轨激光范围', eLaser);
      setWorkParams({
        track_laser_range: eLaser.toString(),
      });
    });

    eventBus.subscribe(eventBusKey.NodeEvent, (eLaser: number) => {
      console.log('节点激光', eLaser);
      setWorkParams({
        node_laser_range: eLaser.toString(),
      });
    });

    eventBus.subscribe(eventBusKey.OrbitChangeEvent, (eChangeLaser: number) => {
      console.log('变轨激光范围', eChangeLaser);
      setWorkParams({
        inputOrbitMax: eChangeLaser,
      });
    });

    eventBus.subscribe(eventBusKey.NodeChangeEvent, (eChangeLaser: number) => {
      console.log('节点激光范围', eChangeLaser);
      setWorkParams({
        inputNodeMax: eChangeLaser,
      });
    });

    eventBus.subscribe(eventBusKey.ChangeEvent, (eState: ChangeState) => {
      console.log('变轨状态', eState);
      if (eState === ChangeState.move) {
        GlobalActivityIndicatorManager.current?.show('变轨中...', 0);
      } else {
        GlobalActivityIndicatorManager.current?.hide();
      }
    });

    eventBus.subscribe(eventBusKey.RebootEvent, (eState: RebootState) => {
      console.log('复位状态', eState);
      if (eState === RebootState.rebooting) {
        GlobalActivityIndicatorManager.current?.show('正在复位...', 0);
      } else {
        GlobalActivityIndicatorManager.current?.hide();
      }
    });

    eventBus.subscribe(eventBusKey.DownEvent, (eState: DownState) => {
      console.log('下降状态', eState);
      if (eState === DownState.downing) {
        GlobalActivityIndicatorManager.current?.show('正在下降...', 0);
      } else {
        GlobalActivityIndicatorManager.current?.hide();
      }
    });

    eventBus.subscribe(eventBusKey.ErrorEvent, (eError: number) => {
      console.log('错误', eError);
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      let nowIndex = 0; //错误存在的下标
      let isExist = false;
      for (let i = 0; i < errorGroup.length; i++) {
        if (eError - 1 === errorGroup[i].errorId) {
          isExist = true;
          nowIndex = i;
          break;
        }
      }
      if (isExist) {
        errorGroup[nowIndex].time = `${hours}:${minutes}:${seconds}`;
      } else {
        const temp = {
          time: `${hours}:${minutes}:${seconds}`,
          errorId: eError - 1,
        };
        setErrorGroup({
          ...errorGroup,
          ...temp,
        });
      }
    });

    return () => {
      eventBus.clear();
    };
  }, []);
  return null;
};

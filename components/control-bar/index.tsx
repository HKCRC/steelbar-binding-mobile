import { useState } from 'react';
import { Text, View } from 'react-native';
import { Card, Icon } from 'react-native-paper';

import { ControlAutoSelectDirection } from '../control-auto-select-direction';
import { ControlExtraModule } from '../control-extra-module';
import { ControlManualControl } from '../control-manual-control';
import { ControlSegmented } from '../control-segmented';
import { GlobalSnackbarManager } from '../snackbar-global';

import { Command } from '@/constants/command';
import useStore from '@/store';
import { ROBOT_CURRENT_MODE, ROBOT_WORK_MODE } from '@/types';
import { sendCmdDispatch } from '@/utils/helper';

export const ControlBar = () => {
  const { robotStatus, workParams, setRobotStatus } = useStore((state) => state);

  // 点击开始
  const startTyping = () => {
    if (workParams.auto_find_point) {
      GlobalSnackbarManager.current?.show({
        content: '自动寻点模式下，无法进行操作',
      });
      return;
    }

    if (!robotStatus.isWorking) {
      switch (robotStatus.currentBindingMode) {
        case ROBOT_WORK_MODE.WITHOUT_BINDING:
          sendCmdDispatch(Command.noLashed);
          break;
        case ROBOT_WORK_MODE.FULL_BINDING:
          sendCmdDispatch(Command.allLashed);
          break;
        case ROBOT_WORK_MODE.SKIP_BINDING:
          sendCmdDispatch(Command.jumpLashed);
          break;
        default:
          GlobalSnackbarManager.current?.show({
            content: '当前绑扎模式不支持',
          });
          break;
      }
    } else {
      sendCmdDispatch(Command.manualModel);
      setRobotStatus({
        isWorking: false,
      });
    }
  };

  const renderControl = () => {
    if (robotStatus.currentMode === ROBOT_CURRENT_MODE.LOCKED) {
      return (
        <View className="flex h-[180px] w-[150px] flex-row items-center justify-center gap-x-2">
          <Icon source="lock" size={22} />
          <Text className="text-center text-xl font-normal text-black">锁止模式</Text>
        </View>
      );
    } else if (robotStatus.currentMode === ROBOT_CURRENT_MODE.MANUAL) {
      return <ControlManualControl />;
    } else {
      return <ControlAutoSelectDirection onStart={startTyping} />;
    }
  };

  return (
    <Card className="relative pb-8">
      <View className="flex h-full w-full flex-col justify-between px-8 pt-2">
        <View className="mb-5 flex flex-col items-center">
          <View className="mb-2 mt-3 flex flex-row items-center justify-center">
            <Icon source="robot-happy-outline" size={22} />
            <Text className="-top-[1px] ml-2 text-center text-2xl font-bold">机器人操作</Text>
          </View>
          <ControlSegmented />

          {renderControl()}
        </View>

        <View className="mt-20 flex w-full flex-row justify-end gap-x-5">
          <ControlExtraModule />
        </View>
      </View>
    </Card>
  );
};

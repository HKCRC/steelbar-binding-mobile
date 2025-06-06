import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { SelectJumpCount } from '../select-jump-count';
import { GlobalSnackbarManager } from '../snackbar-global';

import { DownState, RebootState } from '@/constants';
import { Command } from '@/constants/command';
import useStore, { initWorkParams } from '@/store';
import { ROBOT_CURRENT_MODE, ROBOT_WORK_MODE } from '@/types';
import { globalGetConnect, sendCmdDispatch } from '@/utils/helper';
import { SocketManage } from '@/utils/socketManage';

export const ControlExtraModule = () => {
  const { robotStatus, workParams, setWorkParams } = useStore((state) => state);
  const { t } = useTranslation();
  const isInLockedMode = () => {
    if (robotStatus.currentMode === ROBOT_CURRENT_MODE.LOCKED) {
      GlobalSnackbarManager.current?.show({
        content: t('errors.lockModeTips') as string,
      });
      return true;
    }
    return false;
  };

  const robotReset = () => {
    if (isInLockedMode()) {
      return;
    }

    if (workParams.auto_find_point) {
      GlobalSnackbarManager.current?.show({
        content: t('errors.autoFindPointTips3') as string,
      });
      return;
    }

    if (robotStatus.downState === DownState.finish) {
      sendCmdDispatch(Command.machineReboot);
      setWorkParams({
        ...initWorkParams,
      });
      SocketManage.getInstance().disconnectSocket();
      setTimeout(() => {
        globalGetConnect();
        // 10s后重新连接
      }, 10000);
    }
  };

  const robotDown = () => {
    if (isInLockedMode()) {
      return;
    }

    if (workParams.auto_find_point) {
      GlobalSnackbarManager.current?.show({
        content: t('errors.autoFindPointTips2') as string,
      });
      return;
    }
    sendCmdDispatch(Command.machineDescent);
  };

  const robotReboot = () => {
    if (isInLockedMode()) {
      return;
    }

    if (workParams.auto_find_point) {
      GlobalSnackbarManager.current?.show({
        content: t('errors.autoFindPointTips') as string,
      });
      return;
    }
    if (robotStatus.rebootState === RebootState.finish) {
      sendCmdDispatch(Command.lashedReboot);
    }
  };

  return (
    <View className="relative flex w-full flex-row items-center justify-between">
      {robotStatus.currentMode === ROBOT_CURRENT_MODE.AUTO &&
      robotStatus.currentBindingMode === ROBOT_WORK_MODE.SKIP_BINDING ? (
        <SelectJumpCount />
      ) : (
        <View className="w-2 opacity-0" />
      )}
      <View className="flex gap-y-5">
        <Button icon="reload" mode="elevated" onPress={robotReboot}>
          {t('common.tyingRobotRestart') as string}
        </Button>
        <Button icon="restart" mode="elevated" onPress={robotReset}>
          {t('common.machineRestart') as string}
        </Button>
        <Button icon="elevator-down" mode="elevated" onPress={robotDown}>
          {t('common.machineDown') as string}
        </Button>
      </View>
    </View>
  );
};

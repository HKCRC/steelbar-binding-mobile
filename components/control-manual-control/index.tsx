import { Image } from 'expo-image';
import { TouchableOpacity, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

import { GlobalSnackbarManager } from '../snackbar-global';

import { ChangeState } from '@/constants';
import { Command } from '@/constants/command';
import useStore from '@/store';
import { DIRECTION } from '@/types';
import { debounce, sendCmdDispatch } from '@/utils/helper';

export const ControlManualControl = () => {
  const { robotStatus } = useStore((state) => state);

  // 为什么不用switch 因为似乎switch对于里面再定义复杂逻辑会提示不能重复定义let/const等逻辑
  const switchLeftOrRight = debounce((direction: DIRECTION) => {
    if (direction === DIRECTION.LEFT) {
      // 左右移动要等变轨完成
      if (robotStatus.changeState === ChangeState.finish) {
        sendCmdDispatch(Command.goLeft);
      } else {
        GlobalSnackbarManager.current?.show({
          content: '变轨中，请等待',
        });
      }
    } else if (direction === DIRECTION.RIGHT) {
      if (robotStatus.changeState === ChangeState.finish) {
        sendCmdDispatch(Command.goRight);
      }
    }
  }, 400);

  const switchTop = (isPressed: boolean) => {
    if (isPressed) {
      sendCmdDispatch(Command.goForward);
    } else {
      sendCmdDispatch(Command.release);
    }
  };

  const switchDown = (isPressed: boolean) => {
    if (isPressed) {
      sendCmdDispatch(Command.goBack);
    } else {
      sendCmdDispatch(Command.release);
    }
  };

  return (
    <View className="relative mt-1.5 flex h-[180px] w-[150px] flex-row items-center justify-center gap-x-5">
      <View className="absolute left-0 top-0 h-full w-full flex-col items-center justify-center gap-y-10">
        <TouchableRipple
          onPressIn={() => switchTop(true)}
          onPressOut={() => switchTop(false)}
          centered
          rippleColor="rgba(0, 0, 0, .32)"
          style={{ top: -32 }}
          className="rounded-full px-2 py-2"
          borderless>
          <Image
            source={require('@/assets/icon/top-arrow.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableRipple>
        <TouchableRipple
          onPressIn={() => switchDown(true)}
          onPressOut={() => switchDown(false)}
          centered
          style={{ top: 32 }}
          className="rounded-full px-2 py-2"
          borderless
          rippleColor="rgba(0, 0, 0, .32)">
          <Image
            source={require('@/assets/icon/down-arrow.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableRipple>
      </View>

      {/* <TouchableOpacity onPress={tryTest} className="flex rounded-full bg-[#012641] px-5 py-5">
        <Text className="text-center text-lg text-white">试扎</Text>
      </TouchableOpacity> */}

      <View className="absolute left-0 top-0 h-full w-full flex-row items-center justify-center gap-x-10">
        <TouchableRipple
          onPress={() => switchLeftOrRight(DIRECTION.LEFT)}
          centered
          style={{ left: -40 }}
          className="rounded-full px-2 py-2"
          borderless
          rippleColor="rgba(0, 0, 0, .32)">
          <Image
            source={require('@/assets/icon/left-arrow.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableRipple>
        <TouchableRipple
          onPress={() => switchLeftOrRight(DIRECTION.RIGHT)}
          centered
          borderless
          style={{ left: 40 }}
          className="rounded-full px-2 py-2"
          rippleColor="rgba(0, 0, 0, .32)">
          <Image
            source={require('@/assets/icon/right-arrow.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableRipple>
      </View>
    </View>
  );
};

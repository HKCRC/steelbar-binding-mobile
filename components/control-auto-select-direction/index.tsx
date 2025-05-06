import { CaretDown, CaretLeft, CaretRight, CaretUp } from 'phosphor-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

import { GlobalSnackbarManager } from '../snackbar-global';

import useStore from '@/store';
import { DIRECTION } from '@/types';

export const ControlAutoSelectDirection = () => {
  const { setRobotStatus, robotStatus } = useStore((state) => state);

  const handlePlay = () => {
    let count = 0;
    let mutualExclusion = false;
    robotStatus.direction.forEach((val, direction) => {
      if (val) {
        count++;
      }
      if (
        direction === DIRECTION.UP &&
        val === true &&
        robotStatus.direction.get(DIRECTION.DOWN) === true
      ) {
        mutualExclusion = true;
      }

      if (
        direction === DIRECTION.LEFT &&
        val === true &&
        robotStatus.direction.get(DIRECTION.RIGHT) === true
      ) {
        mutualExclusion = true;
      }

      if (
        direction === DIRECTION.RIGHT &&
        val === true &&
        robotStatus.direction.get(DIRECTION.LEFT) === true
      ) {
        mutualExclusion = true;
      }

      if (
        direction === DIRECTION.DOWN &&
        val === true &&
        robotStatus.direction.get(DIRECTION.UP) === true
      ) {
        mutualExclusion = true;
      }
    });

    if (count === 0) {
      GlobalSnackbarManager.current?.show({
        content: '必须选择一个方向',
      });
      return;
    }

    if (count > 2) {
      GlobalSnackbarManager.current?.show({
        content: '你只能选择2个方向',
      });
      return;
    }

    if (mutualExclusion) {
      GlobalSnackbarManager.current?.show({
        content: '你只能选择2个不互斥的方向',
      });
      return;
    }

    setRobotStatus({
      isWorking: !robotStatus.isWorking,
    });
  };

  const directionClick = (direction: DIRECTION) => {
    setRobotStatus({
      direction: new Map(robotStatus.direction).set(
        direction,
        !robotStatus.direction.get(direction)
      ),
    });
  };

  return (
    <View className="relative mt-10 flex flex-row items-center justify-center gap-x-5">
      <View className="absolute left-0 top-0 h-full w-full flex-col items-center justify-center gap-y-10">
        <TouchableOpacity onPress={() => directionClick(DIRECTION.UP)} className="-top-[50px]">
          <CaretUp
            size={48}
            weight={robotStatus.direction.get(DIRECTION.UP) === true ? 'fill' : 'duotone'}
            color="#0126416F"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => directionClick(DIRECTION.DOWN)} className="-bottom-[50px]">
          <CaretDown
            size={48}
            weight={robotStatus.direction.get(DIRECTION.DOWN) === true ? 'fill' : 'duotone'}
            color="#0126416F"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handlePlay}
        className="relative flex w-full flex-row items-center justify-center">
        <View className="flex">
          {robotStatus.isWorking ? (
            <View className="flex h-[120px] w-[120px] flex-row items-center justify-center rounded-full bg-[#012641] p-5">
              <Text className="text-center text-2xl font-semibold text-white">暂停</Text>
            </View>
          ) : (
            <View className="flex h-[120px] w-[120px] flex-row items-center justify-center rounded-full bg-[#012641] p-5">
              <Text className="text-center text-2xl font-semibold text-white">开始</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <View className="absolute left-0 top-0 h-full w-full flex-row items-center justify-center gap-x-10">
        <TouchableOpacity onPress={() => directionClick(DIRECTION.LEFT)} className="-left-[50px]">
          <CaretLeft
            size={48}
            weight={robotStatus.direction.get(DIRECTION.LEFT) === true ? 'fill' : 'duotone'}
            color="#0126416F"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => directionClick(DIRECTION.RIGHT)} className="-right-[50px]">
          <CaretRight
            size={48}
            weight={robotStatus.direction.get(DIRECTION.RIGHT) === true ? 'fill' : 'duotone'}
            color="#0126416F"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

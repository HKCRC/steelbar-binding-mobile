import { CaretDown, CaretLeft, CaretRight, CaretUp } from 'phosphor-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';

import { GlobalSnackbarManager } from '../snackbar-global';

import useStore from '@/store';
import { DIRECTION } from '@/types';

interface ControlAutoSelectDirectionProps {
  onStart: () => void;
}

export const ControlAutoSelectDirection = ({ onStart }: ControlAutoSelectDirectionProps) => {
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

    // 开始

    onStart();
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
        <TouchableOpacity onPress={() => directionClick(DIRECTION.UP)} className="-top-[30px]">
          <CaretUp
            size={50}
            weight={robotStatus.direction.get(DIRECTION.UP) === true ? 'fill' : 'duotone'}
            color="#0126416F"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => directionClick(DIRECTION.DOWN)} className="-bottom-[30px]">
          <CaretDown
            size={50}
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
            <View className="flex h-[80px] w-[80px] flex-row items-center justify-center rounded-full bg-[#012641]">
              <Icon source="pause" color="#ffffff" size={22} />
              <Text className="ml-1 text-center text-xl font-normal text-white">暂停</Text>
            </View>
          ) : (
            <View className="flex h-[80px] w-[80px] flex-row items-center justify-center rounded-full bg-[#012641]">
              <Icon source="play" color="#ffffff" size={22} />
              <Text className="ml-1 text-center text-xl font-normal text-white">开始</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <View className="absolute left-0 top-0 h-full w-full flex-row items-center justify-center gap-x-10">
        <TouchableOpacity onPress={() => directionClick(DIRECTION.LEFT)} className="-left-[30px]">
          <CaretLeft
            size={50}
            weight={robotStatus.direction.get(DIRECTION.LEFT) === true ? 'fill' : 'duotone'}
            color="#0126416F"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => directionClick(DIRECTION.RIGHT)} className="-right-[30px]">
          <CaretRight
            size={50}
            weight={robotStatus.direction.get(DIRECTION.RIGHT) === true ? 'fill' : 'duotone'}
            color="#0126416F"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

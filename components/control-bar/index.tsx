import { Image } from 'expo-image';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Card, Icon, SegmentedButtons } from 'react-native-paper';

import { ControlAutoSelectDirection } from '../control-auto-select-direction';
import { ControlExtraModule } from '../control-extra-module';

import useStore from '@/store';
import { ROBOT_CURRENT_MODE, ROBOT_WORK_MODE } from '@/types';

export const ControlBar = () => {
  const { setRobotStatus, robotStatus } = useStore((state) => state);
  const [action, setAction] = useState(ROBOT_CURRENT_MODE.LOCKED);
  const [bindMode, setBindMode] = useState(ROBOT_WORK_MODE.WITHOUT_BINDING);

  return (
    <Card className="relative pb-8">
      <View className="flex h-full w-full flex-col px-8 pb-8 pt-4">
        <View className="mb-5 flex flex-col items-center">
          <View className="mb-2 mt-3 flex flex-row items-center justify-center">
            <Icon source="robot-happy-outline" size={22} />
            <Text className="-top-[1px] ml-2 text-center text-2xl font-bold">机器人操作</Text>
          </View>
          <View className="mb-10 mt-4 w-full gap-y-5">
            <SegmentedButtons
              value={action}
              density="medium"
              onValueChange={(value) => {
                setAction(value as ROBOT_CURRENT_MODE);
                setRobotStatus({
                  currentMode: value as ROBOT_CURRENT_MODE,
                });
              }}
              buttons={[
                {
                  value: ROBOT_CURRENT_MODE.LOCKED,
                  label: '锁止',
                  icon: 'lock',
                  checkedColor: '#ffffff',
                  style: {
                    backgroundColor:
                      action === ROBOT_CURRENT_MODE.LOCKED ? '#012641' : 'transparent',
                  },
                },
                {
                  value: ROBOT_CURRENT_MODE.MANUAL,
                  label: '手动',
                  icon: 'camera-control',
                  checkedColor: '#ffffff',
                  style: {
                    backgroundColor:
                      action === ROBOT_CURRENT_MODE.MANUAL ? '#012641' : 'transparent',
                  },
                },
                {
                  value: ROBOT_CURRENT_MODE.AUTO,
                  label: '自动',
                  icon: 'robot-mower-outline',
                  checkedColor: '#ffffff',
                  style: {
                    backgroundColor: action === ROBOT_CURRENT_MODE.AUTO ? '#012641' : 'transparent',
                  },
                },
                {
                  value: ROBOT_CURRENT_MODE.TEST,
                  label: '试扎',
                  icon: 'debug-step-into',
                  checkedColor: '#ffffff',
                  style: {
                    backgroundColor: action === ROBOT_CURRENT_MODE.TEST ? '#012641' : 'transparent',
                  },
                },
              ]}
            />
            {robotStatus.currentMode === ROBOT_CURRENT_MODE.AUTO ? (
              <SegmentedButtons
                value={bindMode}
                density="medium"
                onValueChange={(value) => {
                  setBindMode(value as ROBOT_WORK_MODE);
                  setRobotStatus({
                    currentBindingMode: value as ROBOT_WORK_MODE,
                  });
                }}
                buttons={[
                  {
                    value: ROBOT_WORK_MODE.WITHOUT_BINDING,
                    label: '不扎',
                    icon: 'not-equal-variant',
                    checkedColor: '#ffffff',
                    style: {
                      backgroundColor:
                        bindMode === ROBOT_WORK_MODE.WITHOUT_BINDING ? '#012641' : 'transparent',
                    },
                  },
                  {
                    value: ROBOT_WORK_MODE.FULL_BINDING,
                    label: '满扎',
                    icon: 'transit-connection',
                    checkedColor: '#ffffff',
                    style: {
                      backgroundColor:
                        bindMode === ROBOT_WORK_MODE.FULL_BINDING ? '#012641' : 'transparent',
                    },
                  },
                  {
                    value: ROBOT_WORK_MODE.SKIP_BINDING,
                    label: '跳扎',
                    icon: 'transit-skip',
                    checkedColor: '#ffffff',
                    style: {
                      backgroundColor:
                        bindMode === ROBOT_WORK_MODE.SKIP_BINDING ? '#012641' : 'transparent',
                    },
                  },
                ]}
              />
            ) : null}
          </View>

          {action === ROBOT_CURRENT_MODE.MANUAL ? (
            <View className="relative mt-1.5 flex h-[180px] w-[150px] flex-row items-center justify-center gap-x-5">
              <View className="absolute left-0 top-0 h-full w-full flex-col items-center justify-center gap-y-10">
                <TouchableOpacity
                  onPressIn={() => console.log('Pressed')}
                  onPressOut={() => console.log('Pressed')}>
                  {/* <CaretUp size={64} weight="fill" color="purple" /> */}
                  <Image
                    source={require('@/assets/icon/top-arrow.png')}
                    style={{ width: 50, height: 50, top: -20 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Pressed')}>
                  <Image
                    source={require('@/assets/icon/down-arrow.png')}
                    style={{ width: 50, height: 50, top: 20 }}
                  />
                </TouchableOpacity>
              </View>

              <View className="absolute left-0 top-0 h-full w-full flex-row items-center justify-center gap-x-10">
                <TouchableOpacity onPress={() => console.log('Pressed')}>
                  <Image
                    source={require('@/assets/icon/left-arrow.png')}
                    style={{ width: 50, height: 50, left: -20 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Pressed')}>
                  <Image
                    source={require('@/assets/icon/right-arrow.png')}
                    style={{ width: 50, height: 50, left: 20 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <ControlAutoSelectDirection />
          )}
        </View>

        <View className="relative flex w-full flex-row justify-end gap-x-5">
          <ControlExtraModule />
        </View>
      </View>
    </Card>
  );
};

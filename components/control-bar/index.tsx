import { Image } from 'expo-image';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, Divider, Icon, Menu, SegmentedButtons } from 'react-native-paper';

import { ControlAutoSelectDirection } from '../control-auto-select-direction';
import { ControlExtraModule } from '../control-extra-module';
import { SelectJumpCount } from '../select-jump-count';

export const ControlBar = () => {
  const [action, setAction] = useState('stop');
  const [task, setTask] = useState('no');
  const [jumpBindingMenuShow, setJumpBindingMenuShow] = useState(false);

  return (
    <View className="w-full">
      <Card className="relative mx-auto w-[95%] pb-8">
        <View className="flex w-full flex-col px-5 pb-3 pt-4">
          <View className="mb-5 flex w-full flex-col items-center justify-center">
            <View className="mb-2 flex flex-row items-center justify-center">
              <Icon source="robot-happy-outline" size={22} />
              <Text className="-top-[1px] ml-2 text-center text-2xl font-bold">机器人操作</Text>
            </View>
            <View className="mb-10 mt-4 w-full gap-y-5">
              <SegmentedButtons
                value={action}
                density="regular"
                onValueChange={setAction}
                buttons={[
                  {
                    value: 'stop',
                    label: '锁止',
                    icon: 'lock',
                    checkedColor: '#ffffff',
                    style: {
                      backgroundColor: action === 'stop' ? '#012641' : 'transparent',
                    },
                  },
                  {
                    value: 'manual',
                    label: '手动',
                    icon: 'camera-control',
                    checkedColor: '#ffffff',
                    style: {
                      backgroundColor: action === 'manual' ? '#012641' : 'transparent',
                    },
                  },
                  {
                    value: 'auto',
                    label: '自动',
                    icon: 'robot-mower-outline',
                    checkedColor: '#ffffff',
                    onPress: () => setJumpBindingMenuShow(true),
                    style: {
                      backgroundColor: action === 'auto' ? '#012641' : 'transparent',
                    },
                  },
                ]}
              />

              <SegmentedButtons
                value={task}
                density="regular"
                onValueChange={setTask}
                buttons={[
                  {
                    value: 'no',
                    label: '不扎',
                    icon: 'not-equal-variant',
                    checkedColor: '#ffffff',
                    style: {
                      backgroundColor: task === 'no' ? '#012641' : 'transparent',
                    },
                  },
                  {
                    value: 'full',
                    label: '满扎',
                    icon: 'transit-connection',
                    checkedColor: '#ffffff',
                    style: {
                      backgroundColor: task === 'full' ? '#012641' : 'transparent',
                    },
                  },
                  {
                    value: 'jump',
                    label: '跳扎',
                    icon: 'transit-skip',
                    checkedColor: '#ffffff',
                    style: {
                      backgroundColor: task === 'jump' ? '#012641' : 'transparent',
                    },
                  },
                ]}
              />
            </View>

            {action === 'manual' ? (
              <View className="relative mt-1.5 flex h-[150px] w-[150px] flex-row items-center justify-center gap-x-5">
                <View className="absolute left-0 top-0 h-full w-full flex-col items-center justify-center gap-y-10">
                  <TouchableOpacity onPress={() => console.log('Pressed')}>
                    {/* <CaretUp size={64} weight="fill" color="purple" /> */}
                    <Image
                      source={require('@/assets/icon/top-arrow.png')}
                      style={{ width: 60, height: 60, top: -20 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log('Pressed')}>
                    <Image
                      source={require('@/assets/icon/down-arrow.png')}
                      style={{ width: 60, height: 60, top: 20 }}
                    />
                  </TouchableOpacity>
                </View>

                <View className="absolute left-0 top-0 h-full w-full flex-row items-center justify-center gap-x-10">
                  <TouchableOpacity onPress={() => console.log('Pressed')}>
                    <Image
                      source={require('@/assets/icon/left-arrow.png')}
                      style={{ width: 60, height: 60, left: -20 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log('Pressed')}>
                    <Image
                      source={require('@/assets/icon/right-arrow.png')}
                      style={{ width: 60, height: 60, left: 20 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <ControlAutoSelectDirection />
            )}
          </View>

          <View className="relative mt-3 flex w-full flex-row justify-end gap-x-5">
            <ControlExtraModule />
          </View>
        </View>
      </Card>
    </View>
  );
};

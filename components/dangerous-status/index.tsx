import { View, Text } from 'react-native';
import { Button, Icon, Portal } from 'react-native-paper';

import useStore from '@/store';

export const DangerousStatus = () => {
  const { setRobotStatus } = useStore((state) => state);

  const releaseDangerStatus = () => {
    setRobotStatus({ robotDangerStatus: false });
  };
  return (
    <Portal>
      <View className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-red-500/70">
        <Button
          mode="outlined"
          className="my-5 w-[300px] rounded-2xl"
          contentStyle={{ backgroundColor: '#088CFFFF', padding: 30 }}
          onPress={releaseDangerStatus}>
          <View className="flex flex-row items-center justify-center">
            <Icon source="hand-okay" size={24} color="#ffffff" />
            <Text className="ml-2 text-2xl text-white">解除危险状态</Text>
          </View>
        </Button>
      </View>
    </Portal>
  );
};

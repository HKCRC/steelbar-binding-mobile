import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { SelectJumpCount } from '../select-jump-count';

export const ControlExtraModule = () => {
  return (
    <View className="relative flex w-full flex-row items-end justify-end">
      <View className="flex gap-y-5">
        <Button icon="reload" mode="elevated" onPress={() => console.log('Pressed')}>
          绑扎机重启
        </Button>
        <Button icon="restart" mode="elevated" onPress={() => console.log('Pressed')}>
          机器复位
        </Button>
        <Button icon="elevator-down" mode="elevated" onPress={() => console.log('Pressed')}>
          机器下降
        </Button>
      </View>

      <View className="absolute left-0 top-0">
        <SelectJumpCount />
      </View>
    </View>
  );
};

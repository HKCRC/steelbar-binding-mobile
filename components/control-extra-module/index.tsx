import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { SelectJumpCount } from '../select-jump-count';

import useStore from '@/store';
import { ROBOT_WORK_MODE } from '@/types';

export const ControlExtraModule = () => {
  const { robotStatus } = useStore((state) => state);
  return (
    <View className="relative flex w-full flex-row items-end justify-end">
      <View className="-bottom-[10px] flex gap-y-5">
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

      {robotStatus.currentBindingMode === ROBOT_WORK_MODE.SKIP_BINDING ? (
        <View className="absolute left-0 top-0">
          <SelectJumpCount />
        </View>
      ) : null}
    </View>
  );
};

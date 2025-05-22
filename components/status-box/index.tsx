import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Button } from 'react-native-paper';

import { ParamsSettingModal } from '../params-setting-modal';

export const StatusBox = () => {
  const { width } = Dimensions.get('screen');
  const imageSize = useMemo(() => Math.floor(width / 5), [width]);
  const [visible, setVisible] = useState(false);

  const openSettingModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View className="w-[100%] flex-col items-center justify-end">
      <ParamsSettingModal visible={visible} onDismiss={hideModal} />

      <Button icon="cog" mode="contained" style={{ width: '80%' }} onPress={openSettingModal}>
        参数设置
      </Button>
    </View>
  );
};

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

import { ParamsSettingModal } from '../params-setting-modal';

export const StatusBox = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const openSettingModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View className="w-[100%] flex-col items-center justify-end">
      <ParamsSettingModal visible={visible} onDismiss={hideModal} />

      <Button icon="cog" mode="contained" style={{ width: '80%' }} onPress={openSettingModal}>
        {t('common.settings') as string}
      </Button>
    </View>
  );
};

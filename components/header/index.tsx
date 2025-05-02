import { Image } from 'expo-image';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
import { router } from 'expo-router';
import { BatteryFull, Gear, WifiHigh } from 'phosphor-react-native';
import { TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Header = () => {
  const { top } = useSafeAreaInsets();

  const gotoSetting = () => {
    router.push('/(setting)');
  };

  const openWifiSetting = () => {
    startActivityAsync(ActivityAction.WIFI_SETTINGS);
  };

  return (
    <View
      className="flex w-full flex-row items-center justify-between px-6 pb-3 pt-5"
      style={{ paddingTop: top + 20 }}>
      <Image
        source={require('@/assets/hkcrc.png')}
        style={{ width: 449, height: 48 }}
        contentFit="contain"
        transition={1000}
      />
      <View className="flex flex-row items-center gap-8">
        <TouchableOpacity className="rounded-full bg-white p-3" onPress={openWifiSetting}>
          <WifiHigh size={24} weight="bold" />
        </TouchableOpacity>

        <TouchableOpacity className="rounded-full bg-white p-3" onPress={gotoSetting}>
          <Gear size={24} weight="bold" />
        </TouchableOpacity>

        <BatteryFull size={32} weight="bold" />

        <Button icon="pause" mode="contained" onPress={() => console.log('Pressed')}>
          软急停
        </Button>
      </View>
    </View>
  );
};

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { Button, Card, Icon, TextInput } from 'react-native-paper';

import { Header } from '@/components/header';
import { storage_config } from '@/constants';
import useStore from '@/store';

export default function Setting() {
  const { canLoginInfo, language, setLanguage } = useStore((state) => state);
  const userInfo = useAsyncStorage(storage_config.LOCAL_STORAGE_USER_INFO);
  const languageStorage = useAsyncStorage(storage_config.LOCAL_STORAGE_LANGUAGE);
  const { t, i18n } = useTranslation();
  const goback = () => {
    router.back();
  };

  const logout = async () => {
    await userInfo.removeItem();
    router.dismissAll();
    router.replace('/(root)/(login)');
  };

  useEffect(() => {
    const getLanguage = async () => {
      const language = await languageStorage.getItem();
      setLanguage(language || 'cn');
    };
    getLanguage();
  }, []);

  const handleLanguageChange = async (value: string) => {
    setLanguage(value);
    await languageStorage.setItem(value);
    await i18n.changeLanguage(value);
  };

  return (
    <View className="flex w-full">
      <Header />

      <View className="flex w-full flex-row items-center justify-between px-10 py-10">
        <View className="w-full">
          <Card className="px-5 py-6">
            <View className="flex flex-row items-center justify-center">
              <View className="mb-2 flex flex-row items-center justify-center">
                <Icon source="account-circle-outline" size={22} />
                <Text className="-top-[1px] ml-2 text-center text-2xl font-bold">
                  {t('setting.userInfo') as string}
                </Text>
              </View>
            </View>

            <View className="gap-5">
              <TextInput
                label={t('setting.username') as string}
                value={canLoginInfo.name}
                disabled
                style={{ backgroundColor: '#01264142' }}
                keyboardType="numeric"
              />

              <TextInput
                label={t('setting.companyAddress')}
                value={canLoginInfo.position}
                disabled
                style={{ backgroundColor: '#01264142' }}
              />

              <TextInput
                label={t('setting.companyName')}
                value={canLoginInfo.company}
                disabled
                style={{ backgroundColor: '#01264142' }}
              />

              <TextInput
                label={t('setting.phoneNumber') as string}
                value={canLoginInfo.number}
                disabled
                style={{ backgroundColor: '#01264142' }}
              />

              {/* <View className="mb-2 mt-5 flex flex-col items-start justify-center">
                <SegmentedButtons
                  value={language}
                  onValueChange={handleLanguageChange}
                  density="small"
                  buttons={[
                    {
                      value: 'cn',
                      label: '简体中文',
                    },
                    {
                      value: 'hk',
                      label: '繁體中文',
                    },
                    // { value: 'en', label: 'English' },
                  ]}
                />
              </View> */}
            </View>

            <View className="mt-5 flex w-full flex-row items-center justify-center gap-5">
              <Button mode="contained" icon="logout" className="px-1.5" onPress={logout}>
                {t('common.logout') as string}
              </Button>

              <Button mode="outlined" icon="arrow-left" className="px-1.5" onPress={goback}>
                {t('common.back') as string}
              </Button>
            </View>
          </Card>
        </View>
      </View>
    </View>
  );
}

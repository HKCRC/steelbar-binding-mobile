import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Button, Card, DataTable, Icon } from 'react-native-paper';

import { useStore } from '@/store';
import { ConnectDeviceInfo } from '@/utils/connectDeviceInfo';
import { useTranslation } from 'react-i18next';
export const ErrorData = () => {
  const { height } = Dimensions.get('window');
  const targetHeight = height * 0.45;
  const { t } = useTranslation();
  const rowCount = height > 600 ? Math.floor(targetHeight / 100) : 1;

  const { errorGroup } = useStore((state) => state);

  const [items, setItems] = useState<{ key: number; index: string; time: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const temp = errorGroup?.map((item, index) => {
      return {
        key: index,
        index: item.errorId.toString(),
        time: item.time,
        name: ConnectDeviceInfo.errorInfo[item.errorId],
      };
    });
    setItems(temp || []);
  }, [errorGroup]);

  const openErrorDetailPage = () => {
    router.push('/(error_info)');
  };

  return (
    <Card>
      <View className="w-full px-5 pb-1 pt-2">
        <View className="mb-2 mt-3  flex flex-row items-center justify-center">
          <Icon source="alert-circle-outline" size={22} />
          <Text className="-top-[1px] ml-2 text-center text-2xl font-bold">
            {t('malfunction.title') as string}
          </Text>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>{t('malfunction.index') as string}</DataTable.Title>
            <DataTable.Title>{t('malfunction.time') as string}</DataTable.Title>
            <DataTable.Title numeric>{t('malfunction.name') as string}</DataTable.Title>
          </DataTable.Header>

          {items.length > 0 ? (
            items.slice(0, rowCount).map((item) => (
              <DataTable.Row key={item.key}>
                <DataTable.Cell textStyle={{ textAlign: 'center', fontSize: 12 }}>
                  {item.index}
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ textAlign: 'center', fontSize: 12 }}>
                  {item.time}
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ textAlign: 'center', fontSize: 12 }} numeric>
                  {item.name}
                </DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <DataTable.Row>
              <DataTable.Cell textStyle={{ textAlign: 'center', fontSize: 12 }}>
                {t('malfunction.noData') as string}
              </DataTable.Cell>
            </DataTable.Row>
          )}
        </DataTable>

        <View className="flex w-full items-end">
          <Button
            icon="eye"
            style={{ right: -10, marginTop: 10 }}
            mode="text"
            onPress={() => openErrorDetailPage()}>
            {t('malfunction.viewDetails') as string}
          </Button>
        </View>
      </View>
    </Card>
  );
};

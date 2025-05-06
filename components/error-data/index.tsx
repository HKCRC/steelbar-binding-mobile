import { router } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Button, Card, DataTable, Icon } from 'react-native-paper';

export const ErrorData = () => {
  const { height } = Dimensions.get('window');
  const targetHeight = height * 0.45;
  const rowCount = Math.floor(targetHeight / 100);
  const [items] = useState([
    {
      key: 1,
      index: '1',
      time: '2025-05-01 10:00:00',
      name: '钢筋不足',
    },
    {
      key: 2,
      index: '2',
      time: '2025-05-01 10:00:00',
      name: '钢筋不足',
    },
    {
      key: 3,
      index: '3',
      time: '2025-05-01 10:00:00',
      name: '钢筋不足',
    },
    {
      key: 4,
      index: '4',
      time: '2025-05-01 10:00:00',
      name: '钢筋不足',
    },
  ]);

  const openErrorDetailPage = () => {
    router.push('/(error_info)');
  };

  return (
    <Card>
      <View className="w-full px-5 pb-3 pt-4">
        <View className="mb-2 mt-3  flex flex-row items-center justify-center">
          <Icon source="alert-circle-outline" size={22} />
          <Text className="-top-[1px] ml-2 text-center text-2xl font-bold">故障监控</Text>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>序号</DataTable.Title>
            <DataTable.Title>发生时间</DataTable.Title>
            <DataTable.Title numeric>故障名称</DataTable.Title>
          </DataTable.Header>

          {items.slice(0, rowCount).map((item) => (
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
          ))}
        </DataTable>

        <View className="flex w-full items-end">
          <Button
            icon="eye"
            style={{ right: -10, marginTop: 10 }}
            mode="text"
            onPress={() => openErrorDetailPage()}>
            查看详情
          </Button>
        </View>
      </View>
    </Card>
  );
};

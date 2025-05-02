import { useState } from 'react';
import { Text, View } from 'react-native';
import { Card, DataTable, Icon } from 'react-native-paper';

export const DataInspect = () => {
  const [items] = useState([
    {
      key: 1,
      name: '变轨激光',
      value: 356,
      unit: 'mm',
    },
    {
      key: 2,
      name: '节点激光',
      value: 262,
      unit: 'mm',
    },
    {
      key: 3,
      name: '卷丝余量',
      value: 159,
      unit: '%',
    },
  ]);

  return (
    <Card>
      <View className="w-full px-5 pb-3 pt-4">
        <View className="mb-2 mt-3 flex flex-row items-center justify-center">
          <Icon source="database-sync-outline" size={22} />
          <Text className="-top-[1px] ml-2 text-center text-2xl font-bold">数据监控</Text>
        </View>
        <DataTable>
          {items.map((item) => (
            <DataTable.Row key={item.key}>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell numeric>{item.value}</DataTable.Cell>
              <DataTable.Cell numeric>{item.unit}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </Card>
  );
};

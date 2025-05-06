import { Header } from '@/components/header';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, DataTable, Icon } from 'react-native-paper';

export default function Error() {
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);

  const goback = () => {
    router.back();
  };

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
    {
      key: 5,
      index: '5',
      time: '2025-05-01 10:00:00',
      name: '钢筋不足',
    },
    {
      key: 6,
      index: '6',
      time: '2025-05-01 10:00:00',
      name: '钢筋不足',
    },
    // {
    //   key: 7,
    //   index: '7',
    //   time: '2025-05-01 10:00:00',
    //   name: '钢筋不足',
    // },
    // {
    //   key: 8,
    //   index: '8',
    //   time: '2025-05-01 10:00:00',
    //   name: '钢筋不足',
    // },
    // {
    //   key: 9,
    //   index: '9',
    //   time: '2025-05-01 10:00:00',
    //   name: '钢筋不足',
    // },
    // {
    //   key: 10,
    //   index: '10',
    //   time: '2025-05-01 10:00:00',
    //   name: '钢筋不足',
    // },

    // {
    //   key: 11,
    //   index: '11',
    //   time: '2025-05-01 10:00:00',
    //   name: '钢筋不足',
    // },
  ]);

  return (
    <View className="flex w-full">
      <Header />

      <View className="flex w-full flex-row items-center justify-between px-20 py-10">
        <View className="w-[35%] items-center justify-center">
          <Image
            source={require('@/assets/images/p3.png')}
            contentFit="contain"
            style={{
              width: 350,
              height: 350,
            }}
          />
        </View>

        <View className="w-[60%]">
          <Card className="px-5 py-6">
            <View className="flex flex-row items-center justify-center">
              <View className="mb-2 flex flex-row items-center justify-center">
                <Icon source="alert-circle-outline" size={22} />
                <Text className="-top-[1px] ml-2 text-center text-2xl font-bold">历史故障记录</Text>
              </View>
            </View>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>序号</DataTable.Title>
                <DataTable.Title>发生时间</DataTable.Title>
                <DataTable.Title numeric>故障名称</DataTable.Title>
              </DataTable.Header>

              {items.map((item) => (
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

            <View className="mt-5 flex flex-row items-center justify-center gap-x-16">
              <TouchableOpacity className="flex flex-row items-center gap-x-1">
                <Icon source="menu-left" size={30} />
                <Text className="text-md">上一页</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex flex-row items-center gap-x-1">
                <Text className="text-md">下一页</Text>
                <Icon source="menu-right" size={30} />
              </TouchableOpacity>
            </View>

            <View className="mt-5 flex flex-row items-center justify-end gap-10">
              <Button mode="outlined" icon="arrow-left" className="px-3" onPress={goback}>
                返回
              </Button>
            </View>
          </Card>
        </View>
      </View>
    </View>
  );
}

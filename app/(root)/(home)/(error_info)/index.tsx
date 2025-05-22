import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useEffect, useState, useMemo } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, DataTable, Icon } from 'react-native-paper';

import { Header } from '@/components/header';
import { useStore } from '@/store';
import { ConnectDeviceInfo } from '@/utils/connectDeviceInfo';

export default function Error() {
  const { height } = Dimensions.get('window');
  const [numberOfItemsPerPageList] = useState([height > 700 ? 10 : 3]);
  const [items, setItems] = useState<{ key: number; index: string; time: string; name: string }[]>(
    []
  );
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);
  const [currentPage, setCurrentPage] = useState(0);
  const { errorGroup } = useStore((state) => state);

  const goback = () => {
    router.back();
  };

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

    if (currentPage > 0 && temp && temp.length <= currentPage * itemsPerPage) {
      setCurrentPage(0);
    }
  }, [errorGroup, currentPage, itemsPerPage]);

  const paginatedItems = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage);
  }, [items.length, itemsPerPage]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <View className="flex w-full">
      <Header />

      <View className="flex w-full flex-row items-center justify-between px-5 py-10">
        <View className="w-full">
          <Card className="px-5 py-6">
            <View className="flex flex-row items-center justify-center">
              <View className="mb-2 flex flex-row items-center justify-center">
                <Icon source="alert-circle-outline" size={22} />
                <Text className="-top-[1px] ml-2 text-center text-2xl font-bold">历史故障记录</Text>
              </View>
            </View>
            {items.length > 0 ? (
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>序号</DataTable.Title>
                  <DataTable.Title>发生时间</DataTable.Title>
                  <DataTable.Title numeric>故障名称</DataTable.Title>
                </DataTable.Header>

                {paginatedItems.map((item) => (
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
            ) : (
              <Text className="my-5 text-center text-lg font-bold">暂无故障记录</Text>
            )}

            <View className="mt-5 flex flex-row items-center justify-center gap-x-5">
              <TouchableOpacity
                className={`flex flex-row items-center gap-x-1 ${currentPage === 0 ? 'opacity-50' : ''}`}
                onPress={handlePrevPage}
                disabled={currentPage === 0}>
                <Icon source="menu-left" size={30} />
                <Text className="text-md">上一页</Text>
              </TouchableOpacity>
              <Text className="text-md">
                第 {currentPage + 1} 页 / 共 {totalPages} 页
              </Text>
              <TouchableOpacity
                className={`flex flex-row items-center gap-x-1 ${currentPage >= totalPages - 1 ? 'opacity-50' : ''}`}
                onPress={handleNextPage}
                disabled={currentPage >= totalPages - 1}>
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

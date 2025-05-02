import { Header } from '@/components/header';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Icon, TextInput } from 'react-native-paper';
export default function Setting() {
  const [text, setText] = useState('138');

  const goback = () => {
    router.back();
  };

  const logout = () => {
    router.dismissAll();
    router.replace('/(root)/(login)');
  };

  return (
    <View className="flex w-full">
      <Header />

      <View className="flex w-full flex-row items-center justify-between px-20 py-10">
        <View className="w-[45%] items-center justify-center">
          <Image
            source={require('@/assets/images/p3.png')}
            contentFit="contain"
            style={{
              width: 350,
              height: 350,
            }}
          />
        </View>

        <View className="w-[50%]">
          <Card className="px-5 py-6">
            <View className="flex flex-row items-center justify-center">
              <View className="mb-2 flex flex-row items-center justify-center">
                <Icon source="account-circle-outline" size={22} />
                <Text className="-top-[1px] ml-2 text-center text-2xl font-bold">用户信息</Text>
              </View>
            </View>
            <View className="gap-5">
              <TextInput
                label="用户名"
                value={text}
                disabled
                style={{ backgroundColor: '#01264142' }}
                keyboardType="numeric"
                onChangeText={(text) => setText(text)}
              />

              <TextInput
                label="用户ID"
                value={text}
                disabled
                style={{ backgroundColor: '#01264142' }}
                onChangeText={(text) => setText(text)}
              />

              <TextInput
                label="公司地址"
                value={text}
                disabled
                style={{ backgroundColor: '#01264142' }}
                onChangeText={(text) => setText(text)}
              />

              <TextInput
                label="公司名称"
                value={text}
                disabled
                style={{ backgroundColor: '#01264142' }}
                onChangeText={(text) => setText(text)}
              />

              <TextInput
                label="联系电话"
                value={text}
                disabled
                style={{ backgroundColor: '#01264142' }}
                onChangeText={(text) => setText(text)}
              />
            </View>

            <View className="mt-5 flex flex-row items-center justify-center gap-10">
              <Button mode="contained" icon="logout" className="px-3" onPress={logout}>
                退出登录
              </Button>

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

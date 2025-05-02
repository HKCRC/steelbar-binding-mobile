import { Header } from '@/components/header';
import { router } from 'expo-router';
import { useState } from 'react';
import { useWindowDimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Checkbox, Icon, Modal, Portal } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { Image } from 'expo-image';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberpsw, setRememberpsw] = useState(false);
  const [showGuideDialog, setShowGuideDialog] = useState(false);
  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;

  const login = () => {
    router.replace('/');
  };

  const openGuideDialog = () => {
    setShowGuideDialog(true);
  };

  const closeGuideDialog = () => {
    setShowGuideDialog(false);
  };

  return (
    <View className="flex w-full">
      <View className="relative w-full">
        <Image
          source={require('@/assets/images/bg.jpg')}
          style={{
            width: screenWidth / 2.5,
            height: screenHeight,
            position: 'absolute',
            right: 0,
            top: 0,
          }}
          contentFit="cover"
        />
        <Header />
        <Portal>
          <Modal
            visible={showGuideDialog}
            onDismiss={closeGuideDialog}
            contentContainerStyle={{
              backgroundColor: 'white',
              borderRadius: 15,
              paddingHorizontal: 20,

              marginHorizontal: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: screenWidth / 3,
            }}>
            <View className="h-5/6 w-full pb-5">
              <View className="mb-2 flex flex-row items-center justify-center">
                <Icon source="book-open-outline" size={22} />
                <Text className="-top-[1px] ml-2 text-center text-2xl font-bold">
                  《钢筋绑扎机器人用户手册》
                </Text>
              </View>
              <WebView source={{ uri: 'https://www.baidu.com' }} />
            </View>
            <Button
              mode="contained"
              icon="check"
              className="w-full px-3"
              onPress={closeGuideDialog}>
              <Text className="text-lg font-bold">我知道了</Text>
            </Button>
          </Modal>
        </Portal>
        <View className="mt-20 flex flex-row px-32 py-16">
          <View className="relative flex w-5/12 items-center">
            <View className="w-full">
              {/* <View className="flex flex-row items-center justify-center">
              <View className="mb-2 flex flex-row items-center justify-center">
                <Icon source="account-circle-outline" size={22} />
                <Text className="-top-[1px] ml-2 text-center text-2xl font-bold">用户信息</Text>
              </View>
            </View> */}
              <View className="">
                <View className="relative">
                  <View className="absolute left-2 top-0 h-full w-10 items-center justify-center">
                    <Icon source="account-circle-outline" size={22} />
                  </View>
                  <TextInput
                    className="rounded-tl-2xl rounded-tr-2xl border-[0.5px] border-gray-500 py-5 pl-[50px]"
                    placeholder="请输入用户名"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                  />
                </View>

                <View className="relative">
                  <View className="absolute left-2 top-0 h-full w-10 items-center justify-center">
                    <Icon source="lock-outline" size={22} />
                  </View>
                  <TextInput
                    className="rounded-bl-2xl rounded-br-2xl border-[0.5px] border-gray-500 py-5 pl-[50px]"
                    placeholder="请输入密码"
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                </View>

                <View className="mt-5 flex flex-col items-start justify-center">
                  <View className="flex flex-row items-center justify-center">
                    <Checkbox
                      status={rememberpsw ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setRememberpsw(!rememberpsw);
                      }}
                    />
                    <Text className="text-md -mt-0.5">下次启动时自动输入该账户信息</Text>
                  </View>

                  <View className="flex flex-row items-center justify-center">
                    <Checkbox
                      status={rememberpsw ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setRememberpsw(!rememberpsw);
                      }}
                    />
                    <View className="-mt-0.5 flex flex-row items-center justify-center">
                      <Text className="text-md">
                        承诺已知悉{' '}
                        <TouchableOpacity onPress={openGuideDialog}>
                          <Text className="top-[3px] text-blue-500">
                            《钢筋绑扎机器人用户手册》
                          </Text>
                        </TouchableOpacity>
                        的全部内容
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="mt-5 flex flex-row items-center justify-center gap-10">
                  <Button mode="contained" icon="login" className="w-full px-3" onPress={login}>
                    <Text className="text-lg font-bold">登入</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

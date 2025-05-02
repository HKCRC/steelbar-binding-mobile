import { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Button, Icon, Modal, Portal, Switch, Text, TextInput } from 'react-native-paper';

interface ParamsSettingModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const ParamsSettingModal = ({ visible, onDismiss }: ParamsSettingModalProps) => {
  const screenWidth = useWindowDimensions().width;
  const [text, setText] = useState('138');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={{
          backgroundColor: 'white',
          borderRadius: 15,
          padding: 20,
          marginHorizontal: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: screenWidth / 3,
        }}>
        <View className="w-full">
          <View className="mb-5 flex flex-row items-center justify-center">
            <Icon source="cog" size={22} />
            <Text className="mb-1 ml-2 text-2xl font-bold">参数设置</Text>
          </View>
          <View className="gap-5">
            <TextInput
              label="变轨激光范围"
              value={text}
              style={{ backgroundColor: '#01264142' }}
              keyboardType="numeric"
              right={<TextInput.Affix text="mm" />}
              onChangeText={(text) => setText(text)}
            />

            <TextInput
              label="节点激光范围"
              value={text}
              style={{ backgroundColor: '#01264142' }}
              keyboardType="numeric"
              right={<TextInput.Affix text="mm" />}
              onChangeText={(text) => setText(text)}
            />

            <TextInput
              label="上层钢筋直径"
              value={text}
              style={{ backgroundColor: '#01264142' }}
              keyboardType="numeric"
              right={<TextInput.Affix text="mm" />}
              onChangeText={(text) => setText(text)}
            />

            <TextInput
              label="下层钢筋直径"
              value={text}
              style={{ backgroundColor: '#01264142' }}
              keyboardType="numeric"
              right={<TextInput.Affix text="mm" />}
              onChangeText={(text) => setText(text)}
            />

            <TextInput
              label="下层钢筋"
              value={text}
              style={{ backgroundColor: '#01264142' }}
              keyboardType="numeric"
              right={<TextInput.Affix text="mm" />}
              onChangeText={(text) => setText(text)}
            />

            <TextInput
              label="绑扎延时"
              value={text}
              style={{ backgroundColor: '#01264142' }}
              keyboardType="numeric"
              right={<TextInput.Affix text="ms" />}
              onChangeText={(text) => setText(text)}
            />
          </View>

          <View className="mt-5 flex flex-row items-center justify-center gap-5">
            <View className="flex flex-row items-center justify-center gap-2">
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
              <Text className="-ml-1 text-lg font-light">超声波</Text>
            </View>

            <View className="flex flex-row items-center justify-center gap-2">
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
              <Text className="-ml-1 text-lg font-light">防坠激光</Text>
            </View>

            <View className="flex flex-row items-center justify-center gap-2">
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
              <Text className="-ml-1 text-lg font-light">自动寻点</Text>
            </View>
          </View>

          <View className="mt-5 flex flex-row items-center justify-center gap-5">
            <Button mode="contained" icon="check" className="px-3" onPress={onDismiss}>
              确定
            </Button>

            <Button mode="outlined" icon="window-close" className="px-3" onPress={onDismiss}>
              取消
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

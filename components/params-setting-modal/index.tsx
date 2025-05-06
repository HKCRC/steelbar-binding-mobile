import { View } from 'react-native';
import { Button, Icon, Modal, Portal, Switch, Text, TextInput } from 'react-native-paper';

import useStore from '@/store';

interface ParamsSettingModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const ParamsSettingModal = ({ visible, onDismiss }: ParamsSettingModalProps) => {
  const { workParams, setWorkParams } = useStore((state) => state);

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
        }}>
        <View className="w-full">
          <View className="mb-5 flex flex-row items-center justify-center">
            <Icon source="cog" size={22} />
            <Text className="mb-1 ml-2 text-2xl font-bold">参数设置</Text>
          </View>
          <View className="h-[390px] gap-5">
            <TextInput
              label="变轨激光范围"
              value={workParams.track_laser_range}
              style={{ backgroundColor: '#01264142', height: 40 }}
              keyboardType="numeric"
              right={<TextInput.Affix text="mm" />}
              onChangeText={(text) => {
                setWorkParams({ track_laser_range: text });
              }}
            />

            <TextInput
              label="节点激光范围"
              value={workParams.node_laser_range}
              style={{ backgroundColor: '#01264142', height: 40 }}
              keyboardType="numeric"
              right={<TextInput.Affix text="mm" />}
              onChangeText={(text) => {
                setWorkParams({ node_laser_range: text });
              }}
            />

            <TextInput
              label="上层钢筋直径"
              value={workParams.upper_layer_diameter}
              style={{ backgroundColor: '#01264142', height: 40 }}
              keyboardType="numeric"
              right={<TextInput.Affix text="mm" />}
              onChangeText={(text) => {
                setWorkParams({ upper_layer_diameter: text });
              }}
            />

            <TextInput
              label="下层钢筋直径"
              value={workParams.lower_layer_diameter}
              style={{ backgroundColor: '#01264142', height: 40 }}
              keyboardType="numeric"
              right={<TextInput.Affix text="mm" />}
              onChangeText={(text) => {
                setWorkParams({ lower_layer_diameter: text });
              }}
            />

            <TextInput
              label="下层钢筋"
              value={workParams.lower_steel_bar_length}
              style={{ backgroundColor: '#01264142', height: 40 }}
              keyboardType="numeric"
              right={<TextInput.Affix text="mm" />}
              onChangeText={(text) => {
                setWorkParams({ lower_steel_bar_length: text });
              }}
            />

            <TextInput
              label="绑扎延时"
              value={workParams.binding_timeout}
              style={{ backgroundColor: '#01264142', height: 40 }}
              keyboardType="numeric"
              right={<TextInput.Affix text="ms" />}
              onChangeText={(text) => {
                setWorkParams({ binding_timeout: text });
              }}
            />
          </View>

          <View className="mb-2 mt-5 flex flex-row items-center justify-center gap-5">
            <View className="flex flex-row items-center justify-center gap-2">
              <Switch
                value={workParams.ultrasonic_waves}
                onValueChange={() => {
                  setWorkParams({ ultrasonic_waves: !workParams.ultrasonic_waves });
                }}
              />
              <Text className="-ml-1 text-lg font-light">超声波</Text>
            </View>

            <View className="flex flex-row items-center justify-center gap-2">
              <Switch
                value={workParams.prevent_falling_laser}
                onValueChange={() => {
                  setWorkParams({ prevent_falling_laser: !workParams.prevent_falling_laser });
                }}
              />
              <Text className="-ml-1 text-lg font-light">防坠激光</Text>
            </View>

            <View className="flex flex-row items-center justify-center gap-2">
              <Switch
                value={workParams.auto_find_point}
                onValueChange={() => {
                  setWorkParams({ auto_find_point: !workParams.auto_find_point });
                }}
              />
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

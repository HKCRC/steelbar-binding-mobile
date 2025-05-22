/* eslint-disable no-case-declarations */
import { useState, useRef } from 'react';
import { Alert, TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Icon, Modal, Portal, Switch, Text, TextInput } from 'react-native-paper';

import { GlobalSnackbarManager } from '../snackbar-global';

import { GlobalConst, InputPara, workParamsRange } from '@/constants';
import useStore from '@/store';
import { SocketManage } from '@/utils/socketManage';

interface ParamsSettingModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export const ParamsSettingModal = ({ visible, onDismiss }: ParamsSettingModalProps) => {
  const { workParams, setWorkParams, robotStatus } = useStore((state) => state);
  const editKey = useRef({
    key: '',
    value: '',
    str: '',
    unit: '',
    id: -1,
  });
  const [editModalVisible, setEditModalVisible] = useState(false);
  const editModalRef = useRef<RNTextInput>(null);

  const sendData = (fClass: string, fData: number) => {
    if (robotStatus.robotDangerStatus) {
      GlobalSnackbarManager.current?.show({
        content: '机器人处于软急停状态，无法发送命令',
      });
      return;
    }
    const socket = SocketManage.getInstance();

    if (socket.isConnected()) {
      socket.writeData(`${GlobalConst.forwardData}:${fClass}:${fData}`);
    } else {
      GlobalSnackbarManager.current?.show({
        content: '机器人未连接，无法发送命令',
      });
    }
  };

  const submitData = () => {
    if (workParams.auto_find_point) {
      Alert.alert('自动寻点模式下，无法进行参数设置');
      return;
    }

    if (
      (editKey.current.key === 'track_laser_range' &&
        Number(editKey.current.value) < workParamsRange.orbitInputMin) ||
      (editKey.current.key === 'track_laser_range' &&
        Number(editKey.current.value) > workParams.inputOrbitMax)
    ) {
      Alert.alert(
        '变轨激光范围超出范围',
        `变轨激光范围超出范围，需要在${workParamsRange.orbitInputMin}mm~${workParams.inputOrbitMax}mm之间`
      );
      return;
    }
    if (
      (editKey.current.key === 'node_laser_range' &&
        Number(editKey.current.value) < workParamsRange.nodeMin) ||
      (editKey.current.key === 'node_laser_range' &&
        Number(editKey.current.value) > workParams.inputNodeMax)
    ) {
      Alert.alert(
        '节点激光范围超出范围',
        `节点激光范围超出范围，需要在${workParamsRange.nodeMin}mm~${workParams.inputNodeMax}mm之间`
      );
      return;
    }

    if (editKey.current.value === '') {
      Alert.alert('参数值不能为空');
      return;
    }

    setWorkParams({ [editKey.current.key]: editKey.current.value });
    handleInputData(editKey.current.id, editKey.current.value);
    setEditModalVisible(false);
  };

  const openEditModal = (key: string, str: string, unit: string, id: number) => {
    editKey.current = {
      key,
      value: workParams[key as keyof typeof workParams] as string,
      str,
      unit,
      id,
    };
    setEditModalVisible(true);
    setTimeout(() => {
      editModalRef.current?.focus();
    }, 200);
  };

  const handleInputData = (id: number, textValue: string) => {
    switch (id) {
      case InputPara.orbitScopeMax:
        const temp = parseFloat(textValue);
        sendData(GlobalConst.orbitChangeLaser, temp); //发送到机器
        return true;
      case InputPara.nodeScopeMax:
        const temp2 = parseFloat(textValue);
        sendData(GlobalConst.nodeChangeLaser, temp2); //发送到机器
        return true;
      case InputPara.topDiameter: //上层钢筋直径
        const temp3 = parseInt(textValue, 10);
        if (temp3 < workParamsRange.inputMin || temp3 > workParamsRange.inputMax) {
          Alert.alert(
            '上层钢筋直径超出范围',
            `上层钢筋直径超出范围，需要在${workParamsRange.inputMin}mm~${workParamsRange.inputMax}mm之间`
          );
          return false;
        } else {
          sendData(GlobalConst.upDiam, temp3);
          return true;
        }
      case InputPara.downDiameter: //下层钢筋直径
        const temp4 = parseInt(textValue, 10);
        if (temp4 < workParamsRange.inputMin || temp4 > workParamsRange.inputMax) {
          Alert.alert(
            '下层钢筋直径超出范围',
            `下层钢筋直径超出范围，需要在${workParamsRange.inputMin}mm~${workParamsRange.inputMax}mm之间`
          );
          return false;
        } else {
          sendData(GlobalConst.lowerDiam, temp4);
          return true;
        }
      case InputPara.bottomDiameter:
        const temp5 = parseInt(textValue, 10);
        if (temp5 < workParamsRange.inputMin || temp5 > workParamsRange.inputMax) {
          Alert.alert(
            '下层钢筋长度超出范围',
            `下层钢筋长度超出范围，需要在${workParamsRange.inputMin}mm~${workParamsRange.inputMax}mm之间`
          );
          return false;
        } else {
          sendData(GlobalConst.lowerBar, temp5);
          return true;
        }
      case InputPara.bottomTime:
        const temp6 = parseInt(textValue, 10);
        sendData(GlobalConst.delay, temp6);
        return true;
      default:
        return true;
    }
  };

  ///开关超声波
  const changeUltrasound = (fValue: boolean) => {
    if (workParams.auto_find_point) {
      GlobalSnackbarManager.current?.show({
        content: '自动寻点开启，无法开启超声波',
      });
      return;
    }
    setWorkParams({ ultrasonic_waves: fValue });
    if (fValue) {
      sendData(GlobalConst.ultrasound, 1);
    } else {
      sendData(GlobalConst.ultrasound, 0);
    }
  };

  ///开关防坠激光
  const changeAntiFallLaser = (fValue: boolean) => {
    if (workParams.auto_find_point) {
      GlobalSnackbarManager.current?.show({
        content: '自动寻点开启，无法开启防坠激光',
      });
      return;
    }
    setWorkParams({ prevent_falling_laser: fValue });
    if (fValue) {
      sendData(GlobalConst.strip, 1);
    } else {
      sendData(GlobalConst.strip, 0);
    }
  };

  ///开关自动寻点
  const changePrevention = (fValue: boolean) => {
    setWorkParams({ auto_find_point: fValue });
    if (fValue) {
      sendData(GlobalConst.prevention, 1);
    } else {
      sendData(GlobalConst.prevention, 0);
    }
  };

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
          marginLeft: 20,
          marginRight: 20,
        }}>
        <View className="w-full">
          <View className="mb-4 flex flex-row items-center justify-between">
            <View className="my-1 flex flex-row items-center gap-2">
              <Icon source="cog" size={22} />
              <Text className="mb-1 ml-2 text-xl font-bold">参数设置</Text>
            </View>
            <TouchableOpacity onPress={onDismiss}>
              <Icon source="close" size={22} />
            </TouchableOpacity>
          </View>
          <View className="h-[365px] gap-5">
            <TouchableOpacity
              onPress={() => {
                openEditModal('track_laser_range', '变轨激光范围', 'mm', InputPara.orbitScopeMax);
              }}
              className="flex flex-row items-center justify-between gap-1 rounded-lg bg-gray-200 px-5 py-3">
              <View className="flex flex-row items-center">
                <Text className="text-md text-gray-800">变轨激光范围：</Text>
                <Text className="text-md ml-2 text-gray-800">{workParams.track_laser_range}</Text>
                <Text className="ml-1 text-lg text-gray-800">mm</Text>
              </View>
              <Icon source="pencil" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                openEditModal('node_laser_range', '节点激光范围', 'mm', InputPara.nodeScopeMax);
              }}
              className="flex flex-row items-center justify-between gap-1 rounded-lg bg-gray-200 px-5 py-3">
              <View className="flex flex-row items-center">
                <Text className="text-md text-gray-800">节点激光范围：</Text>
                <Text className="text-md ml-2 text-gray-800">{workParams.node_laser_range}</Text>
                <Text className="ml-1 text-lg text-gray-800">mm</Text>
              </View>
              <Icon source="pencil" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                openEditModal('upper_layer_diameter', '上层钢筋直径', 'mm', InputPara.topDiameter);
              }}
              className="flex flex-row items-center justify-between gap-1 rounded-lg bg-gray-200 px-5 py-3">
              <View className="flex flex-row items-center">
                <Text className="text-md text-gray-800">上层钢筋直径：</Text>
                <Text className="text-md ml-2 text-gray-800">
                  {workParams.upper_layer_diameter}
                </Text>
                <Text className="ml-1 text-lg text-gray-800">mm</Text>
              </View>
              <Icon source="pencil" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                openEditModal(
                  'lower_steel_bar_length',
                  '下层钢筋直径',
                  'mm',
                  InputPara.downDiameter
                );
              }}
              className="flex flex-row items-center justify-between gap-1 rounded-lg bg-gray-200 px-5 py-3">
              <View className="flex flex-row items-center">
                <Text className="text-md text-gray-800">下层钢筋直径：</Text>
                <Text className="text-md ml-2 text-gray-800">
                  {workParams.lower_steel_bar_length}
                </Text>
                <Text className="ml-1 text-lg text-gray-800">mm</Text>
              </View>
              <Icon source="pencil" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                openEditModal('lower_layer_diameter', '下层钢筋', 'mm', InputPara.bottomDiameter);
              }}
              className="flex flex-row items-center justify-between gap-1 rounded-lg bg-gray-200 px-5 py-3">
              <View className="flex flex-row items-center">
                <Text className="text-md text-gray-800">下层钢筋：</Text>
                <Text className="text-md ml-2 text-gray-800">
                  {workParams.lower_layer_diameter}
                </Text>
                <Text className="ml-1 text-lg text-gray-800">mm</Text>
              </View>
              <Icon source="pencil" size={20} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                openEditModal('binding_timeout', '绑扎延时', 'ms', InputPara.bottomTime);
              }}
              className="flex flex-row items-center justify-between gap-1 rounded-lg bg-gray-200 px-5 py-3">
              <View className="flex flex-row items-center">
                <Text className="text-md text-gray-800">绑扎延时：</Text>
                <Text className="text-md ml-2 text-gray-800">{workParams.binding_timeout}</Text>
                <Text className="ml-1 text-lg text-gray-800">ms</Text>
              </View>
              <Icon source="pencil" size={20} />
            </TouchableOpacity>
          </View>

          <View className="mb-2 mt-5 flex flex-col items-center justify-center gap-5">
            <View className="flex flex-row items-center justify-center gap-2">
              <Switch
                value={workParams.ultrasonic_waves}
                onValueChange={() => {
                  changeUltrasound(!workParams.ultrasonic_waves);
                }}
              />
              <Text className="text-md -ml-1 font-light">超声波</Text>
            </View>

            <View className="flex flex-row items-center justify-center gap-2">
              <Switch
                value={workParams.prevent_falling_laser}
                onValueChange={() => {
                  changeAntiFallLaser(!workParams.prevent_falling_laser);
                }}
              />
              <Text className="text-md -ml-1 font-light">防坠激光</Text>
            </View>

            <View className="flex flex-row items-center justify-center gap-2">
              <Switch
                value={workParams.auto_find_point}
                onValueChange={() => {
                  changePrevention(!workParams.auto_find_point);
                }}
              />
              <Text className="text-md -ml-1 font-light">自动寻点</Text>
            </View>
          </View>
        </View>
      </Modal>

      <Dialog
        visible={editModalVisible}
        onDismiss={() => {
          setEditModalVisible(false);
        }}
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          width: '80%',
          left: '0%',
          right: '0%',
          marginHorizontal: 'auto',
        }}>
        <Dialog.Title>
          <View className="flex flex-row items-center gap-2">
            <Icon source="cog" size={18} />
            <Text className="text-xl font-bold">{editKey.current.str}</Text>
          </View>
        </Dialog.Title>
        <Dialog.Content>
          <TextInput
            defaultValue={editKey.current.value}
            style={{
              backgroundColor: 'white',
              fontSize: 16,
            }}
            ref={editModalRef}
            right={<TextInput.Affix text={editKey.current.unit} />}
            keyboardType="numeric"
            onChangeText={(text) => {
              editKey.current.value = text;
            }}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setEditModalVisible(false);
            }}>
            取消
          </Button>

          <Button onPress={submitData}>确认</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

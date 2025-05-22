import { Dimensions, ScrollView, View } from 'react-native';

import { ControlBar } from '@/components/control-bar';
import { DangerousStatus } from '@/components/dangerous-status';
import { DataInspect } from '@/components/data-inspect';
import { ErrorData } from '@/components/error-data';
import { Header } from '@/components/header';
import { StatusBox } from '@/components/status-box';
import useStore from '@/store';

const Home = () => {
  const { robotStatus } = useStore((state) => state);

  return (
    <ScrollView className="flex w-full">
      <Header />
      {robotStatus.robotDangerStatus ? <DangerousStatus /> : null}

      <View className="flex w-full flex-col justify-center px-6 py-5">
        <View className="flex-1">
          <View className="flex-1">
            <View className="relative mx-auto flex flex-col justify-between gap-y-5">
              <ControlBar />
            </View>
          </View>

          <View className="my-5 flex-1">
            <StatusBox />
          </View>
          <View className="relative mx-auto flex w-full flex-col justify-between gap-y-4">
            <View>
              <DataInspect />
            </View>
            <View>
              <ErrorData />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

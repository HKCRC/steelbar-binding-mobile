import { View } from 'react-native';

import { ControlBar } from '@/components/control-bar';
import { DataInspect } from '@/components/data-inspect';
import { ErrorData } from '@/components/error-data';
import { Header } from '@/components/header';
import { StatusBox } from '@/components/status-box';
// import { DangerousStatus } from '@/components/dangerous-status';
const Home = () => {
  return (
    <View className="flex w-full">
      <Header />
      {/* <DangerousStatus /> */}
      <View className="flex w-full flex-row items-center justify-between px-6 py-5">
        <View className="w-[37.5%]">
          <View className="relative mx-auto flex w-[95%] flex-col justify-between gap-y-5">
            <ErrorData />
            <DataInspect />
          </View>
        </View>
        <View className="flex h-[90%] w-[25%] items-center justify-start">
          <StatusBox />
        </View>
        <View className="flex w-[37.5%] flex-row justify-between">
          <ControlBar />
        </View>
      </View>
    </View>
  );
};

export default Home;

import { CaretDown, CaretLeft, CaretRight, CaretUp } from 'phosphor-react-native';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const ControlAutoSelectDirection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View className="relative mt-10 flex flex-row items-center justify-center gap-x-5">
      <View className="absolute left-0 top-0 h-full w-full flex-col items-center justify-center gap-y-10">
        <TouchableOpacity onPress={() => console.log('Pressed')} className="-top-[50px]">
          <CaretUp size={48} weight="duotone" color="#0126416F" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Pressed')} className="-bottom-[50px]">
          <CaretDown size={48} weight="duotone" color="#0126416F" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handlePlay}
        className="relative flex w-full flex-row items-center justify-center">
        <View className="flex">
          {isPlaying ? (
            <View className="flex h-[120px] w-[120px] flex-row items-center justify-center rounded-full bg-[#012641] p-5">
              <Text className="ml-2 text-center text-2xl font-normal text-white">暂停</Text>
            </View>
          ) : (
            <View className="flex h-[120px] w-[120px] flex-row items-center justify-center rounded-full bg-[#012641] p-5">
              <Text className="ml-2 text-center text-2xl font-normal text-white">开始</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <View className="absolute left-0 top-0 h-full w-full flex-row items-center justify-center gap-x-10">
        <TouchableOpacity onPress={() => console.log('Pressed')} className="-left-[50px]">
          <CaretLeft size={48} weight="duotone" color="#0126416F" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Pressed')} className="-right-[50px]">
          <CaretRight size={48} weight="duotone" color="#0126416F" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

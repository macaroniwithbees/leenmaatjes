import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  title: string;
  onPressMenu?: () => void;
};

export default function Header({ title, onPressMenu }: Props) {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <TouchableOpacity onPress={onPressMenu} className="p-2">
        <Text className="text-lg">☰</Text>
      </TouchableOpacity>

      <Text className="text-lg font-semibold text-gray-800">{title}</Text>

      <View className="w-8" /> {/* spacer for alignment */}
    </View>
  );
}

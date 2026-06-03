import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";

export default function ZoekenScreen() {
  return (
    <SafeAreaView className="flex-1 bg-orange-50" edges={["top"]}>
      <View className="px-5 pt-2 pb-3">
        <Text className="text-xl font-bold text-orange-500">Leenmaat</Text>
      </View>
      <View className="flex-1 items-center justify-center px-8">
        <View className="w-16 h-16 bg-orange-100 rounded-2xl items-center justify-center mb-4">
          <Search size={28} color="#f97316" strokeWidth={1.8} />
        </View>
        <Text className="text-xl font-bold text-gray-800 text-center">
          Zoek items
        </Text>
        <Text className="text-sm text-gray-400 text-center mt-2">
          Hier kun je straks zoeken naar items in jouw buurt.
        </Text>
      </View>
    </SafeAreaView>
  );
}
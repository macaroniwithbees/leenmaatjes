import React from "react";
import { View, Text, ScrollView } from "react-native";
import Header from "../components/Header";

export default function Home() {
  return (
    <View className="flex-1">
      <Header title="Welkom bij Leenmaat" />
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800">Overzicht</Text>
          <Text className="text-sm text-gray-600 mt-2">
            Leen stuff!
          </Text>
        </View>

        <View className="space-y-4">
          <View className="p-4 bg-white rounded-lg shadow">
            <Text className="text-base font-medium text-gray-800">Kaart / Item 1</Text>
            <Text className="text-sm text-gray-600 mt-1">Beschrijving of status.</Text>
          </View>

          <View className="p-4 bg-white rounded-lg shadow">
            <Text className="text-base font-medium text-gray-800">Kaart / Item 2</Text>
            <Text className="text-sm text-gray-600 mt-1">Beschrijving of status.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

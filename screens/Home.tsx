import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import Header from "../components/Header";

export default function Home() {
  return (
    <View className="flex-1 bg-slate-100">
      <Header title="Leenmaat" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View className="bg-indigo-600 rounded-3xl p-6 mb-6">
          <Text className="text-white text-3xl font-bold">
            Welkom terug!
          </Text>

          <Text className="text-indigo-100 mt-2 text-base">
            Beheer je geleende en uitgeleende spullen eenvoudig.
          </Text>
        </View>

        {/* Stats */}
        <View className="flex-row gap-4 mb-6">
          <View className="flex-1 bg-white p-4 rounded-2xl shadow-sm">
            <Text className="text-gray-400 text-xs uppercase">
              Geleend
            </Text>

            <Text className="text-3xl font-bold text-gray-900 mt-1">
              4
            </Text>
          </View>

          <View className="flex-1 bg-white p-4 rounded-2xl shadow-sm">
            <Text className="text-gray-400 text-xs uppercase">
              Uitgeleend
            </Text>

            <Text className="text-3xl font-bold text-gray-900 mt-1">
              7
            </Text>
          </View>
        </View>

        {/* Section Header */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-900">
            Recente items
          </Text>

          <Text className="text-indigo-600 font-medium">
            Alles bekijken
          </Text>
        </View>

        {/* Card 1 */}
        <Pressable className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-slate-100">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-900">
              Boormachine
            </Text>

            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-green-700 text-xs font-medium">
                Actief
              </Text>
            </View>
          </View>

          <Text className="text-gray-500 mt-2">
            Uitgeleend aan Jan tot 12 juni.
          </Text>
        </Pressable>

        {/* Card 2 */}
        <Pressable className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-900">
                Fiets
            </Text>

            <View className="bg-amber-100 px-3 py-1 rounded-full">
              <Text className="text-amber-700 text-xs font-medium">
                Binnenkort terug
              </Text>
            </View>
          </View>

          <Text className="text-gray-500 mt-2">
            Geleend van Sarah. Verwachte retour: morgen.
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
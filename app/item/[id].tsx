import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  MapPin,
  Star,
  MessageCircle,
  HandHelping,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const ITEM_DATA: Record<string, any> = {
  "1": {
    id: "1",
    label: "Gitaar",
    emoji: "🎸",
    description:
      "Akoestische gitaar, perfect voor beginners of om mee te jammen. Zit in goede staat, wel een klein krasje op de onderkant maar verder prima.",
    owner: "Lisa",
    ownerInitial: "L",
    ownerRating: 4.8,
    ownerLendings: 12,
    distance: "0.3 km",
    location: "Ede, Gelderland",
    reviews: [
      { id: "1", author: "Tom", rating: 5, text: "Super gitaar, deed het perfect!" },
      { id: "2", author: "Mees", rating: 5, text: "Lisa was super vriendelijk en de gitaar was top." },
      { id: "3", author: "Nora", rating: 4, text: "Goede gitaar, kleine kras maar geen probleem." },
    ],
    availableDays: [3, 4, 5, 8, 9, 10, 11, 14, 15, 17, 18],
  },
  "2": {
    id: "2",
    label: "Fiets",
    emoji: "🚲",
    description: "Stevige stadsfiets met 7 versnellingen. Banden zijn recent vervangen. Slot en sleutel worden meegeleverd.",
    owner: "Tom",
    ownerInitial: "T",
    ownerRating: 4.6,
    ownerLendings: 7,
    distance: "0.8 km",
    location: "Ede, Gelderland",
    reviews: [
      { id: "1", author: "Sanne", rating: 5, text: "Fijne fiets, reed super!" },
      { id: "2", author: "Lisa", rating: 4, text: "Prima fiets voor een dagje." },
    ],
    availableDays: [1, 2, 6, 7, 12, 13, 16, 19, 20],
  },
  "3": {
    id: "3",
    label: "Tent",
    emoji: "⛺",
    description:
      "Klein tentje om mee te kamperen.",
    owner: "Mees",
    ownerInitial: "M",
    ownerRating: 3.8,
    ownerLendings: 12,
    distance: "1.2 km",
    location: "Ede, Gelderland",
    reviews: [
      { id: "1", author: "Tom", rating: 5, text: "Super gitaar, deed het perfect!" },
      { id: "2", author: "Mees", rating: 5, text: "Lisa was super vriendelijk en de gitaar was top." },
      { id: "3", author: "Nora", rating: 4, text: "Goede gitaar, kleine kras maar geen probleem." },
    ],
    availableDays: [3, 4, 5, 8, 9, 10, 11, 14, 15, 17, 18],
  },
  "4": {
    id: "4",
    label: "Camera",
    emoji: "📷",
    description:
      "Camera te leen om natuurfoto's mee te maken.",
    owner: "Nora",
    ownerInitial: "N",
    ownerRating: 4.9,
    ownerLendings: 15,
    distance: "1.5 km",
    location: "Ede, Gelderland",
    reviews: [
      { id: "1", author: "Tom", rating: 5, text: "Super gitaar, deed het perfect!" },
      { id: "2", author: "Mees", rating: 5, text: "Lisa was super vriendelijk en de gitaar was top." },
      { id: "3", author: "Nora", rating: 4, text: "Goede gitaar, kleine kras maar geen probleem." },
    ],
    availableDays: [3, 4, 5, 8, 9, 10, 11, 14, 15, 17, 18],
  }
};

const MONTH_DAYS = 20;
const TODAY = 3;

const ACCENT = "#f97316";

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const item = ITEM_DATA[id ?? "1"] ?? ITEM_DATA["1"];

  return (
    <SafeAreaView className="flex-1 bg-orange-50" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 bg-white rounded-xl items-center justify-center shadow-sm">
          <ArrowLeft size={20} color="#374151" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="ml-3 text-lg font-bold text-gray-800">
          {item.label}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Image placeholder */}
        <View className="mx-5 rounded-2xl bg-orange-100 items-center justify-center" style={{ height: 220 }}>
          <Text style={{ fontSize: 80 }}>{item.emoji}</Text>
        </View>

        {/* Title + distance */}
        <View className="px-5 mt-4 flex-row items-start justify-between">
          <Text className="text-2xl font-bold text-gray-800 flex-1">
            {item.label}
          </Text>
          <View className="flex-row items-center bg-orange-100 px-2.5 py-1 rounded-full ml-3 mt-1">
            <MapPin size={12} color={ACCENT} strokeWidth={2} />
            <Text className="text-xs font-semibold text-orange-500 ml-1">
              {item.distance}
            </Text>
          </View>
        </View>

        <View className="px-5 mt-1 flex-row items-center">
          <MapPin size={12} color="#9ca3af" strokeWidth={1.8} />
          <Text className="text-xs text-gray-400 ml-1">{item.location}</Text>
        </View>

        {/* Description */}
        <View className="px-5 mt-4">
          <Text className="text-sm text-gray-500 leading-5">
            {item.description}
          </Text>
        </View>

        {/* Owner card */}
        <View className="mx-5 mt-5 bg-white rounded-2xl p-4 flex-row items-center shadow-sm">
          <View className="w-12 h-12 bg-orange-100 rounded-full items-center shadow-sm">
            <Text className="text-lg font-bold text-orange-500">
              {item.ownerInitial}
            </Text>
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-sm font-bold text-gray-800">{item.owner}</Text>
            <View className="flex-row items-center mt-0.5">
              <Star size={12} color="#f97316" fill="#f97316" />
              <Text className="text-xs text-gray-500 ml-1">
                {item.ownerRating} | {item.ownerLendings} leningen
              </Text>
            </View>
          </View>
          <View className="bg-orange-50 px-3 py-1.5 rounded-xl">
            <Text className="text-xs font-semibold text-orange-400">Profiel</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
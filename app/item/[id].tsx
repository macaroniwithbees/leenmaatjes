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
      { id: "1", author: "Tom", rating: 3, text: "Goed tent, maar Mees kan wel vriendelijker zijn." },
      { id: "2", author: "Lisa", rating: 3.5, text: "Toppunt: de tent. Minpunt: Mees." },
      { id: "3", author: "Nora", rating: 4, text: "Goede tent, maar wel wat scheuren." },
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
      { id: "1", author: "Tom", rating: 5, text: "Top camera" },
      { id: "2", author: "Mees", rating: 5, text: "Super. Thnx Nora." },
      { id: "3", author: "Lisa", rating: 4, text: "Super camera, heb goede fotos gemaakt voor mijn winkeltje." },
    ],
    availableDays: [3, 4, 5, 8, 9, 10, 11, 14, 15, 17, 18],
  }
};

const MONTH_DAYS = 20;
const TODAY = 3;

const ACCENT = "#f97316";

// calendar component here 
function AvailabilityCalendar({ availableDays }: { availableDays: number[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const days = Array.from({ length: MONTH_DAYS }, (_, i) => i + 1);

  return (
    <View>
      <View className="flex-row flex-wrap gap-2">
        {days.map((day) => {
          const isAvailable = availableDays.includes(day);
          const isSelected = selected === day;
          const isPast = day < TODAY;

          return (
            <TouchableOpacity
              key={day}
              disabled={!isAvailable || isPast}
              onPress={() => setSelected(isSelected ? null : day)}
              className={`w-9 h-9 rounded-xl items-center justify-center
                ${isSelected ? "bg-orange-400" : ""}
                ${!isSelected && isAvailable && !isPast ? "bg-orange-100" : ""}
                ${!isAvailable || isPast ? "bg-gray-100" : ""}
              `}
            >
              <Text
                className={`text-xs font-semibold
                  ${isSelected ? "text-white" : ""}
                  ${!isSelected && isAvailable && !isPast ? "text-orange-500" : ""}
                  ${!isAvailable || isPast ? "text-gray-300" : ""}
                `}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View className="flex-row mt-3 gap-4">
        <View className="flex-row items-center gap-1.5">
          <View className="w-3 h-3 rounded-sm bg-orange-100" />
          <Text className="text-xs text-gray-600">Beschikbaar</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <View className="w-3 h-3 rounded-sm bg-orange-400" />
          <Text className="text-xs text-gray-600">Geselecteerd</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <View className="w-3 h-3 rounded-sm bg-gray-100" />
          <Text className="text-xs text-gray-600">Niet beschikbaar</Text>
        </View>
      </View>
    </View>
  )
}

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

        {/* Availability */}
        <View className="px-5 mt-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">Beschikbaarheid</Text>
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <Text className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">
              Juni 2026
            </Text>
            <AvailabilityCalendar availableDays={item.availableDays} />
          </View>
        </View>

        {/* Reviews */}
        <View className="px-5 mt-6">
          <Text className="text-lg font-bold text-gray-800 mb-3">Beoordelingen</Text>
          <View className="space-y-3">
            {item.reviews.map((review: any) => (
              <View key={review.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <View className="flex-row items-center mb-2">
                  <View className="w-8 h-8 bg-orange-100 rounded-full items-center justify-center">
                    <Text className="text-xs font-bold text-orange-500">
                      {review.author[0]}
                    </Text>
                  </View>
                  <Text className="ml-2 text-sm font-semibold text-gray-800">
                    {review.author}
                  </Text>
                  <View className="flex-row ml-auto">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={11} color="#f97316" fill="#f97316" />
                    ))}
                  </View>
                </View>
                <Text className="text-sm text-gray-500">{review.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Action buttons here */}
      <View className="absolute bottom-0 left-0 right-0 bg-orange-50 px-5 pt-3 pb-8 border-t border-orange-100 flex-row gap-3">
        <TouchableOpacity activeOpacity={0.8} className="flex-1 flex-row items-center justify-center bg-white border border-orange-200 rounded-2xl py-4 gap-2">
          <MessageCircle size={18} color={ACCENT} strokeWidth={2} />
          <Text className="text-sm font-bold text-orange-400">Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} className="flex-2 flex-row items-center justify-center bg-orange-400 rounded-2xl py-4 px-6 gap-2">
          <HandHelping size={18} color="white" strokeWidth={2} />
          <Text className="text-sm font-bold text-white">Leen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
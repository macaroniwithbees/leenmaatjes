import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, MapPin, Star, MessageCircle, HandHelping } from "lucide-react-native";

const stickerShadow = {
  shadowColor: "#2D2A26",
  shadowOffset: { width: 3, height: 3 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 4,
};

const ITEM_DATA: Record<string, any> = {
  "1": {
    id: "1", label: "Gitaar", emoji: "🎸",
    description: "Akoestische gitaar, perfect voor beginners of om mee te jammen. Zit in goede staat, wel een klein krasje op de onderkant maar verder prima.",
    owner: "Lisa", ownerInitial: "L", ownerRating: 4.8, ownerLendings: 12,
    distance: "0.3 km", location: "Ede, Gelderland",
    reviews: [
      { id: "1", author: "Tom", rating: 5, text: "Super gitaar, deed het perfect!" },
      { id: "2", author: "Mees", rating: 5, text: "Lisa was super vriendelijk en de gitaar was top." },
      { id: "3", author: "Nora", rating: 4, text: "Goede gitaar, kleine kras maar geen probleem." },
    ],
    availableDays: [3, 4, 5, 8, 9, 10, 11, 14, 15, 17, 18],
  },
  "2": {
    id: "2", label: "Fiets", emoji: "🚲",
    description: "Stevige stadsfiets met 7 versnellingen. Banden zijn recent vervangen. Slot en sleutel worden meegeleverd.",
    owner: "Tom", ownerInitial: "T", ownerRating: 4.6, ownerLendings: 7,
    distance: "0.8 km", location: "Ede, Gelderland",
    reviews: [
      { id: "1", author: "Sanne", rating: 5, text: "Fijne fiets, reed super!" },
      { id: "2", author: "Lisa", rating: 4, text: "Prima fiets voor een dagje." },
    ],
    availableDays: [1, 2, 6, 7, 12, 13, 16, 19, 20],
  },
};

const MONTH_DAYS = 20;
const TODAY = 3;

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
          const disabled = !isAvailable || isPast;

          return (
            <TouchableOpacity
              key={day}
              disabled={disabled}
              onPress={() => setSelected(isSelected ? null : day)}
              className={`w-9 h-9 rounded-xl items-center justify-center border-2
                ${isSelected ? "bg-terracotta border-ink" : ""}
                ${!isSelected && isAvailable && !isPast ? "bg-mustard border-ink" : ""}
                ${disabled ? "bg-cream border-ink/20" : ""}
              `}
            >
              <Text className={`font-body-bold text-xs ${isSelected ? "text-white" : disabled ? "text-ink-soft/40" : "text-ink"}`}>
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View className="flex-row mt-3 gap-4">
        <View className="flex-row items-center gap-1.5">
          <View className="w-3 h-3 rounded-sm bg-mustard border border-ink" />
          <Text className="font-body text-xs text-ink-soft">Beschikbaar</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <View className="w-3 h-3 rounded-sm bg-terracotta border border-ink" />
          <Text className="font-body text-xs text-ink-soft">Geselecteerd</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <View className="w-3 h-3 rounded-sm bg-cream border border-ink/20" />
          <Text className="font-body text-xs text-ink-soft">Niet beschikbaar</Text>
        </View>
      </View>
    </View>
  );
}

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const item = ITEM_DATA[id ?? "1"] ?? ITEM_DATA["1"];

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          style={stickerShadow}
          className="w-9 h-9 bg-white rounded-xl border-2 border-ink items-center justify-center"
        >
          <ArrowLeft size={20} color="#2D2A26" strokeWidth={2.2} />
        </TouchableOpacity>
        <Text className="ml-3 font-heading-bold text-lg text-ink">{item.label}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Hero */}
        <View style={[{ height: 220 }, stickerShadow]} className="mx-5 rounded-2xl bg-mustard border-2 border-ink items-center justify-center">
          <Text style={{ fontSize: 80 }}>{item.emoji}</Text>
        </View>

        {/* Title + distance */}
        <View className="px-5 mt-4 flex-row items-start justify-between">
          <Text className="font-heading-bold text-2xl text-ink flex-1">{item.label}</Text>
          <View className="flex-row items-center bg-white px-2.5 py-1 rounded-full ml-3 mt-1 border-2 border-ink">
            <MapPin size={12} color="#2D2A26" strokeWidth={2.5} />
            <Text className="font-body-bold text-xs text-ink ml-1">{item.distance}</Text>
          </View>
        </View>

        <View className="px-5 mt-1 flex-row items-center">
          <MapPin size={12} color="#6B6560" strokeWidth={2} />
          <Text className="font-body text-xs text-ink-soft ml-1">{item.location}</Text>
        </View>

        {/* Description */}
        <View className="px-5 mt-4">
          <Text className="font-body text-sm text-ink-soft leading-5">{item.description}</Text>
        </View>

        {/* Owner card */}
        <View style={stickerShadow} className="mx-5 mt-5 bg-white rounded-2xl p-4 flex-row items-center border-2 border-ink">
          <View className="w-12 h-12 bg-sage rounded-full items-center justify-center border-2 border-ink">
            <Text className="font-heading-bold text-lg text-ink">{item.ownerInitial}</Text>
          </View>
          <View className="ml-3 flex-1">
            <Text className="font-heading text-[15px] text-ink">{item.owner}</Text>
            <View className="flex-row items-center mt-0.5">
              <Star size={12} color="#2D2A26" fill="#F2C14E" strokeWidth={2} />
              <Text className="font-body text-xs text-ink-soft ml-1">
                {item.ownerRating} · {item.ownerLendings} leningen
              </Text>
            </View>
          </View>
          <View className="bg-cream px-3 py-1.5 rounded-xl border-2 border-ink">
            <Text className="font-body-bold text-xs text-ink">Profiel</Text>
          </View>
        </View>

        {/* Availability */}
        <View className="px-5 mt-6">
          <Text className="font-heading text-lg text-ink mb-3">Beschikbaarheid</Text>
          <View style={stickerShadow} className="bg-white rounded-2xl p-4 border-2 border-ink">
            <Text className="font-body-bold text-xs text-ink-soft mb-3 uppercase tracking-wide">Juni 2026</Text>
            <AvailabilityCalendar availableDays={item.availableDays} />
          </View>
        </View>

        {/* Reviews */}
        <View className="px-5 mt-6">
          <Text className="font-heading text-lg text-ink mb-3">Beoordelingen</Text>
          <View className="gap-3">
            {item.reviews.map((review: any) => (
              <View key={review.id} style={stickerShadow} className="bg-white rounded-2xl p-4 border-2 border-ink">
                <View className="flex-row items-center mb-2">
                  <View className="w-8 h-8 bg-lavender rounded-full items-center justify-center border-2 border-ink">
                    <Text className="font-heading-bold text-xs text-ink">{review.author[0]}</Text>
                  </View>
                  <Text className="ml-2 font-heading text-sm text-ink">{review.author}</Text>
                  <View className="flex-row ml-auto">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={11} color="#2D2A26" fill="#F2C14E" strokeWidth={2} />
                    ))}
                  </View>
                </View>
                <Text className="font-body text-sm text-ink-soft">{review.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky actions */}
      <View className="absolute bottom-0 left-0 right-0 bg-cream px-5 pt-3 pb-8 border-t-2 border-ink flex-row gap-3">
        <TouchableOpacity
          activeOpacity={0.85}
          style={stickerShadow}
          className="flex-1 flex-row items-center justify-center bg-white border-2 border-ink rounded-2xl py-4 gap-2"
        >
          <MessageCircle size={18} color="#2D2A26" strokeWidth={2.2} />
          <Text className="font-body-bold text-sm text-ink">Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.85}
          style={stickerShadow}
          className="flex-[2] flex-row items-center justify-center bg-terracotta border-2 border-ink rounded-2xl py-4 px-6 gap-2"
        >
          <HandHelping size={18} color="white" strokeWidth={2.2} />
          <Text className="font-body-bold text-sm text-white">Leen aan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
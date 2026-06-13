import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Star, Package, HandHelping, Settings, ChevronRight, MapPin } from "lucide-react-native";

const stickerShadow = {
  shadowColor: "#2D2A26",
  shadowOffset: { width: 3, height: 3 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 4,
};

const STATS = [
  { id: "1", label: "Uitgeleend", value: "12", emoji: "📦", bg: "bg-mustard" },
  { id: "2", label: "Geleend", value: "8", emoji: "🤝", bg: "bg-sage" },
  { id: "3", label: "Beoordeling", value: "4.9", emoji: "⭐", bg: "bg-lavender" },
];

const MY_ITEMS = [
  { id: "1", emoji: "🎸", label: "Gitaar", status: "Beschikbaar", bg: "bg-mustard" },
  { id: "5", emoji: "🔧", label: "Boormachine", status: "Uitgeleend aan Sanne", bg: "bg-terracotta" },
  { id: "7", emoji: "🪜", label: "Ladder", status: "Beschikbaar", bg: "bg-sage" },
];

const HISTORY = [
  { id: "1", emoji: "⛺", text: "Tent geleend van Mees", date: "2 weken geleden" },
  { id: "2", emoji: "🚲", text: "Fiets uitgeleend aan Tom", date: "1 maand geleden" },
  { id: "3", emoji: "📷", text: "Camera geleend van Nora", date: "1 maand geleden" },
];

export default function ProfielScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Header */}
        <View className="px-5 pt-2 pb-1 flex-row items-center justify-between">
          <Text className="font-heading-bold text-2xl text-ink">
            Profiel<Text className="text-terracotta">.</Text>
          </Text>
          <TouchableOpacity style={stickerShadow} className="w-9 h-9 bg-white rounded-xl border-2 border-ink items-center justify-center">
            <Settings size={18} color="#2D2A26" strokeWidth={2.2} />
          </TouchableOpacity>
        </View>

        {/* Profile card */}
        <View className="px-5 mt-4">
          <View style={stickerShadow} className="bg-white rounded-2xl p-5 border-2 border-ink items-center">
            <View className="w-20 h-20 rounded-full bg-mustard border-2 border-ink items-center justify-center">
              <Text className="font-heading-bold text-3xl text-ink">F</Text>
            </View>
            <Text className="font-heading-bold text-xl text-ink mt-3">Floris</Text>
            <View className="flex-row items-center mt-1">
              <MapPin size={12} color="#6B6560" strokeWidth={2.2} />
              <Text className="font-body text-xs text-ink-soft ml-1">Ede, Gelderland</Text>
            </View>
            <View className="flex-row items-center mt-2 gap-1">
              <Star size={13} color="#2D2A26" fill="#F2C14E" strokeWidth={2} />
              <Text className="font-body-bold text-xs text-ink">4.9 · Lid sinds maart 2026</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row px-5 mt-4 gap-3">
          {STATS.map((stat) => (
            <View key={stat.id} style={stickerShadow} className={`flex-1 ${stat.bg} rounded-2xl p-3 border-2 border-ink items-center`}>
              <Text style={{ fontSize: 20 }}>{stat.emoji}</Text>
              <Text className="font-heading-bold text-lg text-ink mt-1">{stat.value}</Text>
              <Text className="font-body text-[11px] text-ink mt-0.5 text-center">{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* My items */}
        <View className="px-5 mt-7">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-1.5">
              <Package size={18} color="#2D2A26" strokeWidth={2.2} />
              <Text className="font-heading text-lg text-ink">Mijn items</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/leen-uit")}>
              <Text className="font-body-bold text-xs text-terracotta">+ Toevoegen</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3">
            {MY_ITEMS.map((item) => (
              <View key={item.id} style={stickerShadow} className="flex-row items-center bg-white rounded-2xl px-3.5 py-3 border-2 border-ink">
                <View className={`w-12 h-12 rounded-xl ${item.bg} border-2 border-ink items-center justify-center`}>
                  <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
                </View>
                <View className="ml-3 flex-1">
                  <Text className="font-heading text-[15px] text-ink">{item.label}</Text>
                  <Text className="font-body text-xs text-ink-soft mt-0.5">{item.status}</Text>
                </View>
                <ChevronRight size={18} color="#6B6560" strokeWidth={2.2} />
              </View>
            ))}
          </View>
        </View>

        {/* History */}
        <View className="px-5 mt-7">
          <View className="flex-row items-center gap-1.5 mb-3">
            <HandHelping size={18} color="#2D2A26" strokeWidth={2.2} />
            <Text className="font-heading text-lg text-ink">Geschiedenis</Text>
          </View>

          <View style={stickerShadow} className="bg-white rounded-2xl border-2 border-ink overflow-hidden">
            {HISTORY.map((entry, i) => (
              <View
                key={entry.id}
                className={`flex-row items-center px-4 py-3.5 ${i !== HISTORY.length - 1 ? "border-b-2 border-cream" : ""}`}
              >
                <Text style={{ fontSize: 20 }}>{entry.emoji}</Text>
                <View className="ml-3 flex-1">
                  <Text className="font-body-medium text-sm text-ink">{entry.text}</Text>
                  <Text className="font-body text-xs text-ink-soft mt-0.5">{entry.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
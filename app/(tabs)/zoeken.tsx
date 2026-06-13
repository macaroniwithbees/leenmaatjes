import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Search, MapPin, X } from "lucide-react-native";

const stickerShadow = {
  shadowColor: "#2D2A26",
  shadowOffset: { width: 3, height: 3 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 4,
};

const CATEGORIES = [
  { id: "alle", label: "Alle", emoji: "✨" },
  { id: "gereedschap", label: "Gereedschap", emoji: "🔧" },
  { id: "sport", label: "Sport & Spel", emoji: "⚽" },
  { id: "muziek", label: "Muziek", emoji: "🎸" },
  { id: "outdoor", label: "Outdoor", emoji: "⛺" },
  { id: "elektronica", label: "Elektronica", emoji: "📷" },
];

const ITEMS = [
  { id: "1", emoji: "🎸", label: "Gitaar", owner: "Lisa", distance: "0.3 km", category: "muziek", bg: "bg-mustard" },
  { id: "2", emoji: "🚲", label: "Fiets", owner: "Tom", distance: "0.8 km", category: "outdoor", bg: "bg-sage" },
  { id: "3", emoji: "⛺", label: "Tent", owner: "Mees", distance: "1.2 km", category: "outdoor", bg: "bg-terracotta" },
  { id: "4", emoji: "📷", label: "Camera", owner: "Nora", distance: "1.5 km", category: "elektronica", bg: "bg-lavender" },
  { id: "5", emoji: "🔧", label: "Boormachine", owner: "Sanne", distance: "0.5 km", category: "gereedschap", bg: "bg-mustard" },
  { id: "6", emoji: "🏓", label: "Tafeltennisset", owner: "Joren", distance: "2.1 km", category: "sport", bg: "bg-sage" },
  { id: "7", emoji: "🪜", label: "Ladder", owner: "Tom", distance: "0.9 km", category: "gereedschap", bg: "bg-lavender" },
  { id: "8", emoji: "🎮", label: "Spelconsole", owner: "Mees", distance: "1.0 km", category: "elektronica", bg: "bg-terracotta" },
];

export default function ZoekenScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("alle");

  const filtered = ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "alle" || item.category === activeCategory;
    const matchesQuery = item.label.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      {/* Header */}
      <View className="px-5 pt-2 pb-1">
        <Text className="font-heading-bold text-2xl text-ink">
          Zoeken<Text className="text-terracotta">.</Text>
        </Text>
      </View>

      {/* Search bar */}
      <View className="px-5 mt-3">
        <View style={stickerShadow} className="flex-row items-center bg-white rounded-2xl px-4 py-3 border-2 border-ink">
          <Search size={18} color="#6B6560" strokeWidth={2.2} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Zoek naar een item..."
            placeholderTextColor="#6B6560"
            className="ml-2 flex-1 font-body text-sm text-ink"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <X size={18} color="#6B6560" strokeWidth={2.2} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category filters */}
      <View className="mt-4">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setActiveCategory(cat.id)}
                activeOpacity={0.8}
                style={stickerShadow}
                className={`flex-row items-center px-3.5 py-2 rounded-xl border-2 border-ink ${isActive ? "bg-terracotta" : "bg-white"}`}
              >
                <Text style={{ fontSize: 14 }}>{cat.emoji}</Text>
                <Text className={`ml-1.5 font-body-bold text-xs ${isActive ? "text-white" : "text-ink"}`}>{cat.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Results */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 }}>
        <Text className="font-body text-xs text-ink-soft mb-3">
          {filtered.length} item{filtered.length === 1 ? "" : "s"} gevonden
        </Text>

        {filtered.length === 0 ? (
          <View className="items-center mt-10">
            <Text style={{ fontSize: 40 }} className="mb-2">🔍</Text>
            <Text className="font-heading text-base text-ink">Niets gevonden</Text>
            <Text className="font-body text-sm text-ink-soft text-center mt-1">
              Probeer een andere zoekterm of categorie.
            </Text>
          </View>
        ) : (
          <View className="gap-3">
            {filtered.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                onPress={() => router.push(`/item/${item.id}`)}
                style={stickerShadow}
                className="flex-row items-center bg-white rounded-2xl px-3.5 py-3 border-2 border-ink"
              >
                <View className={`w-12 h-12 rounded-xl ${item.bg} border-2 border-ink items-center justify-center`}>
                  <Text style={{ fontSize: 20 }}>{item.emoji}</Text>
                </View>
                <View className="ml-3 flex-1">
                  <Text className="font-heading text-[15px] text-ink">{item.label}</Text>
                  <Text className="font-body text-xs text-ink-soft mt-0.5">van {item.owner}</Text>
                </View>
                <View className="flex-row items-center gap-1 bg-cream px-2 py-1 rounded-lg border-2 border-ink">
                  <MapPin size={11} color="#2D2A26" strokeWidth={2.5} />
                  <Text className="font-body-bold text-[11px] text-ink">{item.distance}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
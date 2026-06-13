import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { PlusCircle, Search, Package, Users, MapPin } from "lucide-react-native";

const stickerShadow = {
  shadowColor: "#2D2A26",
  shadowOffset: { width: 3, height: 3 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 4,
};

const ACTIVE_LOANS = [
  { id: "1", item: "Boormachine", from: "Sanne", dueDate: "8 jun", bg: "bg-mustard" },
  { id: "2", item: "Campingstoel", from: "Joren", dueDate: "12 jun", bg: "bg-sage" },
];

const NEARBY_ITEMS = [
  { id: "1", emoji: "🎸", label: "Gitaar", owner: "Lisa", distance: "0.3 km", bg: "bg-mustard" },
  { id: "2", emoji: "🚲", label: "Fiets", owner: "Tom", distance: "0.8 km", bg: "bg-sage" },
  { id: "3", emoji: "⛺", label: "Tent", owner: "Mees", distance: "1.2 km", bg: "bg-terracotta" },
  { id: "4", emoji: "📷", label: "Camera", owner: "Nora", distance: "1.5 km", bg: "bg-lavender" },
];

const QUICK_ACTIONS = [
  { icon: PlusCircle, label: "Leen uit", bg: "bg-terracotta" },
  { icon: Search, label: "Zoek item", bg: "bg-sage" },
  { icon: Package, label: "Mijn items", bg: "bg-mustard" },
  { icon: Users, label: "Vrienden", bg: "bg-lavender" },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      {/* Header */}
      <View className="px-5 pt-2 pb-1 flex-row items-center justify-between">
        <Text className="font-heading-bold text-2xl text-ink">
          leenmaat<Text className="text-terracotta">.</Text>
        </Text>
        <View className="w-9 h-9 rounded-full bg-mustard border-2 border-ink items-center justify-center">
          <Text className="font-heading-bold text-sm text-ink">F</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View className="px-5 pt-3 pb-1">
          <Text className="font-heading-bold text-3xl text-ink leading-tight">
            Hoi Floris! 
          </Text>
          <Text className="font-body text-sm text-ink-soft mt-1.5">
            Wat wil je vandaag lenen of uitlenen?
          </Text>
        </View>

        {/* Quick actions */}
        <View className="flex-row justify-between px-5 mt-5">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <TouchableOpacity
                key={action.label}
                activeOpacity={0.8}
                onPress={() => { if (action.label === "Leen uit") router.push("/leen-uit"); }}
                className="items-center"
              >
                <View
                  style={stickerShadow}
                  className={`w-[60px] h-[60px] rounded-2xl ${action.bg} border-2 border-ink items-center justify-center`}
                >
                  <Icon size={24} color="#2D2A26" strokeWidth={2.2} />
                </View>
                <Text className="font-body-medium text-[11px] text-ink mt-2">
                  {action.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Active loans */}
        <View className="mt-8 pl-5">
          <View className="flex-row justify-between items-center mb-3 pr-5">
            <Text className="font-heading text-lg text-ink">Actieve leningen</Text>
            <TouchableOpacity>
              <Text className="font-body-bold text-xs text-terracotta">Alles zien →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
            {ACTIVE_LOANS.map((loan) => (
              <TouchableOpacity
                key={loan.id}
                activeOpacity={0.85}
                style={stickerShadow}
                className={`mr-4 p-4 rounded-2xl ${loan.bg} w-44 border-2 border-ink`}
              >
                <View className="w-8 h-8 rounded-full bg-cream border-2 border-ink items-center justify-center mb-2.5">
                  <Text className="font-heading-bold text-sm text-ink">{loan.from[0]}</Text>
                </View>
                <Text className="font-heading text-base text-ink">{loan.item}</Text>
                <Text className="font-body-medium text-xs text-ink mt-1 opacity-70">
                  van {loan.from}
                </Text>
                <View className="mt-2.5 self-start bg-cream px-2 py-1 rounded-lg border-2 border-ink">
                  <Text className="font-body-bold text-[10px] text-ink">
                    terug vóór {loan.dueDate}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              activeOpacity={0.8}
              className="w-44 min-h-[140px] rounded-2xl border-2 border-dashed border-ink items-center justify-center px-4"
            >
              <Text className="font-body-medium text-xs text-ink-soft text-center">
                Leen iets uit aan een vriend
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Nearby items */}
        <View className="px-5 mt-8">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="font-heading text-lg text-ink">In jouw buurt</Text>
            <TouchableOpacity>
              <Text className="font-body-bold text-xs text-terracotta">Kaart →</Text>
            </TouchableOpacity>
          </View>

          <View className="gap-3">
            {NEARBY_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                onPress={() => router.push(`/item/${item.id}`)}
                style={stickerShadow}
                className="flex-row items-center bg-white rounded-2xl px-3.5 py-3 border-2 border-ink"
              >
                <View className={`w-12 h-12 rounded-xl ${item.bg} border-2 border-ink items-center justify-center`}>
                  <Text className="text-xl">{item.emoji}</Text>
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
        </View>

        {/* CTA banner */}
        <View
          style={stickerShadow}
          className="mx-5 mt-8 bg-terracotta rounded-3xl p-5 border-2 border-ink"
        >
          <Text className="font-heading-bold text-lg text-white">Heb je iets te leen?</Text>
          <Text className="font-body text-sm text-white/90 mt-1.5 mb-4">
            Help je buren en verdien wat terug.
          </Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/leen-uit")}
            className="self-start bg-cream px-4.5 py-2.5 rounded-xl border-2 border-ink"
          >
            <Text className="font-body-bold text-[13px] text-ink">Item toevoegen</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
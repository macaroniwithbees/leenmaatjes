import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import Header from "../components/Header";
import { PlusCircle, Search, Package, Users } from "lucide-react-native";

const ACTIVE_LOANS = [
  {
    id: "1",
    item: "Boormachine",
    from: "Sanne",
    dueDate: "8 jun",
    color: "bg-amber-100",
    accent: "text-amber-600",
    dot: "bg-amber-400",
  },
  {
    id: "2",
    item: "Campingstoel",
    from: "Joren",
    dueDate: "12 jun",
    color: "bg-rose-100",
    accent: "text-rose-500",
    dot: "bg-rose-400",
  },
];

const NEARBY_ITEMS = [
  { id: "1", emoji: "🎸", label: "Gitaar", owner: "Lisa", distance: "0.3 km" },
  { id: "2", emoji: "🚲", label: "Fiets", owner: "Tom", distance: "0.8 km" },
  { id: "3", emoji: "⛺", label: "Tent", owner: "Mees", distance: "1.2 km" },
  { id: "4", emoji: "📷", label: "Camera", owner: "Nora", distance: "1.5 km" },
];

const QUICK_ACTIONS = [
  { icon: PlusCircle, label: "Leen uit", color: "#f97316" },
  { icon: Search, label: "Zoek item", color: "#f97316" },
  { icon: Package, label: "Mijn items", color: "#f97316" },
  { icon: Users, label: "Vrienden", color: "#f97316" },
];

export default function Home() {
  return (
    <View className="flex-1 bg-orange-100">
      <Header title="Welkom bij Leenmaat" />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero greeting */}
        <View className="px-5 pt-6 pb-2">
          <Text className="text-3xl font-bold text-gray-800 leading-tight">
            Hoi Floris!
          </Text>
          <Text className="text-base text-gray-500 mt-1">
            Wat wil je vandaag lenen of uitlenen?
          </Text>
        </View>

        {/* Quick actions */}
        <View className="flex-row justify-between px-5 mt-5">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon; 
            return (
              <TouchableOpacity key={action.label} activeOpacity={0.75} className="items-center">
                <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center shadow shadow-orange-100">
                  <Icon size={26} color={action.color} strokeWidth={1.8} />
                </View>
                <Text className="text-xs text-gray-500 mt-1.5 font-medium">{action.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Active loans */}
        <View className="mt-7 px-5">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-800">
              Actieve leningen
            </Text>
            <TouchableOpacity>
              <Text className="text-sm text-orange-400 font-semibold">
                Alles zien
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ACTIVE_LOANS.map((loan) => (
              <TouchableOpacity
                key={loan.id}
                activeOpacity={0.8}
                className={`mr-3 p-4 rounded-2xl ${loan.color} w-44`}
              >
                <View className="flex-row items-center mb-3">
                  <View className="w-8 h-8 rounded-full bg-white items-center justify-center overflow-hidden">
                    {/* Placeholder avatar initial */}
                    <Text className={`text-sm font-bold ${loan.accent}`}>
                      {loan.from[0]}
                    </Text>
                  </View>
                  <Text className="ml-2 text-sm font-semibold text-gray-700">
                    {loan.from}
                  </Text>
                </View>
                <Text className="text-base font-bold text-gray-800">
                  {loan.item}
                </Text>
                <View className="flex-row items-center mt-2">
                  <View className={`w-2 h-2 rounded-full ${loan.dot} mr-1.5`} />
                  <Text className={`text-xs font-medium ${loan.accent}`}>
                    Terug vóór {loan.dueDate}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* Empty-state nudge */}
            <TouchableOpacity
              activeOpacity={0.75}
              className="w-44 h-full min-h-[120px] border-2 border-dashed border-orange-200 rounded-2xl items-center justify-center px-4"
            >
              <Text className="text-xs text-center text-gray-400 font-medium">
                Leen iets uit aan een vriend
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Nearby items */}
        <View className="mt-7 px-5">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-800">
              In jouw buurt
            </Text>
            <TouchableOpacity>
              <Text className="text-sm text-orange-400 font-semibold">
                Kaart
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-2">
            {NEARBY_ITEMS.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                className="flex-row items-center bg-white rounded-2xl px-4 py-3 shadow-sm shadow-orange-100"
              >
                <View className="w-11 h-11 bg-orange-50 rounded-xl items-center justify-center">
                  <Text className="text-xl">{item.emoji}</Text>
                </View>
                <View className="ml-3 flex-1">
                  <Text className="text-sm font-bold text-gray-800">
                    {item.label}
                  </Text>
                  <Text className="text-xs text-gray-400 mt-0.5">
                    van {item.owner}
                  </Text>
                </View>
                <View className="bg-orange-100 px-2.5 py-1 rounded-full">
                  <Text className="text-xs font-semibold text-orange-500">
                    {item.distance}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* CTA banner */}
        <View className="mx-5 mt-7 bg-orange-400 rounded-2xl px-5 py-5">
          <Text className="text-white font-bold text-base">
            Heb je iets te leen?
          </Text>
          <Text className="text-orange-100 text-sm mt-1 mb-3">
            Help je buren en leen stuff.
          </Text>
          <TouchableOpacity
            className="bg-white self-start px-4 py-2 rounded-xl"
            activeOpacity={0.85}
          >
            <Text className="text-orange-500 text-sm font-bold">
              Item toevoegen
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
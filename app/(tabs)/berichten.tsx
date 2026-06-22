import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const stickerShadow = {
    shadowColor: "#2D2A26",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
};

const CONVOS = [
    {
        id: "lisa",
        name: "Lisa",
        initial: "L",
        avatarBg: "bg-mustard",
        item: "Gitaar",
        lastMessage: "Gaaf! Kan ik hem zaterdag ophalen?",
        time: "10:42",
        unread: 2,
    },
    {
        id: "tom",
        name: "Tom",
        initial: "T",
        avatarBg: "bg-sage",
        item: "Fiets",
        lastMessage: "Toppie, ik breng hem morgen terug",
        time: "Gisteren",
        unread: 0,
    },
    {
        id: "mees",
        name: "Mees",
        initial: "M",
        avatarBg: "bg-lavender",
        item: "Tent",
        lastMessage: "Heb je ook haringen erbij?",
        time: "Ma",
        unread: 1,
    },
    {
        id: "nora",
        name: "Nora",
        initial: "N",
        avatarBg: "bg-terracotta",
        item: "Camera",
        lastMessage: "Bedankt voor het lenen!",
        time: "Za",
        unread: 0,
    },
];

export default function BerichtenScreen() {
    const router = useRouter();
    
    return (
        <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
            <View className="px-5 pt-2 pb-1">
                <Text className="font-heading-bold text-2xl text-ink">Berichten<Text className="text-terracotta">.</Text></Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, gap: 12 }}>
                {CONVOS.map((convo) => (
                    <TouchableOpacity
                        key={convo.id}
                        activeOpacity={0.85}
                        style={stickerShadow}
                        onPress={() => router.push(`/chat/${convo.id}`)}
                        className="flex-row items-center bg-white rounded-2xl px-4 py-3.5 border-2 border-ink"
                    >
                        {/* Avatar */}
                        <View className={`w-12 h-12 rounded-full ${convo.avatarBg} border-2 border-ink items-center justify-center`}>
                            <Text className="font=heading-bold text-lg text-ink">{convo.initial}</Text>
                        </View>

                        {/* Content */}
                        <View className="ml-3 flex-1">
                            <View className="flex-row items-center justify-between">
                                <Text className="font-heading text-[15px] text=ink">{convo.name}</Text>
                                <Text className="font-body text-xs text-ink-soft">{convo.time}</Text>
                            </View>
                            <Text className="font-body-medium text-xs text-ink-soft mt-0.5">re: {convo.item}</Text>
                            <Text className="font-body text-xs text-ink-soft mt-0.5" numberOfLines={1}>{convo.lastMessage}</Text>
                        </View>

                        {/* Unread badge */}
                        {convo.unread > 0 && (
                            <View className="ml-3 w-5 h-5 rounded-full bg-terracotta border-2 border-ink items-center justify-center">
                                <Text className="font-body-bold text-[10px] text-whites">{convo.unread}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
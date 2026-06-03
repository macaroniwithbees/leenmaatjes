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
            
        </SafeAreaView>
    )
}
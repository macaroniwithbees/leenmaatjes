import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    emoji: "🏘️",
    title: "Leen van vrienden\n& buren",
    description:
      "Heb je iets nodig? Kijk eerst bij de mensen om je heen. Van een boormachine tot een tent, je buren hebben het vast.",
    bg: "#fff7ed",
    accent: "#f97316",
    bubbleColor: "#fed7aa",
    decorEmojis: ["🔧", "🎸", "🚲", "📷"],
  },
  {
    id: "2",
    emoji: "📍",
    title: "Vind items in\njouw buurt",
    description:
      "Zoek op wat je nodig hebt en zie meteen wie in de buurt het heeft. Alles dichtbij, alles makkelijk.",
    bg: "#fffbeb",
    accent: "#d97706",
    bubbleColor: "#fde68a",
    decorEmojis: ["🗺️", "📦", "🏠", "⛺"],
  },
  {
    id: "3",
    emoji: "💸",
    title: "Leen uit\n& verdien terug",
    description:
      "Staat er iets stof te verzamelen? Zet het op Leenmaat en help een ander en verdien er misschien wat mee.",
    bg: "#fff1f2",
    accent: "#e11d48",
    bubbleColor: "#fecdd3",
    decorEmojis: ["🎯", "💡", "🛹", "🧰"],
  },
  {
    id: "4",
    emoji: "🤝",
    title: "Samen delen,\nsamen besparen",
    description:
      "Minder kopen, meer doen. Leenmaat helpt je community sterker te maken één leen tegelijk.",
    bg: "#f0fdf4",
    accent: "#16a34a",
    bubbleColor: "#bbf7d0",
    decorEmojis: ["🌱", "♻️", "❤️", "✨"],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const current = SLIDES[currentIndex];
  const isLast = currentIndex === SLIDES.length - 1;

  const handleNext = () => {
    if (isLast) {
      router.replace("/(tabs)");
    } else {
      const nextIndex = currentIndex + 1;
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }
  };

  const handleSkip = () => router.replace("/(tabs)");

  return (
    <View style={{ flex: 1, backgroundColor: current.bg }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        {/* Skip button */}
        <View style={{ height: 40, flexDirection: "row", justifyContent: "flex-end", paddingHorizontal: 20, paddingTop: 4 }}>
          {!isLast && (
            <TouchableOpacity onPress={handleSkip} style={{ padding: 8 }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#9ca3af" }}>
                Overslaan
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Slides */}
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
          style={{ flex: 1 }}
        >
          {SLIDES.map((slide) => (
            <View
              key={slide.id}
              style={{
                width,
                flex: 1,
                backgroundColor: slide.bg,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 32,
              }}
            >
              {/* Illustration */}
              <View style={{ width: 256, height: 256, alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
                <View style={{
                  position: "absolute",
                  width: 224,
                  height: 224,
                  borderRadius: 112,
                  backgroundColor: slide.bubbleColor,
                  opacity: 0.5,
                }} />
                {[
                  { top: 8, left: 16 },
                  { top: 8, right: 16 },
                  { bottom: 8, left: 16 },
                  { bottom: 8, right: 16 },
                ].map((pos, i) => (
                  <View key={i} style={{
                    position: "absolute",
                    width: 48,
                    height: 48,
                    backgroundColor: "white",
                    borderRadius: 16,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.06,
                    shadowRadius: 4,
                    elevation: 2,
                    ...pos,
                  }}>
                    <Text style={{ fontSize: 24 }}>{slide.decorEmojis[i]}</Text>
                  </View>
                ))}
                <View style={{
                  width: 96,
                  height: 96,
                  backgroundColor: "white",
                  borderRadius: 24,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}>
                  <Text style={{ fontSize: 52 }}>{slide.emoji}</Text>
                </View>
              </View>

              <Text style={{ fontSize: 30, fontWeight: "bold", color: "#1f2937", textAlign: "center", lineHeight: 38 }}>
                {slide.title}
              </Text>
              <Text style={{ fontSize: 16, color: "#6b7280", textAlign: "center", marginTop: 16, lineHeight: 24 }}>
                {slide.description}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Bottom */}
        <View style={{ paddingHorizontal: 32, paddingBottom: 24 }}>
          {/* Dots */}
          <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 32, gap: 8 }}>
            {SLIDES.map((_, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  scrollRef.current?.scrollTo({ x: i * width, animated: true });
                  setCurrentIndex(i);
                }}
              >
                <View style={{
                  height: 8,
                  borderRadius: 4,
                  width: i === currentIndex ? 24 : 8,
                  backgroundColor: i === currentIndex ? current.accent : "#d1d5db",
                }} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Button */}
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.85}
            style={{
              backgroundColor: current.accent,
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              {isLast ? "Aan de slag!" : "Volgende"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
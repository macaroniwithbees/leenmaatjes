import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const stickerShadow = {
  shadowColor: "#2D2A26",
  shadowOffset: { width: 3, height: 3 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 4,
};

const SLIDES = [
  {
    id: "1",
    emoji: "🏘️",
    title: "Leen van vrienden\n& buren",
    description: "Heb je iets nodig? Kijk eerst bij de mensen om je heen. Van een boormachine tot een tent — je buren hebben het vast.",
    bubble: "bg-mustard",
    decor: ["🔧", "🎸", "🚲", "📷"],
  },
  {
    id: "2",
    emoji: "📍",
    title: "Vind items in\njouw buurt",
    description: "Zoek op wat je nodig hebt en zie meteen wie in de buurt het heeft. Alles dichtbij, alles makkelijk.",
    bubble: "bg-sage",
    decor: ["🗺️", "📦", "🏠", "⛺"],
  },
  {
    id: "3",
    emoji: "💸",
    title: "Leen uit\n& verdien terug",
    description: "Staat er iets stof te verzamelen? Zet het op Leenmaat en help een ander — en verdien er misschien wat mee.",
    bubble: "bg-terracotta",
    decor: ["🎯", "💡", "🛹", "🧰"],
  },
  {
    id: "4",
    emoji: "🤝",
    title: "Samen delen,\nsamen besparen",
    description: "Minder kopen, meer doen. Leenmaat helpt je community sterker te maken — één leen tegelijk.",
    bubble: "bg-lavender",
    decor: ["🌱", "♻️", "❤️", "✨"],
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
      const next = currentIndex + 1;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setCurrentIndex(next);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top", "bottom"]}>
      {/* Skip */}
      <View className="h-10 flex-row justify-end px-5 pt-1">
        {!isLast && (
          <TouchableOpacity onPress={() => router.replace("/(tabs)")} className="py-2 px-3">
            <Text className="font-body-bold text-sm text-ink-soft">Overslaan</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width))}
        className="flex-1"
      >
        {SLIDES.map((slide) => (
          <View key={slide.id} style={{ width }} className="flex-1 items-center justify-center px-8">
            {/* Illustration */}
            <View className="relative w-60 h-60 items-center justify-center mb-8">
              <View className={`absolute w-52 h-52 rounded-3xl ${slide.bubble} border-2 border-ink opacity-30`} />
              {[
                { pos: "top-2 left-2", emoji: slide.decor[0] },
                { pos: "top-2 right-2", emoji: slide.decor[1] },
                { pos: "bottom-2 left-2", emoji: slide.decor[2] },
                { pos: "bottom-2 right-2", emoji: slide.decor[3] },
              ].map((d, i) => (
                <View
                  key={i}
                  style={stickerShadow}
                  className={`absolute ${d.pos} w-12 h-12 bg-white rounded-2xl border-2 border-ink items-center justify-center`}
                >
                  <Text className="text-2xl">{d.emoji}</Text>
                </View>
              ))}
              <View style={stickerShadow} className="w-24 h-24 bg-white rounded-3xl border-2 border-ink items-center justify-center">
                <Text style={{ fontSize: 48 }}>{slide.emoji}</Text>
              </View>
            </View>

            <Text className="font-heading-bold text-3xl text-ink text-center leading-tight">
              {slide.title}
            </Text>
            <Text className="font-body text-[15px] text-ink-soft text-center mt-4 leading-6">
              {slide.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom */}
      <View className="px-8 pb-6">
        <View className="flex-row justify-center mb-8 gap-2">
          {SLIDES.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                scrollRef.current?.scrollTo({ x: i * width, animated: true });
                setCurrentIndex(i);
              }}
            >
              <View
                className={`h-2.5 rounded-full border-2 border-ink ${i === currentIndex ? "w-7 bg-terracotta" : "w-2.5 bg-white"}`}
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.85}
          style={stickerShadow}
          className="w-full py-4 rounded-2xl items-center bg-terracotta border-2 border-ink"
        >
          <Text className="font-heading-bold text-base text-white">
            {isLast ? "Aan de slag" : "Volgende"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
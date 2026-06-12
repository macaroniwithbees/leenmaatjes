import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, MapPin, Check } from "lucide-react-native";

const { width } = Dimensions.get("window");
const ACCENT = "#f97316";

const EMOJI_OPTIONS = [
  "🎸", "🚲", "⛺", "📷", "🔧", "🏓", "🎮", "📚",
  "🛹", "🏕️", "🎨", "🪜", "🧰", "⚽", "🎲", "🪁",
];

const CATEGORIES = [
  { id: "gereedschap", label: "Gereedschap", emoji: "🔧" },
  { id: "sport", label: "Sport & Spel", emoji: "⚽" },
  { id: "muziek", label: "Muziek", emoji: "🎸" },
  { id: "outdoor", label: "Outdoor", emoji: "⛺" },
  { id: "elektronica", label: "Elektronica", emoji: "📷" },
  { id: "overig", label: "Overig", emoji: "📦" },
];

const MONTH_DAYS = 30;

function FormSection({
  title,
  required,
  children,
}: {
  title: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-6">
      <Text className="text-sm font-bold text-gray-800 mb-2">
        {title}
        {required && <Text className="text-orange-400"> *</Text>}
      </Text>
      {children}
    </View>
  );
}

export default function LeenUitScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null
  );
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const isValid =
    name.trim().length > 0 &&
    description.trim().length > 0 &&
    selectedEmoji !== null &&
    selectedCategory !== null;

  const handleSubmit = () => {
    if (!isValid) return;
    // todo: send to backend later
    console.log({
      name,
      description,
      location,
      emoji: selectedEmoji,
      category: selectedCategory,
      availableDays: selectedDays,
    });
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-orange-50" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 bg-white rounded-xl items-center justify-center shadow-sm"
        >
          <ArrowLeft size={20} color="#374151" strokeWidth={2} />
        </TouchableOpacity>
        <Text className="ml-3 text-lg font-bold text-gray-800">
          Item uitlenen
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        <View className="px-5 pt-2">
          {/* Simple intro */}
          <Text className="text-sm text-gray-500 mb-6 leading-5">
            Vul de gegevens in van het item dat je wilt uitlenen. Hoe meer
            info, hoe sneller iemand het vindt!
          </Text>

          {/* Emoji picker */}
          <FormSection title="Kies een icoon" required>
            <View className="bg-white rounded-2xl p-4 shadow-sm">
              {/* Preview */}
              <View className="items-center mb-4">
                <View className="w-20 h-20 bg-orange-50 rounded-2xl items-center justify-center">
                  <Text style={{ fontSize: 40 }}>
                    {selectedEmoji ?? "❓"}
                  </Text>
                </View>
              </View>
              <View className="flex-row flex-wrap justify-between">
                {EMOJI_OPTIONS.map((emoji) => {
                  const isSelected = selectedEmoji === emoji;
                  return (
                    <TouchableOpacity
                      key={emoji}
                      onPress={() => setSelectedEmoji(emoji)}
                      activeOpacity={0.7}
                      className="w-12 h-12 rounded-xl items-center justify-center mb-2"
                      style={{
                        backgroundColor: isSelected ? "#fed7aa" : "#f9fafb",
                        borderWidth: isSelected ? 2 : 0,
                        borderColor: ACCENT,
                      }}
                    >
                      <Text style={{ fontSize: 22 }}>{emoji}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </FormSection>

          {/* Name */}
          <FormSection title="Naam van het item" required>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Bijv. Boormachine"
              placeholderTextColor="#9ca3af"
              className="bg-white rounded-2xl px-4 py-3.5 text-sm text-gray-800 shadow-sm"
            />
          </FormSection>

          {/* Description */}
          <FormSection title="Beschrijving" required>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Vertel iets over het item, de staat, en eventuele afspraken..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="bg-white rounded-2xl px-4 py-3.5 text-sm text-gray-800 shadow-sm"
              style={{ minHeight: 100 }}
            />
          </FormSection>

          {/* Category */}
          <FormSection title="Categorie" required>
            <View className="flex-row flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setSelectedCategory(cat.id)}
                    activeOpacity={0.8}
                    className="flex-row items-center px-3.5 py-2.5 rounded-xl"
                    style={{
                      backgroundColor: isSelected ? ACCENT : "white",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{cat.emoji}</Text>
                    <Text
                      className="ml-2 text-sm font-semibold"
                      style={{
                        color: isSelected ? "white" : "#374151",
                      }}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </FormSection>

          {/* Location */}
          <FormSection title="Locatie">
            <View className="bg-white rounded-2xl px-4 py-3.5 shadow-sm flex-row items-center">
              <MapPin size={18} color="#9ca3af" strokeWidth={2} />
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Bijv. Ede, Gelderland"
                placeholderTextColor="#9ca3af"
                className="ml-2 flex-1 text-sm text-gray-800"
              />
            </View>
          </FormSection>

          {/* Availability */}
          <FormSection title="Beschikbaarheid">
            <View className="bg-white rounded-2xl p-4 shadow-sm">
              <Text className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                Selecteer beschikbare dagen
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {Array.from({ length: MONTH_DAYS }, (_, i) => i + 1).map(
                  (day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <TouchableOpacity
                        key={day}
                        onPress={() => toggleDay(day)}
                        className="w-9 h-9 rounded-xl items-center justify-center"
                        style={{
                          backgroundColor: isSelected ? ACCENT : "#f9fafb",
                        }}
                      >
                        <Text
                          className="text-xs font-semibold"
                          style={{
                            color: isSelected ? "white" : "#9ca3af",
                          }}
                        >
                          {day}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                )}
              </View>
              <Text className="text-xs text-gray-400 mt-3">
                {selectedDays.length === 0
                  ? "Nog geen dagen geselecteerd"
                  : `${selectedDays.length} dag${
                      selectedDays.length === 1 ? "" : "en"
                    } geselecteerd`}
              </Text>
            </View>
          </FormSection>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-orange-50 px-5 pt-3 pb-8 border-t border-orange-100">
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!isValid}
          activeOpacity={0.85}
          className="w-full flex-row items-center justify-center rounded-2xl py-4 gap-2"
          style={{
            backgroundColor: isValid ? ACCENT : "#fdba74",
          }}
        >
          <Check size={18} color="white" strokeWidth={2.5} />
          <Text className="text-white font-bold text-base">
            Item plaatsen
          </Text>
        </TouchableOpacity>
        {!isValid && (
          <Text className="text-xs text-gray-400 text-center mt-2">
            Vul alle verplichte velden in (*)
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
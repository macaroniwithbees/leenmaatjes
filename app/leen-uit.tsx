import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, MapPin, Check } from "lucide-react-native";

const stickerShadow = {
  shadowColor: "#2D2A26",
  shadowOffset: { width: 3, height: 3 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 4,
};

const EMOJI_OPTIONS = ["🎸", "🚲", "⛺", "📷", "🔧", "🏓", "🎮", "📚", "🛹", "🏕️", "🎨", "🪜", "🧰", "⚽", "🎲", "🪁"];

const CATEGORIES = [
  { id: "gereedschap", label: "Gereedschap", emoji: "🔧" },
  { id: "sport", label: "Sport & Spel", emoji: "⚽" },
  { id: "muziek", label: "Muziek", emoji: "🎸" },
  { id: "outdoor", label: "Outdoor", emoji: "⛺" },
  { id: "elektronica", label: "Elektronica", emoji: "📷" },
  { id: "overig", label: "Overig", emoji: "📦" },
];

const MONTH_DAYS = 30;

function FormSection({ title, required, children }: { title: string; required?: boolean; children: React.ReactNode }) {
  return (
    <View className="mb-6">
      <Text className="font-heading text-sm text-ink mb-2">
        {title}
        {required && <Text className="text-terracotta"> *</Text>}
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const toggleDay = (day: number) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  const isValid = name.trim().length > 0 && description.trim().length > 0 && selectedEmoji !== null && selectedCategory !== null;

  const handleSubmit = () => {
    if (!isValid) return;
    console.log({ name, description, location, emoji: selectedEmoji, category: selectedCategory, availableDays: selectedDays });
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()} style={stickerShadow} className="w-9 h-9 bg-white rounded-xl border-2 border-ink items-center justify-center">
          <ArrowLeft size={20} color="#2D2A26" strokeWidth={2.2} />
        </TouchableOpacity>
        <Text className="ml-3 font-heading-bold text-lg text-ink">Item uitlenen</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
        <View className="px-5 pt-2">
          <Text className="font-body text-sm text-ink-soft mb-6 leading-5">
            Vul de gegevens in van het item dat je wilt uitlenen. Hoe meer info, hoe sneller iemand het vindt!
          </Text>

          {/* Emoji picker */}
          <FormSection title="Kies een icoon" required>
            <View style={stickerShadow} className="bg-white rounded-2xl p-4 border-2 border-ink">
              <View className="items-center mb-4">
                <View className="w-20 h-20 bg-cream rounded-2xl items-center justify-center border-2 border-ink">
                  <Text style={{ fontSize: 40 }}>{selectedEmoji ?? "❓"}</Text>
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
                      className={`w-12 h-12 rounded-xl items-center justify-center mb-2 border-2 ${isSelected ? "bg-mustard border-ink" : "bg-cream border-cream"}`}
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
              placeholderTextColor="#6B6560"
              style={stickerShadow}
              className="bg-white rounded-2xl px-4 py-3.5 font-body text-sm text-ink border-2 border-ink"
            />
          </FormSection>

          {/* Description */}
          <FormSection title="Beschrijving" required>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Vertel iets over het item, de staat, en eventuele afspraken..."
              placeholderTextColor="#6B6560"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={[{ minHeight: 100 }, stickerShadow]}
              className="bg-white rounded-2xl px-4 py-3.5 font-body text-sm text-ink border-2 border-ink"
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
                    style={stickerShadow}
                    className={`flex-row items-center px-3.5 py-2.5 rounded-xl border-2 border-ink ${isSelected ? "bg-terracotta" : "bg-white"}`}
                  >
                    <Text style={{ fontSize: 16 }}>{cat.emoji}</Text>
                    <Text className={`ml-2 font-body-bold text-sm ${isSelected ? "text-white" : "text-ink"}`}>{cat.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </FormSection>

          {/* Location */}
          <FormSection title="Locatie">
            <View style={stickerShadow} className="bg-white rounded-2xl px-4 py-3.5 border-2 border-ink flex-row items-center">
              <MapPin size={18} color="#6B6560" strokeWidth={2} />
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Bijv. Ede, Gelderland"
                placeholderTextColor="#6B6560"
                className="ml-2 flex-1 font-body text-sm text-ink"
              />
            </View>
          </FormSection>

          {/* Availability */}
          <FormSection title="Beschikbaarheid">
            <View style={stickerShadow} className="bg-white rounded-2xl p-4 border-2 border-ink">
              <Text className="font-body-bold text-xs text-ink-soft mb-3 uppercase tracking-wide">Selecteer beschikbare dagen</Text>
              <View className="flex-row flex-wrap gap-2">
                {Array.from({ length: MONTH_DAYS }, (_, i) => i + 1).map((day) => {
                  const isSelected = selectedDays.includes(day);
                  return (
                    <TouchableOpacity
                      key={day}
                      onPress={() => toggleDay(day)}
                      className={`w-9 h-9 rounded-xl items-center justify-center border-2 ${isSelected ? "bg-terracotta border-ink" : "bg-cream border-cream"}`}
                    >
                      <Text className={`font-body-bold text-xs ${isSelected ? "text-white" : "text-ink-soft"}`}>{day}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text className="font-body text-xs text-ink-soft mt-3">
                {selectedDays.length === 0 ? "Nog geen dagen geselecteerd" : `${selectedDays.length} dag${selectedDays.length === 1 ? "" : "en"} geselecteerd`}
              </Text>
            </View>
          </FormSection>
        </View>
      </ScrollView>

      {/* Sticky submit */}
      <View className="absolute bottom-0 left-0 right-0 bg-cream px-5 pt-3 pb-8 border-t-2 border-ink">
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!isValid}
          activeOpacity={0.85}
          style={stickerShadow}
          className={`w-full flex-row items-center justify-center rounded-2xl py-4 gap-2 border-2 border-ink ${isValid ? "bg-terracotta" : "bg-white"}`}
        >
          <Check size={18} color={isValid ? "white" : "#6B6560"} strokeWidth={2.5} />
          <Text className={`font-heading-bold text-base ${isValid ? "text-white" : "text-ink-soft"}`}>Item plaatsen</Text>
        </TouchableOpacity>
        {!isValid && <Text className="font-body text-xs text-ink-soft text-center mt-2">Vul alle verplichte velden in (*)</Text>}
      </View>
    </SafeAreaView>
  );
}
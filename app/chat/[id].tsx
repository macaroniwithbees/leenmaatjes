import React, { useState, useRef } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Send } from "lucide-react-native";

const stickerShadow = {
  shadowColor: "#2D2A26",
  shadowOffset: { width: 3, height: 3 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 4,
};

const CHAT_DATA: Record<string, any> = {
  lisa: {
    name: "Lisa",
    initial: "L",
    avatarBg: "bg-mustard",
    item: "Gitaar",
    messages: [
      { id: "1", from: "them", text: "Hoi! Ik zag dat je de gitaar hebt geplaatst 😊", time: "10:30" },
      { id: "2", from: "me", text: "Hey Lisa! Ja klopt, hij staat er al een tijdje bij haha", time: "10:31" },
      { id: "3", from: "them", text: "Haha te gek. Is hij nog in goede staat?", time: "10:33" },
      { id: "4", from: "me", text: "Zeker! Klein krasje onderkant maar snaren zijn vers. Speelt prima ", time: "10:35" },
      { id: "5", from: "them", text: "Gaaf! Kan ik hem zaterdag ophalen?", time: "10:42" },
    ],
  },
  tom: {
    name: "Tom",
    initial: "T",
    avatarBg: "bg-sage",
    item: "Fiets",
    messages: [
      { id: "1", from: "them", text: "Hey, mag ik je fiets lenen voor het weekend?", time: "Ma 14:10" },
      { id: "2", from: "me", text: "Tuurlijk! Wanneer heb je hem nodig?", time: "Ma 14:15" },
      { id: "3", from: "them", text: "Vrijdag ophalen, zondag terug. Goed?", time: "Ma 14:16" },
      { id: "4", from: "me", text: "Perfect. Sleutel ligt onder de mat ", time: "Ma 14:20" },
      { id: "5", from: "them", text: "Top, ik breng hem morgen terug!", time: "Gisteren 18:05" },
    ],
  },
  mees: {
    name: "Mees",
    initial: "M",
    avatarBg: "bg-lavender",
    item: "Tent",
    messages: [
      { id: "1", from: "me", text: "Hey Mees! Kan ik je tent lenen volgende week?", time: "Ma 9:00" },
      { id: "2", from: "them", text: "Hoi! Ja hoor, voor hoelang?", time: "Ma 9:05" },
      { id: "3", from: "me", text: "3 nachten, camping in de Veluwe", time: "Ma 9:06" },
      { id: "4", from: "them", text: "Klinkt top! Hij past makkelijk 4 personen", time: "Ma 9:10" },
      { id: "5", from: "them", text: "Heb je ook haringen erbij?", time: "Ma 9:11" },
    ],
  },
  nora: {
    name: "Nora",
    initial: "N",
    avatarBg: "bg-terracotta",
    item: "Camera",
    messages: [
      { id: "1", from: "me", text: "Nora, mag ik je camera lenen voor een shoot?", time: "Za 11:00" },
      { id: "2", from: "them", text: "Natuurlijk! Welke dag?", time: "Za 11:05" },
      { id: "3", from: "me", text: "Volgende donderdag. Ik zorg goed voor hem!", time: "Za 11:06" },
      { id: "4", from: "them", text: "Vertrouw ik je op 😄 Batterij laad ik even op", time: "Za 11:20" },
      { id: "5", from: "me", text: "Super bedankt!!", time: "Za 11:21" },
      { id: "6", from: "them", text: "Bedankt voor het lenen!", time: "Za 17:00" },
    ],
  },
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const chat = CHAT_DATA[id ?? "lisa"] ?? CHAT_DATA["lisa"];
  const scrollRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState(chat.messages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const newMsg = {
      id: String(messages.length + 1),
      from: "me",
      text,
      time: "Nu",
    };
    setMessages((prev: any[]) => [...prev, newMsg]);
    setInput("");
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b-2 border-ink bg-cream">
        <TouchableOpacity
          onPress={() => router.back()}
          style={stickerShadow}
          className="w-9 h-9 bg-white rounded-xl border-2 border-ink items-center justify-center"
        >
          <ArrowLeft size={20} color="#2D2A26" strokeWidth={2.2} />
        </TouchableOpacity>
        <View className={`ml-3 w-9 h-9 rounded-full ${chat.avatarBg} border-2 border-ink items-center justify-center`}>
          <Text className="font-heading-bold text-sm text-ink">{chat.initial}</Text>
        </View>
        <View className="ml-2.5 flex-1">
          <Text className="font-heading text-[15px] text-ink">{chat.name}</Text>
          <Text className="font-body text-[11px] text-ink-soft">re: {chat.item}</Text>
        </View>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          {messages.map((msg: any) => {
            const isMe = msg.from === "me";
            return (
              <View key={msg.id} className={`flex-row ${isMe ? "justify-end" : "justify-start"}`}>
                <View style={isMe ? stickerShadow : stickerShadow}>
                  <View
                    className={`rounded-2xl px-4 py-2.5 border-2 border-ink max-w-[75%]
                      ${isMe ? "bg-terracotta rounded-tr-sm" : "bg-white rounded-tl-sm"}`}
                  >
                    <Text className={`font-body text-sm ${isMe ? "text-white" : "text-ink"}`}>
                      {msg.text}
                    </Text>
                    <Text className={`font-body text-[10px] mt-1 ${isMe ? "text-white/70" : "text-ink-soft"} text-right`}>
                      {msg.time}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Input bar */}
        <View className="px-4 py-3 border-t-2 border-ink bg-cream flex-row items-end gap-3">
          <View style={stickerShadow} className="flex-1 bg-white rounded-2xl border-2 border-ink px-4 py-3 min-h-[46px] justify-center">
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Stuur een bericht..."
              placeholderTextColor="#6B6560"
              multiline
              className="font-body text-sm text-ink"
              onSubmitEditing={sendMessage}
            />
          </View>
          <TouchableOpacity
            onPress={sendMessage}
            activeOpacity={0.85}
            style={stickerShadow}
            className={`w-11 h-11 rounded-2xl border-2 border-ink items-center justify-center ${input.trim() ? "bg-terracotta" : "bg-white"}`}
          >
            <Send size={18} color={input.trim() ? "white" : "#6B6560"} strokeWidth={2.2} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
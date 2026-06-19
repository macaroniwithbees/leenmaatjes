import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ArrowLeft, User, Mail, Lock, Bell, BellOff, MapPin,
  Eye, Globe, Moon, Info, FileText, Heart, ChevronRight, LogOut,
} from "lucide-react-native";

const stickerShadow = {
  shadowColor: "#2D2A26",
  shadowOffset: { width: 3, height: 3 },
  shadowOpacity: 1,
  shadowRadius: 0,
  elevation: 4,
};

function SectionHeader({ label }: { label: string }) {
  return (
    <Text className="font-body-bold text-xs text-ink-soft uppercase tracking-widest mb-2 mt-6 px-1">
      {label}
    </Text>
  );
}

function SettingsRow({
  icon: Icon,
  label,
  sublabel,
  onPress,
  iconBg = "bg-cream",
  danger = false,
  rightElement,
}: {
  icon: any;
  label: string;
  sublabel?: string;
  onPress?: () => void;
  iconBg?: string;
  danger?: boolean;
  rightElement?: React.ReactNode;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.8 : 1}
      className="flex-row items-center px-4 py-3.5 border-b-2 border-cream last:border-b-0"
    >
      <View className={`w-9 h-9 rounded-xl ${iconBg} border-2 border-ink items-center justify-center`}>
        <Icon size={16} color={danger ? "#E2725B" : "#2D2A26"} strokeWidth={2.2} />
      </View>
      <View className="ml-3 flex-1">
        <Text className={`font-body-medium text-sm ${danger ? "text-terracotta" : "text-ink"}`}>{label}</Text>
        {sublabel && <Text className="font-body text-xs text-ink-soft mt-0.5">{sublabel}</Text>}
      </View>
      {rightElement ?? (onPress && <ChevronRight size={16} color="#6B6560" strokeWidth={2.2} />)}
    </TouchableOpacity>
  );
}

function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <View style={stickerShadow} className="bg-white rounded-2xl border-2 border-ink overflow-hidden">
      {children}
    </View>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  sublabel,
  iconBg,
  value,
  onChange,
}: {
  icon: any;
  label: string;
  sublabel?: string;
  iconBg?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <SettingsRow
      icon={Icon}
      label={label}
      sublabel={sublabel}
      iconBg={iconBg}
      rightElement={
        <Switch
          value={value}
          onValueChange={onChange}
          trackColor={{ false: "#E5E0D8", true: "#E2725B" }}
          thumbColor="#FBF6EE"
          ios_backgroundColor="#E5E0D8"
        />
      }
    />
  );
}

export default function InstellingenScreen() {
  const router = useRouter();

  // Notification toggles
  const [loanRequests, setLoanRequests] = useState(true);
  const [messages, setMessages] = useState(true);
  const [reminders, setReminders] = useState(false);
  const [newItems, setNewItems] = useState(true);

  // Privacy toggles
  const [locationVisible, setLocationVisible] = useState(true);
  const [profilePublic, setProfilePublic] = useState(true);

  // Display toggles
  const [darkMode, setDarkMode] = useState(false);
  const [dutchLanguage, setDutchLanguage] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          style={stickerShadow}
          className="w-9 h-9 bg-white rounded-xl border-2 border-ink items-center justify-center"
        >
          <ArrowLeft size={20} color="#2D2A26" strokeWidth={2.2} />
        </TouchableOpacity>
        <Text className="ml-3 font-heading-bold text-lg text-ink">
          Instellingen<Text className="text-terracotta">.</Text>
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 48 }}>

        {/* Account */}
        <SectionHeader label="Account" />
        <SettingsCard>
          <SettingsRow
            icon={User}
            label="Naam"
            sublabel="Floris"
            iconBg="bg-mustard"
            onPress={() => {}}
          />
          <SettingsRow
            icon={Mail}
            label="E-mailadres"
            sublabel="floris@example.com"
            iconBg="bg-sage"
            onPress={() => {}}
          />
          <SettingsRow
            icon={Lock}
            label="Wachtwoord"
            sublabel="Wijzig je wachtwoord"
            iconBg="bg-lavender"
            onPress={() => {}}
          />
        </SettingsCard>

        {/* Notifications */}
        <SectionHeader label="Notificaties" />
        <SettingsCard>
          <ToggleRow
            icon={Bell}
            label="Leenaanvragen"
            sublabel="Als iemand jouw item wil lenen"
            iconBg="bg-mustard"
            value={loanRequests}
            onChange={setLoanRequests}
          />
          <ToggleRow
            icon={Mail}
            label="Berichten"
            sublabel="Nieuwe chats en reacties"
            iconBg="bg-sage"
            value={messages}
            onChange={setMessages}
          />
          <ToggleRow
            icon={Bell}
            label="Herinneringen"
            sublabel="Terugbrengdatum reminders"
            iconBg="bg-lavender"
            value={reminders}
            onChange={setReminders}
          />
          <ToggleRow
            icon={BellOff}
            label="Nieuwe items in de buurt"
            sublabel="Items die worden toegevoegd"
            iconBg="bg-terracotta"
            value={newItems}
            onChange={setNewItems}
          />
        </SettingsCard>

        {/* Location & privacy */}
        <SectionHeader label="Locatie & privacy" />
        <SettingsCard>
          <ToggleRow
            icon={MapPin}
            label="Locatie zichtbaar"
            sublabel="Anderen kunnen jouw buurt zien"
            iconBg="bg-sage"
            value={locationVisible}
            onChange={setLocationVisible}
          />
          <ToggleRow
            icon={Eye}
            label="Openbaar profiel"
            sublabel="Zichtbaar voor andere gebruikers"
            iconBg="bg-mustard"
            value={profilePublic}
            onChange={setProfilePublic}
          />
          <SettingsRow
            icon={FileText}
            label="Privacybeleid"
            iconBg="bg-lavender"
            onPress={() => {}}
          />
        </SettingsCard>

        {/* Display */}
        <SectionHeader label="Taal & weergave" />
        <SettingsCard>
          <ToggleRow
            icon={Moon}
            label="Donkere modus"
            sublabel="Binnenkort beschikbaar"
            iconBg="bg-ink"
            value={darkMode}
            onChange={setDarkMode}
          />
          <ToggleRow
            icon={Globe}
            label="Nederlands"
            sublabel="Taal van de app"
            iconBg="bg-sage"
            value={dutchLanguage}
            onChange={setDutchLanguage}
          />
        </SettingsCard>

        {/* About */}
        <SectionHeader label="Over de app" />
        <SettingsCard>
          <SettingsRow
            icon={Info}
            label="Versie"
            sublabel="1.0.0 (beta)"
            iconBg="bg-cream"
          />
          <SettingsRow
            icon={Heart}
            label="Gemaakt met ❤️ door Naomi Ben-Harroum"
            sublabel="Leenmaat © 2026"
            iconBg="bg-terracotta"
          />
          <SettingsRow
            icon={FileText}
            label="Algemene voorwaarden"
            iconBg="bg-lavender"
            onPress={() => {}}
          />
        </SettingsCard>

        {/* Log out */}
        <SectionHeader label="" />
        <SettingsCard>
          <SettingsRow
            icon={LogOut}
            label="Uitloggen"
            iconBg="bg-cream"
            danger
            onPress={() => router.replace("/onboarding")}
          />
        </SettingsCard>

      </ScrollView>
    </SafeAreaView>
  );
}
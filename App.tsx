import "./global.css";
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Home from "./screens/Home";

export default function App() {
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      <Home />
    </View>
  );
}



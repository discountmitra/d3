import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: true,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 70 + insets.bottom,
          paddingBottom: insets.bottom + 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#111827",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarPressColor: "rgba(255, 255, 255, 0.1)",
        tabBarPressOpacity: 0.1,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ 
          title: "Home", 
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={size} 
              color={color} 
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={[props.style, { backgroundColor: 'transparent' }]}
              activeOpacity={0.7}
            />
          )
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{ 
          title: "Categories", 
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "grid" : "grid-outline"} 
              size={size} 
              color={color} 
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={[props.style, { backgroundColor: 'transparent' }]}
              activeOpacity={0.7}
            />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{ 
          title: "Profile", 
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={size} 
              color={color} 
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={[props.style, { backgroundColor: 'transparent' }]}
              activeOpacity={0.7}
            />
          )
        }}
      />
    </Tabs>
  );
}

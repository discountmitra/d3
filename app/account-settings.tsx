import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, FontSizes, Spacing } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function AccountSettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const settingsItems = [
    {
      id: 1,
      icon: "time-outline",
      iconColor: "#3b82f6",
      title: "Order History",
      description: "View all your transactions",
    },
    {
      id: 2,
      icon: "people-outline",
      iconColor: "#10b981",
      title: "Referrals",
      description: "Invite friends & earn amazing rewards",
    },
    {
      id: 3,
      icon: "notifications-outline",
      iconColor: "#8b5cf6",
      title: "Notifications",
      description: "Manage your notifications",
    },
    {
      id: 4,
      icon: "language-outline",
      iconColor: "#3b82f6",
      title: "Language",
      description: "Change app language",
    },
    {
      id: 5,
      icon: "star-outline",
      iconColor: "#f59e0b",
      title: "VIP membership",
      description: "Upgrade to premium features",
    },
    {
      id: 6,
      icon: "help-circle-outline",
      iconColor: "#f59e0b",
      title: "Help Center",
      description: "Get help and find answers",
    },
    {
      id: 7,
      icon: "settings-outline",
      iconColor: "#6b7280",
      title: "Settings",
      description: "App preferences and privacy",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Settings Items */}
      <View style={styles.settingsContainer}>
        {settingsItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: `${item.iconColor}15` }]}>
                <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingDescription}>{item.description}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}
      </View>

      {/* App Information */}
      <View style={styles.appInfoContainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.appVersion}>Discount Mithra v2.1.0</Text>
        <View style={styles.legalLinks}>
          <TouchableOpacity>
            <Text style={styles.legalLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>•</Text>
          <TouchableOpacity>
            <Text style={styles.legalLink}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => router.push("/(auth)/login")}>
        <Ionicons name="log-out-outline" size={20} color="#dc2626" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary,
  },
  placeholder: {
    width: 40,
  },
  settingsContainer: {
    backgroundColor: "#fff",
    marginTop: Spacing.sm,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FontSizes.subtitle,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: Colors.secondary,
  },
  appInfoContainer: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
    backgroundColor: "#fff",
    marginTop: Spacing.sm,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: Spacing.md,
  },
  appVersion: {
    fontSize: FontSizes.subtitle,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  legalLinks: {
    flexDirection: "row",
    alignItems: "center",
  },
  legalLink: {
    fontSize: FontSizes.subtitle,
    color: Colors.primary,
    fontWeight: "500",
  },
  separator: {
    fontSize: FontSizes.subtitle,
    color: Colors.secondary,
    marginHorizontal: Spacing.sm,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xl,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: "#dc2626",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  logoutText: {
    fontSize: FontSizes.subtitle,
    fontWeight: "600",
    color: "#dc2626",
    marginLeft: Spacing.sm,
  },
});

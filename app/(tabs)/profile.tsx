import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, FontSizes, Spacing } from "../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // Hide default header
  }, [navigation]);

  const handleLogout = () => {
    router.push("/(auth)/login");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Section - User Name and Profile Picture */}
      <View style={[styles.topSection, { paddingTop: insets.top + 20 }]}>
        <Text style={styles.userName}>Joshua Smith</Text>
        <TouchableOpacity style={styles.profilePicture}>
          <Ionicons name="person" size={40} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#555" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search settings..."
            style={styles.searchInput}
            placeholderTextColor="#777"
          />
        </View>
      </View>

      {/* User Info Section */}
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfoRow}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoLabel}>Email</Text>
            <Text style={styles.userInfoValue}>joshua.smith@email.com</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoLabel}>Phone</Text>
            <Text style={styles.userInfoValue}>+1 (555) 123-4567</Text>
          </View>
        </View>
        <View style={styles.userInfoRow}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoLabel}>Location</Text>
            <Text style={styles.userInfoValue}>New York, NY</Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Ionicons name="create-outline" size={16} color="#3b82f6" />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* Feature Cards */}
      <View style={styles.cardsContainer}>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardIcon}>
            <Ionicons name="heart" size={24} color="#10b981" />
          </View>
          <Text style={styles.cardText}>Favourites</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.cardIcon}>
            <Ionicons name="wallet" size={24} color="#f59e0b" />
          </View>
          <Text style={styles.cardText}>Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.cardIcon}>
            <Ionicons name="bag" size={24} color="#3b82f6" />
          </View>
          <Text style={styles.cardText}>Orders</Text>
        </TouchableOpacity>
      </View>

      {/* Account Settings Options */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIconContainer, { backgroundColor: "#3b82f615" }]}>
              <Ionicons name="time-outline" size={20} color="#3b82f6" />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Order History</Text>
              <Text style={styles.settingDescription}>View all your transactions</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIconContainer, { backgroundColor: "#10b98115" }]}>
              <Ionicons name="people-outline" size={20} color="#10b981" />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Referrals</Text>
              <Text style={styles.settingDescription}>Invite friends & earn amazing rewards</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIconContainer, { backgroundColor: "#8b5cf615" }]}>
              <Ionicons name="notifications-outline" size={20} color="#8b5cf6" />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>Manage your notifications</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIconContainer, { backgroundColor: "#3b82f615" }]}>
              <Ionicons name="language-outline" size={20} color="#3b82f6" />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Language</Text>
              <Text style={styles.settingDescription}>Change app language</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIconContainer, { backgroundColor: "#f59e0b15" }]}>
              <Ionicons name="star-outline" size={20} color="#f59e0b" />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>VIP membership</Text>
              <Text style={styles.settingDescription}>Upgrade to premium features</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIconContainer, { backgroundColor: "#f59e0b15" }]}>
              <Ionicons name="help-circle-outline" size={20} color="#f59e0b" />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Help Center</Text>
              <Text style={styles.settingDescription}>Get help and find answers</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIconContainer, { backgroundColor: "#6b728015" }]}>
              <Ionicons name="settings-outline" size={20} color="#6b7280" />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>Settings</Text>
              <Text style={styles.settingDescription}>App preferences and privacy</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* App Information */}
      <View style={styles.appInfoContainer}>
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/logo.png")} style={styles.logo} />
        </View>
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
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#dc2626" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: "#fff",
  },
  userName: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  userInfoContainer: {
    backgroundColor: "#fff",
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: 16,
    padding: Spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  userInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  userInfoItem: {
    flex: 1,
    marginRight: Spacing.md,
  },
  userInfoLabel: {
    fontSize: 13,
    color: Colors.secondary,
    marginBottom: 4,
    fontWeight: "500",
  },
  userInfoValue: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primary,
  },
  editProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eff6ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3b82f6",
  },
  editProfileText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3b82f6",
    marginLeft: 6,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: 8,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: Spacing.md,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  cardText: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.primary,
    textAlign: "center",
  },
  settingsContainer: {
    backgroundColor: "#fff",
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: Colors.secondary,
  },
  appInfoContainer: {
    alignItems: "center",
    paddingVertical: Spacing.xl,
    backgroundColor: "#fff",
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  logoContainer: {
    backgroundColor: "#f8fafc",
    borderRadius: 20,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  appVersion: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  legalLinks: {
    flexDirection: "row",
    alignItems: "center",
  },
  legalLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "500",
  },
  separator: {
    fontSize: 14,
    color: Colors.secondary,
    marginHorizontal: Spacing.sm,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderWidth: 1,
    borderColor: "#dc2626",
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#dc2626",
    marginLeft: Spacing.sm,
  },
});

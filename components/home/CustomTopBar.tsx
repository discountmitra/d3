import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Spacing } from "../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomTopBar() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      {/* Top Row: Location + Icons */}
      <View style={styles.row}>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={20} color="#000" />
          <Text style={styles.locationText}>1226 University Dr</Text>
          <Ionicons name="chevron-down" size={18} color="#000" />
        </View>

        <View style={styles.iconRow}>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }}>
            <Ionicons name="cart-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={18} color="#555" style={{ marginRight: 8 }} />
        <TextInput
          placeholder='Search "Ice Cream"'
          style={styles.input}
          placeholderTextColor="#777"
        />
        <TouchableOpacity style={styles.mapIcon}>
          <Ionicons name="map-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 4,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#000",
  },
  mapIcon: {
    marginLeft: 8,
    backgroundColor: "#eee",
    padding: 6,
    borderRadius: 20,
  },
});

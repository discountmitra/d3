import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import CategoryCard from "./CategoryCard";
import { Spacing, FontSizes, Colors } from "../../theme";

const categories = [
  { id: "1", title: "Food", subtitle: "Restaurants & Takeaway", icon: "fast-food", color: "#FF6B6B" },
  { id: "2", title: "Healthcare", subtitle: "Hospitals & Clinics", icon: "medkit", color: "#4ECDC4" },
  { id: "3", title: "Travel", subtitle: "Hotels & Booking", icon: "airplane", color: "#45B7D1" },
  { id: "4", title: "Home Services", subtitle: "Repair & Maintenance", icon: "build", color: "#FFA502" },
  { id: "5", title: "Automobiles", subtitle: "Car & Bike Services", icon: "car-sport", color: "#3742FA" },
  { id: "6", title: "Beauty & Salon", subtitle: "Hair & Beauty Care", icon: "color-palette", color: "#B53471" },
];

export default function CategoriesPreview() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📂 Categories</Text>

      <FlatList
        data={categories.slice(0, 4)} // show only 4 on home
        renderItem={({ item }) => (
          <CategoryCard
            icon={item.icon as any}
            title={item.title}
            color={item.color}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/categories")}
      >
        <Text style={styles.buttonText}>View More</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  heading: {
    fontSize: FontSizes.subtitle,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: Spacing.sm,
  },
  button: {
    marginTop: Spacing.md,
    alignSelf: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: FontSizes.button,
  },
});

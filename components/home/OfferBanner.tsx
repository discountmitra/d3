import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors, FontSizes, Spacing } from "../../theme";

export default function OfferBanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Special Weekend Offers</Text>
      <Text style={styles.subtitle}>Up to 10% cashback on all services</Text>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>View All</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F97316", // Orange
    borderRadius: 12,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  title: { fontSize: FontSizes.subtitle, fontWeight: "700", color: "white" },
  subtitle: { color: "white", marginBottom: Spacing.sm },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 8,
  },
  buttonText: { color: "#F97316", fontWeight: "600" },
});

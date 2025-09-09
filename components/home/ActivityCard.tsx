import { View, Text, StyleSheet } from "react-native";
import { Colors, FontSizes, Spacing } from "../../theme";

type Props = {
  title: string;
  subtitle: string;
  amount: string;
  color: "green" | "blue";
};

export default function ActivityCard({ title, subtitle, amount, color }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Text style={[styles.amount, { color }]}>{amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: FontSizes.input, fontWeight: "600", color: Colors.primary },
  subtitle: { fontSize: FontSizes.subtitle, color: Colors.secondary },
  amount: { fontSize: FontSizes.input, fontWeight: "700" },
});


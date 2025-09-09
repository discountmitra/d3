import { View, Text, Image, StyleSheet, Dimensions, ImageSourcePropType } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Colors, FontSizes, Spacing } from "../../theme";

const { width } = Dimensions.get("window");

type Deal = {
  id: number;
  title: string;
  subtitle: string;
  offer: string;
  image: ImageSourcePropType;
};

const deals: Deal[] = [
  {
    id: 1,
    title: "Masala Dosa from ₹89",
    subtitle: "Crispy South Indian crepe with spiced filling",
    offer: "Limited time offer!",
    image: require("../../assets/deal.png"),
  },
  {
    id: 2,
    title: "Pizza Combo from ₹199",
    subtitle: "Family meal with coke & garlic bread",
    offer: "Weekend special!",
    image: require("../../assets/deal.png"),
  },
  {
    id: 3,
    title: "Burger Blast from ₹149",
    subtitle: "Cheesy double-layered burger + fries",
    offer: "Flat 20% off",
    image: require("../../assets/deal.png"),
  },
];

export default function DealCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🔥 Hot Deals</Text>
      <Carousel
        loop
        width={width - Spacing.lg}
        height={140}
        autoPlay
        autoPlayInterval={3000}
        data={deals}
        scrollAnimationDuration={800}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.offer}>{item.offer}</Text>
            </View>
            <Image source={item.image} style={styles.image} />
          </View>
        )}
      />
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
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF7ED",
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  title: {
    fontSize: FontSizes.subtitle,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSizes.input,
    color: Colors.secondary,
    marginBottom: Spacing.xs,
  },
  offer: {
    color: "green",
    fontWeight: "600",
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
});

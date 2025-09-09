import { ScrollView, StyleSheet } from "react-native";
import Header from "@/components/home/Header";
import OfferBanner from "../../components/home/OfferBanner";
import DealCard from "../../components/home/DealCard";
import CategoryPreview from "../../components/home/CategoryPreview";
import { Spacing, Colors } from "../../theme";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import CustomTopBar from "@/components/home/CustomTopBar";

export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // Hide default header
  }, [navigation]);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Greeting + Search */}
      <CustomTopBar />

      {/* Offer Banner */}
      <OfferBanner />

      {/* Hot Deal (static for now) */}
      <DealCard />

      {/* Categories Preview (only 4 shown here) */}
      <CategoryPreview />

      {/* Recent Activity */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

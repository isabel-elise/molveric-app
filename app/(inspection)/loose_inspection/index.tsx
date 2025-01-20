import MiniCardComponent from "@/components/MiniCardComponent";
import { ProgressBar } from "@/components/ProgressBar";
import { useContext } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { InspectionContext } from "../../_layout";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

const cards = [
  "CN-1",
  "CN-2",
  "D-1",
  "D-2",
  "D-3",
  "S-1",
  "S-2",
  "PA-1",
  "PE-1",
  "AU-1",
  "PS-1",
  "PS-2",
  "PS-3",
  "PS-4",
  "FTR-1",
  "FTR-2",
  "FTR-3",
  "FTR-4",
  "FTR-5",
];

export default function Index() {
  const inspectionContext = useContext(InspectionContext);
  return (
    <View style={styles.container}>
      <View style={styles.cardListContainer}>
        <FlatList
          data={cards}
          renderItem={(card) => <MiniCardComponent card={card.item} />}
          keyExtractor={(card) => card}
          numColumns={2}
          contentContainerStyle={styles.cardList}
          columnWrapperStyle={{ justifyContent: "space-around" }}
        />
      </View>
      <CustomButton
        title="Visualizar relatório"
        size="long"
        shade="medium"
        onClick={() => {
          router.navigate("/inspection_report");
        }}
      />
      <ProgressBar
        progress={inspectionContext.inspectedCards.length * (100 / 19)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    margin: 18,
    gap: 12,
  },
  cardListContainer: {
    flex: 1,
    width: "100%",
  },
  cardList: {
    gap: 16,
  },
});

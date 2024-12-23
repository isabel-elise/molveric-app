import MiniCardComponent from "@/components/MiniCardComponent";
import { ProgressBar } from "@/components/ProgressBar";
import { useContext } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { LooseInspectionDefectsContext } from "./_layout";

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
  const looseInspectionDefectsContext = useContext(
    LooseInspectionDefectsContext
  );
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
      <ProgressBar
        progress={looseInspectionDefectsContext.inspected * (100 / 19)}
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
    gap: 52,
  },
  cardListContainer: {
    height: "80%",
    width: "100%",
  },
  cardList: {
    gap: 16,
  },
});

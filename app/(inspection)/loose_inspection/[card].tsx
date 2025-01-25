import CardComponent from "@/components/CardComponent";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { InspectionContext } from "../../_layout";
import { getCardDefects } from "@/methods";

import { ProgressBar } from "@/components/ProgressBar";
import { LooseInspectionDefectsContext } from "./_layout";
import CustomButton from "@/components/CustomButton";

export default function CardInspection() {
  const { card }: { card: string } = useLocalSearchParams();
  const looseInspectionDefectsContext = useContext(
    LooseInspectionDefectsContext
  );
  const inspectionContext = useContext(InspectionContext);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Inspeção carta " + card,
        }}
      />
      <CardComponent
        card={card}
        defects={getCardDefects(looseInspectionDefectsContext.list, card)}
        handleDefectMarking={looseInspectionDefectsContext.update}
      />
      <CustomButton
        title="Marcar carta como inspecionada"
        size="long"
        shade="medium"
        onClick={() => {
          inspectionContext.updateDefectsListBatch(
            getCardDefects(looseInspectionDefectsContext.list, card)
          );
          if (inspectionContext.inspectedCards.indexOf(card) == -1) {
            inspectionContext.updateInspectedCards(card);
          }
          router.navigate("/loose_inspection");
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
    justifyContent: "space-around",
    alignItems: "center",
    margin: 18,
    gap: 12,
  },
  button: {
    width: "100%",
    backgroundColor: "#E8E8E8",
  },
});

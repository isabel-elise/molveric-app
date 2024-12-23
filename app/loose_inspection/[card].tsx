import CardComponent from "@/components/CardComponent";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { DefectsContext } from "../_layout";
import { getCardDefects, getCardElement } from "@/methods";

import elements from "@/data/elements.json";
import { ProgressBar } from "@/components/ProgressBar";
import { LooseInspectionDefectsContext } from "./_layout";

export default function CardInspection() {
  const { card }: { card: string } = useLocalSearchParams();
  const looseInspectionDefectsContext = useContext(
    LooseInspectionDefectsContext
  );
  const defectsContext = useContext(DefectsContext);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: card,
          headerStyle: {
            backgroundColor: getCardElement(elements, card).color,
          },
        }}
      />
      <CardComponent
        card={card}
        defects={getCardDefects(looseInspectionDefectsContext.list, card)}
        handleDefectMarking={looseInspectionDefectsContext.update}
      />
      <Button
        title="Marcar carta como inspecionada"
        color="#858585"
        onPress={() => {
          defectsContext.updateBatch(
            getCardDefects(looseInspectionDefectsContext.list, card)
          );
          looseInspectionDefectsContext.updateInspected();
          router.navigate("/loose_inspection");
        }}
      />
      <ProgressBar
        progress={looseInspectionDefectsContext.inspected * (100 / 19)}
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
    gap: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#E8E8E8",
  },
});

import CardComponent from "@/components/CardComponent";
import { Stack, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DefectsContext } from "../_layout";
import { getCardDefects, getCardElement } from "@/methods";

import elements from "@/data/elements.json";

export default function CardInspection() {
  const { card }: { card: string } = useLocalSearchParams();
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
        defects={getCardDefects(defectsContext.list, card)}
        handleDefectMarking={defectsContext.update}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

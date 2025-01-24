import CardComponent from "@/components/CardComponent";
import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { InspectionContext } from "../../_layout";
import { getCardDefects } from "@/methods";
import { ProgressBar } from "@/components/ProgressBar";
import { router, useLocalSearchParams } from "expo-router";

const recomendedOrder = [
  "CN-1",
  "CN-2",
  "FTR-1",
  "FTR-2",
  "FTR-3",
  "FTR-4",
  "PS-1",
  "PS-2",
  "PS-3",
  "PS-4",
  "AU-1",
  "PA-1",
  "PE-1",
  "D-1",
  "D-2",
  "D-3",
  "S-1",
  "S-2",
];

export default function Index() {
  const inspectionContext = useContext(InspectionContext);

  return (
    <View style={styles.container}>
      <CardComponent
        card={recomendedOrder[inspectionContext.inspectionIndex]}
        defects={getCardDefects(
          inspectionContext.defectsList,
          recomendedOrder[inspectionContext.inspectionIndex]
        )}
        handleDefectMarking={inspectionContext.updateDefectsList}
      />

      <Pressable
        style={styles.rightArrow}
        onPress={() =>
          inspectionContext.inspectionIndex !== recomendedOrder.length - 1
            ? inspectionContext.updateInspectionIndex(1)
            : router.navigate("/inspection_report")
        }
      >
        <Image source={require("@/assets/images/Arrow.png")} />
      </Pressable>

      {inspectionContext.inspectionIndex > 0 ? (
        <Pressable
          style={styles.leftArrow}
          onPress={() => inspectionContext.updateInspectionIndex(-1)}
        >
          <Image source={require("@/assets/images/Arrow.png")} />
        </Pressable>
      ) : null}
      <ProgressBar
        progress={
          (inspectionContext.inspectionIndex * 100) / recomendedOrder.length
        }
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
  rightArrow: {
    position: "absolute",
    top: "45%",
    left: "95%",
  },
  leftArrow: {
    position: "absolute",
    top: "45%",
    left: "-4%",
    transform: "scaleX(-1)",
  },
});

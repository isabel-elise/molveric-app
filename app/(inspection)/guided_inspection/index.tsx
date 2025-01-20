import CardComponent from "@/components/CardComponent";
import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { InspectionContext } from "../../_layout";
import { getCardDefects } from "@/methods";
import { ProgressBar } from "@/components/ProgressBar";
import { router } from "expo-router";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const defectsContext = useContext(InspectionContext);

  return (
    <View style={styles.container}>
      <CardComponent
        card={recomendedOrder[currentIndex]}
        defects={getCardDefects(
          defectsContext.defectsList,
          recomendedOrder[currentIndex]
        )}
        handleDefectMarking={defectsContext.updateDefectsList}
      />

      <Pressable
        style={styles.rightArrow}
        onPress={() =>
          currentIndex !== recomendedOrder.length - 1
            ? setCurrentIndex(currentIndex + 1)
            : router.navigate("/inspection_report")
        }
      >
        <Image source={require("@/assets/images/Arrow.png")} />
      </Pressable>

      {currentIndex > 0 ? (
        <Pressable
          style={styles.leftArrow}
          onPress={() =>
            currentIndex !== recomendedOrder.length - 1
              ? setCurrentIndex(currentIndex - 1)
              : null
          }
        >
          <Image source={require("@/assets/images/Arrow.png")} />
        </Pressable>
      ) : null}
      <ProgressBar progress={(currentIndex * 100) / recomendedOrder.length} />
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

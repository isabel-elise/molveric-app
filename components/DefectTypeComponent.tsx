import { getDefectTypeIcon } from "@/data/cardData";
import { Defect } from "@/types";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function DefectTypeComponent({
  type,
  defects,
}: {
  type: string;
  defects: Defect[];
}) {
  const [defectsList, setDefectsList] = useState(defects);

  useEffect(() => {
    setDefectsList(defects);
  }, [defects]);

  return (
    <View
      style={{
        width: 75,
        height: 85,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 70,
          height: 70,
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={[
            styles.centerContent,
            styles.bigCircle,
            defectsList.some((defect) => defect && defect.marked)
              ? {
                  backgroundColor: "grey",
                }
              : { backgroundColor: "lightgrey" },
          ]}
        >
          <Image
            style={{ width: "80%", height: "80%" }}
            source={getDefectTypeIcon(type)}
            resizeMode="contain"
          />
        </View>

        {defectsList.length == 1 && (
          <View
            style={[
              styles.centerContent,
              styles.smallCircle,
              {
                left: "5%",
                top: "60%",
                backgroundColor: "#BFBFBF",
              },
            ]}
          >
            <Text style={styles.smallCircleText}>
              {defectsList[0].id.split("_")[1]}
            </Text>
          </View>
        )}

        {defectsList.length == 2 && (
          <>
            <View
              style={[
                styles.centerContent,
                styles.smallCircle,
                {
                  left: "0%",
                  top: "50%",
                  backgroundColor: "#BFBFBF",
                },
              ]}
            >
              <Text style={styles.smallCircleText}>
                {defectsList[0].id.split("_")[1]}
              </Text>
            </View>
            <View
              style={[
                styles.centerContent,
                styles.smallCircle,
                {
                  left: "17%",
                  top: "70%",
                  backgroundColor: "#AEAEAE",
                },
              ]}
            >
              <Text style={styles.smallCircleText}>
                {defectsList[1].id.split("_")[1]}
              </Text>
            </View>
          </>
        )}
      </View>

      <Text
        style={[
          { fontSize: 11 },
          defectsList.some((defect) => defect && defect.marked) && {
            fontWeight: "bold",
          },
        ]}
      >
        {type}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  bigCircle: {
    width: 50,
    height: 50,
    borderRadius: "50%",
  },
  smallCircle: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    position: "absolute",
    left: "0%",
  },
  smallCircleText: {
    color: "white",
    fontWeight: "bold",
  },
});

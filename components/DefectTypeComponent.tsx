import { Defect } from "@/types";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

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
        width: 85,
        height: 85,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={[
          { fontSize: 12 },
          defectsList.some((defect) => defect && defect.marked) && {
            fontWeight: "bold",
          },
        ]}
      >
        {type}
      </Text>
      <Text>
        {defectsList.map((defect) => defect.id.substring(5)).join(" ")}
      </Text>
    </View>
  );
}

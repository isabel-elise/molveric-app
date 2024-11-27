import { Defect } from "@/types";
import { View, Text } from "react-native";

export default function DefectTypeComponent({
  type,
  defects,
}: {
  type: string;
  defects: Defect[];
}) {
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
          defects.some((defect) => defect.marked) && { fontWeight: "bold" },
        ]}
      >
        {type}
      </Text>
      <Text>{defects.map((defect) => defect.id.substring(5)).join(" ")}</Text>
    </View>
  );
}

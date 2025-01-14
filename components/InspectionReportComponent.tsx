import { Defect } from "@/types";
import { StyleSheet, View, Text, FlatList } from "react-native";
import InspectionReportDefectComponent from "./InspectionReportDefectComponent";
import { useEffect, useState } from "react";

interface InspectionReportComponentProps {
  defects: Defect[];
}

export default function InpectionReportComponent({
  defects,
}: InspectionReportComponentProps) {
  const [markedDefects, setMarkedDefects] = useState<Defect[]>(defects);

  useEffect(() => {
    setMarkedDefects(defects.filter((defect) => defect.marked));
  }, [defects]);

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>Relatório</Text>
      </View>
      <FlatList
        data={markedDefects}
        renderItem={({ item }: { item: Defect }) => (
          <InspectionReportDefectComponent key={item.id} defect={item} />
        )}
        style={{ maxHeight: 400 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 5,
    borderRadius: 8,
    marginTop: 24,
  },
  cardHeader: {
    height: 60,
    color: "white",
    backgroundColor: "#717171",
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeaderText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    padding: 12,
  },
});

import { Defect } from "@/types";
import { StyleSheet, View, Text, FlatList } from "react-native";
import InspectionReportDefectComponent from "./InspectionReportDefectComponent";
import { useEffect, useState } from "react";
import elements from "@/data/elements.json";
import { getCardElement } from "@/methods";

interface secionListProps {
  title: string;
  defects: Defect[];
}

const defectTypes = [
  "Omissão",
  "Inconsistência",
  "Extrapolação",
  "Fato Incorreto",
  "Ambiguidade",
];

const cardElementTypes = elements.map((element) => element.name);

function assembleReportByCardElementType(
  markedDefects: Defect[]
): secionListProps[] {
  return cardElementTypes.map((cardElement) => ({
    title: cardElement,
    defects: markedDefects.filter(
      (defect) =>
        getCardElement(elements, defect.id.split("_")[0]).name === cardElement
    ),
  }));
}

interface InspectionReportComponentProps {
  defects: Defect[];
}

export default function InpectionReportComponent({
  defects,
}: InspectionReportComponentProps) {
  const [markedDefects, setMarkedDefects] = useState<Defect[]>(defects);
  const [reportMode, setReportMode] = useState<string>("byCardElement");
  const [reportList, setReportList] = useState<secionListProps[]>([]);

  useEffect(() => {
    setMarkedDefects(defects.filter((defect) => defect.marked));

    if (reportMode === "byCardElement") {
      setReportList(assembleReportByCardElementType(markedDefects));
    }
  }, [defects, reportMode]);

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>Relatório</Text>
      </View>
      <View style={styles.reportArea}>
        <FlatList
          data={reportList}
          renderItem={({ item }: { item: secionListProps }) => (
            <View style={styles.reportSection}>
              <Text style={styles.reportSectionHeader}>{item.title}</Text>
              <View>
                {item.defects.map((defect) => (
                  <InspectionReportDefectComponent defect={defect} />
                ))}
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
          style={{ maxHeight: 500 }}
        />
      </View>
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
  reportArea: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#D1D1D1",
  },
  reportSection: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#FFF",
  },
  reportSectionHeader: {
    fontSize: 20,
    marginVertical: 6,
  },
});

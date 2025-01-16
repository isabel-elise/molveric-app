import { Defect } from "@/types";
import { StyleSheet, View, Text, FlatList } from "react-native";
import InspectionReportDefectComponent from "./InspectionReportDefectComponent";
import { useEffect, useState } from "react";
import elements from "@/data/elements.json";
import { getCardElement } from "@/methods";
import { getCardData } from "@/data/cardData";

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

const BY_CARD_ELEMENT = "byCardElement";
const BY_DEFECT_TYPE = "byDefectType";

const cardElements = elements.map((element) => element.name);

function assembleReportByCardElement(
  markedDefects: Defect[]
): secionListProps[] {
  return cardElements.map((cardElement) => ({
    title: cardElement,
    defects: markedDefects.filter(
      (defect) =>
        getCardElement(elements, defect.id.split("_")[0]).name === cardElement
    ),
  }));
}

function assembleReportByDefectType(
  markedDefects: Defect[]
): secionListProps[] {
  return defectTypes.map((defectType) => ({
    title: defectType,
    defects: markedDefects.filter((defect) => defect.type === defectType),
  }));
}

function computeTotalScore(markedDefects: Defect[]) {
  return markedDefects.reduce((totalScore, currentDefect) => {
    let currentScore = getCardData(currentDefect.id.split("_")[0]).points;
    return totalScore + currentScore;
  }, 0);
}

function dislayReportModeDescription(reportMode: string) {
  if (reportMode === BY_CARD_ELEMENT) {
    return "Defeitos marcados por Carta";
  }
  if (reportMode === BY_DEFECT_TYPE) {
    return "Defeitos marcados por Tipo";
  }
  throw "Tipo de relatório inválido!";
}

interface InspectionReportComponentProps {
  defects: Defect[];
}

export default function InpectionReportComponent({
  defects,
}: InspectionReportComponentProps) {
  const [markedDefects, setMarkedDefects] = useState<Defect[]>(defects);
  const [reportMode, setReportMode] = useState<string>(BY_DEFECT_TYPE);
  const [reportList, setReportList] = useState<secionListProps[]>([]);

  const totalScore = computeTotalScore(markedDefects);

  useEffect(() => {
    setMarkedDefects(defects.filter((defect) => defect.marked));

    if (reportMode === BY_CARD_ELEMENT) {
      setReportList(assembleReportByCardElement(markedDefects));
    }
    if (reportMode == BY_DEFECT_TYPE) {
      setReportList(assembleReportByDefectType(markedDefects));
    }
  }, [defects, reportMode]);

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderTitleText}>Relatório</Text>
        <Text style={styles.cardHeaderSubstitleText}>
          {dislayReportModeDescription(reportMode)}
        </Text>
      </View>
      <View style={styles.reportArea}>
        <View style={[styles.reportSection, styles.scoreSection]}>
          <Text style={styles.reportSectionHeader}>Pontuação</Text>
          <View style={styles.scoreIcon}>
            <Text style={styles.scoreIconText}>{totalScore}</Text>
          </View>
        </View>
        <FlatList
          data={reportList}
          renderItem={({ item }: { item: secionListProps }) => (
            <View style={styles.reportSection}>
              <Text style={styles.reportSectionHeader}>{item.title}</Text>
              <View>
                {item.defects.map((defect) => (
                  <InspectionReportDefectComponent
                    key={defect.id}
                    defect={defect}
                  />
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
    borderWidth: 5,
    borderRadius: 8,
    marginTop: 24,
  },
  cardHeader: {
    color: "white",
    padding: 12,
    backgroundColor: "#717171",
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeaderTitleText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  cardHeaderSubstitleText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  reportArea: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#D1D1D1",
  },
  reportSection: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  scoreSection: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  scoreIcon: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: "50%",
    backgroundColor: "#858585",
  },
  scoreIconText: {
    fontSize: 16,
    color: "#FFF",
  },
  reportSectionHeader: {
    fontSize: 20,
    marginVertical: 6,
  },
});

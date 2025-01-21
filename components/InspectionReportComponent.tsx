import { Defect } from "@/types";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import InspectionReportDefectComponent from "./InspectionReportDefectComponent";
import { useContext, useEffect, useState } from "react";
import elements from "@/data/elements.json";
import { getCardElement } from "@/methods";
import { getCardData } from "@/data/cardData";
import { InspectionContext } from "@/app/_layout";

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
    return "Carta";
  }
  if (reportMode === BY_DEFECT_TYPE) {
    return "Tipo";
  }
  throw "Tipo de relatório inválido!";
}

export default function InpectionReportComponent() {
  const inspectionContext = useContext(InspectionContext);
  const markedDefects = inspectionContext.defectsList.filter(
    (defect) => defect.marked
  );
  const [reportMode, setReportMode] = useState<string>(BY_CARD_ELEMENT);
  const [reportList, setReportList] = useState<secionListProps[]>([]);

  const totalScore = computeTotalScore(markedDefects);

  useEffect(() => {
    if (reportMode === BY_CARD_ELEMENT) {
      setReportList(assembleReportByCardElement(markedDefects));
    }
    if (reportMode == BY_DEFECT_TYPE) {
      setReportList(assembleReportByDefectType(markedDefects));
    }
  }, [inspectionContext, reportMode]);

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderTitleText}>
          Defeitos Marcados por {dislayReportModeDescription(reportMode)}
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
        />
      </View>
      <Pressable
        style={styles.cardFooter}
        onPress={() =>
          reportMode === BY_CARD_ELEMENT
            ? setReportMode(BY_DEFECT_TYPE)
            : setReportMode(BY_CARD_ELEMENT)
        }
      >
        <Text style={styles.cardFooterText}>
          Visualizar relatório por{" "}
          {reportMode === BY_CARD_ELEMENT ? "Tipo de Defeito" : "Carta"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#DFDFDF",
    overflow: "hidden",
  },
  cardHeader: {
    color: "white",
    padding: 14,
    backgroundColor: "#717171",
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeaderTitleText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  cardHeaderSubstitleText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  reportArea: {
    flex: 1,
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
  cardFooter: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#717171",
    borderRadius: 8,
    paddingHorizontal: 21,
    paddingVertical: 11,
    margin: 10,
  },
  cardFooterText: {
    fontSize: 16,
    color: "#FFF",
  },
});

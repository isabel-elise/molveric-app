import { Defect } from "@/types";
import { StyleSheet, View, Text, Pressable, Modal } from "react-native";

import elements from "@/data/elements.json";
import { getCardElement } from "@/methods";
import { useState } from "react";

interface InspectionReportDefectComponentProps {
  defect: Defect;
}

export default function InspectionReportDefectComponent({
  defect,
}: InspectionReportDefectComponentProps) {
  const card = defect.id.split("_")[0];
  const element = getCardElement(elements, card);
  const [defectLocationModalVisible, setDefectLocationModalVisible] =
    useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={defectLocationModalVisible}
        onRequestClose={() => {
          setDefectLocationModalVisible(!defectLocationModalVisible);
        }}
      >
        <Pressable
          style={styles.centeredView}
          onPress={() =>
            setDefectLocationModalVisible(!defectLocationModalVisible)
          }
        >
          <View style={styles.modalView}>
            <Text>{defect.location}</Text>
          </View>
        </Pressable>
      </Modal>
      <View style={styles.descriptionSection}>
        <View
          style={[
            styles.descriptionDecoration,
            { backgroundColor: element.color },
          ]}
        ></View>
        <Text style={styles.descriptionText}>{defect.description}</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoText}>{defect.type}</Text>
        <Text style={[styles.infoText, { color: element.color }]}>{card}</Text>
        <Pressable
          style={styles.infoButton}
          onPress={() => {
            setDefectLocationModalVisible(true);
          }}
        >
          <Text style={styles.infoButtonText}>...</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 8,
    paddingRight: 12,
    paddingVertical: 12,
    gap: 7,
  },
  descriptionSection: {
    flex: 1,
    flexDirection: "row",
    gap: 7,
  },
  descriptionDecoration: {
    width: 3,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: "justify",
  },
  infoSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 7,
  },
  infoText: {
    color: "#858585",
    fontWeight: "bold",
  },
  infoButton: {
    width: 34,
    height: 20,
    borderRadius: 4,
    backgroundColor: "#DEDEDE",
  },
  infoButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 18,
    backgroundColor: "#F4F4F4",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#999",
    padding: 24,
    alignItems: "center",
    elevation: 5,
  },
});

import { Defect } from "@/types";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  Platform,
  Dimensions,
} from "react-native";

import elements from "@/data/elements.json";
import { getCardElement } from "@/methods";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";

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
        <View style={{ flexDirection: "row", gap: 7 }}>
          <Text style={styles.infoText}>{defect.type}</Text>
          <Text style={[styles.infoText, { color: element.color }]}>
            {card}
          </Text>
        </View>
        <Pressable
          style={[
            styles.infoButton,
            Platform.OS !== "web" ? { aspectRatio: "1 / 1" } : {},
          ]}
          onPress={() => {
            setDefectLocationModalVisible(true);
          }}
        >
          {Platform.OS === "web" ? (
            <Text style={[styles.infoText, { color: "#858585" }]}>
              Localização
            </Text>
          ) : (
            <Entypo name="location" size={18} color="#858585" />
          )}
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
    marginTop: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 7,
  },
  infoText: {
    color: "#858585",
    fontWeight: "bold",
  },
  infoButton: {
    flexDirection: "row",
    padding: 6,
    borderRadius: 4,
    backgroundColor: "#EFEFEF",
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
    width:
      Platform.OS === "web" ? Dimensions.get("window").height / 2.4 : "100%",
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

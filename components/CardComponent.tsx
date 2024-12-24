import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";

import { Element, Defect } from "@/types";
import { getCardData } from "@/data/cardData";
import DefectTypeComponent from "./DefectTypeComponent";
import CardDefectComponent from "./CardDefectComponent";
import DefectMarkedModal from "./DefectMarkedModal";

import elements from "@/data/elements.json";
import { getCardElement } from "@/methods";
import React from "react";

interface Props {
  card: string;
  defects: Defect[];
  handleDefectMarking: Function;
}

function getDefectTypes(defects: Defect[]): {
  type: string;
  defects: Defect[];
}[] {
  let defectsTypeList: { type: string; defects: Defect[] }[] = [];

  defects.forEach((defect) => {
    let currentEntry = defectsTypeList.find(
      (entry) => entry.type == defect.type
    );

    if (!currentEntry) {
      defectsTypeList.push({ type: defect.type, defects: [defect] });
    } else {
      defectsTypeList = defectsTypeList.map((entry) => {
        if (entry.type == defect.type) {
          return { type: entry.type, defects: [...entry.defects, defect] };
        } else {
          return entry;
        }
      });
    }
  });

  return defectsTypeList;
}

export default function CardComponent({
  card,
  defects,
  handleDefectMarking,
}: Props) {
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [markedDefect, setMarkedDefect] = useState({});
  const [defectMarkedModalVisible, setDefectMarkedModalVisible] =
    useState(false);

  const element = getCardElement(elements, card);

  return (
    <View style={[styles.cardContainer, { borderColor: element.color }]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={infoModalVisible}
        onRequestClose={() => {
          setInfoModalVisible(!infoModalVisible);
        }}
      >
        <Pressable
          style={styles.centeredView}
          onPress={() => setInfoModalVisible(!infoModalVisible)}
        >
          <View style={styles.modalView}>
            <Text style={styles.cardBodyText}>{element.info}</Text>
          </View>
        </Pressable>
      </Modal>

      <DefectMarkedModal
        modalVisible={defectMarkedModalVisible}
        setModalVisible={setDefectMarkedModalVisible}
        markedDefect={markedDefect}
        buttonColor={element.color}
        handleDefectMarking={handleDefectMarking}
      />

      <View style={[styles.cardHeader, { backgroundColor: element.color }]}>
        <Text style={styles.cardHeaderText}>{element.name}</Text>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={[styles.descriptionText, styles.cardBodyText]}>
          {element.description}
        </Text>
      </View>

      <View style={styles.figureSection}>
        <Image
          source={getCardData(card).figure}
          style={{
            flex: 1,
            width: null,
            height: null,
            margin: getCardElement(elements, card).id === "PS" ? 0 : 25,
          }}
          resizeMode="contain"
        />
      </View>
      {element.info.length ? (
        <Pressable
          style={styles.infoIcon}
          onPress={() => {
            setInfoModalVisible(true);
          }}
        >
          <Text style={styles.infoIconText}>i</Text>
        </Pressable>
      ) : null}
      {defects && defects.length ? (
        <View style={styles.defectsSection}>
          <Text
            style={{ color: element.color, fontWeight: "bold", fontSize: 16 }}
          >
            Defeitos
          </Text>
          <FlatList
            data={defects}
            renderItem={({ item }: { item: Defect }) => (
              <CardDefectComponent
                key={item.id}
                defect={item}
                handleDefectMarking={(defect: Defect) => {
                  handleDefectMarking({ ...defect, location: "" });
                  defect.marked &&
                    (setDefectMarkedModalVisible(true),
                    setMarkedDefect(defect));
                }}
              />
            )}
            style={{ maxHeight: 200 }}
          />
        </View>
      ) : (
        <ActivityIndicator color={element.color} />
      )}
      <View style={styles.defectTypesSection}>
        <FlatList
          data={getDefectTypes(defects)}
          renderItem={(defectType) => (
            <DefectTypeComponent
              type={defectType.item.type}
              defects={defectType.item.defects}
            />
          )}
          horizontal
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
          }}
          style={{ maxWidth: 300, flexGrow: 0 }}
        />
        <View
          style={{
            width: 42,
            height: 42,
            backgroundColor: element.color,
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {getCardData(card).points}
          </Text>
        </View>
      </View>

      <View style={[styles.cardBottom, { backgroundColor: element.color }]}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          {card}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 5,
    borderRadius: 8,
    marginTop: 24,
  },
  cardHeader: {
    height: 60,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeaderText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    padding: 12,
  },
  descriptionSection: {
    marginTop: 12,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBodyText: {
    fontSize: 16,
  },
  descriptionText: {
    textAlign: "justify",
  },
  infoIcon: {
    position: "absolute",
    top: "20%",
    left: "90%",
    width: 28,
    height: 28,
    borderRadius: "50%",
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
  },
  infoIconText: {
    color: "white",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 20,
  },
  figureSection: {
    height: 200,
  },
  defectsSection: {
    paddingHorizontal: 13,
    paddingVertical: 3,
  },
  defectTypesSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    gap: 8,
  },
  cardBottom: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 18,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
    elevation: 5,
  },
});

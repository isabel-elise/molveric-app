import MiniCardComponent from "@/components/MiniCardComponent";
import { ProgressBar } from "@/components/ProgressBar";
import { useContext, useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
} from "react-native";
import { InspectionContext } from "../../_layout";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";

const cards = [
  "CN-1",
  "CN-2",
  "D-1",
  "D-2",
  "D-3",
  "S-1",
  "S-2",
  "PA-1",
  "PE-1",
  "AU-1",
  "PS-1",
  "PS-2",
  "PS-3",
  "PS-4",
  "FTR-1",
  "FTR-2",
  "FTR-3",
  "FTR-4",
  "FTR-5",
];

export default function Index() {
  const inspectionContext = useContext(InspectionContext);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Há cartas ainda não inspecionadas, mas será possível retornar à
              inspeção. Deseja visualizar o relatório?
            </Text>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 16,
              }}
            >
              <Button
                title="Retornar"
                color="#858585"
                onPress={() => {
                  setModalVisible(false);
                }}
              />

              <Button
                title="Visualizar relatório"
                color="#96C33F"
                onPress={() => {
                  router.navigate("/inspection_report");
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.cardListContainer}>
        <FlatList
          data={cards}
          renderItem={(card) => <MiniCardComponent card={card.item} />}
          keyExtractor={(card) => card}
          numColumns={2}
          contentContainerStyle={styles.cardList}
          columnWrapperStyle={{ justifyContent: "space-around" }}
        />
      </View>
      <CustomButton
        title="Visualizar relatório"
        size="long"
        shade="medium"
        onClick={() => {
          if (inspectionContext.inspectedCards.length < cards.length) {
            setModalVisible(true);
          } else {
            router.navigate("/inspection_report");
          }
        }}
      />
      <ProgressBar
        progress={inspectionContext.inspectedCards.length * (100 / 19)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    margin: 18,
    gap: 12,
  },
  cardListContainer: {
    flex: 1,
    width: "100%",
  },
  cardList: {
    gap: 16,
  },
  modalText: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width:
      Platform.OS === "web" && Dimensions.get("window").width > 500
        ? Dimensions.get("window").height / 2.1
        : "90%",
    transform:
      Platform.OS === "web" && Dimensions.get("window").width > 500
        ? [{ scale: 0.9 }]
        : [],
    margin: 32,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
    elevation: 5,
  },
});

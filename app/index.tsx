import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import {
  Button,
  ImageBackground,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useContext, useState } from "react";
import { InspectionContext } from "./_layout";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);

  const inspectionContext = useContext(InspectionContext);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
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
              Tem certeza de que deseja apagar os dados da inspeção em andamento
              e iniciar uma nova inspeção?
            </Text>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 16,
                paddingHorizontal: 16,
              }}
            >
              <Button
                title="Não"
                color="#858585"
                onPress={() => {
                  setModalVisible(false);
                }}
              />

              <Button
                title="Sim"
                color="#96C33F"
                onPress={() => {
                  inspectionContext.clearInspectionData();
                  inspectionContext.updateInspectionState("NOT_INITIATED");
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <ImageBackground
        source={require("@/assets/images/Fundo_menu.png")}
        resizeMode="cover"
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
        }}
      >
        <View style={{ height: 180 }} />

        <CustomButton
          title="Inspeção Guiada"
          size="regular"
          shade="dark"
          onClick={() => {
            inspectionContext.updateInspectionState("IN_PROGRESS");
            router.navigate("/guided_inspection");
          }}
          disabled={inspectionContext.inspectionState === "NONE"}
        />

        <CustomButton
          title="Inspeção Livre"
          size="regular"
          shade="medium"
          onClick={() => {
            inspectionContext.updateInspectionState("IN_PROGRESS");
            router.navigate("/loose_inspection");
          }}
          disabled={inspectionContext.inspectionState === "NONE"}
        />

        <CustomButton
          title="Nova Inspeção"
          size="regular"
          shade="light"
          onClick={() => {
            if (inspectionContext.inspectionState !== "NONE") {
              setModalVisible(true);
            }
            inspectionContext.updateInspectionState("NOT_INITIATED");
          }}
          disabled={inspectionContext.inspectionState === "NOT_INITIATED"}
        />

        <View style={{ height: 10 }} />

        <CustomButton
          title="Tipos de Defeitos"
          size="regular"
          shade="light"
          type="rounded"
          onClick={() => router.navigate("/defect_types_info")}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalText: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 32,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
    elevation: 5,
  },
});

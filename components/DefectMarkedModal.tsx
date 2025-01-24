import { Defect } from "@/types";
import { useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  TextInput,
  View,
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  modalVisible: boolean;
  setModalVisible: Function;
  markedDefect: Defect | {};
  handleDefectMarking: Function;
  buttonColor: string;
}

export default function DefectMarkedModal({
  modalVisible,
  setModalVisible,
  markedDefect,
  handleDefectMarking,
  buttonColor,
}: Props) {
  const [markedDefectLocation, setMarkedDefectLocation] = useState("");
  return (
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
          <Text style={styles.cardBodyText}>
            Indique a localização do defeito no diagrama e, se necessário, uma
            descrição de como ele ocorre:
          </Text>
          <TextInput
            style={{
              width: "100%",
              height: 100,
              padding: 12,
              marginVertical: 8,
              borderWidth: 4,
              borderColor: "lightgrey",
              borderRadius: 8,
            }}
            inputMode="text"
            multiline={true}
            textAlignVertical="top"
            placeholder="Digite aqui."
            value={markedDefectLocation}
            onChangeText={(text) => setMarkedDefectLocation(text)}
          />
          <Button
            title="Concluído"
            color={buttonColor}
            onPress={() => {
              handleDefectMarking({
                ...markedDefect,
                marked: true,
                location: markedDefectLocation,
              });
              setMarkedDefectLocation("");
              setModalVisible(false);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cardBodyText: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    margin: 18,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
    elevation: 5,
  },
});

import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  View,
} from "react-native";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
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
          title="Nova Inspeção"
          size="regular"
          shade="light"
          onClick={() => router.navigate("/loose_inspection")}
        />

        <CustomButton
          title="Inspeção Livre"
          size="regular"
          shade="medium"
          onClick={() => router.navigate("/loose_inspection")}
        />

        <CustomButton
          title="Inspeção Guiada"
          size="regular"
          shade="dark"
          onClick={() => router.navigate("/guided_inspection")}
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

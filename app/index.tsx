import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { Button, Image, ImageBackground, SafeAreaView } from "react-native";

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
      </ImageBackground>
    </SafeAreaView>
  );
}

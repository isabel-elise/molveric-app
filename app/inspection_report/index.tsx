import InspectionReportComponent from "@/components/InspectionReportComponent";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { InspectionContext } from "../_layout";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <InspectionReportComponent />
      <CustomButton
        title="Retornar à inspeção"
        size="long"
        shade="light"
        onClick={() => router.back()}
      />
      <CustomButton
        title="Exportar relatório"
        size="long"
        shade="medium"
        onClick={() => {}}
      />
      <CustomButton
        title="Retornar ao menu"
        size="long"
        shade="dark"
        onClick={() => router.navigate("/")}
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
});

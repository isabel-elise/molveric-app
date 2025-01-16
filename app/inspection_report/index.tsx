import InspectionReportComponent from "@/components/InspectionReportComponent";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { InspectionContext } from "../_layout";

export default function Index() {
  return (
    <View style={styles.container}>
      <InspectionReportComponent />
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
    gap: 52,
  },
});

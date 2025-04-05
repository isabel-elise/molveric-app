import { Stack } from "expo-router";

export default function ReportLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Relatório da inspeção",
        headerBackImageSource: require("@/assets/images/Arrow_back.png"),
      }}
    ></Stack>
  );
}

import { Stack } from "expo-router";

export default function ReportLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Relatório da inspeção",
      }}
    ></Stack>
  );
}

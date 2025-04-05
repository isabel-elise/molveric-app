import { Stack } from "expo-router";

export default function DefectTypeInfoLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Tipos de Defeitos",
        headerBackImageSource: require("@/assets/images/Arrow_back.png"),
      }}
    ></Stack>
  );
}

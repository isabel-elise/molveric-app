import { Stack } from "expo-router";

export default function GuidedInspectionLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Inspeção Guiada",
        headerBackImageSource: require("@/assets/images/Arrow_back.png"),
      }}
    ></Stack>
  );
}

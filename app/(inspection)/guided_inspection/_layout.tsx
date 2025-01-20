import { Stack } from "expo-router";

export default function GuidedInspectionLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Inspeção Guiada",
      }}
    >
      <Stack.Screen name="[card]" />
    </Stack>
  );
}

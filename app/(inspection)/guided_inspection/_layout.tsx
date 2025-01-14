import { Stack } from "expo-router";

export default function GuidedInspectionLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="[card]" />
    </Stack>
  );
}

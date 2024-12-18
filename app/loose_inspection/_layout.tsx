import { router, Stack } from "expo-router";

export default function LooseInspectionLayout() {
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

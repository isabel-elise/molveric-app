import { useState } from "react";
import { Pressable, View } from "react-native";

export default function CheckBox({ checked }: { checked: boolean }) {
  return (
    <Pressable
      style={{ width: 20, height: 20, borderWidth: 2, borderRadius: 4 }}
    >
      {checked && (
        <View style={{ flex: 1, margin: 4, backgroundColor: "grey" }}></View>
      )}
    </Pressable>
  );
}

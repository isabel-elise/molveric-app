import { Text, Pressable, StyleSheet } from "react-native";
import CheckBox from "./CheckBox";
import { Defect } from "@/types";

interface Props {
  defect: Defect;
  handleDefectMarking: Function;
}

export default function CardDefectComponent({
  defect,
  handleDefectMarking,
}: Props) {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        handleDefectMarking({
          ...defect,
          marked: !defect.marked,
        });
      }}
    >
      <CheckBox checked={defect.marked} />
      <Text style={styles.text}>{defect.description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 7,
  },
  text: {
    fontSize: 16,
    textAlign: "justify",
  },
});

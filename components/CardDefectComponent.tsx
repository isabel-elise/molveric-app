import {
  Text,
  Pressable,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import CheckBox from "./CheckBox";
import { Defect } from "@/types";

const windowWidth = Dimensions.get("window").width;

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
    flexDirection: "row",
    marginHorizontal: 10,
    paddingVertical: 8,
    gap: 7,
  },
  text: {
    flex: 1,
    fontSize: 16,
    textAlign: "justify",
  },
});

import { StyleSheet, View } from "react-native";

interface Props {
  progress: number;
}

export function ProgressBar({ progress }: Props) {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.filling, width: `${progress}%` }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#999",
    backgroundColor: "#FFF",
  },
  filling: {
    height: "100%",
    backgroundColor: "#8BD379",
    overflow: "hidden",
  },
});

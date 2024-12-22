import { Link } from "expo-router";
import { Button, SafeAreaView } from "react-native";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/loose_inspection/">
        <Button title="Inspeção Livre" />
      </Link>
    </SafeAreaView>
  );
}

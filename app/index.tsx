import { Link } from "expo-router";
import { Button, SafeAreaView } from "react-native";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Link href="/loose_inspection/">
        <Button title="Inspeção Livre" />
      </Link>
    </SafeAreaView>
  );
}

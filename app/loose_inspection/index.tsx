import { Link } from "expo-router";
import { Button, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Link
        href={{
          pathname: "/loose_inspection/[card]",
          params: { card: "CN-1" },
        }}
      >
        <Button title="CN-1" />
      </Link>
    </View>
  );
}

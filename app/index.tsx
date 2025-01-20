import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { Button, SafeAreaView } from "react-native";

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Link href="/loose_inspection/">
        <CustomButton
          title="Inspeção Livre"
          size="regular"
          shade="medium"
          onClick={() => router.navigate("/loose_inspection")}
        />
      </Link>
      <Link href="/guided_inspection">
        <CustomButton
          title="Inspeção Guiada"
          size="regular"
          shade="dark"
          onClick={() => router.navigate("/guided_inspection")}
        />
      </Link>
    </SafeAreaView>
  );
}

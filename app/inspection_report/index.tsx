import InspectionReportComponent from "@/components/InspectionReportComponent";
import { Platform, StyleSheet, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { shareAsync } from "expo-sharing";
import * as Print from "expo-print";

const html = `
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 16px;
                color: rgb(255, 196, 0);
            }            h1 {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Hello, Unica Exames!</h1>
    </body>
    </html>`;

function setPrint() {
  const closePrint = () => {
    document.body.removeChild(this);
  };
  this.contentWindow.onbeforeunload = closePrint;
  this.contentWindow.onafterprint = closePrint;
  setTimeout(() => {
    this.contentWindow.print();
  }, 5000);
}

async function printToFile() {
  // On iOS/android prints the given html. On web prints the HTML from the current page.
  try {
    if (Platform.OS === "web") {
      const hideFrame = document.createElement("iframe");
      hideFrame.onload = setPrint;
      hideFrame.style.display = "none"; // hide iframe
      hideFrame.src = "/html";
      document.body.appendChild(hideFrame);
    } else {
      const { uri } = await Print.printToFileAsync({ html });
      console.log("File has been saved to:", uri);
      await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    }
  } catch (e) {
    console.log("Erro: " + e);
  }
}

export default function Index() {
  return (
    <View style={styles.container}>
      <InspectionReportComponent />
      <CustomButton
        title="Retornar à inspeção"
        size="long"
        shade="light"
        onClick={() => router.back()}
      />
      <CustomButton
        title="Exportar relatório"
        size="long"
        shade="medium"
        onClick={() => {
          printToFile();
        }}
      />
      <CustomButton
        title="Retornar ao menu"
        size="long"
        shade="dark"
        onClick={() => router.navigate("/")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    margin: 18,
    gap: 12,
  },
});

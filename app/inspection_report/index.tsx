import InspectionReportComponent, {
  assembleReportByCardElement,
  assembleReportByDefectType,
  computeTotalScore,
  dislayReportModeDescription,
} from "@/components/InspectionReportComponent";
import { Platform, StyleSheet, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { shareAsync } from "expo-sharing";
import * as Print from "expo-print";
import { Defect } from "@/types";
import { getCardElement } from "@/methods";
import elements from "@/data/elements.json";
import { useContext, useState } from "react";
import { InspectionContext } from "../_layout";

const BY_CARD_ELEMENT = "byCardElement";

const print = (htmlContent: string) => {
  const pW = window.open("", "", "height=500, width=500");
  if (pW) {
    pW.document.write(htmlContent);
    pW.document.close();
    pW.print();
  }
};

export function generateReportHTML(defects: Defect[], reportMode: string) {
  const markedDefects = defects.filter((defect) => defect.marked);
  const html = `
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Relatório da Inspeção por ${
          reportMode === BY_CARD_ELEMENT ? "Elemento" : "Tipo de Defeito"
        }</title>
        <style>
          body
          {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          h1
          {
            width: 100%
            text-align: center;
            margin: 10px 8px 6px 0;
          }
          h2
          {
            margin: 8px 6px 4px 0;
          }
          h3
          {
            margin: 4px 2px 1px 0;
          }
          h4
          {
            margin-top: 2px;
          }
          section
          {
            display: flex;
            flex-direction: column;
            width: 98%;
            padding: 8px 0 8px 8px; 
            border: 1px solid;
            border-radius: 8px;
          }
        </style>
    </head>
    <body>
        <h1>Relatório da Inspeção</h1>
        <h4>Defeitos marcados por ${dislayReportModeDescription(
          reportMode
        )}</h4>
        <h2>Pontuação total: ${computeTotalScore(markedDefects)}</h2>

        ${(reportMode === BY_CARD_ELEMENT
          ? assembleReportByCardElement(markedDefects)
          : assembleReportByDefectType(markedDefects)
        ).reduce(
          (finalString, currentSection) =>
            finalString +
            `
            <section>
              <h3>${currentSection.title}</h3>
              ${currentSection.defects.reduce(
                (finalString, currentDefect) =>
                  finalString + formatDefectInHtml(currentDefect),
                ``
              )}
            </section>
            `,
          ``
        )}
    </body>
    </html>`;

  return html;
}

function formatDefectInHtml(defect: Defect) {
  const card = defect.id.split("_")[0];

  const containerStyle = `
    display: inline-flex;
    padding: 10px; 
    ustify-content: center;
    align-items: center;
    gap: 10px;
  `;

  const contentStyle = `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  `;

  const stripStyle = `
    display: flex;
    height: 100%;
    width: 4px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
    background: ${getCardElement(elements, card).color};
  `;

  const defectFeatures = `
    display: flex;
    margin-left: 4px;
    margin-top: 12px;
    margin-bottom: 6px;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
  `;

  const cardText = `
    font-size: 12px;
    font-weight: bold;
    color: ${getCardElement(elements, card).color};
  `;

  const typeText = `
    font-size: 12px;
    font-weight: bold;
    color: #707070;
  `;

  const boldText = `
    font-size: 12px;
    font-weight: bold;
  `;

  const plainText = `
    font-size: 12px;
    align-self: stretch;
  `;

  return `
    <div style="${containerStyle}">
      <div style="${stripStyle}">
      </div style="${contentStyle}">
        <div>
        <div style="${defectFeatures}">
          <div style="${cardText}">${card}</div>
          <div style="${typeText}">${defect.type}</div>
        </div>
        <div style="${plainText}">${defect.description}</div>

        <div style="${defectFeatures}">
          <div style="${boldText}">Localização  / Explicação do defeito</div>
        </div>
        <div style="${plainText}">${defect.location}</div>
      </div>
    </div>
  `;
}

async function printToFile(html: string) {
  try {
    if (Platform.OS === "web") {
      print(html);
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
  const inspectionContext = useContext(InspectionContext);
  const [reportMode, setReportMode] = useState<string>(BY_CARD_ELEMENT);
  return (
    <View style={styles.container}>
      <InspectionReportComponent
        reportMode={reportMode}
        setReportMode={setReportMode}
      />
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
          printToFile(
            generateReportHTML(inspectionContext.defectsList, reportMode)
          );
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

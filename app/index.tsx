import CardComponent from "@/components/CardComponent";
import { Card, Defect, Element } from "@/types";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";

const elements: Element[] = require("@/data/elements.json");
const cards: Card[] = require("@/data/cards.json");

export default function Index() {
  const [defectsList, setDefectsList] = useState<Defect[]>(
    require("@/data/defects.json")
  );

  useEffect(() => {
    //setDefectsList(require("@/data/defects.json"));
  }, [defectsList]);

  function saveDefectsListState() {
    /*
    const fs = require("fs");
    const fileName = "@/data/defects.json";

    fs.writeFile(
      fileName,
      JSON.stringify(defectsList),
      function writeJSON(err: any) {
        if (err) return console.log(err);
        console.log("writing to " + fileName);
      }
    );
    */
  }

  function updateDefectsList(defect: Defect) {
    setDefectsList(
      defectsList.map((listDefect) => {
        if (listDefect.id === defect.id) {
          console.log("aaaa");
          return defect;
        } else {
          return listDefect;
        }
      })
    );
  }

  function handleDefectMarking(defect: Defect): Defect | undefined {
    console.log("Chegou: " + JSON.stringify(defect));
    updateDefectsList(defect);
    saveDefectsListState();
    console.log(
      "Atualizou: " +
        JSON.stringify(
          defectsList.find((listDefect) => listDefect.id === defect.id)
        )
    );
    return defectsList.find((listDefect) => listDefect.id === defect.id);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <CardComponent
        element={elements[0]}
        card={cards[0]}
        defects={defectsList}
        handleDefectMarking={handleDefectMarking}
      />
    </SafeAreaView>
  );
}

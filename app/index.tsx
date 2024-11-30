import CardComponent from "@/components/CardComponent";
import { mmkvStorage } from "@/services/storage/mmkvStorage";
import {
  initializeStorage,
  storageService,
} from "@/services/storage/storageService";
import { Defect, Element } from "@/types";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";

const defects: Defect[] = require("@/data/defects.json");
const elements: Element[] = require("@/data/elements.json");

initializeStorage(mmkvStorage);

storageService.getItem("defects").then((value) => {
  if (value == null) {
    console.log("Setting the initial value!");
  }
});

export default function Index() {
  const [defectsList, setDefectsList] = useState<Defect[]>([]);

  useEffect(() => {
    storageService.getItem<Defect[]>("defects").then((storedDefectsList) => {
      if (storedDefectsList) {
        setDefectsList(storedDefectsList);
      } else {
        storageService.setItem("defects", defects);
        setDefectsList(defects);
      }
    });
  }, []);

  function updateDefectsList(defect: Defect) {
    let newDefectsList = defectsList.map((listDefect) => {
      if (listDefect.id === defect.id) {
        return defect;
      } else {
        return listDefect;
      }
    });
    storageService.setItem("defects", newDefectsList);
    setDefectsList(newDefectsList);
  }

  function handleDefectMarking(defect: Defect): Defect | undefined {
    console.log("Chegou: " + JSON.stringify(defect));
    updateDefectsList(defect);
    return defectsList.find((listDefect) => listDefect.id === defect.id);
  }

  const cardId = "CN-1";

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      {defectsList && (
        <CardComponent
          card={cardId}
          element={
            elements.find((element) => element.id == cardId.split("-")[0]) || {
              id: "",
              name: "",
              note: "",
              color: "",
            }
          }
          defects={defectsList.filter(
            (defect) => defect.id.split("_")[0] == cardId
          )}
          handleDefectMarking={handleDefectMarking}
        />
      )}
    </SafeAreaView>
  );
}

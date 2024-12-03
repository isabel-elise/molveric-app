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

export default function Index() {
  const [defectsList, setDefectsList] = useState<Defect[]>([]);

  useEffect(() => {
    storageService.getItem<Defect[]>("defects").then((storedDefectsList) => {
      /*
      if (storedDefectsList) {
        setDefectsList(storedDefectsList);
      } else {
        storageService.setItem("defects", defects);
        setDefectsList(defects);
      }
        */
      storageService.setItem("defects", defects);
      setDefectsList(defects);
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

  function handleDefectMarking(defect: Defect): Defect {
    updateDefectsList(defect);
    const updatedDefect = defectsList.find(
      (listDefect) => listDefect.id === defect.id
    );
    if (updatedDefect) return updatedDefect;
    return {
      id: "null",
      description: "",
      type: "",
      marked: false,
      location: "",
    };
  }

  function getCardElement(elements: Element[], cardId: string): Element {
    return (
      elements.find((element) => element.id == cardId.split("-")[0]) || {
        id: "",
        name: "",
        description: "",
        info: "",
        color: "",
      }
    );
  }

  function getCardDefects(defects: Defect[], cardId: string): Defect[] {
    return defects.filter((defect) => defect.id.split("_")[0] == cardId);
  }

  const cardId = "CN-2";

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <CardComponent
        card={cardId}
        element={getCardElement(elements, cardId)}
        defects={getCardDefects(defectsList, cardId)}
        handleDefectMarking={handleDefectMarking}
      />
    </SafeAreaView>
  );
}

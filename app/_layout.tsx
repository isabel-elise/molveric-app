import { myLocalStorage } from "@/services/storage/localStorage";
import {
  initializeStorage,
  storageService,
} from "@/services/storage/storageService";
import { Defect } from "@/types";
import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { ImageBackground } from "react-native";
const defects: Defect[] = require("@/data/defects.json");

interface InspectionContextProps {
  defectsList: Defect[];
  updateDefectsList: (defect: Defect) => void;
  updateDefectsListBatch: (defects: Defect[]) => void;
  inspectedCards: string[];
  updateInspectedCards: (cardID: string) => void;
}

initializeStorage(myLocalStorage);

export const InspectionContext = createContext<InspectionContextProps>({
  defectsList: [],
  updateDefectsList: (_: Defect) => {},
  updateDefectsListBatch: (_: Defect[]) => {},
  inspectedCards: [],
  updateInspectedCards: (_: string) => {},
});

export default function RootLayout() {
  const [defectsList, setDefectsList] = useState<Defect[]>([]);
  const [inspectedCards, setInspectedCards] = useState<string[]>([]);

  useEffect(() => {
    storageService.getItem<Defect[]>("defects").then((storedDefectsList) => {
      if (storedDefectsList) {
        setDefectsList(storedDefectsList);
      } else {
        storageService.setItem("defects", defects);
        setDefectsList(defects);
      }
    });
    storageService
      .getItem<string[]>("inspectedCards")
      .then((storedInspectedCards) => {
        if (storedInspectedCards) {
          setInspectedCards(storedInspectedCards);
        } else {
          storageService.setItem("inspectedCards", inspectedCards);
          setInspectedCards(inspectedCards);
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

  function updateDefectsListBatch(defects: Defect[]) {
    let newDefectsList = defectsList.map((listDefect) => {
      let newDefect = defects.find((defect) => defect.id === listDefect.id);

      if (newDefect) {
        return newDefect;
      } else {
        return listDefect;
      }
    });
    storageService.setItem("defects", newDefectsList);
    setDefectsList(newDefectsList);
  }

  function updateInspectedCards(card: string) {
    let newInpectedCards = [...inspectedCards, card];
    storageService.setItem("inspectedCards", newInpectedCards);
    setInspectedCards(newInpectedCards);
    console.log(card);
    console.log(newInpectedCards);
  }

  return (
    <InspectionContext.Provider
      value={{
        defectsList: defectsList,
        updateDefectsList: updateDefectsList,
        updateDefectsListBatch: updateDefectsListBatch,
        inspectedCards: inspectedCards,
        updateInspectedCards: updateInspectedCards,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </InspectionContext.Provider>
  );
}

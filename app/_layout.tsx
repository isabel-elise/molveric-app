import { myLocalStorage } from "@/services/storage/localStorage";
import { mmkvStorage } from "@/services/storage/mmkvStorage";
import {
  initializeStorage,
  storageService,
} from "@/services/storage/storageService";
import { Defect } from "@/types";
import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { Platform } from "react-native";
const defects: Defect[] = require("@/data/defects.json");

interface InspectionContextProps {
  defectsList: Defect[];
  updateDefectsList: (defect: Defect) => void;
  updateDefectsListBatch: (defects: Defect[]) => void;
  inspectedCards: string[];
  updateInspectedCards: (cardID: string) => void;
  inspectionIndex: number;
  updateInspectionIndex: (index: number) => void;
  inspectionState: string;
  updateInspectionState: (state: string) => void;
  clearInspectionData: () => void;
}

if (Platform.OS === "web") {
  initializeStorage(myLocalStorage);
} else {
  initializeStorage(mmkvStorage);
}

export const InspectionContext = createContext<InspectionContextProps>({
  defectsList: [],
  updateDefectsList: (_: Defect) => {},
  updateDefectsListBatch: (_: Defect[]) => {},
  inspectedCards: [],
  updateInspectedCards: (_: string) => {},
  inspectionIndex: 0,
  updateInspectionIndex: (_: number) => {},
  inspectionState: "",
  updateInspectionState: (_: string) => {},
  clearInspectionData: () => {},
});

export default function RootLayout() {
  const [defectsList, setDefectsList] = useState<Defect[]>([]);
  const [inspectedCards, setInspectedCards] = useState<string[]>([]);
  const [inspectionIndex, setInspectionIndex] = useState(0);
  const [inspectionState, setInspectionState] = useState<string>("");

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
    storageService
      .getItem<number>("inspectionIndex")
      .then((storedInspectionIndex) => {
        if (storedInspectionIndex) {
          setInspectionIndex(storedInspectionIndex);
        } else {
          storageService.setItem("inspectionIndex", inspectionIndex);
          setInspectionIndex(inspectionIndex);
        }
      });
    storageService.getItem("inspectionState").then((storedInspectionState) => {
      if (storedInspectionState) {
        setInspectionState(storedInspectionState);
      } else {
        storageService.setItem("inspectionState", "NONE");
        setInspectionState("NONE");
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
  }

  function updateInspectionIndex(increment: number) {
    let newIndex = inspectionIndex + increment;
    storageService.setItem("inspectionIndex", newIndex);
    setInspectionIndex(newIndex);
  }

  function updateInspectionState(state: string) {
    storageService.setItem("inspectionState", state);
    setInspectionState(state);
  }

  function clearInspectionData() {
    storageService.removeItem("defects");
    storageService.removeItem("inspectedCards");
    setDefectsList(defects);
    setInspectedCards([]);
  }

  return (
    <InspectionContext.Provider
      value={{
        defectsList: defectsList,
        updateDefectsList: updateDefectsList,
        updateDefectsListBatch: updateDefectsListBatch,
        inspectedCards: inspectedCards,
        updateInspectedCards: updateInspectedCards,
        inspectionIndex: inspectionIndex,
        updateInspectionIndex: updateInspectionIndex,
        inspectionState: inspectionState,
        updateInspectionState: updateInspectionState,
        clearInspectionData: clearInspectionData,
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

import { myLocalStorage } from "@/services/storage/localStorage";
import {
  initializeStorage,
  storageService,
} from "@/services/storage/storageService";
import { Defect } from "@/types";
import { Stack } from "expo-router";
import { createContext, useEffect, useState } from "react";
const defects: Defect[] = require("@/data/defects.json");

interface DefectsContextProps {
  list: Defect[];
  update: (defect: Defect) => void;
  updateBatch: (defects: Defect[]) => void;
}

initializeStorage(myLocalStorage);

export const DefectsContext = createContext<DefectsContextProps>({
  list: [],
  update: (defect: Defect) => {},
  updateBatch: (defects: Defect[]) => {},
});

export default function RootLayout() {
  const [defectsList, setDefectsList] = useState<Defect[]>([]);

  useEffect(() => {
    storageService.getItem<Defect[]>("defects").then((storedDefectsList) => {
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

  return (
    <DefectsContext.Provider
      value={{
        list: defectsList,
        update: updateDefectsList,
        updateBatch: updateDefectsListBatch,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </DefectsContext.Provider>
  );
}

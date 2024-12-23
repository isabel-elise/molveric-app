import { Defect } from "@/types";
import { router, Stack } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { DefectsContext } from "../_layout";

interface DefectContextProps {
  list: Defect[];
  update: (defect: Defect) => void;
  inspected: number;
  updateInspected: () => void;
}

export const LooseInspectionDefectsContext = createContext<DefectContextProps>({
  list: [],
  update: (defect: Defect) => {},
  inspected: 0,
  updateInspected: () => {},
});

export default function LooseInspectionLayout() {
  const [inspectedAmount, setInspectedAmount] = useState(0);
  const [tempDefectsList, setTempDefectsList] = useState<Defect[]>([]);
  const defectsContext = useContext(DefectsContext);

  useEffect(() => {
    setTempDefectsList(defectsContext.list);
  }, [defectsContext]);

  function updateTempDefectsList(defect: Defect) {
    let newDefectsList = tempDefectsList.map((listDefect) => {
      if (listDefect.id === defect.id) {
        return defect;
      } else {
        return listDefect;
      }
    });
    setTempDefectsList(newDefectsList);
  }

  function updateInspectedAmount() {
    setInspectedAmount(inspectedAmount + 1);
  }

  return (
    <LooseInspectionDefectsContext.Provider
      value={{
        list: tempDefectsList,
        update: updateTempDefectsList,
        inspected: inspectedAmount,
        updateInspected: updateInspectedAmount,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="[card]" />
      </Stack>
    </LooseInspectionDefectsContext.Provider>
  );
}

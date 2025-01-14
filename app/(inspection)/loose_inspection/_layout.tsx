import { Defect } from "@/types";
import { router, Stack } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { InspectionContext } from "../../_layout";

interface DefectContextProps {
  list: Defect[];
  update: (defect: Defect) => void;
}

export const LooseInspectionDefectsContext = createContext<DefectContextProps>({
  list: [],
  update: (_: Defect) => {},
});

export default function LooseInspectionLayout() {
  const [tempDefectsList, setTempDefectsList] = useState<Defect[]>([]);
  const inspectionContext = useContext(InspectionContext);

  useEffect(() => {
    setTempDefectsList(inspectionContext.defectsList);
  }, [inspectionContext]);

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

  return (
    <LooseInspectionDefectsContext.Provider
      value={{
        list: tempDefectsList,
        update: updateTempDefectsList,
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

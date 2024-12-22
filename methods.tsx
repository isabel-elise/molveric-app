import { Defect, Element } from "@/types";

export function getCardElement(elements: Element[], cardId: string): Element {
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

export function getCardDefects(defects: Defect[], cardId: string): Defect[] {
  return defects.filter((defect) => defect.id.split("_")[0] == cardId);
}

export function getDefectTypes(defects: Defect[]): {
  type: string;
  defects: Defect[];
}[] {
  let defectsTypeList: { type: string; defects: Defect[] }[] = [];

  defects.forEach((defect) => {
    let currentEntry = defectsTypeList.find(
      (entry) => entry.type == defect.type
    );

    if (!currentEntry) {
      defectsTypeList.push({ type: defect.type, defects: [defect] });
    } else {
      defectsTypeList = defectsTypeList.map((entry) => {
        if (entry.type == defect.type) {
          return { type: entry.type, defects: [...entry.defects, defect] };
        } else {
          return entry;
        }
      });
    }
  });

  return defectsTypeList;
}

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

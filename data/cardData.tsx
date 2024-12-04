import { ImageSourcePropType } from "react-native";

export const cardData = {
  "CN-1": { figure: require("@/assets/images/CN-1_figure.png"), points: 20 },
  "CN-2": { figure: require("@/assets/images/CN-2_figure.png"), points: 20 },
};

export function getDefectTypeIcon(type: string): ImageSourcePropType {
  if (type === "Omissão") {
    return require("@/assets/images/Omissao.png");
  }

  if (type === "Inconsistência") {
    return require("@/assets/images/Inconsistencia.png");
  }

  if (type === "Extrapolação") {
    return require("@/assets/images/Extrapolacao.png");
  }

  if (type === "Fato Incorreto") {
    return require("@/assets/images/FatoIncorreto.png");
  }

  if (type === "Ambiguidade") {
    return require("@/assets/images/Ambiguidade.png");
  }

  return require("@/assets/images/icon.png");
}

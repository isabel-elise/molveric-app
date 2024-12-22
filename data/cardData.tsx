import { ImageSourcePropType } from "react-native";

export function getCardData(card: string) {
  if (card === "CN-1")
    return { figure: require("@/assets/images/CN-1_figure.png"), points: 20 };
  if (card === "CN-2")
    return { figure: require("@/assets/images/CN-2_figure.png"), points: 20 };
  if (card === "D-1")
    return { figure: require("@/assets/images/D-1_figure.png"), points: 20 };
  if (card === "D-2")
    return { figure: require("@/assets/images/D-2_figure.png"), points: 10 };
  if (card === "D-3")
    return { figure: require("@/assets/images/D-3_figure.png"), points: 20 };
  if (card === "S-1")
    return { figure: require("@/assets/images/S-1_figure.png"), points: 20 };
  if (card === "S-2")
    return { figure: require("@/assets/images/S-2_figure.png"), points: 10 };

  throw "Card data not found!";
}

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

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
  if (card === "PA-1")
    return { figure: require("@/assets/images/PA-1_figure.png"), points: 20 };
  if (card === "PE-1")
    return { figure: require("@/assets/images/PE-1_figure.png"), points: 20 };
  if (card === "AU-1")
    return { figure: require("@/assets/images/AU-1_figure.png"), points: 20 };
  if (card === "PS-1")
    return { figure: require("@/assets/images/PS-1_figure.png"), points: 10 };
  if (card === "PS-2")
    return { figure: require("@/assets/images/PS-2_figure.png"), points: 20 };
  if (card === "PS-3")
    return { figure: require("@/assets/images/PS-3_figure.png"), points: 10 };
  if (card === "PS-4")
    return { figure: require("@/assets/images/PS-4_figure.png"), points: 10 };
  if (card === "FTR-1")
    return { figure: require("@/assets/images/FTR-1_figure.png"), points: 20 };
  if (card === "FTR-2")
    return { figure: require("@/assets/images/FTR-2_figure.png"), points: 20 };
  if (card === "FTR-3")
    return { figure: require("@/assets/images/FTR-3_figure.png"), points: 20 };
  if (card === "FTR-4")
    return { figure: require("@/assets/images/FTR-4_figure.png"), points: 20 };
  if (card === "FTR-5")
    return { figure: require("@/assets/images/FTR-5_figure.png"), points: 20 };

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

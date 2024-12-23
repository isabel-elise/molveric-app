import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import { getCardData } from "@/data/cardData";
import DefectTypeComponent from "./DefectTypeComponent";
import { getCardDefects, getCardElement, getDefectTypes } from "@/methods";

import elements from "@/data/elements.json";
import { useContext } from "react";
import { DefectsContext } from "@/app/_layout";
import { Link } from "expo-router";

interface Props {
  card: string;
}

export default function MiniCardComponent({ card }: Props) {
  const defectsContext = useContext(DefectsContext);
  const defects = getCardDefects(defectsContext.list, card);
  const element = getCardElement(elements, card);
  const cardElementID = card.split("-")[0];
  return (
    <Link
      href={{
        pathname: "/loose_inspection/[card]",
        params: { card: card },
      }}
    >
      <View style={[styles.cardContainer, { borderColor: element.color }]}>
        <View style={[styles.cardHeader, { backgroundColor: element.color }]}>
          <Text
            style={{
              ...styles.cardHeaderText,
              fontSize:
                cardElementID === "FTR"
                  ? 13
                  : ["PE", "PS"].includes(cardElementID)
                  ? 16
                  : 18,
            }}
          >
            {element.name}
          </Text>
        </View>

        {defects && defects.length ? (
          <View style={styles.defectTypesSection}>
            {getDefectTypes(defects).map((item) => (
              <DefectTypeComponent {...item} key={item.type} />
            ))}
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: element.color,
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {getCardData(card).points}
              </Text>
            </View>
          </View>
        ) : (
          <ActivityIndicator style={{ flex: 1 }} color={element.color} />
        )}

        <View style={[styles.cardBottom, { backgroundColor: element.color }]}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            {card}
          </Text>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 170,
    height: 320,
    backgroundColor: "white",
    borderWidth: 3,
    borderRadius: 8,
  },
  cardHeader: {
    height: 45,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeaderText: {
    color: "white",
    textAlign: "center",
    padding: 2,
  },
  defectTypesSection: {
    flex: 1,
    gap: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  cardBottom: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
});

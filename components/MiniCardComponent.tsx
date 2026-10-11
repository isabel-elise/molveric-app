import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

import { getCardData } from "@/data/cardData";
import DefectTypeComponent from "./DefectTypeComponent";
import { getCardDefects, getCardElement, getDefectTypes } from "@/methods";

import elements from "@/data/elements.json";
import { useContext } from "react";
import { InspectionContext } from "@/app/_layout";
import { Link } from "expo-router";
import React from "react";

interface Props {
  card: string;
}

export default function MiniCardComponent({ card }: Props) {
  const defectsContext = useContext(InspectionContext);
  const defects = getCardDefects(defectsContext.defectsList, card);
  const element = getCardElement(elements, card);
  const cardElementID = card.split("-")[0];
  const cardWasInspected = defectsContext.inspectedCards.includes(card);
  return (
    <Link
      href={{
        pathname: "/loose_inspection/[card]",
        params: { card: card },
      }}
    >
      <View
        style={[
          styles.cardContainer,
          {
            borderColor: cardWasInspected ? "rgb(47, 60, 24)" : element.color,
          },
        ]}
      >
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
        {cardWasInspected ? (
          <View style={styles.overlay}>
            <Image
              style={{
                position: "relative",
                top: 200,
                left: 110,
                width: "30%",
                height: "30%",
                tintColor: "rgba(52, 84, 41, 0.2)",
              }}
              resizeMode="contain"
              source={require("@/assets/images/checkmark_green.svg")}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderWidth: 3,
    borderRadius: 8,
    width: 165,
    height: 320,
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
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(2, 2, 1, 0.15)",
  },
});

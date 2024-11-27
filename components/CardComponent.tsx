import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
} from "react-native";

import { Element, Card, Defect } from "@/types";
import CheckBox from "./CheckBox";
import DefectTypeComponent from "./DefectTypeComponent";
import CardDefectComponent from "./CardDefectComponent";

interface Props {
  element: Element;
  card: Card;
  defects: Defect[];
  handleDefectMarking: Function;
}

export default function CardComponent({
  element,
  card,
  defects,
  handleDefectMarking,
}: Props) {
  const defectTypes = [
    { type: "Omissão", defects: [defects[0]] },
    { type: "Inconsistência", defects: [defects[1]] },
    { type: "Extrapolação", defects: [defects[2]] },
  ];

  return (
    <View style={[styles.cardContainer, { borderColor: element.color }]}>
      <View style={[styles.cardHeader, { backgroundColor: element.color }]}>
        <Text style={styles.cardHeaderText}>{element.name}</Text>
      </View>
      <View style={styles.descriptionSection}>
        <Text style={[styles.descriptionText, styles.cardBodyText]}>
          {card.description}
        </Text>
      </View>
      <View style={styles.figureSection}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={{ flex: 1, width: null, height: null, resizeMode: "contain" }}
        />
      </View>
      <View style={styles.defectsSection}>
        <Text
          style={{ color: element.color, fontWeight: "bold", fontSize: 16 }}
        >
          Defeitos
        </Text>
        <FlatList
          data={defects}
          renderItem={({ item }: { item: Defect }) => (
            <CardDefectComponent
              key={item.id}
              defect={item}
              handleDefectMarking={handleDefectMarking}
            />
          )}
        />
      </View>
      <View style={styles.defectTypesSection}>
        {defectTypes.map((item) => (
          <DefectTypeComponent {...item} key={item.type} />
        ))}
      </View>
      <View
        style={[styles.cardBottom, { backgroundColor: element.color }]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 5,
    borderRadius: 8,
    margin: 30,
  },
  cardHeader: {
    height: 60,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeaderText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  descriptionSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardBodyText: {
    fontSize: 16,
  },
  descriptionText: {
    textAlign: "justify",
  },
  figureSection: {
    height: 200,
  },
  defectsSection: {
    paddingHorizontal: 13,
    paddingVertical: 3,
  },
  defectTypesSection: {
    flex: 1,
    gap: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  cardBottom: {
    height: 60,
  },
});

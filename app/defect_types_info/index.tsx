import DefectTypeComponent from "@/components/DefectTypeComponent";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("@/assets/images/Fundo.png")}
        resizeMode="cover"
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        <View style={styles.infoContainer}>
          <DefectTypeComponent type="Omissão" defects={[]} info={true} />
          <Text style={styles.infoText}>
            Deve-se à omissão ou negligência de alguma informação necessária no
            diagrama de interação.
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <DefectTypeComponent type="Ambiguidade" defects={[]} info={true} />
          <Text style={styles.infoText}>
            Ocorre quando uma determinada informação não é bem definida no
            diagrama de interação, permitindo assim múltiplas interpretações.
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <DefectTypeComponent type="Fato Incorreto" defects={[]} info={true} />
          <Text style={styles.infoText}>
            Utilização de maneira incorreta dos elementos do diagrama de
            interação para a interpretação dos envolvidos.
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <DefectTypeComponent type="Extrapolação" defects={[]} info={true} />
          <Text style={styles.infoText}>
            Informação desnecessária incluída no diagrama de interação.
            Apresenta o nome “Informação Estranha” nos cartões MoLVERIC
            originais.
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <DefectTypeComponent type="Inconsistência" defects={[]} info={true} />
          <Text style={styles.infoText}>
            Ocorre quando existem informações contraditórias entre os elementos
            do diagrama de interação e das informações necessárias para a
            solução do problema.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 14,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#BFBFBF",
    backgroundColor: "#FFF",
    marginHorizontal: 50,
  },
  infoText: {
    flex: 1,
  },
});

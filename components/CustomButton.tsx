import { Pressable, StyleSheet, Text } from "react-native";

interface CustomButtonProps {
  title: string;
  size: string;
  shade: string;
  type?: string;
  disabled?: boolean;
  onClick: () => void;
}

function getSizeStyle(size: string) {
  if (size === "long") {
    return styles.longContainer;
  }
  if (size === "regular") {
    return styles.regularContainer;
  }

  return {};
}

function getShadeStyle(shade: string) {
  if (shade === "light") {
    return styles.lightShade;
  }
  if (shade === "medium") {
    return styles.mediumShade;
  }
  if (shade === "dark") {
    return styles.darkShade;
  }
}

function getTypeStyle(type: string | undefined) {
  if (type === "rounded") {
    return { borderRadius: 24 };
  }
  return {};
}

export default function CustomButton({
  title,
  size,
  shade,
  type,
  disabled = false,
  onClick,
}: CustomButtonProps) {
  return (
    <Pressable
      style={[
        styles.container,
        getSizeStyle(size),
        getShadeStyle(shade),
        getTypeStyle(type),
      ]}
      onPress={disabled ? () => {} : onClick}
    >
      <Text
        style={[styles.title, disabled ? { color: "rgba(0, 0, 0, 0.50)" } : {}]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#858585",
    elevation: 1,
  },
  longContainer: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  regularContainer: {
    width: 172,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  lightShade: {
    backgroundColor: "#EFEFEF",
  },
  mediumShade: {
    backgroundColor: "#E8E8E8",
  },
  darkShade: {
    backgroundColor: "#DFDFDF",
  },
  title: {
    fontSize: 16,
  },
});

import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";

const Header = (props) => {
  const {
  leftComponent,
  centerComponent,
  rightComponent,
  iconLeft,
  iconRight,
  onPressLeft,
  onPressRight,
  title,
  iconLeftColor,
  iconRightColor,
  leftIconSize,
  rightIconSize,
  numberOfLines,
} = props 

  const renderLeft = () => {
    return (
      leftComponent || (
        <View>
          {iconLeft ? (
            <Pressable hitSlop={15} onPress={onPressLeft}>
              <Image
                source={iconLeft}
                style={{
                  tintColor: iconLeftColor,
                  width: leftIconSize,
                  height: leftIconSize,
                }}
              />
            </Pressable>
          ) : (
            <View style={{ width: leftIconSize, height: leftIconSize }} />
          )}
        </View>
      )
    );
  };

  const renderCenter = () => {
    return (
      centerComponent || (
        <View style={styles.containerCenter}>
          <Text style={styles.title} numberOfLines={numberOfLines}>
            {title}
          </Text>
        </View>
      )
    );
  };

  const renderRight = () => {
    return (
      rightComponent || (
        <View style={styles.containerRight}>
          {iconRight ? (
            <Pressable hitSlop={15} onPress={onPressRight}>
              <Image
                source={iconRight}
                style={{
                  tintColor: iconRightColor,
                  width: rightIconSize,
                  height: rightIconSize,
                }}
              />
            </Pressable>
          ) : (
            <View style={{ width: rightIconSize, height: rightIconSize }} />
          )}
        </View>
      )
    );
  };

  return (
    <View style={styles.container}>
      {renderLeft()}
      {renderCenter()}
      {renderRight()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f0f0f0",
  },
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
    containerRight: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Header;

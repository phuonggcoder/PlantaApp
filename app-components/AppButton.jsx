import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const AppButton = (props) => {
    const {onPress,title, styles, bg, bw, bc, padding, margin} = props

    const viewStyle = [{
        backgroundColor: bg || styles.bg || "white",
        borderWidth: bw,
        borderColor: bc,
        padding: padding,
        margin: margin,
    },
    styles,
    {...props}
]
  return (
    <TouchableOpacity onPress={onPress} style={viewStyle}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
}

export default AppButton

const styles = StyleSheet.create({})
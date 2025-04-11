import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AppView = (props) => {
    const {children, styles, bg, bw, bc,
        padding, margin,} = props

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
    <View
        style={viewStyle}
    >
      <Text>AppView</Text>
      {children}
    </View>
  )
}


export default AppView

const styles = StyleSheet.create({})
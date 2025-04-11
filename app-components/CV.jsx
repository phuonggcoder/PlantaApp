import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const CardView = (props) => {
  const {
    title,
    location,
    time,
    ducation,
    transport,
    image,
    hotelname,
    opentime,
    hotellocation,
    button,
    onPress,
    bw,
    bc,
    br,
    w,
    h,
    bg,
    img,
    imgW,
    imgH,
    titleC,
    titleS,
    styles,
    fd,
    ai,
    jc,
    m,
    mt,
    mb,
    ml,
    mr,
    p,
    pt,
    pb,
    pl,
    pr,
    fs,
    fw,
    arrStyles,
  } = props;
  const buttonSTyle = [
    {
      width: w,
      height: h,
      backgroundColor: bg,
      borderColor: bc,
      borderWidth: bw,
      borderRadius: br,
      flexDirection: fd,
      alignItems: ai,
      justifyContent: jc,
      margin: m,
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
      padding: p,
      paddingTop: pt,
      paddingBottom: pb,
      paddingLeft: pl,
      paddingRight: pr,
      fontSize: fs,
      fontWeight: fw,
    },
    styles,
    { ...props },
  ];

  return (
    <View style={buttonSTyle}>
      {location && (
        <View style={{ marginBottom: mb }}>
          <Text style={{ fontSize: fs, color: titleC, marginBottom: mb }}>
            Địa điểm
          </Text>
          <Text style={{ fontSize: fs, fontWeight: fw, color: titleS }}>
            {location}
          </Text>
        </View>
      )}

      {time && (
        <View style={{ marginBottom: mb }}>
          <Text style={{ fontSize: fs, color: titleC, marginBottom: mb }}>
            Thời gian
          </Text>
          <Text style={{ fontSize: fs, fontWeight: fw, color: titleS}}>
            {time}
          </Text>
        </View>
      )}

      {transport && (
        <View style={{ marginBottom: mb }}>
          <Text style={{ fontSize: fs, color: titleC, marginBottom: mb }}>
            Phương tiện di chuyển
          </Text>
          <Text style={{ fontSize: fs, fontWeight: fw, color: titleS}}>
            {transport}
          </Text>
        </View>
      )}

      {ducation && (
        <View style={{ marginBottom: mb }}>
          <Text style={{ fontSize: fs, color: titleC, marginBottom: 2 }}>
            Thời gian
          </Text>
          <Text style={{ fontSize: fs, fontWeight: fw, color: titleS}}>
            {ducation}
          </Text>
        </View>
      )}

      {image && (
        <View style={{ marginVertical: mb }}>
          <Image
            source={image}
            style={{ width: "100%", height: 200, borderRadius: 8 }}
          />
        </View>
      )}

      {hotelname && (
        <>
          <View style={{ marginBottom: mb }}>
            <Text style={{ fontSize: fs, color: titleC, marginBottom: 2 }}>
              Tên khách sạn
            </Text>
            <Text style={{ fontSize: fs, fontWeight: fw, color: titleS}}>
              {hotelname}
            </Text>
          </View>

          <View style={{ marginBottom: mb }}>
            <Text style={{ fontSize: fs, color: titleC, marginBottom: 2 }}>
              Giờ mở cửa
            </Text>
            <Text style={{ fontSize: fs, fontWeight: fw, color: titleS}}>
              {opentime}
            </Text>
          </View>

          <View style={{ marginBottom: mb }}>
            <Text style={{ fontSize: fs, color: titleC, marginBottom: 2 }}>
              Địa điểm
            </Text>
            <Text style={{ fontSize: fs, fontWeight: fw, color: titleS}}>
              {hotellocation}
            </Text>
          </View>
        </>
      )}

      {button && (
        <TouchableOpacity
          style={{
            backgroundColor: "#3498db",
            paddingVertical: mb,
            borderRadius: 5,
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ color: "#fff", fontSize: fs, fontWeight: fw }}>
            CHI TIẾT
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CardView;

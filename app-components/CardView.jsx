import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const CardView = (props) => {
  const {
    title,
    location,
    time,
    duration,
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
  } = props;

  const cardStyle = [
    {
      width: w,
      height: h,
      backgroundColor: bg || "white",
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
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    styles,
  ];

  return (
    <View style={cardStyle}>
      {title && <Text style={{ fontSize: fs, fontWeight: fw, marginBottom: 10 }}>{title}</Text>}

      {location && (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: fs, color: titleC }}>Địa điểm</Text>
          <Text style={{ fontSize: fs, fontWeight: fw, color: titleS }}>{location}</Text>
        </View>
      )}

      {time && (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: fs, color: titleC }}>Thời gian</Text>
          <Text style={{ fontSize: fs, fontWeight: fw, color: titleS }}>{time}</Text>
        </View>
      )}

      {transport && (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: fs, color: titleC }}>Phương tiện</Text>
          <Text style={{ fontSize: fs, fontWeight: fw, color: titleS }}>{transport}</Text>
        </View>
      )}

      {duration && (
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: fs, color: titleC }}>Thời gian</Text>
          <Text style={{ fontSize: fs, fontWeight: fw, color: titleS }}>{duration}</Text>
        </View>
      )}

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: imgW || "100%", height: imgH || 200, borderRadius: 8, marginBottom: 10 }}
        />
      )}

      {hotelname && (
        <>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: fs, color: titleC }}>Tên khách sạn</Text>
            <Text style={{ fontSize: fs, fontWeight: fw, color: titleS }}>{hotelname}</Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: fs, color: titleC }}>Giờ mở cửa</Text>
            <Text style={{ fontSize: fs, fontWeight: fw, color: titleS }}>{opentime}</Text>
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: fs, color: titleC }}>Địa điểm</Text>
            <Text style={{ fontSize: fs, fontWeight: fw, color: titleS }}>{hotellocation}</Text>
          </View>
        </>
      )}

      {button && (
        <TouchableOpacity
          style={{
            backgroundColor: "#3498db",
            paddingVertical: 10,
            borderRadius: 5,
            alignItems: "center",
            marginTop: 15,
          }}
          onPress={onPress}
        >
          <Text style={{ color: "#fff", fontSize: fs, fontWeight: fw }}>CHI TIẾT</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CardView;

import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {Component, useState} from 'react';
import CUSTOM_COLORS from '../constants/color';
import {FONT_FAMILY} from '../constants/font';
import CUSTOM_SIZES from '../constants/size';
import {IMG_ElementDetect, IMG_HGR_EX} from '../assets/imgs';
import scale from '../constants/responsive';
import {IC_Upload} from '../assets/icons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const DetectScreen = () => {
  const navigation = useNavigation();
  const [selectedImg, setSelectedImg] = useState(null);
  const [passedFile, setPassedFile] = useState(null);
  let file = {
    uri: '', // e.g. 'file:///path/to/file/image123.jpg'
    name: '', // e.g. 'image123.jpg',
    type: '', // e.g. 'image/jpg'
  };

  // const [imgPicked, setImgPicked] = useState(new Image());
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImg(imageUri);
        setPassedFile(response.assets?.[0]);

        file.uri = imageUri;
        file.type = response.type || response.assets?.[0]?.type;
        file.name = response.fileName || response.assets?.[0]?.fileName;
        console.log('uri', imageUri);
        console.log('img', response.assets?.[0]);
        console.log('file', passedFile);
        navigation.navigate('DetectStack', {
          screen: 'Result',
          params: {
            passedImg: imageUri,
            passedFile: file,
            w: response.assets?.[0]?.width,
            h: response.assets?.[0]?.height,
          },
        });
      }
    });
  };
  return (
    <SafeAreaView style={styles.contaier}>
      <ImageBackground
        resizeMode="cover"
        style={styles.image}
        source={require('../assets/imgs/elementBg2.png')}>
        <Text style={styles.title}>{'Hand Gesture \nRecognition'}</Text>
        <Image
          style={styles.imgElement}
          resizeMode="contain"
          source={IMG_ElementDetect}
        />
        <View style={styles.uploadContainer}>
          <View style={styles.illusContainer}>
            <TouchableOpacity
              style={styles.imgContainer}
              onPress={() =>
                // this.props.navigation.navigate('DetectStack', {
                //   screen: 'Result',
                // })
                {
                  openImagePicker();
                }
              }>
              <IC_Upload />
              <Text style={styles.txtMedium}>Upload your image</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default DetectScreen;

const styles = StyleSheet.create({
  contaier: {
    backgroundColor: CUSTOM_COLORS.primary,
    height: '100%',
    width: '100%',
  },
  image: {
    height: '100%',
    padding: 0,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONT_FAMILY.PoppinsSemiBold,
    fontSize: CUSTOM_SIZES.x2medium,
    textAlign: 'center',
    flex: 1.5,
    //backgroundColor: 'red',
    alignItems: 'center',
    textAlignVertical: 'center',
    color: CUSTOM_COLORS.white,
  },
  imgElement: {
    height: '30%',
    //backgroundColor: 'white',
    width: '80%',
    alignSelf: 'center',
    flex: 3.5,
    marginVertical: scale(15, 'h'),
  },
  uploadContainer: {
    flex: 6,
    paddingHorizontal: CUSTOM_SIZES.x2Large,
  },
  illusContainer: {
    height: '75%',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    borderWidth: scale(1, 'w'),
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: scale(45, 'w'),
    padding: scale(20, 'h'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtBoldIntro: {
    fontFamily: FONT_FAMILY.PoppinsBold,
    fontSize: CUSTOM_SIZES.x2medium,
    color: CUSTOM_COLORS.white,
    lineHeight: 30,
  },
  txtSmall: {
    fontFamily: FONT_FAMILY.PoppinsLight,
    fontSize: CUSTOM_SIZES.small,
    color: CUSTOM_COLORS.white,
  },
  txtMedium: {
    fontFamily: FONT_FAMILY.PoppinsLight,
    fontSize: CUSTOM_SIZES.small,
    color: CUSTOM_COLORS.white,
  },
  imgContainer: {
    //backgroundColor: 'white',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';

const Icon = (props: any) => {
    if (props.family === 'FontAwesome5')
      return (
        <FontAwesome5 name={props.name} size={props.size} color={props.color} />
      );
    if (props.family === 'FontAwesome')
      return (
        <FontAwesome name={props.name} size={props.size} color={props.color} />
      );
    if (props.family === 'MaterialIcons')
      return (
        <MaterialIcons
          name={props.name}
          size={props.size}
          color={props.color}
        />
      );
    if (props.family === 'MaterialCommunityIcons')
      return (
        <MaterialCommunityIcons
          name={props.name}
          size={props.size}
          color={props.color}
        />
      );
    if (props.family === 'AntDesign')
      return (
        <AntDesign name={props.name} size={props.size} color={props.color} />
      );
    if (props.family === 'Entypo')
      return <Entypo name={props.name} size={props.size} color={props.color} />;
    if (props.family === 'Feather')
      return (
        <Feather name={props.name} size={props.size} color={props.color} />
      );
    if (props.family === 'Foundation')
      return (
        <Foundation name={props.name} size={props.size} color={props.color} />
      );
    if (props.family === 'Ionicons')
      return (
        <Ionicons name={props.name} size={props.size} color={props.color} />
      );
    if (props.family === 'SimpleLineIcons')
      return (
        <SimpleLineIcons
          name={props.name}
          size={props.size}
          color={props.color}
        />
      );
  
  return (
    <FontAwesome5
      name={props.name}
      size={props.size}
      color={props.color}
    />
  );

  // return null;
};

export default Icon;

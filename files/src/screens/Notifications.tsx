import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';

const Notifications = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [title, settitle] = useState('');
  const [movieposter, setMovieposter] = useState('');
  const [details, setDetails] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [totalrating, setTotalrating] = useState('');
  const sneha_api_url =
    'https://api.themoviedb.org/3/movie/157336?api_key=36f033bb2f3fb2e33f1150070a7a8f03';
  const getMovies = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmYwMzNiYjJmM2ZiMmUzM2YxMTUwMDcwYTdhOGYwMyIsInN1YiI6IjY1MmZjMWU5YTgwMjM2MDBlMGFjZjk2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ucseNtMUg9g3oQTRikC32AOtu3Z7vFoNV6f08jblaBU',
        },
      };
      const response = await fetch(sneha_api_url, options);
      const data = await response.json();
      setData(data);
      settitle(data.original_title);
      console.log('movies data', data.original_title);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  const persons = [
    {
      id: '1',
      name: 'Earnest Green',
    },
    {
      id: '2',
      name: 'Winston Orn',
    },
    {
      id: '3',
      name: 'Carlton Collins',
    },
    {
      id: '4',
      name: 'Malcolm Labadie',
    },
    {
      id: '5',
      name: 'Michelle Dare',
    },
    {
      id: '6',
      name: 'Carlton Zieme',
    },
    {
      id: '7',
      name: 'Jessie Dickinson',
    },
    {
      id: '8',
      name: 'Julian Gulgowski',
    },
    {
      id: '9',
      name: 'Ellen Veum',
    },
    {
      id: '10',
      name: 'Lorena Rice',
    },

    {
      id: '11',
      name: 'Carlton Zieme',
    },
    {
      id: '12',
      name: 'Jessie Dickinson',
    },
    {
      id: '13',
      name: 'Julian Gulgowski',
    },
    {
      id: '14',
      name: 'Ellen Veum',
    },
    {
      id: '15',
      name: 'Lorena Rice',
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text style={{ color: "red" }}>{item.original_title}</Text>}
      />
    </View>
  );
}
export default Notifications;
const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
  },
  item: {
    color: "red",
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  }
});
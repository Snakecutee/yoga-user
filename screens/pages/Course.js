import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, onValue } from "firebase/database";
import database from '../../api/firebase';

export default function Course() {
  const [courses, setCourses] = useState([]);
  const navigation = useNavigation();


  const onClickMore = (courseId) => {
    navigation.navigate('Class', { courseId }); 
  };

  useEffect(() => {

    const coursesRef = ref(database, 'courses');
    onValue(coursesRef, (snapshot) => {
      const data = snapshot.val();
      const coursesArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setCourses(coursesArray);
    });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.classType}</Text>
      <View style={styles.details}>
        <Text style={styles.detailItem}>Capacity: {item.capacity}</Text>
        <Text style={styles.detailItem}>Day: {item.day}</Text>
        <Text style={styles.detailItem}>Duration: {item.duration} mins</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onClickMore(item.id)}
      >
        <Text style={styles.buttonText}>More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Courses Information</Text>
      <FlatList
        data={courses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  details: {
    marginBottom: 12,
  },
  detailItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

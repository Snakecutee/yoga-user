import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';
import { ref, onValue } from "firebase/database";
import { useRoute, useNavigation } from '@react-navigation/native';
import database from '../../api/firebase';

export default function Class() {
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const { courseId } = route.params;

  useEffect(() => {
    // Fetch classes from Firebase
    const classesRef = ref(database, 'classes');
    onValue(classesRef, (snapshot) => {
      const data = snapshot.val();
      const filteredClasses = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .filter((item) => item.courseId === courseId);
      setClasses(filteredClasses);
    });
  }, [courseId]);

  // Filter classes based on teacher name search
  const filteredClasses = classes.filter(item =>
    item.teacherName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Teacher: {item.teacherName}</Text>
      <Button
        title="View Details"
        onPress={() => navigation.navigate('ClassDetail', { classId: item.id })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Class Yoga</Text>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by teacher name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Display filtered classes */}
      <FlatList
        data={filteredClasses}
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
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
});
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import database from '../../api/firebase';

export default function ClassDetail() {
  const [classDetails, setClassDetails] = useState(null);
  const route = useRoute();
  const { classId } = route.params; 

  useEffect(() => {
   
    const classRef = ref(database, 'classes/' + classId);
    get(classRef).then((snapshot) => {
      if (snapshot.exists()) {
        setClassDetails(snapshot.val());
      } else {
        console.log('No data available');
      }
    });
  }, [classId]);

  if (!classDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Class Details</Text>
      <Text style={styles.title}>Teacher: {classDetails.teacherName}</Text>
      <Text style={styles.detailItem}>Course ID: {classDetails.courseId}</Text>
      <Text style={styles.detailItem}>Date: {classDetails.day}</Text>
      <Text style={styles.detailItem}>Comments: {classDetails.comments || 'No comments available'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  detailItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
});

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function About() {
    return (
        <View>
        <Text style={styles.Header}>
            About Us
        </Text>
        <Text style={styles.sectionDescription}>
            Batch-19 Software Engineering student aiming to develop the Mobile application for Final Year Project under the supervision of Sir Shoaib Rauf.
        </Text>
        <Text style={styles.sectionDescription1}>
            19k-1074 Syed Mubarak Shah 
            19k-1052  Sanjay Kumar
            19k-1088 Mohammad Taha
        </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionDescription: {
      marginTop: 70,
      fontSize: 35,
      fontWeight: '400',
    },
    Header: {
      marginTop: 8,
      fontSize: 60,
      fontWeight: '800',
    },
    sectionDescription1: {
      marginTop: 10,
      fontSize: 35,
      fontWeight: '400',
    },

  });

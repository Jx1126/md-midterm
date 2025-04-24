import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

export default function App() {
  return (
    <SafeAreaView style={styles.body}>

      <StatusBar style="light" />

      <View style={styles.textWrapper}>
        <Text style={styles.historyText}>123</Text>
        <Text style={styles.resultText}>123+123</Text>
      </View>

      <View style={styles.container}>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.functionButton]}>
            <Text style={styles.numericText}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.functionButton]}>
            <Text style={styles.functionText}>&#177;</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.functionButton]}>
            <Text style={styles.functionText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operationButton]}>
            <Text style={styles.operatorText}>&#247;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.numericText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.numericText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.numericText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operationButton]}>
            <Text style={styles.operatorText}>&#215;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.numericText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.numericText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.numericText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operationButton]}>
            <Text style={styles.operatorText}>&#8722;</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.numericText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.numericText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.numericText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operationButton]}>
            <Text style={styles.operatorText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.numericText}>A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.numericText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.operatorText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operationButton]}>
            <Text style={styles.operatorText}>=</Text>
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'flex-end',
    alignItems: 'center',
},
  container: {
    width: '95%',
    height: '60%',
  },
  textWrapper: {
    width: '90%',
    justifyContent: 'flex-end',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: '100%',
    backgroundColor: '#1E1F29',
    justifyContent: 'center',
    alignItems: 'center',
  },
  functionButton: {
    backgroundColor: '#6A6D8F'
  },
  operationButton: {
    backgroundColor: '#3a5fcd20',
    borderWidth: 3,
    borderColor: '#3A5FCD',
  },
  numericText: {
    flex: 1,
    color: '#F4F6FB',
    fontSize: 32,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  functionText: {
    flex: 1,
    color: '#F4F6FB',
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  operatorText: {
    flex: 1,
    color: '#AFCBFF',
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  historyText: {
    color: '#505050',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'right',
  },
  resultText: {
    color: '#D0D8F2',
    fontSize: 50,
    marginBottom: 10,
    textAlign: 'right',
  },
});

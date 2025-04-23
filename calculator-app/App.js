import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.body}>

      <Text style={styles.historyCalculation}>123</Text>
      <Text style={styles.currentCalculation}>123+123</Text>

      <View style={styles.container}>

        <View style={styles.row}>
          <View style={[styles.button, styles.buttonGray]}>
            <Text style={styles.buttonText}>AC</Text>
          </View>
          <View style={[styles.button, styles.buttonGray]}>
            <Text style={styles.buttonSymbol}>&#177;</Text>
          </View>
          <View style={[styles.button, styles.buttonGray]}>
            <Text style={styles.buttonSymbol}>%</Text>
          </View>
          <View style={[styles.button, styles.buttonOrange]}>
            <Text style={styles.buttonSymbol}>&#247;</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>7</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonText}>8</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonText}>9</Text>

          </View>
          <View style={[styles.button, styles.buttonOrange]}>
            <Text style={styles.buttonSymbol}>&#215;</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.button}>
            <Text style={styles.buttonSymbol}>4</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonSymbol}>5</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonSymbol}>6</Text>
          </View>
          <View style={[styles.button, styles.buttonOrange]}>
            <Text style={styles.buttonSymbol}>&#8722;</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.button}>
            <Text style={styles.buttonSymbol}>1</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonSymbol}>2</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonSymbol}>3</Text>
          </View>
          <View style={[styles.button, styles.buttonOrange]}>
            <Text style={styles.buttonSymbol}>+</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.button}>
            <Text style={styles.buttonSymbol}>A</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonSymbol}>0</Text>
          </View>
          <View style={styles.button}>
            <Text style={styles.buttonSymbol}>.</Text>
          </View>
          <View style={[styles.button, styles.buttonOrange]}>
            <Text style={styles.buttonSymbol}>=</Text>
          </View>
        </View>


      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-end',
    alignItems: 'center',
},
  container: {
    width: '95%',
    height: '60%',
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
    backgroundColor: '#1c1c1c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGray: {
    backgroundColor: '#505050'
  },
  buttonOrange: {
    backgroundColor: '#FF9500'
  },
  buttonText: {
    flex: 1,
    color: '#fff',
    fontSize: 38,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  buttonSymbol: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  historyCalculation: {
    color: '#505050',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  currentCalculation: {
    color: '#fff',
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

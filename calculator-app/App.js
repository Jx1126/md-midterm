import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import * as ScreenOrientation from "expo-screen-orientation";

export default function App() {
  const [answerValue, setAnswerValue] = useState(0);
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [memoryValue, setMemoryValue] = useState(0);
  const [operatorValue, setOperatorValue] = useState(null);
  const [allClear, setAllClear] = useState(true);
  const [historyText, setHistoryText] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  const handleNumber = (value) => {
    if (readyToReplace) {
      setReadyToReplace(false);
      return value;
    } else {
      return answerValue === "0" ? value : answerValue + value;
    }
  };

  const calculateEquals = () => {
    const previous = parseFloat(memoryValue);
    const current = parseFloat(answerValue);
    let result = 0;

    switch (operatorValue) {
      case "+":
        result = previous + current;
        break;
      case "−":
        result = previous - current;
        break;
      case "×":
        result = previous * current;
        break;
      case "÷":
        result = previous / current;
        break;
      default:
        return;
    }

    setMemoryValue(0);
    setReadyToReplace(true);
    setAnswerValue(result);

    return result;
  };

  const formatNumber = (number) => {
    const [whole, decimal] = String(number).split(".");
    const formattedWhole = parseFloat(whole).toLocaleString("en-US");
    return decimal ? `${formattedWhole}.${decimal}` : formattedWhole;
  };

  const buttonPressed = (value) => {
    if (!isNaN(value)) {
      if (calculated) {
        setHistoryText("");
        setAnswerValue(0);
        setCalculated(false);
      }

      setAllClear(false);
      const updatedValue = handleNumber(value);
      setAnswerValue(updatedValue);
      return;
    }

    if (value === "C") {
      if (allClear) {
        setAnswerValue(0);
        setMemoryValue(0);
        setOperatorValue(null);
        setHistoryText("");
      } else {
        setAnswerValue(0);
      }
      setReadyToReplace(true);
      setAllClear(true);
      return;
    }

    if (value === "÷" || value === "×" || value === "−" || value === "+") {
      if (calculated) {
        setMemoryValue(answerValue);
        setHistoryText(`${formatNumber(answerValue)} ${value}`);
        setCalculated(false);
      } else if (operatorValue !== null && !readyToReplace) {
        const chainResult = calculateEquals();
        setMemoryValue(chainResult);
        setHistoryText(`${formatNumber(chainResult)} ${value}`);
      } else if (operatorValue === null && memoryValue === 0) {
        setMemoryValue(answerValue);
        setHistoryText(`${formatNumber(answerValue)} ${value}`);
      } else {
        setHistoryText(`${formatNumber(memoryValue)} ${value}`);
      }
    
      setOperatorValue(value);
      setReadyToReplace(true);
      return;
    }

    if (value === "=") {
      if (operatorValue && readyToReplace) {
        return;
      }

      calculateEquals();
      setOperatorValue(null);

      if (!calculated) {
        setHistoryText(`${historyText} ${formatNumber(answerValue)}`);
        setCalculated(true);
      }
      return;
    }

    if (value === "+/-") {
      const updatedValue = parseFloat(answerValue) * -1;
      setAnswerValue(updatedValue);
      return;
    }

    if (value === "%") {
      const updatedValue = parseFloat(answerValue) * 0.01;
      setAnswerValue(updatedValue);
      return;
    }

    if (value === ".") {
      if (answerValue.includes(".")) {
        return;
      } else {
        const updatedValue = answerValue + value;
        setAnswerValue(updatedValue);
        return;
      }
    }
  };

  const toggleAdvancedMode = (mode) => {
    setIsAdvancedMode(mode === "advanced");
  };

  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

  return (
    <SafeAreaView style={styles.body}>
      <StatusBar style="light" />

      <View style={styles.modeToggleContainer}>
        <TouchableOpacity
          style={[styles.simpleModeToggleButton, styles.modeToggleButton, !isAdvancedMode && styles.modeToggleActiveButton]}
          onPress={() => toggleAdvancedMode("simple")}>
          <Text style={styles.modeToggleButtonText}>Simple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.advancedModeToggleButton, styles.modeToggleButton, isAdvancedMode && styles.modeToggleActiveButton]}
          onPress={() => toggleAdvancedMode("advanced")}>
          <Text style={styles.modeToggleButtonText}>Advanced</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textWrapper}>
        <AutoSizeText fontSize={30} numberOfLines={1} mode={ResizeTextMode.max_lines} style={styles.historyText}>
          {historyText}
        </AutoSizeText>
        <AutoSizeText fontSize={50} numberOfLines={1} mode={ResizeTextMode.max_lines} style={styles.resultText}>
          {formatNumber(answerValue)}
        </AutoSizeText>
      </View>

      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={() => buttonPressed("C")} >
            <Text style={styles.numericText}>{ allClear ? "AC" : "C" }</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={() => buttonPressed("+/-")} >
            <Text style={styles.functionText}>&#177;</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.functionButton]} onPress={() => buttonPressed("%")} >
            <Text style={styles.functionText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton, operatorValue === "÷" && styles.storedOperatorButton]} onPress={() => buttonPressed("÷")} >
            <Text style={styles.operatorText}>÷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed("7")} >
            <Text style={styles.numericText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed("8")} >
            <Text style={styles.numericText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed("9")} >
            <Text style={styles.numericText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton, operatorValue === "×" && styles.storedOperatorButton]} onPress={() => buttonPressed("×")} >
            <Text style={styles.operatorText}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed("4")} >
            <Text style={styles.numericText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed("5")} >
            <Text style={styles.numericText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed("6")} >
            <Text style={styles.numericText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton, operatorValue === "−" && styles.storedOperatorButton]} onPress={() => buttonPressed("−")} >
            <Text style={styles.operatorText}>−</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed("1")} >
            <Text style={styles.numericText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed("2")} >
            <Text style={styles.numericText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed("3")} >
            <Text style={styles.numericText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.operatorButton, operatorValue === "+" && styles.storedOperatorButton]} onPress={() => buttonPressed("+")} >
            <Text style={styles.operatorText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.zeroButton]} onPress={() => buttonPressed("0")} >
            <Text style={styles.zeroText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => buttonPressed(".")} >
            <Text style={styles.operatorText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.equalButton]} onPress={() => buttonPressed("=")} >
            <Text style={styles.operatorText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const screenDimension = Dimensions.get("window");
const buttonDimension = (screenDimension.width / 4) * 0.9;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingBottom: 10,
    height: screenDimension.height * 0.6,
  },
  textWrapper: {
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "flex-end",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: buttonDimension,
    height: buttonDimension,
    borderRadius: buttonDimension / 2,
    backgroundColor: "#1E1F29",
    justifyContent: "center",
    alignItems: "center",
  },
  functionButton: {
    backgroundColor: "#6A6D8F",
  },
  operatorButton: {
    backgroundColor: "#3a5fcd20",
    borderWidth: 3,
    borderColor: "#3A5FCD",
  },
  zeroButton: {
    width: buttonDimension * 2,
    borderRadius: buttonDimension / 2,
  },
  equalButton: {
    backgroundColor: "#4A90E2",
  },
  storedOperatorButton: {
    borderWidth: 3,
    borderColor: "#3A5FCD",
    backgroundColor: "#3A5FCD80",
  },
  numericText: {
    color: "#F4F6FB",
    fontSize: 32,
    textAlign: "center",
  },
  functionText: {
    color: "#F4F6FB",
    fontSize: 40,
    textAlign: "center",
  },
  operatorText: {
    color: "#AFCBFF",
    fontSize: 40,
    textAlign: "center",
  },
  zeroText: {
    color: "#F4F6FB",
    fontSize: 32,
    textAlign: "left",
  },
  historyText: {
    color: "#505050",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "right",
  },
  resultText: {
    color: "#D0D8F2",
    fontSize: 50,
    marginBottom: 10,
    textAlign: "right",
    lineHeight: buttonDimension,
  },
  modeToggleContainer: {
    position: "absolute",
    flexDirection: "row",
    top: 30,
    width: "70%"
  },
  modeToggleButtonText: {
    color: "#F4F6FB",
    fontSize: 18,
    textAlign: "center",
  },
  modeToggleButton: {
    backgroundColor: "#3A5FCD20",
    borderColor: "#3A5FCD80",
    borderWidth: 2,
    padding: 8,
  },
  modeToggleActiveButton: {
    backgroundColor: "#3A5FCD80",
  },
  simpleModeToggleButton: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderRightWidth: 1,
    flex: 2,
  },
  advancedModeToggleButton: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderLeftWidth: 1,
    flex: 1,
  },
});

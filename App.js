import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Accelerometer } from "expo-sensors";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from "victory-native";

export default function App() {
  const [data, setData] = useState({});
  const [test_data, setTestData] = useState([]);

  useEffect(() => {
    _toggle();
  }, []);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const updateData = (accelerometerData) => {
    let _test = test_data;
    _test.push({
      x: new Date(Date.now()),
      y: round(accelerometerData.z),
    });
    setTestData(_test);
    setData(accelerometerData);
  };

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(
      (accelerometerData) => {
        updateData(accelerometerData);
      }
    );
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  let { x, y, z } = data;

  return (
    <View style={[styles.container]}>
      <Text style={styles.paragraph}>
        x: {round(x)} y: {round(y)} z: {round(z)}
      </Text>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          style={{
            data: { stroke: "blue" },
            parent: { border: "1px solid #ccc" },
          }}
          scale={{ x: "time" }}
          data={test_data}
        />
      </VictoryChart>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 40,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

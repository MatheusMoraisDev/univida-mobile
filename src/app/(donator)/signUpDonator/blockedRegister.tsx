import { theme } from "@/src/styles";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BlockedRegister = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>⚠️</Text>
      </View>

      <Text style={styles.title}>Você não está apto a doar!</Text>

      <Text style={styles.message}>
        analisando os seus dados coletados, infelizmente chegamos à conclusão de
        que você não deve realizar uma doação de sangue no momento.
      </Text>

      <Text style={styles.reason}>
        <Text style={styles.reasonLabel}>Motivo: </Text>
        peso inferior a 50kg
      </Text>

      <Text style={styles.footer}>Por favor, tente novamente em 3 meses!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    fontSize: 50,
    color: theme.colors.error,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  reason: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: 20,
  },
  reasonLabel: {
    fontWeight: "normal",
    color: "#555",
  },
  footer: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
});

export default BlockedRegister;

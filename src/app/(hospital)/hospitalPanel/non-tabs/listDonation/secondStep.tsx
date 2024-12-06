import React, { useContext, useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { DataTable } from "react-native-paper";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as XLSX from "xlsx";
import { FontAwesome } from "@expo/vector-icons";
import {
  Appointment,
  appointmentService,
} from "@/src/services/appointmentsService";
import { UserContext } from "@/src/contexts/userContext";
import { Container } from "@/src/components/atoms/container";
import { theme } from "@/src/styles";

export default function ViewDonators() {
  const [data, setData] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const router = useRouter();
  const { date } = useLocalSearchParams();
  const { userData } = useContext(UserContext);

  const fetchDonators = async () => {
    try {
      const response = await appointmentService.getAppointments({
        hospitalId: userData.user.referenceId,
        scheduledDate: date,
        page: currentPage,
        limit: itemsPerPage,
      });

      setData(response.items);
    } catch (error) {
      console.error("Erro ao buscar os doadores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonators();
  }, [date, currentPage]);

  const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
    const uint8Array = new Uint8Array(buffer);
    const binary = uint8Array.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      "",
    );
    return window.btoa(binary);
  };

  const exportToExcel = async () => {
    const sheetData = data.map((item) => ({
      Nome: `${item.donator.firstName} ${item.donator.lastName}`,
      CPF: item.donator.cpf,
      Data: item.scheduledDate,
      Hora: item.scheduledTime,
    }));

    const worksheet = XLSX.utils.json_to_sheet(sheetData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Doadores");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const base64Excel = arrayBufferToBase64(excelBuffer);

    const filePath = FileSystem.documentDirectory + "doadores.xlsx";

    try {
      await FileSystem.writeAsStringAsync(filePath, base64Excel, {
        encoding: FileSystem.EncodingType.Base64,
      });
      Sharing.shareAsync(filePath);
    } catch (error) {
      console.error("Erro ao salvar o arquivo:", error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Container>
      <TouchableOpacity onPress={exportToExcel} style={styles.button}>
        <FontAwesome
          name="file-excel-o"
          size={20}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Exportar para Excel</Text>
      </TouchableOpacity>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header style={styles.header}>
            <DataTable.Title textStyle={styles.headerText} style={styles.cell}>
              Nome
            </DataTable.Title>
            <DataTable.Title textStyle={styles.headerText} style={styles.cell}>
              CPF
            </DataTable.Title>
            <DataTable.Title textStyle={styles.headerText} style={styles.cell}>
              Data
            </DataTable.Title>
            <DataTable.Title textStyle={styles.headerText} style={styles.cell}>
              Hora
            </DataTable.Title>
          </DataTable.Header>

          {data.map((item) => (
            <DataTable.Row
              key={item.id}
              onPress={() =>
                router.push(`/hospitalPanel/donatorDetails/${item.donator.id}`)
              }
            >
              <DataTable.Cell style={styles.cell}>
                {item.donator.firstName} {item.donator.lastName}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                {item.donator.cpf}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                {item.scheduledDate}
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                {item.scheduledTime}
              </DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={currentPage - 1}
            numberOfPages={Math.ceil(data.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page + 1)}
            label={`${(currentPage - 1) * itemsPerPage + 1}-${currentPage * itemsPerPage} de ${data.length}`}
          />
        </DataTable>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    width: "100%",
    paddingVertical: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    backgroundColor: "red",
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cell: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 150,
    justifyContent: "center",
  },
});

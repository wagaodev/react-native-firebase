import React, { useState } from "react";
import { Alert } from "react-native";
import { v4 as uuid } from "uuid";
import firestore from "@react-native-firebase/firestore";

import { Container } from "./styles";
import { ButtonIcon, Input } from "..";

export default function FormBox() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleProductAdd = async () => {
    firestore()
      .collection("products")
      .doc(uuid())
      .set({
        description,
        quantity,
        done: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Produto adicionado com sucesso!");
      })
      .catch(() => {
        Alert.alert("Erro ao adicionar produto!");
      });
  };

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setDescription}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        onChangeText={(value) => setQuantity(Number(value))}
      />

      <ButtonIcon
        size="large"
        icon="add-shopping-cart"
        onPress={handleProductAdd}
      />
    </Container>
  );
}

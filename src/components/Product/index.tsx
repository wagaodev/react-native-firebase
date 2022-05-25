import React from "react";
import firestore from "@react-native-firebase/firestore";

import { ButtonIcon } from "..";
import { Container, Info, Title, Quantity, Options } from "./styles";
import { Alert } from "react-native";

export type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
};

type Props = {
  data: ProductProps;
};

export default function Product({ data }: Props) {
  const handleDoneToggle = () => {
    firestore().collection("products").doc(data.id).update({
      done: !data.done,
    });
  };

  const handleDelete = () => {
    if (firestore().collection("products").doc(data.id).delete()) {
      Alert.alert("Produto excluído com sucesso!");
    }
  };

  return (
    <Container>
      <Info>
        <Title done={data.done}>{data.description}</Title>

        <Quantity>Quantidade: {data.quantity}</Quantity>
      </Info>

      <Options>
        <ButtonIcon
          icon={data.done ? "undo" : "check"}
          onPress={handleDoneToggle}
        />

        <ButtonIcon icon="delete" color="alert" onPress={handleDelete} />
      </Options>
    </Container>
  );
}

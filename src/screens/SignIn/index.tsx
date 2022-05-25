import React, { useCallback, useState } from "react";

import { Container, Account, Title, Subtitle } from "./styles";
import { Button, Input, ButtonText } from "../../components";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { catchError } from "../../utils/firebaseErrors";

export function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const handleSignInAnonymous = useCallback(async () => {
    const { user } = await auth().signInAnonymously();

    console.log(user);
  }, []);

  const handleCreateAccount = () => {
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => Alert.alert("Usuário criado com sucesso"))
      .catch((error) => {
        catchError(error);
      });
  };

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />

      <Input
        placeholder="senha"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleSignInAnonymous} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleCreateAccount} />
        <ButtonText title="Criar minha conta" onPress={handleCreateAccount} />
      </Account>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>();

  useEffect(() => {
    const listener = firestore()
      .collection("products")
      // .where("quantity", ">", 2) // INFO: - Caso eu queira filtrar, posso utilizar o where para realizar este passo.
      // .limit(3) INFO: - Caso eu queira limitar a quantidade de produtos, posso utilizar o limit para realizar este passo.
      // .orderBy("quantity") INFO: - Caso eu precise ordenar, ele recebe dois parametros, o produto e a maneira de ordenação.
      // .startAt(1) INFO: - Assim consigo filtrar a quantidade que inicia
      // .endAt(11) INFO: - e a quantidade que termina baseado no valor passado no orderBy.
      .onSnapshot((querySnapShot) => {
        const data = querySnapShot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];
        setProducts(data);
      });

    return () => listener();
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}

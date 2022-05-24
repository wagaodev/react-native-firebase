import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import storage from "@react-native-firebase/storage";
import { Container, PhotoInfo } from "./styles";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { File, FileProps } from "../../components/File";

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([]);
  const [photoSelected, setPhotoSelected] = useState("");

  const handleShowImage = useCallback(async (path: string): Promise<void> => {
    const urlImage = await storage().ref(path).getDownloadURL();
    setPhotoSelected(urlImage);
  }, []);

  const handleDeleteImage = useCallback(async (path: string): Promise<void> => {
    storage()
      .ref(path)
      .delete()
      .then(() => {
        fetchInfo();
        Alert.alert("Imagem excluída com sucesso.");
      });
  }, []);

  const fetchInfo = useCallback(async () => {
    storage()
      .ref("images")
      .list()
      .then((result) => {
        const files: FileProps[] = [];
        result.items.forEach((file) => {
          files.push({
            name: file.name,
            path: file.fullPath,
          });
        });
        setPhotos(files);
      });
  }, []);

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photoSelected} />

      <PhotoInfo>Informações da foto</PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => handleDeleteImage(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
      />
    </Container>
  );
}

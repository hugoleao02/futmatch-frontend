import { useEffect, useState } from "react";
import { Jogador } from "../../../@types";
import { useToast } from "../../../hooks/useToast";
import { PerfilService } from "../../../infrastructure/services";

interface EditData {
  nome: string;
  posicao: string;
  citacao: string;
}

export const usePerfil = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [perfil, setPerfil] = useState<Jogador | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editData, setEditData] = useState<EditData>({
    nome: "",
    posicao: "",
    citacao: "",
  });

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const data = await PerfilService.obterPerfil();
      setPerfil((prev) =>
        prev
          ? {
              ...prev,
              ...data,
            }
          : data
      );

      setEditData({
        nome: data.nome || "",
        posicao: data.posicao || "",
        citacao: data.citacao || "",
      });
    } catch (error) {
      showToast("Erro ao carregar perfil", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSave = async () => {
    try {
      if (!perfil) return;

      const updatedPerfil = await PerfilService.atualizarPerfil({
        ...perfil,
        nome: editData.nome,
        posicao: editData.posicao,
        citacao: editData.citacao,
      });

      setPerfil(updatedPerfil);
      showToast("Perfil atualizado com sucesso", "success");
      setOpenEditDialog(false);
    } catch (error) {
      showToast("Erro ao atualizar perfil", "error");
    }
  };

  const getBadgeColor = (
    badge: string
  ): "error" | "success" | "info" | "default" => {
    switch (badge) {
      case "Artilheiro":
        return "error";
      case "MVP":
        return "success";
      case "Fair Play":
        return "info";
      default:
        return "default";
    }
  };

  return {
    loading,
    perfil,
    openEditDialog,
    editData,
    setEditData,
    setOpenEditDialog,
    handleEditSave,
    getBadgeColor,
  };
};

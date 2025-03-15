import { useState } from "react";
import { ConfiguracoesForm } from "../../../@types";
import { useThemeContext } from "../../../contexts/ThemeContext";
import { useToast } from "../../../hooks/useToast";
import { atualizarConfiguracoes } from "../../../infrastructure/services";

export const useConfiguracoes = () => {
  const { showToast } = useToast();
  const { mode: tema, setMode: setTema } = useThemeContext();
  const [loading, setLoading] = useState(false);
  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesForm>({
    receberNotificacoes: true,
    notificacoesEmail: true,
    notificacoesPush: true,
    perfilPublico: true,
    mostrarEstatisticas: true,
    mostrarHistoricoPartidas: true,
    posicao: "ATACANTE",
  });

  const handleChange = (field: keyof ConfiguracoesForm, value: any) => {
    setConfiguracoes((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTemaChange = (value: "light" | "dark" | "system") => {
    setTema(value);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await atualizarConfiguracoes(configuracoes);
      showToast("Configurações salvas com sucesso", "success");
    } catch (error) {
      showToast("Erro ao salvar configurações", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    configuracoes,
    tema,
    handleChange,
    handleTemaChange,
    handleSave,
  };
};

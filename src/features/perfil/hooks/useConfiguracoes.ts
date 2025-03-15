import { useEffect, useState } from "react";
import { PosicaoType } from "../../../@types/enums";
import { useToast } from "../../../hooks/useToast";
import { api } from "../../../infrastructure/api";

interface ConfiguracoesForm {
  receberNotificacoes: boolean;
  notificacoesEmail: boolean;
  notificacoesPush: boolean;
  perfilPublico: boolean;
  mostrarEstatisticas: boolean;
  mostrarHistoricoPartidas: boolean;
  posicaoPreferida: PosicaoType;
}

interface ConfiguracoesVisuais {
  tema: "light" | "dark" | "system";
}

export const useConfiguracoes = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesForm>({
    receberNotificacoes: true,
    notificacoesEmail: true,
    notificacoesPush: true,
    perfilPublico: true,
    mostrarEstatisticas: true,
    mostrarHistoricoPartidas: true,
    posicaoPreferida: "ATACANTE",
  });

  const [configuracoesVisuais, setConfiguracoesVisuais] =
    useState<ConfiguracoesVisuais>(() => {
      const temaSalvo = localStorage.getItem("tema");
      return {
        tema: (temaSalvo as "light" | "dark" | "system") || "system",
      };
    });

  useEffect(() => {
    carregarConfiguracoes();
  }, []);

  useEffect(() => {
    localStorage.setItem("tema", configuracoesVisuais.tema);
  }, [configuracoesVisuais.tema]);

  const carregarConfiguracoes = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/jogadores/configuracoes");
      setConfiguracoes(response.data);
    } catch (error) {
      showToast("Erro ao carregar configurações", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof ConfiguracoesForm, value: any) => {
    setConfiguracoes((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTemaChange = (value: "light" | "dark" | "system") => {
    setConfiguracoesVisuais((prev) => ({
      ...prev,
      tema: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await api.put("/api/jogadores/configuracoes", configuracoes);
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
    configuracoesVisuais,
    handleChange,
    handleTemaChange,
    handleSave,
  };
};

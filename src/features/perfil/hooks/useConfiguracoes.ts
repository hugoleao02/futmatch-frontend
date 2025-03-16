import { useState } from "react";
import { ConfiguracoesForm } from "../../../@types";
import { useThemeContext } from "../../../contexts/ThemeContext";
import { useToast } from "../../../hooks/useToast";

type SectionHandlers = {
  [K in keyof ConfiguracoesForm]?: () => Promise<void>;
};

export const useConfiguracoes = () => {
  const { showToast } = useToast();
  const { mode: tema, setMode: setTema } = useThemeContext();
  const [loading, setLoading] = useState(false);
  const [temaTemporal, setTemaTemporal] = useState<"light" | "dark" | "system">(
    tema
  );
  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesForm>({
    privacidade: {
      perfilPublico: true,
      mostrarEstatisticas: true,
      mostrarHistoricoPartidas: true,
    },
    notificacoes: {
      receberNotificacoes: true,
      notificacoesEmail: true,
      notificacoesPush: true,
    },
    preferencias: {
      posicao: "ATACANTE",
    },
    contato: {
      telefone: "",
      whatsapp: false,
      telegram: false,
      mostrarTelefone: false,
    },
    aparencia: {
      tema: tema,
    },
  });

  const sectionHandlers: SectionHandlers = {
    aparencia: async () => {
      setTema(temaTemporal);
    },
    notificacoes: async () => {},
    privacidade: async () => {
      // Lógica específica para privacidade
    },
    preferencias: async () => {
      // Lógica específica para preferências
    },
    contato: async () => {
      // Lógica específica para contato
    },
  };

  const handleChange = (
    section: keyof ConfiguracoesForm,
    field: string,
    value: any
  ) => {
    setConfiguracoes((prev: ConfiguracoesForm) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleTemaChange = (value: "light" | "dark" | "system") => {
    setTemaTemporal(value);
  };

  const handleSave = async (section?: keyof ConfiguracoesForm) => {
    try {
      setLoading(true);

      if (section) {
        const sectionHandler = sectionHandlers[section];
        if (sectionHandler) {
          await sectionHandler();
        }
      } else {
        // await ConfiguracoesService.salvarTudo(configuracoes);
      }

      showToast(
        section
          ? `${
              section.charAt(0).toUpperCase() + section.slice(1)
            } salva com sucesso`
          : "Configurações salvas com sucesso",
        "success"
      );
    } catch (error) {
      showToast(
        section ? `Erro ao salvar ${section}` : "Erro ao salvar configurações",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    configuracoes,
    tema: temaTemporal,
    handleChange,
    handleTemaChange,
    handleSave,
  };
};

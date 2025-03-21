import { useEffect, useState } from "react";
import { ConfiguracoesForm } from "../../../@types";
import { useThemeContext } from "../../../contexts/ThemeContext";
import { useToast } from "../../../hooks/useToast";
import { ConfiguracaoService } from "../../../infrastructure/services/ConfiguracaoService";

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

  useEffect(() => {
    carregarConfiguracoes();
  }, []);

  const carregarConfiguracoes = async () => {
    try {
      setLoading(true);
      const response = await ConfiguracaoService.buscarConfiguracao();

      setConfiguracoes({
        privacidade: {
          perfilPublico: response.perfilPublico,
          mostrarEstatisticas: response.mostrarEstatisticas,
          mostrarHistoricoPartidas: response.mostrarHistoricoPartidas,
        },
        notificacoes: {
          receberNotificacoes: response.receberNotificacoes,
          notificacoesEmail: response.notificacoesEmail,
          notificacoesPush: response.notificacoesPush,
        },
        preferencias: {
          posicao: response.posicao,
        },
        contato: {
          telefone: response.telefone || "",
          whatsapp: response.whatsapp || false,
          telegram: response.telegram || false,
          mostrarTelefone: response.mostrarTelefone || false,
        },
        aparencia: {
          tema: tema,
        },
      });
    } catch (error) {
      showToast("Erro ao carregar configurações", "error");
    } finally {
      setLoading(false);
    }
  };

  const sectionHandlers: SectionHandlers = {
    aparencia: async () => {
      setTema(temaTemporal);
    },
    notificacoes: async () => {
      await ConfiguracaoService.atualizarConfiguracao({
        notificacoes: configuracoes.notificacoes,
      });
    },
    privacidade: async () => {
      await ConfiguracaoService.atualizarConfiguracao({
        privacidade: configuracoes.privacidade,
      });
    },
    preferencias: async () => {
      await ConfiguracaoService.atualizarConfiguracao({
        preferencias: configuracoes.preferencias,
      });
    },
    contato: async () => {
      await ConfiguracaoService.atualizarConfiguracao({
        contato: configuracoes.contato,
      });
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
        await ConfiguracaoService.atualizarConfiguracao(configuracoes);
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

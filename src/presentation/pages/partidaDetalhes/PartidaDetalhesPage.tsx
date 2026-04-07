import {
  CalendarToday as CalendarTodayIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Group as GroupIcon,
  LocationOn as LocationOnIcon,
  Lock as LockIcon,
  PersonAdd as PersonAddIcon,
  Public as PublicIcon,
  Shuffle as ShuffleIcon,
  SportsSoccer as SportsSoccerIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { TipoPartida } from '../../../domain/enums/TipoPartida';
import { usePartidaDetalhes } from './hooks/usePartidaDetalhes';
import { usePartidaDetalhesAcoes } from './hooks/usePartidaDetalhesAcoes';
import { CancelDialog } from './components';
import { Header } from './components';
import { SortTeamsModal } from './components';
import { styles } from './styles';

export function PartidaDetalhesPage() {
  const { partida, loading, error, refresh } = usePartidaDetalhes();

  const {
    formatarDataHora,
    sortModalOpen,
    cancelDialogOpen,
    openSortModal,
    closeSortModal,
    openCancelDialog,
    closeCancelDialog,
    handleConfirmarPresenca,
    handleCancelarPresenca,
    handleSolicitarAcesso,
    handleAceitarSolicitacao,
    handleRecusarSolicitacao,
    handleSortearTimes,
  } = usePartidaDetalhesAcoes(refresh);

  if (loading) {
    return (
      <Box sx={styles.container}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !partida) {
    return (
      <Box sx={styles.container}>
        <Typography color="error">{error || 'Erro ao carregar detalhes da partida'}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Header
        isCriador={partida.isCriador}
        partidaId={String(partida.id)}
        onCancelarPartida={openCancelDialog}
      />

      <Box sx={styles.contentContainer}>
        <Paper elevation={3} sx={{ ...styles.paper, margin: '32px auto' }}>
          <Typography variant="h4" component="h1" sx={styles.matchTitle}>
            {partida.nome}
          </Typography>

          <Box sx={styles.chipContainer}>
            <Chip
              label={partida.tipoPartida === TipoPartida.PUBLICA ? 'PublICA' : 'Privada'}
              icon={partida.tipoPartida === TipoPartida.PUBLICA ? <PublicIcon /> : <LockIcon />}
              color={partida.tipoPartida === TipoPartida.PUBLICA ? 'primary' : 'error'}
              sx={styles.chip}
            />
            <Chip
              label={partida.esporte}
              icon={<SportsSoccerIcon />}
              color="default"
              sx={styles.chip}
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <Box sx={styles.infoItem}>
              <LocationOnIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body1">
                {partida.latitude?.toFixed(4)}, {partida.longitude?.toFixed(4)}
              </Typography>
            </Box>
            <Box sx={styles.infoItem}>
              <CalendarTodayIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body1">{formatarDataHora(partida.dataHora)}</Typography>
            </Box>
            <Box sx={{ ...styles.infoItem, gridColumn: { xs: '1', sm: '1 / -1' } }}>
              <GroupIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body1">
                Vagas: {partida.participantesConfirmados}/{partida.totalJogadores} (
                {partida.totalJogadores - partida.participantesConfirmados} restantes)
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" sx={styles.matchTitle}>
            Participantes ({partida.participantesConfirmados}/{partida.totalJogadores})
          </Typography>
          <List sx={styles.participantsList}>
            {partida.participantes.map(jogador => (
              <ListItem key={jogador.id} sx={styles.participantItem}>
                <ListItemAvatar>
                  <Avatar src={jogador.fotoPerfilUrl ?? undefined} alt={jogador.nome} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 'medium' }}>{jogador.nome}</Typography>}
                />
              </ListItem>
            ))}
          </List>

          {!partida.isCriador && (
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
              {partida.isParticipando ? (
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  onClick={() => handleCancelarPresenca(partida.id)}
                  startIcon={<CancelIcon />}
                  sx={styles.actionButton}
                >
                  Cancelar PreseNça
                </Button>
              ) : partida.hasSolicitado ? (
                <Button
                  variant="outlined"
                  color="info"
                  size="large"
                  disabled
                  sx={styles.actionButton}
                >
                  SoliCitação Enviada
                </Button>
              ) : partida.participantesConfirmados < partida.totalJogadores ? (
                partida.tipoPartida === TipoPartida.PUBLICA ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => handleConfirmarPresenca(partida.id)}
                    startIcon={<CheckCircleIcon />}
                    sx={styles.actionButton}
                  >
                    Confirmar PreseNça
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => handleSolicitarAcesso(partida.id)}
                    startIcon={<PersonAddIcon />}
                    sx={styles.actionButton}
                  >
                    Solicitar Acesso
                  </Button>
                )
              ) : (
                <Button
                  variant="outlined"
                  color="warning"
                  size="large"
                  disabled
                  sx={styles.actionButton}
                >
                  Vagas Esgotadas
                </Button>
              )}
            </Box>
          )}

          {partida.isCriador && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h5" sx={styles.matchTitle}>
                Gerenciar Partida
              </Typography>

              {partida.solicitacoes.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'medium', mb: 1, color: 'text.secondary' }}
                  >
                    SolicitaçOes de Acesso ({partida.solicitacoes.length})
                  </Typography>
                  <List sx={styles.requestsList}>
                    {partida.solicitacoes.map(solicitacao => (
                      <ListItem
                        key={solicitacao.id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar src={solicitacao.fotoPerfilUrl ?? undefined} alt={solicitacao.nome} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography sx={{ fontWeight: 'medium' }}>
                              {solicitacao.nome}
                            </Typography>
                          }
                        />
                        <Box>
                          <IconButton
                            edge="end"
                            aria-label="accept"
                            color="success"
                            onClick={() => handleAceitarSolicitacao(partida.id, solicitacao.id)}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="decline"
                            color="error"
                            onClick={() => handleRecusarSolicitacao(partida.id, solicitacao.id)}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => {
                  openSortModal();
                  handleSortearTimes();
                }}
                startIcon={<ShuffleIcon />}
                disabled={!partida.participantes || partida.participantes.length < 4}
                sx={styles.actionButton}
              >
                Sortear Times
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />
          <Typography variant="h5" sx={styles.matchTitle}>
            Chat da Partida
          </Typography>
          <Paper elevation={1} sx={styles.chatContainer}>
            <Typography variant="body2" color="text.secondary">
              [Placeholder: ARea de Chat ao vivo com Participantes]
            </Typography>
          </Paper>
        </Paper>
      </Box>

      <SortTeamsModal
        open={sortModalOpen}
        onClose={closeSortModal}
        onSort={() => handleSortearTimes()}
        maxTeams={Math.floor(partida.participantes.length / 2)}
      />

      <CancelDialog
        open={cancelDialogOpen}
        onClose={closeCancelDialog}
        onConfirm={openCancelDialog}
      />
    </Box>
  );
}

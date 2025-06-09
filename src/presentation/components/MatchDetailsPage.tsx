import type { Team } from '@domain/entities/Team';
import type { User } from '@domain/entities/User';
import { TipoPartida } from '@domain/enums/TipoPartida';
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
import { CancelDialog } from '../pages/MatchDetailsPage/components/CancelDialog';
import { Header } from '../pages/MatchDetailsPage/components/Header';
import { SortTeamsModal } from '../pages/MatchDetailsPage/components/SortTeamsModal';
import { styles } from '../pages/MatchDetailsPage/styles';
import { useMatchDetailsPageHandlers } from './useMatchDetailsPageHandlers';

export function MatchDetailsPage() {
  const {
    formatarDataHora,
    handleOpenSortModal,
    handleCloseSortModal,
    handleOpenCancelDialog,
    handleCloseCancelDialog,
    handleConfirmarCancelamento,
    openSortModal,
    openCancelDialog,
    partida,
    loading,
    error,
    handleConfirmarPresenca,
    handleCancelarPresenca,
    handleSolicitarAcesso,
    handleAceitarSolicitacao,
    handleRecusarSolicitacao,
    handleSortearTimes,
  } = useMatchDetailsPageHandlers();

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
        isCriador={partida.isCriador ?? false}
        partidaId={partida.id}
        onCancelarPartida={handleOpenCancelDialog}
      />

      <Box sx={styles.contentContainer}>
        <Paper elevation={3} sx={{ ...styles.paper, margin: '32px auto' }}>
          <Typography variant="h4" component="h1" sx={styles.matchTitle}>
            {partida.nome}
          </Typography>

          <Box sx={styles.chipContainer}>
            <Chip
              label={partida.tipoPartida === TipoPartida.PUBLICA ? 'Pública' : 'Privada'}
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
                {partida?.latitude}, {partida?.longitude}
              </Typography>
            </Box>
            <Box sx={styles.infoItem}>
              <CalendarTodayIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body1">
                {partida?.dataHora ? formatarDataHora(partida.dataHora) : ''}
              </Typography>
            </Box>
            <Box sx={{ ...styles.infoItem, gridColumn: { xs: '1', sm: '1 / -1' } }}>
              <GroupIcon color="action" sx={{ mr: 1 }} />
              <Typography variant="body1">
                Vagas: {partida?.participantesConfirmados || 0}/{partida?.totalJogadores || 0} (
                {(partida?.totalJogadores || 0) - (partida?.participantesConfirmados || 0)}{' '}
                restantes)
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h5" sx={styles.matchTitle}>
            Participantes ({partida?.participantesConfirmados || 0}/{partida?.totalJogadores || 0})
          </Typography>
          <List sx={styles.participantsList}>
            {partida?.participantes?.map((jogador: User) => (
              <ListItem key={jogador.id} sx={styles.participantItem}>
                <ListItemAvatar>
                  <Avatar src={jogador.avatar} alt={jogador.nome} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 'medium' }}>{jogador.nome}</Typography>}
                />
              </ListItem>
            ))}
          </List>

          {!partida?.isCriador && (
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
              {partida?.isParticipando ? (
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  onClick={handleCancelarPresenca}
                  startIcon={<CancelIcon />}
                  sx={styles.actionButton}
                >
                  Cancelar Presença
                </Button>
              ) : partida?.hasSolicitado ? (
                <Button
                  variant="outlined"
                  color="info"
                  size="large"
                  disabled
                  sx={styles.actionButton}
                >
                  Solicitação Enviada
                </Button>
              ) : partida?.participantesConfirmados < partida?.totalJogadores ? (
                partida?.tipoPartida === TipoPartida.PUBLICA ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleConfirmarPresenca}
                    startIcon={<CheckCircleIcon />}
                    sx={styles.actionButton}
                  >
                    Confirmar Presença
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleSolicitarAcesso}
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

              {partida?.solicitacoes && partida.solicitacoes.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'medium', mb: 1, color: 'text.secondary' }}
                  >
                    Solicitações de Acesso ({partida.solicitacoes.length})
                  </Typography>
                  <List sx={styles.requestsList}>
                    {partida.solicitacoes.map((solicitacao: User) => (
                      <ListItem
                        key={solicitacao.id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar src={solicitacao.avatar} alt={solicitacao.nome} />
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
                            onClick={() => handleAceitarSolicitacao(solicitacao.id)}
                          >
                            <CheckCircleIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="decline"
                            color="error"
                            onClick={() => handleRecusarSolicitacao(solicitacao.id)}
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
                onClick={handleOpenSortModal}
                startIcon={<ShuffleIcon />}
                disabled={
                  !partida?.participantes ||
                  partida.participantes.length < 4 ||
                  partida.times !== null
                }
                sx={styles.actionButton}
              >
                Sortear Times
              </Button>

              {partida?.times && (
                <Box sx={styles.teamsContainer}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 'bold', mb: 2, color: '#333', textAlign: 'center' }}
                  >
                    Times Sorteados!
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                      gap: 2,
                    }}
                  >
                    {partida.times.map((time: Team, index: number) => (
                      <Box key={index}>
                        <Paper elevation={1} sx={styles.teamPaper}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}
                          >
                            {time.nome}
                          </Typography>
                          <List dense>
                            {time.jogadores.map((jogador: User) => (
                              <ListItem key={jogador.id}>
                                <ListItemAvatar>
                                  <Avatar src={jogador.avatar} />
                                </ListItemAvatar>
                                <ListItemText primary={jogador.nome} />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          )}

          <Divider sx={{ my: 3 }} />
          <Typography variant="h5" sx={styles.matchTitle}>
            Chat da Partida
          </Typography>
          <Paper elevation={1} sx={styles.chatContainer}>
            <Typography variant="body2" color="text.secondary">
              [Placeholder: Área de Chat ao vivo com Participantes]
            </Typography>
          </Paper>
        </Paper>
      </Box>

      <SortTeamsModal
        open={openSortModal}
        onClose={handleCloseSortModal}
        onSort={handleSortearTimes}
        maxTeams={Math.floor((partida.participantes?.length || 0) / 2)}
      />

      <CancelDialog
        open={openCancelDialog}
        onClose={handleCloseCancelDialog}
        onConfirm={handleConfirmarCancelamento}
      />
    </Box>
  );
}

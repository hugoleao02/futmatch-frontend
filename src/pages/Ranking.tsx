import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tabs,
  Tab,
  useTheme,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupsIcon from "@mui/icons-material/Groups";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import InfoIcon from "@mui/icons-material/Info";

// Dados mockados dos jogadores
const mockPlayers = [
  {
    id: 1,
    name: "João Silva",
    avatar: "",
    position: "Atacante",
    level: 8,
    matches: 45,
    wins: 32,
    goals: 67,
    fairPlay: 95,
    streak: 5,
    badges: ["Artilheiro", "MVP", "Fair Play"],
  },
  {
    id: 2,
    name: "Pedro Santos",
    avatar: "",
    position: "Meio-Campo",
    level: 7,
    matches: 38,
    wins: 25,
    goals: 28,
    fairPlay: 92,
    streak: 3,
    badges: ["Playmaker", "Fair Play"],
  },
  {
    id: 3,
    name: "Carlos Oliveira",
    avatar: "",
    position: "Zagueiro",
    level: 7,
    matches: 42,
    wins: 30,
    goals: 5,
    fairPlay: 88,
    streak: 4,
    badges: ["Muralha", "Líder"],
  },
  {
    id: 4,
    name: "Lucas Mendes",
    avatar: "",
    position: "Goleiro",
    level: 6,
    matches: 35,
    wins: 22,
    goals: 0,
    fairPlay: 90,
    streak: 2,
    badges: ["Paredão"],
  },
  {
    id: 5,
    name: "Rafael Costa",
    avatar: "",
    position: "Atacante",
    level: 6,
    matches: 30,
    wins: 18,
    goals: 35,
    fairPlay: 85,
    streak: 0,
    badges: ["Artilheiro"],
  },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`ranking-tabpanel-${index}`}
      aria-labelledby={`ranking-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const Ranking: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getBadgeColor = (
    badge: string
  ): "success" | "error" | "info" | "warning" | "secondary" => {
    switch (badge) {
      case "Artilheiro":
        return "error";
      case "MVP":
        return "success";
      case "Fair Play":
        return "info";
      case "Líder":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getPositionColor = (position: number): string => {
    switch (position) {
      case 1:
        return "#FFD700"; // Ouro
      case 2:
        return "#C0C0C0"; // Prata
      case 3:
        return "#CD7F32"; // Bronze
      default:
        return theme.palette.text.secondary;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Ranking de Jogadores
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          gutterBottom
        >
          Confira os melhores jogadores da plataforma
        </Typography>
      </Box>

      {/* Top 3 Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {mockPlayers.slice(0, 3).map((player, index) => (
          <Grid item xs={12} md={4} key={player.id}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                transform: index === 0 ? "scale(1.05)" : "none",
                background: `linear-gradient(135deg, ${
                  index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : "#CD7F32"
                }15, transparent)`,
                borderColor: "divider",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-8px)",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                }}
              >
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: getPositionColor(index + 1),
                    border: "4px solid white",
                    boxShadow: theme.shadows[3],
                  }}
                >
                  {index === 0 ? (
                    <EmojiEventsIcon fontSize="large" />
                  ) : index === 1 ? (
                    <StarIcon fontSize="large" />
                  ) : (
                    <MilitaryTechIcon fontSize="large" />
                  )}
                </Avatar>
              </Box>

              <CardContent sx={{ pt: 5, textAlign: "center" }}>
                <Typography variant="h6" gutterBottom>
                  {index + 1}º Lugar
                </Typography>
                <Avatar
                  src={player.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 2,
                    border: "3px solid",
                    borderColor: getPositionColor(index + 1),
                  }}
                >
                  {player.name.charAt(0)}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {player.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {player.position}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6">{player.matches}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Partidas
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6">{player.goals}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Gols
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6">{player.level}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Nível
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {player.badges.map((badge) => (
                    <Chip
                      key={badge}
                      label={badge}
                      size="small"
                      color={getBadgeColor(badge) as any}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs de Classificação */}
      <Paper elevation={3} sx={{ borderRadius: 3, mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="ranking tabs"
            variant="fullWidth"
          >
            <Tab
              icon={<EmojiEventsIcon />}
              label="Classificação Geral"
              id="ranking-tab-0"
            />
            <Tab
              icon={<SportsSoccerIcon />}
              label="Artilheiros"
              id="ranking-tab-1"
            />
            <Tab icon={<StarIcon />} label="Fair Play" id="ranking-tab-2" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Posição</TableCell>
                  <TableCell>Jogador</TableCell>
                  <TableCell align="center">Nível</TableCell>
                  <TableCell align="center">Partidas</TableCell>
                  <TableCell align="center">Vitórias</TableCell>
                  <TableCell align="center">Gols</TableCell>
                  <TableCell align="center">Fair Play</TableCell>
                  <TableCell align="center">Conquistas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockPlayers.map((player, index) => (
                  <TableRow
                    key={player.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      bgcolor:
                        index < 3
                          ? `${getPositionColor(index + 1)}10`
                          : "transparent",
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: getPositionColor(index + 1),
                          fontWeight: "bold",
                        }}
                      >
                        {index + 1}º
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={player.avatar}
                          sx={{ width: 32, height: 32, mr: 1 }}
                        >
                          {player.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2">{player.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {player.position}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={`Nível ${player.level}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="center">{player.matches}</TableCell>
                    <TableCell align="center">{player.wins}</TableCell>
                    <TableCell align="center">{player.goals}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LinearProgress
                          variant="determinate"
                          value={player.fairPlay}
                          sx={{
                            width: 100,
                            mr: 1,
                            height: 8,
                            borderRadius: 4,
                          }}
                        />
                        <Typography variant="body2">
                          {player.fairPlay}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 0.5,
                          justifyContent: "center",
                        }}
                      >
                        {player.badges.map((badge) => (
                          <Tooltip key={badge} title={badge}>
                            <IconButton
                              size="small"
                              sx={{
                                color: theme.palette[getBadgeColor(badge)].main,
                              }}
                            >
                              {badge === "Artilheiro" ? (
                                <SportsSoccerIcon fontSize="small" />
                              ) : badge === "MVP" ? (
                                <StarIcon fontSize="small" />
                              ) : badge === "Fair Play" ? (
                                <GroupsIcon fontSize="small" />
                              ) : badge === "Muralha" || badge === "Paredão" ? (
                                <WhatshotIcon fontSize="small" />
                              ) : (
                                <InfoIcon fontSize="small" />
                              )}
                            </IconButton>
                          </Tooltip>
                        ))}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Posição</TableCell>
                  <TableCell>Jogador</TableCell>
                  <TableCell align="center">Gols</TableCell>
                  <TableCell align="center">Média p/ Jogo</TableCell>
                  <TableCell align="center">Partidas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockPlayers
                  .sort((a, b) => b.goals - a.goals)
                  .map((player, index) => (
                    <TableRow
                      key={player.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        bgcolor:
                          index < 3
                            ? `${getPositionColor(index + 1)}10`
                            : "transparent",
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: getPositionColor(index + 1),
                            fontWeight: "bold",
                          }}
                        >
                          {index + 1}º
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={player.avatar}
                            sx={{ width: 32, height: 32, mr: 1 }}
                          >
                            {player.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2">
                              {player.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {player.position}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {player.goals}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        {(player.goals / player.matches).toFixed(2)}
                      </TableCell>
                      <TableCell align="center">{player.matches}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Posição</TableCell>
                  <TableCell>Jogador</TableCell>
                  <TableCell align="center">Fair Play</TableCell>
                  <TableCell align="center">Sequência</TableCell>
                  <TableCell align="center">Partidas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockPlayers
                  .sort((a, b) => b.fairPlay - a.fairPlay)
                  .map((player, index) => (
                    <TableRow
                      key={player.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        bgcolor:
                          index < 3
                            ? `${getPositionColor(index + 1)}10`
                            : "transparent",
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            color: getPositionColor(index + 1),
                            fontWeight: "bold",
                          }}
                        >
                          {index + 1}º
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={player.avatar}
                            sx={{ width: 32, height: 32, mr: 1 }}
                          >
                            {player.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2">
                              {player.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {player.position}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <LinearProgress
                            variant="determinate"
                            value={player.fairPlay}
                            sx={{
                              width: 100,
                              mr: 1,
                              height: 8,
                              borderRadius: 4,
                            }}
                          />
                          <Typography variant="body2">
                            {player.fairPlay}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`${player.streak} partidas`}
                          size="small"
                          color={
                            player.streak >= 5
                              ? "success"
                              : player.streak >= 3
                              ? "warning"
                              : "default"
                          }
                        />
                      </TableCell>
                      <TableCell align="center">{player.matches}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Ranking;

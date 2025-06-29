export const partidaCardStyles = {
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    mb: 2,
  },
  title: {
    fontWeight: 'bold',
  },
  infoContainer: {
    mb: 2,
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    mb: 1,
    '&:last-child': {
      mb: 0,
    },
  },
  icon: {
    mr: 1,
    fontSize: 16,
  },
  cardActions: {
    p: 2,
    pt: 0,
  },
  detailsButton: {
    mr: 1,
  },
} as const;

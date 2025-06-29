export const homePageStyles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  container: {
    mt: 4,
    mb: 4,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 4,
  },
  title: {
    // Estilos para o título principal
  },
  emptyState: {
    textAlign: 'center',
    py: 8,
  },
  emptyStateTitle: {
    color: 'text.secondary',
  },
  emptyStateButton: {
    mt: 2,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: 'repeat(2, 1fr)',
      md: 'repeat(3, 1fr)',
    },
    gap: 3,
  },
  loadMoreContainer: {
    display: 'flex',
    justifyContent: 'center',
    mt: 4,
  },
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
} as const;

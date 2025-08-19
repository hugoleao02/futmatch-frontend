export const formStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  width: '100%',
  maxWidth: 400,
} as const;

export const titleStyles = {
  textAlign: 'center',
  mb: 3,
  fontWeight: 'bold',
  color: 'primary.main',
} as const;

export const textFieldStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
  },
} as const;

export const submitButtonStyles = {
  mt: 2,
  py: 1.5,
  borderRadius: 2,
  fontWeight: 'bold',
  fontSize: '1.1rem',
} as const;

export const loginLinkStyles = {
  textAlign: 'center',
  mt: 2,
} as const;

export const linkStyles = {
  color: 'primary.main',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
} as const;



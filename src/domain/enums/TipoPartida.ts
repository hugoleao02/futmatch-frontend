export enum TipoPartida {
  PUBLICA = 'PUBLICA',
  PRIVADA = 'PRIVADA',
}

export const tipoPartidaOptions: { value: TipoPartida; label: string }[] = Object.values(
  TipoPartida,
).map(value => ({
  value,
  label: value.charAt(0) + value.slice(1).toLowerCase(),
}));

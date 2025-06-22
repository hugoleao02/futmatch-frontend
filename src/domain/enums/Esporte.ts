export enum Esporte {
  FUTEBOL = 'FUTEBOL',
  FUTSAL = 'FUTSAL',
  SOCIETY = 'SOCIETY',
}

export const esporteOptions: { value: Esporte; label: string }[] = Object.values(Esporte).map(
  value => ({
    value,
    label: value.charAt(0) + value.slice(1).toLowerCase(),
  }),
);

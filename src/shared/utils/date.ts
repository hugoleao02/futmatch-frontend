// Formatação de datas
export const formatDate = (date: Date | string, format = 'dd/MM/yyyy'): string => {
  const dateObj = new Date(date);

  const formatters: Record<string, string> = {
    dd: dateObj.getDate().toString().padStart(2, '0'),
    MM: (dateObj.getMonth() + 1).toString().padStart(2, '0'),
    yyyy: dateObj.getFullYear().toString(),
    yy: dateObj.getFullYear().toString().slice(-2),
    HH: dateObj.getHours().toString().padStart(2, '0'),
    mm: dateObj.getMinutes().toString().padStart(2, '0'),
    ss: dateObj.getSeconds().toString().padStart(2, '0'),
  };

  return format.replace(/dd|MM|yyyy|yy|HH|mm|ss/g, match => formatters[match]);
};

export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
};

export const formatTime = (date: Date | string): string => {
  return formatDate(date, 'HH:mm');
};

// Formatação relativa
export const formatRelativeTime = (date: Date | string, locale = 'pt-BR'): string => {
  const dateObj = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffInSeconds < 60) {
    return formatter.format(-diffInSeconds, 'second');
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return formatter.format(-diffInMinutes, 'minute');
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return formatter.format(-diffInHours, 'hour');
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return formatter.format(-diffInDays, 'day');
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return formatter.format(-diffInMonths, 'month');
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return formatter.format(-diffInYears, 'year');
};

// Utilidades de data
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

export const addYears = (date: Date, years: number): Date => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

export const startOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

export const endOfDay = (date: Date): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};

export const startOfWeek = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() - day;
  result.setDate(diff);
  return startOfDay(result);
};

export const endOfWeek = (date: Date): Date => {
  const result = new Date(date);
  const day = result.getDay();
  const diff = result.getDate() - day + 6;
  result.setDate(diff);
  return endOfDay(result);
};

export const startOfMonth = (date: Date): Date => {
  const result = new Date(date);
  result.setDate(1);
  return startOfDay(result);
};

export const endOfMonth = (date: Date): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1, 0);
  return endOfDay(result);
};

// Comparações de data
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return startOfDay(date1).getTime() === startOfDay(date2).getTime();
};

export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

export const isYesterday = (date: Date): boolean => {
  const yesterday = addDays(new Date(), -1);
  return isSameDay(date, yesterday);
};

export const isTomorrow = (date: Date): boolean => {
  const tomorrow = addDays(new Date(), 1);
  return isSameDay(date, tomorrow);
};

export const isThisWeek = (date: Date): boolean => {
  const now = new Date();
  const weekStart = startOfWeek(now);
  const weekEnd = endOfWeek(now);
  return date >= weekStart && date <= weekEnd;
};

export const isThisMonth = (date: Date): boolean => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  return date >= monthStart && date <= monthEnd;
};

// Cálculos de idade
export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

// Parsing de datas
export const parseDate = (dateString: string, format = 'dd/MM/yyyy'): Date | null => {
  const formatParts = format.split(/[^a-zA-Z]/);
  const dateParts = dateString.split(/[^0-9]/);

  if (formatParts.length !== dateParts.length) return null;

  const dateMap: Record<string, number> = {};
  formatParts.forEach((part, index) => {
    dateMap[part] = parseInt(dateParts[index], 10);
  });

  const year = dateMap.yyyy || dateMap.yy + 2000;
  const month = dateMap.MM - 1; // Month is 0-indexed
  const day = dateMap.dd;

  const date = new Date(year, month, day);

  // Validate the date
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null;
  }

  return date;
};

import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';
import { z } from 'zod';

export function useZodForm<T extends FieldValues>(
  schema: z.ZodType<T>,
  options?: Omit<UseFormProps<T>, 'resolver'>,
) {
  return useForm<T>({
    ...options,
    resolver: zodResolver(schema),
  });
}

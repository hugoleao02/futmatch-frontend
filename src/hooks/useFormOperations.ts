import type { FormikValues } from 'formik';
import { useFormik } from 'formik';
import { useCallback } from 'react';
import * as Yup from 'yup';
import { useServiceOperations } from './useServiceOperations';

export interface FormOperationsConfig<T extends FormikValues, R> {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<T>;
  onSubmit: (values: T) => Promise<R>;
  onSuccess?: (response: R, values: T) => void;
  onError?: (error: unknown, values: T) => void;
  errorContext?: string;
}

export const useFormOperations = <T extends FormikValues, R>(
  config: FormOperationsConfig<T, R>,
) => {
  const { executeOperation, loading } = useServiceOperations<R>();

  const {
    initialValues,
    validationSchema,
    onSubmit,
    onSuccess,
    onError,
    errorContext = 'Formulário',
  } = config;

  const formik = useFormik<T>({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await executeOperation(() => onSubmit(values), errorContext);

        onSuccess?.(response, values);

        // Resetar formulário em caso de sucesso
        resetForm();

        return response;
      } catch (error) {
        onError?.(error, values);
        throw error;
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSubmit = useCallback(async (): Promise<R> => {
    return formik.submitForm();
  }, [formik]);

  const resetForm = useCallback(() => {
    formik.resetForm();
  }, [formik]);

  const setFieldValue = useCallback(
    (field: keyof T, value: any) => {
      formik.setFieldValue(field as string, value);
    },
    [formik],
  );

  const setFieldError = useCallback(
    (field: keyof T, message: string) => {
      formik.setFieldError(field as string, message);
    },
    [formik],
  );

  return {
    formik,
    loading,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    isValid: formik.isValid,
    isSubmitting: formik.isSubmitting,
    values: formik.values,
    errors: formik.errors,
    touched: formik.touched,
  };
};

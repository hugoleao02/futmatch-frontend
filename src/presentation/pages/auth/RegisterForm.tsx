import { userSchema, type UserFormData } from '@/core/validations/userSchema';
import { Button } from '@/shared/components/forms/Button';
import { TextField } from '@/shared/components/forms/TextField';
import { Icon } from '@/shared/components/Icon';
import { useZodForm } from '@/shared/hooks/useZodForm';

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useZodForm<UserFormData>(userSchema);

  const onSubmit = async (data: UserFormData) => {
    try {
      // Aqui você implementaria a lógica de registro
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField
        label="Nome"
        {...register('name')}
        error={errors.name?.message}
        leftIcon={<Icon name="user" size={20} color="#6B7280" />}
      />

      <TextField
        label="E-mail"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        leftIcon={<Icon name="user" size={20} color="#6B7280" />}
      />

      <TextField
        label="Senha"
        type="password"
        {...register('password')}
        error={errors.password?.message}
        leftIcon={<Icon name="user" size={20} color="#6B7280" />}
      />

      <TextField
        label="Confirmar Senha"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
        leftIcon={<Icon name="user" size={20} color="#6B7280" />}
      />

      <Button type="submit" isLoading={isSubmitting} className="w-full">
        Registrar
      </Button>
    </form>
  );
}

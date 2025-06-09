import { useState } from 'react';
import { useLoginForm } from '../hooks/useLoginForm';
import { styles } from '../styles/LoginForm.styles';

interface LoginFormProps {
  onToggleMode: () => void;
}

export function LoginForm({ onToggleMode }: LoginFormProps) {
  const { formData, handleChange, handleSubmit, isLoading, error } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Bem-vindo de volta!</h2>

      {error && <div className={styles.error}>{error}</div>}

      {/* Campo de Email */}
      <div>
        <label htmlFor="login-email" className="sr-only">
          Seu e-mail
        </label>
        <input
          id="login-email"
          type="email"
          name="email"
          placeholder="Seu e-mail"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      {/* Campo de Senha */}
      <div className="relative">
        <label htmlFor="login-password" className="sr-only">
          Sua senha
        </label>
        <input
          id="login-password"
          type={showPassword ? 'text' : 'password'}
          name="senha"
          placeholder="Sua senha"
          value={formData.senha}
          onChange={handleChange}
          className={`${styles.input} pr-12`}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={styles.passwordToggle}
          aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-eye-off"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.54 18.54 0 0 1 2.23-4.01M15 12a3 3 0 1 1-6 0M1 1l22 22"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-eye"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          )}
        </button>
      </div>

      <a href="#" className={styles.forgotPassword}>
        Esqueci minha senha
      </a>

      {/* Botão de Entrar */}
      <button type="submit" className={styles.submitButton} disabled={isLoading}>
        {isLoading ? (
          <svg
            className="animate-spin h-7 w-7 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          'Entrar'
        )}
      </button>

      <p className={styles.registerText}>
        Não tem uma conta?{' '}
        <button type="button" onClick={onToggleMode} className={styles.registerLink}>
          Cadastre-se
        </button>
      </p>
    </form>
  );
}

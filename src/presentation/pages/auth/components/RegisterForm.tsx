import { useState } from 'react';
import { useRegisterForm } from '../hooks/useRegisterForm';
import { styles } from '../styles/RegisterForm.styles';

interface RegisterFormProps {
  onToggleMode: () => void;
}

export function RegisterForm({ onToggleMode }: RegisterFormProps) {
  const { formData, handleChange, handleSubmit, isLoading, error } = useRegisterForm();
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Crie sua conta</h2>

      {error && <div className={styles.error}>{error}</div>}

      {/* Campo de Nome */}
      <div>
        <label htmlFor="register-name" className="sr-only">
          Seu nome ou apelido
        </label>
        <input
          id="register-name"
          type="text"
          name="nome"
          placeholder="Seu nome ou apelido (visível para outros)"
          value={formData.nome}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      {/* Campo de Email */}
      <div>
        <label htmlFor="register-email" className="sr-only">
          Seu melhor e-mail
        </label>
        <input
          id="register-email"
          type="email"
          name="email"
          placeholder="Seu melhor e-mail"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      {/* Campo de Senha */}
      <div className="relative">
        <label htmlFor="register-password" className="sr-only">
          Crie uma senha
        </label>
        <input
          id="register-password"
          type={showPassword ? 'text' : 'password'}
          name="senha"
          placeholder="Crie uma senha"
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

      {/* Campo de Confirmar Senha */}
      <div>
        <label htmlFor="confirm-password" className="sr-only">
          Confirme sua senha
        </label>
        <input
          id="confirm-password"
          type="password"
          name="confirmarSenha"
          placeholder="Confirme sua senha"
          value={formData.confirmarSenha}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      {/* Checkbox de Termos de Serviço */}
      <div className={styles.termsContainer}>
        <input
          id="terms-checkbox"
          type="checkbox"
          checked={termsAccepted}
          onChange={e => setTermsAccepted(e.target.checked)}
          className={styles.termsCheckbox}
          required
        />
        <label htmlFor="terms-checkbox" className={styles.termsLabel}>
          Li e aceito os{' '}
          <a href="#" className={styles.termsLink}>
            Termos de Serviço
          </a>{' '}
          e a{' '}
          <a href="#" className={styles.termsLink}>
            Política de Privacidade
          </a>
          .
        </label>
      </div>

      {/* Botão de Cadastrar */}
      <button type="submit" className={styles.submitButton} disabled={isLoading || !termsAccepted}>
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
          'Cadastrar'
        )}
      </button>

      {/* Separador */}
      <div className={styles.separator}>
        <div className={styles.separatorLine}></div>
        <span className={styles.separatorText}>Ou cadastre-se com</span>
        <div className={styles.separatorLine}></div>
      </div>

      {/* Opções de Cadastro Social */}
      <div className={styles.socialButtons}>
        <button type="button" className={styles.socialButton}>
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google"
            className="w-8 h-8"
          />
          Continuar com Google
        </button>
        <button type="button" className={styles.socialButton}>
          <img
            src="https://img.icons8.com/color/48/000000/facebook-new.png"
            alt="Facebook"
            className="w-8 h-8"
          />
          Continuar com Facebook
        </button>
      </div>

      <p className={styles.loginText}>
        Já tem uma conta?{' '}
        <button type="button" onClick={onToggleMode} className={styles.loginLink}>
          Faça Login
        </button>
      </p>
    </form>
  );
}

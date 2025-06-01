import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';

export function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-[#18232e]/95 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-cyan-400/40">
        <h2 className="text-cyan-200 text-2xl font-semibold mb-6 text-center">Registrar</h2>
        <form>
          <Input label="Nome" type="text" required />
          <Input label="E-mail" type="email" required />
          <Input label="Senha" type="password" required />
          <Input label="Confirmar Senha" type="password" required />
          <Button type="submit">Registrar</Button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="text-cyan-300 hover:underline">Já tem conta? Entrar</Link>
        </div>
      </div>
    </div>
  );
} 
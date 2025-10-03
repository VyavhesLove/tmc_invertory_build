import { LoginForm } from "@/components/LoginForm";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  return <LoginForm onLogin={onLogin} />;
}

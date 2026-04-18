import { LoginCard } from "@/components/auth/login-card";

// Unified login — role detect via email heuristic, redirects to /admin/* or /dashboard.
export default function LoginPage() {
  return <LoginCard />;
}

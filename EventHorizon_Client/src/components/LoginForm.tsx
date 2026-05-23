import { useState } from "react";
import { useNavigate } from "react-router";

interface LoginResponse {
    token: string;
    message: string;
}

const loginUrl = "/EventHorizon_API/api/Auth";

export default function LoginForm() {
    let navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogin = async (e: React.SubmitEvent) => {

        e.preventDefault();
        setIsLoading(true);

        const userLogin = {
            Email: email,
            LoginPassword: password
        };

        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userLogin)
            });

            const data: LoginResponse = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert(data.message);
                navigate("dashboard");
            } else {
                alert(data.message || 'Falha ao realizar o login.');
            }
        } catch (error) {
            console.error('Erro na requisição de login:', error);
            alert('Houve um erro ao conectar com o servidor.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleLogin}
            className="h-100 d-flex flex-column justify-content-around">

            <input
                type="email"
                placeholder="Email"
                id="loginEmail"
                className="bg-transparent border-0 border-bottom"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
            />

            <div className="w-100">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Senha"
                    id="loginPassword"
                    className="bg-transparent border-0 border-bottom w-100"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                />

                <div className="form-check mt-3">
                    <input className="form-check-input" type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label className="form-check-label" htmlFor="showPassword">
                        Mostrar senha
                    </label>
                </div>
            </div>

            <button
                type="submit"
                className="w-50 align-self-center"
                disabled={isLoading}
            >
                {isLoading ? 'Entrando...' : 'Login'}
            </button>
        </form>
    );
}
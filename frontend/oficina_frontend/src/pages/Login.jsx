import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import skullLogo from "@/assets/skull-logo.png";
import { EmberCanvas } from "@/components/garage/EmberCanvas";
import { Button, Input } from "@/components/garage/ui";
import { Reveal } from "@/components/garage/motion";
import { useAuth } from "@/lib/garage-store";


export default function Login() {
    const { user, ready, login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("admin@oficina.com");
    const [senha, setSenha] = useState("12345678");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    useEffect(() => {
        if (ready && user) {
            navigate("/dashboard");
        }
    }, [ready, user, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!email.includes("@") || senha.length < 4) {
            setErro(
                "Informe um e-mail válido e uma senha com pelo menos 4 caracteres."
            );
            return;
        }

        setErro("");
        setLoading(true);

        try {
            await login(email, senha);
            navigate("/dashboard");
        } catch (error) {
            const apiMessage = error.response?.data?.message;
            setErro(
                apiMessage ??
                    (error.code === "ERR_NETWORK"
                        ? "Nao foi possivel conectar a API. Confira se o backend esta rodando na porta 3000."
                        : "Nao foi possivel entrar. Tente novamente em instantes."),
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grain relative min-h-screen bg-ink">
            <EmberCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,color-mix(in_oklab,var(--burnt-red)_18%,transparent),transparent_60%)]" />

            <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 lg:grid-cols-2">
                <Reveal className="text-center lg:text-left">
                    <img
                        src={skullLogo}
                        alt="Hot Garage Skull Crew"
                        width={1024}
                        height={1024}
                        className="mx-auto h-56 w-56 object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.6)] sm:h-72 sm:w-72 lg:mx-0"
                    />

                    <h1 className="heading mt-6 text-5xl text-bone sm:text-6xl">
                        Hot Garage
                    </h1>

                    <p className="heading text-2xl tracking-[0.35em] text-burnt-red">
                        Skull Crew
                    </p>

                    <p className="stencil mt-4 text-steel">
                        Custom · Repair · Performance · Detailing
                    </p>
                </Reveal>

                <Reveal delay={0.15}>
                    <form
                        onSubmit={onSubmit}
                        className="mx-auto w-full max-w-md rounded-sm border border-line bg-panel/90 p-7 backdrop-blur"
                    >
                        <p className="stencil text-steel">Acesso restrito</p>

                        <h2 className="heading mt-1 text-2xl text-bone">
                            Entrar no sistema
                        </h2>

                        <div className="mt-6 space-y-4">
                            <Input
                                id="email"
                                label="E-mail"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="voce@hotgarage.com"
                            />

                            <Input
                                id="senha"
                                label="Senha"
                                type="password"
                                autoComplete="current-password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        {erro ? (
                            <p role="alert" className="mt-4 text-xs text-burnt-red">
                                {erro}
                            </p>
                        ) : null}

                        <Button
                            type="submit"
                            className="mt-6 w-full"
                            disabled={loading}
                        >
                            {loading ? "Ligando o motor..." : "Entrar"}
                        </Button>

                        <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                            <span className="stencil text-steel/70">
                                Hot Garage 1998
                            </span>

                            <span className="heading text-sm text-burnt-red">
                                Keep it hot.
                            </span>
                        </div>
                    </form>
                </Reveal>
            </div>
        </div>
    );
}

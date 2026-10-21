import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { config } from "../config/site";
import { isFormSubmitEndpoint, sendContact } from "../lib/contact";
export default function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (status === "sending" || !form.reportValidity()) return;
    if (!config.contactEndpoint) {
      setStatus("error");
      setMessage(
        "O canal de envio ainda está sendo preparado. Tente novamente mais tarde.",
      );
      return;
    }
    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const fields = Object.fromEntries(new FormData(form)) as Record<
        string,
        string
      >;
      const result = await sendContact(
        config.contactEndpoint,
        fields,
        controller.signal,
      );
      if (result === "activation") {
        setStatus("error");
        setMessage(
          "O canal de contato está aguardando ativação. Sua solicitação foi recebida pelo serviço, mas a entrega ainda não foi confirmada.",
        );
        return;
      }
      setStatus("success");
      setMessage(
        "Solicitação recebida pelo serviço de envio. Obrigado por compartilhar sua ideia com a O.R.I.O.N.",
      );
      form.reset();
    } catch {
      setStatus("error");
      setMessage(
        "Não foi possível confirmar o envio. Por favor, tente novamente.",
      );
    } finally {
      clearTimeout(timeout);
    }
  }
  return (
    <section id="contato" className="contact section">
      <div className="contact-copy">
        <p className="eyebrow">08 / VAMOS CRIAR O PRÓXIMO</p>
        <h2>
          Seu próximo
          <br />
          grande projeto
          <br />
          <em>começa aqui.</em>
        </h2>
        <p>
          Toda grande transformação começa com uma conversa. Conte para nós o
          que você imagina.
        </p>
        {config.whatsapp && (
          <a
            className="text-link"
            href={`https://wa.me/${config.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            Conversar pelo WhatsApp <ArrowUpRight size={18} />
          </a>
        )}
        <div className="contact-coordinate">
          <span className="status-dot" /> Novas ideias são bem-vindas.
        </div>
      </div>
      <form
        onSubmit={submit}
        className="contact-form"
        aria-busy={status === "sending"}
      >
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: "none" }}
        />
        <div className="field-row">
          <label>
            Seu nome
            <input
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              placeholder="Como podemos chamar você?"
            />
          </label>
          <label>
            E-mail
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
              placeholder="voce@empresa.com"
            />
          </label>
        </div>
        <label>
          O que vamos construir?
          <select name="projectType" required defaultValue="">
            <option value="" disabled>
              Selecione o tipo de projeto
            </option>
            {[
              "Site institucional",
              "Aplicação ou sistema",
              "Interface digital",
              "Automação e integração",
              "Manutenção e evolução",
              "Quero explorar uma ideia",
            ].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label>
          Conte um pouco sobre sua ideia
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={4}
            placeholder="Objetivos, desafios, possibilidades..."
          />
        </label>
        <p className="form-note">
          Seus dados serão utilizados apenas para responder ao seu contato.
          {isFormSubmitEndpoint(config.contactEndpoint) &&
            " O envio é processado pelo FormSubmit."}
        </p>
        <button
          className="button gold"
          disabled={status === "sending"}
          type="submit"
        >
          {status === "sending" ? "Enviando..." : "Enviar mensagem"}
          {status === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <ArrowUpRight size={18} />
          )}
        </button>
        <p className={`form-status ${status}`} role="status">
          {message}
        </p>
      </form>
    </section>
  );
}

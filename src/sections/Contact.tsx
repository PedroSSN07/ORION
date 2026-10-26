import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { config, solutions } from "../config/site";
import { buildWhatsAppUrl, type Brief } from "../lib/brief";
export default function Contact() {
  const [readyUrl, setReadyUrl] = useState("");
  const [error, setError] = useState("");
  const nextStep = useRef<HTMLAnchorElement>(null);
  const errorMessage = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (readyUrl) nextStep.current?.focus();
    else if (error) errorMessage.current?.focus();
  }, [readyUrl, error]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as Brief;
    try {
      setReadyUrl(buildWhatsAppUrl(config.whatsapp, fields));
      setError("");
    } catch (cause) {
      setReadyUrl("");
      setError(
        cause instanceof Error
          ? cause.message
          : "Não foi possível preparar a solicitação.",
      );
    }
  }
  return (
    <section id="contato" className="contact section">
      <div className="contact-copy">
        <p className="eyebrow">08 / O PRÓXIMO CAPÍTULO</p>
        <h2>
          Vamos construir
          <br />
          algo <em>extraordinário?</em>
        </h2>
        <p>
          Conte o que você imagina. Vamos entender o desafio e explorar juntos o
          melhor caminho.
        </p>
        <a
          className="contact-direct"
          href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={22} />
          <span>
            Prefere uma conversa direta?<strong>Fale com a O.R.I.O.N.</strong>
          </span>
          <ArrowUpRight />
        </a>
        <div className="contact-promises">
          <span>
            <Check size={15} /> Conversa sem compromisso
          </span>
          <span>
            <Check size={15} /> Uma proposta para o seu contexto
          </span>
        </div>
      </div>
      <form
        className="contact-form"
        onSubmit={submit}
        onChange={() => {
          setReadyUrl("");
          setError("");
        }}
      >
        <div className="form-topline">
          <span>BRIEFING DO SEU PROJETO</span>
          <span>VAMOS COMEÇAR ↗</span>
        </div>
        <div className="field-row">
          <label>
            Nome
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
        <div className="field-row">
          <label>
            Tipo de serviço
            <select name="service" required defaultValue="">
              <option disabled value="">
                Selecione uma solução
              </option>
              {solutions.map((s) => (
                <option key={s.title}>{s.title}</option>
              ))}
              <option>Quero explorar uma ideia</option>
            </select>
          </label>
          <label>
            Orçamento <span className="optional">(opcional)</span>
            <select name="budget" defaultValue="">
              <option value="">Vamos definir juntos</option>
              <option>Até R$ 5 mil</option>
              <option>R$ 5 mil a R$ 15 mil</option>
              <option>R$ 15 mil a R$ 30 mil</option>
              <option>Acima de R$ 30 mil</option>
            </select>
          </label>
        </div>
        <label>
          O que você quer transformar?
          <textarea
            name="description"
            required
            minLength={20}
            maxLength={1500}
            rows={4}
            placeholder="Conte sobre a ideia, seus objetivos e os desafios do projeto."
          />
        </label>
        <p className="form-note">
          Preparamos sua mensagem aqui. Você revisa e confirma o envio no
          WhatsApp. Nenhum dado é enviado ao preencher este formulário.
        </p>
        <button className="button gold" type="submit">
          Preparar solicitação <ArrowUpRight size={18} />
        </button>
        {error && (
          <p ref={errorMessage} tabIndex={-1} role="alert" className="form-status error">
            {error}
          </p>
        )}
        {readyUrl && (
          <div className="brief-ready" role="status">
            <Check size={20} />
            <p>Solicitação preparada. Ela ainda não foi enviada.</p>
            <a
              className="button"
              href={readyUrl}
              ref={nextStep}
              target="_blank"
              rel="noopener noreferrer"
            >
              Revisar e enviar no WhatsApp <ArrowUpRight size={18} />
            </a>
          </div>
        )}
      </form>
    </section>
  );
}

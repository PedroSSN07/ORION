export type Brief = {
  name: string;
  email: string;
  service: string;
  description: string;
  budget: string;
};
export function validateBrief(brief: Brief): string | null {
  if (brief.name.trim().length < 2 || brief.name.length > 100)
    return "Informe seu nome com pelo menos 2 caracteres.";
  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email) ||
    brief.email.length > 200
  )
    return "Informe um e-mail válido.";
  if (!brief.service.trim()) return "Escolha o tipo de serviço.";
  if (brief.description.trim().length < 20 || brief.description.length > 1500)
    return "Descreva sua ideia em 20 a 1.500 caracteres.";
  return null;
}
export function buildWhatsAppUrl(number: string, brief: Brief): string {
  const error = validateBrief(brief);
  if (error) throw new Error(error);
  const phone = number.replace(/\D/g, "");
  if (!/^\d{10,15}$/.test(phone))
    throw new Error("Canal de WhatsApp indisponível.");
  const message = [
    "Olá, O.R.I.O.N.! Quero conversar sobre um projeto.",
    "",
    `Nome: ${brief.name.trim()}`,
    `E-mail: ${brief.email.trim()}`,
    `Serviço: ${brief.service}`,
    `Orçamento: ${brief.budget || "A definir"}`,
    "",
    brief.description.trim(),
  ].join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

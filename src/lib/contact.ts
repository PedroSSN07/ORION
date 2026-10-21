export function isFormSubmitEndpoint(endpoint: string): boolean {
  try {
    const url = new URL(endpoint);
    return (
      url.origin === "https://formsubmit.co" &&
      url.pathname.startsWith("/ajax/")
    );
  } catch {
    return false;
  }
}

export async function sendContact(
  endpoint: string,
  fields: Record<string, string>,
  signal?: AbortSignal,
): Promise<"accepted" | "activation"> {
  const formSubmit = isFormSubmitEndpoint(endpoint);
  const payload = formSubmit
    ? {
        ...fields,
        _subject: "Novo contato pelo site O.R.I.O.N.",
        _template: "table",
        _replyto: fields.email,
      }
    : fields;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
    signal,
  });
  if (!response.ok) throw new Error("Falha no envio");
  const data: unknown = await response.json();
  if (!data || typeof data !== "object" || !("success" in data))
    throw new Error("Resposta inválida");
  if (data.success !== true && !(formSubmit && data.success === "true"))
    throw new Error("Confirmação não recebida");
  if (
    formSubmit &&
    "message" in data &&
    typeof data.message === "string" &&
    /activat|confirm.*email|verif.*email/i.test(data.message)
  )
    return "activation";
  return "accepted";
}

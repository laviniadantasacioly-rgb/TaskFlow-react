import { useState } from "react";

function PainelComentarios({
  aberto,
  tarefa,
  comentarios = [],
  carregando = false,
  enviando = false,
  onFechar,
  onEnviar,
  onExcluir,
}) {
  const [texto, setTexto] = useState("");

  function formatarData(data) {
    if (!data) return "";

    return new Date(data).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  async function enviarComentario(e) {
    e.preventDefault();

    if (!texto.trim() || enviando) return;

    onEnviar(texto.trim());
    setTexto("");
  }

  function adicionarEmoji() {
    setTexto((textoAtual) => textoAtual + " 🙂");
  }

  if (!aberto || !tarefa) return null;

  return (
    <aside className="painel-comentarios">
      <div className="painel-comentarios-cabecalho">
        <div>
          <h2>💬 Comentários</h2>
          <p>Tarefa: {tarefa.texto}</p>
        </div>

        <button
          type="button"
          className="fechar-comentarios"
          onClick={onFechar}
          aria-label="Fechar comentários"
        >
          ×
        </button>
      </div>

      <div className="lista-comentarios">
        {carregando ? (
          <p className="comentarios-vazio">Carregando comentários...</p>
        ) : comentarios.length === 0 ? (
          <p className="comentarios-vazio">
            Nenhum comentário ainda. Seja a primeira pessoa a comentar!
          </p>
        ) : (
          comentarios.map((comentario) => (
            <div className="comentario" key={comentario.id}>
              <div className="comentario-avatar">
                {(comentario.usuario?.nome || "?").charAt(0).toUpperCase()}
              </div>

              <div className="comentario-conteudo">
                <div className="comentario-identificacao">
                  <strong>{comentario.usuario?.nome || "Usuário"}</strong>

                  <button
                    type="button"
                    className="botao-excluir-comentario"
                    onClick={() => onExcluir(comentario.id)}
                    title="Excluir comentário"
                  >
                    Excluir
                  </button>
                </div>
                <div className="comentario-mensagem">{comentario.texto}</div>

                <small className="comentario-data">
                  {formatarData(comentario.criado_em)}
                </small>
              </div>
            </div>
          ))
        )}
      </div>

      <form className="form-comentario" onSubmit={enviarComentario}>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escreva um comentário..."
          rows={3}
          maxLength={1000}
        />

        <div className="form-comentario-acoes">
          <button
            type="button"
            className="botao-emoji"
            onClick={adicionarEmoji}
            title="Adicionar emoji"
          >
            ☺
          </button>

          <button
            type="submit"
            className="botao-enviar-comentario"
            disabled={!texto.trim() || enviando}
          >
            {enviando ? "Enviando..." : "➤ Enviar"}
          </button>
        </div>
      </form>
    </aside>
  );
}

export default PainelComentarios;

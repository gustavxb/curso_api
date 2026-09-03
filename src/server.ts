/**
 * Server — Ponto de entrada da aplicação
 *
 * Este arquivo é responsável APENAS por iniciar o servidor HTTP na porta
 * configurada. Toda a montagem do Fastify (plugins e rotas) está em `app.ts`.
 *
 * Essa separação permite que, nos testes automatizados, importemos apenas o
 * `app.ts` sem precisar abrir uma porta de rede real.
 */

import { buildApp } from './app.ts'

const PORT = Number(process.env.PORT) || 3333

// Usamos 0.0.0.0 em vez de localhost para que a API possa ser acessada de fora
// quando estiver hospedada em um container (Docker) ou em um servidor na nuvem.
// Com "localhost", ela só responderia a chamadas vindas de dentro da própria máquina.
const HOST = process.env.HOST ?? '0.0.0.0'

/**
 * Sobe o servidor HTTP e o deixa ouvindo requisições.
 */
async function start(): Promise<void> {
  const app = buildApp()

  try {
    await app.listen({ port: PORT, host: HOST })

    // Usamos o logger do Fastify em vez de `console.log`. A diferença é que ele
    // grava em JSON estruturado: o primeiro parâmetro são os dados (que ficam
    // pesquisáveis nas ferramentas de monitoramento) e o segundo é a mensagem
    // para humanos lerem.
    app.log.info({ port: PORT, host: HOST }, 'Servidor iniciado com sucesso')
  } catch (error) {
    app.log.error(error)

    // Código de saída diferente de zero avisa o sistema operacional (e o Docker)
    // que o processo morreu por causa de um erro, e não porque terminou bem.
    process.exit(1)
  }
}

// O `try/catch` lá dentro cobre o `app.listen`, mas `buildApp()` acontece antes
// dele. Se a montagem da aplicação falhar, a promessa devolvida por `start()`
// seria rejeitada sem ninguém escutando: o processo morreria sem log e sem
// código de saída controlado. Este `.catch()` é a rede de segurança final.
start().catch((error: unknown) => {
  // Aqui não existe `app.log`: se chegamos neste ponto, o app pode nem ter sido
  // montado. Escrevemos direto na saída de erro do processo, que é o canal que
  // o sistema operacional e o Docker leem.
  process.stderr.write(`\n❌ A API não conseguiu iniciar.\n${String(error)}\n\n`)

  process.exit(1)
})
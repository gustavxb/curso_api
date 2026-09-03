/**
 * HealthController
 *
 * Recebe a requisição HTTP, pede o trabalho ao service e devolve a resposta.
 *
 * Regra de ouro do projeto: o controller NUNCA contém lógica de negócio.
 * Nada de cálculo, nada de `if` de regra. Ele só faz três coisas:
 *   1. Recebe a requisição
 *   2. Chama o service
 *   3. Devolve a resposta
 */

import type { FastifyReply, FastifyRequest } from 'fastify'
import type { HealthService } from './health.service.ts'

export class HealthController {
  /**
   * Recebe o service pronto, por parâmetro do construtor, em vez de criá-lo aqui
   * dentro. Isso se chama injeção de dependência e é o que nos permitirá, nos
   * testes, entregar um service falso para verificar o controller isoladamente.
   */
  constructor(private readonly healthService: HealthService) {}

  /**
   * Responde à requisição `GET /health`.
   *
   * @param _request Requisição recebida. O prefixo `_` marca que não a usamos
   *                 nesta rota — ela não recebe parâmetro nenhum.
   * @param reply    Objeto usado para devolver a resposta ao cliente.
   */
  async handle(_request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const status = this.healthService.getStatus()

    // Declaramos o 200 explicitamente. O Fastify assumiria 200 sozinho, mas
    // deixar escrito torna a intenção óbvia para quem ler o código depois.
    return reply.status(200).send(status)
  }
}
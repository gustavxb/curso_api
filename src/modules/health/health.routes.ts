/**
 * Health Routes
 *
 * Define as rotas da funcionalidade de Health Check e as liga ao controller.
 *
 * No Fastify, um arquivo de rotas é um plugin: uma função que recebe a instância
 * do app e registra os caminhos dentro dela.
 */

import type { FastifyInstance } from 'fastify'
import { HealthController } from './health.controller.ts'
import { HealthService } from './health.service.ts'

/**
 * Plugin de rotas do Health Check.
 *
 * @param app Instância do Fastify, entregue automaticamente pelo `app.register()`.
 */
export async function healthRoutes(app: FastifyInstance): Promise<void> {
  // Montamos a "corrente" de dependências à mão: o controller precisa do service,
  // então criamos o service primeiro e o entregamos ao controller.
  // Com um módulo só, fazer isso manualmente é simples e deixa tudo visível.
  const healthService = new HealthService()
  const healthController = new HealthController(healthService)

  app.get('/health', async (request, reply) => {
    return healthController.handle(request, reply)
  })
}
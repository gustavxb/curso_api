/**
 * App — Montagem da instância do Fastify
 *
 * Este arquivo é responsável por:
 *   1. Criar a instância do Fastify com suas configurações.
 *   2. Registrar plugins globais.
 *   3. Registrar as rotas de cada módulo.
 *
 * Separamos a montagem do app (aqui) da inicialização do servidor (`server.ts`)
 * para facilitar os testes automatizados: nos testes importamos apenas o app,
 * sem precisar ocupar uma porta de rede.
 */

import Fastify from 'fastify'
import type { FastifyInstance } from 'fastify'
import { healthRoutes } from './modules/health/health.routes.ts'

/**
 * Fábrica da aplicação Fastify.
 *
 * @returns Instância do Fastify já configurada, pronta para receber requisições
 *          ou para ser usada em testes.
 */
export function buildApp(): FastifyInstance {
  const app = Fastify({
    // O Fastify já vem com o Pino, um dos loggers mais rápidos do Node.
    // Deixá-lo ligado nos dá o registro de cada requisição sem escrever uma linha.
    logger: true,
  })

  // No Fastify, cada conjunto de rotas é registrado como um plugin. Isso mantém
  // cada módulo isolado: um erro no registro de um não derruba os outros.
  app.register(healthRoutes)

  return app
}
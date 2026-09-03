/**
 * HealthService
 *
 * Concentra a lógica de negócio da funcionalidade de Health Check (checagem de
 * saúde). É ele quem sabe COMO montar a resposta; o controller apenas pede.
 *
 * Separar a lógica (aqui) da camada HTTP (controller) é o que nos permite testar
 * esta classe sem simular uma requisição da internet.
 */

/**
 * Formato da resposta do health check.
 */
export interface HealthStatus {
  status: string
  uptime: number
  timestamp: string
  environment: string
}

export class HealthService {
  /**
   * Coleta o estado atual da aplicação.
   *
   * @returns Objeto com o status, há quanto tempo a API está no ar e em qual
   *          ambiente ela está rodando.
   */
  getStatus(): HealthStatus {
    return {
      status: 'ok',

      // `process.uptime()` devolve há quantos segundos este processo está no ar.
      // Ferramentas de monitoramento usam esse número para detectar quando a API
      // está reiniciando sozinha em looping.
      uptime: process.uptime(),

      timestamp: new Date().toISOString(),

      // Saber em qual ambiente a resposta foi gerada evita a confusão clássica de
      // investigar um problema em produção olhando para a instância de homologação.
      environment: process.env.NODE_ENV ?? 'development',
    }
  }
}
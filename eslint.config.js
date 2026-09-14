// @ts-check

/**
 * Configuração do ESLint (formato "flat config").
 *
 * O ESLint é o nosso analisador de qualidade: ele procura problemas de lógica e
 * más práticas. Quem cuida da aparência do código (espaços, aspas, quebras de
 * linha) é o Prettier, executado separadamente pelo comando `npm run format`.
 *
 * Manter as duas ferramentas separadas é uma decisão consciente: assim um espaço
 * sobrando nunca aparece com a mesma gravidade visual de um bug de verdade.
 */

import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'

export default defineConfig([
  // Pastas que o ESLint nunca deve analisar: código gerado e bibliotecas de terceiros.
  globalIgnores(['dist/**', 'node_modules/**']),

  {
    files: ['**/*.ts'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      // Precisa ser o ÚLTIMO da lista: desliga as regras do ESLint que brigariam
      // com a formatação do Prettier.
      prettier,
    ],
    rules: {
      // O tipo `any` desliga a checagem do TypeScript naquele ponto. Às vezes é
      // inevitável, por isso é aviso e não erro — mas precisa ser uma decisão
      // consciente, nunca um descuido.
      '@typescript-eslint/no-explicit-any': 'warn',

      // Em produção usamos o logger do Fastify (`app.log`), que gera JSON
      // estruturado e pode ser filtrado por nível. `console.log` escreve texto
      // solto, que as ferramentas de monitoramento não conseguem indexar.
      //
      // É `error`, e não `warn`: aviso que não reprova nada é aviso que o time
      // aprende a ignorar. As exceções legítimas continuam possíveis, mas exigem
      // um `eslint-disable` com o motivo escrito ao lado.
      'no-console': 'error',

      // Variável declarada e não usada quase sempre indica código morto ou um
      // erro de digitação. O prefixo `_` marca o caso em que ignorar é proposital.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
])

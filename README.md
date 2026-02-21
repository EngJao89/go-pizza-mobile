# Go Pizza Mobile — Documentação

Documentação do aplicativo móvel **Go Pizza Mobile**, incluindo instruções de execução, descrição do projeto, decisões técnicas e arquiteturais.

---

## Índice

1. [Descrição do projeto](#descrição-do-projeto)
2. [Como rodar o projeto](#como-rodar-o-projeto)
3. [Decisões técnicas](#decisões-técnicas)
4. [Arquitetura](#arquitetura)
5. [Estrutura de pastas](#estrutura-de-pastas)

---

## Descrição do projeto

**Go Pizza Mobile** é um aplicativo multiplataforma (iOS, Android e Web) construído com **Expo** e **React Native**. O projeto utiliza roteamento baseado em arquivos (Expo Router) e foca em uma experiência de login e interface alinhada ao tema visual da marca (cores, tipografia e componentes reutilizáveis).

### Funcionalidades atuais

- **Tela de Login (Sign In):** formulário com campos de e-mail e senha, imagem de destaque, alternância de visibilidade da senha e layout responsivo com tema customizado.
- **Suporte a múltiplas plataformas:** execução em Android, iOS e Web a partir do mesmo código.
- **Tema centralizado:** paleta de cores e tamanhos de fonte definidos em `constants/theme.ts` para consistência visual.

### Stack tecnológica

- **React** 19.x e **React Native** 0.81.x  
- **Expo** SDK 54  
- **TypeScript** 5.9  
- **Expo Router** (roteamento baseado em arquivos)  
- **React Navigation** (navegação nativa)  
- **expo-image** para imagens otimizadas  

---

## Como rodar o projeto

### Pré-requisitos

- **Node.js** 18+ (recomendado LTS)
- **npm** ou **yarn**
- Para dispositivos físicos ou emuladores:
  - **Android:** Android Studio (emulador) ou dispositivo com USB debugging
  - **iOS:** Xcode e simulador (apenas macOS)
  - **Expo Go:** app instalado no celular para desenvolvimento rápido

### Instalação

1. Clone o repositório (se aplicável) e entre na pasta do projeto:

   ```bash
   cd go-pizza-mobile
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

### Executando o projeto

1. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

   Ou use os scripts específicos por plataforma:

   - **Android:** `npm run android`
   - **iOS:** `npm run ios`
   - **Web:** `npm run web`

2. Com o servidor rodando:
   - **Expo Go:** escaneie o QR code com o app Expo Go (Android/iOS).
   - **Emulador/Simulador:** use as teclas/opções no terminal para abrir no Android ou iOS.
   - **Web:** abra no navegador conforme indicado no terminal.

### Scripts disponíveis

| Script            | Descrição                                      |
|-------------------|------------------------------------------------|
| `npm start`       | Inicia o Expo (Metro) e mostra QR code         |
| `npm run android` | Inicia e tenta abrir no Android                |
| `npm run ios`     | Inicia e tenta abrir no iOS                    |
| `npm run web`     | Inicia e abre a versão web                    |
| `npm run lint`    | Executa o ESLint no projeto                    |
| `npm run commit`  | Abre o Commitizen para commits convencionais   |

### Variáveis de ambiente

O projeto não exige variáveis de ambiente para rodar em modo desenvolvimento. Se no futuro forem adicionadas (ex.: API base URL), documente-as em um `.env.example` e na seção de pré-requisitos.

---

## Decisões técnicas

### Uso do Expo

- **Motivo:** desenvolvimento mais rápido, tooling unificado (build, OTA, ferramentas de desenvolvimento) e suporte nativo a iOS, Android e Web.
- **Benefícios:** menos configuração de ambiente, atualizações OTA possíveis, uso de módulos Expo (câmera, imagem, splash, etc.) sem eject imediato.

### Expo Router (file-based routing)

- **Motivo:** roteamento declarativo baseado na estrutura de pastas em `app/`, alinhado a frameworks como Next.js.
- **Benefícios:** URLs e rotas previsíveis, deep linking natural, menos boilerplate de configuração de rotas.
- **Configuração:** `main: "expo-router/entry"` no `package.json` e rotas definidas por arquivos em `app/` (ex.: `app/signin/page.tsx` → rota `signin/page`).

### TypeScript

- **Motivo:** tipagem estática para menos erros em tempo de desenvolvimento e melhor autocomplete.
- **Configuração:** `tsconfig.json` estende `expo/tsconfig.base`, `strict: true`, path alias `@/*` apontando para a raiz do projeto.

### Tema centralizado (`constants/theme.ts`)

- **Motivo:** uma única fonte de verdade para cores, tamanhos de fonte e famílias de fonte (com suporte por plataforma via `Platform.select`).
- **Benefícios:** consistência visual, manutenção fácil e possibilidade de evoluir para temas claro/escuro sem espalhar literais pelo código.

### React Navigation + ThemeProvider

- **Motivo:** navegação nativa e suporte a tema (claro/escuro) integrado.
- **Uso:** `ThemeProvider` com `DefaultTheme`/`DarkTheme` e hook `useColorScheme()` para respeitar preferência do sistema.

### expo-image para imagens

- **Motivo:** melhor desempenho e cache em relação ao `Image` do React Native em muitos cenários.
- **Uso:** componentes como a imagem de destaque na tela de login utilizam `expo-image` com `contentFit` e estilos controlados.

### ESLint + eslint-config-expo

- **Motivo:** padronização de código e boas práticas para React Native/Expo.
- **Execução:** `npm run lint`.

### Commitizen (commits convencionais)

- **Motivo:** histórico de commits padronizado (Conventional Commits), facilitando changelog e versionamento semântico.
- **Uso:** `npm run commit` para guiar o formato do commit.

---

## Arquitetura

### Visão geral

- **UI:** componentes React (functional components) com hooks.
- **Navegação:** Expo Router + React Navigation (Stack como navegador principal no `_layout.tsx`).
- **Estilos:** `StyleSheet` do React Native, com estilos por tela (ex.: `app/signin/styles.ts`) e uso do tema em `constants/theme.ts`.
- **Estado local:** `useState` nas telas (ex.: login); não há estado global no momento.
- **Tema/Preferência:** `useColorScheme()` e `ThemeProvider` para tema claro/escuro.

### Fluxo de entrada

1. Ponto de entrada: `expo-router/entry` (Expo Router).
2. Layout raiz: `app/_layout.tsx` — aplica `ThemeProvider`, define `Stack` e a tela inicial (`signin/page`).
3. Primeira tela: `app/signin/page.tsx` — tela de login com imagem, título e formulário.

### Roteamento

- Rotas são definidas pela estrutura em `app/`:
  - `app/signin/page.tsx` → rota `/signin/page` (ou conforme configuração do Expo Router).
- Layouts aninhados podem ser feitos com `_layout.tsx` em subpastas.
- Deep linking usa o `scheme` definido em `app.json` (`gopizzamobile`).

### Tema e estilos

- **Cores e fontes:** importadas de `@/constants/theme` (ex.: `Colors`, `Font_Size`, `Fonts`).
- **Estilos por tela:** arquivos `styles.ts` na mesma pasta da tela (ex.: `signin/styles.ts`) para manter responsabilidade local.
- **Path alias:** `@/*` mapeado para a raiz do projeto no `tsconfig.json`.

### Hooks customizados

- **useColorScheme:** retorna preferência de tema do sistema (com tratamento para web em `use-color-scheme.web.ts`).
- **useThemeColor:** (se utilizado) retorna cor do tema conforme nome e esquema claro/escuro.

---

## Estrutura de pastas

```
go-pizza-mobile/
├── app/                    # Rotas e telas (Expo Router)
│   ├── _layout.tsx         # Layout raiz, ThemeProvider, Stack
│   └── signin/
│       ├── page.tsx         # Tela de login
│       └── styles.ts       # Estilos da tela de login
├── assets/                 # Imagens e recursos estáticos
│   ├── images/             # Ícones, splash, favicon
│   └── bg-preview .png     # Imagem de destaque (login)
├── constants/
│   └── theme.ts            # Cores, Font_Size, Fonts (tema)
├── hooks/
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
├── scripts/
│   └── reset-project.js    # Script de reset do template
├── docs/
│   └── README.md           # Esta documentação
├── app.json                # Configuração Expo
├── package.json
├── tsconfig.json
├── eslint.config.js
└── README.md               # Guia rápido (Expo)
```

### Convenções

- **Rotas:** uma `page.tsx` por rota; layouts com `_layout.tsx`.
- **Estilos:** `styles.ts` na mesma pasta da tela, usando `StyleSheet.create` e tema de `constants/theme`.
- **Imports:** preferir alias `@/` para raiz (ex.: `@/constants/theme`, `@/hooks/use-color-scheme`).

---

## Referências

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)

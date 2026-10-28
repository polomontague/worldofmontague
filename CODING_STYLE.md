# Coding Style

This file describes how the code in this repo is actually written. It is based on the hand-written files: `app/components/NavigationFrame.tsx`, `lib/Response.ts`, `types/User.ts`, `app/globals.css`, the edited `app/layout.tsx` and `app/page.tsx`, and the TypeORM files from commit `90205f4` (`data-source.ts`, `entities/User.ts`), which have since been deleted. There is no Prettier config, and the ESLint config is the stock `eslint-config-next`. So the formatting rules below are personal habits, not something a tool enforces.

The codebase is still small, so most rules rest on 2–5 files. Where the files disagree, the section says so instead of picking a winner.

## Formatting

**Consistent:**

- **No semicolons** in TS/TSX. CSS uses them as normal.
  ```ts
  import { NextResponse } from "next/server"
  ```
- **Double quotes** everywhere, including CSS `url("...")` and font names.
- **No trailing commas** in objects, arrays, types or JSX props.
- **No final newline** at the end of a file.
- **One property per line** in any object or type with more than one member.
- **Multi-line returns are wrapped in `( )`**, with each JSX child on its own line:
  ```tsx
  <Content>
      {children}
  </Content>
  ```
- **No blank lines inside function bodies.** A blank line goes between top-level declarations.

**Varies (indentation):**

| Where | Indent |
|---|---|
| Files written from scratch (`NavigationFrame.tsx`, `Response.ts`, `types/User.ts`, `data-source.ts`, `entities/User.ts`) | **4 spaces** |
| Files edited from the Create Next App scaffold (`layout.tsx`, `page.tsx`) | **tabs** |
| `globals.css` | tabs in `:root`/`*`, 4 spaces in `@font-face` |
| `metadata` in `layout.tsx` | 2 spaces (scaffold leftover) |

New files have consistently used 4 spaces.

## Naming

- **Files:** PascalCase and named after the main export: `NavigationFrame.tsx`, `Response.ts`, `User.ts`. The exception is `data-source.ts`, which followed TypeORM's convention.
- **Components and styled components:** PascalCase. Names describe the element's role and get more specific by appending words: `ContainerLogo` → `ContainerLogoPosition`, `Logo` → `LogoSansSerif` / `LogoSerif`.
- **Props types:** `<Component>Props`, e.g. `NavigationFrameProps`.
- **Functions and methods:** camelCase verbs or states, e.g. `response`, `invalidBody`, `notFound`, `usernameTaken`.
- **Exported singletons and namespaces:** PascalCase, e.g. `Response` and `AppDataSource`. (`Response` has the same name as the global Fetch `Response`.)
- **Error codes:** `SCREAMING_SNAKE_CASE`, e.g. `"INVALID_REQUEST_BODY"`. **Error messages:** Title Case, e.g. `"Request Data Failed Validation"`.
- **Database columns:** snake_case (`first_name`, `last_name`). The app-side type `types/User.ts` uses a **nested camelCase shape** instead, so the DB shape and the domain shape are deliberately different:
  ```ts
  export type User = {
      id: number,
      name: {
          first: string,
          last: string
      }
  }
  ```
- **CSS custom properties:** kebab-case, named by meaning: `--black`, `--serif`, `--sans-serif`, `--sidebar-width`.

## Imports and exports

- **Named exports** for all of your own modules: `export const NavigationFrame`, `export const Response`, `export type User`, `export class User`, `export const AppDataSource`.
- **`export default function`** only in Next.js route files (`layout.tsx`, `page.tsx`), where the framework requires it.
- **Exports are inline** on the declaration. There is no `export { ... }` block at the bottom of a file.
- **Imports are in one block** with no blank lines between groups. They aren't sorted: `layout.tsx` imports in the order CSS → `next` → local → `styled-components`.
- **Multi-line named imports** once the list gets long (`entities/User.ts`):
  ```ts
  import {
      Entity,
      PrimaryGeneratedColumn,
      Column
  } from "typeorm"
  ```
- **Varies:** `import type { Metadata }` is used in `layout.tsx`, but `import { ReactNode }` (a type-only import without `type`) is used in `NavigationFrame.tsx`.
- **Path alias:** `@/*` is configured but not used yet. All imports so far are relative (`./components/NavigationFrame`).

## TypeScript

- **`type`, never `interface`.** No `interface` appears anywhere.
- **Members of multi-line object types are separated with commas**, not semicolons, and there is no trailing comma (`Response.ts`, `types/User.ts`).
- **Discriminated unions** model variants, with a string-literal `type` field:
  ```ts
  type ResponseOptions = SuccessOptions | ErrorOptions
  ```
  Union members are narrowed with `===` on the tag and with the `in` operator (`"data" in options`).
- **Typed default parameters** are written out in full: `(message: string = "Unauthorized")`.
- **Optional fields** use `?:` (`data?:`, `fields?:`).
- **`Record<string, any>`** is the type for loose JSON payloads, and `Record<string, string>` for field → message maps.
- **Return types vary:** the internal `response` helper declares `: NextResponse`, but the public `Response.*` methods and components rely on inference.
- **Definite assignment (`!:`)** on entity fields, which TypeORM required.

## Functions and components

- **Arrow functions assigned to `const`** for your own components and helpers:
  ```tsx
  export const NavigationFrame = ({ children }: NavigationFrameProps) => {
      return (
          ...
      )
  }
  ```
- **Arrow functions always have a block body and an explicit `return`**, even when the body is a single expression. No concise `=> expr` bodies appear.
- **Props are destructured in the parameter list**, with the props type declared just above the component.
- **One options object** instead of positional arguments for anything with several inputs (`response(options)`).
- **async/await:** no async code has been written yet, so there is no pattern to describe.

## Module organization

Each module follows the same top-to-bottom order:

1. Imports
2. Types (`SuccessOptions`, `ErrorOptions`, …) or styled components
3. Private helpers that aren't exported (`const response = ...`)
4. The single exported API at the bottom

Components live in `app/components/`, shared server utilities in `lib/`, and domain types in `types/`.

## Styling (styled-components)

- **One styled component per element**, all defined at the top of the component file and named after the element's role.
- **Template-literal CSS is indented 4 spaces**, with one declaration per line.
- **Values come from CSS variables** in `globals.css`: `var(--sidebar-width)`, `var(--serif)`, `var(--black)`. Some colors are still hard-coded (`ivory`, `green`, `red`).
- **Vendor-prefixed fallbacks** go before the standard property:
  ```css
  display: -webkit-flex;
  display: flex;
  ```
- **Empty styled placeholders** are kept for future styling: `const Content = styled.div```.
- **Varies:** `globals.css` puts no space before `{` (`:root{`, `*{`) but does put one in `*::-webkit-scrollbar {`.

## Abstraction and reuse

- **Shared behavior goes in a central factory with a named, intention-revealing method for each case**, rather than raw values at each call site. `lib/Response.ts` hides HTTP status codes and error codes behind methods like `Response.notFound()` and `Response.emailTaken()`.
- **Methods take arguments only where the caller needs to customize something.** The message is overridable with a default where that's useful (`notFound(message = "Resource Not Found")`) and fixed otherwise (`forbidden()`).
- **Repetition inside a factory is accepted.** Each method repeats the full `response({ type, code, message, status })` object instead of using a lookup table.

## API responses and error handling

No API routes exist yet. `lib/Response.ts` defines the contract they're meant to use:

- **Every response has the same envelope:**
  ```ts
  { success, data, error: { code, message, fields }, status }
  ```
  `status` appears both in the body and as the HTTP status.
- **Validation errors return a `fields` map** of field name → message, with status 422 (`Response.validationError(fields)`). `zod` is installed, but nothing uses it yet.
- **CORS headers are set centrally**, with `process.env.BASE_URL ?? "*"` as the fallback.
- There is no `try`/`catch` or thrown-error convention yet. `internalServerError()` exists for that case.

## Database

- The ORM was switched from TypeORM to Prisma 8. The Prisma contract (`src/prisma/contract.prisma`) keeps the snake_case column names from the TypeORM entity and maps the model to a plural table (`@@map("users")`).
- In the TypeORM `data-source.ts`, connection settings were written inline rather than read from env vars, and `synchronize: false` was set explicitly. That suggests schema changes should go through migrations, not auto-sync.
- No service or repository layer exists yet.

## Comments

- **Comments are rare.** There is no JSDoc and there are no comments in TS/TSX.
- **CSS uses section labels** to group variables (`/* Colors */`, `/* Fonts */`, `/* Sizes */`) and **inline notes for browser-specific rules** (`/* Firefox */`, `/* IE and Edge */`).

## Git

- Commit messages are imperative and capitalized, with no trailing period. Several actions are joined with commas: `Install TypeORM, create DataSource, and create User entity`.

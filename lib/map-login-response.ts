import type { Session } from "@/types/session";

function pickString(obj: Record<string, unknown>, keys: string[]): string | null {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.length > 0) return v;
  }
  return null;
}

function pickUserObject(data: Record<string, unknown>): Record<string, unknown> | null {
  const u = data.user;
  if (u && typeof u === "object" && !Array.isArray(u)) return u as Record<string, unknown>;
  return null;
}

function isAdminFromRole(role: string | undefined | null): boolean {
  if (!role) return false;
  const r = role.toString().toUpperCase();
  return r === "ADMIN" || r === "ADMINISTRATOR" || r === "SUPER_ADMIN";
}

function isTruthyAdmin(v: unknown): boolean {
  return v === true || v === 1 || v === "1" || v === "true";
}

const TOKEN_KEYS = ["access_token", "accessToken", "token", "jwt"] as const;

type Resolved = Readonly<{
  tokenSource: Record<string, unknown>;
  user: Record<string, unknown>;
}>;

/**
 * Descobre onde está o perfil do usuário e onde está o token (podem ser níveis diferentes).
 */
function resolveTokenAndUser(data: unknown): Resolved {
  if (Array.isArray(data) && data[0] && typeof data[0] === "object") {
    const user = data[0] as Record<string, unknown>;
    return { tokenSource: user, user };
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { tokenSource: {}, user: {} };
  }

  const root = data as Record<string, unknown>;
  const nested = pickUserObject(root);
  if (nested) {
    return { tokenSource: root, user: nested };
  }

  const inner = root.data;
  if (Array.isArray(inner) && inner[0] && typeof inner[0] === "object") {
    return { tokenSource: root, user: inner[0] as Record<string, unknown> };
  }

  if (typeof root.name === "string" && typeof root.email === "string") {
    return { tokenSource: root, user: root };
  }

  return { tokenSource: root, user: root };
}

/**
 * Aceita vários formatos comuns de resposta de login (incl. `admin: true` no usuário).
 */
export function mapLoginResponseToSession(
  data: unknown,
  emailFallback: string
): Session {
  const { tokenSource, user } = resolveTokenAndUser(data);

  const role =
    (typeof user.role === "string" ? user.role : null) ??
    (typeof tokenSource.role === "string" ? tokenSource.role : null);

  const isAdmin =
    isTruthyAdmin(tokenSource.isAdmin) ||
    isTruthyAdmin(tokenSource.admin) ||
    isTruthyAdmin(user.isAdmin) ||
    isTruthyAdmin(user.admin) ||
    isAdminFromRole(role) ||
    (typeof tokenSource.userRole === "string" && isAdminFromRole(tokenSource.userRole));

  const token =
    pickString(tokenSource, [...TOKEN_KEYS]) ??
    pickString(user, [...TOKEN_KEYS]) ??
    (typeof user.token === "string" ? user.token : null);

  const userName =
    (typeof user.name === "string" && user.name) ||
    (typeof user.email === "string" && user.email) ||
    (typeof tokenSource.name === "string" && tokenSource.name) ||
    emailFallback;

  return {
    token,
    userName,
    isAdmin,
  };
}

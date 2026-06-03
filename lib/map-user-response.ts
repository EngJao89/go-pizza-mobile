import type { UserProfile } from "@/types/user";

function asRecord(v: unknown): Record<string, unknown> | null {
  if (v && typeof v === "object" && !Array.isArray(v)) {
    return v as Record<string, unknown>;
  }
  return null;
}

function pickString(obj: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.length > 0) return value;
  }
  return null;
}

function isAdminFromRole(role: string | null): boolean {
  if (!role) return false;
  const r = role.toUpperCase();
  return r === "ADMIN" || r === "ADMINISTRATOR" || r === "SUPER_ADMIN";
}

function isTruthyAdmin(v: unknown): boolean {
  return v === true || v === 1 || v === "1" || v === "true";
}

function pickUserRoot(data: unknown): Record<string, unknown> | null {
  const root = asRecord(data);
  if (!root) return null;

  for (const key of ["user", "profile", "data", "account", "currentUser"]) {
    const nested = asRecord(root[key]);
    if (nested && pickString(nested, ["id", "email"])) return nested;
  }

  if (pickString(root, ["id", "email"])) return root;
  return null;
}

export function mapAuthMeResponse(data: unknown): UserProfile | null {
  const user = pickUserRoot(data);
  if (!user) return null;

  const id = pickString(user, ["id", "userId", "uuid"]);
  const name = pickString(user, ["name", "nome", "fullName", "full_name"]);
  const email = pickString(user, ["email"]);
  if (!id || !name || !email) return null;

  const role = pickString(user, ["role", "userRole"]);
  const isAdmin =
    isTruthyAdmin(user.isAdmin) ||
    isTruthyAdmin(user.admin) ||
    isAdminFromRole(role);

  return {
    id,
    name,
    email,
    phone: pickString(user, ["phone", "telefone", "mobile"]) ?? "",
    cpf: pickString(user, ["cpf", "document"]) ?? "",
    birthday: pickString(user, ["birthday", "birthDate", "dataNascimento"]) ?? "",
    role: role ?? undefined,
    isAdmin,
    createdAt: pickString(user, ["createdAt", "created_at"]) ?? undefined,
    updatedAt: pickString(user, ["updatedAt", "updated_at"]) ?? undefined,
  };
}

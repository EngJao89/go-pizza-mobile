import type { OrderItem, OrderStatus } from "@/types/order";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop";

function asRecord(v: unknown): Record<string, unknown> | null {
  if (v && typeof v === "object" && !Array.isArray(v)) {
    return v as Record<string, unknown>;
  }
  return null;
}

function pickString(obj: Record<string, unknown>, keys: string[]): string | null {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "string" && v.length > 0) return v;
  }
  return null;
}

function pickNumber(obj: Record<string, unknown>, keys: string[]): number {
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string" && v.trim() !== "") {
      const n = Number(v);
      if (Number.isFinite(n)) return n;
    }
  }
  return Number.NaN;
}

function normalizeStatus(raw: unknown): OrderStatus {
  let s: string;
  if (typeof raw === "string") {
    s = raw.toLowerCase().replaceAll(/[\s_-]+/g, "");
  } else if (typeof raw === "number" || typeof raw === "boolean") {
    s = String(raw).toLowerCase();
  } else {
    return "preparing";
  }

  if (
    s.includes("ready") ||
    s === "pronto" ||
    s === "done" ||
    s === "finalizado"
  ) {
    return "ready";
  }
  if (
    s.includes("deliver") ||
    s.includes("entregue") ||
    s === "concluido" ||
    s === "concluído"
  ) {
    return "delivered";
  }
  return "preparing";
}

function statusFromOrder(o: Record<string, unknown>): OrderStatus {
  const explicit =
    pickString(o, ["status", "state", "orderStatus", "order_status"]) ??
    (typeof o.status === "string" ? o.status : null);
  return normalizeStatus(explicit ?? "preparing");
}

function pickTableNumber(o: Record<string, unknown>): string {
  const s = pickString(o, ["tableNumber", "table_number", "table", "mesa"]);
  if (s) {
    const t = s.replace(/^mesa\s*/i, "").trim();
    return t.length > 0 ? t : "—";
  }
  const n = pickNumber(o, ["tableNumber", "table_number", "table", "mesa"]);
  if (Number.isFinite(n) && n > 0) return String(Math.floor(n));
  return "—";
}

function nestedFlavor(o: Record<string, unknown>): Record<string, unknown> | null {
  return (
    asRecord(o.pizza) ??
    asRecord(o.flavor) ??
    asRecord(o.pizzaFlavor) ??
    asRecord(o.pizza_flavor) ??
    asRecord(o.product) ??
    null
  );
}

function pizzaNameFrom(o: Record<string, unknown>): string {
  const direct =
    pickString(o, [
      "pizzaName",
      "pizza_name",
      "flavorName",
      "flavor_name",
      "productName",
      "product_name",
      "name",
      "title",
    ]) ?? null;
  if (direct) return direct;

  const nested = nestedFlavor(o);
  if (nested) {
    const n =
      pickString(nested, ["name", "title", "pizzaName", "flavorName"]) ?? null;
    if (n) return n;
  }
  return "Pedido";
}

function imageUrlFrom(o: Record<string, unknown>): string {
  const direct =
    pickString(o, ["imageUrl", "image_url", "photo", "image", "picture"]) ?? "";
  if (direct) return direct;
  const nested = nestedFlavor(o);
  if (nested) {
    const u =
      pickString(nested, ["imageUrl", "image_url", "photo", "image", "picture"]) ??
      "";
    if (u) return u;
  }
  return FALLBACK_IMAGE;
}

function quantityFrom(o: Record<string, unknown>): number {
  const n = pickNumber(o, ["quantity", "qty", "amount", "count"]);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.floor(n);
}

function arrayFromWrapper(wrapper: unknown): unknown[] | null {
  if (Array.isArray(wrapper)) return wrapper;
  const cr = asRecord(wrapper);
  if (!cr) return null;
  if (Array.isArray(cr.data)) return cr.data;
  if (Array.isArray(cr.content)) return cr.content;
  if (Array.isArray(cr.results)) return cr.results;
  return null;
}

/**
 * Extrai a lista bruta de pedidos (ou linhas) de formatos comuns de API.
 */
export function unwrapOrdersPayload(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;

  const root = asRecord(data);
  if (!root) return [];

  if (Array.isArray(root.content)) return root.content;

  for (const c of [root.data, root.orders, root.results, root.items]) {
    const arr = arrayFromWrapper(c);
    if (arr) return arr;
  }

  return [];
}

function orderIdFrom(o: Record<string, unknown>, index: number): string {
  return (
    pickString(o, ["id", "orderId", "order_id", "uuid"]) ?? `order-${index}`
  );
}

function mapLineToItem(
  order: Record<string, unknown>,
  line: Record<string, unknown>,
  orderId: string,
  lineIndex: number
): OrderItem {
  const tableNumber = pickTableNumber(order);
  const status = statusFromOrder(order);
  const qty = quantityFrom(line);
  const nestedLine =
    asRecord(line.pizza) ??
    asRecord(line.pizzaFlavor) ??
    asRecord(line.pizza_flavor) ??
    asRecord(line.product) ??
    line;

  const pizzaName = pizzaNameFrom(nestedLine);
  const imageUrl = imageUrlFrom(nestedLine);

  const lineId =
    pickString(line, ["id", "itemId", "lineId"]) ?? `${orderId}-${lineIndex}`;

  return {
    id: lineId,
    pizzaName,
    imageUrl,
    tableNumber,
    quantity: qty,
    status,
  };
}

function mapOrderRecord(raw: Record<string, unknown>, index: number): OrderItem[] {
  const items = raw.items;
  if (Array.isArray(items) && items.length > 0) {
    const orderId = orderIdFrom(raw, index);
    const out: OrderItem[] = [];
    items.forEach((line, j) => {
      const lineRec = asRecord(line);
      if (lineRec) out.push(mapLineToItem(raw, lineRec, orderId, j));
    });
    return out;
  }

  const id = orderIdFrom(raw, index);
  return [
    {
      id,
      pizzaName: pizzaNameFrom(raw),
      imageUrl: imageUrlFrom(raw),
      tableNumber: pickTableNumber(raw),
      quantity: quantityFrom(raw),
      status: statusFromOrder(raw),
    },
  ];
}

export function mapOrdersResponseToItems(data: unknown): OrderItem[] {
  const arr = unwrapOrdersPayload(data);
  const result: OrderItem[] = [];
  arr.forEach((raw, i) => {
    const o = asRecord(raw);
    if (!o) return;
    result.push(...mapOrderRecord(o, i));
  });
  return result;
}

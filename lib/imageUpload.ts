import api from "@/lib/axios";

export type ImageUploadResponse = {
  fileName: string;
  fileDownloadUri: string;
  name: string;
  message?: string;
};

export function slugifyImageName(label: string): string {
  const t = label
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/\p{M}/gu, "")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
  return t || "pizza";
}

export async function uploadImageFile(
  uri: string,
  mimeType: string,
  logicalName: string
): Promise<ImageUploadResponse> {
  const ext = mimeType.includes("png") ? "png" : "jpg";
  const fileName = `${logicalName}.${ext}`;

  const form = new FormData();
  form.append("file", {
    uri,
    name: fileName,
    type: mimeType,
  } as unknown as Blob);
  form.append("name", logicalName);

  const { data } = await api.post<ImageUploadResponse>("api/images/upload", form);
  return data;
}

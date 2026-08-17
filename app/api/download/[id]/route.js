import { getProduct } from "@/lib/api";

/**
 * GET /api/download/:id — the free file download.
 *
 * Files are free for everyone; no license or account is needed to reach this
 * route. Right now it serves a placeholder note instead of the real binary,
 * because the actual tool files are not hosted in this repo.
 *
 * TO SERVE REAL FILES: keep this route as the public URL (product cards and
 * detail pages already point at it) and swap the body for a redirect to your
 * storage bucket, or stream the object through:
 *
 *   return Response.redirect(await getSignedUrl(product.file.name), 302);
 */
export async function GET(request, { params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return new Response("File not found", { status: 404 });
  }

  const note = [
    `${product.name}`,
    `${"=".repeat(product.name.length)}`,
    ``,
    `File:         ${product.file.name}`,
    `Version:      ${product.file.version}`,
    `Size:         ${product.file.size}`,
    `Updated:      ${product.file.updated}`,
    `Requirements: ${product.file.requirements}`,
    ``,
    `This download is free and always will be.`,
    ``,
    `To RUN this ${product.category === "flash-files" ? "file" : "tool"} you need a`,
    `${product.license.type} license (${product.license.scope}).`,
    `Buy one at /product/${product.id} — it is issued instantly after payment.`,
    ``,
    `---`,
    `PLACEHOLDER: this is a stand-in for the real download. Point`,
    `app/api/download/[id]/route.js at your file storage to serve the binary.`,
  ].join("\n");

  return new Response(note, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${product.file.name}.README.txt"`,
      "Cache-Control": "no-store",
    },
  });
}

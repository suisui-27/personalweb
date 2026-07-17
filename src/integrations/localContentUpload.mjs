import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const jsonPaths = {
  poster: path.join(root, "src/data/posters.json"),
  photography: path.join(root, "src/data/photography.json"),
  honor: path.join(root, "src/data/honors.json"),
};
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);
const portfolioDirectory = path.join(root, "src/content/portfolio");

function textField(form, name, required = true) {
  const value = form.get(name);
  const text = typeof value === "string" ? value.trim() : "";
  if (required && !text) throw new Error(`缺少字段：${name}`);
  return text;
}

function uploadFiles(form) {
  return form.getAll("files").filter((value) => value instanceof File && value.size > 0);
}

function slugify(value, prefix) {
  const ascii = value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
  if (ascii) return ascii;
  const hash = createHash("sha1").update(value).digest("hex").slice(0, 8);
  return `${prefix}-${new Date().getFullYear()}-${hash}`;
}

function fileExtension(file) {
  const extension = path.extname(file.name).toLowerCase();
  if (!extension || !/^\.[a-z0-9]{1,10}$/.test(extension)) throw new Error(`无法识别文件扩展名：${file.name}`);
  return extension;
}

async function saveFile(file, directory, basename) {
  const extension = fileExtension(file);
  await mkdir(directory, { recursive: true });
  const filename = `${basename}${extension}`;
  await writeFile(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
  return filename;
}

async function readJson(filename) {
  return JSON.parse(await readFile(filename, "utf8"));
}

async function writeJson(filename, data) {
  await writeFile(filename, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function resolvePublicAsset(src, allowedDirectory) {
  if (typeof src !== "string" || !src.startsWith(allowedDirectory)) return null;
  const publicRoot = path.resolve(root, "public");
  const candidate = path.resolve(publicRoot, src.replace(/^\/+/, ""));
  const allowedRoot = path.resolve(publicRoot, allowedDirectory.replace(/^\/+/, ""));
  if (candidate !== allowedRoot && !candidate.startsWith(`${allowedRoot}${path.sep}`)) return null;
  return candidate;
}

async function removePublicAsset(src, allowedDirectory) {
  const filename = resolvePublicAsset(src, allowedDirectory);
  if (filename) await rm(filename, { force: true });
}

async function removePortfolioAssetDirectory(src) {
  const filename = resolvePublicAsset(src, "/assets/portfolio/");
  if (!filename) return;
  const portfolioRoot = path.resolve(root, "public/assets/portfolio");
  const directory = path.dirname(filename);
  if (directory !== portfolioRoot && directory.startsWith(`${portfolioRoot}${path.sep}`)) {
    await rm(directory, { force: true, recursive: true });
  }
}

function readFrontmatterScalar(source, field) {
  const match = source.match(new RegExp(`^${field}:\\s*(.+)$`, "m"));
  if (!match) return "";
  const value = match[1].trim();
  try {
    return JSON.parse(value);
  } catch {
    return value.replace(/^['"]|['"]$/g, "");
  }
}

function replaceFrontmatterScalar(source, field, value) {
  const pattern = new RegExp(`^${field}:\\s*.*$`, "m");
  if (!pattern.test(source)) throw new Error(`产品数据缺少字段：${field}`);
  return source.replace(pattern, `${field}: ${JSON.stringify(value)}`);
}

async function readPortfolioItems() {
  const filenames = (await readdir(portfolioDirectory)).filter((filename) => filename.endsWith(".mdx"));
  const items = await Promise.all(filenames.map(async (filename) => {
    const source = await readFile(path.join(portfolioDirectory, filename), "utf8");
    return {
      id: path.basename(filename, ".mdx"),
      title: readFrontmatterScalar(source, "title"),
      category: readFrontmatterScalar(source, "category"),
      cover: readFrontmatterScalar(source, "cover"),
      summary: readFrontmatterScalar(source, "summary"),
      year: readFrontmatterScalar(source, "year"),
    };
  }));
  return items.sort((a, b) => String(b.year).localeCompare(String(a.year)));
}

async function readEditorData() {
  const [portfolio, poster, photography, honor] = await Promise.all([
    readPortfolioItems(),
    readJson(jsonPaths.poster),
    readJson(jsonPaths.photography),
    readJson(jsonPaths.honor),
  ]);
  return {
    portfolio,
    poster: poster.map((item) => ({ ...item, id: item.src })),
    photography: photography.map((item) => ({ ...item, id: item.src, title: item.name })),
    honor: honor.map((item) => ({ ...item, id: item.slug })),
  };
}

async function uniqueSlug(base, exists) {
  let slug = base;
  let index = 2;
  while (exists(slug)) {
    slug = `${base}-${index}`;
    index += 1;
  }
  return slug;
}

async function savePortfolio(form) {
  const title = textField(form, "title");
  const category = textField(form, "category");
  const year = textField(form, "year");
  const summary = textField(form, "summary");
  const requestedSlug = textField(form, "slug", false);
  const [cover] = uploadFiles(form);
  if (!cover || !imageExtensions.has(fileExtension(cover))) throw new Error("请选择产品封面图片。");

  const contentDirectory = path.join(root, "src/content/portfolio");
  const base = slugify(requestedSlug || title, "portfolio");
  const slug = await uniqueSlug(base, (value) => existsSync(path.join(contentDirectory, `${value}.mdx`)));
  const assetDirectory = path.join(root, "public/assets/portfolio", slug);
  const coverName = await saveFile(cover, assetDirectory, "cover");
  const coverPath = `/assets/portfolio/${slug}/${coverName}`;
  const mdx = `---\ntitle: ${JSON.stringify(title)}\ncategory: ${JSON.stringify(category)}\ncover: ${JSON.stringify(coverPath)}\nsummary: ${JSON.stringify(summary)}\nyear: ${JSON.stringify(year)}\nfeatured: false\ntags: []\ngallery: []\n---\n\n<!-- AI_DETAIL_TODO: 读取 frontmatter，根据项目资料补充设计背景、过程、结构推演与成果。 -->\n`;
  await writeFile(path.join(contentDirectory, `${slug}.mdx`), mdx, "utf8");
  return [coverPath, `src/content/portfolio/${slug}.mdx`];
}

async function updatePortfolio(form) {
  const id = textField(form, "id");
  const filename = path.join(portfolioDirectory, `${path.basename(id)}.mdx`);
  if (!existsSync(filename)) throw new Error("没有找到这项工业产品。");
  let source = await readFile(filename, "utf8");
  const title = textField(form, "title");
  const category = textField(form, "category");
  const year = textField(form, "year");
  const summary = textField(form, "summary");
  const [cover] = uploadFiles(form);
  let coverPath = readFrontmatterScalar(source, "cover");

  if (cover) {
    if (!imageExtensions.has(fileExtension(cover))) throw new Error("产品封面必须是图片。");
    const coverName = await saveFile(cover, path.join(root, "public/assets/portfolio", id), "cover");
    coverPath = `/assets/portfolio/${id}/${coverName}`;
  }

  source = replaceFrontmatterScalar(source, "title", title);
  source = replaceFrontmatterScalar(source, "category", category);
  source = replaceFrontmatterScalar(source, "year", year);
  source = replaceFrontmatterScalar(source, "summary", summary);
  source = replaceFrontmatterScalar(source, "cover", coverPath);
  await writeFile(filename, source, "utf8");
  return [`src/content/portfolio/${id}.mdx`, ...(cover ? [coverPath] : [])];
}

async function savePoster(form) {
  const title = textField(form, "title");
  const category = textField(form, "category");
  const summary = textField(form, "summary");
  const [image] = uploadFiles(form);
  if (!image || !imageExtensions.has(fileExtension(image))) throw new Error("请选择平面设计图片。");

  const items = await readJson(jsonPaths.poster);
  const slug = await uniqueSlug(slugify(title, "poster"), (value) => items.some((item) => path.parse(item.src).name === value));
  const filename = await saveFile(image, path.join(root, "public/assets/posters"), slug);
  const src = `/assets/posters/${filename}`;
  items.push({ src, title, category, summary });
  await writeJson(jsonPaths.poster, items);
  return [src, "src/data/posters.json"];
}

async function updatePoster(form) {
  const id = textField(form, "id");
  const items = await readJson(jsonPaths.poster);
  const index = items.findIndex((item) => item.src === id);
  if (index < 0) throw new Error("没有找到这项平面设计。");
  const [image] = uploadFiles(form);
  let src = items[index].src;
  if (image) {
    if (!imageExtensions.has(fileExtension(image))) throw new Error("作品图片必须是图片文件。");
    const filename = await saveFile(image, path.join(root, "public/assets/posters"), path.parse(src).name);
    src = `/assets/posters/${filename}`;
  }
  items[index] = {
    src,
    title: textField(form, "title"),
    category: textField(form, "category"),
    summary: textField(form, "summary"),
  };
  await writeJson(jsonPaths.poster, items);
  return ["src/data/posters.json", ...(image ? [src] : [])];
}

async function savePhotography(form) {
  const name = textField(form, "title");
  const location = textField(form, "location");
  const [image] = uploadFiles(form);
  if (!image || !imageExtensions.has(fileExtension(image))) throw new Error("请选择摄影图片。");

  const items = await readJson(jsonPaths.photography);
  const slug = await uniqueSlug(slugify(name, "photo"), (value) => items.some((item) => path.parse(item.src).name === value));
  const filename = await saveFile(image, path.join(root, "public/assets/photography"), slug);
  const src = `/assets/photography/${filename}`;
  items.push({ src, name, location });
  await writeJson(jsonPaths.photography, items);
  return [src, "src/data/photography.json"];
}

async function updatePhotography(form) {
  const id = textField(form, "id");
  const items = await readJson(jsonPaths.photography);
  const index = items.findIndex((item) => item.src === id);
  if (index < 0) throw new Error("没有找到这项摄影作品。");
  const [image] = uploadFiles(form);
  let src = items[index].src;
  if (image) {
    if (!imageExtensions.has(fileExtension(image))) throw new Error("摄影作品必须是图片文件。");
    const filename = await saveFile(image, path.join(root, "public/assets/photography"), path.parse(src).name);
    src = `/assets/photography/${filename}`;
  }
  items[index] = { src, name: textField(form, "title"), location: textField(form, "location") };
  await writeJson(jsonPaths.photography, items);
  return ["src/data/photography.json", ...(image ? [src] : [])];
}

async function saveHonor(form) {
  const title = textField(form, "title");
  const year = textField(form, "year");
  const files = uploadFiles(form);
  const items = await readJson(jsonPaths.honor);
  const slug = await uniqueSlug(slugify(`${year}-${title}`, "honor"), (value) => items.some((item) => item.slug === value));
  const assetDirectory = path.join(root, "public/assets/honors");
  const materials = [];
  const paths = [];

  for (const [index, file] of files.entries()) {
    const filename = await saveFile(file, assetDirectory, `${slug}-${index + 1}`);
    const src = `/assets/honors/${filename}`;
    const extension = fileExtension(file);
    materials.push({
      src,
      title: path.basename(file.name, path.extname(file.name)),
      kind: imageExtensions.has(extension) ? "image" : "document",
      label: extension.slice(1).toUpperCase(),
    });
    paths.push(src);
  }

  const years = year.match(/\d{4}/g);
  const displayYear = years?.at(-1) ?? year;
  const category = title.includes("奖学金") ? "奖学金" : title.includes("工业设计") ? "工业设计竞赛" : "设计竞赛";
  items.unshift({ slug, title, category, year, displayYear, materials });
  await writeJson(jsonPaths.honor, items);
  return [...paths, "src/data/honors.json"];
}

async function updateHonor(form) {
  const id = textField(form, "id");
  const items = await readJson(jsonPaths.honor);
  const index = items.findIndex((item) => item.slug === id);
  if (index < 0) throw new Error("没有找到这项个人荣誉。");
  const current = items[index];
  const title = textField(form, "title");
  const year = textField(form, "year");
  const files = uploadFiles(form);
  const materialMode = textField(form, "materialMode", false) || "keep";
  const uploadedMaterials = [];
  const paths = [];

  for (const [index, file] of files.entries()) {
    const basename = `${id}-edit-${Date.now()}-${index + 1}`;
    const filename = await saveFile(file, path.join(root, "public/assets/honors"), basename);
    const src = `/assets/honors/${filename}`;
    const extension = fileExtension(file);
    uploadedMaterials.push({
      src,
      title: path.basename(file.name, path.extname(file.name)),
      kind: imageExtensions.has(extension) ? "image" : "document",
      label: extension.slice(1).toUpperCase(),
    });
    paths.push(src);
  }

  const years = year.match(/\d{4}/g);
  const displayYear = years?.at(-1) ?? year;
  const category = title.includes("奖学金") ? "奖学金" : title.includes("工业设计") ? "工业设计竞赛" : "设计竞赛";
  const materials = materialMode === "replace"
    ? uploadedMaterials
    : materialMode === "append"
      ? [...(current.materials ?? []), ...uploadedMaterials]
      : current.materials ?? [];
  items[index] = { ...current, title, year, displayYear, category, materials };
  await writeJson(jsonPaths.honor, items);
  return ["src/data/honors.json", ...paths];
}

async function updateContent(form) {
  const contentType = textField(form, "contentType");
  const handlers = { portfolio: updatePortfolio, poster: updatePoster, photography: updatePhotography, honor: updateHonor };
  const handler = handlers[contentType];
  if (!handler) throw new Error("未知的内容类型。");
  return handler(form);
}

async function deletePortfolio(form) {
  const id = path.basename(textField(form, "id"));
  const filename = path.join(portfolioDirectory, `${id}.mdx`);
  if (!existsSync(filename)) throw new Error("没有找到这项工业产品。");
  const source = await readFile(filename, "utf8");
  const cover = readFrontmatterScalar(source, "cover");
  await rm(filename, { force: true });
  await removePortfolioAssetDirectory(cover);

  const idDirectory = path.resolve(root, "public/assets/portfolio", id);
  const portfolioRoot = path.resolve(root, "public/assets/portfolio");
  if (idDirectory.startsWith(`${portfolioRoot}${path.sep}`)) {
    await rm(idDirectory, { force: true, recursive: true });
  }
  return [`src/content/portfolio/${id}.mdx`, cover].filter(Boolean);
}

async function deleteJsonItem(form, type) {
  const id = textField(form, "id");
  const filename = jsonPaths[type];
  const items = await readJson(filename);
  const index = items.findIndex((item) => type === "honor" ? item.slug === id : item.src === id);
  if (index < 0) throw new Error("没有找到要删除的内容。");
  const [removed] = items.splice(index, 1);
  await writeJson(filename, items);

  const assets = type === "honor" ? (removed.materials ?? []).map((material) => material.src) : [removed.src];
  const allowedDirectory = type === "poster"
    ? "/assets/posters/"
    : type === "photography"
      ? "/assets/photography/"
      : "/assets/honors/";
  await Promise.all(assets.map((src) => removePublicAsset(src, allowedDirectory)));
  return [path.relative(root, filename).replaceAll("\\", "/"), ...assets].filter(Boolean);
}

async function deleteContent(form) {
  const contentType = textField(form, "contentType");
  if (contentType === "portfolio") return deletePortfolio(form);
  if (["poster", "photography", "honor"].includes(contentType)) return deleteJsonItem(form, contentType);
  throw new Error("未知的内容类型。");
}

async function parseForm(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > 250 * 1024 * 1024) throw new Error("上传内容超过 250 MB 限制。");
    chunks.push(buffer);
  }
  const headers = new Headers();
  Object.entries(request.headers).forEach(([key, value]) => {
    if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
  });
  const webRequest = new Request("http://localhost/__local-content/upload", {
    method: "POST",
    headers,
    body: Buffer.concat(chunks),
  });
  return webRequest.formData();
}

function send(response, status, payload) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload));
}

export default function localContentUpload() {
  return {
    name: "suisui-local-content-upload",
    hooks: {
      "astro:server:setup": ({ server }) => {
        server.middlewares.use("/__local-content/data", async (request, response) => {
          if (request.method !== "GET") {
            send(response, 405, { message: "仅支持 GET 请求。" });
            return;
          }
          try {
            send(response, 200, { ok: true, data: await readEditorData() });
          } catch (error) {
            send(response, 500, { message: error instanceof Error ? error.message : "读取失败。" });
          }
        });

        server.middlewares.use("/__local-content/update", async (request, response) => {
          if (request.method !== "POST") {
            send(response, 405, { message: "仅支持 POST 请求。" });
            return;
          }
          try {
            const paths = await updateContent(await parseForm(request));
            send(response, 200, { ok: true, paths });
          } catch (error) {
            send(response, 400, { message: error instanceof Error ? error.message : "更新失败。" });
          }
        });

        server.middlewares.use("/__local-content/delete", async (request, response) => {
          if (request.method !== "POST") {
            send(response, 405, { message: "仅支持 POST 请求。" });
            return;
          }
          try {
            const paths = await deleteContent(await parseForm(request));
            send(response, 200, { ok: true, paths });
          } catch (error) {
            send(response, 400, { message: error instanceof Error ? error.message : "删除失败。" });
          }
        });

        server.middlewares.use("/__local-content/upload", async (request, response) => {
          if (request.method !== "POST") {
            send(response, 405, { message: "仅支持 POST 请求。" });
            return;
          }

          try {
            const form = await parseForm(request);
            const contentType = textField(form, "contentType");
            const handlers = { portfolio: savePortfolio, poster: savePoster, photography: savePhotography, honor: saveHonor };
            const handler = handlers[contentType];
            if (!handler) throw new Error("未知的内容类型。");
            const paths = await handler(form);
            send(response, 200, { ok: true, paths });
          } catch (error) {
            const message = error instanceof Error ? error.message : "写入失败。";
            send(response, 400, { message });
          }
        });
      },
    },
  };
}

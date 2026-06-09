/**
 * 本機測試 GITHUB_TOKEN 能否寫入 mrbill-dev.github.io
 * 用法（PowerShell）：
 *   $env:GITHUB_TOKEN = "github_pat_或_ghp_..."
 *   node scripts/test-github-sync.mjs
 */
const token = String(process.env.GITHUB_TOKEN || "").trim();
const repo = process.env.GITHUB_REPO || "MrBill-Dev/mrbill-dev.github.io";
const branch = process.env.GITHUB_BRANCH || "main";
const testPath = "blog/_generated/sync-probe.txt";

if (!token) {
  console.error("請設定環境變數 GITHUB_TOKEN");
  process.exit(1);
}

async function gh(path, options) {
  options = options || {};
  const url = "https://api.github.com/repos/" + repo + path;
  const res = await fetch(url, {
    method: options.method || "GET",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: "Bearer " + token,
      "User-Agent": "mrbill-sync-probe",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { message: text };
  }
  if (!res.ok) {
    throw new Error((json && json.message) || "HTTP " + res.status);
  }
  return json;
}

function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

async function main() {
  console.log("Repo:", repo, "branch:", branch);
  const repoMeta = await gh("", { method: "GET" });
  console.log("✓ 可讀取 repo:", repoMeta.full_name);

  let sha = null;
  try {
    const existing = await gh(
      "/contents/" + encodePath(testPath) + "?ref=" + encodeURIComponent(branch)
    );
    sha = existing.sha;
    console.log("ℹ 探針檔已存在，將更新");
  } catch (e) {
    if (!/404|Not Found/i.test(e.message)) throw e;
    console.log("ℹ 探針檔不存在，將新建");
  }

  const content = Buffer.from(
    "sync probe " + new Date().toISOString() + "\n",
    "utf8"
  ).toString("base64");
  const body = {
    message: "chore: github sync probe",
    content: content,
    branch: branch
  };
  if (sha) body.sha = sha;

  const put = await gh("/contents/" + encodePath(testPath), {
    method: "PUT",
    body: body
  });
  console.log("✓ 寫入成功:", put.content && put.content.html_url);
  console.log("\nToken 權限正常。請 wrangler deploy 後在後台按「同步 GitHub 文章頁」。");
}

main().catch(function (err) {
  console.error("✗ 失敗:", err.message);
  console.error(
    "\n常見原因：\n" +
      "1. Fine-grained token 未選 mrbill-dev.github.io 或 Contents 未開讀寫\n" +
      "2. Classic token 缺少 repo 權限\n" +
      "3. Token 過期或貼上時多空格\n" +
      "4. 建議改用 Classic token → repo 勾選（只需 public_repo 若 repo 公開）"
  );
  process.exit(1);
});

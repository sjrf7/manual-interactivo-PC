const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT) || 1234;

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

function resolveFile(url) {
  let pathname;

  try {
    pathname = decodeURIComponent(new URL(url, `http://${host}`).pathname);
  } catch {
    return null;
  }

  const file = path.resolve(root, `.${pathname === "/" ? "/index.html" : pathname}`);
  return file.startsWith(`${root}${path.sep}`) ? file : null;
}

function sendError(res, status, message) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(message);
}

function sendFile(req, res, file, stat) {
  const type = types[path.extname(file).toLowerCase()] || "application/octet-stream";
  const range = req.headers.range;

  if (!range) {
    res.writeHead(200, {
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-cache",
      "Content-Length": stat.size,
      "Content-Type": type,
      "Last-Modified": stat.mtime.toUTCString(),
    });

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    fs.createReadStream(file).pipe(res);
    return;
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(range);

  if (!match || (!match[1] && !match[2])) {
    res.writeHead(416, { "Content-Range": `bytes */${stat.size}` });
    res.end();
    return;
  }

  let start;
  let end;

  if (!match[1]) {
    const length = Number(match[2]);
    start = Math.max(stat.size - length, 0);
    end = stat.size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Math.min(Number(match[2]), stat.size - 1) : stat.size - 1;
  }

  if (start >= stat.size || start > end) {
    res.writeHead(416, { "Content-Range": `bytes */${stat.size}` });
    res.end();
    return;
  }

  res.writeHead(206, {
    "Accept-Ranges": "bytes",
    "Cache-Control": "no-cache",
    "Content-Length": end - start + 1,
    "Content-Range": `bytes ${start}-${end}/${stat.size}`,
    "Content-Type": type,
    "Last-Modified": stat.mtime.toUTCString(),
  });

  if (req.method === "HEAD") {
    res.end();
    return;
  }

  fs.createReadStream(file, { start, end }).pipe(res);
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    res.end("Method Not Allowed");
    return;
  }

  const file = resolveFile(req.url);

  if (!file) {
    sendError(res, 403, "Forbidden");
    return;
  }

  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) {
      sendError(res, 404, "Not Found");
      return;
    }

    sendFile(req, res, file, stat);
  });
});

server.listen(port, host, () => {
  console.log(`Manual PC disponible en http://${host}:${port}`);
});

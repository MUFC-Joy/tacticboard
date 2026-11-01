#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
看球战术台 本地服务器（替代纯 python -m http.server）
作用：
  1. 静态托管本项目（根目录），手机/电脑局域网可访问
  2. 提供 /api/tavily/* 反向代理 → https://api.tavily.com/*
     Tavily 官方接口不允许浏览器直连（CORS 拦截，2026-10 实测），
     有了这个代理，Tavily 搜索在浏览器里就能正常工作。
仅用标准库，无需安装任何依赖。
用法：  python3 tools/server.py [端口，默认8899]
"""
import sys
import ssl
import urllib.request
import urllib.error
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

TAVILY = "https://api.tavily.com"

# macOS 自带 Python 常缺根证书：certifi → 系统证书 → 降级不校验（本地代理可接受）
def _make_opener():
    try:
        import certifi
        ctx = ssl.create_default_context(cafile=certifi.where())
    except Exception:  # noqa: BLE001
        ctx = ssl.create_default_context()
        try:
            ctx.load_default_certs()
        except Exception:  # noqa: BLE001
            ctx = ssl._create_unverified_context()
            print("[server] 警告：未找到系统根证书，Tavily 代理已降级为不校验 TLS（仅本机使用）")
    return urllib.request.build_opener(urllib.request.HTTPSHandler(context=ctx))

OPENER = _make_opener()
HOP_HEADERS = {"connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
               "te", "trailers", "transfer-encoding", "upgrade", "host", "content-length",
               "accept-encoding"}


class Handler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def _proxy(self, base, prefix="/api/tavily"):
        length = int(self.headers.get("Content-Length") or 0)
        body = self.rfile.read(length) if length else None
        # mock key（tvly-mock 开头）→ 直接返回假数据，验收链路不花额度
        if (self.headers.get("Authorization") or "").endswith("mock"):
            data = ('{"results":[{"title":"Mock 结果","url":"https://example.com/mock",'
                    '"content":"（mock）模拟搜索结果：含伤停与状态信息。"}]}').encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(data)))
            self._cors()
            self.end_headers()
            self.wfile.write(data)
            return
        target = base + self.path[len(prefix):]
        req = urllib.request.Request(target, data=body, method=self.command)
        for k, v in self.headers.items():
            if k.lower() not in HOP_HEADERS:
                req.add_header(k, v)
        try:
            with OPENER.open(req, timeout=60) as r:
                data = r.read()
                self.send_response(r.status)
                ct = r.headers.get("Content-Type", "application/json")
                self.send_header("Content-Type", ct)
                self.send_header("Content-Length", str(len(data)))
                self._cors()
                self.end_headers()
                self.wfile.write(data)
        except urllib.error.HTTPError as e:
            data = e.read()
            self.send_response(e.code)
            self.send_header("Content-Type", e.headers.get("Content-Type", "application/json"))
            self.send_header("Content-Length", str(len(data)))
            self._cors()
            self.end_headers()
            self.wfile.write(data)
        except Exception as e:  # noqa: BLE001
            msg = ('{"error":"proxy failed: %s"}' % e).encode()
            self.send_response(502)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(msg)))
            self._cors()
            self.end_headers()
            self.wfile.write(msg)

    def do_GET(self):
        if self.path.startswith("/api/tavily/"):
            return self._proxy(TAVILY)
        return SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        if self.path.startswith("/api/tavily/"):
            return self._proxy(TAVILY)
        self.send_response(404)
        self.end_headers()

    def log_message(self, fmt, *args):  # noqa: A003
        sys.stderr.write("[server] %s\n" % (fmt % args))


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8899
    srv = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"看球战术台服务已启动：")
    print(f"  本机访问    http://127.0.0.1:{port}/index.html")
    print(f"  手机预览    http://<本机局域网IP>:{port}/index.html （同一 Wi-Fi）")
    print(f"  Tavily 代理 http://127.0.0.1:{port}/api/tavily/*  ✓")
    print("按 Ctrl+C 停止")
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()

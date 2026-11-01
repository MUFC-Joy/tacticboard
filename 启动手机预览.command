#!/bin/bash
# 双击运行：起服务 + 打印手机可用地址 + 打开电脑浏览器
cd "$(dirname "$0")" || exit 1
PORT=8899
HOST=$(scutil --get LocalHostName 2>/dev/null)
SSID=$(system_profiler SPAirPortDataType 2>/dev/null | sed -n "/Current Network Information/,+1p" | tail -1 | sed "s/^ *//;s/:$//")

if lsof -ti tcp:$PORT >/dev/null 2>&1; then
  echo "端口 $PORT 被占用，正在释放…"
  lsof -ti tcp:$PORT | xargs kill -9 2>/dev/null
  sleep 1
fi

echo "════════════════════════════════════════"
echo "  看球战术台 TacticBoard · 手机预览"
echo "════════════════════════════════════════"
echo " 电脑：http://127.0.0.1:$PORT/index.html"
echo " 电脑当前 Wi-Fi：${SSID:-未知}"
echo " 手机（Bonjour，换 IP 也能用）："
echo "   http://$HOST.local:$PORT/index.html"
echo
echo " 手机（按网络挑一条）："
HOTSPOT=0
for IFACE in $(ifconfig -l 2>/dev/null | tr ' ' '\n' | grep -E '^en[0-9]+$'); do
  IP=$(ipconfig getifaddr "$IFACE" 2>/dev/null)
  [ -z "$IP" ] && continue
  case "$IP" in
    169.254.*) continue ;;
    172.20.10.*) echo "   ★ http://$IP:$PORT/index.html   ← iPhone 热点直连（最稳）"; HOTSPOT=1 ;;
    *) echo "     http://$IP:$PORT/index.html" ;;
  esac
done
[ "$HOTSPOT" = "0" ] && echo "   （没检测到 iPhone 热点网段 172.20.10.x：电脑当前不在热点上）"
echo
echo " 规则：手机的 Wi-Fi 和上面哪条同网段，就用哪条地址"
echo "      热点模式下手机本身是 172.20.10.1，直连即可"
echo " 本服务自带 Tavily 搜索代理（/api/tavily/*），全局设置选 Tavily 时请务必用本脚本打开"
echo " 关闭本窗口或按 Ctrl+C 即停止服务"
echo "════════════════════════════════════════"

( sleep 1; open "http://127.0.0.1:$PORT/index.html" ) &
python3 tools/server.py $PORT

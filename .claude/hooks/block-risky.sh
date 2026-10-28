#!/bin/bash
# 되돌리기 어려운 명령을 실행 전에 막는다. 필요하면 사용자가 직접 실행한다.
cmd=$(jq -r '.tool_input.command // ""')
if echo "$cmd" | grep -Eq '(^|[;&|[:space:]])(git[[:space:]]+push|docker[[:space:]]+push|rm[[:space:]]+-[a-zA-Z]*r[a-zA-Z]*f|rm[[:space:]]+-[a-zA-Z]*f[a-zA-Z]*r)'; then
  echo "차단됨: '$cmd' 는 되돌리기 어려운 명령이다. 사용자에게 직접 실행을 요청할 것." >&2
  exit 2
fi
exit 0

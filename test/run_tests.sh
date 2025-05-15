#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "電卓プログラム（calculator.js）のテスト実行"
echo "============================================"

node test/calculator.test.js

exit_code=$?

if [ $exit_code -eq 0 ]; then
  echo -e "${GREEN}全てのテストが成功しました！${NC}"
else
  echo -e "${RED}テストに失敗しました。${NC}"
fi

exit $exit_code

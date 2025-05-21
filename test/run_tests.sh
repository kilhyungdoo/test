#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}電卓プログラム（calculator.js）のテスト実行${NC}"
echo "============================================"
echo "コマンドライン引数モードのテストを実行します"
echo "============================================"

node test/calculator.test.js

exit_code=$?

if [ $exit_code -eq 0 ]; then
  echo -e "${GREEN}全てのテストが成功しました！${NC}"
else
  echo -e "${RED}テストに失敗しました。${NC}"
fi

echo "============================================"
echo -e "${YELLOW}対話式モードの動作確認:${NC}"
echo "以下のコマンドで対話式モードを起動できます:"
echo "node calculator.js"
echo ""
echo -e "${YELLOW}電卓プログラムの使用方法:${NC}"
echo "1. コマンドライン引数モード: node calculator.js <数値1> <演算子> <数値2>"
echo "   例: node calculator.js 5 + 3"
echo "2. 対話式モード: node calculator.js"
echo "   (画面の指示に従って操作を選択してください)"
echo "============================================"

exit $exit_code
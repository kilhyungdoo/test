/**
 * 四則演算を行うモジュール
 */

// 加算関数
function add(a, b) {
  return a + b;
}

// 減算関数
function subtract(a, b) {
  return a - b;
}

// 乗算関数
function multiply(a, b) {
  return a * b;
}

// 除算関数
function divide(a, b) {
  if (b === 0) {
    throw new Error('ゼロによる除算はできません');
  }
  return a / b;
}

// コマンドライン引数を取得
const args = process.argv.slice(2);

// 引数が足りない場合
if (args.length < 3) {
  console.log('使用方法: node index.js <数値1> <演算子> <数値2>');
  console.log('演算子: + (加算), - (減算), * (乗算), / (除算)');
  process.exit(1);
}

// 引数を解析
const num1 = parseFloat(args[0]);
const operator = args[1];
const num2 = parseFloat(args[2]);

// 数値でない場合のエラー処理
if (isNaN(num1) || isNaN(num2)) {
  console.log('エラー: 有効な数値を入力してください');
  process.exit(1);
}

// 演算を実行
let result;
try {
  switch (operator) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = subtract(num1, num2);
      break;
    case '*':
      result = multiply(num1, num2);
      break;
    case '/':
      result = divide(num1, num2);
      break;
    default:
      console.log('エラー: 無効な演算子です。+, -, *, / のいずれかを使用してください');
      process.exit(1);
  }
  console.log(`${num1} ${operator} ${num2} = ${result}`);
} catch (error) {
  console.log(`エラー: ${error.message}`);
} 
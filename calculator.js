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
    throw new Error("ゼロによる除算はできません");
  }
  return a / b;
}

function main() {
  // コマンドライン引数を取得（最初の2つはnode実行ファイルパスなので無視）
  const args = process.argv.slice(2);
  
  if (args.length !== 3) {
    console.log("使用方法: node calculator.js <数値1> <演算子> <数値2>");
    console.log("例: node calculator.js 5 + 3");
    process.exit(1);
  }
  
  // 引数を解析
  const num1 = parseFloat(args[0]);
  const operator = args[1];
  const num2 = parseFloat(args[2]);
  
  if (isNaN(num1) || isNaN(num2)) {
    console.error("エラー: 有効な数値を入力してください");
    process.exit(1);
  }
  
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
        console.error("エラー: 無効な演算子です");
        console.log("サポートされている演算子: +, -, *, /");
        process.exit(1);
    }
    
    console.log(result);
    
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

main(); 
/**
 * calculator.js のテストスクリプト
 * テスト仕様書に基づいてテストを実行します
 */

const { spawn } = require('child_process');
const assert = require('assert');
const path = require('path');

function runTest(testId, description, args, expectedOutput, expectedExitCode = 0) {
  console.log(`実行テスト ${testId}: ${description}...`);
  
  return new Promise((resolve, reject) => {
    const calculatorPath = path.resolve(__dirname, '../calculator.js');
    const child = spawn('node', [calculatorPath, ...args]);
    
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      const output = stdout.trim() || stderr.trim();
      
      try {
        if (code !== expectedExitCode) {
          throw new Error(`期待された終了コード ${expectedExitCode} と異なります。実際: ${code}`);
        }
        
        if (output !== expectedOutput) {
          throw new Error(`期待された出力と異なります。\n期待値: ${expectedOutput}\n実際の値: ${output}`);
        }
        
        console.log('\x1b[32m%s\x1b[0m', '成功');
        resolve();
      } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', '失敗');
        console.error(error.message);
        reject(error);
      }
    });
  });
}

// コマンドラインモードのみをテスト
async function runAllTests() {
  const commandLineTests = [
    { id: 'T-001', description: '加算機能', args: ['5', '+', '3'], expected: '5 + 3 = 8' },
    { id: 'T-002', description: '減算機能', args: ['10', '-', '4'], expected: '10 - 4 = 6' },
    { id: 'T-003', description: '乗算機能', args: ['6', '*', '7'], expected: '6 * 7 = 42' },
    { id: 'T-004', description: '除算機能', args: ['20', '/', '5'], expected: '20 / 5 = 4' },
    
    { id: 'T-101', description: 'ゼロ除算エラー', args: ['10', '/', '0'], expected: 'エラー: ゼロによる除算はできません', exitCode: 0 },
    { id: 'T-103', description: '無効な数値', args: ['abc', '+', '5'], expected: 'エラー: 有効な数値を入力してください', exitCode: 1 },
    { id: 'T-104', description: '無効な演算子', args: ['5', '%', '2'], expected: 'エラー: 無効な演算子です。+, -, *, / のいずれかを使用してください', exitCode: 1 },
    
    { id: 'T-201', description: '小数点計算', args: ['5.5', '+', '2.3'], expected: '5.5 + 2.3 = 7.8' },
    { id: 'T-202', description: '負数計算', args: ['-10', '*', '3'], expected: '-10 * 3 = -30' },
    { id: 'T-203', description: '大きな数値', args: ['999999', '*', '999999'], expected: '999999 * 999999 = 999998000001' },
  ];
  
  let passedTests = 0;
  let failedTests = 0;
  
  console.log("\n===== コマンドライン引数テスト =====");
  for (const test of commandLineTests) {
    try {
      await runTest(test.id, test.description, test.args, test.expected, test.exitCode || 0);
      passedTests++;
    } catch (error) {
      console.error(`テスト ${test.id} エラー: ${error.message}`);
      failedTests++;
    }
  }
  
  console.log('\n===== テスト結果 =====');
  console.log(`合計テスト数: ${commandLineTests.length}`);
  console.log(`成功: ${passedTests}`);
  console.log(`失敗: ${failedTests}`);
  
  if (failedTests > 0) {
    process.exit(1);
  }
}

runAllTests().catch(error => {
  console.error('テスト実行中にエラーが発生しました:', error);
  process.exit(1);
});
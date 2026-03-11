/**
 * Simple API Test Script
 * Run this after starting the server with: npm run server
 * Then in another terminal: node server/test-api.js
 */

const API_BASE = 'http://localhost:3000/api';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  // eslint-disable-next-line no-console
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(name, method, endpoint, body = null) {
  try {
    log(`\n🧪 Testing: ${name}`, 'cyan');
    log(`   ${method} ${endpoint}`, 'blue');

    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };

    if (body) {
      options.body = JSON.stringify(body);
      log(`   Body: ${JSON.stringify(body)}`, 'yellow');
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const data = await response.json();

    if (response.ok) {
      log(`   ✅ Success (${response.status})`, 'green');
      log(`   Response: ${JSON.stringify(data, null, 2)}`, 'green');
      return { success: true, data };
    } else {
      log(`   ❌ Error (${response.status})`, 'red');
      log(`   Response: ${JSON.stringify(data, null, 2)}`, 'red');
      return { success: false, data };
    }
  } catch (error) {
    log(`   ❌ Request failed: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function runTests() {
  log('\n' + '='.repeat(60), 'cyan');
  log('Counter API Test Suite', 'cyan');
  log('='.repeat(60) + '\n', 'cyan');

  let passed = 0;
  let failed = 0;

  // Test 1: Health Check
  const health = await testEndpoint('Health Check', 'GET', '/health');
  health.success ? passed++ : failed++;

  // Test 2: Get Initial Counter Value
  const initial = await testEndpoint('Get Initial Counter', 'GET', '/counter');
  initial.success ? passed++ : failed++;

  // Test 3: Increment by default (1)
  const inc1 = await testEndpoint(
    'Increment by 1 (default)',
    'POST',
    '/counter/increment'
  );
  inc1.success ? passed++ : failed++;

  // Test 4: Increment by 5
  const inc5 = await testEndpoint(
    'Increment by 5',
    'POST',
    '/counter/increment',
    {
      amount: 5,
    }
  );
  inc5.success ? passed++ : failed++;

  // Test 5: Get Counter Value (should be 6)
  const current1 = await testEndpoint('Get Counter Value', 'GET', '/counter');
  current1.success ? passed++ : failed++;

  // Test 6: Decrement by default (1)
  const dec1 = await testEndpoint(
    'Decrement by 1 (default)',
    'POST',
    '/counter/decrement'
  );
  dec1.success ? passed++ : failed++;

  // Test 7: Decrement by 3
  const dec3 = await testEndpoint(
    'Decrement by 3',
    'POST',
    '/counter/decrement',
    { amount: 3 }
  );
  dec3.success ? passed++ : failed++;

  // Test 8: Decrement by Ten
  const decTen = await testEndpoint(
    'Decrement by Ten',
    'POST',
    '/counter/decrement-ten'
  );
  decTen.success ? passed++ : failed++;

  // Test 9: Reset to 0
  const reset0 = await testEndpoint('Reset to 0', 'POST', '/counter/reset');
  reset0.success ? passed++ : failed++;

  // Test 10: Reset to 100
  const reset100 = await testEndpoint(
    'Reset to 100',
    'POST',
    '/counter/reset',
    {
      value: 100,
    }
  );
  reset100.success ? passed++ : failed++;

  // Test 11: Invalid increment (negative amount) - should fail
  log('\n📋 Testing Error Handling:', 'yellow');
  const invalidInc = await testEndpoint(
    'Invalid Increment (negative)',
    'POST',
    '/counter/increment',
    { amount: -5 }
  );
  !invalidInc.success ? passed++ : failed++;

  // Test 12: Invalid increment (string amount) - should fail
  const invalidInc2 = await testEndpoint(
    'Invalid Increment (string)',
    'POST',
    '/counter/increment',
    { amount: 'five' }
  );
  !invalidInc2.success ? passed++ : failed++;

  // Test 13: Invalid decrement (zero amount) - should fail
  const invalidDec = await testEndpoint(
    'Invalid Decrement (zero)',
    'POST',
    '/counter/decrement',
    { amount: 0 }
  );
  !invalidDec.success ? passed++ : failed++;

  // Test 14: Invalid reset (string value) - should fail
  const invalidReset = await testEndpoint(
    'Invalid Reset (string)',
    'POST',
    '/counter/reset',
    { value: 'zero' }
  );
  !invalidReset.success ? passed++ : failed++;

  // Test 15: Get API Documentation
  const docs = await testEndpoint('Get API Documentation', 'GET', '/docs');
  docs.success ? passed++ : failed++;

  // Test 16: Invalid endpoint - should fail
  const invalid404 = await testEndpoint(
    'Invalid Endpoint (404)',
    'GET',
    '/invalid'
  );
  !invalid404.success ? passed++ : failed++;

  // Summary
  log('\n' + '='.repeat(60), 'cyan');
  log('Test Results', 'cyan');
  log('='.repeat(60), 'cyan');
  log(`✅ Passed: ${passed}`, 'green');
  log(`❌ Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  log(`📊 Total: ${passed + failed}`, 'blue');
  log('='.repeat(60) + '\n', 'cyan');

  if (failed === 0) {
    log('🎉 All tests passed!', 'green');
  } else {
    log('⚠️  Some tests failed. Check the output above.', 'yellow');
  }
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch(`${API_BASE}/health`);
    if (response.ok) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

// Main execution
(async () => {
  log('\n🔍 Checking if server is running...', 'yellow');

  const isRunning = await checkServer();

  if (!isRunning) {
    log('\n❌ Server is not running!', 'red');
    log('Please start the server first:', 'yellow');
    log('   npm run server\n', 'cyan');
    process.exit(1);
  }

  log('✅ Server is running!\n', 'green');

  await runTests();

  process.exit(0);
})();

/**
 * Test script for the increment-by-4 feature
 * Run this after starting the server with: npm run server
 * Then in another terminal: node test-increment-by-4.js
 */

const API_BASE = 'http://localhost:3000/api';

async function testIncrementByFour() {
  try {
    console.log('\n🧪 Testing Increment-by-4 Feature\n');

    // Reset counter to 0
    console.log('1. Resetting counter to 0...');
    let response = await fetch(`${API_BASE}/counter/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    let data = await response.json();
    console.log(`   ✅ Counter reset to: ${data.value}\n`);

    // Get current value
    console.log('2. Getting current counter value...');
    response = await fetch(`${API_BASE}/counter`);
    data = await response.json();
    console.log(`   ✅ Current value: ${data.value}\n`);

    // Increment by 4
    console.log('3. Incrementing counter by 4...');
    response = await fetch(`${API_BASE}/counter/increment-by-4`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    data = await response.json();
    console.log(`   ✅ Previous value: ${data.previousValue}`);
    console.log(`   ✅ New value: ${data.value}`);
    console.log(`   ✅ Change: ${data.change}`);
    console.log(`   ✅ Operation: ${data.operation}\n`);

    // Increment by 4 again
    console.log('4. Incrementing counter by 4 again...');
    response = await fetch(`${API_BASE}/counter/increment-by-4`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    data = await response.json();
    console.log(`   ✅ Previous value: ${data.previousValue}`);
    console.log(`   ✅ New value: ${data.value}`);
    console.log(`   ✅ Change: ${data.change}\n`);

    // Verify final value
    console.log('5. Verifying final counter value...');
    response = await fetch(`${API_BASE}/counter`);
    data = await response.json();
    console.log(`   ✅ Final value: ${data.value}\n`);

    if (data.value === 8) {
      console.log('🎉 All tests passed! Increment-by-4 works correctly!\n');
    } else {
      console.log(`❌ Test failed! Expected 8, got ${data.value}\n`);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nMake sure the server is running: npm run server\n');
  }
}

// Check if server is running
async function checkServer() {
  try {
    const response = await fetch(`${API_BASE}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

(async () => {
  console.log('🔍 Checking if server is running...');
  const isRunning = await checkServer();

  if (!isRunning) {
    console.log('\n❌ Server is not running!');
    console.log('Please start the server first:');
    console.log('   npm run server\n');
    process.exit(1);
  }

  console.log('✅ Server is running!\n');
  await testIncrementByFour();
})();

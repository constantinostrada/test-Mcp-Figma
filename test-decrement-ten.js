/* eslint-disable no-console */
/**
 * Quick test for decrement-by-ten endpoint
 * Make sure server is running: npm run server
 * Then run: node test-decrement-ten.js
 */

const API_BASE = 'http://localhost:3000/api';

async function testDecrementByTen() {
  try {
    console.log('\n🧪 Testing Decrement-by-Ten Feature\n');

    // Reset counter to a known value
    console.log('1️⃣  Resetting counter to 50...');
    const resetResponse = await fetch(`${API_BASE}/counter/reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 50 }),
    });
    const resetData = await resetResponse.json();
    console.log('   ✅ Counter reset to:', resetData.value);

    // Test decrement-by-ten
    console.log('\n2️⃣  Testing decrement-by-ten endpoint...');
    const decrementResponse = await fetch(`${API_BASE}/counter/decrement-ten`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (decrementResponse.ok) {
      const decrementData = await decrementResponse.json();
      console.log('   ✅ Success!');
      console.log('   Response:', JSON.stringify(decrementData, null, 2));

      // Verify the counter was decremented by 10
      if (decrementData.value === 40 && decrementData.change === -10) {
        console.log('\n✅ ✅ ✅ PASS: Counter correctly decremented by 10!');
        console.log(
          `   Previous value: ${decrementData.previousValue} → New value: ${decrementData.value}`
        );
      } else {
        console.log('\n❌ FAIL: Counter value is incorrect');
      }
    } else {
      const errorData = await decrementResponse.json();
      console.log('   ❌ Error:', decrementResponse.status);
      console.log('   Response:', JSON.stringify(errorData, null, 2));
    }

    // Get final counter value
    console.log('\n3️⃣  Getting final counter value...');
    const getResponse = await fetch(`${API_BASE}/counter`);
    const getData = await getResponse.json();
    console.log('   Current counter value:', getData.value);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Make sure the server is running with: npm run server\n');
  }
}

testDecrementByTen();

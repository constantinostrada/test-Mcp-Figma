/**
 * Counter Logic Tests
 * Tests for the Counter class to ensure it meets all acceptance criteria
 */

import { Counter } from './counter.js';

/**
 * Simple test runner
 */
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  test(name, fn) {
    this.tests.push({ name, fn });
  }

  async run() {
    // eslint-disable-next-line no-console
    console.log('🧪 Running Counter Tests...\n');

    for (const { name, fn } of this.tests) {
      try {
        await fn();
        this.passed++;
        // eslint-disable-next-line no-console
        console.log(`✅ ${name}`);
      } catch (error) {
        this.failed++;
        // eslint-disable-next-line no-console
        console.error(`❌ ${name}`);
        // eslint-disable-next-line no-console
        console.error(`   Error: ${error.message}`);
      }
    }

    // eslint-disable-next-line no-console
    console.log('\n' + '='.repeat(50));
    // eslint-disable-next-line no-console
    console.log(
      `Total: ${this.tests.length} | Passed: ${this.passed} | Failed: ${this.failed}`
    );
    // eslint-disable-next-line no-console
    console.log('='.repeat(50));

    return this.failed === 0;
  }
}

// Helper function for assertions
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, but got ${actual}`);
  }
}

// Test Suite
const runner = new TestRunner();

// Test: Counter initialization
runner.test('Counter initializes with default value 0', () => {
  const counter = new Counter();
  assertEqual(counter.getValue(), 0, 'Initial value should be 0');
});

runner.test('Counter initializes with custom value', () => {
  const counter = new Counter(10);
  assertEqual(counter.getValue(), 10, 'Initial value should be 10');
});

// Test: Increment functionality
runner.test('Counter can increment by 1', async () => {
  const counter = new Counter(0);
  await counter.increment(1);
  assertEqual(counter.getValue(), 1, 'Counter should be 1 after increment');
});

runner.test('Counter can increment by default amount (1)', async () => {
  const counter = new Counter(0);
  await counter.increment();
  assertEqual(
    counter.getValue(),
    1,
    'Counter should be 1 after default increment'
  );
});

runner.test('Counter can increment multiple times', async () => {
  const counter = new Counter(0);
  await counter.increment(1);
  await counter.increment(1);
  await counter.increment(1);
  assertEqual(
    counter.getValue(),
    3,
    'Counter should be 3 after three increments'
  );
});

// Test: Decrement functionality
runner.test('Counter can decrement by 1', async () => {
  const counter = new Counter(10);
  await counter.decrement(1);
  assertEqual(counter.getValue(), 9, 'Counter should be 9 after decrement');
});

runner.test('Counter can decrement by default amount (1)', async () => {
  const counter = new Counter(10);
  await counter.decrement();
  assertEqual(
    counter.getValue(),
    9,
    'Counter should be 9 after default decrement'
  );
});

runner.test('Counter can decrement to negative values', async () => {
  const counter = new Counter(0);
  await counter.decrement(1);
  assertEqual(counter.getValue(), -1, 'Counter should support negative values');
});

// Test: Concurrent operations (critical for acceptance criteria)
runner.test('Counter handles concurrent increments correctly', async () => {
  const counter = new Counter(0);

  // Simulate concurrent increment operations
  const operations = [];
  for (let i = 0; i < 10; i++) {
    operations.push(counter.increment(1));
  }

  await Promise.all(operations);
  assertEqual(
    counter.getValue(),
    10,
    'Counter should be 10 after 10 concurrent increments'
  );
});

runner.test('Counter handles concurrent decrements correctly', async () => {
  const counter = new Counter(20);

  // Simulate concurrent decrement operations
  const operations = [];
  for (let i = 0; i < 10; i++) {
    operations.push(counter.decrement(1));
  }

  await Promise.all(operations);
  assertEqual(
    counter.getValue(),
    10,
    'Counter should be 10 after 10 concurrent decrements'
  );
});

runner.test(
  'Counter handles mixed concurrent operations correctly',
  async () => {
    const counter = new Counter(0);

    // Simulate mixed concurrent operations
    const operations = [];
    for (let i = 0; i < 5; i++) {
      operations.push(counter.increment(1));
      operations.push(counter.decrement(1));
    }

    await Promise.all(operations);
    assertEqual(
      counter.getValue(),
      0,
      'Counter should be 0 after equal increments and decrements'
    );
  }
);

// Test: Input validation (security best practice)
runner.test('Counter rejects non-numeric increment values', async () => {
  const counter = new Counter(0);
  let errorThrown = false;

  try {
    await counter.increment('invalid');
  } catch {
    errorThrown = true;
  }

  assert(errorThrown, 'Should throw error for non-numeric increment');
});

runner.test('Counter rejects non-numeric decrement values', async () => {
  const counter = new Counter(0);
  let errorThrown = false;

  try {
    await counter.decrement('invalid');
  } catch {
    errorThrown = true;
  }

  assert(errorThrown, 'Should throw error for non-numeric decrement');
});

runner.test('Counter rejects Infinity values', async () => {
  const counter = new Counter(0);
  let errorThrown = false;

  try {
    await counter.increment(Infinity);
  } catch {
    errorThrown = true;
  }

  assert(errorThrown, 'Should throw error for Infinity');
});

runner.test('Counter rejects NaN values', async () => {
  const counter = new Counter(0);
  let errorThrown = false;

  try {
    await counter.increment(NaN);
  } catch {
    errorThrown = true;
  }

  assert(errorThrown, 'Should throw error for NaN');
});

// Test: Observer pattern
runner.test('Counter notifies observers on value change', async () => {
  const counter = new Counter(0);
  let notificationCount = 0;
  let lastValue = null;

  counter.subscribe((value) => {
    notificationCount++;
    lastValue = value;
  });

  await counter.increment(1);

  assertEqual(notificationCount, 1, 'Observer should be notified once');
  assertEqual(lastValue, 1, 'Observer should receive correct value');
});

runner.test('Counter can unsubscribe observers', async () => {
  const counter = new Counter(0);
  let notificationCount = 0;

  const unsubscribe = counter.subscribe(() => {
    notificationCount++;
  });

  await counter.increment(1);
  unsubscribe();
  await counter.increment(1);

  assertEqual(
    notificationCount,
    1,
    'Observer should only be notified before unsubscribe'
  );
});

// Test: Reset functionality
runner.test('Counter can reset to default value', async () => {
  const counter = new Counter(0);
  await counter.increment(5);
  await counter.reset();
  assertEqual(counter.getValue(), 0, 'Counter should reset to 0');
});

runner.test('Counter can reset to custom value', async () => {
  const counter = new Counter(0);
  await counter.increment(5);
  await counter.reset(10);
  assertEqual(counter.getValue(), 10, 'Counter should reset to 10');
});

// Test: Integer handling
runner.test('Counter converts float increments to integers', async () => {
  const counter = new Counter(0);
  await counter.increment(1.7);
  assertEqual(counter.getValue(), 1, 'Counter should floor float values');
});

runner.test('Counter converts float decrements to integers', async () => {
  const counter = new Counter(10);
  await counter.decrement(2.9);
  assertEqual(counter.getValue(), 8, 'Counter should floor float values');
});

// Test: Pending operations tracking
runner.test('Counter tracks pending operations', async () => {
  const counter = new Counter(0);

  const operation = counter.increment(1);
  const hasPending = counter.hasPendingOperations();
  await operation;
  const hasNoPending = !counter.hasPendingOperations();

  assert(hasPending, 'Should have pending operations during execution');
  assert(hasNoPending, 'Should have no pending operations after completion');
});

// Run all tests
runner.run().then((success) => {
  if (success) {
    // eslint-disable-next-line no-console
    console.log('\n✅ All tests passed!');
  } else {
    // eslint-disable-next-line no-console
    console.log('\n❌ Some tests failed!');
  }
});

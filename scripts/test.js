
#!/usr/bin/env node

// This is a simple script to run tests with Vitest
const { execSync } = require('child_process');

// Run the tests
try {
  console.log('Running tests...');
  execSync('npx vitest run', { stdio: 'inherit' });
  console.log('Tests completed successfully!');
} catch (error) {
  console.error('Tests failed!');
  process.exit(1);
}

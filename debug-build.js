const { exec } = require('child_process');

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  console.error('Stack:', reason.stack);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  console.error('Stack:', error.stack);
});

const build = exec('npx next build', { cwd: __dirname });

build.stdout.on('data', (data) => {
  console.log(data.toString());
});

build.stderr.on('data', (data) => {
  console.error(data.toString());
});

build.on('exit', (code) => {
  console.log(`Build exited with code: ${code}`);
  process.exit(code);
});

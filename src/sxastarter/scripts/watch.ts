import chokidar from 'chokidar';
import { spawn } from 'child_process';
import path from 'path';

const componentsPath = path.resolve('src/components');
const bootstrapScript = 'npm run bootstrap';

console.log(`🔍 Watching for component changes in: ${componentsPath}`);
console.log('📦 Bootstrap will run automatically when components are added/modified');
console.log('Press Ctrl+C to stop watching...\n');

// Watch for .astro files in the components directory and subdirectories
const watcher = chokidar.watch(`${componentsPath}/**/*.astro`, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true // Don't run bootstrap on initial scan
});

let isRunningBootstrap = false;

watcher
  .on('add', (filePath) => {
    console.log(`➕ New component detected: ${path.relative(process.cwd(), filePath)}`);
    runBootstrap();
  })
  .on('change', (filePath) => {
    console.log(`🔄 Component modified: ${path.relative(process.cwd(), filePath)}`);
    runBootstrap();
  })
  .on('unlink', (filePath) => {
    console.log(`🗑️  Component removed: ${path.relative(process.cwd(), filePath)}`);
    runBootstrap();
  })
  .on('error', (error) => {
    console.error('❌ Watch error:', error);
  });

function runBootstrap() {
  if (isRunningBootstrap) {
    console.log('⏳ Bootstrap already running, skipping...');
    return;
  }

  isRunningBootstrap = true;
  console.log('🚀 Running bootstrap...');

  const bootstrapProcess = spawn('npm', ['run', 'bootstrap'], {
    stdio: 'inherit',
    shell: true
  });

  bootstrapProcess.on('close', (code) => {
    isRunningBootstrap = false;
    if (code === 0) {
      console.log('✅ Bootstrap completed successfully\n');
    } else {
      console.error(`❌ Bootstrap failed with exit code ${code}\n`);
    }
  });

  bootstrapProcess.on('error', (error) => {
    isRunningBootstrap = false;
    console.error('❌ Bootstrap error:', error);
  });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping watch...');
  watcher.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Stopping watch...');
  watcher.close();
  process.exit(0);
});

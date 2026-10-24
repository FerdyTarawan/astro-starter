import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const production =
  process.env.NODE_ENV === 'production' || process.env.npm_config_production === 'true';
if (!process.env.CI && !production && existsSync('.git')) {
  const result = spawnSync('lefthook', ['install'], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
}

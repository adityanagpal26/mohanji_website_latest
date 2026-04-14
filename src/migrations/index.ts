import * as migration_20260414_104413_initial from './20260414_104413_initial';

export const migrations = [
  {
    up: migration_20260414_104413_initial.up,
    down: migration_20260414_104413_initial.down,
    name: '20260414_104413_initial'
  },
];

import * as migration_20260414_104413_initial from './20260414_104413_initial';
import * as migration_20260415_134023_meditations_duration from './20260415_134023_meditations_duration';

export const migrations = [
  {
    up: migration_20260414_104413_initial.up,
    down: migration_20260414_104413_initial.down,
    name: '20260414_104413_initial',
  },
  {
    up: migration_20260415_134023_meditations_duration.up,
    down: migration_20260415_134023_meditations_duration.down,
    name: '20260415_134023_meditations_duration',
  },
];

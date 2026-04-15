import * as migration_20260414_104413_initial from './20260414_104413_initial';
import * as migration_20260415_134023_meditations_duration from './20260415_134023_meditations_duration';
import * as migration_20260415_140309_meditations_cms_fields from './20260415_140309_meditations_cms_fields';
import * as migration_20260415_144726_pages_meditations_listing_enum from './20260415_144726_pages_meditations_listing_enum';
import * as migration_20260415_150000_practices_restructure from './20260415_150000_practices_restructure';
import * as migration_20260415_160000_mai_tri_content from './20260415_160000_mai_tri_content';
import * as migration_20260415_170000_application_collections from './20260415_170000_application_collections';

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
  {
    up: migration_20260415_140309_meditations_cms_fields.up,
    down: migration_20260415_140309_meditations_cms_fields.down,
    name: '20260415_140309_meditations_cms_fields',
  },
  {
    up: migration_20260415_144726_pages_meditations_listing_enum.up,
    down: migration_20260415_144726_pages_meditations_listing_enum.down,
    name: '20260415_144726_pages_meditations_listing_enum',
  },
  {
    up: migration_20260415_150000_practices_restructure.up,
    down: migration_20260415_150000_practices_restructure.down,
    name: '20260415_150000_practices_restructure',
  },
  {
    up: migration_20260415_160000_mai_tri_content.up,
    down: migration_20260415_160000_mai_tri_content.down,
    name: '20260415_160000_mai_tri_content',
  },
  {
    up: migration_20260415_170000_application_collections.up,
    down: migration_20260415_170000_application_collections.down,
    name: '20260415_170000_application_collections',
  },
];

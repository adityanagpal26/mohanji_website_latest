import * as migration_20260414_104413_initial from './20260414_104413_initial';
import * as migration_20260415_134023_meditations_duration from './20260415_134023_meditations_duration';
import * as migration_20260415_140309_meditations_cms_fields from './20260415_140309_meditations_cms_fields';
import * as migration_20260415_144726_pages_meditations_listing_enum from './20260415_144726_pages_meditations_listing_enum';
import * as migration_20260415_150000_practices_restructure from './20260415_150000_practices_restructure';
import * as migration_20260415_160000_mai_tri_content from './20260415_160000_mai_tri_content';
import * as migration_20260415_170000_application_collections from './20260415_170000_application_collections';
import * as migration_20260415_180000_traditional_yoga_page from './20260415_180000_traditional_yoga_page';
import * as migration_20260416_190000_awakening_yoga_nidra_page from './20260416_190000_awakening_yoga_nidra_page';
import * as migration_20260416_200000_youth_club_page from './20260416_200000_youth_club_page';
import * as migration_20260416_210000_volunteer_page from './20260416_210000_volunteer_page';
import * as migration_20260416_220000_events_content_fields from './20260416_220000_events_content_fields';
import * as migration_20260416_230000_courses_landing_page from './20260416_230000_courses_landing_page';
import * as migration_20260417_100000_press_coverage_fields from './20260417_100000_press_coverage_fields';
import * as migration_20260417_110000_media_landing_page from './20260417_110000_media_landing_page';
import * as migration_20260417_120000_posts_location_field from './20260417_120000_posts_location_field';
import * as migration_20260417_130000_annual_reports from './20260417_130000_annual_reports';
import * as migration_20260417_131000_annual_reports_locked_docs from './20260417_131000_annual_reports_locked_docs';
import * as migration_20260417_140000_books_audios_store_fields from './20260417_140000_books_audios_store_fields';
import * as migration_20260417_150000_featured_on_home from './20260417_150000_featured_on_home';
import * as migration_20260418_100000_site_settings_favicon from './20260418_100000_site_settings_favicon';
import * as migration_20260419_100000_media_s3_prefix from './20260419_100000_media_s3_prefix';

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
  {
    up: migration_20260415_180000_traditional_yoga_page.up,
    down: migration_20260415_180000_traditional_yoga_page.down,
    name: '20260415_180000_traditional_yoga_page',
  },
  {
    up: migration_20260416_190000_awakening_yoga_nidra_page.up,
    down: migration_20260416_190000_awakening_yoga_nidra_page.down,
    name: '20260416_190000_awakening_yoga_nidra_page',
  },
  {
    up: migration_20260416_200000_youth_club_page.up,
    down: migration_20260416_200000_youth_club_page.down,
    name: '20260416_200000_youth_club_page',
  },
  {
    up: migration_20260416_210000_volunteer_page.up,
    down: migration_20260416_210000_volunteer_page.down,
    name: '20260416_210000_volunteer_page',
  },
  {
    up: migration_20260416_220000_events_content_fields.up,
    down: migration_20260416_220000_events_content_fields.down,
    name: '20260416_220000_events_content_fields',
  },
  {
    up: migration_20260416_230000_courses_landing_page.up,
    down: migration_20260416_230000_courses_landing_page.down,
    name: '20260416_230000_courses_landing_page',
  },
  {
    up: migration_20260417_100000_press_coverage_fields.up,
    down: migration_20260417_100000_press_coverage_fields.down,
    name: '20260417_100000_press_coverage_fields',
  },
  {
    up: migration_20260417_110000_media_landing_page.up,
    down: migration_20260417_110000_media_landing_page.down,
    name: '20260417_110000_media_landing_page',
  },
  {
    up: migration_20260417_120000_posts_location_field.up,
    down: migration_20260417_120000_posts_location_field.down,
    name: '20260417_120000_posts_location_field',
  },
  {
    up: migration_20260417_130000_annual_reports.up,
    down: migration_20260417_130000_annual_reports.down,
    name: '20260417_130000_annual_reports',
  },
  {
    up: migration_20260417_131000_annual_reports_locked_docs.up,
    down: migration_20260417_131000_annual_reports_locked_docs.down,
    name: '20260417_131000_annual_reports_locked_docs',
  },
  {
    up: migration_20260417_140000_books_audios_store_fields.up,
    down: migration_20260417_140000_books_audios_store_fields.down,
    name: '20260417_140000_books_audios_store_fields',
  },
  {
    up: migration_20260417_150000_featured_on_home.up,
    down: migration_20260417_150000_featured_on_home.down,
    name: '20260417_150000_featured_on_home',
  },
  {
    up: migration_20260418_100000_site_settings_favicon.up,
    down: migration_20260418_100000_site_settings_favicon.down,
    name: '20260418_100000_site_settings_favicon',
  },
  {
    up: migration_20260419_100000_media_s3_prefix.up,
    down: migration_20260419_100000_media_s3_prefix.down,
    name: '20260419_100000_media_s3_prefix',
  },
];

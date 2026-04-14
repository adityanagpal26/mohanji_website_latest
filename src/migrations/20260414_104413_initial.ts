import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'subscriber');
  CREATE TYPE "public"."enum_pages_blocks_hero_banner_overlay_style" AS ENUM('gradient', 'dark', 'none');
  CREATE TYPE "public"."enum_pages_blocks_hero_banner_alignment" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum_pages_blocks_rich_content_container_width" AS ENUM('normal', 'narrow', 'full');
  CREATE TYPE "public"."enum_pages_blocks_image_gallery_layout" AS ENUM('grid', 'masonry', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_image_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_call_to_action_style" AS ENUM('teal', 'rose', 'white', 'gold');
  CREATE TYPE "public"."enum_pages_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_video_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum_pages_blocks_testimonial_layout" AS ENUM('carousel', 'grid');
  CREATE TYPE "public"."enum_pages_blocks_event_carousel_filter" AS ENUM('upcoming', 'past', 'all');
  CREATE TYPE "public"."enum_pages_blocks_posts_grid_post_type" AS ENUM('news', 'blog', 'press-coverage');
  CREATE TYPE "public"."enum_pages_blocks_icon_list_layout" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum_pages_blocks_social_icons_items_platform" AS ENUM('facebook', 'youtube', 'instagram', 'twitter', 'linkedin');
  CREATE TYPE "public"."enum_pages_blocks_divider_style" AS ENUM('gold', 'grey', 'space');
  CREATE TYPE "public"."enum_pages_blocks_divider_spacing" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_columns_layout_columns_width" AS ENUM('equal', '1/3', '2/3', '1/4', '3/4');
  CREATE TYPE "public"."enum_pages_blocks_columns_layout_vertical_align" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum_pages_wim_content_initiatives_category" AS ENUM('founded', 'inspired', 'supported');
  CREATE TYPE "public"."enum_pages_page_type" AS ENUM('generic', 'home', 'who-is-mohanji', 'foundation', 'life-journey', 'global-council', 'mohanji-spaces', 'golden-path', 'global-ambassador', 'awards');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_banner_overlay_style" AS ENUM('gradient', 'dark', 'none');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_banner_alignment" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_content_container_width" AS ENUM('normal', 'narrow', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_image_gallery_layout" AS ENUM('grid', 'masonry', 'carousel');
  CREATE TYPE "public"."enum__pages_v_blocks_image_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_call_to_action_style" AS ENUM('teal', 'rose', 'white', 'gold');
  CREATE TYPE "public"."enum__pages_v_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_video_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonial_layout" AS ENUM('carousel', 'grid');
  CREATE TYPE "public"."enum__pages_v_blocks_event_carousel_filter" AS ENUM('upcoming', 'past', 'all');
  CREATE TYPE "public"."enum__pages_v_blocks_posts_grid_post_type" AS ENUM('news', 'blog', 'press-coverage');
  CREATE TYPE "public"."enum__pages_v_blocks_icon_list_layout" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum__pages_v_blocks_social_icons_items_platform" AS ENUM('facebook', 'youtube', 'instagram', 'twitter', 'linkedin');
  CREATE TYPE "public"."enum__pages_v_blocks_divider_style" AS ENUM('gold', 'grey', 'space');
  CREATE TYPE "public"."enum__pages_v_blocks_divider_spacing" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_layout_columns_width" AS ENUM('equal', '1/3', '2/3', '1/4', '3/4');
  CREATE TYPE "public"."enum__pages_v_blocks_columns_layout_vertical_align" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum__pages_v_version_wim_content_initiatives_category" AS ENUM('founded', 'inspired', 'supported');
  CREATE TYPE "public"."enum__pages_v_version_page_type" AS ENUM('generic', 'home', 'who-is-mohanji', 'foundation', 'life-journey', 'global-council', 'mohanji-spaces', 'golden-path', 'global-ambassador', 'awards');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_post_type" AS ENUM('news', 'blog', 'press-coverage', 'interview');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_post_type" AS ENUM('news', 'blog', 'press-coverage', 'interview');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_meditations_blocks_hero_banner_overlay_style" AS ENUM('gradient', 'dark', 'none');
  CREATE TYPE "public"."enum_meditations_blocks_hero_banner_alignment" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum_meditations_blocks_rich_content_container_width" AS ENUM('normal', 'narrow', 'full');
  CREATE TYPE "public"."enum_meditations_blocks_image_gallery_layout" AS ENUM('grid', 'masonry', 'carousel');
  CREATE TYPE "public"."enum_meditations_blocks_image_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_meditations_blocks_call_to_action_style" AS ENUM('teal', 'rose', 'white', 'gold');
  CREATE TYPE "public"."enum_meditations_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_meditations_blocks_video_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum_meditations_blocks_testimonial_layout" AS ENUM('carousel', 'grid');
  CREATE TYPE "public"."enum_meditations_blocks_event_carousel_filter" AS ENUM('upcoming', 'past', 'all');
  CREATE TYPE "public"."enum_meditations_blocks_posts_grid_post_type" AS ENUM('news', 'blog', 'press-coverage');
  CREATE TYPE "public"."enum_meditations_blocks_icon_list_layout" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum_meditations_blocks_social_icons_items_platform" AS ENUM('facebook', 'youtube', 'instagram', 'twitter', 'linkedin');
  CREATE TYPE "public"."enum_meditations_blocks_divider_style" AS ENUM('gold', 'grey', 'space');
  CREATE TYPE "public"."enum_meditations_blocks_divider_spacing" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_meditations_blocks_columns_layout_columns_width" AS ENUM('equal', '1/3', '2/3', '1/4', '3/4');
  CREATE TYPE "public"."enum_meditations_blocks_columns_layout_vertical_align" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum_practices_blocks_hero_banner_overlay_style" AS ENUM('gradient', 'dark', 'none');
  CREATE TYPE "public"."enum_practices_blocks_hero_banner_alignment" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum_practices_blocks_rich_content_container_width" AS ENUM('normal', 'narrow', 'full');
  CREATE TYPE "public"."enum_practices_blocks_image_gallery_layout" AS ENUM('grid', 'masonry', 'carousel');
  CREATE TYPE "public"."enum_practices_blocks_image_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_practices_blocks_call_to_action_style" AS ENUM('teal', 'rose', 'white', 'gold');
  CREATE TYPE "public"."enum_practices_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_practices_blocks_video_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum_practices_blocks_testimonial_layout" AS ENUM('carousel', 'grid');
  CREATE TYPE "public"."enum_practices_blocks_event_carousel_filter" AS ENUM('upcoming', 'past', 'all');
  CREATE TYPE "public"."enum_practices_blocks_posts_grid_post_type" AS ENUM('news', 'blog', 'press-coverage');
  CREATE TYPE "public"."enum_practices_blocks_icon_list_layout" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum_practices_blocks_social_icons_items_platform" AS ENUM('facebook', 'youtube', 'instagram', 'twitter', 'linkedin');
  CREATE TYPE "public"."enum_practices_blocks_divider_style" AS ENUM('gold', 'grey', 'space');
  CREATE TYPE "public"."enum_practices_blocks_divider_spacing" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_practices_blocks_columns_layout_columns_width" AS ENUM('equal', '1/3', '2/3', '1/4', '3/4');
  CREATE TYPE "public"."enum_practices_blocks_columns_layout_vertical_align" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum_courses_blocks_hero_banner_overlay_style" AS ENUM('gradient', 'dark', 'none');
  CREATE TYPE "public"."enum_courses_blocks_hero_banner_alignment" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum_courses_blocks_rich_content_container_width" AS ENUM('normal', 'narrow', 'full');
  CREATE TYPE "public"."enum_courses_blocks_image_gallery_layout" AS ENUM('grid', 'masonry', 'carousel');
  CREATE TYPE "public"."enum_courses_blocks_image_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_courses_blocks_call_to_action_style" AS ENUM('teal', 'rose', 'white', 'gold');
  CREATE TYPE "public"."enum_courses_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_courses_blocks_video_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum_courses_blocks_testimonial_layout" AS ENUM('carousel', 'grid');
  CREATE TYPE "public"."enum_courses_blocks_event_carousel_filter" AS ENUM('upcoming', 'past', 'all');
  CREATE TYPE "public"."enum_courses_blocks_posts_grid_post_type" AS ENUM('news', 'blog', 'press-coverage');
  CREATE TYPE "public"."enum_courses_blocks_icon_list_layout" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum_courses_blocks_social_icons_items_platform" AS ENUM('facebook', 'youtube', 'instagram', 'twitter', 'linkedin');
  CREATE TYPE "public"."enum_courses_blocks_divider_style" AS ENUM('gold', 'grey', 'space');
  CREATE TYPE "public"."enum_courses_blocks_divider_spacing" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_courses_blocks_columns_layout_columns_width" AS ENUM('equal', '1/3', '2/3', '1/4', '3/4');
  CREATE TYPE "public"."enum_courses_blocks_columns_layout_vertical_align" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum_courses_level" AS ENUM('beginner', 'intermediate', 'advanced');
  CREATE TYPE "public"."enum_courses_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__courses_v_blocks_hero_banner_overlay_style" AS ENUM('gradient', 'dark', 'none');
  CREATE TYPE "public"."enum__courses_v_blocks_hero_banner_alignment" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum__courses_v_blocks_rich_content_container_width" AS ENUM('normal', 'narrow', 'full');
  CREATE TYPE "public"."enum__courses_v_blocks_image_gallery_layout" AS ENUM('grid', 'masonry', 'carousel');
  CREATE TYPE "public"."enum__courses_v_blocks_image_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__courses_v_blocks_call_to_action_style" AS ENUM('teal', 'rose', 'white', 'gold');
  CREATE TYPE "public"."enum__courses_v_blocks_card_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__courses_v_blocks_video_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum__courses_v_blocks_testimonial_layout" AS ENUM('carousel', 'grid');
  CREATE TYPE "public"."enum__courses_v_blocks_event_carousel_filter" AS ENUM('upcoming', 'past', 'all');
  CREATE TYPE "public"."enum__courses_v_blocks_posts_grid_post_type" AS ENUM('news', 'blog', 'press-coverage');
  CREATE TYPE "public"."enum__courses_v_blocks_icon_list_layout" AS ENUM('vertical', 'horizontal');
  CREATE TYPE "public"."enum__courses_v_blocks_social_icons_items_platform" AS ENUM('facebook', 'youtube', 'instagram', 'twitter', 'linkedin');
  CREATE TYPE "public"."enum__courses_v_blocks_divider_style" AS ENUM('gold', 'grey', 'space');
  CREATE TYPE "public"."enum__courses_v_blocks_divider_spacing" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum__courses_v_blocks_columns_layout_columns_width" AS ENUM('equal', '1/3', '2/3', '1/4', '3/4');
  CREATE TYPE "public"."enum__courses_v_blocks_columns_layout_vertical_align" AS ENUM('top', 'center', 'bottom');
  CREATE TYPE "public"."enum__courses_v_version_level" AS ENUM('beginner', 'intermediate', 'advanced');
  CREATE TYPE "public"."enum__courses_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_lessons_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_events_event_type" AS ENUM('retreat', 'satsang', 'pilgrimage', 'celebration', 'workshop', 'online');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_books_book_type" AS ENUM('coffee-table', 'biography', 'children', 'translation');
  CREATE TYPE "public"."enum_audios_audio_type" AS ENUM('prayer', 'mantra', 'chant', 'talk');
  CREATE TYPE "public"."enum_forms_fields_field_type" AS ENUM('text', 'email', 'textarea', 'select', 'checkbox', 'phone', 'file');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('facebook', 'youtube', 'instagram', 'twitter', 'linkedin');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar,
  	"last_name" varchar,
  	"role" "enum_users_role" DEFAULT 'subscriber' NOT NULL,
  	"avatar_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "pages_blocks_hero_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"overlay_style" "enum_pages_blocks_hero_banner_overlay_style" DEFAULT 'gradient',
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"alignment" "enum_pages_blocks_hero_banner_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"container_width" "enum_pages_blocks_rich_content_container_width" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_pages_blocks_image_gallery_layout" DEFAULT 'grid',
  	"columns" "enum_pages_blocks_image_gallery_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subtext" varchar,
  	"primary_label" varchar,
  	"primary_url" varchar,
  	"secondary_label" varchar,
  	"secondary_url" varchar,
  	"style" "enum_pages_blocks_call_to_action_style" DEFAULT 'teal',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_pages_blocks_card_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum_pages_blocks_video_embed_aspect_ratio" DEFAULT '16:9',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"location" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_pages_blocks_testimonial_layout" DEFAULT 'carousel',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_donation_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region" varchar,
  	"provider" varchar,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_donation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Donate',
  	"subtext" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_event_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Upcoming Events',
  	"filter" "enum_pages_blocks_event_carousel_filter" DEFAULT 'upcoming',
  	"limit" numeric DEFAULT 6,
  	"view_all_url" varchar DEFAULT '/events',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"post_type" "enum_pages_blocks_posts_grid_post_type" DEFAULT 'news',
  	"limit" numeric DEFAULT 6,
  	"view_all_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar,
  	"url" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_icon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_pages_blocks_icon_list_layout" DEFAULT 'vertical',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_social_icons_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_pages_blocks_social_icons_items_platform",
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_social_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_divider_style" DEFAULT 'gold',
  	"spacing" "enum_pages_blocks_divider_spacing" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_columns_layout_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_pages_blocks_columns_layout_columns_width" DEFAULT 'equal',
  	"content" jsonb,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_columns_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"vertical_align" "enum_pages_blocks_columns_layout_vertical_align" DEFAULT 'top',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_audio_player" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"audio_id" integer,
  	"audio_file_id" integer,
  	"show_download_button" boolean DEFAULT true,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_download_grid_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar,
  	"language_code" varchar,
  	"file_id" integer,
  	"external_url" varchar,
  	"file_size" varchar
  );
  
  CREATE TABLE "pages_blocks_download_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Download in Your Language',
  	"meditation_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_home_content_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"link" varchar
  );
  
  CREATE TABLE "pages_home_content_where_is_mohanji" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"country" varchar,
  	"months" varchar,
  	"detail" varchar
  );
  
  CREATE TABLE "pages_home_content_activity_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"numeric" numeric
  );
  
  CREATE TABLE "pages_home_content_centres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "pages_home_content_platforms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_wim_content_initiatives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"category" "enum_pages_wim_content_initiatives_category" DEFAULT 'founded'
  );
  
  CREATE TABLE "pages_foundation_content_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_foundation_content_founded_platforms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "pages_foundation_content_inspired_platforms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "pages_foundation_content_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_life_journey_content_chapters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"period" varchar,
  	"text" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_life_journey_content_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_council_content_purpose_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_council_content_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"country" varchar,
  	"bio" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_council_content_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region" varchar,
  	"activities" varchar,
  	"countries" varchar
  );
  
  CREATE TABLE "pages_council_content_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar,
  	"detail" varchar
  );
  
  CREATE TABLE "pages_spaces_content_spaces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"location" varchar,
  	"type" varchar,
  	"description" varchar,
  	"contact" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_golden_path_content_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_ambassador_content_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"parent_id" integer,
  	"page_type" "enum_pages_page_type" DEFAULT 'generic',
  	"featured_image_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"home_content_about_section_image_id" integer,
  	"home_content_about_section_heading" varchar DEFAULT 'About Mohanji',
  	"home_content_about_section_body" varchar,
  	"home_content_about_section_body_second" varchar,
  	"home_content_about_section_quote" varchar,
  	"home_content_about_section_cta_label" varchar DEFAULT 'Know More',
  	"home_content_about_section_cta_link" varchar DEFAULT '/about/who-is-mohanji',
  	"home_content_where_is_mohanji_date_range" varchar,
  	"home_content_activities_section_image_id" integer,
  	"home_content_activities_section_body" varchar,
  	"home_content_meditations_cta_image_id" integer,
  	"wim_content_hero_image_id" integer,
  	"wim_content_intro_section_heading" varchar,
  	"wim_content_intro_section_para1" varchar,
  	"wim_content_intro_section_para2" varchar,
  	"wim_content_intro_section_para3" varchar,
  	"wim_content_portrait_image_id" integer,
  	"wim_content_opening_quote" varchar,
  	"wim_content_wide_image_id" integer,
  	"wim_content_second_intro_heading" varchar,
  	"wim_content_second_intro_para1" varchar,
  	"wim_content_second_intro_para2" varchar,
  	"wim_content_second_intro_para3" varchar,
  	"wim_content_pull_quote1" varchar,
  	"wim_content_liberation_section_heading" varchar,
  	"wim_content_liberation_section_text" varchar,
  	"wim_content_liberation_section_inline_quote" varchar,
  	"wim_content_liberation_section_text_continued" varchar,
  	"wim_content_pillars_section_heading" varchar,
  	"wim_content_pillars_section_text" varchar,
  	"wim_content_spirituality_section_heading" varchar,
  	"wim_content_spirituality_section_text" varchar,
  	"wim_content_life_quote" varchar,
  	"wim_content_footprint_section_heading" varchar,
  	"wim_content_footprint_section_text1" varchar,
  	"wim_content_footprint_section_text2" varchar,
  	"wim_content_leading_section_heading" varchar,
  	"wim_content_leading_section_text" varchar,
  	"wim_content_awards_quote" varchar,
  	"foundation_content_hero_image_id" integer,
  	"foundation_content_mission_statement" varchar,
  	"foundation_content_centers_text" varchar,
  	"life_journey_content_hero_image_id" integer,
  	"life_journey_content_intro_text" varchar,
  	"council_content_hero_image_id" integer,
  	"council_content_intro_text" varchar,
  	"spaces_content_hero_image_id" integer,
  	"spaces_content_intro_quote" varchar,
  	"spaces_content_intro_text1" varchar,
  	"spaces_content_intro_text2" varchar,
  	"golden_path_content_hero_image_id" integer,
  	"golden_path_content_intro_text1" varchar,
  	"golden_path_content_intro_text2" varchar,
  	"golden_path_content_quote" varchar,
  	"ambassador_content_hero_image_id" integer,
  	"ambassador_content_role_desc1" varchar,
  	"ambassador_content_role_desc2" varchar,
  	"ambassador_content_ambassador_name" varchar,
  	"ambassador_content_ambassador_title" varchar,
  	"ambassador_content_ambassador_photo_id" integer,
  	"ambassador_content_bio1" varchar,
  	"ambassador_content_bio2" varchar,
  	"ambassador_content_bio3" varchar,
  	"awards_page_content_hero_image_id" integer,
  	"awards_page_content_intro_text" varchar,
  	"awards_page_content_closing_quote" varchar,
  	"status" "enum_pages_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_hero_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"overlay_style" "enum__pages_v_blocks_hero_banner_overlay_style" DEFAULT 'gradient',
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"alignment" "enum__pages_v_blocks_hero_banner_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"container_width" "enum__pages_v_blocks_rich_content_container_width" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__pages_v_blocks_image_gallery_layout" DEFAULT 'grid',
  	"columns" "enum__pages_v_blocks_image_gallery_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subtext" varchar,
  	"primary_label" varchar,
  	"primary_url" varchar,
  	"secondary_label" varchar,
  	"secondary_url" varchar,
  	"style" "enum__pages_v_blocks_call_to_action_style" DEFAULT 'teal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum__pages_v_blocks_card_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum__pages_v_blocks_video_embed_aspect_ratio" DEFAULT '16:9',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"location" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__pages_v_blocks_testimonial_layout" DEFAULT 'carousel',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_donation_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"region" varchar,
  	"provider" varchar,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_donation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Donate',
  	"subtext" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_event_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Upcoming Events',
  	"filter" "enum__pages_v_blocks_event_carousel_filter" DEFAULT 'upcoming',
  	"limit" numeric DEFAULT 6,
  	"view_all_url" varchar DEFAULT '/events',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"post_type" "enum__pages_v_blocks_posts_grid_post_type" DEFAULT 'news',
  	"limit" numeric DEFAULT 6,
  	"view_all_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_icon_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar,
  	"url" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_icon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum__pages_v_blocks_icon_list_layout" DEFAULT 'vertical',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_social_icons_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__pages_v_blocks_social_icons_items_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_social_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_divider_style" DEFAULT 'gold',
  	"spacing" "enum__pages_v_blocks_divider_spacing" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_columns_layout_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__pages_v_blocks_columns_layout_columns_width" DEFAULT 'equal',
  	"content" jsonb,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_columns_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"vertical_align" "enum__pages_v_blocks_columns_layout_vertical_align" DEFAULT 'top',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_audio_player" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"audio_id" integer,
  	"audio_file_id" integer,
  	"show_download_button" boolean DEFAULT true,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_download_grid_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"language" varchar,
  	"language_code" varchar,
  	"file_id" integer,
  	"external_url" varchar,
  	"file_size" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_download_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Download in Your Language',
  	"meditation_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_version_home_content_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"link" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_home_content_where_is_mohanji" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"country" varchar,
  	"months" varchar,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_home_content_activity_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"numeric" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_home_content_centres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_home_content_platforms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_wim_content_initiatives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"category" "enum__pages_v_version_wim_content_initiatives_category" DEFAULT 'founded',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_foundation_content_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_foundation_content_founded_platforms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_foundation_content_inspired_platforms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_foundation_content_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_life_journey_content_chapters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"period" varchar,
  	"text" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_life_journey_content_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_council_content_purpose_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_council_content_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"country" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_council_content_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"region" varchar,
  	"activities" varchar,
  	"countries" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_council_content_how_it_works" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"step" varchar,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_spaces_content_spaces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"location" varchar,
  	"type" varchar,
  	"description" varchar,
  	"contact" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_golden_path_content_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_ambassador_content_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_parent_id" integer,
  	"version_page_type" "enum__pages_v_version_page_type" DEFAULT 'generic',
  	"version_featured_image_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_home_content_about_section_image_id" integer,
  	"version_home_content_about_section_heading" varchar DEFAULT 'About Mohanji',
  	"version_home_content_about_section_body" varchar,
  	"version_home_content_about_section_body_second" varchar,
  	"version_home_content_about_section_quote" varchar,
  	"version_home_content_about_section_cta_label" varchar DEFAULT 'Know More',
  	"version_home_content_about_section_cta_link" varchar DEFAULT '/about/who-is-mohanji',
  	"version_home_content_where_is_mohanji_date_range" varchar,
  	"version_home_content_activities_section_image_id" integer,
  	"version_home_content_activities_section_body" varchar,
  	"version_home_content_meditations_cta_image_id" integer,
  	"version_wim_content_hero_image_id" integer,
  	"version_wim_content_intro_section_heading" varchar,
  	"version_wim_content_intro_section_para1" varchar,
  	"version_wim_content_intro_section_para2" varchar,
  	"version_wim_content_intro_section_para3" varchar,
  	"version_wim_content_portrait_image_id" integer,
  	"version_wim_content_opening_quote" varchar,
  	"version_wim_content_wide_image_id" integer,
  	"version_wim_content_second_intro_heading" varchar,
  	"version_wim_content_second_intro_para1" varchar,
  	"version_wim_content_second_intro_para2" varchar,
  	"version_wim_content_second_intro_para3" varchar,
  	"version_wim_content_pull_quote1" varchar,
  	"version_wim_content_liberation_section_heading" varchar,
  	"version_wim_content_liberation_section_text" varchar,
  	"version_wim_content_liberation_section_inline_quote" varchar,
  	"version_wim_content_liberation_section_text_continued" varchar,
  	"version_wim_content_pillars_section_heading" varchar,
  	"version_wim_content_pillars_section_text" varchar,
  	"version_wim_content_spirituality_section_heading" varchar,
  	"version_wim_content_spirituality_section_text" varchar,
  	"version_wim_content_life_quote" varchar,
  	"version_wim_content_footprint_section_heading" varchar,
  	"version_wim_content_footprint_section_text1" varchar,
  	"version_wim_content_footprint_section_text2" varchar,
  	"version_wim_content_leading_section_heading" varchar,
  	"version_wim_content_leading_section_text" varchar,
  	"version_wim_content_awards_quote" varchar,
  	"version_foundation_content_hero_image_id" integer,
  	"version_foundation_content_mission_statement" varchar,
  	"version_foundation_content_centers_text" varchar,
  	"version_life_journey_content_hero_image_id" integer,
  	"version_life_journey_content_intro_text" varchar,
  	"version_council_content_hero_image_id" integer,
  	"version_council_content_intro_text" varchar,
  	"version_spaces_content_hero_image_id" integer,
  	"version_spaces_content_intro_quote" varchar,
  	"version_spaces_content_intro_text1" varchar,
  	"version_spaces_content_intro_text2" varchar,
  	"version_golden_path_content_hero_image_id" integer,
  	"version_golden_path_content_intro_text1" varchar,
  	"version_golden_path_content_intro_text2" varchar,
  	"version_golden_path_content_quote" varchar,
  	"version_ambassador_content_hero_image_id" integer,
  	"version_ambassador_content_role_desc1" varchar,
  	"version_ambassador_content_role_desc2" varchar,
  	"version_ambassador_content_ambassador_name" varchar,
  	"version_ambassador_content_ambassador_title" varchar,
  	"version_ambassador_content_ambassador_photo_id" integer,
  	"version_ambassador_content_bio1" varchar,
  	"version_ambassador_content_bio2" varchar,
  	"version_ambassador_content_bio3" varchar,
  	"version_awards_page_content_hero_image_id" integer,
  	"version_awards_page_content_intro_text" varchar,
  	"version_awards_page_content_closing_quote" varchar,
  	"version_status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"post_type" "enum_posts_post_type" DEFAULT 'news',
  	"excerpt" varchar,
  	"content" jsonb,
  	"featured_image_id" integer,
  	"author_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"status" "enum_posts_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_post_type" "enum__posts_v_version_post_type" DEFAULT 'news',
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_featured_image_id" integer,
  	"version_author_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "meditations_blocks_hero_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"overlay_style" "enum_meditations_blocks_hero_banner_overlay_style" DEFAULT 'gradient',
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"alignment" "enum_meditations_blocks_hero_banner_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"container_width" "enum_meditations_blocks_rich_content_container_width" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_image_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "meditations_blocks_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_meditations_blocks_image_gallery_layout" DEFAULT 'grid',
  	"columns" "enum_meditations_blocks_image_gallery_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subtext" varchar,
  	"primary_label" varchar,
  	"primary_url" varchar,
  	"secondary_label" varchar,
  	"secondary_url" varchar,
  	"style" "enum_meditations_blocks_call_to_action_style" DEFAULT 'teal',
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "meditations_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_meditations_blocks_card_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb
  );
  
  CREATE TABLE "meditations_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"caption" varchar,
  	"aspect_ratio" "enum_meditations_blocks_video_embed_aspect_ratio" DEFAULT '16:9',
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"location" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "meditations_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_meditations_blocks_testimonial_layout" DEFAULT 'carousel',
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_donation_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region" varchar NOT NULL,
  	"provider" varchar,
  	"url" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "meditations_blocks_donation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Donate',
  	"subtext" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_event_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Upcoming Events',
  	"filter" "enum_meditations_blocks_event_carousel_filter" DEFAULT 'upcoming',
  	"limit" numeric DEFAULT 6,
  	"view_all_url" varchar DEFAULT '/events',
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"post_type" "enum_meditations_blocks_posts_grid_post_type" DEFAULT 'news',
  	"limit" numeric DEFAULT 6,
  	"view_all_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_icon_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "meditations_blocks_icon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_meditations_blocks_icon_list_layout" DEFAULT 'vertical',
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_social_icons_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_meditations_blocks_social_icons_items_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "meditations_blocks_social_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_meditations_blocks_divider_style" DEFAULT 'gold',
  	"spacing" "enum_meditations_blocks_divider_spacing" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_columns_layout_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_meditations_blocks_columns_layout_columns_width" DEFAULT 'equal',
  	"content" jsonb,
  	"image_id" integer
  );
  
  CREATE TABLE "meditations_blocks_columns_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"vertical_align" "enum_meditations_blocks_columns_layout_vertical_align" DEFAULT 'top',
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_audio_player" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"audio_id" integer,
  	"audio_file_id" integer,
  	"show_download_button" boolean DEFAULT true,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_blocks_download_grid_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar NOT NULL,
  	"language_code" varchar,
  	"file_id" integer,
  	"external_url" varchar,
  	"file_size" varchar
  );
  
  CREATE TABLE "meditations_blocks_download_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Download in Your Language',
  	"meditation_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "meditations_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar NOT NULL,
  	"language_code" varchar,
  	"audio_file_id" integer,
  	"file_size" varchar
  );
  
  CREATE TABLE "meditations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"description" jsonb,
  	"featured_image_id" integer,
  	"benefits" jsonb,
  	"instructions" jsonb,
  	"audio_preview_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "practices_blocks_hero_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"overlay_style" "enum_practices_blocks_hero_banner_overlay_style" DEFAULT 'gradient',
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"alignment" "enum_practices_blocks_hero_banner_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"container_width" "enum_practices_blocks_rich_content_container_width" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_image_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "practices_blocks_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_practices_blocks_image_gallery_layout" DEFAULT 'grid',
  	"columns" "enum_practices_blocks_image_gallery_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"subtext" varchar,
  	"primary_label" varchar,
  	"primary_url" varchar,
  	"secondary_label" varchar,
  	"secondary_url" varchar,
  	"style" "enum_practices_blocks_call_to_action_style" DEFAULT 'teal',
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "practices_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_practices_blocks_card_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb
  );
  
  CREATE TABLE "practices_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL,
  	"caption" varchar,
  	"aspect_ratio" "enum_practices_blocks_video_embed_aspect_ratio" DEFAULT '16:9',
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"location" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "practices_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_practices_blocks_testimonial_layout" DEFAULT 'carousel',
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_donation_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region" varchar NOT NULL,
  	"provider" varchar,
  	"url" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "practices_blocks_donation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Donate',
  	"subtext" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_event_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Upcoming Events',
  	"filter" "enum_practices_blocks_event_carousel_filter" DEFAULT 'upcoming',
  	"limit" numeric DEFAULT 6,
  	"view_all_url" varchar DEFAULT '/events',
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"post_type" "enum_practices_blocks_posts_grid_post_type" DEFAULT 'news',
  	"limit" numeric DEFAULT 6,
  	"view_all_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_icon_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "practices_blocks_icon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_practices_blocks_icon_list_layout" DEFAULT 'vertical',
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_social_icons_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_practices_blocks_social_icons_items_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "practices_blocks_social_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_practices_blocks_divider_style" DEFAULT 'gold',
  	"spacing" "enum_practices_blocks_divider_spacing" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_columns_layout_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_practices_blocks_columns_layout_columns_width" DEFAULT 'equal',
  	"content" jsonb,
  	"image_id" integer
  );
  
  CREATE TABLE "practices_blocks_columns_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"vertical_align" "enum_practices_blocks_columns_layout_vertical_align" DEFAULT 'top',
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_audio_player" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"audio_id" integer,
  	"audio_file_id" integer,
  	"show_download_button" boolean DEFAULT true,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "practices_blocks_download_grid_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar NOT NULL,
  	"language_code" varchar,
  	"file_id" integer,
  	"external_url" varchar,
  	"file_size" varchar
  );
  
  CREATE TABLE "practices_blocks_download_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Download in Your Language',
  	"meditation_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "practices" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"description" jsonb,
  	"featured_image_id" integer,
  	"benefits" jsonb,
  	"how_it_works" jsonb,
  	"application_form_url" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "courses_blocks_hero_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"overlay_style" "enum_courses_blocks_hero_banner_overlay_style" DEFAULT 'gradient',
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"alignment" "enum_courses_blocks_hero_banner_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"container_width" "enum_courses_blocks_rich_content_container_width" DEFAULT 'normal',
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_image_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "courses_blocks_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_courses_blocks_image_gallery_layout" DEFAULT 'grid',
  	"columns" "enum_courses_blocks_image_gallery_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subtext" varchar,
  	"primary_label" varchar,
  	"primary_url" varchar,
  	"secondary_label" varchar,
  	"secondary_url" varchar,
  	"style" "enum_courses_blocks_call_to_action_style" DEFAULT 'teal',
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "courses_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum_courses_blocks_card_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "courses_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum_courses_blocks_video_embed_aspect_ratio" DEFAULT '16:9',
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"location" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "courses_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_courses_blocks_testimonial_layout" DEFAULT 'carousel',
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_donation_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region" varchar,
  	"provider" varchar,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "courses_blocks_donation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Donate',
  	"subtext" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_event_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Upcoming Events',
  	"filter" "enum_courses_blocks_event_carousel_filter" DEFAULT 'upcoming',
  	"limit" numeric DEFAULT 6,
  	"view_all_url" varchar DEFAULT '/events',
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"post_type" "enum_courses_blocks_posts_grid_post_type" DEFAULT 'news',
  	"limit" numeric DEFAULT 6,
  	"view_all_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_icon_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar,
  	"url" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "courses_blocks_icon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum_courses_blocks_icon_list_layout" DEFAULT 'vertical',
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_social_icons_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_courses_blocks_social_icons_items_platform",
  	"url" varchar
  );
  
  CREATE TABLE "courses_blocks_social_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_courses_blocks_divider_style" DEFAULT 'gold',
  	"spacing" "enum_courses_blocks_divider_spacing" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_columns_layout_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" "enum_courses_blocks_columns_layout_columns_width" DEFAULT 'equal',
  	"content" jsonb,
  	"image_id" integer
  );
  
  CREATE TABLE "courses_blocks_columns_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"vertical_align" "enum_courses_blocks_columns_layout_vertical_align" DEFAULT 'top',
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_audio_player" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"audio_id" integer,
  	"audio_file_id" integer,
  	"show_download_button" boolean DEFAULT true,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses_blocks_download_grid_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" varchar,
  	"language_code" varchar,
  	"file_id" integer,
  	"external_url" varchar,
  	"file_size" varchar
  );
  
  CREATE TABLE "courses_blocks_download_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Download in Your Language',
  	"meditation_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"description" jsonb,
  	"featured_image_id" integer,
  	"level" "enum_courses_level",
  	"duration" varchar,
  	"registration_url" varchar,
  	"price" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"status" "enum_courses_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_courses_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "courses_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"courses_id" integer,
  	"lessons_id" integer
  );
  
  CREATE TABLE "_courses_v_blocks_hero_banner" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"background_image_id" integer,
  	"overlay_style" "enum__courses_v_blocks_hero_banner_overlay_style" DEFAULT 'gradient',
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"alignment" "enum__courses_v_blocks_hero_banner_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_rich_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"container_width" "enum__courses_v_blocks_rich_content_container_width" DEFAULT 'normal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_image_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__courses_v_blocks_image_gallery_layout" DEFAULT 'grid',
  	"columns" "enum__courses_v_blocks_image_gallery_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subtext" varchar,
  	"primary_label" varchar,
  	"primary_url" varchar,
  	"secondary_label" varchar,
  	"secondary_url" varchar,
  	"style" "enum__courses_v_blocks_call_to_action_style" DEFAULT 'teal',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_card_grid_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"link_label" varchar,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_card_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"columns" "enum__courses_v_blocks_card_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_video_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum__courses_v_blocks_video_embed_aspect_ratio" DEFAULT '16:9',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_testimonial_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"location" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_testimonial" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__courses_v_blocks_testimonial_layout" DEFAULT 'carousel',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_donation_links_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"region" varchar,
  	"provider" varchar,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_donation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Donate',
  	"subtext" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_event_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Upcoming Events',
  	"filter" "enum__courses_v_blocks_event_carousel_filter" DEFAULT 'upcoming',
  	"limit" numeric DEFAULT 6,
  	"view_all_url" varchar DEFAULT '/events',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_posts_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"post_type" "enum__courses_v_blocks_posts_grid_post_type" DEFAULT 'news',
  	"limit" numeric DEFAULT 6,
  	"view_all_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_icon_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"label" varchar,
  	"url" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_icon_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"layout" "enum__courses_v_blocks_icon_list_layout" DEFAULT 'vertical',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_social_icons_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__courses_v_blocks_social_icons_items_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_social_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__courses_v_blocks_divider_style" DEFAULT 'gold',
  	"spacing" "enum__courses_v_blocks_divider_spacing" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_columns_layout_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"width" "enum__courses_v_blocks_columns_layout_columns_width" DEFAULT 'equal',
  	"content" jsonb,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_columns_layout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"vertical_align" "enum__courses_v_blocks_columns_layout_vertical_align" DEFAULT 'top',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_audio_player" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"audio_id" integer,
  	"audio_file_id" integer,
  	"show_download_button" boolean DEFAULT true,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_download_grid_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"language" varchar,
  	"language_code" varchar,
  	"file_id" integer,
  	"external_url" varchar,
  	"file_size" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_courses_v_blocks_download_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Download in Your Language',
  	"meditation_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_courses_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_description" jsonb,
  	"version_featured_image_id" integer,
  	"version_level" "enum__courses_v_version_level",
  	"version_duration" varchar,
  	"version_registration_url" varchar,
  	"version_price" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_status" "enum__courses_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__courses_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_courses_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"courses_id" integer,
  	"lessons_id" integer
  );
  
  CREATE TABLE "lessons_downloadables" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"label" varchar
  );
  
  CREATE TABLE "lessons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"course_id" integer NOT NULL,
  	"order" numeric,
  	"content" jsonb,
  	"video_url" varchar,
  	"audio_file_id" integer,
  	"duration" varchar,
  	"status" "enum_lessons_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"description" jsonb,
  	"featured_image_id" integer,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"venue_id" integer,
  	"event_type" "enum_events_event_type",
  	"registration_url" varchar,
  	"registration_form_id" integer,
  	"is_past" boolean DEFAULT false,
  	"status" "enum_events_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "books" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"description" jsonb,
  	"cover_image_id" integer,
  	"download_file_id" integer,
  	"purchase_url" varchar,
  	"author" varchar DEFAULT 'Mohanji',
  	"published_year" numeric,
  	"book_type" "enum_books_book_type",
  	"language" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "audios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"description" jsonb,
  	"featured_image_id" integer,
  	"audio_file_id" integer,
  	"duration" varchar,
  	"audio_type" "enum_audios_audio_type",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "audios_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "quotes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"topic" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "quotes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer
  );
  
  CREATE TABLE "awards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"date" timestamp(3) with time zone,
  	"image_id" integer,
  	"organization" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "venues" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"address" varchar,
  	"city" varchar,
  	"country" varchar,
  	"latitude" numeric,
  	"longitude" numeric,
  	"google_maps_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_fields_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "forms_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field_type" "enum_forms_fields_field_type" NOT NULL,
  	"label" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"placeholder" varchar,
  	"required" boolean DEFAULT false
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"submit_button_label" varchar DEFAULT 'Submit',
  	"confirmation_message" jsonb,
  	"email_to" varchar,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"meditations_id" integer,
  	"practices_id" integer,
  	"courses_id" integer,
  	"lessons_id" integer,
  	"events_id" integer,
  	"books_id" integer,
  	"audios_id" integer,
  	"quotes_id" integer,
  	"awards_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"venues_id" integer,
  	"forms_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_children_sub_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "header_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"copyright_text" varchar DEFAULT '© 2026 Mohanji Foundation. All Rights Reserved.',
  	"newsletter_enabled" boolean DEFAULT true,
  	"privacy_policy_url" varchar DEFAULT '/privacy-policy',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_donation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"region" varchar NOT NULL,
  	"provider" varchar,
  	"url" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Mohanji',
  	"tagline" varchar,
  	"default_meta_title" varchar DEFAULT 'Mohanji — Boundless love, timeless wisdom',
  	"default_meta_description" varchar,
  	"default_meta_image_id" integer,
  	"google_analytics_id" varchar,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_banner" ADD CONSTRAINT "pages_blocks_hero_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_banner" ADD CONSTRAINT "pages_blocks_hero_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_content" ADD CONSTRAINT "pages_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery_images" ADD CONSTRAINT "pages_blocks_image_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery_images" ADD CONSTRAINT "pages_blocks_image_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery" ADD CONSTRAINT "pages_blocks_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_call_to_action" ADD CONSTRAINT "pages_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid_cards" ADD CONSTRAINT "pages_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_card_grid" ADD CONSTRAINT "pages_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion_items" ADD CONSTRAINT "pages_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_accordion" ADD CONSTRAINT "pages_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_embed" ADD CONSTRAINT "pages_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_items" ADD CONSTRAINT "pages_blocks_testimonial_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial_items" ADD CONSTRAINT "pages_blocks_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonial" ADD CONSTRAINT "pages_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_donation_links_links" ADD CONSTRAINT "pages_blocks_donation_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_donation_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_donation_links" ADD CONSTRAINT "pages_blocks_donation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_event_carousel" ADD CONSTRAINT "pages_blocks_event_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_posts_grid" ADD CONSTRAINT "pages_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_list_items" ADD CONSTRAINT "pages_blocks_icon_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_icon_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_icon_list" ADD CONSTRAINT "pages_blocks_icon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_icons_items" ADD CONSTRAINT "pages_blocks_social_icons_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_social_icons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_icons" ADD CONSTRAINT "pages_blocks_social_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_divider" ADD CONSTRAINT "pages_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns_layout_columns" ADD CONSTRAINT "pages_blocks_columns_layout_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns_layout_columns" ADD CONSTRAINT "pages_blocks_columns_layout_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_columns_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_columns_layout" ADD CONSTRAINT "pages_blocks_columns_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_audio_player" ADD CONSTRAINT "pages_blocks_audio_player_audio_id_audios_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."audios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_audio_player" ADD CONSTRAINT "pages_blocks_audio_player_audio_file_id_media_id_fk" FOREIGN KEY ("audio_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_audio_player" ADD CONSTRAINT "pages_blocks_audio_player_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_download_grid_downloads" ADD CONSTRAINT "pages_blocks_download_grid_downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_download_grid_downloads" ADD CONSTRAINT "pages_blocks_download_grid_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_download_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_download_grid" ADD CONSTRAINT "pages_blocks_download_grid_meditation_id_meditations_id_fk" FOREIGN KEY ("meditation_id") REFERENCES "public"."meditations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_download_grid" ADD CONSTRAINT "pages_blocks_download_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_home_content_hero_slides" ADD CONSTRAINT "pages_home_content_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_home_content_hero_slides" ADD CONSTRAINT "pages_home_content_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_home_content_where_is_mohanji" ADD CONSTRAINT "pages_home_content_where_is_mohanji_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_home_content_activity_stats" ADD CONSTRAINT "pages_home_content_activity_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_home_content_centres" ADD CONSTRAINT "pages_home_content_centres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_home_content_platforms" ADD CONSTRAINT "pages_home_content_platforms_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_home_content_platforms" ADD CONSTRAINT "pages_home_content_platforms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_wim_content_initiatives" ADD CONSTRAINT "pages_wim_content_initiatives_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_wim_content_initiatives" ADD CONSTRAINT "pages_wim_content_initiatives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_foundation_content_stats" ADD CONSTRAINT "pages_foundation_content_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_foundation_content_founded_platforms" ADD CONSTRAINT "pages_foundation_content_founded_platforms_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_foundation_content_founded_platforms" ADD CONSTRAINT "pages_foundation_content_founded_platforms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_foundation_content_inspired_platforms" ADD CONSTRAINT "pages_foundation_content_inspired_platforms_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_foundation_content_inspired_platforms" ADD CONSTRAINT "pages_foundation_content_inspired_platforms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_foundation_content_pillars" ADD CONSTRAINT "pages_foundation_content_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_life_journey_content_chapters" ADD CONSTRAINT "pages_life_journey_content_chapters_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_life_journey_content_chapters" ADD CONSTRAINT "pages_life_journey_content_chapters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_life_journey_content_stats" ADD CONSTRAINT "pages_life_journey_content_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_council_content_purpose_points" ADD CONSTRAINT "pages_council_content_purpose_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_council_content_members" ADD CONSTRAINT "pages_council_content_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_council_content_members" ADD CONSTRAINT "pages_council_content_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_council_content_regions" ADD CONSTRAINT "pages_council_content_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_council_content_how_it_works" ADD CONSTRAINT "pages_council_content_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_spaces_content_spaces" ADD CONSTRAINT "pages_spaces_content_spaces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_spaces_content_spaces" ADD CONSTRAINT "pages_spaces_content_spaces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_golden_path_content_stages" ADD CONSTRAINT "pages_golden_path_content_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_ambassador_content_events" ADD CONSTRAINT "pages_ambassador_content_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_ambassador_content_events" ADD CONSTRAINT "pages_ambassador_content_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_home_content_about_section_image_id_media_id_fk" FOREIGN KEY ("home_content_about_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_home_content_activities_section_image_id_media_id_fk" FOREIGN KEY ("home_content_activities_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_home_content_meditations_cta_image_id_media_id_fk" FOREIGN KEY ("home_content_meditations_cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_wim_content_hero_image_id_media_id_fk" FOREIGN KEY ("wim_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_wim_content_portrait_image_id_media_id_fk" FOREIGN KEY ("wim_content_portrait_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_wim_content_wide_image_id_media_id_fk" FOREIGN KEY ("wim_content_wide_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_foundation_content_hero_image_id_media_id_fk" FOREIGN KEY ("foundation_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_life_journey_content_hero_image_id_media_id_fk" FOREIGN KEY ("life_journey_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_council_content_hero_image_id_media_id_fk" FOREIGN KEY ("council_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_spaces_content_hero_image_id_media_id_fk" FOREIGN KEY ("spaces_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_golden_path_content_hero_image_id_media_id_fk" FOREIGN KEY ("golden_path_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_ambassador_content_hero_image_id_media_id_fk" FOREIGN KEY ("ambassador_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_ambassador_content_ambassador_photo_id_media_id_fk" FOREIGN KEY ("ambassador_content_ambassador_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_awards_page_content_hero_image_id_media_id_fk" FOREIGN KEY ("awards_page_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_banner" ADD CONSTRAINT "_pages_v_blocks_hero_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_banner" ADD CONSTRAINT "_pages_v_blocks_hero_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_content" ADD CONSTRAINT "_pages_v_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_images" ADD CONSTRAINT "_pages_v_blocks_image_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_images" ADD CONSTRAINT "_pages_v_blocks_image_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery" ADD CONSTRAINT "_pages_v_blocks_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_call_to_action" ADD CONSTRAINT "_pages_v_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid_cards" ADD CONSTRAINT "_pages_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_card_grid" ADD CONSTRAINT "_pages_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion_items" ADD CONSTRAINT "_pages_v_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_accordion" ADD CONSTRAINT "_pages_v_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_embed" ADD CONSTRAINT "_pages_v_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial_items" ADD CONSTRAINT "_pages_v_blocks_testimonial_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial_items" ADD CONSTRAINT "_pages_v_blocks_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonial" ADD CONSTRAINT "_pages_v_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_donation_links_links" ADD CONSTRAINT "_pages_v_blocks_donation_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_donation_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_donation_links" ADD CONSTRAINT "_pages_v_blocks_donation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_event_carousel" ADD CONSTRAINT "_pages_v_blocks_event_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_posts_grid" ADD CONSTRAINT "_pages_v_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_list_items" ADD CONSTRAINT "_pages_v_blocks_icon_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_icon_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_icon_list" ADD CONSTRAINT "_pages_v_blocks_icon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_social_icons_items" ADD CONSTRAINT "_pages_v_blocks_social_icons_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_social_icons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_social_icons" ADD CONSTRAINT "_pages_v_blocks_social_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_divider" ADD CONSTRAINT "_pages_v_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns_layout_columns" ADD CONSTRAINT "_pages_v_blocks_columns_layout_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns_layout_columns" ADD CONSTRAINT "_pages_v_blocks_columns_layout_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_columns_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_columns_layout" ADD CONSTRAINT "_pages_v_blocks_columns_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_audio_player" ADD CONSTRAINT "_pages_v_blocks_audio_player_audio_id_audios_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."audios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_audio_player" ADD CONSTRAINT "_pages_v_blocks_audio_player_audio_file_id_media_id_fk" FOREIGN KEY ("audio_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_audio_player" ADD CONSTRAINT "_pages_v_blocks_audio_player_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_download_grid_downloads" ADD CONSTRAINT "_pages_v_blocks_download_grid_downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_download_grid_downloads" ADD CONSTRAINT "_pages_v_blocks_download_grid_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_download_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_download_grid" ADD CONSTRAINT "_pages_v_blocks_download_grid_meditation_id_meditations_id_fk" FOREIGN KEY ("meditation_id") REFERENCES "public"."meditations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_download_grid" ADD CONSTRAINT "_pages_v_blocks_download_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_content_hero_slides" ADD CONSTRAINT "_pages_v_version_home_content_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_content_hero_slides" ADD CONSTRAINT "_pages_v_version_home_content_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_content_where_is_mohanji" ADD CONSTRAINT "_pages_v_version_home_content_where_is_mohanji_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_content_activity_stats" ADD CONSTRAINT "_pages_v_version_home_content_activity_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_content_centres" ADD CONSTRAINT "_pages_v_version_home_content_centres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_content_platforms" ADD CONSTRAINT "_pages_v_version_home_content_platforms_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_home_content_platforms" ADD CONSTRAINT "_pages_v_version_home_content_platforms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_wim_content_initiatives" ADD CONSTRAINT "_pages_v_version_wim_content_initiatives_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_wim_content_initiatives" ADD CONSTRAINT "_pages_v_version_wim_content_initiatives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_foundation_content_stats" ADD CONSTRAINT "_pages_v_version_foundation_content_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_foundation_content_founded_platforms" ADD CONSTRAINT "_pages_v_version_foundation_content_founded_platforms_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_foundation_content_founded_platforms" ADD CONSTRAINT "_pages_v_version_foundation_content_founded_platforms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_foundation_content_inspired_platforms" ADD CONSTRAINT "_pages_v_version_foundation_content_inspired_platforms_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_foundation_content_inspired_platforms" ADD CONSTRAINT "_pages_v_version_foundation_content_inspired_platforms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_foundation_content_pillars" ADD CONSTRAINT "_pages_v_version_foundation_content_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_life_journey_content_chapters" ADD CONSTRAINT "_pages_v_version_life_journey_content_chapters_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_life_journey_content_chapters" ADD CONSTRAINT "_pages_v_version_life_journey_content_chapters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_life_journey_content_stats" ADD CONSTRAINT "_pages_v_version_life_journey_content_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_council_content_purpose_points" ADD CONSTRAINT "_pages_v_version_council_content_purpose_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_council_content_members" ADD CONSTRAINT "_pages_v_version_council_content_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_council_content_members" ADD CONSTRAINT "_pages_v_version_council_content_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_council_content_regions" ADD CONSTRAINT "_pages_v_version_council_content_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_council_content_how_it_works" ADD CONSTRAINT "_pages_v_version_council_content_how_it_works_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_spaces_content_spaces" ADD CONSTRAINT "_pages_v_version_spaces_content_spaces_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_spaces_content_spaces" ADD CONSTRAINT "_pages_v_version_spaces_content_spaces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_golden_path_content_stages" ADD CONSTRAINT "_pages_v_version_golden_path_content_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_ambassador_content_events" ADD CONSTRAINT "_pages_v_version_ambassador_content_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_ambassador_content_events" ADD CONSTRAINT "_pages_v_version_ambassador_content_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_parent_id_pages_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_home_content_about_section_image_id_media_id_fk" FOREIGN KEY ("version_home_content_about_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_home_content_activities_section_image_id_media_id_fk" FOREIGN KEY ("version_home_content_activities_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_home_content_meditations_cta_image_id_media_id_fk" FOREIGN KEY ("version_home_content_meditations_cta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_wim_content_hero_image_id_media_id_fk" FOREIGN KEY ("version_wim_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_wim_content_portrait_image_id_media_id_fk" FOREIGN KEY ("version_wim_content_portrait_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_wim_content_wide_image_id_media_id_fk" FOREIGN KEY ("version_wim_content_wide_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_foundation_content_hero_image_id_media_id_fk" FOREIGN KEY ("version_foundation_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_life_journey_content_hero_image_id_media_id_fk" FOREIGN KEY ("version_life_journey_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_council_content_hero_image_id_media_id_fk" FOREIGN KEY ("version_council_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_spaces_content_hero_image_id_media_id_fk" FOREIGN KEY ("version_spaces_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_golden_path_content_hero_image_id_media_id_fk" FOREIGN KEY ("version_golden_path_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_ambassador_content_hero_image_id_media_id_fk" FOREIGN KEY ("version_ambassador_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_ambassador_content_ambassador_photo_id_media_id_fk" FOREIGN KEY ("version_ambassador_content_ambassador_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_awards_page_content_hero_image_id_media_id_fk" FOREIGN KEY ("version_awards_page_content_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_hero_banner" ADD CONSTRAINT "meditations_blocks_hero_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meditations_blocks_hero_banner" ADD CONSTRAINT "meditations_blocks_hero_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_rich_content" ADD CONSTRAINT "meditations_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_image_gallery_images" ADD CONSTRAINT "meditations_blocks_image_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meditations_blocks_image_gallery_images" ADD CONSTRAINT "meditations_blocks_image_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations_blocks_image_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_image_gallery" ADD CONSTRAINT "meditations_blocks_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_call_to_action" ADD CONSTRAINT "meditations_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_card_grid_cards" ADD CONSTRAINT "meditations_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meditations_blocks_card_grid_cards" ADD CONSTRAINT "meditations_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_card_grid" ADD CONSTRAINT "meditations_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_accordion_items" ADD CONSTRAINT "meditations_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_accordion" ADD CONSTRAINT "meditations_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_video_embed" ADD CONSTRAINT "meditations_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_testimonial_items" ADD CONSTRAINT "meditations_blocks_testimonial_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meditations_blocks_testimonial_items" ADD CONSTRAINT "meditations_blocks_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations_blocks_testimonial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_testimonial" ADD CONSTRAINT "meditations_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_donation_links_links" ADD CONSTRAINT "meditations_blocks_donation_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations_blocks_donation_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_donation_links" ADD CONSTRAINT "meditations_blocks_donation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_contact_form" ADD CONSTRAINT "meditations_blocks_contact_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meditations_blocks_contact_form" ADD CONSTRAINT "meditations_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_event_carousel" ADD CONSTRAINT "meditations_blocks_event_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_posts_grid" ADD CONSTRAINT "meditations_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_icon_list_items" ADD CONSTRAINT "meditations_blocks_icon_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations_blocks_icon_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_icon_list" ADD CONSTRAINT "meditations_blocks_icon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_social_icons_items" ADD CONSTRAINT "meditations_blocks_social_icons_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations_blocks_social_icons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_social_icons" ADD CONSTRAINT "meditations_blocks_social_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_divider" ADD CONSTRAINT "meditations_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_columns_layout_columns" ADD CONSTRAINT "meditations_blocks_columns_layout_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meditations_blocks_columns_layout_columns" ADD CONSTRAINT "meditations_blocks_columns_layout_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations_blocks_columns_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_columns_layout" ADD CONSTRAINT "meditations_blocks_columns_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_audio_player" ADD CONSTRAINT "meditations_blocks_audio_player_audio_id_audios_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."audios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meditations_blocks_audio_player" ADD CONSTRAINT "meditations_blocks_audio_player_audio_file_id_media_id_fk" FOREIGN KEY ("audio_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meditations_blocks_audio_player" ADD CONSTRAINT "meditations_blocks_audio_player_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_download_grid_downloads" ADD CONSTRAINT "meditations_blocks_download_grid_downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meditations_blocks_download_grid_downloads" ADD CONSTRAINT "meditations_blocks_download_grid_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations_blocks_download_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_blocks_download_grid" ADD CONSTRAINT "meditations_blocks_download_grid_meditation_id_meditations_id_fk" FOREIGN KEY ("meditation_id") REFERENCES "public"."meditations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meditations_blocks_download_grid" ADD CONSTRAINT "meditations_blocks_download_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations_downloads" ADD CONSTRAINT "meditations_downloads_audio_file_id_media_id_fk" FOREIGN KEY ("audio_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meditations_downloads" ADD CONSTRAINT "meditations_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meditations" ADD CONSTRAINT "meditations_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meditations" ADD CONSTRAINT "meditations_audio_preview_id_media_id_fk" FOREIGN KEY ("audio_preview_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meditations" ADD CONSTRAINT "meditations_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practices_blocks_hero_banner" ADD CONSTRAINT "practices_blocks_hero_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practices_blocks_hero_banner" ADD CONSTRAINT "practices_blocks_hero_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_rich_content" ADD CONSTRAINT "practices_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_image_gallery_images" ADD CONSTRAINT "practices_blocks_image_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practices_blocks_image_gallery_images" ADD CONSTRAINT "practices_blocks_image_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices_blocks_image_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_image_gallery" ADD CONSTRAINT "practices_blocks_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_call_to_action" ADD CONSTRAINT "practices_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_card_grid_cards" ADD CONSTRAINT "practices_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practices_blocks_card_grid_cards" ADD CONSTRAINT "practices_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_card_grid" ADD CONSTRAINT "practices_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_accordion_items" ADD CONSTRAINT "practices_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_accordion" ADD CONSTRAINT "practices_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_video_embed" ADD CONSTRAINT "practices_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_testimonial_items" ADD CONSTRAINT "practices_blocks_testimonial_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practices_blocks_testimonial_items" ADD CONSTRAINT "practices_blocks_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices_blocks_testimonial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_testimonial" ADD CONSTRAINT "practices_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_donation_links_links" ADD CONSTRAINT "practices_blocks_donation_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices_blocks_donation_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_donation_links" ADD CONSTRAINT "practices_blocks_donation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_contact_form" ADD CONSTRAINT "practices_blocks_contact_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practices_blocks_contact_form" ADD CONSTRAINT "practices_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_event_carousel" ADD CONSTRAINT "practices_blocks_event_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_posts_grid" ADD CONSTRAINT "practices_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_icon_list_items" ADD CONSTRAINT "practices_blocks_icon_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices_blocks_icon_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_icon_list" ADD CONSTRAINT "practices_blocks_icon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_social_icons_items" ADD CONSTRAINT "practices_blocks_social_icons_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices_blocks_social_icons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_social_icons" ADD CONSTRAINT "practices_blocks_social_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_divider" ADD CONSTRAINT "practices_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_columns_layout_columns" ADD CONSTRAINT "practices_blocks_columns_layout_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practices_blocks_columns_layout_columns" ADD CONSTRAINT "practices_blocks_columns_layout_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices_blocks_columns_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_columns_layout" ADD CONSTRAINT "practices_blocks_columns_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_audio_player" ADD CONSTRAINT "practices_blocks_audio_player_audio_id_audios_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."audios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practices_blocks_audio_player" ADD CONSTRAINT "practices_blocks_audio_player_audio_file_id_media_id_fk" FOREIGN KEY ("audio_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practices_blocks_audio_player" ADD CONSTRAINT "practices_blocks_audio_player_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_download_grid_downloads" ADD CONSTRAINT "practices_blocks_download_grid_downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practices_blocks_download_grid_downloads" ADD CONSTRAINT "practices_blocks_download_grid_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices_blocks_download_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices_blocks_download_grid" ADD CONSTRAINT "practices_blocks_download_grid_meditation_id_meditations_id_fk" FOREIGN KEY ("meditation_id") REFERENCES "public"."meditations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practices_blocks_download_grid" ADD CONSTRAINT "practices_blocks_download_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "practices" ADD CONSTRAINT "practices_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "practices" ADD CONSTRAINT "practices_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_blocks_hero_banner" ADD CONSTRAINT "courses_blocks_hero_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_blocks_hero_banner" ADD CONSTRAINT "courses_blocks_hero_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_rich_content" ADD CONSTRAINT "courses_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_image_gallery_images" ADD CONSTRAINT "courses_blocks_image_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_blocks_image_gallery_images" ADD CONSTRAINT "courses_blocks_image_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_image_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_image_gallery" ADD CONSTRAINT "courses_blocks_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_call_to_action" ADD CONSTRAINT "courses_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_card_grid_cards" ADD CONSTRAINT "courses_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_blocks_card_grid_cards" ADD CONSTRAINT "courses_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_card_grid" ADD CONSTRAINT "courses_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_accordion_items" ADD CONSTRAINT "courses_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_accordion" ADD CONSTRAINT "courses_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_video_embed" ADD CONSTRAINT "courses_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_testimonial_items" ADD CONSTRAINT "courses_blocks_testimonial_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_blocks_testimonial_items" ADD CONSTRAINT "courses_blocks_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_testimonial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_testimonial" ADD CONSTRAINT "courses_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_donation_links_links" ADD CONSTRAINT "courses_blocks_donation_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_donation_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_donation_links" ADD CONSTRAINT "courses_blocks_donation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_contact_form" ADD CONSTRAINT "courses_blocks_contact_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_blocks_contact_form" ADD CONSTRAINT "courses_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_event_carousel" ADD CONSTRAINT "courses_blocks_event_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_posts_grid" ADD CONSTRAINT "courses_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_icon_list_items" ADD CONSTRAINT "courses_blocks_icon_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_icon_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_icon_list" ADD CONSTRAINT "courses_blocks_icon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_social_icons_items" ADD CONSTRAINT "courses_blocks_social_icons_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_social_icons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_social_icons" ADD CONSTRAINT "courses_blocks_social_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_divider" ADD CONSTRAINT "courses_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_columns_layout_columns" ADD CONSTRAINT "courses_blocks_columns_layout_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_blocks_columns_layout_columns" ADD CONSTRAINT "courses_blocks_columns_layout_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_columns_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_columns_layout" ADD CONSTRAINT "courses_blocks_columns_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_audio_player" ADD CONSTRAINT "courses_blocks_audio_player_audio_id_audios_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."audios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_blocks_audio_player" ADD CONSTRAINT "courses_blocks_audio_player_audio_file_id_media_id_fk" FOREIGN KEY ("audio_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_blocks_audio_player" ADD CONSTRAINT "courses_blocks_audio_player_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_download_grid_downloads" ADD CONSTRAINT "courses_blocks_download_grid_downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_blocks_download_grid_downloads" ADD CONSTRAINT "courses_blocks_download_grid_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses_blocks_download_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_blocks_download_grid" ADD CONSTRAINT "courses_blocks_download_grid_meditation_id_meditations_id_fk" FOREIGN KEY ("meditation_id") REFERENCES "public"."meditations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_blocks_download_grid" ADD CONSTRAINT "courses_blocks_download_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "courses_rels" ADD CONSTRAINT "courses_rels_lessons_fk" FOREIGN KEY ("lessons_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_hero_banner" ADD CONSTRAINT "_courses_v_blocks_hero_banner_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_hero_banner" ADD CONSTRAINT "_courses_v_blocks_hero_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_rich_content" ADD CONSTRAINT "_courses_v_blocks_rich_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_image_gallery_images" ADD CONSTRAINT "_courses_v_blocks_image_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_image_gallery_images" ADD CONSTRAINT "_courses_v_blocks_image_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_blocks_image_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_image_gallery" ADD CONSTRAINT "_courses_v_blocks_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_call_to_action" ADD CONSTRAINT "_courses_v_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_card_grid_cards" ADD CONSTRAINT "_courses_v_blocks_card_grid_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_card_grid_cards" ADD CONSTRAINT "_courses_v_blocks_card_grid_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_blocks_card_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_card_grid" ADD CONSTRAINT "_courses_v_blocks_card_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_accordion_items" ADD CONSTRAINT "_courses_v_blocks_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_accordion" ADD CONSTRAINT "_courses_v_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_video_embed" ADD CONSTRAINT "_courses_v_blocks_video_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_testimonial_items" ADD CONSTRAINT "_courses_v_blocks_testimonial_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_testimonial_items" ADD CONSTRAINT "_courses_v_blocks_testimonial_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_blocks_testimonial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_testimonial" ADD CONSTRAINT "_courses_v_blocks_testimonial_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_donation_links_links" ADD CONSTRAINT "_courses_v_blocks_donation_links_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_blocks_donation_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_donation_links" ADD CONSTRAINT "_courses_v_blocks_donation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_contact_form" ADD CONSTRAINT "_courses_v_blocks_contact_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_contact_form" ADD CONSTRAINT "_courses_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_event_carousel" ADD CONSTRAINT "_courses_v_blocks_event_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_posts_grid" ADD CONSTRAINT "_courses_v_blocks_posts_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_icon_list_items" ADD CONSTRAINT "_courses_v_blocks_icon_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_blocks_icon_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_icon_list" ADD CONSTRAINT "_courses_v_blocks_icon_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_social_icons_items" ADD CONSTRAINT "_courses_v_blocks_social_icons_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_blocks_social_icons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_social_icons" ADD CONSTRAINT "_courses_v_blocks_social_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_divider" ADD CONSTRAINT "_courses_v_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_columns_layout_columns" ADD CONSTRAINT "_courses_v_blocks_columns_layout_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_columns_layout_columns" ADD CONSTRAINT "_courses_v_blocks_columns_layout_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_blocks_columns_layout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_columns_layout" ADD CONSTRAINT "_courses_v_blocks_columns_layout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_audio_player" ADD CONSTRAINT "_courses_v_blocks_audio_player_audio_id_audios_id_fk" FOREIGN KEY ("audio_id") REFERENCES "public"."audios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_audio_player" ADD CONSTRAINT "_courses_v_blocks_audio_player_audio_file_id_media_id_fk" FOREIGN KEY ("audio_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_audio_player" ADD CONSTRAINT "_courses_v_blocks_audio_player_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_download_grid_downloads" ADD CONSTRAINT "_courses_v_blocks_download_grid_downloads_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_download_grid_downloads" ADD CONSTRAINT "_courses_v_blocks_download_grid_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v_blocks_download_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_download_grid" ADD CONSTRAINT "_courses_v_blocks_download_grid_meditation_id_meditations_id_fk" FOREIGN KEY ("meditation_id") REFERENCES "public"."meditations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_blocks_download_grid" ADD CONSTRAINT "_courses_v_blocks_download_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_parent_id_courses_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v" ADD CONSTRAINT "_courses_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_courses_v_rels" ADD CONSTRAINT "_courses_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_courses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_rels" ADD CONSTRAINT "_courses_v_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_courses_v_rels" ADD CONSTRAINT "_courses_v_rels_lessons_fk" FOREIGN KEY ("lessons_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons_downloadables" ADD CONSTRAINT "lessons_downloadables_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons_downloadables" ADD CONSTRAINT "lessons_downloadables_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lessons" ADD CONSTRAINT "lessons_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lessons" ADD CONSTRAINT "lessons_audio_file_id_media_id_fk" FOREIGN KEY ("audio_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_venue_id_venues_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."venues"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_registration_form_id_forms_id_fk" FOREIGN KEY ("registration_form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "books" ADD CONSTRAINT "books_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "books" ADD CONSTRAINT "books_download_file_id_media_id_fk" FOREIGN KEY ("download_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "audios" ADD CONSTRAINT "audios_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "audios" ADD CONSTRAINT "audios_audio_file_id_media_id_fk" FOREIGN KEY ("audio_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "audios_rels" ADD CONSTRAINT "audios_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."audios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "audios_rels" ADD CONSTRAINT "audios_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quotes" ADD CONSTRAINT "quotes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "quotes_rels" ADD CONSTRAINT "quotes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."quotes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quotes_rels" ADD CONSTRAINT "quotes_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards" ADD CONSTRAINT "awards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms_fields_options" ADD CONSTRAINT "forms_fields_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_fields" ADD CONSTRAINT "forms_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_meditations_fk" FOREIGN KEY ("meditations_id") REFERENCES "public"."meditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_practices_fk" FOREIGN KEY ("practices_id") REFERENCES "public"."practices"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lessons_fk" FOREIGN KEY ("lessons_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_books_fk" FOREIGN KEY ("books_id") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audios_fk" FOREIGN KEY ("audios_id") REFERENCES "public"."audios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quotes_fk" FOREIGN KEY ("quotes_id") REFERENCES "public"."quotes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_venues_fk" FOREIGN KEY ("venues_id") REFERENCES "public"."venues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children_sub_items" ADD CONSTRAINT "header_nav_items_children_sub_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_children"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_donation_links" ADD CONSTRAINT "site_settings_donation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_default_meta_image_id_media_id_fk" FOREIGN KEY ("default_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "pages_blocks_hero_banner_order_idx" ON "pages_blocks_hero_banner" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_banner_parent_id_idx" ON "pages_blocks_hero_banner" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_banner_path_idx" ON "pages_blocks_hero_banner" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_banner_background_image_idx" ON "pages_blocks_hero_banner" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_rich_content_order_idx" ON "pages_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_content_parent_id_idx" ON "pages_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_content_path_idx" ON "pages_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_gallery_images_order_idx" ON "pages_blocks_image_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_gallery_images_parent_id_idx" ON "pages_blocks_image_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_gallery_images_image_idx" ON "pages_blocks_image_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_gallery_order_idx" ON "pages_blocks_image_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_gallery_parent_id_idx" ON "pages_blocks_image_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_gallery_path_idx" ON "pages_blocks_image_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_call_to_action_order_idx" ON "pages_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "pages_blocks_call_to_action_parent_id_idx" ON "pages_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_call_to_action_path_idx" ON "pages_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "pages_blocks_card_grid_cards_order_idx" ON "pages_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_cards_parent_id_idx" ON "pages_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_cards_image_idx" ON "pages_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_card_grid_order_idx" ON "pages_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_card_grid_parent_id_idx" ON "pages_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_card_grid_path_idx" ON "pages_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_accordion_items_order_idx" ON "pages_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_items_parent_id_idx" ON "pages_blocks_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_order_idx" ON "pages_blocks_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_accordion_parent_id_idx" ON "pages_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_accordion_path_idx" ON "pages_blocks_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_embed_order_idx" ON "pages_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_embed_parent_id_idx" ON "pages_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_embed_path_idx" ON "pages_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonial_items_order_idx" ON "pages_blocks_testimonial_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_items_parent_id_idx" ON "pages_blocks_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_items_photo_idx" ON "pages_blocks_testimonial_items" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_testimonial_order_idx" ON "pages_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonial_parent_id_idx" ON "pages_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonial_path_idx" ON "pages_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "pages_blocks_donation_links_links_order_idx" ON "pages_blocks_donation_links_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_donation_links_links_parent_id_idx" ON "pages_blocks_donation_links_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_donation_links_order_idx" ON "pages_blocks_donation_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_donation_links_parent_id_idx" ON "pages_blocks_donation_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_donation_links_path_idx" ON "pages_blocks_donation_links" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_form_idx" ON "pages_blocks_contact_form" USING btree ("form_id");
  CREATE INDEX "pages_blocks_event_carousel_order_idx" ON "pages_blocks_event_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_event_carousel_parent_id_idx" ON "pages_blocks_event_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_event_carousel_path_idx" ON "pages_blocks_event_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_posts_grid_order_idx" ON "pages_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_posts_grid_parent_id_idx" ON "pages_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_posts_grid_path_idx" ON "pages_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_icon_list_items_order_idx" ON "pages_blocks_icon_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_list_items_parent_id_idx" ON "pages_blocks_icon_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_list_order_idx" ON "pages_blocks_icon_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_icon_list_parent_id_idx" ON "pages_blocks_icon_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_icon_list_path_idx" ON "pages_blocks_icon_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_social_icons_items_order_idx" ON "pages_blocks_social_icons_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_social_icons_items_parent_id_idx" ON "pages_blocks_social_icons_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_social_icons_order_idx" ON "pages_blocks_social_icons" USING btree ("_order");
  CREATE INDEX "pages_blocks_social_icons_parent_id_idx" ON "pages_blocks_social_icons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_social_icons_path_idx" ON "pages_blocks_social_icons" USING btree ("_path");
  CREATE INDEX "pages_blocks_divider_order_idx" ON "pages_blocks_divider" USING btree ("_order");
  CREATE INDEX "pages_blocks_divider_parent_id_idx" ON "pages_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_divider_path_idx" ON "pages_blocks_divider" USING btree ("_path");
  CREATE INDEX "pages_blocks_columns_layout_columns_order_idx" ON "pages_blocks_columns_layout_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_layout_columns_parent_id_idx" ON "pages_blocks_columns_layout_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_layout_columns_image_idx" ON "pages_blocks_columns_layout_columns" USING btree ("image_id");
  CREATE INDEX "pages_blocks_columns_layout_order_idx" ON "pages_blocks_columns_layout" USING btree ("_order");
  CREATE INDEX "pages_blocks_columns_layout_parent_id_idx" ON "pages_blocks_columns_layout" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_columns_layout_path_idx" ON "pages_blocks_columns_layout" USING btree ("_path");
  CREATE INDEX "pages_blocks_audio_player_order_idx" ON "pages_blocks_audio_player" USING btree ("_order");
  CREATE INDEX "pages_blocks_audio_player_parent_id_idx" ON "pages_blocks_audio_player" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_audio_player_path_idx" ON "pages_blocks_audio_player" USING btree ("_path");
  CREATE INDEX "pages_blocks_audio_player_audio_idx" ON "pages_blocks_audio_player" USING btree ("audio_id");
  CREATE INDEX "pages_blocks_audio_player_audio_file_idx" ON "pages_blocks_audio_player" USING btree ("audio_file_id");
  CREATE INDEX "pages_blocks_download_grid_downloads_order_idx" ON "pages_blocks_download_grid_downloads" USING btree ("_order");
  CREATE INDEX "pages_blocks_download_grid_downloads_parent_id_idx" ON "pages_blocks_download_grid_downloads" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_download_grid_downloads_file_idx" ON "pages_blocks_download_grid_downloads" USING btree ("file_id");
  CREATE INDEX "pages_blocks_download_grid_order_idx" ON "pages_blocks_download_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_download_grid_parent_id_idx" ON "pages_blocks_download_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_download_grid_path_idx" ON "pages_blocks_download_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_download_grid_meditation_idx" ON "pages_blocks_download_grid" USING btree ("meditation_id");
  CREATE INDEX "pages_home_content_hero_slides_order_idx" ON "pages_home_content_hero_slides" USING btree ("_order");
  CREATE INDEX "pages_home_content_hero_slides_parent_id_idx" ON "pages_home_content_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_home_content_hero_slides_image_idx" ON "pages_home_content_hero_slides" USING btree ("image_id");
  CREATE INDEX "pages_home_content_where_is_mohanji_order_idx" ON "pages_home_content_where_is_mohanji" USING btree ("_order");
  CREATE INDEX "pages_home_content_where_is_mohanji_parent_id_idx" ON "pages_home_content_where_is_mohanji" USING btree ("_parent_id");
  CREATE INDEX "pages_home_content_activity_stats_order_idx" ON "pages_home_content_activity_stats" USING btree ("_order");
  CREATE INDEX "pages_home_content_activity_stats_parent_id_idx" ON "pages_home_content_activity_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_home_content_centres_order_idx" ON "pages_home_content_centres" USING btree ("_order");
  CREATE INDEX "pages_home_content_centres_parent_id_idx" ON "pages_home_content_centres" USING btree ("_parent_id");
  CREATE INDEX "pages_home_content_platforms_order_idx" ON "pages_home_content_platforms" USING btree ("_order");
  CREATE INDEX "pages_home_content_platforms_parent_id_idx" ON "pages_home_content_platforms" USING btree ("_parent_id");
  CREATE INDEX "pages_home_content_platforms_logo_idx" ON "pages_home_content_platforms" USING btree ("logo_id");
  CREATE INDEX "pages_wim_content_initiatives_order_idx" ON "pages_wim_content_initiatives" USING btree ("_order");
  CREATE INDEX "pages_wim_content_initiatives_parent_id_idx" ON "pages_wim_content_initiatives" USING btree ("_parent_id");
  CREATE INDEX "pages_wim_content_initiatives_logo_idx" ON "pages_wim_content_initiatives" USING btree ("logo_id");
  CREATE INDEX "pages_foundation_content_stats_order_idx" ON "pages_foundation_content_stats" USING btree ("_order");
  CREATE INDEX "pages_foundation_content_stats_parent_id_idx" ON "pages_foundation_content_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_foundation_content_founded_platforms_order_idx" ON "pages_foundation_content_founded_platforms" USING btree ("_order");
  CREATE INDEX "pages_foundation_content_founded_platforms_parent_id_idx" ON "pages_foundation_content_founded_platforms" USING btree ("_parent_id");
  CREATE INDEX "pages_foundation_content_founded_platforms_logo_idx" ON "pages_foundation_content_founded_platforms" USING btree ("logo_id");
  CREATE INDEX "pages_foundation_content_inspired_platforms_order_idx" ON "pages_foundation_content_inspired_platforms" USING btree ("_order");
  CREATE INDEX "pages_foundation_content_inspired_platforms_parent_id_idx" ON "pages_foundation_content_inspired_platforms" USING btree ("_parent_id");
  CREATE INDEX "pages_foundation_content_inspired_platforms_logo_idx" ON "pages_foundation_content_inspired_platforms" USING btree ("logo_id");
  CREATE INDEX "pages_foundation_content_pillars_order_idx" ON "pages_foundation_content_pillars" USING btree ("_order");
  CREATE INDEX "pages_foundation_content_pillars_parent_id_idx" ON "pages_foundation_content_pillars" USING btree ("_parent_id");
  CREATE INDEX "pages_life_journey_content_chapters_order_idx" ON "pages_life_journey_content_chapters" USING btree ("_order");
  CREATE INDEX "pages_life_journey_content_chapters_parent_id_idx" ON "pages_life_journey_content_chapters" USING btree ("_parent_id");
  CREATE INDEX "pages_life_journey_content_chapters_image_idx" ON "pages_life_journey_content_chapters" USING btree ("image_id");
  CREATE INDEX "pages_life_journey_content_stats_order_idx" ON "pages_life_journey_content_stats" USING btree ("_order");
  CREATE INDEX "pages_life_journey_content_stats_parent_id_idx" ON "pages_life_journey_content_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_council_content_purpose_points_order_idx" ON "pages_council_content_purpose_points" USING btree ("_order");
  CREATE INDEX "pages_council_content_purpose_points_parent_id_idx" ON "pages_council_content_purpose_points" USING btree ("_parent_id");
  CREATE INDEX "pages_council_content_members_order_idx" ON "pages_council_content_members" USING btree ("_order");
  CREATE INDEX "pages_council_content_members_parent_id_idx" ON "pages_council_content_members" USING btree ("_parent_id");
  CREATE INDEX "pages_council_content_members_photo_idx" ON "pages_council_content_members" USING btree ("photo_id");
  CREATE INDEX "pages_council_content_regions_order_idx" ON "pages_council_content_regions" USING btree ("_order");
  CREATE INDEX "pages_council_content_regions_parent_id_idx" ON "pages_council_content_regions" USING btree ("_parent_id");
  CREATE INDEX "pages_council_content_how_it_works_order_idx" ON "pages_council_content_how_it_works" USING btree ("_order");
  CREATE INDEX "pages_council_content_how_it_works_parent_id_idx" ON "pages_council_content_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "pages_spaces_content_spaces_order_idx" ON "pages_spaces_content_spaces" USING btree ("_order");
  CREATE INDEX "pages_spaces_content_spaces_parent_id_idx" ON "pages_spaces_content_spaces" USING btree ("_parent_id");
  CREATE INDEX "pages_spaces_content_spaces_image_idx" ON "pages_spaces_content_spaces" USING btree ("image_id");
  CREATE INDEX "pages_golden_path_content_stages_order_idx" ON "pages_golden_path_content_stages" USING btree ("_order");
  CREATE INDEX "pages_golden_path_content_stages_parent_id_idx" ON "pages_golden_path_content_stages" USING btree ("_parent_id");
  CREATE INDEX "pages_ambassador_content_events_order_idx" ON "pages_ambassador_content_events" USING btree ("_order");
  CREATE INDEX "pages_ambassador_content_events_parent_id_idx" ON "pages_ambassador_content_events" USING btree ("_parent_id");
  CREATE INDEX "pages_ambassador_content_events_image_idx" ON "pages_ambassador_content_events" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_parent_idx" ON "pages" USING btree ("parent_id");
  CREATE INDEX "pages_featured_image_idx" ON "pages" USING btree ("featured_image_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_home_content_about_section_home_content_about_sect_idx" ON "pages" USING btree ("home_content_about_section_image_id");
  CREATE INDEX "pages_home_content_activities_section_home_content_activ_idx" ON "pages" USING btree ("home_content_activities_section_image_id");
  CREATE INDEX "pages_home_content_home_content_meditations_cta_image_idx" ON "pages" USING btree ("home_content_meditations_cta_image_id");
  CREATE INDEX "pages_wim_content_wim_content_hero_image_idx" ON "pages" USING btree ("wim_content_hero_image_id");
  CREATE INDEX "pages_wim_content_wim_content_portrait_image_idx" ON "pages" USING btree ("wim_content_portrait_image_id");
  CREATE INDEX "pages_wim_content_wim_content_wide_image_idx" ON "pages" USING btree ("wim_content_wide_image_id");
  CREATE INDEX "pages_foundation_content_foundation_content_hero_image_idx" ON "pages" USING btree ("foundation_content_hero_image_id");
  CREATE INDEX "pages_life_journey_content_life_journey_content_hero_ima_idx" ON "pages" USING btree ("life_journey_content_hero_image_id");
  CREATE INDEX "pages_council_content_council_content_hero_image_idx" ON "pages" USING btree ("council_content_hero_image_id");
  CREATE INDEX "pages_spaces_content_spaces_content_hero_image_idx" ON "pages" USING btree ("spaces_content_hero_image_id");
  CREATE INDEX "pages_golden_path_content_golden_path_content_hero_image_idx" ON "pages" USING btree ("golden_path_content_hero_image_id");
  CREATE INDEX "pages_ambassador_content_ambassador_content_hero_image_idx" ON "pages" USING btree ("ambassador_content_hero_image_id");
  CREATE INDEX "pages_ambassador_content_ambassador_content_ambassador_p_idx" ON "pages" USING btree ("ambassador_content_ambassador_photo_id");
  CREATE INDEX "pages_awards_page_content_awards_page_content_hero_image_idx" ON "pages" USING btree ("awards_page_content_hero_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_hero_banner_order_idx" ON "_pages_v_blocks_hero_banner" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_banner_parent_id_idx" ON "_pages_v_blocks_hero_banner" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_banner_path_idx" ON "_pages_v_blocks_hero_banner" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_banner_background_image_idx" ON "_pages_v_blocks_hero_banner" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_rich_content_order_idx" ON "_pages_v_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_content_parent_id_idx" ON "_pages_v_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_content_path_idx" ON "_pages_v_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_gallery_images_order_idx" ON "_pages_v_blocks_image_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_gallery_images_parent_id_idx" ON "_pages_v_blocks_image_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_images_image_idx" ON "_pages_v_blocks_image_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_order_idx" ON "_pages_v_blocks_image_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_gallery_parent_id_idx" ON "_pages_v_blocks_image_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_path_idx" ON "_pages_v_blocks_image_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_call_to_action_order_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_call_to_action_parent_id_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_call_to_action_path_idx" ON "_pages_v_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_order_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_parent_id_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_cards_image_idx" ON "_pages_v_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_card_grid_order_idx" ON "_pages_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_card_grid_parent_id_idx" ON "_pages_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_card_grid_path_idx" ON "_pages_v_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_accordion_items_order_idx" ON "_pages_v_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_items_parent_id_idx" ON "_pages_v_blocks_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_order_idx" ON "_pages_v_blocks_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_accordion_parent_id_idx" ON "_pages_v_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_accordion_path_idx" ON "_pages_v_blocks_accordion" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_embed_order_idx" ON "_pages_v_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_embed_parent_id_idx" ON "_pages_v_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_embed_path_idx" ON "_pages_v_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonial_items_order_idx" ON "_pages_v_blocks_testimonial_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonial_items_parent_id_idx" ON "_pages_v_blocks_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonial_items_photo_idx" ON "_pages_v_blocks_testimonial_items" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_testimonial_order_idx" ON "_pages_v_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonial_parent_id_idx" ON "_pages_v_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonial_path_idx" ON "_pages_v_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_donation_links_links_order_idx" ON "_pages_v_blocks_donation_links_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_donation_links_links_parent_id_idx" ON "_pages_v_blocks_donation_links_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_donation_links_order_idx" ON "_pages_v_blocks_donation_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_donation_links_parent_id_idx" ON "_pages_v_blocks_donation_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_donation_links_path_idx" ON "_pages_v_blocks_donation_links" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_form_idx" ON "_pages_v_blocks_contact_form" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_event_carousel_order_idx" ON "_pages_v_blocks_event_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_event_carousel_parent_id_idx" ON "_pages_v_blocks_event_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_event_carousel_path_idx" ON "_pages_v_blocks_event_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_posts_grid_order_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_posts_grid_parent_id_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_posts_grid_path_idx" ON "_pages_v_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_icon_list_items_order_idx" ON "_pages_v_blocks_icon_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icon_list_items_parent_id_idx" ON "_pages_v_blocks_icon_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_list_order_idx" ON "_pages_v_blocks_icon_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_icon_list_parent_id_idx" ON "_pages_v_blocks_icon_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_icon_list_path_idx" ON "_pages_v_blocks_icon_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_social_icons_items_order_idx" ON "_pages_v_blocks_social_icons_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_social_icons_items_parent_id_idx" ON "_pages_v_blocks_social_icons_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_social_icons_order_idx" ON "_pages_v_blocks_social_icons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_social_icons_parent_id_idx" ON "_pages_v_blocks_social_icons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_social_icons_path_idx" ON "_pages_v_blocks_social_icons" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_divider_order_idx" ON "_pages_v_blocks_divider" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_divider_parent_id_idx" ON "_pages_v_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_divider_path_idx" ON "_pages_v_blocks_divider" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_columns_layout_columns_order_idx" ON "_pages_v_blocks_columns_layout_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_layout_columns_parent_id_idx" ON "_pages_v_blocks_columns_layout_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_layout_columns_image_idx" ON "_pages_v_blocks_columns_layout_columns" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_columns_layout_order_idx" ON "_pages_v_blocks_columns_layout" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_columns_layout_parent_id_idx" ON "_pages_v_blocks_columns_layout" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_columns_layout_path_idx" ON "_pages_v_blocks_columns_layout" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_audio_player_order_idx" ON "_pages_v_blocks_audio_player" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_audio_player_parent_id_idx" ON "_pages_v_blocks_audio_player" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_audio_player_path_idx" ON "_pages_v_blocks_audio_player" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_audio_player_audio_idx" ON "_pages_v_blocks_audio_player" USING btree ("audio_id");
  CREATE INDEX "_pages_v_blocks_audio_player_audio_file_idx" ON "_pages_v_blocks_audio_player" USING btree ("audio_file_id");
  CREATE INDEX "_pages_v_blocks_download_grid_downloads_order_idx" ON "_pages_v_blocks_download_grid_downloads" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_download_grid_downloads_parent_id_idx" ON "_pages_v_blocks_download_grid_downloads" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_download_grid_downloads_file_idx" ON "_pages_v_blocks_download_grid_downloads" USING btree ("file_id");
  CREATE INDEX "_pages_v_blocks_download_grid_order_idx" ON "_pages_v_blocks_download_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_download_grid_parent_id_idx" ON "_pages_v_blocks_download_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_download_grid_path_idx" ON "_pages_v_blocks_download_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_download_grid_meditation_idx" ON "_pages_v_blocks_download_grid" USING btree ("meditation_id");
  CREATE INDEX "_pages_v_version_home_content_hero_slides_order_idx" ON "_pages_v_version_home_content_hero_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_version_home_content_hero_slides_parent_id_idx" ON "_pages_v_version_home_content_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_home_content_hero_slides_image_idx" ON "_pages_v_version_home_content_hero_slides" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_home_content_where_is_mohanji_order_idx" ON "_pages_v_version_home_content_where_is_mohanji" USING btree ("_order");
  CREATE INDEX "_pages_v_version_home_content_where_is_mohanji_parent_id_idx" ON "_pages_v_version_home_content_where_is_mohanji" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_home_content_activity_stats_order_idx" ON "_pages_v_version_home_content_activity_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_version_home_content_activity_stats_parent_id_idx" ON "_pages_v_version_home_content_activity_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_home_content_centres_order_idx" ON "_pages_v_version_home_content_centres" USING btree ("_order");
  CREATE INDEX "_pages_v_version_home_content_centres_parent_id_idx" ON "_pages_v_version_home_content_centres" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_home_content_platforms_order_idx" ON "_pages_v_version_home_content_platforms" USING btree ("_order");
  CREATE INDEX "_pages_v_version_home_content_platforms_parent_id_idx" ON "_pages_v_version_home_content_platforms" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_home_content_platforms_logo_idx" ON "_pages_v_version_home_content_platforms" USING btree ("logo_id");
  CREATE INDEX "_pages_v_version_wim_content_initiatives_order_idx" ON "_pages_v_version_wim_content_initiatives" USING btree ("_order");
  CREATE INDEX "_pages_v_version_wim_content_initiatives_parent_id_idx" ON "_pages_v_version_wim_content_initiatives" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_wim_content_initiatives_logo_idx" ON "_pages_v_version_wim_content_initiatives" USING btree ("logo_id");
  CREATE INDEX "_pages_v_version_foundation_content_stats_order_idx" ON "_pages_v_version_foundation_content_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_version_foundation_content_stats_parent_id_idx" ON "_pages_v_version_foundation_content_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_foundation_content_founded_platforms_order_idx" ON "_pages_v_version_foundation_content_founded_platforms" USING btree ("_order");
  CREATE INDEX "_pages_v_version_foundation_content_founded_platforms_parent_id_idx" ON "_pages_v_version_foundation_content_founded_platforms" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_foundation_content_founded_platforms_lo_idx" ON "_pages_v_version_foundation_content_founded_platforms" USING btree ("logo_id");
  CREATE INDEX "_pages_v_version_foundation_content_inspired_platforms_order_idx" ON "_pages_v_version_foundation_content_inspired_platforms" USING btree ("_order");
  CREATE INDEX "_pages_v_version_foundation_content_inspired_platforms_parent_id_idx" ON "_pages_v_version_foundation_content_inspired_platforms" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_foundation_content_inspired_platforms_l_idx" ON "_pages_v_version_foundation_content_inspired_platforms" USING btree ("logo_id");
  CREATE INDEX "_pages_v_version_foundation_content_pillars_order_idx" ON "_pages_v_version_foundation_content_pillars" USING btree ("_order");
  CREATE INDEX "_pages_v_version_foundation_content_pillars_parent_id_idx" ON "_pages_v_version_foundation_content_pillars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_life_journey_content_chapters_order_idx" ON "_pages_v_version_life_journey_content_chapters" USING btree ("_order");
  CREATE INDEX "_pages_v_version_life_journey_content_chapters_parent_id_idx" ON "_pages_v_version_life_journey_content_chapters" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_life_journey_content_chapters_image_idx" ON "_pages_v_version_life_journey_content_chapters" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_life_journey_content_stats_order_idx" ON "_pages_v_version_life_journey_content_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_version_life_journey_content_stats_parent_id_idx" ON "_pages_v_version_life_journey_content_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_council_content_purpose_points_order_idx" ON "_pages_v_version_council_content_purpose_points" USING btree ("_order");
  CREATE INDEX "_pages_v_version_council_content_purpose_points_parent_id_idx" ON "_pages_v_version_council_content_purpose_points" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_council_content_members_order_idx" ON "_pages_v_version_council_content_members" USING btree ("_order");
  CREATE INDEX "_pages_v_version_council_content_members_parent_id_idx" ON "_pages_v_version_council_content_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_council_content_members_photo_idx" ON "_pages_v_version_council_content_members" USING btree ("photo_id");
  CREATE INDEX "_pages_v_version_council_content_regions_order_idx" ON "_pages_v_version_council_content_regions" USING btree ("_order");
  CREATE INDEX "_pages_v_version_council_content_regions_parent_id_idx" ON "_pages_v_version_council_content_regions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_council_content_how_it_works_order_idx" ON "_pages_v_version_council_content_how_it_works" USING btree ("_order");
  CREATE INDEX "_pages_v_version_council_content_how_it_works_parent_id_idx" ON "_pages_v_version_council_content_how_it_works" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_spaces_content_spaces_order_idx" ON "_pages_v_version_spaces_content_spaces" USING btree ("_order");
  CREATE INDEX "_pages_v_version_spaces_content_spaces_parent_id_idx" ON "_pages_v_version_spaces_content_spaces" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_spaces_content_spaces_image_idx" ON "_pages_v_version_spaces_content_spaces" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_golden_path_content_stages_order_idx" ON "_pages_v_version_golden_path_content_stages" USING btree ("_order");
  CREATE INDEX "_pages_v_version_golden_path_content_stages_parent_id_idx" ON "_pages_v_version_golden_path_content_stages" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_ambassador_content_events_order_idx" ON "_pages_v_version_ambassador_content_events" USING btree ("_order");
  CREATE INDEX "_pages_v_version_ambassador_content_events_parent_id_idx" ON "_pages_v_version_ambassador_content_events" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_ambassador_content_events_image_idx" ON "_pages_v_version_ambassador_content_events" USING btree ("image_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_parent_idx" ON "_pages_v" USING btree ("version_parent_id");
  CREATE INDEX "_pages_v_version_version_featured_image_idx" ON "_pages_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_home_content_about_section_version_home_idx" ON "_pages_v" USING btree ("version_home_content_about_section_image_id");
  CREATE INDEX "_pages_v_version_home_content_activities_section_version_idx" ON "_pages_v" USING btree ("version_home_content_activities_section_image_id");
  CREATE INDEX "_pages_v_version_home_content_version_home_content_medit_idx" ON "_pages_v" USING btree ("version_home_content_meditations_cta_image_id");
  CREATE INDEX "_pages_v_version_wim_content_version_wim_content_hero_im_idx" ON "_pages_v" USING btree ("version_wim_content_hero_image_id");
  CREATE INDEX "_pages_v_version_wim_content_version_wim_content_portrai_idx" ON "_pages_v" USING btree ("version_wim_content_portrait_image_id");
  CREATE INDEX "_pages_v_version_wim_content_version_wim_content_wide_im_idx" ON "_pages_v" USING btree ("version_wim_content_wide_image_id");
  CREATE INDEX "_pages_v_version_foundation_content_version_foundation_c_idx" ON "_pages_v" USING btree ("version_foundation_content_hero_image_id");
  CREATE INDEX "_pages_v_version_life_journey_content_version_life_journ_idx" ON "_pages_v" USING btree ("version_life_journey_content_hero_image_id");
  CREATE INDEX "_pages_v_version_council_content_version_council_content_idx" ON "_pages_v" USING btree ("version_council_content_hero_image_id");
  CREATE INDEX "_pages_v_version_spaces_content_version_spaces_content_h_idx" ON "_pages_v" USING btree ("version_spaces_content_hero_image_id");
  CREATE INDEX "_pages_v_version_golden_path_content_version_golden_path_idx" ON "_pages_v" USING btree ("version_golden_path_content_hero_image_id");
  CREATE INDEX "_pages_v_version_ambassador_content_version_ambassador_c_idx" ON "_pages_v" USING btree ("version_ambassador_content_hero_image_id");
  CREATE INDEX "_pages_v_version_ambassador_content_version_ambassador_1_idx" ON "_pages_v" USING btree ("version_ambassador_content_ambassador_photo_id");
  CREATE INDEX "_pages_v_version_awards_page_content_version_awards_page_idx" ON "_pages_v" USING btree ("version_awards_page_content_hero_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_tags_id_idx" ON "posts_rels" USING btree ("tags_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_featured_image_idx" ON "_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_tags_id_idx" ON "_posts_v_rels" USING btree ("tags_id");
  CREATE INDEX "meditations_blocks_hero_banner_order_idx" ON "meditations_blocks_hero_banner" USING btree ("_order");
  CREATE INDEX "meditations_blocks_hero_banner_parent_id_idx" ON "meditations_blocks_hero_banner" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_hero_banner_path_idx" ON "meditations_blocks_hero_banner" USING btree ("_path");
  CREATE INDEX "meditations_blocks_hero_banner_background_image_idx" ON "meditations_blocks_hero_banner" USING btree ("background_image_id");
  CREATE INDEX "meditations_blocks_rich_content_order_idx" ON "meditations_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "meditations_blocks_rich_content_parent_id_idx" ON "meditations_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_rich_content_path_idx" ON "meditations_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "meditations_blocks_image_gallery_images_order_idx" ON "meditations_blocks_image_gallery_images" USING btree ("_order");
  CREATE INDEX "meditations_blocks_image_gallery_images_parent_id_idx" ON "meditations_blocks_image_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_image_gallery_images_image_idx" ON "meditations_blocks_image_gallery_images" USING btree ("image_id");
  CREATE INDEX "meditations_blocks_image_gallery_order_idx" ON "meditations_blocks_image_gallery" USING btree ("_order");
  CREATE INDEX "meditations_blocks_image_gallery_parent_id_idx" ON "meditations_blocks_image_gallery" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_image_gallery_path_idx" ON "meditations_blocks_image_gallery" USING btree ("_path");
  CREATE INDEX "meditations_blocks_call_to_action_order_idx" ON "meditations_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "meditations_blocks_call_to_action_parent_id_idx" ON "meditations_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_call_to_action_path_idx" ON "meditations_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "meditations_blocks_card_grid_cards_order_idx" ON "meditations_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "meditations_blocks_card_grid_cards_parent_id_idx" ON "meditations_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_card_grid_cards_image_idx" ON "meditations_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "meditations_blocks_card_grid_order_idx" ON "meditations_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "meditations_blocks_card_grid_parent_id_idx" ON "meditations_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_card_grid_path_idx" ON "meditations_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "meditations_blocks_accordion_items_order_idx" ON "meditations_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "meditations_blocks_accordion_items_parent_id_idx" ON "meditations_blocks_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_accordion_order_idx" ON "meditations_blocks_accordion" USING btree ("_order");
  CREATE INDEX "meditations_blocks_accordion_parent_id_idx" ON "meditations_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_accordion_path_idx" ON "meditations_blocks_accordion" USING btree ("_path");
  CREATE INDEX "meditations_blocks_video_embed_order_idx" ON "meditations_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "meditations_blocks_video_embed_parent_id_idx" ON "meditations_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_video_embed_path_idx" ON "meditations_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "meditations_blocks_testimonial_items_order_idx" ON "meditations_blocks_testimonial_items" USING btree ("_order");
  CREATE INDEX "meditations_blocks_testimonial_items_parent_id_idx" ON "meditations_blocks_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_testimonial_items_photo_idx" ON "meditations_blocks_testimonial_items" USING btree ("photo_id");
  CREATE INDEX "meditations_blocks_testimonial_order_idx" ON "meditations_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "meditations_blocks_testimonial_parent_id_idx" ON "meditations_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_testimonial_path_idx" ON "meditations_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "meditations_blocks_donation_links_links_order_idx" ON "meditations_blocks_donation_links_links" USING btree ("_order");
  CREATE INDEX "meditations_blocks_donation_links_links_parent_id_idx" ON "meditations_blocks_donation_links_links" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_donation_links_order_idx" ON "meditations_blocks_donation_links" USING btree ("_order");
  CREATE INDEX "meditations_blocks_donation_links_parent_id_idx" ON "meditations_blocks_donation_links" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_donation_links_path_idx" ON "meditations_blocks_donation_links" USING btree ("_path");
  CREATE INDEX "meditations_blocks_contact_form_order_idx" ON "meditations_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "meditations_blocks_contact_form_parent_id_idx" ON "meditations_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_contact_form_path_idx" ON "meditations_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "meditations_blocks_contact_form_form_idx" ON "meditations_blocks_contact_form" USING btree ("form_id");
  CREATE INDEX "meditations_blocks_event_carousel_order_idx" ON "meditations_blocks_event_carousel" USING btree ("_order");
  CREATE INDEX "meditations_blocks_event_carousel_parent_id_idx" ON "meditations_blocks_event_carousel" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_event_carousel_path_idx" ON "meditations_blocks_event_carousel" USING btree ("_path");
  CREATE INDEX "meditations_blocks_posts_grid_order_idx" ON "meditations_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX "meditations_blocks_posts_grid_parent_id_idx" ON "meditations_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_posts_grid_path_idx" ON "meditations_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX "meditations_blocks_icon_list_items_order_idx" ON "meditations_blocks_icon_list_items" USING btree ("_order");
  CREATE INDEX "meditations_blocks_icon_list_items_parent_id_idx" ON "meditations_blocks_icon_list_items" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_icon_list_order_idx" ON "meditations_blocks_icon_list" USING btree ("_order");
  CREATE INDEX "meditations_blocks_icon_list_parent_id_idx" ON "meditations_blocks_icon_list" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_icon_list_path_idx" ON "meditations_blocks_icon_list" USING btree ("_path");
  CREATE INDEX "meditations_blocks_social_icons_items_order_idx" ON "meditations_blocks_social_icons_items" USING btree ("_order");
  CREATE INDEX "meditations_blocks_social_icons_items_parent_id_idx" ON "meditations_blocks_social_icons_items" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_social_icons_order_idx" ON "meditations_blocks_social_icons" USING btree ("_order");
  CREATE INDEX "meditations_blocks_social_icons_parent_id_idx" ON "meditations_blocks_social_icons" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_social_icons_path_idx" ON "meditations_blocks_social_icons" USING btree ("_path");
  CREATE INDEX "meditations_blocks_divider_order_idx" ON "meditations_blocks_divider" USING btree ("_order");
  CREATE INDEX "meditations_blocks_divider_parent_id_idx" ON "meditations_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_divider_path_idx" ON "meditations_blocks_divider" USING btree ("_path");
  CREATE INDEX "meditations_blocks_columns_layout_columns_order_idx" ON "meditations_blocks_columns_layout_columns" USING btree ("_order");
  CREATE INDEX "meditations_blocks_columns_layout_columns_parent_id_idx" ON "meditations_blocks_columns_layout_columns" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_columns_layout_columns_image_idx" ON "meditations_blocks_columns_layout_columns" USING btree ("image_id");
  CREATE INDEX "meditations_blocks_columns_layout_order_idx" ON "meditations_blocks_columns_layout" USING btree ("_order");
  CREATE INDEX "meditations_blocks_columns_layout_parent_id_idx" ON "meditations_blocks_columns_layout" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_columns_layout_path_idx" ON "meditations_blocks_columns_layout" USING btree ("_path");
  CREATE INDEX "meditations_blocks_audio_player_order_idx" ON "meditations_blocks_audio_player" USING btree ("_order");
  CREATE INDEX "meditations_blocks_audio_player_parent_id_idx" ON "meditations_blocks_audio_player" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_audio_player_path_idx" ON "meditations_blocks_audio_player" USING btree ("_path");
  CREATE INDEX "meditations_blocks_audio_player_audio_idx" ON "meditations_blocks_audio_player" USING btree ("audio_id");
  CREATE INDEX "meditations_blocks_audio_player_audio_file_idx" ON "meditations_blocks_audio_player" USING btree ("audio_file_id");
  CREATE INDEX "meditations_blocks_download_grid_downloads_order_idx" ON "meditations_blocks_download_grid_downloads" USING btree ("_order");
  CREATE INDEX "meditations_blocks_download_grid_downloads_parent_id_idx" ON "meditations_blocks_download_grid_downloads" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_download_grid_downloads_file_idx" ON "meditations_blocks_download_grid_downloads" USING btree ("file_id");
  CREATE INDEX "meditations_blocks_download_grid_order_idx" ON "meditations_blocks_download_grid" USING btree ("_order");
  CREATE INDEX "meditations_blocks_download_grid_parent_id_idx" ON "meditations_blocks_download_grid" USING btree ("_parent_id");
  CREATE INDEX "meditations_blocks_download_grid_path_idx" ON "meditations_blocks_download_grid" USING btree ("_path");
  CREATE INDEX "meditations_blocks_download_grid_meditation_idx" ON "meditations_blocks_download_grid" USING btree ("meditation_id");
  CREATE INDEX "meditations_downloads_order_idx" ON "meditations_downloads" USING btree ("_order");
  CREATE INDEX "meditations_downloads_parent_id_idx" ON "meditations_downloads" USING btree ("_parent_id");
  CREATE INDEX "meditations_downloads_audio_file_idx" ON "meditations_downloads" USING btree ("audio_file_id");
  CREATE UNIQUE INDEX "meditations_slug_idx" ON "meditations" USING btree ("slug");
  CREATE INDEX "meditations_featured_image_idx" ON "meditations" USING btree ("featured_image_id");
  CREATE INDEX "meditations_audio_preview_idx" ON "meditations" USING btree ("audio_preview_id");
  CREATE INDEX "meditations_meta_meta_image_idx" ON "meditations" USING btree ("meta_image_id");
  CREATE INDEX "meditations_updated_at_idx" ON "meditations" USING btree ("updated_at");
  CREATE INDEX "meditations_created_at_idx" ON "meditations" USING btree ("created_at");
  CREATE INDEX "practices_blocks_hero_banner_order_idx" ON "practices_blocks_hero_banner" USING btree ("_order");
  CREATE INDEX "practices_blocks_hero_banner_parent_id_idx" ON "practices_blocks_hero_banner" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_hero_banner_path_idx" ON "practices_blocks_hero_banner" USING btree ("_path");
  CREATE INDEX "practices_blocks_hero_banner_background_image_idx" ON "practices_blocks_hero_banner" USING btree ("background_image_id");
  CREATE INDEX "practices_blocks_rich_content_order_idx" ON "practices_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "practices_blocks_rich_content_parent_id_idx" ON "practices_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_rich_content_path_idx" ON "practices_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "practices_blocks_image_gallery_images_order_idx" ON "practices_blocks_image_gallery_images" USING btree ("_order");
  CREATE INDEX "practices_blocks_image_gallery_images_parent_id_idx" ON "practices_blocks_image_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_image_gallery_images_image_idx" ON "practices_blocks_image_gallery_images" USING btree ("image_id");
  CREATE INDEX "practices_blocks_image_gallery_order_idx" ON "practices_blocks_image_gallery" USING btree ("_order");
  CREATE INDEX "practices_blocks_image_gallery_parent_id_idx" ON "practices_blocks_image_gallery" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_image_gallery_path_idx" ON "practices_blocks_image_gallery" USING btree ("_path");
  CREATE INDEX "practices_blocks_call_to_action_order_idx" ON "practices_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "practices_blocks_call_to_action_parent_id_idx" ON "practices_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_call_to_action_path_idx" ON "practices_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "practices_blocks_card_grid_cards_order_idx" ON "practices_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "practices_blocks_card_grid_cards_parent_id_idx" ON "practices_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_card_grid_cards_image_idx" ON "practices_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "practices_blocks_card_grid_order_idx" ON "practices_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "practices_blocks_card_grid_parent_id_idx" ON "practices_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_card_grid_path_idx" ON "practices_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "practices_blocks_accordion_items_order_idx" ON "practices_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "practices_blocks_accordion_items_parent_id_idx" ON "practices_blocks_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_accordion_order_idx" ON "practices_blocks_accordion" USING btree ("_order");
  CREATE INDEX "practices_blocks_accordion_parent_id_idx" ON "practices_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_accordion_path_idx" ON "practices_blocks_accordion" USING btree ("_path");
  CREATE INDEX "practices_blocks_video_embed_order_idx" ON "practices_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "practices_blocks_video_embed_parent_id_idx" ON "practices_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_video_embed_path_idx" ON "practices_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "practices_blocks_testimonial_items_order_idx" ON "practices_blocks_testimonial_items" USING btree ("_order");
  CREATE INDEX "practices_blocks_testimonial_items_parent_id_idx" ON "practices_blocks_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_testimonial_items_photo_idx" ON "practices_blocks_testimonial_items" USING btree ("photo_id");
  CREATE INDEX "practices_blocks_testimonial_order_idx" ON "practices_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "practices_blocks_testimonial_parent_id_idx" ON "practices_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_testimonial_path_idx" ON "practices_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "practices_blocks_donation_links_links_order_idx" ON "practices_blocks_donation_links_links" USING btree ("_order");
  CREATE INDEX "practices_blocks_donation_links_links_parent_id_idx" ON "practices_blocks_donation_links_links" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_donation_links_order_idx" ON "practices_blocks_donation_links" USING btree ("_order");
  CREATE INDEX "practices_blocks_donation_links_parent_id_idx" ON "practices_blocks_donation_links" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_donation_links_path_idx" ON "practices_blocks_donation_links" USING btree ("_path");
  CREATE INDEX "practices_blocks_contact_form_order_idx" ON "practices_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "practices_blocks_contact_form_parent_id_idx" ON "practices_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_contact_form_path_idx" ON "practices_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "practices_blocks_contact_form_form_idx" ON "practices_blocks_contact_form" USING btree ("form_id");
  CREATE INDEX "practices_blocks_event_carousel_order_idx" ON "practices_blocks_event_carousel" USING btree ("_order");
  CREATE INDEX "practices_blocks_event_carousel_parent_id_idx" ON "practices_blocks_event_carousel" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_event_carousel_path_idx" ON "practices_blocks_event_carousel" USING btree ("_path");
  CREATE INDEX "practices_blocks_posts_grid_order_idx" ON "practices_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX "practices_blocks_posts_grid_parent_id_idx" ON "practices_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_posts_grid_path_idx" ON "practices_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX "practices_blocks_icon_list_items_order_idx" ON "practices_blocks_icon_list_items" USING btree ("_order");
  CREATE INDEX "practices_blocks_icon_list_items_parent_id_idx" ON "practices_blocks_icon_list_items" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_icon_list_order_idx" ON "practices_blocks_icon_list" USING btree ("_order");
  CREATE INDEX "practices_blocks_icon_list_parent_id_idx" ON "practices_blocks_icon_list" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_icon_list_path_idx" ON "practices_blocks_icon_list" USING btree ("_path");
  CREATE INDEX "practices_blocks_social_icons_items_order_idx" ON "practices_blocks_social_icons_items" USING btree ("_order");
  CREATE INDEX "practices_blocks_social_icons_items_parent_id_idx" ON "practices_blocks_social_icons_items" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_social_icons_order_idx" ON "practices_blocks_social_icons" USING btree ("_order");
  CREATE INDEX "practices_blocks_social_icons_parent_id_idx" ON "practices_blocks_social_icons" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_social_icons_path_idx" ON "practices_blocks_social_icons" USING btree ("_path");
  CREATE INDEX "practices_blocks_divider_order_idx" ON "practices_blocks_divider" USING btree ("_order");
  CREATE INDEX "practices_blocks_divider_parent_id_idx" ON "practices_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_divider_path_idx" ON "practices_blocks_divider" USING btree ("_path");
  CREATE INDEX "practices_blocks_columns_layout_columns_order_idx" ON "practices_blocks_columns_layout_columns" USING btree ("_order");
  CREATE INDEX "practices_blocks_columns_layout_columns_parent_id_idx" ON "practices_blocks_columns_layout_columns" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_columns_layout_columns_image_idx" ON "practices_blocks_columns_layout_columns" USING btree ("image_id");
  CREATE INDEX "practices_blocks_columns_layout_order_idx" ON "practices_blocks_columns_layout" USING btree ("_order");
  CREATE INDEX "practices_blocks_columns_layout_parent_id_idx" ON "practices_blocks_columns_layout" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_columns_layout_path_idx" ON "practices_blocks_columns_layout" USING btree ("_path");
  CREATE INDEX "practices_blocks_audio_player_order_idx" ON "practices_blocks_audio_player" USING btree ("_order");
  CREATE INDEX "practices_blocks_audio_player_parent_id_idx" ON "practices_blocks_audio_player" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_audio_player_path_idx" ON "practices_blocks_audio_player" USING btree ("_path");
  CREATE INDEX "practices_blocks_audio_player_audio_idx" ON "practices_blocks_audio_player" USING btree ("audio_id");
  CREATE INDEX "practices_blocks_audio_player_audio_file_idx" ON "practices_blocks_audio_player" USING btree ("audio_file_id");
  CREATE INDEX "practices_blocks_download_grid_downloads_order_idx" ON "practices_blocks_download_grid_downloads" USING btree ("_order");
  CREATE INDEX "practices_blocks_download_grid_downloads_parent_id_idx" ON "practices_blocks_download_grid_downloads" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_download_grid_downloads_file_idx" ON "practices_blocks_download_grid_downloads" USING btree ("file_id");
  CREATE INDEX "practices_blocks_download_grid_order_idx" ON "practices_blocks_download_grid" USING btree ("_order");
  CREATE INDEX "practices_blocks_download_grid_parent_id_idx" ON "practices_blocks_download_grid" USING btree ("_parent_id");
  CREATE INDEX "practices_blocks_download_grid_path_idx" ON "practices_blocks_download_grid" USING btree ("_path");
  CREATE INDEX "practices_blocks_download_grid_meditation_idx" ON "practices_blocks_download_grid" USING btree ("meditation_id");
  CREATE UNIQUE INDEX "practices_slug_idx" ON "practices" USING btree ("slug");
  CREATE INDEX "practices_featured_image_idx" ON "practices" USING btree ("featured_image_id");
  CREATE INDEX "practices_meta_meta_image_idx" ON "practices" USING btree ("meta_image_id");
  CREATE INDEX "practices_updated_at_idx" ON "practices" USING btree ("updated_at");
  CREATE INDEX "practices_created_at_idx" ON "practices" USING btree ("created_at");
  CREATE INDEX "courses_blocks_hero_banner_order_idx" ON "courses_blocks_hero_banner" USING btree ("_order");
  CREATE INDEX "courses_blocks_hero_banner_parent_id_idx" ON "courses_blocks_hero_banner" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_hero_banner_path_idx" ON "courses_blocks_hero_banner" USING btree ("_path");
  CREATE INDEX "courses_blocks_hero_banner_background_image_idx" ON "courses_blocks_hero_banner" USING btree ("background_image_id");
  CREATE INDEX "courses_blocks_rich_content_order_idx" ON "courses_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "courses_blocks_rich_content_parent_id_idx" ON "courses_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_rich_content_path_idx" ON "courses_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "courses_blocks_image_gallery_images_order_idx" ON "courses_blocks_image_gallery_images" USING btree ("_order");
  CREATE INDEX "courses_blocks_image_gallery_images_parent_id_idx" ON "courses_blocks_image_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_image_gallery_images_image_idx" ON "courses_blocks_image_gallery_images" USING btree ("image_id");
  CREATE INDEX "courses_blocks_image_gallery_order_idx" ON "courses_blocks_image_gallery" USING btree ("_order");
  CREATE INDEX "courses_blocks_image_gallery_parent_id_idx" ON "courses_blocks_image_gallery" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_image_gallery_path_idx" ON "courses_blocks_image_gallery" USING btree ("_path");
  CREATE INDEX "courses_blocks_call_to_action_order_idx" ON "courses_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "courses_blocks_call_to_action_parent_id_idx" ON "courses_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_call_to_action_path_idx" ON "courses_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "courses_blocks_card_grid_cards_order_idx" ON "courses_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "courses_blocks_card_grid_cards_parent_id_idx" ON "courses_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_card_grid_cards_image_idx" ON "courses_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "courses_blocks_card_grid_order_idx" ON "courses_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "courses_blocks_card_grid_parent_id_idx" ON "courses_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_card_grid_path_idx" ON "courses_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "courses_blocks_accordion_items_order_idx" ON "courses_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "courses_blocks_accordion_items_parent_id_idx" ON "courses_blocks_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_accordion_order_idx" ON "courses_blocks_accordion" USING btree ("_order");
  CREATE INDEX "courses_blocks_accordion_parent_id_idx" ON "courses_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_accordion_path_idx" ON "courses_blocks_accordion" USING btree ("_path");
  CREATE INDEX "courses_blocks_video_embed_order_idx" ON "courses_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "courses_blocks_video_embed_parent_id_idx" ON "courses_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_video_embed_path_idx" ON "courses_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "courses_blocks_testimonial_items_order_idx" ON "courses_blocks_testimonial_items" USING btree ("_order");
  CREATE INDEX "courses_blocks_testimonial_items_parent_id_idx" ON "courses_blocks_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_testimonial_items_photo_idx" ON "courses_blocks_testimonial_items" USING btree ("photo_id");
  CREATE INDEX "courses_blocks_testimonial_order_idx" ON "courses_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "courses_blocks_testimonial_parent_id_idx" ON "courses_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_testimonial_path_idx" ON "courses_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "courses_blocks_donation_links_links_order_idx" ON "courses_blocks_donation_links_links" USING btree ("_order");
  CREATE INDEX "courses_blocks_donation_links_links_parent_id_idx" ON "courses_blocks_donation_links_links" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_donation_links_order_idx" ON "courses_blocks_donation_links" USING btree ("_order");
  CREATE INDEX "courses_blocks_donation_links_parent_id_idx" ON "courses_blocks_donation_links" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_donation_links_path_idx" ON "courses_blocks_donation_links" USING btree ("_path");
  CREATE INDEX "courses_blocks_contact_form_order_idx" ON "courses_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "courses_blocks_contact_form_parent_id_idx" ON "courses_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_contact_form_path_idx" ON "courses_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "courses_blocks_contact_form_form_idx" ON "courses_blocks_contact_form" USING btree ("form_id");
  CREATE INDEX "courses_blocks_event_carousel_order_idx" ON "courses_blocks_event_carousel" USING btree ("_order");
  CREATE INDEX "courses_blocks_event_carousel_parent_id_idx" ON "courses_blocks_event_carousel" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_event_carousel_path_idx" ON "courses_blocks_event_carousel" USING btree ("_path");
  CREATE INDEX "courses_blocks_posts_grid_order_idx" ON "courses_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX "courses_blocks_posts_grid_parent_id_idx" ON "courses_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_posts_grid_path_idx" ON "courses_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX "courses_blocks_icon_list_items_order_idx" ON "courses_blocks_icon_list_items" USING btree ("_order");
  CREATE INDEX "courses_blocks_icon_list_items_parent_id_idx" ON "courses_blocks_icon_list_items" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_icon_list_order_idx" ON "courses_blocks_icon_list" USING btree ("_order");
  CREATE INDEX "courses_blocks_icon_list_parent_id_idx" ON "courses_blocks_icon_list" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_icon_list_path_idx" ON "courses_blocks_icon_list" USING btree ("_path");
  CREATE INDEX "courses_blocks_social_icons_items_order_idx" ON "courses_blocks_social_icons_items" USING btree ("_order");
  CREATE INDEX "courses_blocks_social_icons_items_parent_id_idx" ON "courses_blocks_social_icons_items" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_social_icons_order_idx" ON "courses_blocks_social_icons" USING btree ("_order");
  CREATE INDEX "courses_blocks_social_icons_parent_id_idx" ON "courses_blocks_social_icons" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_social_icons_path_idx" ON "courses_blocks_social_icons" USING btree ("_path");
  CREATE INDEX "courses_blocks_divider_order_idx" ON "courses_blocks_divider" USING btree ("_order");
  CREATE INDEX "courses_blocks_divider_parent_id_idx" ON "courses_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_divider_path_idx" ON "courses_blocks_divider" USING btree ("_path");
  CREATE INDEX "courses_blocks_columns_layout_columns_order_idx" ON "courses_blocks_columns_layout_columns" USING btree ("_order");
  CREATE INDEX "courses_blocks_columns_layout_columns_parent_id_idx" ON "courses_blocks_columns_layout_columns" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_columns_layout_columns_image_idx" ON "courses_blocks_columns_layout_columns" USING btree ("image_id");
  CREATE INDEX "courses_blocks_columns_layout_order_idx" ON "courses_blocks_columns_layout" USING btree ("_order");
  CREATE INDEX "courses_blocks_columns_layout_parent_id_idx" ON "courses_blocks_columns_layout" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_columns_layout_path_idx" ON "courses_blocks_columns_layout" USING btree ("_path");
  CREATE INDEX "courses_blocks_audio_player_order_idx" ON "courses_blocks_audio_player" USING btree ("_order");
  CREATE INDEX "courses_blocks_audio_player_parent_id_idx" ON "courses_blocks_audio_player" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_audio_player_path_idx" ON "courses_blocks_audio_player" USING btree ("_path");
  CREATE INDEX "courses_blocks_audio_player_audio_idx" ON "courses_blocks_audio_player" USING btree ("audio_id");
  CREATE INDEX "courses_blocks_audio_player_audio_file_idx" ON "courses_blocks_audio_player" USING btree ("audio_file_id");
  CREATE INDEX "courses_blocks_download_grid_downloads_order_idx" ON "courses_blocks_download_grid_downloads" USING btree ("_order");
  CREATE INDEX "courses_blocks_download_grid_downloads_parent_id_idx" ON "courses_blocks_download_grid_downloads" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_download_grid_downloads_file_idx" ON "courses_blocks_download_grid_downloads" USING btree ("file_id");
  CREATE INDEX "courses_blocks_download_grid_order_idx" ON "courses_blocks_download_grid" USING btree ("_order");
  CREATE INDEX "courses_blocks_download_grid_parent_id_idx" ON "courses_blocks_download_grid" USING btree ("_parent_id");
  CREATE INDEX "courses_blocks_download_grid_path_idx" ON "courses_blocks_download_grid" USING btree ("_path");
  CREATE INDEX "courses_blocks_download_grid_meditation_idx" ON "courses_blocks_download_grid" USING btree ("meditation_id");
  CREATE UNIQUE INDEX "courses_slug_idx" ON "courses" USING btree ("slug");
  CREATE INDEX "courses_featured_image_idx" ON "courses" USING btree ("featured_image_id");
  CREATE INDEX "courses_meta_meta_image_idx" ON "courses" USING btree ("meta_image_id");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE INDEX "courses__status_idx" ON "courses" USING btree ("_status");
  CREATE INDEX "courses_rels_order_idx" ON "courses_rels" USING btree ("order");
  CREATE INDEX "courses_rels_parent_idx" ON "courses_rels" USING btree ("parent_id");
  CREATE INDEX "courses_rels_path_idx" ON "courses_rels" USING btree ("path");
  CREATE INDEX "courses_rels_courses_id_idx" ON "courses_rels" USING btree ("courses_id");
  CREATE INDEX "courses_rels_lessons_id_idx" ON "courses_rels" USING btree ("lessons_id");
  CREATE INDEX "_courses_v_blocks_hero_banner_order_idx" ON "_courses_v_blocks_hero_banner" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_hero_banner_parent_id_idx" ON "_courses_v_blocks_hero_banner" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_hero_banner_path_idx" ON "_courses_v_blocks_hero_banner" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_hero_banner_background_image_idx" ON "_courses_v_blocks_hero_banner" USING btree ("background_image_id");
  CREATE INDEX "_courses_v_blocks_rich_content_order_idx" ON "_courses_v_blocks_rich_content" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_rich_content_parent_id_idx" ON "_courses_v_blocks_rich_content" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_rich_content_path_idx" ON "_courses_v_blocks_rich_content" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_image_gallery_images_order_idx" ON "_courses_v_blocks_image_gallery_images" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_image_gallery_images_parent_id_idx" ON "_courses_v_blocks_image_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_image_gallery_images_image_idx" ON "_courses_v_blocks_image_gallery_images" USING btree ("image_id");
  CREATE INDEX "_courses_v_blocks_image_gallery_order_idx" ON "_courses_v_blocks_image_gallery" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_image_gallery_parent_id_idx" ON "_courses_v_blocks_image_gallery" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_image_gallery_path_idx" ON "_courses_v_blocks_image_gallery" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_call_to_action_order_idx" ON "_courses_v_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_call_to_action_parent_id_idx" ON "_courses_v_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_call_to_action_path_idx" ON "_courses_v_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_card_grid_cards_order_idx" ON "_courses_v_blocks_card_grid_cards" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_card_grid_cards_parent_id_idx" ON "_courses_v_blocks_card_grid_cards" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_card_grid_cards_image_idx" ON "_courses_v_blocks_card_grid_cards" USING btree ("image_id");
  CREATE INDEX "_courses_v_blocks_card_grid_order_idx" ON "_courses_v_blocks_card_grid" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_card_grid_parent_id_idx" ON "_courses_v_blocks_card_grid" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_card_grid_path_idx" ON "_courses_v_blocks_card_grid" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_accordion_items_order_idx" ON "_courses_v_blocks_accordion_items" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_accordion_items_parent_id_idx" ON "_courses_v_blocks_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_accordion_order_idx" ON "_courses_v_blocks_accordion" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_accordion_parent_id_idx" ON "_courses_v_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_accordion_path_idx" ON "_courses_v_blocks_accordion" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_video_embed_order_idx" ON "_courses_v_blocks_video_embed" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_video_embed_parent_id_idx" ON "_courses_v_blocks_video_embed" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_video_embed_path_idx" ON "_courses_v_blocks_video_embed" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_testimonial_items_order_idx" ON "_courses_v_blocks_testimonial_items" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_testimonial_items_parent_id_idx" ON "_courses_v_blocks_testimonial_items" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_testimonial_items_photo_idx" ON "_courses_v_blocks_testimonial_items" USING btree ("photo_id");
  CREATE INDEX "_courses_v_blocks_testimonial_order_idx" ON "_courses_v_blocks_testimonial" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_testimonial_parent_id_idx" ON "_courses_v_blocks_testimonial" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_testimonial_path_idx" ON "_courses_v_blocks_testimonial" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_donation_links_links_order_idx" ON "_courses_v_blocks_donation_links_links" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_donation_links_links_parent_id_idx" ON "_courses_v_blocks_donation_links_links" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_donation_links_order_idx" ON "_courses_v_blocks_donation_links" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_donation_links_parent_id_idx" ON "_courses_v_blocks_donation_links" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_donation_links_path_idx" ON "_courses_v_blocks_donation_links" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_contact_form_order_idx" ON "_courses_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_contact_form_parent_id_idx" ON "_courses_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_contact_form_path_idx" ON "_courses_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_contact_form_form_idx" ON "_courses_v_blocks_contact_form" USING btree ("form_id");
  CREATE INDEX "_courses_v_blocks_event_carousel_order_idx" ON "_courses_v_blocks_event_carousel" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_event_carousel_parent_id_idx" ON "_courses_v_blocks_event_carousel" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_event_carousel_path_idx" ON "_courses_v_blocks_event_carousel" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_posts_grid_order_idx" ON "_courses_v_blocks_posts_grid" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_posts_grid_parent_id_idx" ON "_courses_v_blocks_posts_grid" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_posts_grid_path_idx" ON "_courses_v_blocks_posts_grid" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_icon_list_items_order_idx" ON "_courses_v_blocks_icon_list_items" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_icon_list_items_parent_id_idx" ON "_courses_v_blocks_icon_list_items" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_icon_list_order_idx" ON "_courses_v_blocks_icon_list" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_icon_list_parent_id_idx" ON "_courses_v_blocks_icon_list" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_icon_list_path_idx" ON "_courses_v_blocks_icon_list" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_social_icons_items_order_idx" ON "_courses_v_blocks_social_icons_items" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_social_icons_items_parent_id_idx" ON "_courses_v_blocks_social_icons_items" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_social_icons_order_idx" ON "_courses_v_blocks_social_icons" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_social_icons_parent_id_idx" ON "_courses_v_blocks_social_icons" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_social_icons_path_idx" ON "_courses_v_blocks_social_icons" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_divider_order_idx" ON "_courses_v_blocks_divider" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_divider_parent_id_idx" ON "_courses_v_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_divider_path_idx" ON "_courses_v_blocks_divider" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_columns_layout_columns_order_idx" ON "_courses_v_blocks_columns_layout_columns" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_columns_layout_columns_parent_id_idx" ON "_courses_v_blocks_columns_layout_columns" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_columns_layout_columns_image_idx" ON "_courses_v_blocks_columns_layout_columns" USING btree ("image_id");
  CREATE INDEX "_courses_v_blocks_columns_layout_order_idx" ON "_courses_v_blocks_columns_layout" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_columns_layout_parent_id_idx" ON "_courses_v_blocks_columns_layout" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_columns_layout_path_idx" ON "_courses_v_blocks_columns_layout" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_audio_player_order_idx" ON "_courses_v_blocks_audio_player" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_audio_player_parent_id_idx" ON "_courses_v_blocks_audio_player" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_audio_player_path_idx" ON "_courses_v_blocks_audio_player" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_audio_player_audio_idx" ON "_courses_v_blocks_audio_player" USING btree ("audio_id");
  CREATE INDEX "_courses_v_blocks_audio_player_audio_file_idx" ON "_courses_v_blocks_audio_player" USING btree ("audio_file_id");
  CREATE INDEX "_courses_v_blocks_download_grid_downloads_order_idx" ON "_courses_v_blocks_download_grid_downloads" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_download_grid_downloads_parent_id_idx" ON "_courses_v_blocks_download_grid_downloads" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_download_grid_downloads_file_idx" ON "_courses_v_blocks_download_grid_downloads" USING btree ("file_id");
  CREATE INDEX "_courses_v_blocks_download_grid_order_idx" ON "_courses_v_blocks_download_grid" USING btree ("_order");
  CREATE INDEX "_courses_v_blocks_download_grid_parent_id_idx" ON "_courses_v_blocks_download_grid" USING btree ("_parent_id");
  CREATE INDEX "_courses_v_blocks_download_grid_path_idx" ON "_courses_v_blocks_download_grid" USING btree ("_path");
  CREATE INDEX "_courses_v_blocks_download_grid_meditation_idx" ON "_courses_v_blocks_download_grid" USING btree ("meditation_id");
  CREATE INDEX "_courses_v_parent_idx" ON "_courses_v" USING btree ("parent_id");
  CREATE INDEX "_courses_v_version_version_slug_idx" ON "_courses_v" USING btree ("version_slug");
  CREATE INDEX "_courses_v_version_version_featured_image_idx" ON "_courses_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_courses_v_version_meta_version_meta_image_idx" ON "_courses_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_courses_v_version_version_updated_at_idx" ON "_courses_v" USING btree ("version_updated_at");
  CREATE INDEX "_courses_v_version_version_created_at_idx" ON "_courses_v" USING btree ("version_created_at");
  CREATE INDEX "_courses_v_version_version__status_idx" ON "_courses_v" USING btree ("version__status");
  CREATE INDEX "_courses_v_created_at_idx" ON "_courses_v" USING btree ("created_at");
  CREATE INDEX "_courses_v_updated_at_idx" ON "_courses_v" USING btree ("updated_at");
  CREATE INDEX "_courses_v_latest_idx" ON "_courses_v" USING btree ("latest");
  CREATE INDEX "_courses_v_rels_order_idx" ON "_courses_v_rels" USING btree ("order");
  CREATE INDEX "_courses_v_rels_parent_idx" ON "_courses_v_rels" USING btree ("parent_id");
  CREATE INDEX "_courses_v_rels_path_idx" ON "_courses_v_rels" USING btree ("path");
  CREATE INDEX "_courses_v_rels_courses_id_idx" ON "_courses_v_rels" USING btree ("courses_id");
  CREATE INDEX "_courses_v_rels_lessons_id_idx" ON "_courses_v_rels" USING btree ("lessons_id");
  CREATE INDEX "lessons_downloadables_order_idx" ON "lessons_downloadables" USING btree ("_order");
  CREATE INDEX "lessons_downloadables_parent_id_idx" ON "lessons_downloadables" USING btree ("_parent_id");
  CREATE INDEX "lessons_downloadables_file_idx" ON "lessons_downloadables" USING btree ("file_id");
  CREATE UNIQUE INDEX "lessons_slug_idx" ON "lessons" USING btree ("slug");
  CREATE INDEX "lessons_course_idx" ON "lessons" USING btree ("course_id");
  CREATE INDEX "lessons_audio_file_idx" ON "lessons" USING btree ("audio_file_id");
  CREATE INDEX "lessons_updated_at_idx" ON "lessons" USING btree ("updated_at");
  CREATE INDEX "lessons_created_at_idx" ON "lessons" USING btree ("created_at");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_featured_image_idx" ON "events" USING btree ("featured_image_id");
  CREATE INDEX "events_venue_idx" ON "events" USING btree ("venue_id");
  CREATE INDEX "events_registration_form_idx" ON "events" USING btree ("registration_form_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_categories_id_idx" ON "events_rels" USING btree ("categories_id");
  CREATE UNIQUE INDEX "books_slug_idx" ON "books" USING btree ("slug");
  CREATE INDEX "books_cover_image_idx" ON "books" USING btree ("cover_image_id");
  CREATE INDEX "books_download_file_idx" ON "books" USING btree ("download_file_id");
  CREATE INDEX "books_updated_at_idx" ON "books" USING btree ("updated_at");
  CREATE INDEX "books_created_at_idx" ON "books" USING btree ("created_at");
  CREATE UNIQUE INDEX "audios_slug_idx" ON "audios" USING btree ("slug");
  CREATE INDEX "audios_featured_image_idx" ON "audios" USING btree ("featured_image_id");
  CREATE INDEX "audios_audio_file_idx" ON "audios" USING btree ("audio_file_id");
  CREATE INDEX "audios_updated_at_idx" ON "audios" USING btree ("updated_at");
  CREATE INDEX "audios_created_at_idx" ON "audios" USING btree ("created_at");
  CREATE INDEX "audios_rels_order_idx" ON "audios_rels" USING btree ("order");
  CREATE INDEX "audios_rels_parent_idx" ON "audios_rels" USING btree ("parent_id");
  CREATE INDEX "audios_rels_path_idx" ON "audios_rels" USING btree ("path");
  CREATE INDEX "audios_rels_categories_id_idx" ON "audios_rels" USING btree ("categories_id");
  CREATE INDEX "quotes_image_idx" ON "quotes" USING btree ("image_id");
  CREATE INDEX "quotes_updated_at_idx" ON "quotes" USING btree ("updated_at");
  CREATE INDEX "quotes_created_at_idx" ON "quotes" USING btree ("created_at");
  CREATE INDEX "quotes_rels_order_idx" ON "quotes_rels" USING btree ("order");
  CREATE INDEX "quotes_rels_parent_idx" ON "quotes_rels" USING btree ("parent_id");
  CREATE INDEX "quotes_rels_path_idx" ON "quotes_rels" USING btree ("path");
  CREATE INDEX "quotes_rels_categories_id_idx" ON "quotes_rels" USING btree ("categories_id");
  CREATE INDEX "awards_image_idx" ON "awards" USING btree ("image_id");
  CREATE INDEX "awards_updated_at_idx" ON "awards" USING btree ("updated_at");
  CREATE INDEX "awards_created_at_idx" ON "awards" USING btree ("created_at");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX "venues_updated_at_idx" ON "venues" USING btree ("updated_at");
  CREATE INDEX "venues_created_at_idx" ON "venues" USING btree ("created_at");
  CREATE INDEX "forms_fields_options_order_idx" ON "forms_fields_options" USING btree ("_order");
  CREATE INDEX "forms_fields_options_parent_id_idx" ON "forms_fields_options" USING btree ("_parent_id");
  CREATE INDEX "forms_fields_order_idx" ON "forms_fields" USING btree ("_order");
  CREATE INDEX "forms_fields_parent_id_idx" ON "forms_fields" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_slug_idx" ON "forms" USING btree ("slug");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_meditations_id_idx" ON "payload_locked_documents_rels" USING btree ("meditations_id");
  CREATE INDEX "payload_locked_documents_rels_practices_id_idx" ON "payload_locked_documents_rels" USING btree ("practices_id");
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX "payload_locked_documents_rels_lessons_id_idx" ON "payload_locked_documents_rels" USING btree ("lessons_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_books_id_idx" ON "payload_locked_documents_rels" USING btree ("books_id");
  CREATE INDEX "payload_locked_documents_rels_audios_id_idx" ON "payload_locked_documents_rels" USING btree ("audios_id");
  CREATE INDEX "payload_locked_documents_rels_quotes_id_idx" ON "payload_locked_documents_rels" USING btree ("quotes_id");
  CREATE INDEX "payload_locked_documents_rels_awards_id_idx" ON "payload_locked_documents_rels" USING btree ("awards_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_venues_id_idx" ON "payload_locked_documents_rels" USING btree ("venues_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_children_sub_items_order_idx" ON "header_nav_items_children_sub_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_children_sub_items_parent_id_idx" ON "header_nav_items_children_sub_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
  CREATE INDEX "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_donation_links_order_idx" ON "site_settings_donation_links" USING btree ("_order");
  CREATE INDEX "site_settings_donation_links_parent_id_idx" ON "site_settings_donation_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_default_meta_default_meta_image_idx" ON "site_settings" USING btree ("default_meta_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_hero_banner" CASCADE;
  DROP TABLE "pages_blocks_rich_content" CASCADE;
  DROP TABLE "pages_blocks_image_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_image_gallery" CASCADE;
  DROP TABLE "pages_blocks_call_to_action" CASCADE;
  DROP TABLE "pages_blocks_card_grid_cards" CASCADE;
  DROP TABLE "pages_blocks_card_grid" CASCADE;
  DROP TABLE "pages_blocks_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_accordion" CASCADE;
  DROP TABLE "pages_blocks_video_embed" CASCADE;
  DROP TABLE "pages_blocks_testimonial_items" CASCADE;
  DROP TABLE "pages_blocks_testimonial" CASCADE;
  DROP TABLE "pages_blocks_donation_links_links" CASCADE;
  DROP TABLE "pages_blocks_donation_links" CASCADE;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_event_carousel" CASCADE;
  DROP TABLE "pages_blocks_posts_grid" CASCADE;
  DROP TABLE "pages_blocks_icon_list_items" CASCADE;
  DROP TABLE "pages_blocks_icon_list" CASCADE;
  DROP TABLE "pages_blocks_social_icons_items" CASCADE;
  DROP TABLE "pages_blocks_social_icons" CASCADE;
  DROP TABLE "pages_blocks_divider" CASCADE;
  DROP TABLE "pages_blocks_columns_layout_columns" CASCADE;
  DROP TABLE "pages_blocks_columns_layout" CASCADE;
  DROP TABLE "pages_blocks_audio_player" CASCADE;
  DROP TABLE "pages_blocks_download_grid_downloads" CASCADE;
  DROP TABLE "pages_blocks_download_grid" CASCADE;
  DROP TABLE "pages_home_content_hero_slides" CASCADE;
  DROP TABLE "pages_home_content_where_is_mohanji" CASCADE;
  DROP TABLE "pages_home_content_activity_stats" CASCADE;
  DROP TABLE "pages_home_content_centres" CASCADE;
  DROP TABLE "pages_home_content_platforms" CASCADE;
  DROP TABLE "pages_wim_content_initiatives" CASCADE;
  DROP TABLE "pages_foundation_content_stats" CASCADE;
  DROP TABLE "pages_foundation_content_founded_platforms" CASCADE;
  DROP TABLE "pages_foundation_content_inspired_platforms" CASCADE;
  DROP TABLE "pages_foundation_content_pillars" CASCADE;
  DROP TABLE "pages_life_journey_content_chapters" CASCADE;
  DROP TABLE "pages_life_journey_content_stats" CASCADE;
  DROP TABLE "pages_council_content_purpose_points" CASCADE;
  DROP TABLE "pages_council_content_members" CASCADE;
  DROP TABLE "pages_council_content_regions" CASCADE;
  DROP TABLE "pages_council_content_how_it_works" CASCADE;
  DROP TABLE "pages_spaces_content_spaces" CASCADE;
  DROP TABLE "pages_golden_path_content_stages" CASCADE;
  DROP TABLE "pages_ambassador_content_events" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_banner" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_content" CASCADE;
  DROP TABLE "_pages_v_blocks_image_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_image_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_card_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion_items" CASCADE;
  DROP TABLE "_pages_v_blocks_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_video_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonial_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonial" CASCADE;
  DROP TABLE "_pages_v_blocks_donation_links_links" CASCADE;
  DROP TABLE "_pages_v_blocks_donation_links" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "_pages_v_blocks_event_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_posts_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_icon_list" CASCADE;
  DROP TABLE "_pages_v_blocks_social_icons_items" CASCADE;
  DROP TABLE "_pages_v_blocks_social_icons" CASCADE;
  DROP TABLE "_pages_v_blocks_divider" CASCADE;
  DROP TABLE "_pages_v_blocks_columns_layout_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_columns_layout" CASCADE;
  DROP TABLE "_pages_v_blocks_audio_player" CASCADE;
  DROP TABLE "_pages_v_blocks_download_grid_downloads" CASCADE;
  DROP TABLE "_pages_v_blocks_download_grid" CASCADE;
  DROP TABLE "_pages_v_version_home_content_hero_slides" CASCADE;
  DROP TABLE "_pages_v_version_home_content_where_is_mohanji" CASCADE;
  DROP TABLE "_pages_v_version_home_content_activity_stats" CASCADE;
  DROP TABLE "_pages_v_version_home_content_centres" CASCADE;
  DROP TABLE "_pages_v_version_home_content_platforms" CASCADE;
  DROP TABLE "_pages_v_version_wim_content_initiatives" CASCADE;
  DROP TABLE "_pages_v_version_foundation_content_stats" CASCADE;
  DROP TABLE "_pages_v_version_foundation_content_founded_platforms" CASCADE;
  DROP TABLE "_pages_v_version_foundation_content_inspired_platforms" CASCADE;
  DROP TABLE "_pages_v_version_foundation_content_pillars" CASCADE;
  DROP TABLE "_pages_v_version_life_journey_content_chapters" CASCADE;
  DROP TABLE "_pages_v_version_life_journey_content_stats" CASCADE;
  DROP TABLE "_pages_v_version_council_content_purpose_points" CASCADE;
  DROP TABLE "_pages_v_version_council_content_members" CASCADE;
  DROP TABLE "_pages_v_version_council_content_regions" CASCADE;
  DROP TABLE "_pages_v_version_council_content_how_it_works" CASCADE;
  DROP TABLE "_pages_v_version_spaces_content_spaces" CASCADE;
  DROP TABLE "_pages_v_version_golden_path_content_stages" CASCADE;
  DROP TABLE "_pages_v_version_ambassador_content_events" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "meditations_blocks_hero_banner" CASCADE;
  DROP TABLE "meditations_blocks_rich_content" CASCADE;
  DROP TABLE "meditations_blocks_image_gallery_images" CASCADE;
  DROP TABLE "meditations_blocks_image_gallery" CASCADE;
  DROP TABLE "meditations_blocks_call_to_action" CASCADE;
  DROP TABLE "meditations_blocks_card_grid_cards" CASCADE;
  DROP TABLE "meditations_blocks_card_grid" CASCADE;
  DROP TABLE "meditations_blocks_accordion_items" CASCADE;
  DROP TABLE "meditations_blocks_accordion" CASCADE;
  DROP TABLE "meditations_blocks_video_embed" CASCADE;
  DROP TABLE "meditations_blocks_testimonial_items" CASCADE;
  DROP TABLE "meditations_blocks_testimonial" CASCADE;
  DROP TABLE "meditations_blocks_donation_links_links" CASCADE;
  DROP TABLE "meditations_blocks_donation_links" CASCADE;
  DROP TABLE "meditations_blocks_contact_form" CASCADE;
  DROP TABLE "meditations_blocks_event_carousel" CASCADE;
  DROP TABLE "meditations_blocks_posts_grid" CASCADE;
  DROP TABLE "meditations_blocks_icon_list_items" CASCADE;
  DROP TABLE "meditations_blocks_icon_list" CASCADE;
  DROP TABLE "meditations_blocks_social_icons_items" CASCADE;
  DROP TABLE "meditations_blocks_social_icons" CASCADE;
  DROP TABLE "meditations_blocks_divider" CASCADE;
  DROP TABLE "meditations_blocks_columns_layout_columns" CASCADE;
  DROP TABLE "meditations_blocks_columns_layout" CASCADE;
  DROP TABLE "meditations_blocks_audio_player" CASCADE;
  DROP TABLE "meditations_blocks_download_grid_downloads" CASCADE;
  DROP TABLE "meditations_blocks_download_grid" CASCADE;
  DROP TABLE "meditations_downloads" CASCADE;
  DROP TABLE "meditations" CASCADE;
  DROP TABLE "practices_blocks_hero_banner" CASCADE;
  DROP TABLE "practices_blocks_rich_content" CASCADE;
  DROP TABLE "practices_blocks_image_gallery_images" CASCADE;
  DROP TABLE "practices_blocks_image_gallery" CASCADE;
  DROP TABLE "practices_blocks_call_to_action" CASCADE;
  DROP TABLE "practices_blocks_card_grid_cards" CASCADE;
  DROP TABLE "practices_blocks_card_grid" CASCADE;
  DROP TABLE "practices_blocks_accordion_items" CASCADE;
  DROP TABLE "practices_blocks_accordion" CASCADE;
  DROP TABLE "practices_blocks_video_embed" CASCADE;
  DROP TABLE "practices_blocks_testimonial_items" CASCADE;
  DROP TABLE "practices_blocks_testimonial" CASCADE;
  DROP TABLE "practices_blocks_donation_links_links" CASCADE;
  DROP TABLE "practices_blocks_donation_links" CASCADE;
  DROP TABLE "practices_blocks_contact_form" CASCADE;
  DROP TABLE "practices_blocks_event_carousel" CASCADE;
  DROP TABLE "practices_blocks_posts_grid" CASCADE;
  DROP TABLE "practices_blocks_icon_list_items" CASCADE;
  DROP TABLE "practices_blocks_icon_list" CASCADE;
  DROP TABLE "practices_blocks_social_icons_items" CASCADE;
  DROP TABLE "practices_blocks_social_icons" CASCADE;
  DROP TABLE "practices_blocks_divider" CASCADE;
  DROP TABLE "practices_blocks_columns_layout_columns" CASCADE;
  DROP TABLE "practices_blocks_columns_layout" CASCADE;
  DROP TABLE "practices_blocks_audio_player" CASCADE;
  DROP TABLE "practices_blocks_download_grid_downloads" CASCADE;
  DROP TABLE "practices_blocks_download_grid" CASCADE;
  DROP TABLE "practices" CASCADE;
  DROP TABLE "courses_blocks_hero_banner" CASCADE;
  DROP TABLE "courses_blocks_rich_content" CASCADE;
  DROP TABLE "courses_blocks_image_gallery_images" CASCADE;
  DROP TABLE "courses_blocks_image_gallery" CASCADE;
  DROP TABLE "courses_blocks_call_to_action" CASCADE;
  DROP TABLE "courses_blocks_card_grid_cards" CASCADE;
  DROP TABLE "courses_blocks_card_grid" CASCADE;
  DROP TABLE "courses_blocks_accordion_items" CASCADE;
  DROP TABLE "courses_blocks_accordion" CASCADE;
  DROP TABLE "courses_blocks_video_embed" CASCADE;
  DROP TABLE "courses_blocks_testimonial_items" CASCADE;
  DROP TABLE "courses_blocks_testimonial" CASCADE;
  DROP TABLE "courses_blocks_donation_links_links" CASCADE;
  DROP TABLE "courses_blocks_donation_links" CASCADE;
  DROP TABLE "courses_blocks_contact_form" CASCADE;
  DROP TABLE "courses_blocks_event_carousel" CASCADE;
  DROP TABLE "courses_blocks_posts_grid" CASCADE;
  DROP TABLE "courses_blocks_icon_list_items" CASCADE;
  DROP TABLE "courses_blocks_icon_list" CASCADE;
  DROP TABLE "courses_blocks_social_icons_items" CASCADE;
  DROP TABLE "courses_blocks_social_icons" CASCADE;
  DROP TABLE "courses_blocks_divider" CASCADE;
  DROP TABLE "courses_blocks_columns_layout_columns" CASCADE;
  DROP TABLE "courses_blocks_columns_layout" CASCADE;
  DROP TABLE "courses_blocks_audio_player" CASCADE;
  DROP TABLE "courses_blocks_download_grid_downloads" CASCADE;
  DROP TABLE "courses_blocks_download_grid" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "courses_rels" CASCADE;
  DROP TABLE "_courses_v_blocks_hero_banner" CASCADE;
  DROP TABLE "_courses_v_blocks_rich_content" CASCADE;
  DROP TABLE "_courses_v_blocks_image_gallery_images" CASCADE;
  DROP TABLE "_courses_v_blocks_image_gallery" CASCADE;
  DROP TABLE "_courses_v_blocks_call_to_action" CASCADE;
  DROP TABLE "_courses_v_blocks_card_grid_cards" CASCADE;
  DROP TABLE "_courses_v_blocks_card_grid" CASCADE;
  DROP TABLE "_courses_v_blocks_accordion_items" CASCADE;
  DROP TABLE "_courses_v_blocks_accordion" CASCADE;
  DROP TABLE "_courses_v_blocks_video_embed" CASCADE;
  DROP TABLE "_courses_v_blocks_testimonial_items" CASCADE;
  DROP TABLE "_courses_v_blocks_testimonial" CASCADE;
  DROP TABLE "_courses_v_blocks_donation_links_links" CASCADE;
  DROP TABLE "_courses_v_blocks_donation_links" CASCADE;
  DROP TABLE "_courses_v_blocks_contact_form" CASCADE;
  DROP TABLE "_courses_v_blocks_event_carousel" CASCADE;
  DROP TABLE "_courses_v_blocks_posts_grid" CASCADE;
  DROP TABLE "_courses_v_blocks_icon_list_items" CASCADE;
  DROP TABLE "_courses_v_blocks_icon_list" CASCADE;
  DROP TABLE "_courses_v_blocks_social_icons_items" CASCADE;
  DROP TABLE "_courses_v_blocks_social_icons" CASCADE;
  DROP TABLE "_courses_v_blocks_divider" CASCADE;
  DROP TABLE "_courses_v_blocks_columns_layout_columns" CASCADE;
  DROP TABLE "_courses_v_blocks_columns_layout" CASCADE;
  DROP TABLE "_courses_v_blocks_audio_player" CASCADE;
  DROP TABLE "_courses_v_blocks_download_grid_downloads" CASCADE;
  DROP TABLE "_courses_v_blocks_download_grid" CASCADE;
  DROP TABLE "_courses_v" CASCADE;
  DROP TABLE "_courses_v_rels" CASCADE;
  DROP TABLE "lessons_downloadables" CASCADE;
  DROP TABLE "lessons" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "books" CASCADE;
  DROP TABLE "audios" CASCADE;
  DROP TABLE "audios_rels" CASCADE;
  DROP TABLE "quotes" CASCADE;
  DROP TABLE "quotes_rels" CASCADE;
  DROP TABLE "awards" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "venues" CASCADE;
  DROP TABLE "forms_fields_options" CASCADE;
  DROP TABLE "forms_fields" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_children_sub_items" CASCADE;
  DROP TABLE "header_nav_items_children" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "site_settings_donation_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_blocks_hero_banner_overlay_style";
  DROP TYPE "public"."enum_pages_blocks_hero_banner_alignment";
  DROP TYPE "public"."enum_pages_blocks_rich_content_container_width";
  DROP TYPE "public"."enum_pages_blocks_image_gallery_layout";
  DROP TYPE "public"."enum_pages_blocks_image_gallery_columns";
  DROP TYPE "public"."enum_pages_blocks_call_to_action_style";
  DROP TYPE "public"."enum_pages_blocks_card_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_testimonial_layout";
  DROP TYPE "public"."enum_pages_blocks_event_carousel_filter";
  DROP TYPE "public"."enum_pages_blocks_posts_grid_post_type";
  DROP TYPE "public"."enum_pages_blocks_icon_list_layout";
  DROP TYPE "public"."enum_pages_blocks_social_icons_items_platform";
  DROP TYPE "public"."enum_pages_blocks_divider_style";
  DROP TYPE "public"."enum_pages_blocks_divider_spacing";
  DROP TYPE "public"."enum_pages_blocks_columns_layout_columns_width";
  DROP TYPE "public"."enum_pages_blocks_columns_layout_vertical_align";
  DROP TYPE "public"."enum_pages_wim_content_initiatives_category";
  DROP TYPE "public"."enum_pages_page_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_hero_banner_overlay_style";
  DROP TYPE "public"."enum__pages_v_blocks_hero_banner_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_rich_content_container_width";
  DROP TYPE "public"."enum__pages_v_blocks_image_gallery_layout";
  DROP TYPE "public"."enum__pages_v_blocks_image_gallery_columns";
  DROP TYPE "public"."enum__pages_v_blocks_call_to_action_style";
  DROP TYPE "public"."enum__pages_v_blocks_card_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_testimonial_layout";
  DROP TYPE "public"."enum__pages_v_blocks_event_carousel_filter";
  DROP TYPE "public"."enum__pages_v_blocks_posts_grid_post_type";
  DROP TYPE "public"."enum__pages_v_blocks_icon_list_layout";
  DROP TYPE "public"."enum__pages_v_blocks_social_icons_items_platform";
  DROP TYPE "public"."enum__pages_v_blocks_divider_style";
  DROP TYPE "public"."enum__pages_v_blocks_divider_spacing";
  DROP TYPE "public"."enum__pages_v_blocks_columns_layout_columns_width";
  DROP TYPE "public"."enum__pages_v_blocks_columns_layout_vertical_align";
  DROP TYPE "public"."enum__pages_v_version_wim_content_initiatives_category";
  DROP TYPE "public"."enum__pages_v_version_page_type";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_post_type";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_post_type";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_meditations_blocks_hero_banner_overlay_style";
  DROP TYPE "public"."enum_meditations_blocks_hero_banner_alignment";
  DROP TYPE "public"."enum_meditations_blocks_rich_content_container_width";
  DROP TYPE "public"."enum_meditations_blocks_image_gallery_layout";
  DROP TYPE "public"."enum_meditations_blocks_image_gallery_columns";
  DROP TYPE "public"."enum_meditations_blocks_call_to_action_style";
  DROP TYPE "public"."enum_meditations_blocks_card_grid_columns";
  DROP TYPE "public"."enum_meditations_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum_meditations_blocks_testimonial_layout";
  DROP TYPE "public"."enum_meditations_blocks_event_carousel_filter";
  DROP TYPE "public"."enum_meditations_blocks_posts_grid_post_type";
  DROP TYPE "public"."enum_meditations_blocks_icon_list_layout";
  DROP TYPE "public"."enum_meditations_blocks_social_icons_items_platform";
  DROP TYPE "public"."enum_meditations_blocks_divider_style";
  DROP TYPE "public"."enum_meditations_blocks_divider_spacing";
  DROP TYPE "public"."enum_meditations_blocks_columns_layout_columns_width";
  DROP TYPE "public"."enum_meditations_blocks_columns_layout_vertical_align";
  DROP TYPE "public"."enum_practices_blocks_hero_banner_overlay_style";
  DROP TYPE "public"."enum_practices_blocks_hero_banner_alignment";
  DROP TYPE "public"."enum_practices_blocks_rich_content_container_width";
  DROP TYPE "public"."enum_practices_blocks_image_gallery_layout";
  DROP TYPE "public"."enum_practices_blocks_image_gallery_columns";
  DROP TYPE "public"."enum_practices_blocks_call_to_action_style";
  DROP TYPE "public"."enum_practices_blocks_card_grid_columns";
  DROP TYPE "public"."enum_practices_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum_practices_blocks_testimonial_layout";
  DROP TYPE "public"."enum_practices_blocks_event_carousel_filter";
  DROP TYPE "public"."enum_practices_blocks_posts_grid_post_type";
  DROP TYPE "public"."enum_practices_blocks_icon_list_layout";
  DROP TYPE "public"."enum_practices_blocks_social_icons_items_platform";
  DROP TYPE "public"."enum_practices_blocks_divider_style";
  DROP TYPE "public"."enum_practices_blocks_divider_spacing";
  DROP TYPE "public"."enum_practices_blocks_columns_layout_columns_width";
  DROP TYPE "public"."enum_practices_blocks_columns_layout_vertical_align";
  DROP TYPE "public"."enum_courses_blocks_hero_banner_overlay_style";
  DROP TYPE "public"."enum_courses_blocks_hero_banner_alignment";
  DROP TYPE "public"."enum_courses_blocks_rich_content_container_width";
  DROP TYPE "public"."enum_courses_blocks_image_gallery_layout";
  DROP TYPE "public"."enum_courses_blocks_image_gallery_columns";
  DROP TYPE "public"."enum_courses_blocks_call_to_action_style";
  DROP TYPE "public"."enum_courses_blocks_card_grid_columns";
  DROP TYPE "public"."enum_courses_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum_courses_blocks_testimonial_layout";
  DROP TYPE "public"."enum_courses_blocks_event_carousel_filter";
  DROP TYPE "public"."enum_courses_blocks_posts_grid_post_type";
  DROP TYPE "public"."enum_courses_blocks_icon_list_layout";
  DROP TYPE "public"."enum_courses_blocks_social_icons_items_platform";
  DROP TYPE "public"."enum_courses_blocks_divider_style";
  DROP TYPE "public"."enum_courses_blocks_divider_spacing";
  DROP TYPE "public"."enum_courses_blocks_columns_layout_columns_width";
  DROP TYPE "public"."enum_courses_blocks_columns_layout_vertical_align";
  DROP TYPE "public"."enum_courses_level";
  DROP TYPE "public"."enum_courses_status";
  DROP TYPE "public"."enum__courses_v_blocks_hero_banner_overlay_style";
  DROP TYPE "public"."enum__courses_v_blocks_hero_banner_alignment";
  DROP TYPE "public"."enum__courses_v_blocks_rich_content_container_width";
  DROP TYPE "public"."enum__courses_v_blocks_image_gallery_layout";
  DROP TYPE "public"."enum__courses_v_blocks_image_gallery_columns";
  DROP TYPE "public"."enum__courses_v_blocks_call_to_action_style";
  DROP TYPE "public"."enum__courses_v_blocks_card_grid_columns";
  DROP TYPE "public"."enum__courses_v_blocks_video_embed_aspect_ratio";
  DROP TYPE "public"."enum__courses_v_blocks_testimonial_layout";
  DROP TYPE "public"."enum__courses_v_blocks_event_carousel_filter";
  DROP TYPE "public"."enum__courses_v_blocks_posts_grid_post_type";
  DROP TYPE "public"."enum__courses_v_blocks_icon_list_layout";
  DROP TYPE "public"."enum__courses_v_blocks_social_icons_items_platform";
  DROP TYPE "public"."enum__courses_v_blocks_divider_style";
  DROP TYPE "public"."enum__courses_v_blocks_divider_spacing";
  DROP TYPE "public"."enum__courses_v_blocks_columns_layout_columns_width";
  DROP TYPE "public"."enum__courses_v_blocks_columns_layout_vertical_align";
  DROP TYPE "public"."enum__courses_v_version_level";
  DROP TYPE "public"."enum__courses_v_version_status";
  DROP TYPE "public"."enum_lessons_status";
  DROP TYPE "public"."enum_events_event_type";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum_books_book_type";
  DROP TYPE "public"."enum_audios_audio_type";
  DROP TYPE "public"."enum_forms_fields_field_type";
  DROP TYPE "public"."enum_footer_social_links_platform";`)
}

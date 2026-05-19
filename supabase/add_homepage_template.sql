-- ⚙️ Database Migration: Add homepage_template to site_settings
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS homepage_template TEXT DEFAULT 'default';

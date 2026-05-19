-- SQL Schema for AZLABS CMS

-- 1. Services Table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT NOT NULL,
    title_vi TEXT NOT NULL,
    description_en TEXT,
    description_vi TEXT,
    image_url TEXT, -- Cloudinary URL
    features_en TEXT[],
    features_vi TEXT[],
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT NOT NULL,
    title_vi TEXT NOT NULL,
    category_en TEXT,
    category_vi TEXT,
    description_en TEXT,
    description_vi TEXT,
    details_en TEXT,
    details_vi TEXT,
    image_url TEXT, -- Cloudinary URL
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Features Table
CREATE TABLE IF NOT EXISTS features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT NOT NULL,
    title_vi TEXT NOT NULL,
    description_en TEXT,
    description_vi TEXT,
    image_url TEXT, -- Cloudinary URL
    order_index INTEGER DEFAULT 0
);

-- 4. Tech Stack Table
CREATE TABLE IF NOT EXISTS tech_stack (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL, -- For simpleicons or local icons
    logo_url TEXT, -- Optional Cloudinary override
    category TEXT, -- Frontend, Backend, etc.
    order_index INTEGER DEFAULT 0
);

-- 5. Posts Table (For Blog & SEO)
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    title_vi TEXT NOT NULL,
    excerpt_en TEXT,
    excerpt_vi TEXT,
    content_en TEXT, -- Rich text/HTML
    content_vi TEXT, -- Rich text/HTML
    image_url TEXT, -- Cloudinary URL
    
    -- SEO Metadata
    meta_title_en TEXT,
    meta_title_vi TEXT,
    meta_description_en TEXT,
    meta_description_vi TEXT,
    
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Contacts Table (For Form Submissions)
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- 'new', 'read', 'replied', 'archived'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Page Views (Analytics)
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Interaction Events (Analytics)
CREATE TABLE IF NOT EXISTS interaction_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_name TEXT NOT NULL,
  event_category TEXT,
  event_label TEXT,
  page_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
-- 9. Solutions Table
CREATE TABLE IF NOT EXISTS solutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT NOT NULL,
    title_vi TEXT NOT NULL,
    description_en TEXT,
    description_vi TEXT,
    icon TEXT,
    features_en TEXT[],
    features_vi TEXT[],
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Hero Slides Table
CREATE TABLE IF NOT EXISTS hero_slides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT NOT NULL,
    title_vi TEXT NOT NULL,
    subtitle_en TEXT,
    subtitle_vi TEXT,
    cta_text_en TEXT,
    cta_text_vi TEXT,
    cta_link TEXT,
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role_en TEXT,
    role_vi TEXT,
    content_en TEXT,
    content_vi TEXT,
    avatar_url TEXT,
    company_logo_url TEXT,
    rating INTEGER DEFAULT 5,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Media Table
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    url TEXT NOT NULL,
    filename TEXT,
    format TEXT,
    width INTEGER,
    height INTEGER,
    bytes INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. About Content Table
CREATE TABLE IF NOT EXISTS about_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT,
    title_vi TEXT,
    subtitle_en TEXT,
    subtitle_vi TEXT,
    description_en TEXT,
    description_vi TEXT,
    quote_en TEXT,
    quote_vi TEXT,
    image_url TEXT,
    stats JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_name TEXT DEFAULT 'AZLABS',
    logo_url TEXT,
    favicon_url TEXT,
    
    -- Contact Info
    phone TEXT,
    email TEXT,
    address_en TEXT,
    address_vi TEXT,
    working_hours_en TEXT,
    working_hours_vi TEXT,
    
    -- Social Links
    facebook_url TEXT,
    instagram_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    github_url TEXT,
    
    -- Footer/Global
    copyright_en TEXT,
    copyright_vi TEXT,
    
    -- Homepage Template Choice
    homepage_template TEXT DEFAULT 'default',
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read for about_content" ON about_content FOR SELECT USING (true);
CREATE POLICY "Allow public read for site_settings" ON site_settings FOR SELECT USING (true);

-- Allow admin full access
CREATE POLICY "Allow admin all about_content" ON about_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE interaction_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read for solutions" ON solutions FOR SELECT USING (true);
CREATE POLICY "Allow public read for hero_slides" ON hero_slides FOR SELECT USING (true);
CREATE POLICY "Allow public read for testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow public read for media" ON media FOR SELECT USING (true);

-- Allow public insert for tracking/forms
CREATE POLICY "Allow public insert for page_views" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert for interaction_events" ON interaction_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert for contacts" ON contacts FOR INSERT WITH CHECK (true);

-- Allow authenticated users full access (for admin dashboard)
CREATE POLICY "Allow admin all solutions" ON solutions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all hero_slides" ON hero_slides FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all media" ON media FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all features" ON features FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all tech_stack" ON tech_stack FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all posts" ON posts FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin read page_views" ON page_views FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin read interaction_events" ON interaction_events FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin read contacts" ON contacts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin update contacts" ON contacts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin delete contacts" ON contacts FOR DELETE USING (auth.role() = 'authenticated');

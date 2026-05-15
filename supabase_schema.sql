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
-- Enable RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE interaction_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for tracking/forms)
CREATE POLICY "Allow public insert for page_views" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert for interaction_events" ON interaction_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert for contacts" ON contacts FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read (for admin dashboard)
CREATE POLICY "Allow admin read page_views" ON page_views FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin read interaction_events" ON interaction_events FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin read contacts" ON contacts FOR SELECT USING (auth.role() = 'authenticated');

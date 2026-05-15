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

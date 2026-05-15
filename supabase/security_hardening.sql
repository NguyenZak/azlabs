-- 🛡️ SECURITY HARDENING: ADMIN LOGS & RLS POLICIES

-- 1. Create Admin Logs Table
CREATE TABLE IF NOT EXISTS admin_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    resource_type TEXT,
    resource_id TEXT,
    details JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on admin_logs
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Only super_admin can view logs
CREATE POLICY "Super admins can view all logs" 
ON admin_logs FOR SELECT 
USING (auth.jwt() ->> 'role' = 'super_admin');

-- System can insert logs (service_role)
CREATE POLICY "System can insert logs" 
ON admin_logs FOR INSERT 
WITH CHECK (true);


-- 🛡️ 2. ROW LEVEL SECURITY POLICIES FOR ALL TABLES

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'role' = 'super_admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 📝 Posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published posts" ON posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage posts" ON posts FOR ALL USING (is_admin());

-- 🏗️ Projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Admins can manage projects" ON projects FOR ALL USING (is_admin());

-- 🛠️ Services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view services" ON services FOR SELECT USING (true);
CREATE POLICY "Admins can manage services" ON services FOR ALL USING (is_admin());

-- 💡 Solutions
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view solutions" ON solutions FOR SELECT USING (true);
CREATE POLICY "Admins can manage solutions" ON solutions FOR ALL USING (is_admin());

-- 📺 Hero Slides
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view hero_slides" ON hero_slides FOR SELECT USING (true);
CREATE POLICY "Admins can manage hero_slides" ON hero_slides FOR ALL USING (is_admin());

-- 🌟 Testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL USING (is_admin());

-- 🖼️ Media
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view media" ON media FOR SELECT USING (true);
CREATE POLICY "Admins can manage media" ON media FOR ALL USING (is_admin());

-- ⚙️ Site Settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can update site_settings" ON site_settings FOR UPDATE USING (is_admin());

-- 📩 Contacts
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit contact form" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage contacts" ON contacts FOR ALL USING (is_admin());

-- 📊 Analytics (Page Views & Events)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "System can insert views" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view analytics" ON page_views FOR SELECT USING (is_admin());

ALTER TABLE interaction_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "System can insert events" ON interaction_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view events" ON interaction_events FOR SELECT USING (is_admin());

-- 👤 About Content
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view about" ON about_content FOR SELECT USING (true);
CREATE POLICY "Admins can update about" ON about_content FOR UPDATE USING (is_admin());

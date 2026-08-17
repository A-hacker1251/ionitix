-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('events', 'events', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
    ('faculty', 'faculty', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
    ('gallery', 'gallery', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
    ('announcements', 'announcements', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
    ('documents', 'documents', true, 10485760, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for public read access
CREATE POLICY "Public can read event images" ON storage.objects
    FOR SELECT USING (bucket_id = 'events');

CREATE POLICY "Public can read faculty images" ON storage.objects
    FOR SELECT USING (bucket_id = 'faculty');

CREATE POLICY "Public can read gallery images" ON storage.objects
    FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Public can read announcement images" ON storage.objects
    FOR SELECT USING (bucket_id = 'announcements');

CREATE POLICY "Public can read documents" ON storage.objects
    FOR SELECT USING (bucket_id = 'documents');

-- Storage policies for admin write access (using service role)
-- These will be enforced by the application using service role key
CREATE POLICY "Admins can upload event images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'events');

CREATE POLICY "Admins can update event images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'events');

CREATE POLICY "Admins can delete event images" ON storage.objects
    FOR DELETE USING (bucket_id = 'events');

CREATE POLICY "Admins can upload faculty images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'faculty');

CREATE POLICY "Admins can update faculty images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'faculty');

CREATE POLICY "Admins can delete faculty images" ON storage.objects
    FOR DELETE USING (bucket_id = 'faculty');

CREATE POLICY "Admins can upload gallery images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Admins can update gallery images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'gallery');

CREATE POLICY "Admins can delete gallery images" ON storage.objects
    FOR DELETE USING (bucket_id = 'gallery');

CREATE POLICY "Admins can upload announcement images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'announcements');

CREATE POLICY "Admins can update announcement images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'announcements');

CREATE POLICY "Admins can delete announcement images" ON storage.objects
    FOR DELETE USING (bucket_id = 'announcements');

CREATE POLICY "Admins can upload documents" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Admins can update documents" ON storage.objects
    FOR UPDATE USING (bucket_id = 'documents');

CREATE POLICY "Admins can delete documents" ON storage.objects
    FOR DELETE USING (bucket_id = 'documents');
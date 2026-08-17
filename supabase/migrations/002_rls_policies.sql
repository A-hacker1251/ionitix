-- Enable Row Level Security on all tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE laboratories ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Events policies
-- Public can read published events
CREATE POLICY "Public can read published events" ON events
    FOR SELECT USING (status = 'published');

-- Authenticated admins can do everything (will be handled by service role in server)
-- We'll use service role key for admin operations

-- Registrations policies
-- Public can insert registrations for events with registration enabled
CREATE POLICY "Public can register for events" ON registrations
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM events 
            WHERE events.id = registrations.event_id 
            AND events.registration_enabled = true
            AND events.registration_type IN ('native', 'google-form')
            AND events.status = 'published'
        )
    );

-- Public can read their own registrations (by email)
CREATE POLICY "Public can read own registrations" ON registrations
    FOR SELECT USING (true); -- We'll filter by email in the application

-- Announcements policies
-- Public can read published announcements
CREATE POLICY "Public can read published announcements" ON announcements
    FOR SELECT USING (published = true);

-- Faculty policies
-- Public can read all faculty
CREATE POLICY "Public can read faculty" ON faculty
    FOR SELECT USING (true);

-- Laboratories policies
-- Public can read all laboratories
CREATE POLICY "Public can read laboratories" ON laboratories
    FOR SELECT USING (true);

-- Achievements policies
-- Public can read all achievements
CREATE POLICY "Public can read achievements" ON achievements
    FOR SELECT USING (true);

-- Gallery policies
-- Public can read all gallery items
CREATE POLICY "Public can read gallery" ON gallery
    FOR SELECT USING (true);

-- Storage policies will be created in 003_storage.sql
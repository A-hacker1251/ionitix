-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    short_description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('workshop', 'hackathon', 'seminar', 'competition', 'conference', 'other')),
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    venue TEXT NOT NULL,
    organizer TEXT NOT NULL,
    speaker TEXT,
    banner_image TEXT,
    event_gallery TEXT[] DEFAULT '{}',
    registration_enabled BOOLEAN DEFAULT true,
    registration_type TEXT NOT NULL DEFAULT 'none' CHECK (registration_type IN ('google-form', 'native', 'external', 'none')),
    registration_url TEXT,
    google_form_url TEXT,
    registration_display_mode TEXT NOT NULL DEFAULT 'button' CHECK (registration_display_mode IN ('button', 'embedded')),
    registration_deadline DATE,
    contact_email TEXT,
    contact_phone TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Registrations table
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    usn TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    semester TEXT NOT NULL,
    section TEXT NOT NULL,
    college TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Announcements table
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    image TEXT,
    attachment_url TEXT,
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Faculty table
CREATE TABLE faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    qualification TEXT NOT NULL,
    specialization TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    profile_image TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Laboratories table
CREATE TABLE laboratories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    equipment TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Achievements table
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('student', 'faculty', 'research', 'competition', 'certification', 'award', 'other')),
    image TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery table
CREATE TABLE gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('events', 'workshops', 'achievements', 'faculty', 'labs', 'other')),
    event_id UUID REFERENCES events(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better query performance
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_event_date ON events(event_date);
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_registrations_event_id ON registrations(event_id);
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_announcements_published ON announcements(published);
CREATE INDEX idx_announcements_published_at ON announcements(published_at);
CREATE INDEX idx_announcements_slug ON announcements(slug);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_gallery_event_id ON gallery(event_id);
CREATE INDEX idx_faculty_email ON faculty(email);
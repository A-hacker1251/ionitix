"use client"

import { useState } from "react"
import { Search, User, Mail, Phone, GraduationCap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Link from "next/link"
import { Faculty } from "@/types"

interface FacultyClientProps {
  initialFaculty: Faculty[]
}

export function FacultyClient({ initialFaculty }: FacultyClientProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFaculty = initialFaculty.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background relative">
      {/* Subtle IoT network background */}
      <div className="iot-network" aria-hidden="true" />
      <section className="section-padding hero-gradient relative z-10">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <Badge variant="secondary" className="text-sm px-3 py-1 border border-primary/20">
                <GraduationCap className="h-3 w-3 mr-1" />
                Our Team
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-heading mb-4"
            >
              Faculty Members
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-subheading mx-auto"
            >
              Meet our distinguished faculty members who are dedicated to excellence in teaching, research, and innovation.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="section-padding section-gradient">
        <div className="container-custom">
          <div className="mb-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search faculty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="faculty-search"
                className="pl-10"
              />
            </div>
          </div>

          {filteredFaculty.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="faculty-grid">
              {filteredFaculty.map((member, index) => (
                <motion.article
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FacultyCard member={member} />
                </motion.article>
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </div>
  )
}

function FacultyCard({ member }: { member: Faculty }) {
  return (
    <Link href={`/faculty/${member.id}`} className="block">
      <Card className="glass-card hover:shadow-xl transition-all duration-300 h-full group border border-[hsl(276_30%_20%_/_0.3)] light-sweep relative overflow-hidden">
        <CardContent className="p-6 text-center">
          <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-secondary ring-2 ring-primary/20">
            {member.profile_image ? (
              <img
                src={member.profile_image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-3xl font-bold text-muted-foreground">
                  {member.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
            )}
          </div>
          <h3 className="font-heading font-semibold text-lg mb-1">{member.name}</h3>
          <p className="text-primary text-sm font-medium mb-2">{member.designation}</p>
          <p className="text-muted-foreground text-sm mb-3">{member.specialization}</p>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-3.5 w-3.5" />
              <span className="truncate">{member.email}</span>
            </div>
            {member.phone && (
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-3.5 w-3.5" />
                <span>{member.phone}</span>
              </div>
            )}
            <div className="flex items-center justify-center gap-2">
              <GraduationCap className="h-3.5 w-3.5" />
              <span>{member.qualification}</span>
            </div>
          </div>
          {member.bio && (
            <p className="text-sm text-muted-foreground mt-4 line-clamp-2">{member.bio}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <User className="h-16 w-16 mx-auto text-primary/30 mb-4" />
      <h3 className="text-xl font-semibold mb-2">No Faculty Members</h3>
      <p className="text-muted-foreground">Faculty directory will be populated soon.</p>
    </div>
  )
}
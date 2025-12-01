"use client";

import { useState } from "react";
import Link from "next/link";

import { ProjectCard } from "@/components/library/ProjectCard";
import { projects as allProjects, parseDate } from "@/lib/projects";

export function ProjectGrid() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const projects = allProjects
    .filter((project) => !project.draft)
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));

  return (
    <section
      id="work"
      className="min-h-screen snap-section px-6 md:px-12 lg:px-[40px] py-20 md:py-32 grid-overlay scroll-mt-[-150px]"
    >
      {/* Header */}
      <div className="mb-12 md:mb-16">
        <div
          className="text-[#00CE93] uppercase tracking-wider text-xs md:text-sm mb-4 label-glow"
          style={{ fontFamily: "Space Mono, monospace" }}
        >
          Selected work
        </div>
        <h2 className="text-[#EDEDED] text-3xl md:text-4xl lg:text-5xl">
          Projects
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
        {projects.map((project) => {
          const year = project.date ? project.date.slice(0, 4) : "";
          const role = project.tags;
          const isHovered = hoveredSlug === project.slug;

          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block h-full"
            >
              <ProjectCard
                title={project.title}
                role={role}
                year={year}
                image={project.cardImage ?? project.cover}
                isHovered={isHovered}
                onMouseEnter={() => setHoveredSlug(project.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

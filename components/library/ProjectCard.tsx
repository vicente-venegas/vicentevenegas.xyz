/**
 * ProjectCard Component
 *
 * Project card with image, hover effects, and metadata.
 * On hover:
 * - Image scales up slightly
 * - Image darkens + goes grayscale
 * - Gradient "map" overlay fades in with blend mode
 *
 * Usage:
 * <ProjectCard
 *   title="Neural Interface System"
 *   role="Product Design, Development"
 *   year="2025"
 *   image="image-url"
 *   onClick={() => handleClick(id)}
 *   className="optional-extra-classes"
 * />
 */

import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ProjectCardProps {
  title: string;
  role: string;
  year: string;
  image: string;
  onClick?: () => void;
  className?: string;
  isHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function ProjectCard({
  title,
  role,
  year,
  image,
  onClick,
  className = "",
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) {
  const imageStateClasses = isHovered ? "scale-[1.02] grayscale brightness-75" : "";
  const overlayStateClasses = isHovered ? "opacity-60" : "";
  const tags = role.split(",").map((tag) => tag.trim());
  const truncatedRole = tags.length > 1 ? `${tags[0]}...` : role;

  return (
    <div
      className={`group relative cursor-pointer border border-border hover:border-[color:var(--vv-accent)] transition-all duration-300 hover:shadow-[0_0_20px_color-mix(in_srgb,var(--vv-accent)_35%,transparent)] ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Image + gradient map overlay */}
      <div className="relative aspect-[4/3] overflow-hidden bg-transparent">
        <ImageWithFallback
          src={image}
          alt={title}
          className={`w-full h-full object-cover filter transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale group-hover:brightness-75 rounded-none ${imageStateClasses}`}
        />

        {/* Color overlay */}
        <div
          className={`pointer-events-none absolute inset-0 bg-[color:var(--vv-accent)] mix-blend-screen opacity-0 group-hover:opacity-60 transition-opacity duration-500 ${overlayStateClasses}`}
        />
      </div>

      {/* Text / meta */}
      <div className="p-4 font-mono">
        <h3 className="text-[#EDEDED] mb-1 text-base md:text-lg group-hover:text-[color:var(--vv-accent)] transition-colors duration-300">
          {title}
        </h3>
        <div className="flex items-center gap-3 text-[#B3B3B3] text-xs md:text-sm flex-wrap">
          <span className="md:hidden lg:inline">{role}</span>
          <span className="hidden md:inline lg:hidden">{truncatedRole}</span>
          <span className="text-[color:var(--vv-accent)]">•</span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  );
}

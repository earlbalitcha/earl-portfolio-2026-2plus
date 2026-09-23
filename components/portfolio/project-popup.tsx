"use client";

import {useEffect, useRef} from "react";
import Image from "next/image";
import {X, ExternalLink} from "lucide-react";
import type {PortfolioItem} from "@/utils/csv-parser";

interface ProjectPopupProps {
  project: PortfolioItem | null;
  onClose: () => void;
}

export default function ProjectPopup({project, onClose}: ProjectPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add event listener for escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add event listener for clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    // Prevent body scrolling when modal is open
    if (project) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscKey);
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Create a simplified HTML version of the content without relying on prose classes
  const createSimpleContent = () => {
    // Basic sanitization - remove script tags
    const sanitized = project.content.replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );

    return sanitized;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        ref={popupRef}
        className="card w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-muted hover:bg-accent text-foreground p-2 rounded-full transition-colors z-10"
            aria-label="Close popup">
            <X className="h-5 w-5" />
          </button>

          <div className="bg-muted rounded-xl p-6 mb-6 flex items-center justify-center">
            <Image
              src={
                project.mainImage ||
                "/placeholder.svg?height=600&width=800&query=project"
              }
              alt={project.title}
              width={800}
              height={400}
              className="max-w-full h-auto object-contain max-h-[400px]"
            />
          </div>

          <div className="flex items-center gap-4 mb-6">
            {project.logo && (
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center p-2">
                <Image
                  src={project.logo || "/placeholder.svg"}
                  alt={`${project.title} logo`}
                  width={48}
                  height={48}
                  className="max-w-full h-auto object-contain"
                />
              </div>
            )}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                {project.title}
              </h2>
              <p className="text-muted-foreground">
                {project.shortDescription}
              </p>
            </div>
          </div>

          <div className="custom-content text-muted-foreground space-y-4">
            <div dangerouslySetInnerHTML={{__html: createSimpleContent()}} />
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-all text-sm font-medium shadow-sm">
                Visit Project
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

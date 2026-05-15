import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface SafeHtmlProps {
  html: string;
  className?: string;
  tag?: 'div' | 'section' | 'article';
}

/**
 * 🛡️ SafeHtml Component
 * Prevents XSS by sanitizing HTML content from untrusted sources (CMS, User Input).
 */
export default function SafeHtml({ html, className, tag: Tag = 'div' }: SafeHtmlProps) {
  const sanitizedContent = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'code', 'pre', 'span'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 'src', 'alt', 'width', 'height', 'class', 'id'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|tel|data):|[^&#\/\\\?][^&?\/\\\?]*$|#)/i, // Chặn javascript:
  });

  return (
    <Tag 
      className={className} 
      dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
    />
  );
}

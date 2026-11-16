import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt || 'SIDEMACA'}
        className={`flex flex-col items-center justify-center bg-[#f3f5f7] p-4 text-center text-[#495057] ${className}`}
      >
        <ImageOff className="mb-1.5 h-6 w-6 text-[#003485]/60" />
        <span className="text-xs font-medium">{alt || 'SIDEMACA'}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...rest}
    />
  );
};

import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help"
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 w-64 p-2 text-xs text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-6 transform -translate-y-full">
          <div className="relative">
            {content}
            {/* Arrow */}
            <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1 left-2"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;

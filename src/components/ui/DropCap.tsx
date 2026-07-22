import React from 'react';

const DropCap: React.FC<{ children: string; accent?: boolean; className?: string }> = ({ children, accent = false, className = '' }) => {
  const firstChar = children.charAt(0);
  const rest = children.slice(1);
  return (
    <p className={`text-[17px] leading-[1.9] text-ink ${className}`}>
      <span className={`float-right text-[4.2rem] leading-[0.8] font-black ml-3 mt-1 ${accent ? 'text-accent' : 'text-ink'} select-none`} style={{ fontWeight: 900 }}>
        {firstChar}
      </span>
      {rest}
    </p>
  );
};

export default DropCap;

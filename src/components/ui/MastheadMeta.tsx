import React from 'react';
import Rule from './Rule';

interface Props {
  edition?: string;
  date?: string;
}

const MastheadMeta: React.FC<Props> = ({
  edition = "دوره سوم · شماره ۲۵ · بخش پوشاک",
  date = "شنبه، ۲۸ تیر ۱۴۰۴ · تهران",
}) => {
  return (
    <div className="w-full border-y border-border-paper py-2 flex flex-wrap items-center justify-between gap-2 text-[11px] tracking-[0.12em] font-bold text-muted uppercase">
      <span>{edition}</span>
      <div className="flex items-center gap-3">
        <span>{date}</span>
      </div>
    </div>
  );
};

export default MastheadMeta;

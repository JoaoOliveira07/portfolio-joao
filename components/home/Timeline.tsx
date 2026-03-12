'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { experience as experiencePt } from '@/data/experience/pt';
import { experience as experienceEn } from '@/data/experience/en';
import { Lock, Unlock } from 'lucide-react';

const GREEN = '#5CE1A7';
const GREEN_DARK = '#01926D';
const GREEN_LIGHT = '#E6FFF5';
const GREEN_BORDER = '#C2F5E2';
const GREEN_SOFT = '#C2F5E2';
const TEXT_MAIN = '#111827';
const TEXT_MUTED = '#6b7280';
const TEXT_LIGHT = '#9ca3af';

export function Timeline() {
  const locale = useLocale();
  const experience = locale === 'pt' ? experiencePt : experienceEn;
  const t = useTranslations('about');

  const [hovered, setHovered] = useState<number | null>(null);
  // Encontra o índice do Mid-Level no array original
  const midLevelIndex = experience.positions.findIndex(p => 
    p.title.includes("Mid-Level") || p.title.includes("Mid Level")
  );
  // Como vamos inverter o array, calculamos o índice correspondente na timeline invertida
  const reversedMidLevelIndex = experience.positions.length - 1 - midLevelIndex;
  const [selected, setSelected] = useState<number | null>(reversedMidLevelIndex);

  // Inverte para mostrar cronologicamente (do passado para o presente)
  const timelineData = [...experience.positions].reverse().map((pos, index) => ({
    id: index,
    period: pos.period,
    shortYear: pos.period.split(' - ')[0].trim(),
    title: pos.title,
    duration: pos.period.includes('(')
      ? pos.period.split('(')[1].split(')')[0].trim()
      : '',
    skills: pos.techStack,
    description: pos.description,
    details: pos.responsibilities,
    isCurrent:
      pos.period.toLowerCase().includes('present') ||
      pos.period.toLowerCase().includes('atual'),
    isLocked: pos.isLocked || false,
  }));

  const active = selected ?? hovered;
  const activeExp = timelineData.find((e) => e.id === active);

  const totalYears =
    timelineData.length > 0
      ? `${timelineData[timelineData.length - 1].shortYear} – ${locale === 'pt' ? 'Presente' : 'Present'}`
      : '';

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-8">
        <p
          className="text-[11px] tracking-[0.25em] uppercase mb-2 font-semibold"
          style={{ color: GREEN_DARK }}
        >
          {t('experience')}
        </p>
      </div>

      {/* Timeline — single grid so labels align exactly with dots */}
      <div className="w-full max-w-[900px] mx-auto">
        {/*
          Each column = one timeline position.
          Row 1: top label (even indexes)
          Row 2: dot + track line
          Row 3: bottom label (odd indexes)
        */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${timelineData.length}, 1fr)`,
          }}
        >
          {/* ── ROW 1: top labels (even) ── */}
          {timelineData.map((exp, i) => {
            const isActive = active === exp.id;
            const show = i % 2 === 0;
            return (
              <div
                key={`top-${exp.id}`}
                className="flex flex-col items-center justify-end pb-4 cursor-pointer"
                style={{ minHeight: 108, visibility: show ? 'visible' : 'hidden' }}
                onMouseEnter={() => setHovered(exp.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(selected === exp.id ? null : exp.id)}
              >
                <span
                  className="inline-block text-[10px] tracking-[0.14em] uppercase font-bold px-2 py-0.5 rounded-full mb-1 transition-all duration-200"
                  style={{
                    background: isActive && !exp.isLocked ? GREEN_SOFT : 'transparent',
                    color: exp.isLocked ? '#9ca3af' : (isActive ? GREEN_DARK : TEXT_LIGHT),
                    border: `1px solid ${exp.isLocked ? '#d1d5db' : (isActive ? GREEN_BORDER : 'transparent')}`,
                  }}
                >
                  {exp.shortYear}
                </span>
                <span
                  className="text-[11px] font-semibold text-center transition-colors duration-200"
                  style={{ 
                    color: exp.isLocked ? '#9ca3af' : (isActive ? TEXT_MAIN : TEXT_MUTED), 
                    maxWidth: 120,
                    lineHeight: '1.2',
                    minHeight: 36,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {exp.title}
                </span>
                {exp.duration && (
                  <span
                    className="text-[10px] mt-1 text-center"
                    style={{ color: exp.isLocked ? '#9ca3af' : (isActive ? GREEN_DARK : TEXT_LIGHT) }}
                  >
                    {exp.duration}
                  </span>
                )}
              </div>
            );
          })}

          {/* ── ROW 2: track line + dots ── */}
          {timelineData.map((exp, i) => {
            const isActive = active === exp.id;
            const isFirst = i === 0;
            const isLast = i === timelineData.length - 1;
            return (
              <div
                key={`dot-${exp.id}`}
                className="relative flex items-center justify-center h-8 cursor-pointer"
                onMouseEnter={() => setHovered(exp.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(selected === exp.id ? null : exp.id)}
              >
                {/* Left segment of track line */}
                {!isFirst && (
                  <div
                    className="absolute h-px"
                    style={{
                      background: exp.isLocked ? '#d1d5db' : GREEN_BORDER,
                      left: 0,
                      right: '50%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  />
                )}
                {/* Right segment of track line */}
                {!isLast && (
                  <div
                    className="absolute h-px"
                    style={{
                      background: timelineData[i + 1]?.isLocked ? '#d1d5db' : GREEN_BORDER,
                      left: '50%',
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  />
                )}

                {/* Pulse ring for current */}
                {exp.isCurrent && (
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 36,
                      height: 36,
                      border: `1.5px solid ${GREEN}`,
                      opacity: 0.5,
                      animation: 'pulse 2s ease-in-out infinite',
                    }}
                  />
                )}
                {/* Hover ring */}
                {isActive && (
                  <div
                    className="absolute rounded-full transition-all duration-200"
                    style={{ width: 32, height: 32, background: GREEN_SOFT }}
                  />
                )}
                {/* Dot with lock icon */}
                <div
                  className="rounded-full transition-all duration-200 ease-in-out relative z-10 flex items-center justify-center"
                  style={{
                    width: isActive ? 24 : 20,
                    height: isActive ? 24 : 20,
                    background: exp.isLocked ? '#e5e7eb' : (isActive ? GREEN : '#fff'),
                    border: `2px solid ${exp.isLocked ? '#9ca3af' : (isActive ? GREEN : GREEN_BORDER)}`,
                    opacity: exp.isLocked ? 0.8 : 1,
                  }}
                >
                  {exp.isLocked ? (
                    <Lock className="w-3 h-3" style={{ color: '#9ca3af' }} strokeWidth={3} />
                  ) : (
                    <Unlock className="w-3 h-3" style={{ color: exp.isCurrent ? GREEN_DARK : '#6b7280' }} strokeWidth={3} />
                  )}
                </div>
              </div>
            );
          })}

          {/* ── ROW 3: bottom labels (odd) ── */}
          {timelineData.map((exp, i) => {
            const isActive = active === exp.id;
            const show = i % 2 !== 0;
            return (
              <div
                key={`bot-${exp.id}`}
                className="flex flex-col items-center justify-start pt-4 cursor-pointer"
                style={{ minHeight: 108, visibility: show ? 'visible' : 'hidden' }}
                onMouseEnter={() => setHovered(exp.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(selected === exp.id ? null : exp.id)}
              >
                <span
                  className="inline-block text-[10px] tracking-[0.14em] uppercase font-bold px-2 py-0.5 rounded-full mb-1 transition-all duration-200"
                  style={{
                    background: isActive && !exp.isLocked ? GREEN_SOFT : 'transparent',
                    color: exp.isLocked ? '#9ca3af' : (isActive ? GREEN_DARK : TEXT_LIGHT),
                    border: `1px solid ${exp.isLocked ? '#d1d5db' : (isActive ? GREEN_BORDER : 'transparent')}`,
                  }}
                >
                  {exp.shortYear}
                </span>
                <span
                  className="text-[11px] font-semibold text-center transition-colors duration-200"
                  style={{ 
                    color: exp.isLocked ? '#9ca3af' : (isActive ? TEXT_MAIN : TEXT_MUTED), 
                    maxWidth: 120,
                    lineHeight: '1.2',
                    minHeight: 36,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {exp.title}
                </span>
                {exp.duration && (
                  <span
                    className="text-[10px] mt-1 text-center"
                    style={{ color: isActive ? GREEN_DARK : TEXT_LIGHT }}
                  >
                    {exp.duration}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail card - Compacto */}
      <div className="w-full max-w-[660px] mx-auto mt-8">
        {activeExp ? (
          <div
            key={activeExp.id}
            className="rounded-xl overflow-hidden"
            style={{
              background: activeExp.isLocked ? '#f3f4f6' : GREEN_LIGHT,
              border: `1px solid ${activeExp.isLocked ? '#d1d5db' : GREEN_BORDER}`,
              animation: 'fadeIn 0.2s ease',
            }}
          >
            {/* Card header */}
            <div className="px-4 py-3 flex justify-between items-center" style={{ borderBottom: `1px solid ${activeExp.isLocked ? '#d1d5db' : GREEN_BORDER}` }}>
              <div>
                <p className="text-[10px] font-bold tracking-[0.14em] uppercase mb-0.5" style={{ color: activeExp.isLocked ? '#9ca3af' : GREEN_DARK }}>
                  {activeExp.period}
                </p>
                <h3 className="text-[14px] font-bold leading-tight" style={{ color: activeExp.isLocked ? '#6b7280' : TEXT_MAIN }}>
                  {activeExp.title}
                </h3>
              </div>
              {activeExp.isCurrent && !activeExp.isLocked && (
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: GREEN_SOFT, color: '#017A5C' }}>
                  ● Atual
                </span>
              )}
              {activeExp.isLocked && (
                <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: '#f3f4f6', color: '#6b7280' }}>
                  <Lock className="w-3 h-3" />
                  Em breve
                </span>
              )}
            </div>

            {/* Card body */}
            <div className="px-4 py-3 space-y-3">
              <p className="text-xs leading-relaxed" style={{ color: activeExp.isLocked ? '#9ca3af' : TEXT_MUTED }}>
                {activeExp.description}
              </p>

              {/* Responsibilities (max 3 items) */}
              <div className="space-y-1.5">
                {activeExp.details.slice(0, 3).map((d, i) => (
                  <div key={i} className="flex gap-2 items-start text-xs" style={{ color: activeExp.isLocked ? '#6b7280' : TEXT_MAIN }}>
                    <span className={activeExp.isLocked ? 'text-[#9ca3af] mt-0.5' : 'text-[#5CE1A7] mt-0.5'}>•</span>
                    <span>{d}</span>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1 pt-1">
                {activeExp.skills.map((s, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded" style={{ 
                    background: activeExp.isLocked ? '#f9fafb' : '#fff', 
                    color: activeExp.isLocked ? '#9ca3af' : GREEN_DARK, 
                    border: `1px solid ${activeExp.isLocked ? '#e5e7eb' : GREEN_BORDER}` 
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center gap-2 h-[140px] text-sm rounded-2xl cursor-pointer border-2 border-dashed transition-colors duration-200"
            style={{ color: TEXT_LIGHT, borderColor: GREEN_BORDER }}
            onClick={() => setSelected(0)}
          >
            <span className="text-2xl" style={{ color: GREEN_BORDER }}>↑</span>
            <span>
              {locale === 'pt'
                ? 'Passe o mouse ou clique em uma posição'
                : 'Hover or click on a TIMELINE position'}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <p
        className="mt-8 text-center text-[11px] tracking-[0.15em] uppercase"
        style={{ color: TEXT_LIGHT }}
      >
        {timelineData.length} {locale === 'pt' ? 'posições' : 'positions'} · {totalYears}
      </p>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1);   opacity: 0.5; }
          50%       { transform: scale(1.9); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
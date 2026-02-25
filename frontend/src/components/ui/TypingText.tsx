import { useState, useEffect } from 'react';

interface TypingTextProps {
  texts: string[];
  speed?: number;
  pause?: number;
  className?: string;
}

export default function TypingText({ texts, speed = 60, pause = 2000, className = '' }: TypingTextProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    const current = texts[textIndex];

    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    }

    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex > 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      }, speed / 2);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setTextIndex(i => (i + 1) % texts.length);
    }
  }, [charIndex, deleting, textIndex, texts, speed, pause]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  );
}

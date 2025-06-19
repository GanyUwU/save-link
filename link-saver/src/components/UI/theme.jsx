import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext);
  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded focus:outline-none"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}
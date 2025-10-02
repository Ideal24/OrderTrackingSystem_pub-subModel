// src/components/Button.tsx

interface ButtonProps {
  text: string;
  onClick?: () => void;
  color?: string; // e.g., "blue", "green"
}

const Button = ({ text, onClick, color = "blue" }: ButtonProps) => {
  const bg = `bg-${color}-600`;
  const hover = `hover:bg-${color}-700`;

  return (
    <button
      onClick={onClick}
      className={`${bg} text-white px-4 py-2 rounded ${hover} transition`}
    >
      {text}
    </button>
  );
};

export default Button;

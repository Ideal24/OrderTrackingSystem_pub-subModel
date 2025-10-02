// src/components/Card.tsx

interface CardProps {
  title: string;
  value: string | number;
}

const Card = ({ title, value }: CardProps) => {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition">
      <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
};

export default Card;

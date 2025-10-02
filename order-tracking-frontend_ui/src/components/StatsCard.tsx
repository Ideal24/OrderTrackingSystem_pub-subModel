// src/components/StatsCard.tsx
import Card from "./Card";

interface StatsCardProps {
  title: string;
  value: string | number;
}

const StatsCard = ({ title, value }: StatsCardProps) => (
  <Card title={title} value={value} />
);

export default StatsCard;

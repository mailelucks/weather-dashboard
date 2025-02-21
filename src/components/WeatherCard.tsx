// src/components/WeatherSummaryCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';

interface WeatherCardProps {
  title?: string;
  content: React.ReactNode;
}

function formatCamelCaseString(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const WeatherSummaryCard = ({ title, content }: WeatherCardProps) => {
  return (
    <Card className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-900">
      {title && (
        <CardHeader>
          <CardTitle className="text-l">
            {formatCamelCaseString(title)}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={`${!title ? 'pt-6' : ''}`}>
        {content}
      </CardContent>
    </Card>
  );
};

export default WeatherSummaryCard;

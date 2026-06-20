import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  size?: number;
}

const StarRating = ({ rating, size = 18 }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          name="Star"
          size={size}
          className={cn(
            i <= rating ? 'text-secondary fill-secondary' : 'text-muted fill-muted'
          )}
        />
      ))}
    </div>
  );
};

export default StarRating;

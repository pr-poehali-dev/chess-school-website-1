import { Review } from '@/data/school';
import StarRating from '@/components/StarRating';
import Icon from '@/components/ui/icon';

interface ReviewCardProps {
  review: Review;
  delay?: number;
}

const ReviewCard = ({ review, delay = 0 }: ReviewCardProps) => {
  const initial = review.author.charAt(0).toUpperCase();

  return (
    <div
      className="glow-card rounded-3xl bg-card border border-border p-6 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-full gradient-hero text-white font-bold text-lg font-display shrink-0">
          {initial}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-foreground truncate">{review.author}</p>
          <p className="text-xs text-muted-foreground">{review.date}</p>
        </div>
        <Icon name="Quote" size={28} className="text-muted ml-auto shrink-0" />
      </div>

      <div className="mt-4">
        <StarRating rating={review.rating} />
      </div>

      <p className="text-foreground/80 mt-3 leading-relaxed">{review.text}</p>
    </div>
  );
};

export default ReviewCard;

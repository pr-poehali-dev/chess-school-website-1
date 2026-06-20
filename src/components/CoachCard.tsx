import { Coach } from '@/data/school';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface CoachCardProps {
  coach: Coach;
  inCart: boolean;
  onToggle: (coach: Coach) => void;
  delay?: number;
}

const CoachCard = ({ coach, inCart, onToggle, delay = 0 }: CoachCardProps) => {
  return (
    <div
      className="glow-card group relative rounded-3xl bg-card border border-border overflow-hidden animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={coach.image}
          alt={coach.name}
          className="w-full h-80 object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-3 py-1.5 shadow-lg">
          <Icon name="Star" size={16} className="text-secondary fill-secondary" />
          <span className="font-bold text-sm text-foreground">{coach.rating}</span>
        </div>
        {inCart && (
          <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 shadow-lg animate-pop-in">
            <Icon name="Check" size={16} className="text-white" />
            <span className="font-bold text-sm text-white">В заказе</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-extrabold font-display text-foreground">{coach.name}</h3>
        <p className="text-sm text-primary font-semibold mt-1">{coach.title}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {coach.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{coach.bio}</p>

        <div className="flex items-center gap-2 mt-4 text-muted-foreground text-sm">
          <Icon name="Users" size={16} />
          <span>{coach.students} учеников</span>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div>
            <span className="text-3xl font-extrabold font-display gradient-text">
              {coach.price.toLocaleString('ru-RU')} ₽
            </span>
            <span className="text-sm text-muted-foreground"> / мес</span>
          </div>
        </div>

        <Button
          onClick={() => onToggle(coach)}
          size="lg"
          className={cn(
            'w-full mt-5 rounded-2xl text-base font-bold h-13 py-6 transition-all',
            inCart
              ? 'bg-muted text-foreground hover:bg-destructive hover:text-white'
              : 'bg-primary text-white hover:opacity-90'
          )}
        >
          <Icon name={inCart ? 'Trash2' : 'ShoppingCart'} size={20} className="mr-2" />
          {inCart ? 'Убрать из заказа' : 'Добавить в заказ'}
        </Button>
      </div>
    </div>
  );
};

export default CoachCard;

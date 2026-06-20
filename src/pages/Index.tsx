import { useState, useMemo } from 'react';
import { coaches, reviews, Coach } from '@/data/school';
import CoachCard from '@/components/CoachCard';
import ReviewCard from '@/components/ReviewCard';
import CartSheet from '@/components/CartSheet';
import StarRating from '@/components/StarRating';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [cart, setCart] = useState<Coach[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const inCart = (id: string) => cart.some((c) => c.id === id);

  const toggleCoach = (coach: Coach) => {
    if (inCart(coach.id)) {
      setCart((prev) => prev.filter((c) => c.id !== coach.id));
    } else {
      setCart((prev) => [...prev, coach]);
      toast.success(`${coach.name} добавлен в заказ`, {
        description: `${coach.price.toLocaleString('ru-RU')} ₽ / месяц`,
      });
    }
  };

  const avgRating = useMemo(
    () => (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1),
    []
  );

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2">
            <span className="text-2xl">♟️</span>
            <span className="font-display font-extrabold text-lg gradient-text">
              Шах и матка 21
            </span>
          </button>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-foreground/70">
            <button onClick={() => scrollTo('coaches')} className="hover:text-primary transition-colors">
              Тренеры
            </button>
            <button onClick={() => scrollTo('reviews')} className="hover:text-primary transition-colors">
              Отзывы
            </button>
          </nav>
          <Button
            onClick={() => setCartOpen(true)}
            variant="outline"
            className="relative rounded-2xl border-primary/30 font-bold"
          >
            <Icon name="ShoppingCart" size={20} className="text-primary" />
            <span className="hidden sm:inline ml-2">Заказ</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-white text-xs font-bold animate-pop-in">
                {cart.length}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative overflow-hidden gradient-hero text-white">
        <div className="absolute top-10 left-10 text-7xl opacity-20 animate-float">♔</div>
        <div className="absolute bottom-16 right-16 text-8xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>♞</div>
        <div className="absolute top-1/2 right-1/4 text-6xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>♜</div>

        <div className="container relative py-24 md:py-32 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-2 text-sm font-semibold animate-fade-up">
            <Icon name="Sparkles" size={16} />
            Шахматная школа нового поколения
          </span>
          <h1 className="font-display font-black text-4xl md:text-6xl lg:text-7xl mt-6 leading-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Воспитываем<br />будущих чемпионов
          </h1>
          <p className="text-lg md:text-xl text-white/90 mt-6 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Индивидуальные занятия с опытными тренерами. Выбери своего наставника и начни побеждать уже сегодня.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button
              onClick={() => scrollTo('coaches')}
              size="lg"
              className="rounded-2xl bg-white text-primary font-bold text-base px-8 py-6 hover:bg-white/90 hover:scale-105 transition-all"
            >
              <Icon name="Users" size={20} className="mr-2" />
              Выбрать тренера
            </Button>
            <Button
              onClick={() => scrollTo('reviews')}
              size="lg"
              variant="outline"
              className="rounded-2xl border-white/40 bg-white/10 text-white font-bold text-base px-8 py-6 hover:bg-white/20 transition-all"
            >
              Читать отзывы
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 md:gap-16 mt-16 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {[
              { value: '200+', label: 'учеников' },
              { value: avgRating, label: 'средний рейтинг' },
              { value: '5 лет', label: 'опыта' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-black text-3xl md:text-4xl">{stat.value}</div>
                <div className="text-sm text-white/80 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section id="coaches" className="container py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-bold text-primary uppercase tracking-wider">Наша команда</span>
          <h2 className="font-display font-black text-3xl md:text-5xl mt-3 text-foreground">
            Выбери своего тренера
          </h2>
          <p className="text-muted-foreground mt-4">
            Добавь понравившегося наставника в заказ — можно выбрать одного или обоих.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mt-14 max-w-4xl mx-auto">
          {coaches.map((coach, i) => (
            <CoachCard
              key={coach.id}
              coach={coach}
              inCart={inCart(coach.id)}
              onToggle={toggleCoach}
              delay={i * 120}
            />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-muted/40 py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Отзывы</span>
            <h2 className="font-display font-black text-3xl md:text-5xl mt-3 text-foreground">
              Что говорят родители
            </h2>
            <div className="flex items-center justify-center gap-3 mt-5">
              <StarRating rating={Math.round(Number(avgRating))} size={22} />
              <span className="font-bold text-lg text-foreground">{avgRating} из 5</span>
              <span className="text-muted-foreground">· {reviews.length} отзывов</span>
            </div>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 mt-14 [&>*]:mb-6 [&>*]:break-inside-avoid">
            {reviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20 md:py-24">
        <div className="relative overflow-hidden rounded-3xl gradient-hero text-white text-center px-6 py-16 md:py-20">
          <div className="absolute top-6 right-8 text-6xl opacity-20 animate-float">♛</div>
          <h2 className="font-display font-black text-3xl md:text-4xl">Готовы начать побеждать?</h2>
          <p className="text-white/90 mt-4 max-w-xl mx-auto">
            Запишитесь на первое занятие — выберите тренера и оставьте заявку.
          </p>
          <Button
            onClick={() => scrollTo('coaches')}
            size="lg"
            className="rounded-2xl bg-white text-primary font-bold text-base px-8 py-6 mt-8 hover:bg-white/90 hover:scale-105 transition-all"
          >
            <Icon name="ArrowUp" size={20} className="mr-2" />
            Выбрать тренера
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-xl">♟️</span>
            <span className="font-display font-bold text-foreground">Шах и матка 21</span>
          </div>
          <p>© 2026 Шахматная школа. Все права защищены.</p>
        </div>
      </footer>

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cart}
        onRemove={toggleCoach}
        onClear={() => setCart([])}
      />
    </div>
  );
};

export default Index;

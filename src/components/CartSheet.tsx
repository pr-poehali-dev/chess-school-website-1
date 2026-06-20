import { Coach } from '@/data/school';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: Coach[];
  onRemove: (coach: Coach) => void;
  onClear: () => void;
}

const CartSheet = ({ open, onOpenChange, items, onRemove, onClear }: CartSheetProps) => {
  const total = items.reduce((sum, c) => sum + c.price, 0);

  const handleCheckout = () => {
    toast.success('Заявка отправлена!', {
      description: 'Мы свяжемся с вами для записи на занятия.',
    });
    onClear();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <Icon name="ShoppingCart" size={24} className="text-primary" />
            Ваш заказ
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center gap-4 text-muted-foreground">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Icon name="ShoppingCart" size={36} />
            </div>
            <p className="font-semibold">Заказ пуст</p>
            <p className="text-sm max-w-xs">Выберите тренера в разделе «Тренеры» и добавьте в заказ.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-3 mt-4">
              {items.map((coach) => (
                <div
                  key={coach.id}
                  className="flex items-center gap-3 rounded-2xl border border-border p-3 animate-fade-up"
                >
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-16 h-16 rounded-xl object-cover object-top shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-foreground">{coach.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{coach.title}</p>
                    <p className="font-extrabold gradient-text mt-1">
                      {coach.price.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove(coach)}
                    className="text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Icon name="Trash2" size={18} />
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-semibold">Итого в месяц</span>
                <span className="text-2xl font-extrabold font-display gradient-text">
                  {total.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <Button
                onClick={handleCheckout}
                size="lg"
                className="w-full rounded-2xl bg-primary text-white font-bold py-6 text-base hover:opacity-90"
              >
                <Icon name="Send" size={20} className="mr-2" />
                Записаться на занятия
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;

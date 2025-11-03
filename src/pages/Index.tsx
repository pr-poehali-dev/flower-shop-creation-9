import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Нежные розы',
    price: 2500,
    image: 'https://cdn.poehali.dev/projects/8e84d444-d6e4-408e-903d-49e080c2da7b/files/4ec02fd5-4444-43d9-9af1-5bf18d59d972.jpg',
    description: 'Элегантный букет из розовых и белых роз'
  },
  {
    id: 2,
    name: 'Лавандовые тюльпаны',
    price: 1800,
    image: 'https://cdn.poehali.dev/projects/8e84d444-d6e4-408e-903d-49e080c2da7b/files/204b8870-683e-459c-a9ac-6f61ba6865f6.jpg',
    description: 'Весенние тюльпаны в пастельных тонах'
  },
  {
    id: 3,
    name: 'Персиковые пионы',
    price: 3200,
    image: 'https://cdn.poehali.dev/projects/8e84d444-d6e4-408e-903d-49e080c2da7b/files/a2cad9b0-6134-4c0b-b2d8-67d6703ee50c.jpg',
    description: 'Роскошные пионы нежных оттенков'
  },
  {
    id: 4,
    name: 'Микс "Воздушный"',
    price: 2200,
    image: 'https://cdn.poehali.dev/projects/8e84d444-d6e4-408e-903d-49e080c2da7b/files/4ec02fd5-4444-43d9-9af1-5bf18d59d972.jpg',
    description: 'Изысканная композиция из разных цветов'
  },
  {
    id: 5,
    name: 'Романтика',
    price: 2800,
    image: 'https://cdn.poehali.dev/projects/8e84d444-d6e4-408e-903d-49e080c2da7b/files/204b8870-683e-459c-a9ac-6f61ba6865f6.jpg',
    description: 'Букет для особенных моментов'
  },
  {
    id: 6,
    name: 'Весеннее настроение',
    price: 1900,
    image: 'https://cdn.poehali.dev/projects/8e84d444-d6e4-408e-903d-49e080c2da7b/files/a2cad9b0-6134-4c0b-b2d8-67d6703ee50c.jpg',
    description: 'Нежный букет для поднятия настроения'
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌸</span>
              <h1 className="text-2xl font-bold text-primary">Цветочный Рай</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => setActiveSection('home')} className="text-sm font-medium hover:text-primary transition-colors">
                Главная
              </button>
              <button onClick={() => setActiveSection('catalog')} className="text-sm font-medium hover:text-primary transition-colors">
                Каталог
              </button>
              <button onClick={() => setActiveSection('about')} className="text-sm font-medium hover:text-primary transition-colors">
                О нас
              </button>
              <button onClick={() => setActiveSection('delivery')} className="text-sm font-medium hover:text-primary transition-colors">
                Доставка
              </button>
              <button onClick={() => setActiveSection('contacts')} className="text-sm font-medium hover:text-primary transition-colors">
                Контакты
              </button>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 opacity-20" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-4 flex-1 overflow-y-auto max-h-[60vh]">
                        {cart.map(item => (
                          <Card key={item.id} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                <div className="flex-1">
                                  <h3 className="font-semibold text-sm">{item.name}</h3>
                                  <p className="text-sm text-primary font-bold mt-1">{item.price} ₽</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.id, -1)}>
                                      <Icon name="Minus" size={14} />
                                    </Button>
                                    <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                    <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(item.id, 1)}>
                                      <Icon name="Plus" size={14} />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-7 w-7 ml-auto text-destructive" onClick={() => removeFromCart(item.id)}>
                                      <Icon name="Trash2" size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold">Итого:</span>
                          <span className="text-2xl font-bold text-primary">{cartTotal} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        {activeSection === 'home' && (
          <>
            <section className="relative py-20 md:py-32 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
              <div className="container mx-auto px-4 relative">
                <div className="max-w-3xl mx-auto text-center animate-fade-in">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    Создаём настроение цветами
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8">
                    Свежие букеты с доставкой за 2 часа. Порадуйте близких особенным подарком
                  </p>
                  <Button size="lg" className="text-lg px-8" onClick={() => setActiveSection('catalog')}>
                    Смотреть каталог
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </div>
            </section>

            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <h3 className="text-3xl font-bold text-center mb-12">Популярные букеты</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {products.slice(0, 3).map((product, index) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="aspect-square overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                      <CardContent className="p-6">
                        <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button className="w-full" onClick={() => addToCart(product)}>
                          <Icon name="ShoppingCart" size={18} className="mr-2" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'catalog' && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12">Каталог букетов</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
                    <div className="aspect-square overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <CardContent className="p-6">
                      <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button className="w-full" onClick={() => addToCart(product)}>
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeSection === 'about' && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-4xl font-bold text-center mb-8">О нас</h2>
              <Card className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Мы — команда флористов с 10-летним опытом, которые создают уникальные букеты для особенных моментов вашей жизни.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Каждый букет составляется вручную из свежих цветов, которые мы закупаем напрямую у проверенных поставщиков.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Наша миссия — дарить радость и создавать незабываемые впечатления через красоту цветов.
                </p>
              </Card>
            </div>
          </section>
        )}

        {activeSection === 'delivery' && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-4xl font-bold text-center mb-8">Доставка</h2>
              <div className="grid gap-6">
                <Card className="p-6">
                  <div className="flex gap-4">
                    <div className="text-4xl">🚚</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
                      <p className="text-muted-foreground">Доставляем по Москве за 2 часа. В другие города — 1-2 дня через курьерские службы.</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex gap-4">
                    <div className="text-4xl">💳</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Удобная оплата</h3>
                      <p className="text-muted-foreground">Оплата картой онлайн или наличными курьеру при получении.</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="flex gap-4">
                    <div className="text-4xl">🌸</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Гарантия свежести</h3>
                      <p className="text-muted-foreground">Если букет не соответствует ожиданиям — заменим бесплатно или вернём деньги.</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-4xl font-bold text-center mb-8">Контакты</h2>
              <Card className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Icon name="Phone" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Телефон</h3>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Mail" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-muted-foreground">info@flowerparadise.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="MapPin" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Адрес</h3>
                      <p className="text-muted-foreground">г. Москва, ул. Цветочная, д. 15</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon name="Clock" size={24} className="text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Режим работы</h3>
                      <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-muted/30 border-t py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌸</span>
              <span className="font-semibold">Цветочный Рай</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
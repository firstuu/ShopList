import ShopListSidebar from './components/shop-list-sidebar';

interface Item {
  name: string | null;
  status: boolean;
}
export interface shopListData {
  name: string;
  items: Item[];
}

export default function Home() {
  const shopListsDummy: shopListData[] = [
    {
      name: 'Lista zakupów 1',
      items: [
        { name: 'Jabłka', status: true },
        { name: 'Gruszki', status: false },
        { name: 'Mleko', status: false },
      ],
    },
    {
      name: 'Lista zakupów 2',
      items: [
        { name: 'Chleb', status: false },
        { name: 'Bułki', status: false },
        { name: 'Ser', status: false },
      ],
    },
    {
      name: 'Lista zakupów 3',
      items: [
        { name: 'Pomidory', status: false },
        { name: 'Ogórki', status: false },
        { name: 'Papryka', status: false },
      ],
    },
  ];

  return (
    <div className="max-w-8xl mx-auto py-[70px] lg:h-[calc(100dvh_-_90px)]">
      <ShopListSidebar shopLists={shopListsDummy} />
    </div>
  );
}

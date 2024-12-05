'use client';
import ShopListSidebar from './components/shop-list-sidebar';
import ShopList from './components/shop-list';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar';

export interface Item {
  name: string | null;
  status: boolean;
}
export interface shopListData {
  name: string;
  items: Item[];
}

const shopListsDummy: shopListData[] = [
  {
    name: 'Lista zakupów 1',
    items: [
      { name: 'Jabłka', status: true },
      { name: 'Gruszki', status: false },
      { name: 'Mleko', status: false },
      { name: 'Mleko', status: false },
      { name: 'Mleko', status: false },
      { name: 'Mleko', status: false },
      { name: 'Mleko', status: false },
      { name: 'Mleko', status: false },
      { name: 'Mleko', status: false },
      { name: 'Mleko', status: false },
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
export default function Home() {
  const [currentShopList, setCurrentShopList] = useState(shopListsDummy[0]);

  const handleDeleteList = (index: number) => {
    const updatedItems = [...currentShopList.items];
    updatedItems.splice(index, 1);
    setCurrentShopList({ ...currentShopList, items: updatedItems });
    console.log('deleted');
  };

  useEffect(() => {
    console.log(currentShopList);
  }, [currentShopList]);

  return (
    <>
      <Navbar shopLists={shopListsDummy} setCurrentShopList={setCurrentShopList} currentShopList={currentShopList} />
      <div className="max-w-8xl mx-auto h-[calc(100dvh_-_60px)] lg:h-[calc(100dvh_-_90px)] lg:py-[70px]">
        <div className="h-full lg:flex lg:gap-[45px]">
          <div className="hidden lg:block">
            <ShopListSidebar shopLists={shopListsDummy} setCurrentShopList={setCurrentShopList} currentShopList={currentShopList} />
          </div>
          <ShopList currentShopList={currentShopList} handleDeleteList={handleDeleteList} />
        </div>
      </div>
    </>
  );
}

'use client';
import { Item, shopListData } from '../page';
import ItemBar from './item-bar';

export default function ShopList({ currentShopList, handleDeleteList }: { currentShopList: shopListData; handleDeleteList: (index: number) => void }) {
  return (
    <div className="flex h-full w-full max-w-full flex-col overflow-hidden bg-secondary pt-[30px] shadow-md lg:rounded-[26px] lg:pt-[40px]">
      <h2 className="mt-[5px] text-center text-2xl lg:text-3xl">{currentShopList.name}</h2>
      <div className="mt-[25px] flex flex-grow flex-col gap-[20px] overflow-y-auto lg:mt-[40px]">
        {currentShopList.items.map((item: Item, index: number) => {
          return <ItemBar item={item} key={index} handleDeleteList={handleDeleteList} index={index} />;
        })}
      </div>
      <div className="my-[30px] self-center lg:my-[40px]">
        <button className="self-center rounded-[16px] bg-accent-blue px-[20px] py-[5px] text-xl text-white shadow-xl lg:text-2xl">
          <p className="mt-[5px]">Dodaj przedmiot</p>
        </button>
      </div>
    </div>
  );
}

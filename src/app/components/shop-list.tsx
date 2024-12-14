'use client';
import { activeShopListIdAtom, shopListItemsAtom, shopListsAtom } from '@/store/atoms/shop-lists';
import { fetchCurrentListItems } from '@/actions/actions';
import { handleAddItem } from '../utils/list-operations';
import { TOAST_MESSAGES } from '@/config/constans';
import { useAtom, useAtomValue } from 'jotai';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import ItemBar from './item-bar';
import { Item } from '@/lib/db';

export default function ShopList() {
  const [currentShopListItems, setCurrentShopListItems] = useAtom(shopListItemsAtom);
  const activeShopListId = useAtomValue(activeShopListIdAtom);
  const currentShopList = useAtomValue(shopListsAtom);

  const shopListName = currentShopList?.find((list) => list.id === activeShopListId)?.name;

  useEffect(() => {
    if (!activeShopListId || activeShopListId < 0) setCurrentShopListItems([]);
    const fetch = async () => {
      try {
        const items = await fetchCurrentListItems(activeShopListId);
        setCurrentShopListItems(items);
      } catch (e) {
        console.error(`Nie udało sie pobrać przedmiotów dla ${activeShopListId}`, e);
        toast.error(TOAST_MESSAGES.ERROR_FETCH_LIST_ITEMS);
      }
    };
    fetch();
  }, [activeShopListId, setCurrentShopListItems]);

  return (
    <div className="flex h-full w-full max-w-full flex-col overflow-hidden bg-secondary pt-[30px] shadow-md lg:rounded-[26px] lg:pt-[40px]">
      <h2 className={`text-center text-2xl lg:text-3xl`}>{currentShopListItems.length > 0 ? shopListName : 'Brak przedmiotów na liście'}</h2>
      <div className="mt-[25px] flex flex-grow flex-col gap-[20px] overflow-y-auto lg:mt-[40px]">
        {currentShopListItems?.map((item: Item) => {
          return <ItemBar item={item} key={item.id} />;
        })}
      </div>
      <div className="my-[30px] self-center lg:my-[40px]">
        <button className="self-center rounded-[16px] bg-accent-blue px-[20px] py-[5px] text-xl text-white shadow-xl lg:text-2xl">
          <p className="mt-[5px]" onClick={() => handleAddItem({ activeShopListId, setCurrentShopListItems })}>
            Dodaj przedmiot
          </p>
        </button>
      </div>
    </div>
  );
}

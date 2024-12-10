import TrashIcon from '../assets/trash.svg';
import { ShoppingList } from '@/lib/db';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';

type ShopListSidebarProps = {
  shopLists: ShoppingList[] | null;
  setMenuOpen?: (boolean: boolean) => void;
  setActiveShopListId: (id: number) => void;
  activeShopListId: number | undefined;
  handleAddList: () => void;
  handleDeleteList: (id: number) => void;
  handleUpdateListName: (name: string, id: number) => void;
};

export default function ShopListSidebar({ shopLists, setMenuOpen, setActiveShopListId, activeShopListId, handleAddList, handleDeleteList, handleUpdateListName }: ShopListSidebarProps) {
  useEffect(() => {
    if (!activeShopListId && shopLists && shopLists.length > 0) {
      setActiveShopListId(shopLists[0].id);
    }
  }, [activeShopListId, setActiveShopListId, shopLists]);

  useEffect(() => {
    if (activeShopListId) Cookies.set('last-active-shopping-list', activeShopListId.toString());
  }, [activeShopListId]);

  return (
    <div className="mx-auto h-full w-full rounded-[26px] bg-secondary py-[30px] shadow-md lg:min-w-[344px] lg:max-w-[344px] lg:py-[40px]">
      <h2 className="text-center text-2xl lg:text-3xl">Listy zakupowe</h2>
      <div className="flex h-full flex-col items-center justify-between">
        <ul className="my-[45px] flex w-full flex-grow flex-col space-y-[20px] overflow-y-scroll px-[25px]">
          {shopLists && shopLists.length > 0 ? (
            shopLists.map((shopList) => {
              return (
                <li
                  onClick={async () => {
                    setMenuOpen?.(false);
                    setActiveShopListId(shopList.id);
                  }}
                  className={`flex cursor-pointer items-center justify-between gap-[10px] border-2 ${activeShopListId === shopList.id ? 'border-accent-red' : 'border-black'} bg-accent-blue px-[20px] py-[8px] text-xl text-white shadow-xl lg:text-2xl`}
                  key={shopList.id}
                >
                  <p
                    onDoubleClick={(event) => {
                      event.currentTarget.contentEditable = 'plaintext-only';
                      event.currentTarget.focus();
                    }}
                    onBlur={(event) => {
                      event.currentTarget.contentEditable = 'false';
                      if (!event.currentTarget.textContent) return;
                      handleUpdateListName(event.currentTarget.textContent, shopList.id);
                    }}
                    suppressContentEditableWarning
                    className="break-word mt-[5px] max-w-full overflow-hidden whitespace-normal text-wrap"
                  >
                    {shopList.name}
                  </p>
                  <Image
                    src={TrashIcon}
                    alt="delete icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteList(shopList.id);
                    }}
                  />
                </li>
              );
            })
          ) : (
            <h2 className="text-center text-xl lg:text-2xl">Brak list</h2>
          )}
        </ul>
        <button onClick={handleAddList} className="mb-[30px] rounded-[16px] bg-accent-blue px-[20px] py-[5px] text-xl text-white shadow-xl lg:mb-[40px] lg:text-2xl">
          <p className="mt-[5px]">Dodaj listę</p>
        </button>
      </div>
    </div>
  );
}

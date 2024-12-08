import TrashIcon from '../assets/trash.svg';
import { ShoppingList } from '@/lib/db';
import { useEffect } from 'react';
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

  return (
    <div className="mx-auto h-full w-full rounded-[26px] bg-secondary py-[30px] shadow-md lg:min-w-[344px] lg:max-w-[344px] lg:py-[40px]">
      <h2 className="text-center text-2xl lg:text-3xl">Listy zakupowe</h2>
      <div className="flex h-full flex-col items-center justify-between">
        <ul className="w-full space-y-[20px] px-[25px] pt-[45px]">
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
                      if (shopList.id === activeShopListId && shopLists.length > 0) {
                        const currentIndex = shopLists.findIndex((list) => list.id === shopList.id);
                        const previousIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                        if (previousIndex) {
                          setActiveShopListId(shopLists[previousIndex].id);
                        } else setActiveShopListId(-1);
                      }
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

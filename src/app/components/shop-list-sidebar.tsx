'use client';
import { deleteListWithConfirmation, handleAddList, handleUpdateListName } from '../utils/list-operations';
import { activeShopListIdAtom, shopListsAtom } from '@/store/atoms/shop-lists';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import TrashIcon from '../assets/trash.svg';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';

export default function ShopListSidebar({ setMenuOpen }: { setMenuOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [activeShopListId, setActiveShopListId] = useAtom(activeShopListIdAtom);
  const setCurrentShopLists = useSetAtom(shopListsAtom);
  const shopLists = useAtomValue(shopListsAtom);

  useEffect(() => {
    if (!activeShopListId && shopLists && shopLists.length > 0) {
      setActiveShopListId(shopLists[0].id);
    }
    if (activeShopListId) Cookies.set('last-active-shopping-list', activeShopListId.toString());
  }, [activeShopListId, setActiveShopListId, shopLists]);

  return (
    <div className="mx-auto h-full w-full rounded-[26px] bg-secondary py-[30px] shadow-md lg:min-w-[344px] lg:max-w-[344px] lg:py-[40px]">
      <h2 className="text-center text-2xl lg:text-3xl">Shopping lists</h2>
      <div className="flex h-full flex-col items-center justify-between">
        <ul className="my-[45px] w-full space-y-[20px] overflow-y-auto px-[25px]">
          {shopLists && shopLists.length > 0 ? (
            shopLists.map((shopList) => {
              return (
                <li
                  onClick={async () => {
                    setMenuOpen?.(false);
                    setActiveShopListId(shopList.id);
                  }}
                  className={`flex cursor-pointer items-center justify-between gap-[10px] border-2 ${activeShopListId === shopList.id ? 'border-accent-red' : 'border-black'} flex-1 overflow-y-auto whitespace-normal text-wrap break-words bg-accent-blue px-[20px] py-[8px] text-xl text-white shadow-xl lg:text-2xl`}
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
                      handleUpdateListName(event.currentTarget.textContent, shopList.id, setCurrentShopLists);
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
                      deleteListWithConfirmation(shopList.id, shopLists, setCurrentShopLists, activeShopListId, setActiveShopListId);
                    }}
                  />
                </li>
              );
            })
          ) : (
            <h2 className="text-center text-xl lg:text-2xl">No lists</h2>
          )}
        </ul>
        <button onClick={() => handleAddList({ setCurrentShopLists, setActiveShopListId })} className="mb-[30px] rounded-[16px] bg-accent-blue px-[20px] py-[5px] text-xl text-white shadow-xl lg:mb-[40px] lg:text-2xl">
          <p className="mt-[5px]">Add list</p>
        </button>
      </div>
    </div>
  );
}

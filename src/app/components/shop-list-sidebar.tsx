'use client';
import TrashIcon from '../assets/trash.svg';
import { FormEvent, useState } from 'react';
import { shopListData } from '../page';
import Image from 'next/image';

export default function ShopListSidebar({ shopLists, setCurrentShopList, currentShopList, setMenuOpen }: { shopLists: shopListData[]; setCurrentShopList: (list: shopListData) => void; currentShopList: shopListData; setMenuOpen?: (boolean: boolean) => void }) {
  const [lists, setLists] = useState<shopListData[]>(shopLists);
  const addNewList = () => {
    const newList = {
      name: 'Nowa lista',
      items: [],
    };
    setLists([newList, ...lists]);
  };

  const updateListName = (event: FormEvent, shopList: shopListData) => {
    shopList.name = event.currentTarget.textContent ? event.currentTarget.textContent : 'Ustaw nazwę';
  };

  return (
    <div className="mx-auto h-full w-full rounded-[26px] bg-secondary py-[30px] shadow-md lg:min-w-[344px] lg:max-w-[344px] lg:py-[40px]">
      <h2 className="text-center text-2xl lg:text-3xl">Listy zakupowe</h2>
      <div className="flex h-full flex-col items-center justify-between">
        <ul className="w-full space-y-[20px] px-[25px] pt-[45px]">
          {lists.map((shopList, index) => {
            return (
              <li
                onClick={() => {
                  setCurrentShopList(shopLists[index]);
                  setMenuOpen?.(false);
                }}
                className={`flex cursor-pointer items-center justify-between gap-[10px] border-2 ${currentShopList === shopList ? 'border-accent-red' : 'border-black'} bg-accent-blue px-[20px] py-[8px] text-xl text-white shadow-xl lg:text-2xl`}
                key={shopList.name}
              >
                <p
                  onDoubleClick={(event) => {
                    event.currentTarget.contentEditable = 'plaintext-only';
                    event.currentTarget.focus();
                  }}
                  onBlur={(event) => {
                    event.currentTarget.contentEditable = 'false';
                  }}
                  suppressContentEditableWarning
                  onInput={(event) => updateListName(event, shopList)}
                  className="break-word mt-[5px] max-w-full overflow-hidden whitespace-normal text-wrap"
                >
                  {shopList.name}
                </p>
                <Image src={TrashIcon} alt="delete icon" />
              </li>
            );
          })}
        </ul>
        <button onClick={addNewList} className="mb-[30px] rounded-[16px] bg-accent-blue px-[20px] py-[5px] text-xl text-white shadow-xl lg:mb-[40px] lg:text-2xl">
          <p className="mt-[5px]">Dodaj listę</p>
        </button>
      </div>
    </div>
  );
}

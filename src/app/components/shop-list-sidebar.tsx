'use client';
import TrashIcon from '../assets/trash.svg';
import { FormEvent, useState } from 'react';
import { shopListData } from '../page';
import Image from 'next/image';

export default function ShopListSidebar({ shopLists }: { shopLists: shopListData[] }) {
  const [lists, setLists] = useState(shopLists);
  const addNewList = () => {
    const newList = {
      name: 'Nowa lista',
      items: [],
    };
    setLists([...lists, newList]);
  };

  const updateListName = (event: FormEvent, shopList: shopListData) => {
    shopList.name = event.currentTarget.textContent ? event.currentTarget.textContent : '';
  };

  return (
    <div className="h-full bg-secondary py-[40px]">
      <h2 className="text-center text-3xl">Listy zakupowe</h2>
      <div className="flex h-full flex-col items-center justify-between">
        <ul className="w-full space-y-[20px] px-[25px] pt-[45px]">
          {lists.map((shopList) => {
            return (
              <li className={`flex items-center justify-between bg-accent-blue px-[20px] py-[14px] text-2xl text-white`} key={shopList.name}>
                <p contentEditable="plaintext-only" suppressContentEditableWarning onInput={(event) => updateListName(event, shopList)} className="mt-[5px]">
                  {shopList.name}
                </p>
                <Image src={TrashIcon} alt="delete icon" />
              </li>
            );
          })}
        </ul>
        <button onClick={addNewList} className="mb-[40px] rounded-[16px] bg-accent-blue px-[20px] py-[5px] text-2xl text-white">
          <p className="mt-[5px]">Dodaj listę</p>
        </button>
      </div>
    </div>
  );
}

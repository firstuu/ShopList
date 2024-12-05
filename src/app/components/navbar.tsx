'use client';
import HamburgerOpenIcon from '../assets/hamburger.svg';
import ShopListSidebar from './shop-list-sidebar';
import CloseMenuIcon from '../assets/close.svg';
import NoteIcon from '../assets/note.svg';
import { shopListData } from '../page';
import { useState } from 'react';
import Image from 'next/image';
export default function Navbar({ shopLists, setCurrentShopList, currentShopList }: { shopLists: shopListData[]; setCurrentShopList: (list: shopListData) => void; currentShopList: shopListData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleOpenMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="flex h-[60px] items-center justify-between bg-primary px-[20px] lg:h-[90px] lg:justify-normal lg:px-0">
        <div className="order-2 flex items-center gap-[10px] lg:order-1 lg:mx-auto lg:w-full lg:max-w-6xl">
          <h1 className="mt-[5px] h-fit text-2xl text-white lg:text-3xl">Shoplist</h1>
          <Image src={NoteIcon} alt="Note Icon" className="w-[32px] lg:w-[50px]" />
        </div>
        <div className="order-1 lg:hidden">
          <Image src={menuOpen ? CloseMenuIcon : HamburgerOpenIcon} alt="Open menu" className="cursor-pointer" onClick={handleOpenMenu} />
        </div>
      </div>

      <div className={`${menuOpen ? 'translate-x-0' : 'translate-x-[-100%]'} absolute z-10 h-[calc(100dvh_-_60px)] w-full bg-white px-[25px] py-[20px] transition-all duration-300 ease-in`}>
        <ShopListSidebar shopLists={shopLists} setCurrentShopList={setCurrentShopList} currentShopList={currentShopList} setMenuOpen={setMenuOpen} />
      </div>
    </>
  );
}

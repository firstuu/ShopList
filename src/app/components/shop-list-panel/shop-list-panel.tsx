'use client';
import { addList, addListItem, changeStatusListItem, deleteList, deleteListItem, updateItemName, updateListName } from '@/actions/actions';
import ShopListSidebar from '../shop-list-sidebar';
import { Item, ShoppingList } from '@/lib/db';
import ShopList from '../shop-list';
import { useState } from 'react';
import Navbar from '../navbar';

type ShopListProps = {
  shopLists: ShoppingList[];
  firstFetchedShopListItems: Item[];
};

export default function ShopListPage({ shopLists, firstFetchedShopListItems }: ShopListProps) {
  const [currentShopListItems, setCurrentShopListItems] = useState(firstFetchedShopListItems);
  const [currentShopLists, setCurrentShopLists] = useState(shopLists);
  const [activeShopListId, setActiveShopListId] = useState<number | undefined>(firstFetchedShopListItems && shopLists.length > 0 ? shopLists[0].id : undefined);

  const handleAddItem = async () => {
    const newItem = await addListItem('New list', activeShopListId);
    if (newItem) {
      setCurrentShopListItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const handleAddList = async () => {
    const newList = await addList();
    if (newList) {
      setCurrentShopLists((prevItems) => [...prevItems, newList]);
      setActiveShopListId(newList.id);
    }
  };

  const handleDeleteList = async (id: number) => {
    const deletedList = await deleteList(id);
    if (deletedList) {
      setCurrentShopLists((prevItems) => prevItems.filter((item) => item.id !== deletedList.id));
    }
  };

  const handleDeleteItem = async (id: number) => {
    const deletedItem = await deleteListItem(id);
    if (deletedItem) {
      setCurrentShopListItems((prevItems) => prevItems.filter((item) => item.id !== deletedItem.id));
    }
  };

  const handleChangeStatusItem = async (id: number, status: boolean) => {
    const updatedItem = await changeStatusListItem(id, status);
    if (updatedItem) {
      setCurrentShopListItems((prevItems) => prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
    }
  };

  const handleUpdateListName = async (name: string, id: number) => {
    const updatedItem = await updateListName(name, id);
    if (updatedItem) {
      setCurrentShopLists((prevItems) => {
        return prevItems.map((item) => {
          if (item.id === updatedItem.id) {
            return { ...item, name: updatedItem.name };
          }
          return item;
        });
      });
    }
  };

  const handleUpdateItemName = async (name: string, id: number) => {
    const updatedItem = await updateItemName(name, id);
    if (updatedItem) {
      setCurrentShopListItems((prevItems) => {
        return prevItems.map((item) => {
          if (item.id === updatedItem.id) {
            return { ...item, name: updatedItem.name };
          }
          return item;
        });
      });
    }
  };

  return (
    <>
      <Navbar shopLists={currentShopLists} activeShopListId={activeShopListId} setActiveShopListId={setActiveShopListId} handleAddList={handleAddList} handleDeleteList={handleDeleteList} />
      <div className="mx-auto h-[calc(100dvh_-_60px)] max-w-8xl lg:h-[calc(100dvh_-_90px)] lg:px-[30px] lg:py-[70px]">
        <div className="h-full lg:flex lg:gap-[45px]">
          <div className="hidden lg:block">
            <ShopListSidebar shopLists={currentShopLists} activeShopListId={activeShopListId} setActiveShopListId={setActiveShopListId} handleAddList={handleAddList} handleDeleteList={handleDeleteList} handleUpdateListName={handleUpdateListName} />
          </div>
          <ShopList
            currentShopListItems={currentShopListItems}
            activeShopListId={activeShopListId}
            setCurrentShopListItems={setCurrentShopListItems}
            handleAddItem={handleAddItem}
            handleDeleteItem={handleDeleteItem}
            handleChangeStatusItem={handleChangeStatusItem}
            shopListName={currentShopLists.find((list) => list.id === activeShopListId)?.name || undefined}
            handleUpdateItemName={handleUpdateItemName}
          />
        </div>
      </div>
    </>
  );
}

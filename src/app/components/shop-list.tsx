import { fetchCurrentListItems } from '@/actions/actions';
import { useEffect } from 'react';
import ItemBar from './item-bar';
import { Item } from '@/lib/db';

type ShopListProps = {
  currentShopListItems: Item[];
  handleAddItem: () => void;
  handleDeleteItem: (id: number) => void;
  handleChangeStatusItem: (id: number, status: boolean) => void;
  shopListName: string | undefined;
  setCurrentShopListItems: (items: Item[]) => void;
  activeShopListId: number | undefined;
  handleUpdateItemName: (name: string, id: number) => void;
};

export default function ShopList({ currentShopListItems, handleAddItem, handleDeleteItem, handleChangeStatusItem, shopListName, setCurrentShopListItems, activeShopListId, handleUpdateItemName }: ShopListProps) {
  useEffect(() => {
    const fetch = async () => {
      const items = await fetchCurrentListItems(activeShopListId);
      setCurrentShopListItems(items);
    };
    if (!activeShopListId) setCurrentShopListItems([]);
    fetch();
  }, [activeShopListId, setCurrentShopListItems]);

  return (
    <div className="flex h-full w-full max-w-full flex-col overflow-hidden bg-secondary pt-[30px] shadow-md lg:rounded-[26px] lg:pt-[40px]">
      <h2 className={`text-center text-2xl lg:text-3xl`}>{currentShopListItems.length > 0 ? shopListName : 'Brak przedmiotów na liście'}</h2>
      <div className="mt-[25px] flex flex-grow flex-col gap-[20px] overflow-y-auto lg:mt-[40px]">
        {currentShopListItems?.map((item: Item) => {
          return <ItemBar item={item} key={item.id} handleDeleteItem={handleDeleteItem} handleChangeStatusItem={handleChangeStatusItem} handleUpdateItemName={handleUpdateItemName} />;
        })}
      </div>
      <div className="my-[30px] self-center lg:my-[40px]">
        <button className="self-center rounded-[16px] bg-accent-blue px-[20px] py-[5px] text-xl text-white shadow-xl lg:text-2xl">
          <p className="mt-[5px]" onClick={() => handleAddItem()}>
            Dodaj przedmiot
          </p>
        </button>
      </div>
    </div>
  );
}

'use client';
import { addList, addListItem, changeStatusListItem, deleteList, deleteListItem, updateItemName, updateListName } from '@/actions/actions';
import ShopListSidebar from '../shop-list-sidebar';
import toast, { Toaster } from 'react-hot-toast';
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
  const [isToastAddDismissed, setIsToastAddDismissed] = useState(false);
  const [isToastDeleteDismissed, setIsToastDeleteDismissed] = useState(false);

  const handleAddItem = async () => {
    try {
      const newItem = await addListItem('New list', activeShopListId);
      if (newItem) {
        setCurrentShopListItems((prevItems) => [...prevItems, newItem]);
        toast.success('dodano przedmiot!', { id: 'add-item' });
        if (!isToastAddDismissed) {
          toast(
            (t) => (
              <span>
                <p className="text-lg">
                  Kliknij <span className="text-accent-green">dwókrotnie</span> na przedmiot aby zmienić nazwę
                </p>
                <button
                  className="rounded-[16px] bg-accent-blue px-3 pb-1 pt-2 text-white"
                  onClick={() => {
                    toast.dismiss(t.id);
                    setIsToastAddDismissed(true);
                  }}
                >
                  Zrozumiano!
                </button>
              </span>
            ),
            { id: 'add-item-info' },
          );
        }
      } else toast.error('Dodaj lub wybierz listę', { id: 'no-listId-error' });
    } catch {
      toast.error('Coś poszło nie tak.', { id: 'add-item-error' });
    }
  };

  const handleAddList = async () => {
    const newList = await addList();
    if (newList) {
      setCurrentShopLists((prevItems) => [...prevItems, newList]);
      setActiveShopListId(newList.id);
      toast.success('dodano listę!', { id: 'add-list' });
      if (!isToastAddDismissed) {
        toast(
          (t) => (
            <span>
              <p className="text-lg">
                Kliknij <span className="text-accent-green">dwókrotnie</span> na listę aby zmienić nazwę
              </p>
              <button
                className="rounded-[16px] bg-accent-blue px-3 pb-1 pt-2 text-white"
                onClick={() => {
                  toast.dismiss(t.id);
                  setIsToastAddDismissed(true);
                }}
              >
                Zrozumiano!
              </button>
            </span>
          ),
          { id: 'add-list-info' },
        );
      }
    } else toast.error('Coś poszło nie tak', { id: 'add-list-error' });
  };

  const handleDeleteList = async (id: number) => {
    if (!isToastDeleteDismissed) {
      toast(
        (t) => (
          <span>
            <p className="text-lg">
              Napewno chcesz <span className="text-accent-red">usunąć</span> listę?
            </p>
            <div className="mb-[5px] flex items-center gap-[5px]">
              <button
                className="w-full rounded-[16px] bg-accent-red px-3 pb-1 pt-2 text-white"
                onClick={async () => {
                  toast.dismiss(t.id);
                  const deletedList = await deleteList(id);
                  if (deletedList) {
                    setCurrentShopLists((prevItems) => prevItems.filter((item) => item.id !== deletedList.id));
                    toast.success('pomyślnie usunięto listę');
                    const currentIndex = currentShopLists.findIndex((list) => list.id === deletedList.id);
                    const previousIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                    if (previousIndex) {
                      setActiveShopListId(currentShopLists[previousIndex].id);
                    } else {
                      setActiveShopListId(-1);
                    }
                  } else toast.error('coś poszło nie tak');
                }}
              >
                Tak
              </button>

              <button
                className="w-full rounded-[16px] bg-accent-green px-3 pb-1 pt-2 text-white"
                onClick={() => {
                  toast.dismiss(t.id);
                }}
              >
                Nie
              </button>
            </div>
            <button
              className="w-full rounded-[16px] bg-accent-red px-3 pb-1 pt-2 text-center text-white"
              onClick={async () => {
                toast.dismiss(t.id);
                setIsToastDeleteDismissed(true);
                const deletedList = await deleteList(id);
                if (deletedList) {
                  setCurrentShopLists((prevItems) => prevItems.filter((item) => item.id !== deletedList.id));
                  toast.success('pomyślnie usunięto listę');
                  const currentIndex = currentShopLists.findIndex((list) => list.id === deletedList.id);
                  const previousIndex = currentIndex > 0 ? currentIndex - 1 : 0;
                  if (previousIndex) {
                    setActiveShopListId(currentShopLists[previousIndex].id);
                  } else {
                    setActiveShopListId(-1);
                  }
                } else toast.error('coś poszło nie tak');
              }}
            >
              Tak, nie pytaj ponownie
            </button>
          </span>
        ),
        { id: 'delete-list' },
      );
    } else {
      const deletedList = await deleteList(id);
      if (deletedList) {
        setCurrentShopLists((prevItems) => prevItems.filter((item) => item.id !== deletedList.id));
        const currentIndex = currentShopLists.findIndex((list) => list.id === deletedList.id);
        const previousIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        if (previousIndex >= 0) {
          setActiveShopListId(currentShopLists[previousIndex].id);
        } else {
          setActiveShopListId(undefined);
        }
      }
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (!isToastDeleteDismissed) {
      toast(
        (t) => (
          <span>
            <p className="text-lg">
              Napewno chcesz <span className="text-accent-red">usunąć</span> listę?
            </p>
            <div className="mb-[5px] flex items-center gap-[5px]">
              <button
                className="w-full rounded-[16px] bg-accent-red px-3 pb-1 pt-2 text-white"
                onClick={async () => {
                  toast.dismiss(t.id);
                  const deletedList = await deleteListItem(id);
                  if (deletedList) {
                    setCurrentShopListItems((prevItems) => prevItems.filter((item) => item.id !== deletedList.id));
                    toast.success('pomyślnie usunięto przedmiot');
                  } else toast.error('coś poszło nie tak');
                }}
              >
                Tak
              </button>

              <button
                className="w-full rounded-[16px] bg-accent-green px-3 pb-1 pt-2 text-white"
                onClick={() => {
                  toast.dismiss(t.id);
                }}
              >
                Nie
              </button>
            </div>
            <button
              className="w-full rounded-[16px] bg-accent-red px-3 pb-1 pt-2 text-center text-white"
              onClick={async () => {
                toast.dismiss(t.id);
                setIsToastDeleteDismissed(true);
                const deletedList = await deleteListItem(id);
                if (deletedList) {
                  setCurrentShopListItems((prevItems) => prevItems.filter((item) => item.id !== deletedList.id));
                  toast.success('pomyślnie usunięto przedmiot');
                } else toast.error('coś poszło nie tak');
              }}
            >
              Tak, nie pytaj ponownie
            </button>
          </span>
        ),
        { id: 'delete-list' },
      );
    }
  };

  const handleChangeStatusItem = async (id: number, status: boolean) => {
    const updatedItem = await changeStatusListItem(id, status);
    if (updatedItem) {
      setCurrentShopListItems((prevItems) => prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
      toast.success('Pomyślnie zmieniono status', { id: 'status-success' });
    } else toast.error('coś poszło nie tak', { id: 'change-item-status-error' });
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
      toast.success('Pomyślnie zmieniono nazwę', { id: 'list-name-change' });
    } else toast.error('Nie udało się zapisać nowej nazwy', { id: 'change-list-name-error' });
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
      toast.success('Pomyślnie zmieniono nazwę', { id: 'item-name-change' });
    } else toast.error('Nie udało się zapisać nowej nazwy', { id: 'change-item-name-error' });
  };

  return (
    <>
      <Navbar shopLists={currentShopLists} activeShopListId={activeShopListId} setActiveShopListId={setActiveShopListId} handleAddList={handleAddList} handleDeleteList={handleDeleteList} handleUpdateListName={handleUpdateListName} />
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
        <Toaster position="bottom-right" />
      </div>
    </>
  );
}

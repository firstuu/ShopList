import { addList, addListItem, changeStatusListItem, deleteList, deleteListItem, updateItemName, updateListName } from '@/actions/actions';
import toastCustomItemDelete from '../components/toasts-custom/toast-custom-item-delete';
import toastCustomDelete from '../components/toasts-custom/toast-custom-delete';
import toastCustomAdd from '../components/toasts-custom/toast-custom-add';
import { TOAST_MESSAGES } from '@/config/constans';
import { Item, ShoppingList } from '@/lib/db';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

export const handleAddItem = async ({ activeShopListId, setCurrentShopListItems }: { activeShopListId: number | undefined; setCurrentShopListItems: React.Dispatch<React.SetStateAction<Item[]>> }) => {
  try {
    const newItem = await addListItem(activeShopListId);
    if (newItem) {
      setCurrentShopListItems((prevItems) => [...prevItems, newItem]);
      toast.success(TOAST_MESSAGES.SUCCESS_ADD_ITEM, { id: 'add-item' });
      if (!Cookies.get('toast-add-dismissed')) {
        toastCustomAdd({ id: 'add-item-info' });
      }
    } else toast.error(TOAST_MESSAGES.ERROR_NO_LIST_ID, { id: 'no-listId-error' });
  } catch {
    toast.error(TOAST_MESSAGES.ERROR, { id: 'add-item-error' });
  }
};

export const handleAddList = async ({ setCurrentShopLists, setActiveShopListId }: { setCurrentShopLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>; setActiveShopListId: React.Dispatch<React.SetStateAction<number | undefined>> }) => {
  const newList = await addList();
  if (newList) {
    setCurrentShopLists((prevItems: ShoppingList[]) => [...prevItems, newList]);
    setActiveShopListId(newList.id);
    toast.success(TOAST_MESSAGES.SUCCESS_ADD_LIST, { id: 'add-list' });
    if (!Cookies.get('toast-add-dismissed')) {
      toastCustomAdd({ id: 'add-list-info' });
    }
  } else {
    toast.error(TOAST_MESSAGES.ERROR, { id: 'add-list-error' });
  }
};

export const handleDeleteAndSetActiveList = async (
  listId: number,
  currentShopLists: ShoppingList[],
  setCurrentShopLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>,
  activeShopListId: number | undefined,
  setActiveShopListId: React.Dispatch<React.SetStateAction<number | undefined>>,
): Promise<void> => {
  const deletedList = await deleteList(listId);
  if (deletedList) {
    setCurrentShopLists((prevItems) => prevItems.filter((item) => item.id !== deletedList.id));
    toast.success(TOAST_MESSAGES.SUCCESS_DELETE_LIST, { id: 'delete-list' });
    const currentIndex = currentShopLists.findIndex((list) => list.id === deletedList.id);
    const previousIndex = currentIndex >= 0 ? currentIndex - 1 : -1;

    if (previousIndex >= 0 && activeShopListId === deletedList.id) {
      setActiveShopListId(currentShopLists[previousIndex].id);
    } else if (previousIndex < 0) {
      setActiveShopListId(-1);
    }
  } else toast.error(TOAST_MESSAGES.ERROR, { id: 'delete-list-error' });
};

export const deleteListWithConfirmation = async (
  id: number,
  currentShopLists: ShoppingList[],
  setCurrentShopLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>,
  activeShopListId: number | undefined,
  setActiveShopListId: React.Dispatch<React.SetStateAction<number | undefined>>,
) => {
  const skipConfirmation = Cookies.get('toast-delete-dismissed') ? true : false;
  if (skipConfirmation) {
    await handleDeleteAndSetActiveList(id, currentShopLists, setCurrentShopLists, activeShopListId, setActiveShopListId);
  } else {
    await toastCustomDelete({
      toastId: 'delete-list-info',
      listId: id,
      currentShopLists,
      setCurrentShopLists,
      activeShopListId,
      setActiveShopListId,
    });
  }
};

export const handleDeleteItem = async (id: number, setCurrentShopListItems: React.Dispatch<React.SetStateAction<Item[]>>, setIsToastDeleteDismissed: React.Dispatch<React.SetStateAction<boolean>>) => {
  if (!Cookies.get('toast-delete-dismissed')) {
    await toastCustomItemDelete({
      toastId: 'delete-item',
      itemId: id,
      setCurrentShopListItems,
      setIsToastDeleteDismissed,
    });
  } else {
    const deletedListItem = await deleteListItem(id);
    if (deletedListItem) {
      setCurrentShopListItems((prevItems) => prevItems.filter((item) => item.id !== deletedListItem.id));
      toast.success(TOAST_MESSAGES.SUCCESS_DELETE_ITEM, { id: 'delete-item' });
    } else {
      toast.error(TOAST_MESSAGES.ERROR, { id: 'delete-item-error' });
    }
  }
};

export const handleChangeStatusItem = async (id: number, status: boolean, setCurrentShopListItems: React.Dispatch<React.SetStateAction<Item[]>>) => {
  const updatedItem = await changeStatusListItem(id, status);
  console.log(updatedItem);
  if (updatedItem) {
    setCurrentShopListItems((prevItems) => prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
    toast.success(TOAST_MESSAGES.SUCCESS_UPDATE_STATUS, { id: 'status-success' });
  } else toast.error(TOAST_MESSAGES.ERROR, { id: 'change-item-status-error' });
};

export const handleUpdateListName = async (name: string, id: number, setCurrentShopLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>) => {
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
    toast.success(TOAST_MESSAGES.SUCCESS_UPDATE_NAME, { id: 'list-name-change' });
  } else toast.error(TOAST_MESSAGES.ERROR_UPDATE_NAME, { id: 'change-list-name-error' });
};

export const handleUpdateItemName = async (name: string, id: number, setCurrentShopListItems: React.Dispatch<React.SetStateAction<Item[]>>) => {
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
    toast.success(TOAST_MESSAGES.SUCCESS_UPDATE_NAME, { id: 'item-name-change' });
  } else toast.error(TOAST_MESSAGES.ERROR_UPDATE_NAME, { id: 'change-item-name-error' });
};

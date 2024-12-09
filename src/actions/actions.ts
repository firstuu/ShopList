'use server';

import { Item, prisma, ShoppingList } from '@/lib/db';

export const fetchShopLists = async (): Promise<ShoppingList[]> => {
  try {
    return await prisma.shoppingList.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  } catch (e) {
    console.error('Error fetching shopping lists:', e);
    throw new Error('Failed to fetch shopping lists');
  }
};

export const fetchFirstFetchedShopListItems = async (listId: number): Promise<Item[]> => {
  try {
    return await prisma.item.findMany({
      where: {
        listId: listId,
      },
      orderBy: {
        id: 'asc',
      },
    });
  } catch (e) {
    console.error('Error fetching first fetched shop list items:', e);
    throw new Error('Failed to fetch first fetched shop list items');
  }
};

export const fetchCurrentListItems = async (id: number | undefined) => {
  try {
    const items = await prisma.item.findMany({
      where: {
        listId: id,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return items;
  } catch (e) {
    console.error('Error fetching current list items:', e);
    throw new Error('Failed to fetch current list items');
  }
};

export const updateListName = async (name: string, id: number) => {
  try {
    return await prisma.shoppingList.update({
      data: {
        name: name,
      },
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.error('Error updating list name:', e);
    return null;
  }
};

export const updateItemName = async (name: string, id: number) => {
  try {
    return await prisma.item.update({
      data: {
        name: name,
      },
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.error('Error updating item name:', e);
    return null;
  }
};

export const addListItem = async (name: string, listId: number | undefined) => {
  try {
    if (!listId || listId < 0) return null;
    const newItem = await prisma.item.create({
      data: {
        name: name,
        listId: listId,
      },
    });
    return newItem;
  } catch (e) {
    console.error('Error adding list item:', e);
    throw new Error('Failed to add list item');
  }
};

export const addList = async () => {
  try {
    const newList = await prisma.shoppingList.create({
      data: {
        name: 'New list',
      },
    });
    return newList;
  } catch (e) {
    console.error('Error adding list:', e);
    return null;
  }
};

export const deleteList = async (id: number) => {
  try {
    const deletedList = await prisma.shoppingList.delete({
      where: {
        id: id,
      },
    });
    return deletedList;
  } catch (e) {
    console.error('Error deleting list:', e);
    return null;
  }
};

export const deleteListItem = async (id: number | undefined) => {
  if (!id) return;
  try {
    const newItem = await prisma.item.delete({
      where: {
        id: id,
      },
    });
    return newItem;
  } catch (e) {
    console.error('Error deleting list item:', e);
    return null;
  }
};

export const changeStatusListItem = async (id: number | undefined, status: boolean) => {
  if (!id) return;
  try {
    const updateItem = await prisma.item.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    return updateItem;
  } catch (e) {
    console.error('Error changing status of list item:', e);
    return null;
  }
};

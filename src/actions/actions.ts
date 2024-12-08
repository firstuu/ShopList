'use server';

import { Item, prisma, ShoppingList } from '@/lib/db';

export const fetchShopLists = async (): Promise<ShoppingList[]> => {
  return await prisma.shoppingList.findMany({
    orderBy: {
      id: 'asc',
    },
  });
};

export const fetchCurrentListItems = async (id: number | undefined) => {
  const items = await prisma.item.findMany({
    where: {
      listId: id,
    },
    orderBy: {
      id: 'asc',
    },
  });

  return items;
};

export const updateListName = async (name: string, id: number) => {
  return await prisma.shoppingList.update({
    data: {
      name: name,
    },
    where: {
      id: id,
    },
  });
};

export const updateItemName = async (name: string, id: number) => {
  return await prisma.item.update({
    data: {
      name: name,
    },
    where: {
      id: id,
    },
  });
};

export const fetchFirstFetchedShopListItems = async (listId: number): Promise<Item[]> => {
  return await prisma.item.findMany({
    where: {
      listId: listId,
    },
    orderBy: {
      id: 'asc',
    },
  });
};

export const addListItem = async (name: string, listId: number | undefined) => {
  if (!listId) return;
  const newItem = await prisma.item.create({
    data: {
      name: name,
      listId: listId,
    },
  });
  return newItem;
};

export const addList = async () => {
  const newList = await prisma.shoppingList.create({
    data: {
      name: 'New list',
    },
  });
  return newList;
};

export const deleteList = async (id: number) => {
  const deletedList = await prisma.shoppingList.delete({
    where: {
      id: id,
    },
  });
  return deletedList;
};

export const deleteListItem = async (id: number | undefined) => {
  if (!id) return;
  const newItem = await prisma.item.delete({
    where: {
      id: id,
    },
  });
  return newItem;
};

export const changeStatusListItem = async (id: number | undefined, status: boolean) => {
  if (!id) return;
  const updateItem = await prisma.item.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });
  return updateItem;
};

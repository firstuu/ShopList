'use server';

import { Item, prisma, ShoppingList } from '@/lib/db';
import { z } from 'zod';

const shoppingListSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  createdAt: z.date(),
});

const itemSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  status: z.boolean(),
  listId: z.number().positive(),
  createdAt: z.date(),
});

const handleError = (error: unknown, context: string) => {
  console.error(`${context}:`, error);
  if (error instanceof z.ZodError) {
    console.error('Validation errors:', error.errors);
  }
};

export const fetchShopLists = async (): Promise<ShoppingList[]> => {
  try {
    const shopLists = await prisma.shoppingList.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return shoppingListSchema.array().parse(shopLists);
  } catch (e) {
    handleError(e, 'fetch shopping lists');
    throw new Error('Failed to fetch shopping lists');
  }
};

export const fetchLastActiveShopListItems = async (listId: number): Promise<Item[]> => {
  try {
    const lastActiveShopListItems = await prisma.item.findMany({
      where: {
        listId: listId,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return itemSchema.array().parse(lastActiveShopListItems);
  } catch (e) {
    handleError(e, 'fetch first fetched shop list items');
    throw new Error('Failed to fetch first fetched shop list items');
  }
};

export const fetchCurrentListItems = async (id: number | undefined): Promise<Item[]> => {
  try {
    const currentListItems = await prisma.item.findMany({
      where: {
        listId: id,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return itemSchema.array().parse(currentListItems);
  } catch (e) {
    handleError(e, 'fetch current list items');
    throw new Error('Failed to fetch current list items');
  }
};

export const updateListName = async (name: string, id: number) => {
  try {
    const updatedListName = await prisma.shoppingList.update({
      data: {
        name: name,
      },
      where: {
        id: id,
      },
    });
    return shoppingListSchema.parse(updatedListName);
  } catch (e) {
    handleError(e, 'update list name');
    return null;
  }
};

export const updateItemName = async (name: string, id: number) => {
  try {
    const updatedItem = await prisma.item.update({
      data: {
        name: name,
      },
      where: {
        id: id,
      },
    });
    return itemSchema.parse(updatedItem);
  } catch (e) {
    handleError(e, 'update item name');
    return null;
  }
};

export const addListItem = async (listId: number | undefined) => {
  try {
    console.log(listId);
    if (!listId || listId < 0) return;
    const newItem = await prisma.item.create({
      data: {
        name: 'Pomidor',
        listId: listId,
      },
    });
    return itemSchema.parse(newItem);
  } catch (e) {
    handleError(e, 'add list item');
    throw new Error('Failed to add list item');
  }
};

export const addList = async () => {
  try {
    const newList = await prisma.shoppingList.create({
      data: {
        name: 'Nowa lista',
      },
    });
    return shoppingListSchema.parse(newList);
  } catch (e) {
    handleError(e, 'add list');
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
    return shoppingListSchema.parse(deletedList);
  } catch (e) {
    handleError(e, 'delete list');
    return null;
  }
};

export const deleteListItem = async (id: number | undefined) => {
  if (!id) return;
  try {
    const deletedItem = await prisma.item.delete({
      where: {
        id: id,
      },
    });
    return itemSchema.parse(deletedItem);
  } catch (e) {
    handleError(e, 'delete item');
    return null;
  }
};

export const changeStatusListItem = async (id: number | undefined, status: boolean) => {
  if (!id) return;
  try {
    const updatedStatusItem = await prisma.item.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    return itemSchema.parse(updatedStatusItem);
  } catch (e) {
    handleError(e, 'change status item');
    return null;
  }
};

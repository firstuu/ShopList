import { Item, ShoppingList } from '@/lib/db';
import { atom } from 'jotai';

export const shopListsAtom = atom<ShoppingList[]>([]);
export const activeShopListIdAtom = atom<number | undefined>(undefined);
export const shopListItemsAtom = atom<Item[]>([]);

'use client';
import { activeShopListIdAtom, shopListItemsAtom, shopListsAtom } from '@/store/atoms/shop-lists';
import { toastAddDismissedAtom, toastDeleteDismissedAtom } from '@/store/atoms/toast';
import { Item, ShoppingList } from '@prisma/client';
import { useHydrateAtoms } from 'jotai/utils';
import { useState, useEffect } from 'react';
import { Provider } from 'jotai';
import Cookies from 'js-cookie';

type Props = {
  shopLists: ShoppingList[];
  children: React.ReactNode;
  fetchedActiveShopListId: number;
  firstFetchedShopListItems: Item[];
};

function HydrateAtoms({ shopLists, fetchedActiveShopListId, firstFetchedShopListItems, children }: Props) {
  const [isHydrated, setIsHydrated] = useState(false);

  useHydrateAtoms([
    [shopListsAtom, shopLists],
    [activeShopListIdAtom, fetchedActiveShopListId],
    [shopListItemsAtom, firstFetchedShopListItems],
    [toastAddDismissedAtom, Cookies.get('toast-add-dismissed') ? true : false],
    [toastDeleteDismissedAtom, Cookies.get('toast-delete-dismissed') ? true : false],
  ]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return children;
}

export default function JotaiProvider({ shopLists, fetchedActiveShopListId, firstFetchedShopListItems, children }: Props) {
  return (
    <Provider>
      <HydrateAtoms shopLists={shopLists} fetchedActiveShopListId={fetchedActiveShopListId} firstFetchedShopListItems={firstFetchedShopListItems}>
        {children}
      </HydrateAtoms>
    </Provider>
  );
}

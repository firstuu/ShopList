import { fetchLastActiveShopListItems, fetchShopLists } from '@/actions/actions';
import ShopListPage from './components/shop-list-panel/shop-list-panel';
import { cookies } from 'next/headers';
import { Item } from '@/lib/db';
import { ShoppingList } from '@prisma/client';

async function getLastActiveShoppingListId(shopListFetched: ShoppingList[]) {
  const cookiesStore = await cookies();
  const lastActiveShoppingListCookie = cookiesStore.get('last-active-shopping-list');
  return lastActiveShoppingListCookie ? 
    Number(lastActiveShoppingListCookie.value) : 
    (shopListFetched.length > 0 ? shopListFetched[0].id : -1);
}

export default async function Home() {
  try {
    const shopListFetched = await fetchShopLists();
    const lastActiveShoppingListId = await getLastActiveShoppingListId(shopListFetched)
    const lastActiveShoppingListItems: Item[] = lastActiveShoppingListId > 0 ? await fetchLastActiveShopListItems(lastActiveShoppingListId) : []
    return <ShopListPage shopLists={shopListFetched} firstFetchedShopListItems={lastActiveShoppingListItems} fetchedActiveShopListId={lastActiveShoppingListId} />;
  } catch (error) {
    console.error('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później:', error);
    return <div className="mx-auto w-fit pt-20 lg:pt-40">Błąd podczas pobierania danych. Spróbuj ponownie później.</div>;
  }
}

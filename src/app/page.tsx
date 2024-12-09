import { fetchLastActiveShopListItems, fetchShopLists } from '@/actions/actions';
import ShopListPage from './components/shop-list-panel/shop-list-panel';
import { cookies } from 'next/headers';

export default async function Home() {
  try {
    const cookiesStore = await cookies();
    const shopListFetched = await fetchShopLists();
    const lastActiveShoppingListId = cookiesStore.get('last-active-shopping-list') ? Number(cookiesStore.get('last-active-shopping-list')?.value) : shopListFetched[0].id;
    const lastActiveShoppingListItems = await fetchLastActiveShopListItems(lastActiveShoppingListId);

    return <ShopListPage shopLists={shopListFetched} firstFetchedShopListItems={lastActiveShoppingListItems} fetchedActiveShopListId={lastActiveShoppingListId} />;
  } catch (error) {
    console.error('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później:', error);
    return <div className="mx-auto w-fit pt-20 lg:pt-40">Error fetching data. Please try again later.</div>; // Display an error message
  }
}

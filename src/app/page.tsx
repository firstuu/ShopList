import { fetchLastActiveShopListItems, fetchShopLists } from '@/actions/actions';
import ShopListSidebar from './components/shop-list-sidebar';
import JotaiProvider from '@/providers/JotaiProvider';
import ShopList from './components/shop-list';
import { Item, ShoppingList } from '@/lib/db';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/navbar';
import { cookies } from 'next/headers';

async function getLastActiveShoppingListId(shopListFetched: ShoppingList[]) {
  const cookiesStore = await cookies();
  const lastActiveShoppingListCookie = cookiesStore.get('last-active-shopping-list');
  return lastActiveShoppingListCookie ? Number(lastActiveShoppingListCookie.value) : shopListFetched.length > 0 ? shopListFetched[0].id : -1;
}

export default async function Home() {
  try {
    const shopListFetched = await fetchShopLists();
    const lastActiveShoppingListId = await getLastActiveShoppingListId(shopListFetched);
    const lastActiveShoppingListItems: Item[] = lastActiveShoppingListId > 0 ? await fetchLastActiveShopListItems(lastActiveShoppingListId) : [];
    return (
      <JotaiProvider shopLists={shopListFetched} fetchedActiveShopListId={lastActiveShoppingListId} firstFetchedShopListItems={lastActiveShoppingListItems}>
        <>
          <Navbar />
          <div className="mx-auto h-[calc(100dvh_-_60px)] max-w-8xl lg:h-[calc(100dvh_-_90px)] lg:px-[30px] lg:py-[70px]">
            <div className="h-full lg:flex lg:gap-[45px]">
              <div className="hidden lg:block">
                <ShopListSidebar />
              </div>
              <ShopList />
            </div>
            <Toaster position="bottom-right" />
          </div>
        </>
      </JotaiProvider>
    );
  } catch (error) {
    console.error('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później:', error);
    return <div className="mx-auto w-fit pt-20 lg:pt-40">Błąd podczas pobierania danych. Spróbuj ponownie później.</div>;
  }
}

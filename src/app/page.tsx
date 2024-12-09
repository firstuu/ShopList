import { fetchFirstFetchedShopListItems, fetchShopLists } from '@/actions/actions';
import ShopListPage from './components/shop-list-panel/shop-list-panel';

export default async function Home() {
  try {
    const shopListFetched = await fetchShopLists();
    const firstFetchedShopListItems = await fetchFirstFetchedShopListItems(shopListFetched[0]?.id);

    return <ShopListPage shopLists={shopListFetched} firstFetchedShopListItems={firstFetchedShopListItems} />;
  } catch (error) {
    console.error('Wystąpił błąd podczas ładowania danych. Spróbuj ponownie później:', error);
    return <div className="mx-auto w-fit pt-20 lg:pt-40">Error fetching data. Please try again later.</div>; // Display an error message
  }
}

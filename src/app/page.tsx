import { fetchFirstFetchedShopListItems, fetchShopLists } from '@/actions/actions';
import ShopListPage from './components/shop-list-panel/shop-list-panel';

export default async function Home() {
  const shopListFetched = await fetchShopLists();
  const firstFetchedShopListItems = await fetchFirstFetchedShopListItems(shopListFetched[0]?.id);

  return <ShopListPage shopLists={shopListFetched} firstFetchedShopListItems={firstFetchedShopListItems} />;
}

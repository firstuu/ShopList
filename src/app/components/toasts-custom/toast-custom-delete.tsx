import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { deleteAndSetActiveList } from "../shop-list-panel/shop-list-panel";
import { ShoppingList } from "@/lib/db";

type toastCustomDeleteProps = {
    toastId: string,
    listId: number,
    currentShopLists: ShoppingList[],
    setCurrentShopLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>, 
    activeShopListId: number | undefined,
    setActiveShopListId: React.Dispatch<React.SetStateAction<number | undefined>>, 
    setIsToastDeleteDismissed: (value: boolean) => void
}

export default function toastCustomDelete({
    toastId,
    listId,
    currentShopLists,
    setCurrentShopLists,
    activeShopListId,
    setActiveShopListId,
    setIsToastDeleteDismissed
} : toastCustomDeleteProps) {
    toast(
        (t) => (
          <span>
            <p className="text-lg">
              Napewno chcesz <span className="text-accent-red">usunąć</span> listę?
            </p>
            <div className="mb-[5px] flex items-center gap-[5px]">
              <button
                className="w-full rounded-[16px] bg-accent-red px-3 pb-1 pt-2 text-white"
                onClick={async () => {
                  toast.dismiss(t.id);
                  await deleteAndSetActiveList(listId, currentShopLists, setCurrentShopLists, activeShopListId, setActiveShopListId);
                }}
              >
                Tak
              </button>

              <button
                className="w-full rounded-[16px] bg-accent-green px-3 pb-1 pt-2 text-white"
                onClick={() => {
                  toast.dismiss(t.id);
                }}
              >
                Nie
              </button>
            </div>
            <button
              className="w-full rounded-[16px] bg-accent-red px-3 pb-1 pt-2 text-center text-white"
              onClick={async () => {
                toast.dismiss(t.id);
                Cookies.set('toast-delete-dismissed', '1');
                setIsToastDeleteDismissed(true);
                await deleteAndSetActiveList(listId, currentShopLists, setCurrentShopLists, activeShopListId, setActiveShopListId);
              }}
            >
              Tak, nie pytaj ponownie
            </button>
          </span>
        ),
        { id: toastId },
      );
}

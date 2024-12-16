import { handleDeleteAndSetActiveList } from '../../utils/list-operations';
import { TOAST_CUSTOM_MESSAGES } from '@/config/constants';
import { ShoppingList } from '@/lib/db';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

type toastCustomDeleteProps = {
  toastId: string;
  listId: number;
  currentShopLists: ShoppingList[];
  setCurrentShopLists: React.Dispatch<React.SetStateAction<ShoppingList[]>>;
  activeShopListId: number | undefined;
  setActiveShopListId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export default function toastCustomDelete({ toastId, listId, currentShopLists, setCurrentShopLists, activeShopListId, setActiveShopListId }: toastCustomDeleteProps) {
  return new Promise<{ confirmed: boolean; dontAskAgain: boolean }>((resolve) => {
    toast(
      (t) => (
        <span>
          <p className="text-lg">{TOAST_CUSTOM_MESSAGES.DELETE_LIST}</p>
          <div className="mb-[5px] flex items-center gap-[5px]">
            <button
              className="w-full rounded-[16px] bg-accent-red px-3 pb-1 pt-2 text-white"
              onClick={() => {
                toast.dismiss(t.id);
                resolve({ confirmed: true, dontAskAgain: false });
              }}
            >
              {TOAST_CUSTOM_MESSAGES.DELETE_CONFIRM}
            </button>

            <button
              className="w-full rounded-[16px] bg-accent-green px-3 pb-1 pt-2 text-white"
              onClick={() => {
                toast.dismiss(t.id);
                resolve({ confirmed: false, dontAskAgain: false });
              }}
            >
              {TOAST_CUSTOM_MESSAGES.DELETE_CANCEL}
            </button>
          </div>
          <button
            className="w-full rounded-[16px] bg-accent-red px-3 pb-1 pt-2 text-center text-white"
            onClick={() => {
              toast.dismiss(t.id);
              resolve({ confirmed: true, dontAskAgain: true });
            }}
          >
            {TOAST_CUSTOM_MESSAGES.DELETE_DONT_ASK_AGAIN}
          </button>
        </span>
      ),
      { id: toastId },
    );
  }).then(({ confirmed, dontAskAgain }) => {
    if (confirmed) {
      if (dontAskAgain) {
        Cookies.set('toast-delete-dismissed', '1');
      }
      return handleDeleteAndSetActiveList(listId, currentShopLists, setCurrentShopLists, activeShopListId, setActiveShopListId);
    }
  });
}

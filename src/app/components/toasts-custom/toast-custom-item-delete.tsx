import { TOAST_CUSTOM_MESSAGES, TOAST_MESSAGES } from '@/config/constans';
import { deleteListItem } from '@/actions/actions';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { Item } from '@/lib/db';

type ToastCustomItemDeleteProps = {
  toastId: string;
  itemId: number;
  setCurrentShopListItems: React.Dispatch<React.SetStateAction<Item[]>>;
  setIsToastDeleteDismissed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function toastCustomItemDelete({ toastId, itemId, setCurrentShopListItems, setIsToastDeleteDismissed }: ToastCustomItemDeleteProps) {
  return new Promise<{ confirmed: boolean; dontAskAgain: boolean }>((resolve) => {
    toast(
      (t) => (
        <span>
          <p className="text-lg">{TOAST_CUSTOM_MESSAGES.DELETE_ITEM}</p>
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
  }).then(async ({ confirmed, dontAskAgain }) => {
    if (confirmed) {
      if (dontAskAgain) {
        Cookies.set('toast-delete-dismissed', '1');
        setIsToastDeleteDismissed(true);
      }
      const deletedListItem = await deleteListItem(itemId);
      if (deletedListItem) {
        setCurrentShopListItems((prevItems) => prevItems.filter((item) => item.id !== deletedListItem.id));
        toast.success(TOAST_MESSAGES.SUCCESS_DELETE_ITEM);
      } else {
        toast.error(TOAST_MESSAGES.ERROR);
      }
    }
  });
}

import { TOAST_CUSTOM_MESSAGES } from '@/config/constans';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

type toastCustomAddProps = {
  id: string;
};
export default function toastCustomAdd({ id }: toastCustomAddProps) {
  toast(
    (t) => (
      <span>
        <p className="text-lg">{TOAST_CUSTOM_MESSAGES.ADD}</p>
        <button
          className="rounded-[16px] bg-accent-blue px-3 pb-1 pt-2 text-white"
          onClick={() => {
            toast.dismiss(t.id);
            Cookies.set('toast-add-dismissed', '1');
          }}
        >
          {TOAST_CUSTOM_MESSAGES.ADD_CONFIRM}
        </button>
      </span>
    ),
    { id: id },
  );
}

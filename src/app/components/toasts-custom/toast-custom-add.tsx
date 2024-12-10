import toast from "react-hot-toast";
import Cookies from "js-cookie";

type toastCustomAddProps = {
    id: string,
    setIsToastAddDismissed: (value: boolean) => void
}
export default function toastCustomAdd({id, setIsToastAddDismissed} : toastCustomAddProps) {
    toast(
        (t) => (
          <span>
            <p className="text-lg">
              Kliknij <span className="text-accent-green">dwókrotnie</span> na listę aby zmienić nazwę
            </p>
            <button
              className="rounded-[16px] bg-accent-blue px-3 pb-1 pt-2 text-white"
              onClick={() => {
                toast.dismiss(t.id);
                setIsToastAddDismissed(true);
                Cookies.set('toast-add-dismissed', '1');
              }}
            >
              Zrozumiano!
            </button>
          </span>
        ),
        { id: id },
      );
}

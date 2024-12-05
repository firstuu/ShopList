import RevertIcon from '../assets/revert.svg';
import TrashIcon from '../assets/trash.svg';
import DoneIcon from '../assets/done.svg';
import type { Item } from '../page';
import Image from 'next/image';

export default function ItemBar({ item, handleDeleteList, index }: { item: Item; handleDeleteList: (index: number) => void; index: number }) {
  return (
    <div className={`${item.status ? 'bg-accent-green' : 'bg-primary'} mx-[40px] px-[15px] py-[5px] text-white lg:px-[20px] lg:py-[10px]`}>
      <div className="flex items-center justify-between gap-[10px] text-xl lg:text-2xl">
        <p
          className="mt-[5px] flex-1 overflow-y-auto whitespace-normal text-wrap break-words"
          onDoubleClick={(event) => {
            event.currentTarget.contentEditable = 'plaintext-only';
            event.currentTarget.focus();
          }}
          onBlur={(event) => {
            event.currentTarget.contentEditable = 'false';
          }}
          suppressContentEditableWarning
        >
          {item.name}
        </p>
        <div className="flex items-center gap-[10px] lg:gap-[20px]">
          <button className="h-[30px] w-[30px] bg-accent-red shadow-xl lg:h-auto lg:w-auto lg:px-[20px] lg:py-[6px]" onClick={() => handleDeleteList(index)}>
            <p className="mt-[5px] hidden lg:block">usuń</p>
            <div className="lg:hidden">
              {' '}
              <Image src={TrashIcon} alt="delete" />{' '}
            </div>
          </button>
          <button className={`${item.status ? 'bg-primary' : 'bg-accent-green'} flex h-[30px] w-[30px] items-center justify-center shadow-xl lg:h-auto lg:w-auto lg:px-[20px] lg:py-[6px]`}>
            <p className="mt-[5px] hidden lg:block">{item.status ? 'Przywróć' : 'Kupione'}</p>
            <div className="lg:hidden"> {item.status ? <Image src={RevertIcon} alt="revert" /> : <Image src={DoneIcon} alt="Done" />}</div>
          </button>
        </div>
      </div>
    </div>
  );
}

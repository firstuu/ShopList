import NoteIcon from '../assets/note.svg';
import Image from 'next/image';

export default function navbar() {
  return (
    <div className="flex items-center bg-primary lg:h-[90px]">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-[10px]">
        <h1 className="mt-[5px] h-fit text-3xl text-white">Shoplist</h1>
        <Image src={NoteIcon} alt="Note Icon" />
      </div>
    </div>
  );
}

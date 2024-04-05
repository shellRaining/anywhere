import Image from 'next/image';

const loader = ({ src }: { src: string }) => {
  return `http://localhost:3000/user/avatar/${src}`;
};

export default function TravelNoteCard({
  travelNote,
}: Readonly<{
  travelNote: TravelNote;
}>) {
  return (
    <div className="border border-white rounded-2xl overflow-hidden relative h-full">
      <div className="h-2/3">
        <Image
          loader={loader}
          src={travelNote.author}
          alt="travel shot"
          fill={true}
          priority={true}
          style={{ objectFit: 'cover' }}
        ></Image>
      </div>
      <div className="h-1/3">
        <div className="text-black">{travelNote.title}</div>
        <div className="flex">
          <div className="flex-1"></div>
          <div className="w-4/5">{travelNote.author}</div>
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
}

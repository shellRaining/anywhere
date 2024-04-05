import Image from 'next/image';
import TravelNoteCard from './TravelNoteCard';

interface TravelNotesProps {
  travelNotes: TravelNote[];
}

export default function TravelNotes({ travelNotes }: TravelNotesProps) {
  return (
    <div className="flex flex-col">
      {travelNotes.map((note) => {
        return (
          <div className="w-64 h-64 mx-auto">
            <TravelNoteCard travelNote={note}></TravelNoteCard>
          </div>
        );
      })}
    </div>
  );
}

import TravelNoteCard from '@/app/ui/TravelNotes';

const travelNotes: TravelNote[] = [
  {
    id: 1,
    title: 'title',
    author: 'p1',
    review: 1,
    msg: '',
    delete: 0,
  },
  {
    id: 2,
    title: 'title',
    author: 'p2',
    review: 2,
    msg: '',
    delete: 0,
  }
];

export default function Page() {
  return (
    <div className="h-screen">
      <TravelNoteCard travelNotes={travelNotes}></TravelNoteCard>
    </div>
  );
}

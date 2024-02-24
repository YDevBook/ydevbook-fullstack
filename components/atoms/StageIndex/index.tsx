import clsx from 'clsx';

interface StageIndexProps {
  indexNumber?: number;
}

const StageIndex = ({ indexNumber }: StageIndexProps) => {
  return (
    <span
      className={clsx(
        !indexNumber
          ? 'w-4 h-4 bg-ydevbook-faint'
          : 'w-[28px] h-[28px] bg-ydevbook',
        'm-2 rounded-full flex justify-center items-center text-white font-bold'
      )}
    >
      {indexNumber || ''}
    </span>
  );
};

export default StageIndex;

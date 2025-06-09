import { TrophyIcon } from '@heroicons/react/24/solid';
import { classNames } from '@util/gameUtil';

type BadgeProps = {
  title: string;
  description: string;
  active?: boolean;
};

export default function Badge({ title, description, active = false }: BadgeProps) {
  return (
    <div
      className={classNames(
        'relative flex items-center space-x-3 rounded-lg border p-1 shadow-xs border-gray-700',
        active ? 'border-yellow-400 bg-yellow-100/10 text-yellow-300' : 'bg-gray-800 text-gray-500 opacity-60'
      )}
    >
      <div className="shrink-0">
        <div className="rounded-full p-2">
          <TrophyIcon className={classNames('size-10 ', active ? 'text-yellow-500' : 'text-gray-500')} />
        </div>
      </div>
      <div className="min-w-0 flex-1 ">
        <a href="#" className="focus:outline-hidden">
          <span aria-hidden="true" className="absolute inset-0" />
          <p className="text-sm font-medium ">{title}</p>
          <p className="text-sm ">{description}</p>
        </a>
      </div>
    </div>
  );
}

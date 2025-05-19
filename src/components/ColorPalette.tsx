const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'cyan'];

const colorClasses: Record<string, string> = {
  red: 'bg-red-500 ring-red-400',
  blue: 'bg-blue-500 ring-blue-400',
  green: 'bg-green-500 ring-green-400',
  yellow: 'bg-yellow-500 ring-yellow-400',
  purple: 'bg-purple-500 ring-purple-400',
  cyan: 'bg-cyan-500 ring-cyan-400',
};

export default function ColorPalette() {
  return (
    <div className='flex space-x-2'>
      {colors.map(color => (
        <button
          key={color}
          className={`w-10 h-10 rounded-full border-2 border-gray-200 hover:ring-2 ${colorClasses[color]}`}
        />
      ))}
    </div>
  );
}

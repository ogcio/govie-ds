import { cn } from '@/lib/cn';

export function PlatformSelection({
  platforms,
  current,
  onSelect,
}: {
  platforms: string[];
  current: string;
  onSelect: (platform: string) => void;
}) {
  return (
    <ul className="flex gap-lg">
      {platforms.map((platform) => (
        <li key={platform}>
          <button
            className={cn(
              'bg-gray-50 p-md rounded',
              current === platform ? 'bg-gold-100' : undefined,
            )}
            onClick={() => onSelect(platform)}
          >
            {(() => {
              switch (platform) {
                case 'html': {
                  return 'HTML';
                }
                case 'python': {
                  return 'Python';
                }
                case 'node': {
                  return 'Node.js';
                }
                case 'react': {
                  return 'React';
                }
                case 'angular': {
                  return 'Angular';
                }
                case 'other': {
                  return 'Other';
                }
                default: {
                  throw new Error(`Unknown platform '${platform}'.`);
                }
              }
            })()}
          </button>
        </li>
      ))}
    </ul>
  );
}

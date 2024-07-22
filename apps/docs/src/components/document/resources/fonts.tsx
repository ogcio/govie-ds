import { Card } from '../common/card';
import { Image } from '../common/image';

export function Fonts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
      <Card title="Lato font">
        <Image
          src="/fonts/lato.png"
          alt="Lato font"
          width={574}
          height={244}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Card>
      <Card title="Arial font">
        <Image
          src="/fonts/arial.png"
          alt="Arial font"
          width={576}
          height={244}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Card>
      <Card title="Mono font">
        <Image
          src="/fonts/mono.png"
          alt="Mono font"
          width={574}
          height={244}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Card>
    </div>
  );
}

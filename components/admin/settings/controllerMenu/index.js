import Link from 'next/link';
import SettingsIcon from '@material-ui/icons/Settings';

export default function ControllerMenu() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', color: '#1d1d1d' }}>
      <div style={{ height: '50px', padding: '20px', display: 'flex', alignItems: 'center' }}>
        <SettingsIcon />
        <Link href="/admin/settings">Глобальные настройки</Link>
      </div>
    </div>
  );
}

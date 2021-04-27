import ContentContainer from '../../../components/admin/contentContainer';
import Header from '../../../components/admin/header';
import GlobalSettignsContainer from '../../../components/admin/settings/containers/globalSettingsContainer';
import ControllerMenu from '../../../components/admin/settings/controllerMenu';

export default function Settings() {
  return (
    <div>
      <Header pageName={'Настройки'} />

      <ContentContainer left={<ControllerMenu />} right={<GlobalSettignsContainer />} />
    </div>
  );
}

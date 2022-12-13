import { DetailTools, ListTools } from '../../shared/components';
import LateralMenu from '../../shared/components/lateral-menu/LateralMenu';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';

export const Dashboard = () => {
  return (
    <LateralMenu>
      <LayoutPageBase
        title="Pagina inicial"
        toolbar={
          <DetailTools
            showButtonSaveAndClose
            showButtonNew
            showButtonSaveAndCloseLoading
            showButtonBack={false}
          />
        }
      >
        Testando
      </LayoutPageBase>
    </LateralMenu>
  );
};

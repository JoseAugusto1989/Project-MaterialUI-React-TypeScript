import { DetailTools, ListTools } from '../../shared/components';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';

export const Dashboard = () => {
  return (
    <LayoutPageBase 
      title='Pagina inicial' 
      toolbar={(
        <DetailTools 
          showButtonSaveAndClose 
          showButtonNew 
          showButtonSaveAndCloseLoading
          showButtonBack={false}
        />
      )}>
        Testando
    </LayoutPageBase>
  );
};
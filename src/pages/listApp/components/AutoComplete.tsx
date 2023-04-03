import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useMemo, useState } from 'react';

import { useDebounce } from '../../../shared/hooks';
import { EmployeeService } from '../../../shared/services/api/employee/EmployeeService';

type TAutoCompleteOption = {
    id: number
    label: string
}

interface IAutoCompleteEmployeeProps {
    isExternalLoading?: boolean;
}

export const AutoComplete: React.FC<IAutoCompleteEmployeeProps> = ({ isExternalLoading = false }: IAutoCompleteEmployeeProps) => {
  const { debounce } = useDebounce();
  const { fieldName, registerField, defaultValue, error, clearError} = useField('employeeId');

  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

  const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(''); 

  useEffect(() => {
    setIsLoading(true);  

    debounce(() => {
      EmployeeService.getAll(1, search)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            // alert(result.message);

          } else {
            console.log(result);

            setOptions(result.data.map(
              opt => ({ 
                id: opt.id, 
                label: opt.name,
              })
            ));
          }
        });
    });
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = options.find(option => option.id === selectedId);
    if (!selectedId) return null;

    return selectedOption;
  }, [selectedId, options]);

  return (
    <Autocomplete 
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem opções'
      loadingText='Carregando...'
      disablePortal
      onChange={(_, newValue) => { setSelectedId(newValue?.id); setSearch(''); clearError(); }}
      popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
      onInputChange={(_, newValue) => setSearch(newValue)}
      value={autoCompleteSelectedOption}
      disabled={isExternalLoading}
      loading={isLoading}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error}
          helperText={error}

          label="Funcionários"
        />
      )}
    />
  );
};
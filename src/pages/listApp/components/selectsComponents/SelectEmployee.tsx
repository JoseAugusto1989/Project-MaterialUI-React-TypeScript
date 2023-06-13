import React, { useEffect, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import { IEmployee } from '../../../../interfaces';
import EmployeeService from '../../../../shared/services/api/employee/EmployeeService';

type TSelectProps = {
  handleSelect:() => void;
  convertOptions?: IEmployee
}

export const SelectEmployee = ({ handleSelect }: TSelectProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [options, setOptions] = useState<Array<{ label: any; value: any; }>>([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    setIsLoading(true);
    const list: never[] = [];
    EmployeeService.getAllList(list)
      .then((res: { data: { content: any[]; }; }) => {
        console.log('Funcionarios', res);
        setSelectedValue(res.data.content[0]?.name || ''); 
        const convertOptions = res.data.content.map((employee) => ({
          label: employee.name,
          value: employee.id.toString(),
        }));
        setOptions(convertOptions);
        setIsLoading(false);
      })
      .catch((error: any) => {
        console.log('Erro em funcionarios: ', error);
        setIsLoading(false);
      });
  };

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedValue(event.target.value);
    // handleSelect(event.target.value);
  };

  return (
    <div>
      {isLoading ? (
        <p>Carregando funcionários...</p>
      ) : (
        <Select value={selectedValue} onChange={handleChange}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
    </div>
  );
};
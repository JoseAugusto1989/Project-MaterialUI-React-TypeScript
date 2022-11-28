import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { DetailTools } from '../../shared/components';
import { VTextField } from '../../shared/forms';
import LayoutPageBase from '../../shared/layouts/LayoutPageBase';
import { PeopleService } from '../../shared/services/api/people/PeopleServiceExample';

export const DetailPeople: React.FC = () => {
  const { id = 'new' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const formRef = useRef<FormHandles>(null);

  interface IFormData {
    cityId: number;
    email: string;
    completeName: string;
    label: string;
  }

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true);

      PeopleService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate('/people');
        } else {
          setName(result.completeName);
          console.log(result);

          formRef.current?.setData(result);
        }
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);

    if (id === 'new') {
      PeopleService.create(dados).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate(`/people/details/${result}`);
        }
      });
    } else {
      PeopleService.updateById(Number(id), { id: Number(id), ...dados }).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
        } 
      });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PeopleService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/people');
        }
      });
    }
  };

  return (
    <LayoutPageBase
      title={id === 'new' ? 'Nova pessoa' : name}
      toolbar={
        <DetailTools
          textButtonNew="Nova"
          showButtonSaveAndClose
          showButtonNew={id !== 'new'}
          showButtonDelete={id !== 'new'}
          toClickInSave={() => formRef.current?.submitForm()}
          toClickInSaveAndClose={() => formRef.current?.submitForm()}
          toClickInDelete={() => handleDelete(Number(id))}
          toClickInNew={() => navigate('/people/detail/new')}
          toClickInBack={() => navigate('/people')}
        />
      }
    >
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField label="Nome completo" name="completeName" />

        <VTextField label="Email" name="email" />

        <VTextField label="Cidade id" name="cityId" />
      </Form>
    </LayoutPageBase>
  );
};

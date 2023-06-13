import { API } from '../axios-config';


interface IAuth {
    accessToken: string
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const { data } = await API().get<IAuth>('/auth', { data: { email, password } });
        
    if (data) {
      return data;
    }
    return new Error('Erro no login.');
  } catch (error) {
    console.error(error);
    console.log('Erro aki');
    return new Error((error as { message: string }).message || 'Erro no login.');
  }
};

export const AuthService = {
  auth
};
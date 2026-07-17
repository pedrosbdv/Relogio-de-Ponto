import { TableColumn } from "../../components/dashboard-table/dashboard-table";

export const HOME_TABLE_COLUMNS: TableColumn[] = [
  {
    field: 'data',
    header: 'Data',
  },
  {
    field: 'entrada',
    header: 'Entrada',
  },
  {
    field: 'saida',
    header: 'Saída',
  },
];

export const USUARIO_TABLE_COLUMNS: TableColumn[] = [
  {
    field: 'nome',
    header: 'Nome'
  },
  {
    field: 'departamento',
    header: 'Departamento'
  },
  {
    field: 'ramal',
    header: 'Ramal'
  },
  {
    field: 'email',
    header: 'E-mail'
  },
  {
    field: 'role',
    header: 'Tipo de usuário'
  }
];

export const PONTOS_TABLE_COLUMNS: TableColumn[] = [
  {
    field: 'nome',
    header: 'Nome',
  },
  {
    field: 'data',
    header: 'Data',
  },
  {
    field: 'entrada',
    header: 'Entrada',
  },
  {
    field: 'saida',
    header: 'Saída',
  },
];
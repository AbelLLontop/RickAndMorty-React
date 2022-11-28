import { Form} from 'react-router-dom';
import { useAppSelector } from '../hooks/useStore';

export const SiderbarFilter = () => {
  const {name} = useAppSelector((state) => state.characters.filter);
  const loading = useAppSelector((state) => state.characters.loading);
 

  return (
    <aside className="siderbar card-shadow">
      <Form className="filters">
        <h2>Filtros</h2>
        <br />
        <input value={name} name="name" type="hidden" placeholder="Search" />
        <div className="filter">
          <label htmlFor="status">Estado</label>
          <select name="status" id="status" >
            <option value="">Todos</option>
            <option value="alive">Vivo</option>
            <option value="dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
        <div className="filter">
          <label htmlFor="species">Especie</label>
          <select name="species" id="species">
            <option value="">Todos</option>
            <option value="human">Humano</option>
            <option value="alien">Alien</option>
            <option value="Humanoid">humanoide</option>
            <option value="Mythological Creature">Criatura motologica</option>
            <option value="Robot">Robot</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
        <div className="filter">
          <label htmlFor="genders">Genero</label>
          <select name="gender" id="genders">
            <option value="">Todos</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="Genderless">Sin Genero</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>
        
        <button type='submit' className="btn-filter">{loading?'filtrando...':'Filter'}</button>
      </Form>
    </aside>
  );
};

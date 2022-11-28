import { Form} from 'react-router-dom';

export const SiderbarFilter = () => {
  return (
    <aside className="siderbar">
      <Form className="filters">
        <h2>Filtros</h2>
        <br />
        <div className="filter">
          <label htmlFor="status">Estado</label>
          <select name="status" id="status">
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
        <button type='submit' className="btn-filter">Filter</button>
      </Form>
    </aside>
  );
};

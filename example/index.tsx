import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { flow } from '../.';

type MovieT = { id: string; title: string };

const movies: MovieT[] = [
  {
    id: '1',
    title: 'Star Wars',
  },
  {
    id: '2',
    title: 'There Will Be Blood',
  },
  {
    id: '3',
    title: 'The Third Man',
  },
];

type MovieProps = { item?: MovieT };
function Movie({ item }: MovieProps): React.ReactElement {
  return <span>{item?.title}</span>;
}

function App() {
  const [state, setState] = React.useState<boolean>(true);

  return (
    <div>
      <button type="button" onClick={() => setState(s => !s)}>
        {state ? 'If' : 'Else'}
      </button>

      <flow.div r-if={state}>This div has r-if prop.</flow.div>
      <flow.div r-else>This div has r-else prop.</flow.div>

      <flow.ul>
        <flow.li r-for={movies} r-key="id">
          <Movie />
        </flow.li>
      </flow.ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

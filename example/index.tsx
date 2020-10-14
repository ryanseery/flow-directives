import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { flow } from '../.';

type MovieT = { id: string, title: string };

const movies: MovieT[] = [
  {
    id: '1',
    title: 'Star Wars'
  },
  {
    id: '2',
    title: 'There Will Be Blood'
  },
  {
    id: '3',
    title: 'The Third Man'
  }
]

type MovieProps = { item: MovieT };

function Movie({ item }: MovieProps): React.ReactElement {
  return (
    <span>{item.title}</span>
  )
}

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div>
      <flow.div>
        This is a div
      </flow.div>

      <flow.ul>
        <flow.li r-for={movies} r-key="id">
          <Movie /> 
        </flow.li>
      </flow.ul>

      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

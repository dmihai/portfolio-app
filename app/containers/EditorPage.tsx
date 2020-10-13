import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import Explorer from '../features/editor/Explorer';

export default function EditorPage(): JSX.Element {
  return (
    <div data-tid="container">
      <h2>Editor</h2>
      <Link to={routes.HOME}>back to Homepage</Link>
      <div>
        <Explorer />
      </div>
    </div>
  );
}

import React from 'react';

interface IHeaderProps {
  text: string;
}

const Header = ({ text }: IHeaderProps): JSX.Element => {
  return (
    <header className="App-header">
      <h2>{text}</h2>
    </header>
  );
};

export default React.memo(Header);

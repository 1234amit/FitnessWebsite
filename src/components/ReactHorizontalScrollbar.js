import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));

const ReactHorizontalScrollbar = () => {
  const [items, setItems] = React.useState(getItems);
  const [selected, setSelected] = React.useState([]);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick = (id) => ({ scrollToItem }) => {
    const itemSelected = isItemSelected(id);

    setSelected((currentSelected) =>
      itemSelected
        ? currentSelected.filter((el) => el !== id)
        : currentSelected.concat(id)
    );
  };

  return (
    <ScrollMenu
      data={items}
      arrowLeft={<LeftArrow />}
      arrowRight={<RightArrow />}
      selected={selected}
      onSelect={() => {}}
      scrollToSelected={false}
      hideSingleArrow={true}
      alignOnResize={true}
      translate={0}
      transition={0.4}
      onUpdate={() => {}}
    >
      {items.map(({ id }) => (
        <Card
          itemId={id} // NOTE: itemId is required for track items
          title={id}
          key={id}
          onClick={handleClick(id)}
          selected={isItemSelected(id)}
        />
      ))}
    </ScrollMenu>
  );
};

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext);

  return (
    <div className={`arrow-prev ${isFirstItemVisible ? 'disabled' : ''}`} onClick={() => scrollPrev()}>
      &lt;
    </div>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <div className={`arrow-next ${isLastItemVisible ? 'disabled' : ''}`} onClick={() => scrollNext()}>
      &gt;
    </div>
  );
}

function Card({ onClick, selected, title, itemId }) {
  const visibility = React.useContext(VisibilityContext);

  return (
    <div
      onClick={onClick}
      style={{
        width: '160px',
        margin: '0 20px',
        border: selected ? '2px solid red' : '1px solid #ccc',
      }}
      tabIndex={0}
    >
      <div className="card">
        <div>{title}</div>
        <div>visible: {JSON.stringify(!!visibility.isItemVisible(itemId))}</div>
        <div>selected: {JSON.stringify(!!selected)}</div>
      </div>
      <div
        style={{
          height: '200px',
        }}
      />
    </div>
  );
}

export default ReactHorizontalScrollbar;

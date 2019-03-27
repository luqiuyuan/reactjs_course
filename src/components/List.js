import React, { Fragment } from 'react';
import Seperator from './Seperator';

export default function List({ data, renderSeperator, keyExtractor, renderRow, renderEmpty }) {

  return data ? data.map((item, index, { length }) =>
    <Fragment key={keyExtractor(item, index)}>
      {renderRow(item, index)}
      {index < length - 1 && renderSeperator()}
    </Fragment>) : renderEmpty()
}

List.defaultProps = {
  renderSeperator: () => <Seperator />,
  renderEmpty: () => null,
  keyExtractor: (item, index) => index + ''
}
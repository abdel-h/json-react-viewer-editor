import React, { Component } from 'react';

export default class Element extends Component {
    render() {
        const { type, name, value } = this.props;
        if (type === 'structure') {
            const children = Object.keys(value);
            const structureChildren = children.map(document => {
                let { type, name } = value[document];
                let fieldValue = value[document].value;
                return (
                    <Element
                        key={name}
                        type={type}
                        value={fieldValue}
                        name={name}
                    />
                );
            });

            return (
                <div>
                    <input type="text" value={name} />
                    <button>Add Child</button>
                    {structureChildren}
                </div>
            );
        } else {
            return (
                <div>
                    <input type="text" value={name} />
                    <input type="text" value={value} />
                    <select name="" value={type}>
                        <option value="text">Text</option>
                        <option value="strcuture">Structure</option>
                    </select>
                </div>
            );
        }
    }
}

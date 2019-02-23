import React, { Component } from 'react';

export default class Element extends Component {
    handleChange = (event, type) => {
        const val = event.target.value;
        console.log(val, type);
    };
    render() {
        const { type, name, value, id } = this.props;
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
                        id={document}
                    />
                );
            });

            return (
                <div>
                    <input type="text" value={name} name={id} />
                    <button>Add Child</button>
                    {structureChildren}
                </div>
            );
        } else {
            return (
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={e => this.handleChange(e, 'name')}
                        name={id}
                    />
                    <input
                        type="text"
                        value={value}
                        name={id}
                        onChange={e => this.handleChange(e, 'value')}
                    />
                    <select name="" value={type}>
                        <option value="text">Text</option>
                        <option value="strcuture">Structure</option>
                    </select>
                </div>
            );
        }
    }
}

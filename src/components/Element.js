import React, { Component } from 'react';

export default class Element extends Component {
    handleChange = (event, changeType) => {
        const v = event.target.value;
        const { type, name, value, id } = this.props;
        const oldDoc = {
            type,
            name,
            value
        };
        let newDoc = {
            ...oldDoc,
            [changeType]: v
        };
        // We need to send this doc to the state and update it
        this.props.update(id, newDoc);
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
                        update={this.props.update}
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

import React, { Component } from 'react';

export default class Element extends Component {
    handleChange = (event, changeType) => {
        const v = event.target.value;
        const { type, name, value, id, parents } = this.props;
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
        this.props.update(parents, id, newDoc);
    };
    render() {
        const { type, name, value, id, parents } = this.props;
        const parentsIds = [];

        if (parents == false) {
            parentsIds.push(id);
        } else {
            parentsIds.push(...parents, id);
        }
        if (type === 'structure') {
            const children = Object.keys(value);
            const structureChildren = children.map(document => {
                let { type, name } = value[document];
                let fieldValue = value[document].value;
                return (
                    <Element
                        key={document}
                        type={type}
                        value={fieldValue}
                        name={name}
                        id={document}
                        parents={parentsIds}
                        update={this.props.update}
                    />
                );
            });

            return (
                <div>
                    <input type="text" value={name} name={id} defaultValue="" />
                    <button>Add Child</button>
                    {structureChildren}
                </div>
            );
        } else {
            return (
                <div>
                    <input
                        key={`${id}-nameinput`}
                        type="text"
                        value={name}
                        onChange={e => this.handleChange(e, 'name')}
                        name={`${id}-name`}
                    />
                    <input
                        key={`${id}-valueinput`}
                        type="text"
                        value={value}
                        name={`${id}-value`}
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

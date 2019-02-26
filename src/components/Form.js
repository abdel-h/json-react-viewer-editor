import React, { Component } from 'react';
import Element from './Element';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idGen: 10,
            form: {
                'document-id-1': {
                    type: 'structure',
                    name: 'document-name-1',
                    value: {
                        'document-id-2': {
                            type: 'text',
                            name: 'text-field-name',
                            value: 'text-field-value'
                        },
                        'document-id-3': {
                            type: 'text',
                            name: 'text-field-name-2',
                            value: 'text-field-value-1'
                        }
                    }
                },
                'document-id-4': {
                    type: 'structure',
                    name: 'document-name-4',
                    value: {
                        'document-id-5': {
                            type: 'text',
                            name: 'text-field-name',
                            value: 'text-field-value'
                        },
                        'document-id-6': {
                            type: 'text',
                            name: 'text-field-name-2',
                            value: 'text-field-value-1'
                        },
                        'document-id-7': {
                            type: 'structure',
                            name: 'document-name-7',
                            value: {
                                'document-id-8': {
                                    type: 'text',
                                    name: 'text-field-name-8',
                                    value: 'text-field-value-8'
                                }
                            }
                        }
                    }
                }
            }
        };
    }

    addElement = () => {
        const newDocument = {
            type: 'text',
            name: `text-field-name-${this.state.idGen}`,
            value: `text-field-value-${this.state.idGen}`
        };
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [`document-id-${this.state.idGen}`]: newDocument
            }
        });
        let idGen = this.state.idGen++;
        console.log(idGen);
        this.setState({
            ...this.state,
            idGen: idGen++
        });
    };
    updateDocument = (parents, id, value) => {
        if (parents) {
            let form = { ...this.state.form };
            let pointer = form;
            let path = [...parents, id];
            let level = 0;
            while (level < path.length) {
                if (pointer.hasOwnProperty(id)) {
                    pointer[id] = value;
                }
                pointer = pointer[path[level]].value;
                level++;
            }
            this.setState({ ...this.state, form: form });
        }
    };

    changeDocType = (parents, id, type) => {
        if (parents) {
            let form = { ...this.state.form };
            let pointer = form;
            let path = [...parents, id];
            let level = 0;
            while (level < path.length) {
                if (pointer.hasOwnProperty(id)) {
                    pointer[id].type = type;
                    if (type == 'structure') {
                        pointer[id].value = {};
                    }
                }
                pointer = pointer[path[level]].value;
                level++;
            }
            this.setState({ ...this.state, form: form });
        }
    };

    addChild = (parents, id) => {
        let form = { ...this.state.form };
        let pointer = form;
        let path;
        if (parents) {
            path = [...parents, id];
        } else {
            path = [id];
        }

        let level = 0;
        const newDocument = {
            type: 'text',
            name: `text-field-name-${this.state.idGen}`,
            value: `text-field-value-${this.state.idGen}`
        };
        while (level < path.length) {
            if (pointer.hasOwnProperty(id)) {
                pointer[id].value = {
                    ...pointer[id].value,
                    [`document-id-${this.state.idGen}`]: newDocument
                };
            }
            pointer = pointer[path[level]].value;
            level++;
        }
        let idGen = this.state.idGen++;
        this.setState({
            ...this.state,
            idGen: idGen++
        });
        this.setState({ ...this.state, idGen: this.state.idGen++, form: form });
    };

    render() {
        const { form } = this.state;
        const docs = Object.keys(form);
        return (
            <div>
                <button onClick={this.addElement}>Add Element</button>
                {docs.map(document => {
                    let doc = form[document];
                    let { name, type, value } = doc;
                    return (
                        <Element
                            key={document}
                            type={type}
                            value={value}
                            name={name}
                            id={document}
                            parents={false}
                            update={this.updateDocument}
                            add={this.addChild}
                            changeType={this.changeDocType}
                        />
                    );
                })}
            </div>
        );
    }
}

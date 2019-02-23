import React, { Component } from 'react';
import Element from './Element';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    updateDocument = (id, value) => {
        console.log(id, value);
        const docId = id;
        this.setState({
            form: {
                ...this.state.form,
                [id]: value
            }
        });
    };

    render() {
        const { form } = this.state;
        const docs = Object.keys(form);
        return (
            <div>
                {docs.map(document => {
                    let doc = form[document];
                    let { name, type, value } = doc;
                    return (
                        <Element
                            key={name}
                            type={type}
                            value={value}
                            name={name}
                            id={document}
                            update={this.updateDocument}
                        />
                    );
                })}
            </div>
        );
    }
}

import React from 'react'
import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';

export default ({ name, label, error, type, id_suffix, ...rest }) => {
    const id = `id_${name}_${id_suffix}`,
    input_type = type ? type : "text"
    
    return (
        <FormGroup color={error ? "danger" : ""}>
            {label ? <Label htmlFor={id}>{label}</Label> : ""}
            <Input type={input_type} name={name}
                id={id} className={error ? "is-invalid" : ""}
                {...rest} />
            {error ?
                <FormFeedback className="invalid-feedback">
                    {error}
                </FormFeedback>
                : ""
            }
        </FormGroup>
    )
}
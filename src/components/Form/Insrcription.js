import React, {
	useCallback,
	useState,
} from 'react';
import {
	Alert,
	Button,
	Col,
	FormFeedback,
	FormGroup,
	Input,
	Label,
	Row,
    Container,
} from 'reactstrap';
import { Field, FieldError, Form } from 'react-jsonschema-form-validation';
import './Form.scss';

import FormLayout from './Layout'; 
import { requestOptions } from '../../lib/api';

const demoSchema = {
    type: 'object',
    additionalProperties: false,
	properties: {
		phone: { type: 'string' },
		firstName: { type: 'string' },
		lastName: { type: 'string' },
		mail: { type: 'string', format: 'email' },
		area: { type: 'string', minLength: 3, maxLength: 255 },
		address: { type: 'string', minLength: 3, maxLength: 255 },
	},
	required: ['mail', 'phone', 'firstName', 'lastName', 'area', 'address'],
};

const errorMessages = {
	format: () => 'Le format de l’email n’est pas reconnnu',
	maxLength: ({ params: { limit } }) => `Le nombre de caractères est limité à ${limit}`,
	minLength: ({ params: { limit } }) => `Veuillez saisir ${limit} caractères au minimum`,
	required: () => '',
};

const initialData = {};
Object.keys(demoSchema.properties).forEach((p) => {
	initialData[p] = '';
});
initialData.phone = '';

const Inscription = () => {
    const [formData, setFormData] = useState(initialData);
	const [success, setSuccess] = useState(false);
	const [vQrcode, setVQrcode] = useState("");
	const [error, setError] = useState(false);
	const handleSubmit = useCallback(async () => {
		formData.phone = formData.phone.split('+269-')[1] || formData.phone;
		fetch(
			'https://ino051djkg.execute-api.eu-west-3.amazonaws.com/demo/usagers',
			requestOptions(formData),
		)
			.then((result) => result.text())
			.then(() => {
				setVQrcode(formData.phone);
				setSuccess(true);
			})
			.catch((err) => {
				// eslint-disable-next-line no-console
				console.log(err);
				setError(true);
			});
		setFormData(initialData);
		setSuccess(true);
	}, [formData]);

	const handleChange = useCallback((newData) => {
		setSuccess(false);
		setError(false);
		setFormData(newData);
	}, []);
    return (<FormLayout title="Insription" className="justify-content-center" >
    <Col className="col-12 col-md-12 col-lg-10">
        <Form
            data={formData}
            errorMessages={errorMessages}
            onChange={handleChange}
            onSubmit={handleSubmit}
            schema={demoSchema}
        >
            <Row>
                <Col className="col-12 col-md-6">
                    <FormGroup>
                        <Label htmlFor="contactName">Nom *</Label>
                        <Field
                            component={Input}
                            name="lastName"
                            value={formData.lastName}
                            id="contactNom"
                            placeholder="Mchangama"
                        />
                        <FieldError
                            className="text-danger"
                            name="lastName"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="contactName">
                            Prénom *
                        </Label>
                        <Field
                            component={Input}
                            name="firstName"
                            value={formData.firstName}
                            id="contactPrenom"
                            placeholder="Aboudou"
                        />
                        <FieldError
                        className="text-danger"
                        name="firstName"
                        />
                    </FormGroup>
                </Col>
                <Col className="col-12 col-md-6">
                    <FormGroup>
                        <Label htmlFor="contactPhone">
                            Numéro de téléphone *
                        </Label>
                        <Field
                            component={Input}
                            name="phone"
                            value={formData.phone}
                            id="contactPhone"
                            placeholder="333 33 33"
                        />
                        <FieldError
                        className="text-danger"
                            name="phone"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="contactEmail">
                            Email *
                        </Label>
                        <Field
                            component={Input}
                            name="mail"
                            value={formData.mail}
                            id="contactEmail"
                            placeholder="aboudou.mchangama@sixteen.km"
                        />
                        <FieldError
                        className="text-danger"
                            name="mail"
                        />
                    </FormGroup>
                </Col>
            </Row>
            <br />
            <hr />
            <Row>
                <Col className="col-6">
                    <FormGroup>
                        <Label htmlFor="contactMessage">
                            Secteur *
                        </Label>
                        <Field
                            component={Input}
                            name="area"
                            value={formData.area}
                            id="contactarea"
                            placeholder="Magoudjou"
                        />
                        <FieldError
                        className="text-danger"
                            name="area"
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col className="col-12">
                    <FormGroup>
                        <Label htmlFor="contactMessage">
                            Complément d&apos;adresse *
                        </Label>
                        <Field
                            component={Input}
                            name="address"
                            value={formData.address}
                            id="contactMessage"
                            rows="5"
                            type="textarea"
                            placeholder="En face de l'hopital ..."
                        />
                        <FieldError
                        className="text-danger"
                            name="address"
                        />
                    </FormGroup>
                </Col>
            </Row>
            {
                error && (
                    <Row>
                        <Col>
                            <Alert color="danger">
                                Une erreur est survenue. Veuillez réessayer plus tard.
                            </Alert>
                        </Col>
                    </Row>
                )
            }
            {success && (
                <Row>
                    <Col>
                        <Alert
                            color="success"
                        >
                            <h4 className="alert-heading">
                                L&apos;usager a bien été ajouté.
                            </h4>
                            <p className="mb-0">
                                Merci d&apos;avoir effectué cette inscription.
                            </p>
                        </Alert>
                    </Col>
                    {/* <QRCode renderAs="svg" value={vQrcode} /> */}
                </Row>
            )}
            <Row className="justify-content-center mt-7">
                <Col className="col-auto">
                    <Button
                        color="info"
                        className="is-link"
                        //disabled={handleSubmitAsync.loading}
                        type="submit"
                    >
                        Envoyer
                    </Button>
                </Col>
            </Row>
        </Form>
    </Col>
</FormLayout>)
}

export default Inscription;

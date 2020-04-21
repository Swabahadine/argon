import React, { useCallback, useState } from 'react';
import {
	Alert,
	Button,
	Col,
	FormFeedback,
	FormGroup,
	Input,
	Label,
	Row,
	Card,
	CardHeader,
	CardFooter,
	CardBody,
	CardText,
	Spinner,
} from 'reactstrap';
import classnames from 'classnames';

import { Field, FieldError, Form } from 'react-jsonschema-form-validation';

import { myHeaders, requestOptions, requestGetOptions } from '../../lib/api';

import './Form.scss';

import FormLayout from './Layout'; 

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

const Recherche = () => {
    const initCredit = {
		actif: false,
		num: 0,
	};
	const [formData, setFormData] = useState(initialData);
	const [search, setSearch] = useState({});
	const [credit, setCredit] = useState(initCredit);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const handleSubmit = useCallback((phone) => {
		//formData.phone = formData.phone.split('+269-')[1] || formData.phone;
		setSuccess(true);
		setTimeout(() => {
			fetch(
				`https://ino051djkg.execute-api.eu-west-3.amazonaws.com/demo/usagers?phone=${phone}`,
				requestGetOptions,
			)
				.then((result) => result.json())
				.then((res) => {
					// eslint-disable-next-line no-console
					console.log(res);
					setSuccess(false);
					if (res.errorType) {
						setError(`le numéro ${phone} n'a pas été attribué.`);
						setSearch({});
					} else {
						setError('');
						setSearch(res);
					}
				})
				.catch((err) => {
					// eslint-disable-next-line no-console
					console.log(err);
					setError('une erreur est survenue. Veuillez réessayer plus tard.');
					setSearch({});
					setSuccess(false);
				});
			//setFormData(initialData);
		}, 100);
	}, []);

	const handleChange = useCallback((newData) => {
		setError('');
		setFormData(newData);
	}, []);

	const CircleBtn = (children) => (
		<Button
			color={credit.num === children ? 'info' : 'secondary'}
			style={{
				width: '30px',
				height: '30px',
				padding: '6px 0px',
				borderRadius: '15px',
				textAlign: 'center',
				fontSize: '12px',
				lineHeight: '1.42857',
			}}
			onClick={() => {
				setCredit({
					actif: true,
					num: children,
				});
			}}
		>
			{children}
		</Button>
	);
	return  (<FormLayout title="Recherche" className="d-flex justify-content-center pb-7" >
					<Col className="col-12 col-md-12 col-lg-10">
						<Form
							data={formData}
							errorMessages={errorMessages}
							onChange={handleChange}
							onSubmit={handleSubmit}
							schema={demoSchema}
						>
							<Row className="justify-content-center">
								<Col className="col-12">
									<FormGroup>
										<Label htmlFor="contactPhone">
											Numéro de téléphone (ex: 3247223)
										</Label>
										<Field
											component={Input}
											name="phone"
											value={formData.phone}
											id="contactPhone"
											placeholder="333 33 33"
										/>
										<FieldError
											component={FormFeedback}
											name="fullname"
										/>
									</FormGroup>
								</Col>
							</Row>
							{
								error && (
									<Row className="justify-content-center">
										<Col className="col-12 col-md-6">
											<Alert className="text-center" color="danger">
												Samahani, {error}
											</Alert>
										</Col>
									</Row>
								)
							}
							<Row className="justify-content-center py-4">
								<Col className="col-auto">
									<Button
										color={!formData.phone ? 'secondary' : 'info'}
										disabled={!formData.phone}
										onClick={() => handleSubmit(formData.phone.split('+269-')[1] || formData.phone)}
									>
										Envoyer
										<Spinner
											className={classnames({
											"position-relative ml-1": true,
											visible: success,
											invisible: !success
											})}
											size="sm"
											// type="grow"
										/>
									</Button>
									
								</Col>
							</Row>
						</Form>
					</Col>
				{search.phone && !success
				&& (
					<Col xs="12" className="py-4 d-flex justify-content-center">
						<Col xs="12" sm="12" md="9">
							<Card>
								<CardHeader>
									<div className="d-flex justify-content-between">
										<p>{`${search.firstName} ${search.lastName.toUpperCase()} - ${search.phone}`}</p>
										<p className="font-weight-bold">{`${search.isActive ? 'Actif' : 'Inactif'}`}</p>
									</div>
								</CardHeader>
								{credit.actif === false ? (
									<CardBody>

										<CardText>{`Secteur: ${search.area}`}</CardText>
										<CardText>{`Adresse: ${search.address}`}</CardText>

										<Button
											onClick={() => {
												setCredit({
													actif: true,
													num: 0,
												});
											}}
											color="info"
										>
											Ajouter crédit
										</Button>
									</CardBody>
								)
									:								(
										<CardBody className="text-center align-items-center justify-content-center">
											<CardText className="h4">Ajouter crédit</CardText>
											<p>Selectionnez le nombre de mois: </p>
											<div className="w-100 text-center d-flex flex-row align-items-center justify-content-center">
												<div className="w-75 d-flex flex-row justify-content-around">
													{CircleBtn(1) }
													{CircleBtn(2) }
													{CircleBtn(3) }
													{CircleBtn(4) }
													{CircleBtn(5) }
													{CircleBtn(6) }

												</div>
											</div>
											<br />
											<br />
											<div className="d-flex justify-content-around">
												<Button
													color="danger"
													onClick={() => {
														setCredit(initCredit);
													}}
												>
													Annuler
												</Button>
												<Button
													color={credit.num === 0 ? 'secondary' : 'info'}
													disabled={credit.num === 0}
													onClick={() => {
														fetch(
															'https://ino051djkg.execute-api.eu-west-3.amazonaws.com/demo/usagers/abonnements',
															requestOptions({
																phone: search.phone,
																nbMonths: credit.num,
															}),
														)
															.then((response) => response.text())
															.then((res) => {
																// eslint-disable-next-line no-console
																console.log('popo1', res);
																setCredit(initCredit);
																handleSubmit(search.phone);
															})
															.catch((err) => {
																// eslint-disable-next-line no-console
																//console.log(err);
																console.log('erre', err);
																//setError(true);
															});
													}}
												>Ajouter
												</Button>


											</div>
										</CardBody>
									)}
								<CardFooter>
									<div className="d-flex justify-content-between">
										<p>Inscrit le {search.inscDate}.</p>
										<p className="font-weight-bold">Expire le {search.expDate}</p>
									</div>
								</CardFooter>
							</Card>
						</Col>
					</Col>
				)}
			</FormLayout>)
}

export default Recherche;

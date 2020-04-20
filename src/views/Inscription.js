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

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import CardsFooter from "../components/Footers/CardsFooter.js";

// index page sections
import Hero from "./IndexSections/Hero.js";
import FormLayout from '../components/Form/Layout';
import FormInsription from '../components/Form/Insrcription';
import FormRecherche from '../components/Form/Recherche';
import Buttons from "./IndexSections/Buttons.js";
import Inputs from "./IndexSections/Inputs.js";

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
    const [statePage, setStatePage] = useState(1);
    const [formData, setFormData] = useState(initialData);
	const [success, setSuccess] = useState(false);
	const [vQrcode, setVQrcode] = useState("");
	const [error, setError] = useState(false);
	const handleSubmit = useCallback(async () => {
		// formData.phone = formData.phone.split('+269-')[1] || formData.phone;
		// fetch(
		// 	'https://ino051djkg.execute-api.eu-west-3.amazonaws.com/demo/usagers',
		// 	requestOptions(formData),
		// )
		// 	.then((result) => result.text())
		// 	.then(() => {
		// 		setVQrcode(formData.phone);
		// 		setSuccess(true);
		// 	})
		// 	.catch((err) => {
		// 		// eslint-disable-next-line no-console
		// 		console.log(err);
		// 		setError(true);
		// 	});
		setFormData(initialData);
		setSuccess(true);
	}, [formData]);

	const handleChange = useCallback((newData) => {
		setSuccess(false);
		setError(false);
		setFormData(newData);
	}, []);
    return(
      <>
        {/* <DemoNavbar /> */}
        <div className="position-relative">
          {/* Hero for FREE version */}
          <section className="section section-hero section-shaped">
            {/* Background circles */}
            <div className="shape shape-style-1 shape-default">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>
            <Container className="shape-container d-flex align-items-center py-lg">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="6">
                   <h1 className="mb-0 pb-0 display-1 font-weight-bold text-white">Urahafu</h1>
                   <p className="text-white">by Deema Consulting</p>
                    <p className="lead text-white">
                      Un outil sur-mesure pour une meilleure gestion<br /> de la collecte des dechets
                    </p>
                    <div className="btn-wrapper mt-5">
                      <Button
                        className="btn-white btn-icon mb-3 mb-sm-0"
                        color={statePage === 1 ? "primary" : "default"}
                        onClick={() => {setStatePage(1)}}
                        size="lg"
                      >
                        <span className="btn-inner--text">
                            <span className={statePage === 1 ? "text-warning mr-1" : ""}>Demo inscription</span>
                        </span>
                      </Button>{" "}
                      <Button
                        className="btn-white btn-icon mb-3 mb-sm-0"
                        color={statePage === 2 ? "primary" : "default"}
                        onClick={() => {setStatePage(2)}}
                        size="lg"
                        target="_blank"
                      >

                        <span className="btn-inner--text">
                          <span className={statePage === 2 ? "text-warning mr-1" : ""}>Demo recherche</span>
                        </span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
        </div>
            {statePage === 1 && (<FormInsription />)}
            {statePage === 2 && (<FormRecherche />)}
        <CardsFooter />
      </>
    );}

export default Inscription;

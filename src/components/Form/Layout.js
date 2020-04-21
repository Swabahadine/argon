import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const FormLayout = ({
	className,
	title,
	description,
	children,
	id,
}) => (
	<section
		className={classnames(className,)}
		id={id}
	>
		<Container>
			<Row className="justify-content-center py-4">
				<Col className="col-12 col-md-10 col-lg-8 d-flex justify-content-start py-4">
					<h2 className="h3">{title}</h2>
					<p className="font-size-lg text-muted">
						{description}
					</p>
				</Col>
				<Col className="col-12 col-md-10 d-flex justify-content-center">
					<Row className="w-100 justify-content-center">
					{children}
					</Row>
				</Col>
			</Row>
		</Container>
	</section>
);
FormLayout.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	id: PropTypes.string,
	children: PropTypes.node.isRequired,
};

FormLayout.defaultProps = {
	className: '',
	id: null,
};

export default FormLayout;

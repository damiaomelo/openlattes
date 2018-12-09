import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import SimpleTable from './SimpleTable';

const GET_SUPERVISIONS = gql`
  query Supervisions($year: Int, $member: ID, $types: [String]) {
    supervisions(year: $year, member: $member, types: $types) {
      _id
      documentTitle
      supervisedStudent
      degreeType
    }
  }
`;

const SupervisionsList = ({ year, member, types }) => (
  <Query query={GET_SUPERVISIONS} variables={{ year, member, types }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Carregando</p>;
      if (error) return <p>Erro</p>;

      return (
        <SimpleTable
          data={data.supervisions.map(({
            _id, documentTitle, supervisedStudent, degreeType,
          }) => ({
            id: _id, documentTitle, supervisedStudent, degreeType,
          }))}
          headers={[
            {
              id: 'documentTitle', numeric: false, disablePadding: false, label: 'Título',
            },
            {
              id: 'supervisedStudent', numeric: false, disablePadding: false, label: 'Autor',
            },
            {
              id: 'degreeType', numeric: false, disablePadding: false, label: 'Tipo',
            },
          ]}
        />
      );
    }}
  </Query>
);

SupervisionsList.propTypes = {
  year: PropTypes.number,
  member: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.string).isRequired,
};

SupervisionsList.defaultProps = {
  year: undefined,
  member: undefined,
};

export default SupervisionsList;

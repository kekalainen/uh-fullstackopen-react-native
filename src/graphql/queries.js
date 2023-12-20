import { gql } from '@apollo/client';

import { CORE_REPOSITORY_FIELDS } from './fragments';

export const GET_ME = gql`
  query Me {
    me {
      id
    }
  }
`;

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY_FIELDS}
  query GetRepositories {
    repositories {
      edges {
        node {
          ...CoreRepositoryFields
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${CORE_REPOSITORY_FIELDS}
  query GetRepository($id: ID!) {
    repository(id: $id) {
      ...CoreRepositoryFields
    }
  }
`;

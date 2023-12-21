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
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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
  query GetRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...CoreRepositoryFields
      reviews(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            createdAt
            rating
            text
            user {
              username
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

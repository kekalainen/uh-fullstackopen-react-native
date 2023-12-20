import { gql } from '@apollo/client';

export const CORE_REPOSITORY_FIELDS = gql`
  fragment CoreRepositoryFields on Repository {
    id
    description
    forksCount
    fullName
    language
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
  }
`;

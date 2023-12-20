import { render, screen, within } from '@testing-library/react-native';

import { RepositoryListContainer } from '../../components/RepositoryList';

const repositories = {
  totalCount: 8,
  pageInfo: {
    hasNextPage: true,
    endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
  },
  edges: [
    {
      node: {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears',
        language: 'TypeScript',
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 3,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
      },
      cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
    },
    {
      node: {
        id: 'async-library.react-async',
        fullName: 'async-library/react-async',
        description: 'Flexible promise-based React data loader',
        language: 'JavaScript',
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
      },
      cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
    },
  ],
};

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const expectedTextKeys = ['fullName', 'description', 'language'];

      const expectedStats = [
        {
          title: 'Forks',
          values: ['1.6k', '69'],
        },
        {
          title: 'Stars',
          values: ['21.9k', '1.8k'],
        },
        {
          title: 'Rating',
          values: ['88', '72'],
        },
        {
          title: 'Reviews',
          values: ['3', '3'],
        },
      ];

      render(<RepositoryListContainer repositories={repositories} />);

      const items = screen.getAllByTestId('repository-item');

      for (const [index, item] of items.entries()) {
        const node = repositories['edges'][index]['node'];
        const queries = within(items[index]);

        for (const key of expectedTextKeys)
          expect(queries.getByText(node[key])).toHaveTextContent(node[key]);

        for (const stat of expectedStats) {
          const titleEl = within(item).getByText(stat.title);
          within(titleEl.parent.parent.parent).getByText(stat.values[index]);
        }
      }
    });
  });
});

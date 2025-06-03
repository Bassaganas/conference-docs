import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/tp/__docusaurus/debug',
    component: ComponentCreator('/tp/__docusaurus/debug', 'ff9'),
    exact: true
  },
  {
    path: '/tp/__docusaurus/debug/config',
    component: ComponentCreator('/tp/__docusaurus/debug/config', 'b84'),
    exact: true
  },
  {
    path: '/tp/__docusaurus/debug/content',
    component: ComponentCreator('/tp/__docusaurus/debug/content', '983'),
    exact: true
  },
  {
    path: '/tp/__docusaurus/debug/globalData',
    component: ComponentCreator('/tp/__docusaurus/debug/globalData', '483'),
    exact: true
  },
  {
    path: '/tp/__docusaurus/debug/metadata',
    component: ComponentCreator('/tp/__docusaurus/debug/metadata', 'c84'),
    exact: true
  },
  {
    path: '/tp/__docusaurus/debug/registry',
    component: ComponentCreator('/tp/__docusaurus/debug/registry', '344'),
    exact: true
  },
  {
    path: '/tp/__docusaurus/debug/routes',
    component: ComponentCreator('/tp/__docusaurus/debug/routes', '162'),
    exact: true
  },
  {
    path: '/tp/blog',
    component: ComponentCreator('/tp/blog', '8fb'),
    exact: true
  },
  {
    path: '/tp/blog/archive',
    component: ComponentCreator('/tp/blog/archive', '934'),
    exact: true
  },
  {
    path: '/tp/blog/authors',
    component: ComponentCreator('/tp/blog/authors', 'a38'),
    exact: true
  },
  {
    path: '/tp/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/tp/blog/authors/all-sebastien-lorber-articles', '779'),
    exact: true
  },
  {
    path: '/tp/blog/authors/yangshun',
    component: ComponentCreator('/tp/blog/authors/yangshun', '789'),
    exact: true
  },
  {
    path: '/tp/blog/first-blog-post',
    component: ComponentCreator('/tp/blog/first-blog-post', '989'),
    exact: true
  },
  {
    path: '/tp/blog/long-blog-post',
    component: ComponentCreator('/tp/blog/long-blog-post', '501'),
    exact: true
  },
  {
    path: '/tp/blog/mdx-blog-post',
    component: ComponentCreator('/tp/blog/mdx-blog-post', '1b9'),
    exact: true
  },
  {
    path: '/tp/blog/tags',
    component: ComponentCreator('/tp/blog/tags', 'e2a'),
    exact: true
  },
  {
    path: '/tp/blog/tags/docusaurus',
    component: ComponentCreator('/tp/blog/tags/docusaurus', 'c27'),
    exact: true
  },
  {
    path: '/tp/blog/tags/facebook',
    component: ComponentCreator('/tp/blog/tags/facebook', '452'),
    exact: true
  },
  {
    path: '/tp/blog/tags/hello',
    component: ComponentCreator('/tp/blog/tags/hello', '6c4'),
    exact: true
  },
  {
    path: '/tp/blog/tags/hola',
    component: ComponentCreator('/tp/blog/tags/hola', '207'),
    exact: true
  },
  {
    path: '/tp/blog/welcome',
    component: ComponentCreator('/tp/blog/welcome', '851'),
    exact: true
  },
  {
    path: '/tp/markdown-page',
    component: ComponentCreator('/tp/markdown-page', 'f03'),
    exact: true
  },
  {
    path: '/tp/docs',
    component: ComponentCreator('/tp/docs', '5b7'),
    routes: [
      {
        path: '/tp/docs',
        component: ComponentCreator('/tp/docs', 'c09'),
        routes: [
          {
            path: '/tp/docs',
            component: ComponentCreator('/tp/docs', '24b'),
            routes: [
              {
                path: '/tp/docs/dataset',
                component: ComponentCreator('/tp/docs/dataset', 'eff'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/tp/docs/exercise-1-llm-configuration',
                component: ComponentCreator('/tp/docs/exercise-1-llm-configuration', '756'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/tp/docs/exercise-2-api-knowledge-ingestion',
                component: ComponentCreator('/tp/docs/exercise-2-api-knowledge-ingestion', '5a2'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/tp/docs/exercise-2-knowledge-ingestion',
                component: ComponentCreator('/tp/docs/exercise-2-knowledge-ingestion', 'ed4'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/tp/docs/exercise-3-ai-chatbot-setup',
                component: ComponentCreator('/tp/docs/exercise-3-ai-chatbot-setup', '64a'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/tp/docs/exercise-4-advanced-prompting',
                component: ComponentCreator('/tp/docs/exercise-4-advanced-prompting', '748'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/tp/docs/intro',
                component: ComponentCreator('/tp/docs/intro', '0ec'),
                exact: true,
                sidebar: "workshopSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/tp/',
    component: ComponentCreator('/tp/', 'ac1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

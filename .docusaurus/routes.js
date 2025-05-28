import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/testus-patronus-docs/__docusaurus/debug',
    component: ComponentCreator('/testus-patronus-docs/__docusaurus/debug', '213'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/__docusaurus/debug/config',
    component: ComponentCreator('/testus-patronus-docs/__docusaurus/debug/config', '584'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/__docusaurus/debug/content',
    component: ComponentCreator('/testus-patronus-docs/__docusaurus/debug/content', 'd86'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/testus-patronus-docs/__docusaurus/debug/globalData', 'a74'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/testus-patronus-docs/__docusaurus/debug/metadata', '85c'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/__docusaurus/debug/registry',
    component: ComponentCreator('/testus-patronus-docs/__docusaurus/debug/registry', 'e7c'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/__docusaurus/debug/routes',
    component: ComponentCreator('/testus-patronus-docs/__docusaurus/debug/routes', 'c62'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/blog',
    component: ComponentCreator('/testus-patronus-docs/blog', '379'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/blog/archive',
    component: ComponentCreator('/testus-patronus-docs/blog/archive', '034'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/blog/authors',
    component: ComponentCreator('/testus-patronus-docs/blog/authors', '81f'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/testus-patronus-docs/blog/authors/all-sebastien-lorber-articles', '18a'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/blog/authors/yangshun',
    component: ComponentCreator('/testus-patronus-docs/blog/authors/yangshun', 'c5c'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/blog/first-blog-post',
    component: ComponentCreator('/testus-patronus-docs/blog/first-blog-post', '5d5'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/blog/long-blog-post',
    component: ComponentCreator('/testus-patronus-docs/blog/long-blog-post', '637'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/blog/mdx-blog-post',
    component: ComponentCreator('/testus-patronus-docs/blog/mdx-blog-post', 'd22'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/blog/tags',
    component: ComponentCreator('/testus-patronus-docs/blog/tags', '444'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/blog/tags/docusaurus',
    component: ComponentCreator('/testus-patronus-docs/blog/tags/docusaurus', '090'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/blog/tags/facebook',
    component: ComponentCreator('/testus-patronus-docs/blog/tags/facebook', 'ee4'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/blog/tags/hello',
    component: ComponentCreator('/testus-patronus-docs/blog/tags/hello', 'c25'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/blog/tags/hola',
    component: ComponentCreator('/testus-patronus-docs/blog/tags/hola', '20b'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/blog/welcome',
    component: ComponentCreator('/testus-patronus-docs/blog/welcome', '688'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/markdown-page',
    component: ComponentCreator('/testus-patronus-docs/markdown-page', 'fbe'),
    exact: true
  },
  {
    path: '/testus-patronus-docs/docs',
    component: ComponentCreator('/testus-patronus-docs/docs', '715'),
    routes: [
      {
        path: '/testus-patronus-docs/docs',
        component: ComponentCreator('/testus-patronus-docs/docs', 'b1a'),
        routes: [
          {
            path: '/testus-patronus-docs/docs',
            component: ComponentCreator('/testus-patronus-docs/docs', '9d2'),
            routes: [
              {
                path: '/testus-patronus-docs/docs/exercise-1-llm-configuration',
                component: ComponentCreator('/testus-patronus-docs/docs/exercise-1-llm-configuration', '979'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/testus-patronus-docs/docs/exercise-2-knowledge-ingestion',
                component: ComponentCreator('/testus-patronus-docs/docs/exercise-2-knowledge-ingestion', '2d6'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/testus-patronus-docs/docs/exercise-3-ai-chatbot-setup',
                component: ComponentCreator('/testus-patronus-docs/docs/exercise-3-ai-chatbot-setup', 'dd6'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/testus-patronus-docs/docs/exercise-4-advanced-prompting',
                component: ComponentCreator('/testus-patronus-docs/docs/exercise-4-advanced-prompting', '7cd'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/testus-patronus-docs/docs/intro',
                component: ComponentCreator('/testus-patronus-docs/docs/intro', '57f'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/testus-patronus-docs/docs/troubleshooting',
                component: ComponentCreator('/testus-patronus-docs/docs/troubleshooting', '677'),
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
    path: '/testus-patronus-docs/',
    component: ComponentCreator('/testus-patronus-docs/', 'c0b'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

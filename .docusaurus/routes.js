import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/testus-patronus/__docusaurus/debug',
    component: ComponentCreator('/testus-patronus/__docusaurus/debug', 'df3'),
    exact: true
  },
  {
    path: '/testus-patronus/__docusaurus/debug/config',
    component: ComponentCreator('/testus-patronus/__docusaurus/debug/config', 'd0f'),
    exact: true
  },
  {
    path: '/testus-patronus/__docusaurus/debug/content',
    component: ComponentCreator('/testus-patronus/__docusaurus/debug/content', '0b6'),
    exact: true
  },
  {
    path: '/testus-patronus/__docusaurus/debug/globalData',
    component: ComponentCreator('/testus-patronus/__docusaurus/debug/globalData', '278'),
    exact: true
  },
  {
    path: '/testus-patronus/__docusaurus/debug/metadata',
    component: ComponentCreator('/testus-patronus/__docusaurus/debug/metadata', '7e2'),
    exact: true
  },
  {
    path: '/testus-patronus/__docusaurus/debug/registry',
    component: ComponentCreator('/testus-patronus/__docusaurus/debug/registry', '201'),
    exact: true
  },
  {
    path: '/testus-patronus/__docusaurus/debug/routes',
    component: ComponentCreator('/testus-patronus/__docusaurus/debug/routes', '378'),
    exact: true
  },
  {
    path: '/testus-patronus/blog',
    component: ComponentCreator('/testus-patronus/blog', 'cb3'),
    exact: true
  },
  {
    path: '/testus-patronus/blog/archive',
    component: ComponentCreator('/testus-patronus/blog/archive', 'e24'),
    exact: true
  },
  {
    path: '/testus-patronus/blog/authors',
    component: ComponentCreator('/testus-patronus/blog/authors', '5ce'),
    exact: true
  },
  {
    path: '/testus-patronus/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/testus-patronus/blog/authors/all-sebastien-lorber-articles', '1f2'),
    exact: true
  },
  {
    path: '/testus-patronus/blog/authors/yangshun',
    component: ComponentCreator('/testus-patronus/blog/authors/yangshun', '9ad'),
    exact: true
  },
  {
    path: '/testus-patronus/blog/first-blog-post',
    component: ComponentCreator('/testus-patronus/blog/first-blog-post', '963'),
    exact: true
  },
  {
    path: '/testus-patronus/blog/long-blog-post',
    component: ComponentCreator('/testus-patronus/blog/long-blog-post', 'ed4'),
    exact: true
  },
  {
    path: '/testus-patronus/blog/mdx-blog-post',
    component: ComponentCreator('/testus-patronus/blog/mdx-blog-post', '9e6'),
    exact: true
  },
  {
    path: '/testus-patronus/blog/tags',
    component: ComponentCreator('/testus-patronus/blog/tags', 'd03'),
    exact: true
  },
  {
    path: '/testus-patronus/blog/tags/docusaurus',
    component: ComponentCreator('/testus-patronus/blog/tags/docusaurus', '5f9'),
    exact: true
  },
  {
    path: '/testus-patronus/blog/tags/facebook',
    component: ComponentCreator('/testus-patronus/blog/tags/facebook', '0af'),
    exact: true
  },
  {
    path: '/testus-patronus/blog/tags/hello',
    component: ComponentCreator('/testus-patronus/blog/tags/hello', '3f8'),
    exact: true
  },
  {
    path: '/testus-patronus/blog/tags/hola',
    component: ComponentCreator('/testus-patronus/blog/tags/hola', 'd18'),
    exact: true
  },
  {
    path: '/testus-patronus/blog/welcome',
    component: ComponentCreator('/testus-patronus/blog/welcome', '9d8'),
    exact: true
  },
  {
    path: '/testus-patronus/markdown-page',
    component: ComponentCreator('/testus-patronus/markdown-page', '589'),
    exact: true
  },
  {
    path: '/testus-patronus/docs',
    component: ComponentCreator('/testus-patronus/docs', '150'),
    routes: [
      {
        path: '/testus-patronus/docs',
        component: ComponentCreator('/testus-patronus/docs', '19c'),
        routes: [
          {
            path: '/testus-patronus/docs',
            component: ComponentCreator('/testus-patronus/docs', '43b'),
            routes: [
              {
                path: '/testus-patronus/docs/dataset',
                component: ComponentCreator('/testus-patronus/docs/dataset', 'c95'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/testus-patronus/docs/exercise-1-llm-configuration',
                component: ComponentCreator('/testus-patronus/docs/exercise-1-llm-configuration', '4fe'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/testus-patronus/docs/exercise-2-api-knowledge-ingestion',
                component: ComponentCreator('/testus-patronus/docs/exercise-2-api-knowledge-ingestion', '435'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/testus-patronus/docs/exercise-2-knowledge-ingestion',
                component: ComponentCreator('/testus-patronus/docs/exercise-2-knowledge-ingestion', '9b8'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/testus-patronus/docs/exercise-3-ai-chatbot-setup',
                component: ComponentCreator('/testus-patronus/docs/exercise-3-ai-chatbot-setup', 'b57'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/testus-patronus/docs/exercise-4-advanced-prompting',
                component: ComponentCreator('/testus-patronus/docs/exercise-4-advanced-prompting', '1ff'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/testus-patronus/docs/intro',
                component: ComponentCreator('/testus-patronus/docs/intro', 'c04'),
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
    path: '/testus-patronus/',
    component: ComponentCreator('/testus-patronus/', 'ed8'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

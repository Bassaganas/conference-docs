import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/conference-docs/__docusaurus/debug',
    component: ComponentCreator('/conference-docs/__docusaurus/debug', '32b'),
    exact: true
  },
  {
    path: '/conference-docs/__docusaurus/debug/config',
    component: ComponentCreator('/conference-docs/__docusaurus/debug/config', '7c7'),
    exact: true
  },
  {
    path: '/conference-docs/__docusaurus/debug/content',
    component: ComponentCreator('/conference-docs/__docusaurus/debug/content', '463'),
    exact: true
  },
  {
    path: '/conference-docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/conference-docs/__docusaurus/debug/globalData', '6c8'),
    exact: true
  },
  {
    path: '/conference-docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/conference-docs/__docusaurus/debug/metadata', 'c49'),
    exact: true
  },
  {
    path: '/conference-docs/__docusaurus/debug/registry',
    component: ComponentCreator('/conference-docs/__docusaurus/debug/registry', 'c22'),
    exact: true
  },
  {
    path: '/conference-docs/__docusaurus/debug/routes',
    component: ComponentCreator('/conference-docs/__docusaurus/debug/routes', '440'),
    exact: true
  },
  {
    path: '/conference-docs/blog',
    component: ComponentCreator('/conference-docs/blog', '0a2'),
    exact: true
  },
  {
    path: '/conference-docs/blog/archive',
    component: ComponentCreator('/conference-docs/blog/archive', '1b1'),
    exact: true
  },
  {
    path: '/conference-docs/blog/authors',
    component: ComponentCreator('/conference-docs/blog/authors', 'a0d'),
    exact: true
  },
  {
    path: '/conference-docs/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/conference-docs/blog/authors/all-sebastien-lorber-articles', 'c35'),
    exact: true
  },
  {
    path: '/conference-docs/blog/authors/yangshun',
    component: ComponentCreator('/conference-docs/blog/authors/yangshun', '1e2'),
    exact: true
  },
  {
    path: '/conference-docs/blog/first-blog-post',
    component: ComponentCreator('/conference-docs/blog/first-blog-post', 'b13'),
    exact: true
  },
  {
    path: '/conference-docs/blog/long-blog-post',
    component: ComponentCreator('/conference-docs/blog/long-blog-post', '5ab'),
    exact: true
  },
  {
    path: '/conference-docs/blog/mdx-blog-post',
    component: ComponentCreator('/conference-docs/blog/mdx-blog-post', 'a9c'),
    exact: true
  },
  {
    path: '/conference-docs/blog/tags',
    component: ComponentCreator('/conference-docs/blog/tags', '759'),
    exact: true
  },
  {
    path: '/conference-docs/blog/tags/docusaurus',
    component: ComponentCreator('/conference-docs/blog/tags/docusaurus', 'f49'),
    exact: true
  },
  {
    path: '/conference-docs/blog/tags/facebook',
    component: ComponentCreator('/conference-docs/blog/tags/facebook', '9e7'),
    exact: true
  },
  {
    path: '/conference-docs/blog/tags/hello',
    component: ComponentCreator('/conference-docs/blog/tags/hello', 'a05'),
    exact: true
  },
  {
    path: '/conference-docs/blog/tags/hola',
    component: ComponentCreator('/conference-docs/blog/tags/hola', '931'),
    exact: true
  },
  {
    path: '/conference-docs/blog/welcome',
    component: ComponentCreator('/conference-docs/blog/welcome', '066'),
    exact: true
  },
  {
    path: '/conference-docs/markdown-page',
    component: ComponentCreator('/conference-docs/markdown-page', '065'),
    exact: true
  },
  {
    path: '/conference-docs/docs',
    component: ComponentCreator('/conference-docs/docs', '3c0'),
    routes: [
      {
        path: '/conference-docs/docs',
        component: ComponentCreator('/conference-docs/docs', '026'),
        routes: [
          {
            path: '/conference-docs/docs',
            component: ComponentCreator('/conference-docs/docs', '3e7'),
            routes: [
              {
                path: '/conference-docs/docs/exercise-1-llm-configuration',
                component: ComponentCreator('/conference-docs/docs/exercise-1-llm-configuration', '0ef'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/conference-docs/docs/exercise-2-knowledge-ingestion',
                component: ComponentCreator('/conference-docs/docs/exercise-2-knowledge-ingestion', 'cff'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/conference-docs/docs/exercise-3-ai-chatbot-setup',
                component: ComponentCreator('/conference-docs/docs/exercise-3-ai-chatbot-setup', '354'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/conference-docs/docs/exercise-4-advanced-prompting',
                component: ComponentCreator('/conference-docs/docs/exercise-4-advanced-prompting', '4fd'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/conference-docs/docs/intro',
                component: ComponentCreator('/conference-docs/docs/intro', 'b84'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/conference-docs/docs/troubleshooting',
                component: ComponentCreator('/conference-docs/docs/troubleshooting', '471'),
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
    path: '/conference-docs/',
    component: ComponentCreator('/conference-docs/', 'fb9'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/dify_jira/__docusaurus/debug',
    component: ComponentCreator('/dify_jira/__docusaurus/debug', '99f'),
    exact: true
  },
  {
    path: '/dify_jira/__docusaurus/debug/config',
    component: ComponentCreator('/dify_jira/__docusaurus/debug/config', 'c82'),
    exact: true
  },
  {
    path: '/dify_jira/__docusaurus/debug/content',
    component: ComponentCreator('/dify_jira/__docusaurus/debug/content', 'faa'),
    exact: true
  },
  {
    path: '/dify_jira/__docusaurus/debug/globalData',
    component: ComponentCreator('/dify_jira/__docusaurus/debug/globalData', '70a'),
    exact: true
  },
  {
    path: '/dify_jira/__docusaurus/debug/metadata',
    component: ComponentCreator('/dify_jira/__docusaurus/debug/metadata', '7a8'),
    exact: true
  },
  {
    path: '/dify_jira/__docusaurus/debug/registry',
    component: ComponentCreator('/dify_jira/__docusaurus/debug/registry', 'd4d'),
    exact: true
  },
  {
    path: '/dify_jira/__docusaurus/debug/routes',
    component: ComponentCreator('/dify_jira/__docusaurus/debug/routes', '6bc'),
    exact: true
  },
  {
    path: '/dify_jira/blog',
    component: ComponentCreator('/dify_jira/blog', '16b'),
    exact: true
  },
  {
    path: '/dify_jira/blog/archive',
    component: ComponentCreator('/dify_jira/blog/archive', '8fd'),
    exact: true
  },
  {
    path: '/dify_jira/blog/authors',
    component: ComponentCreator('/dify_jira/blog/authors', 'c72'),
    exact: true
  },
  {
    path: '/dify_jira/blog/authors/all-sebastien-lorber-articles',
    component: ComponentCreator('/dify_jira/blog/authors/all-sebastien-lorber-articles', 'bcb'),
    exact: true
  },
  {
    path: '/dify_jira/blog/authors/yangshun',
    component: ComponentCreator('/dify_jira/blog/authors/yangshun', 'ee1'),
    exact: true
  },
  {
    path: '/dify_jira/blog/first-blog-post',
    component: ComponentCreator('/dify_jira/blog/first-blog-post', 'd46'),
    exact: true
  },
  {
    path: '/dify_jira/blog/long-blog-post',
    component: ComponentCreator('/dify_jira/blog/long-blog-post', '7db'),
    exact: true
  },
  {
    path: '/dify_jira/blog/mdx-blog-post',
    component: ComponentCreator('/dify_jira/blog/mdx-blog-post', '257'),
    exact: true
  },
  {
    path: '/dify_jira/blog/tags',
    component: ComponentCreator('/dify_jira/blog/tags', '668'),
    exact: true
  },
  {
    path: '/dify_jira/blog/tags/docusaurus',
    component: ComponentCreator('/dify_jira/blog/tags/docusaurus', '298'),
    exact: true
  },
  {
    path: '/dify_jira/blog/tags/facebook',
    component: ComponentCreator('/dify_jira/blog/tags/facebook', '87a'),
    exact: true
  },
  {
    path: '/dify_jira/blog/tags/hello',
    component: ComponentCreator('/dify_jira/blog/tags/hello', '39b'),
    exact: true
  },
  {
    path: '/dify_jira/blog/tags/hola',
    component: ComponentCreator('/dify_jira/blog/tags/hola', 'eca'),
    exact: true
  },
  {
    path: '/dify_jira/blog/welcome',
    component: ComponentCreator('/dify_jira/blog/welcome', 'ea9'),
    exact: true
  },
  {
    path: '/dify_jira/markdown-page',
    component: ComponentCreator('/dify_jira/markdown-page', 'a47'),
    exact: true
  },
  {
    path: '/dify_jira/docs',
    component: ComponentCreator('/dify_jira/docs', 'beb'),
    routes: [
      {
        path: '/dify_jira/docs',
        component: ComponentCreator('/dify_jira/docs', '8b9'),
        routes: [
          {
            path: '/dify_jira/docs',
            component: ComponentCreator('/dify_jira/docs', '0a6'),
            routes: [
              {
                path: '/dify_jira/docs/exercise-1-llm-configuration',
                component: ComponentCreator('/dify_jira/docs/exercise-1-llm-configuration', 'bd6'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/dify_jira/docs/exercise-2-knowledge-ingestion',
                component: ComponentCreator('/dify_jira/docs/exercise-2-knowledge-ingestion', '243'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/dify_jira/docs/exercise-3-ai-chatbot-setup',
                component: ComponentCreator('/dify_jira/docs/exercise-3-ai-chatbot-setup', 'beb'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/dify_jira/docs/exercise-4-advanced-prompting',
                component: ComponentCreator('/dify_jira/docs/exercise-4-advanced-prompting', '117'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/dify_jira/docs/intro',
                component: ComponentCreator('/dify_jira/docs/intro', '939'),
                exact: true,
                sidebar: "workshopSidebar"
              },
              {
                path: '/dify_jira/docs/troubleshooting',
                component: ComponentCreator('/dify_jira/docs/troubleshooting', '234'),
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
    path: '/dify_jira/',
    component: ComponentCreator('/dify_jira/', '69a'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

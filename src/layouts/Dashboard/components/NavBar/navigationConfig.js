/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';

export default [
  {
    title: 'Pages',
    pages: [
      {
        title: 'Overview',
        href: '/overview',
        icon: HomeIcon
      },
      {
        title: '全流程分析',
        href: '/trajectory-analysis',
        icon: DashboardIcon,
      },
    ]
  },
];

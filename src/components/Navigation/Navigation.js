/* eslint-disable react/no-multi-comp */
import React from 'react';
import { matchPath } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, Typography } from '@material-ui/core';

import { NavigationListItem } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(3)
  }
}));

const NavigationList = props => {
  const { pages, ...rest } = props;

  // reduce指从一个数组从左到右，每个元素逐项实施某个函数，最后把数组缩成一个值（例如把一个数组从左加到右，输出一个和）
  // 那显然，reduce函数存在两个参数，第一个参数为函数，第二个参数为递归起点
  // 而函数对象也由两个参数组成，分别是最终结果的中间状态，和数组的每个元素
  return (
    <List>
      {pages.reduce(
        (items, page) => reduceChildRoutes({ items, page, ...rest }),
        []
      )}
    </List>
  );
};

NavigationList.propTypes = {
  depth: PropTypes.number,
  pages: PropTypes.array
};

const reduceChildRoutes = props => {
  const { router, items, page, depth } = props;

  if (page.children) {
    const open = matchPath(router.location.pathname, {
      path: page.href,
      exact: false
    });

    items.push(
      <NavigationListItem
        depth={depth}
        icon={page.icon}
        key={page.title}
        label={page.label}
        open={Boolean(open)////此处仅仅是为了说明默认情况下是否打开，需要匹配href
        }
        title={page.title}
      >
      {
        //此处可以多级嵌套
      }
        <NavigationList
          depth={depth + 1}
          pages={page.children}
          router={router}
        />
      </NavigationListItem>
    );
  } else {
    items.push(
      <NavigationListItem
        depth={depth}
        handleClick={page.handleClick}
        icon={page.icon}
        key={page.title}
        label={page.label}
        title={page.title}
      />
    );
  }

  return items;
};

const Navigation = props => {
  const { title, pages, className, component: Component, ...rest } = props;

  const classes = useStyles();

  {
    // 此处的NavigationList 的router渲染问题待后期完成
    //router={router}
  }
  return (
    <Component
      {...rest}
      className={clsx(classes.root, className)}
    >
      {title && <Typography variant="overline">{title}</Typography>
      // 此处的overline指上划线
      }
      <NavigationList
        depth={0}
        pages={pages}

      />
    </Component>
    
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
  component: PropTypes.any,
  pages: PropTypes.array.isRequired,
  title: PropTypes.string
};

Navigation.defaultProps = {
  component: 'nav'
};

export default Navigation;

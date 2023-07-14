import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { NavBar, Svg, Icon, IconButton, Dropdown } from '../';

function Header({
  children,
  menuOptions,
  isReturnEnabled,
  onClickReturnButton,
  isSticky,
  WhiteLabeling,
  ...props
}): ReactNode {
  const { t } = useTranslation('Header');

  // TODO: this should be passed in as a prop instead and the react-router-dom
  // dependency should be dropped
  const onClickReturn = () => {
    if (isReturnEnabled && onClickReturnButton) {
      onClickReturnButton();
    }
  };

  return (
    <NavBar
      className="justify-between border-b-1 border-black"
      isSticky={isSticky}
    >
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center">
          {/* // TODO: Should preserve filter/sort
              // Either injected service? Or context (like react router's `useLocation`?) */}
          {/* <div
            className={classNames(
              'inline-flex items-center mr-3',
              isReturnEnabled && 'cursor-pointer'
            )}
            onClick={onClickReturn}
          >
            {isReturnEnabled && (
              <Icon name="chevron-left" className="w-8 text-primary-active" />
            )} */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {WhiteLabeling?.createLogoComponentFn?.(React, props) || (
              <Svg name="logo-ohif" />
            )}
          </div>
          {/* </div> */}
        </div>
        <div className="row">
          <div className="col d-flex justify-content-center align-items-center">
            {children}
          </div>
        </div>
        {/* <div className="flex items-center">
          <span className="mr-3 text-lg text-common-light">
            {t('')}
          </span>
          <Dropdown id="options" showDropdownIcon={false} list={menuOptions}>
            <IconButton
              id={'options-settings-icon'}
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active"
            >
              <Icon name="settings" />
            </IconButton>
            <IconButton
              id={'options-chevron-down-icon'}
              variant="text"
              color="inherit"
              size="initial"
              className="text-primary-active"
            >
              <Icon name="chevron-down" />
            </IconButton>
          </Dropdown>
        </div> */}
      </div>
    </NavBar>
  );
}

Header.propTypes = {
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    })
  ),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isReturnEnabled: PropTypes.bool,
  isSticky: PropTypes.bool,
  onClickReturnButton: PropTypes.func,
  WhiteLabeling: PropTypes.object,
};

Header.defaultProps = {
  isReturnEnabled: false,
  isSticky: false,
};

export default Header;
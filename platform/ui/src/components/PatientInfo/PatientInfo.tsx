import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Icon from '../Icon';
import Tooltip from '../Tooltip';

const classes = {
  infoHeader: 'text-base text-primary-light',
  infoText: 'text-base text-white max-w-24 truncate',
  firstRow: 'flex flex-col',
  row: 'flex flex-col ml-4',
};

function PatientInfo({
  patientName,
  patientSex,
  patientAge,
  MRN,
  thickness,
  spacing,
  scanner,
  isOpen,
  showPatientInfoRef,
}) {
  const { t } = useTranslation('PatientInfo');

  const getAgeText = (age) => {
    while (age.charAt(0) === '0') {
      age = age.substr(1);
    }

    return age.replace(/Y$/, '') + ' Años';
  };

  const getGenderText = (sex) => {
    if (sex === 'M') {
      return 'Masculino';
    } else if (sex === 'F') {
      return 'Femenino';
    } else {
      return '';
    }
  };

  const ageText = getAgeText(patientAge);
  const genderText = getGenderText(patientSex);

  return (
    <div ref={showPatientInfoRef}>
      <Tooltip
        isSticky
        isDisabled={!isOpen}
        position="bottom-right"
        content={
          isOpen && (
            <div className="flex py-2">
              <div className="flex pt-1">
                <Icon name="info-link" className="w-4 text-primary-main" />
              </div>
              <div className="flex flex-col ml-2">
                <span
                  className="text-base font-bold text-white"
                  title={patientName}
                >
                  {patientName}
                </span>
                <div className="flex pb-4 mt-4 mb-4 border-b border-secondary-main">
                  <div className={classnames(classes.firstRow)}>
                    <span className={classnames(classes.infoHeader)}>
                      {t('Sexo')}
                    </span>
                    <span
                      className={classnames(classes.infoText)}
                      title={patientSex}
                    >
                      {genderText}
                    </span>
                  </div>
                  <div className={classnames(classes.row)}>
                    <span className={classnames(classes.infoHeader)}>
                      {t('Edad')}
                    </span>
                    <span
                      className={classnames(classes.infoText)}
                      title={patientAge}
                    >
                      {ageText}
                    </span>
                  </div>
                  <div className={classnames(classes.row)}>
                    <span className={classnames(classes.infoHeader)}>
                      {t('Folio')}
                    </span>
                    <span className={classnames(classes.infoText)} title={MRN}>
                      {MRN}
                    </span>
                  </div>
                </div>
                {/* <div className="flex">
                  <div className={classnames(classes.firstRow)}>
                    <span className={classnames(classes.infoHeader)}>
                      {t('Thickness')}
                    </span>
                    <span
                      className={classnames(classes.infoText)}
                      title={thickness}
                    >
                      {thickness}
                    </span>
                  </div>
                  <div className={classnames(classes.row)}>
                    <span className={classnames(classes.infoHeader)}>
                      {t('Spacing')}
                    </span>
                    <span
                      className={classnames(classes.infoText)}
                      title={spacing}
                    >
                      {spacing}
                    </span>
                  </div>
                  <div className={classnames(classes.row)}>
                    <span className={classnames(classes.infoHeader)}>
                      {t('Scanner')}
                    </span>
                    <span
                      className={classnames(classes.infoText)}
                      title={scanner}
                    >
                      {scanner}
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          )
        }
      >
        <Icon
          className="cursor-pointer text-white hover:text-primary-light"
          name="info-action"
        />
      </Tooltip>
    </div>
  );
}

PatientInfo.propTypes = {
  patientName: PropTypes.string,
  patientSex: PropTypes.string,
  patientAge: PropTypes.string,
  MRN: PropTypes.string,
  thickness: PropTypes.string,
  spacing: PropTypes.string,
  scanner: PropTypes.string,
  isOpen: PropTypes.bool,
  showPatientInfoRef: PropTypes.object,
};

export default PatientInfo;

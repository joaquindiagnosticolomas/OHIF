import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ViewportGrid({ numRows, numCols, layoutType, children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = /(Mobi|Android|iPhone|iPad|iPod)/.test(navigator.userAgent);
      setIsMobile(isMobile);
    };

    // Verificar el tamaño de la ventana cuando se monta el componente
    handleResize();

    // Agregar listener al evento 'resize'
    window.addEventListener('resize', handleResize);

    // Eliminar el listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      data-cy="viewport-grid"
      style={{
        position: 'absolute',
        top: isMobile ? '1px' : '1px',
        bottom: isMobile ? '21%' : '3%',
        height: isMobile ? '79%' : '97%',
        width: isMobile ? '100%' : '100%',
      }}
    >
      {children}
    </div>
  );
}

ViewportGrid.propTypes = {
  numRows: PropTypes.number.isRequired,
  numCols: PropTypes.number.isRequired,
  layoutType: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ViewportGrid;
